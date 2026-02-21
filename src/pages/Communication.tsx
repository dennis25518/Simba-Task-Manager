import React, { useState, useRef, useEffect } from "react";
import {
  FiSend,
  FiPhoneOff,
  FiVideo,
  FiVideoOff,
  FiMic,
  FiMicOff,
  FiSmile,
  FiPaperclip,
  FiAlertCircle,
} from "react-icons/fi";
import { io, Socket } from "socket.io-client";
import SimplePeer from "simple-peer";
import Sidebar from "../components/Sidebar";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  socketId: string;
}

interface Participant {
  socketId: string;
  userName: string;
  userId: string;
}

interface PeerConnection {
  peerId: string;
  peer: SimplePeer.Instance;
  stream: MediaStream | null;
}

const SOCKET_SERVER_URL = "http://localhost:5000";

const Communication: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [roomId] = useState("simba-team-chat");
  const [userName, setUserName] = useState("Anonymous");
  const [userId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);

  // Chat states
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Call states
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [error, setError] = useState("");

  // Media states
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<Map<string, PeerConnection>>(new Map());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const callTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize Socket.io connection
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    newSocket.on("connect", () => {
      console.log("Connected to signaling server");
      setConnected(true);
      newSocket.emit("join-room", { roomId, userName, userId });
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from signaling server");
      setConnected(false);
      setError("Disconnected from server");
    });

    newSocket.on("receive-message", (data) => {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: data.sender || "Unknown",
        message: data.message,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        socketId: data.socketId,
      };
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("user-joined", (data) => {
      console.log(`${data.userName} joined`);
      setParticipants((prev) => [
        ...prev,
        {
          socketId: data.socketId,
          userName: data.userName,
          userId: data.userId,
        },
      ]);
    });

    newSocket.on("existing-participants", (participants) => {
      setParticipants(participants);
    });

    newSocket.on("user-left", (data) => {
      console.log(`${data.userName} left`);
      setParticipants((prev) =>
        prev.filter((p) => p.socketId !== data.socketId),
      );
      // Close peer connection
      const peer = peersRef.current.get(data.socketId);
      if (peer) {
        peer.peer.destroy();
        peersRef.current.delete(data.socketId);
      }
    });

    // WebRTC Signaling events
    newSocket.on("receive-offer", async (data) => {
      console.log("Received offer from", data.fromSocket);
      const peer = createPeer(false, data.fromSocket, newSocket);
      try {
        await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        newSocket.emit("send-answer", {
          answer: peer.localDescription,
          toSocket: data.fromSocket,
        });
      } catch (err) {
        console.error("Error handling offer:", err);
      }
    });

    newSocket.on("receive-answer", async (data) => {
      console.log("Received answer from", data.fromSocket);
      const peerConnection = peersRef.current.get(data.fromSocket);
      if (peerConnection) {
        try {
          await peerConnection.peer._pc?.setRemoteDescription(
            new RTCSessionDescription(data.answer),
          );
        } catch (err) {
          console.error("Error setting remote description:", err);
        }
      }
    });

    newSocket.on("receive-ice-candidate", (data) => {
      const peerConnection = peersRef.current.get(data.fromSocket);
      if (peerConnection && data.candidate) {
        try {
          peerConnection.peer._pc?.addIceCandidate(
            new RTCIceCandidate(data.candidate),
          );
        } catch (err) {
          console.error("Error adding ICE candidate:", err);
        }
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit("leave-room", { roomId, userName });
      newSocket.disconnect();
    };
  }, [roomId, userName, userId]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Call timer
  useEffect(() => {
    if (isCallActive) {
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
      setCallDuration(0);
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [isCallActive]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !socket) return;

    socket.emit("send-message", {
      roomId,
      message: newMessage,
      sender: userName,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setNewMessage("");
  };

  const createPeer = (
    initiator: boolean,
    peerId: string,
    socket: Socket,
  ): SimplePeer.Instance => {
    const peer = new SimplePeer({
      initiator,
      trickleIce: true,
      stream: localStreamRef.current || undefined,
      config: {
        iceServers: [
          { urls: ["stun:stun.l.google.com:19302"] },
          { urls: ["stun:stun1.l.google.com:19302"] },
        ],
      },
    });

    peer.on("signal", (data) => {
      if (data.type === "offer") {
        socket.emit("send-offer", { offer: data, toSocket: peerId });
      } else if (data.type === "answer") {
        socket.emit("send-answer", { answer: data, toSocket: peerId });
      } else if (data.candidate) {
        socket.emit("send-ice-candidate", {
          candidate: data,
          toSocket: peerId,
        });
      }
    });

    peer.on("stream", (stream: MediaStream) => {
      console.log("Received stream from", peerId);
      const peerConnection = peersRef.current.get(peerId);
      if (peerConnection) {
        peerConnection.stream = stream;
      }
    });

    peer.on("error", (err: Error) => {
      console.error("Peer error:", err);
      setError(`Peer connection error: ${err.message}`);
    });

    peersRef.current.set(peerId, { peerId, peer, stream: null });
    return peer;
  };

  const handleStartCall = async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setIsCallActive(true);

      // Send offer to all participants
      participants.forEach((participant) => {
        if (socket) {
          socket.emit("initiate-call", {
            roomId,
            callerId: socket.id,
            callerName: userName,
          });
          const peer = createPeer(true, participant.socketId, socket);
          peer.addStream(stream);
        }
      });
    } catch (err: any) {
      setError(`Failed to access camera/microphone: ${err.message}`);
      console.error("Error accessing media devices:", err);
    }
  };

  const handleEndCall = () => {
    // Stop all tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    // Close all peer connections
    peersRef.current.forEach(({ peer }) => {
      peer.destroy();
    });
    peersRef.current.clear();

    setIsCallActive(false);
    setIsMuted(false);
    setIsCameraOn(true);
  };

  const handleToggleMic = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const handleToggleCamera = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar onNavigate={() => {}} />

      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 flex flex-col">
        {/* Connection Status & Setup */}
        {!connected && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3 flex items-center gap-2">
            <FiAlertCircle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-900">
                Connecting to server...
              </p>
              <p className="text-xs text-yellow-700">
                Make sure to run the signaling server: `node server.js`
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-b border-red-200 px-6 py-3 flex items-center gap-2">
            <FiAlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* User Setup */}
        {!userName && (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
            <input
              type="text"
              placeholder="Enter your name to join..."
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  setUserName(e.currentTarget.value);
                }
              }}
              className="px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          {isCallActive ? (
            // Video Call View
            <div className="flex-1 bg-gray-900 flex flex-col">
              <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
                <div>
                  <h1 className="text-white font-bold text-lg">
                    Group Video Call
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {participants.length + 1} participants •{" "}
                    {formatDuration(callDuration)}
                  </p>
                </div>
                <button
                  onClick={handleEndCall}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                >
                  <FiPhoneOff className="w-4 h-4" />
                  End Call
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4 bg-gray-900">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                  {/* Local Video */}
                  <div className="bg-gray-800 rounded-lg overflow-hidden relative aspect-video">
                    <video
                      ref={localVideoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 px-3 py-1 rounded text-white text-sm">
                      You {isCameraOn ? "📹" : "🎥"}
                    </div>
                    {isMuted && (
                      <div className="absolute top-3 right-3 bg-red-600 p-2 rounded-full">
                        <FiMicOff className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Remote Participants */}
                  {Array.from(peersRef.current.values())
                    .slice(0, 3)
                    .map((peerConn) => (
                      <div
                        key={peerConn.peerId}
                        className="bg-gray-800 rounded-lg overflow-hidden relative aspect-video"
                      >
                        <video
                          autoPlay
                          className="w-full h-full object-cover"
                          ref={(ref) => {
                            if (ref && peerConn.stream) {
                              ref.srcObject = peerConn.stream;
                            }
                          }}
                        />
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 px-3 py-1 rounded text-white text-sm">
                          {participants.find(
                            (p) => p.socketId === peerConn.peerId,
                          )?.userName || "Participant"}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Call Controls */}
              <div className="bg-gray-800 px-6 py-4 border-t border-gray-700 flex items-center justify-center gap-4">
                <button
                  onClick={handleToggleMic}
                  className={`p-3 rounded-full transition-colors ${
                    isMuted
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  {isMuted ? (
                    <FiMicOff className="w-5 h-5" />
                  ) : (
                    <FiMic className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={handleToggleCamera}
                  className={`p-3 rounded-full transition-colors ${
                    !isCameraOn
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  {isCameraOn ? (
                    <FiVideo className="w-5 h-5" />
                  ) : (
                    <FiVideoOff className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="bg-gray-800 px-6 py-3 border-t border-gray-700 text-white text-sm">
                <p className="text-gray-400 mb-2">
                  Participants ({participants.length + 1})
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-xs">
                    {userName}
                  </span>
                  {participants.map((p) => (
                    <span
                      key={p.socketId}
                      className="bg-purple-600 px-3 py-1 rounded-full text-xs"
                    >
                      {p.userName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Chat View
            <div className="flex flex-col h-full">
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Team Chat</h1>
                  <p className="text-sm text-gray-600">
                    {connected ? "✓ Connected" : "Connecting..."} •{" "}
                    {participants.length + 1} members
                  </p>
                </div>
                <button
                  onClick={handleStartCall}
                  disabled={!connected}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 flex items-center gap-2"
                >
                  <FiVideo className="w-4 h-4" />
                  Start Video Call
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-10">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                )}
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {msg.sender.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <p className="font-semibold text-gray-900">
                          {msg.sender}
                        </p>
                        <span className="text-xs text-gray-400">
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-700 break-words">{msg.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex gap-3">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                    <FiPaperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    disabled={!connected}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 resize-none"
                  />
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                    <FiSmile className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={newMessage.trim() === "" || !connected}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <FiSend className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Communication;
