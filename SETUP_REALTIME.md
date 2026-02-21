# Simba Task Manager - Real-Time Communication Setup

## Running the Application with WebRTC Support

This application now includes **real-time group chat** and **WebRTC video calls** functionality. To use these features, you need to run the signaling server.

### For Local Development

#### Prerequisites

- Node.js installed (v14 or higher)
- npm packages already installed (socket.io, socket.io-client, simple-peer, express, cors)

#### Setup Instructions

##### 1. Start the Signaling Server

In a **new terminal** (keep this running while using the app):

```bash
cd "c:\Users\USER\Desktop\Projects\Simba Task Manager"
node server.js
```

You should see:

```
Signaling server running on http://localhost:5000
```

##### 2. Start the React Development Server

In **another terminal**:

```bash
cd "c:\Users\USER\Desktop\Projects\Simba Task Manager"
npm run dev
```

### For Production Deployment (Railway + Vercel)

Railway handles the backend signaling server, while Vercel handles the frontend.

#### Step 1: Deploy Backend to Railway

1. Go to https://railway.app/dashboard
2. Click **"Create New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your **dennis25518/Simba-Task-Manager** repository
5. Select **"Node.js"** as the service
6. Railway will auto-detect the configuration
7. Click **"Deploy"** and wait for completion
8. Once deployed, you'll get a URL like: `https://simba-task-manager-production.railway.app`

#### Step 2: Update Frontend Environment Variables

1. Go to your **Vercel dashboard**
2. Select your **Simba Task Manager** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `VITE_SOCKET_SERVER_URL`
   - **Value**: Your Railway backend URL (e.g., `https://simba-task-manager-production.railway.app`)
5. Click **"Save"**
6. Trigger a new deployment (or push a commit to redeploy)

#### Step 3: Redeploy Frontend to Vercel

After setting the environment variable:

```bash
git add .
git commit -m "Add Railway backend URL configuration"
git push
```

This triggers an automatic redeploy on Vercel with the new backend URL.

#### Step 4: Test Production

1. Visit your **Vercel production URL** (e.g., `https://simba-task-manager.vercel.app`)
2. Navigate to the **Chat** section
3. The app should connect to your Railway backend
4. Test with multiple browser tabs to verify real-time chat and video calls work!

### Testing the Features

#### **Group Chat**

1. Open the app in your browser (usually http://localhost:5173)
2. Navigate to the **Chat** section from the sidebar
3. Enter your name in the input field at the top
4. You'll see the connection status change to "✓ Connected"
5. Type messages in the message input and press Enter to send
6. Open the app in **another browser tab or window** to simulate multiple users
7. Messages will sync in real-time between all connected users

#### **Video Calls**

1. In the Chat page, click **"Start Video Call"** button
2. Your browser will request permission to access your camera and microphone
3. **Grant permissions** for both camera and microphone
4. Your local video will display in a video box
5. In another browser tab/window, the other user(s) will see an incoming call
6. When they join, their video stream will appear in the grid
7. Use the **mic and camera toggle buttons** to control audio/video
8. Click **"End Call"** to disconnect from the video meeting

### Architecture

- **Frontend**: React + TypeScript with Socket.io client and Simple-peer for WebRTC
- **Backend**: Express + Socket.io server for signaling and message relay
- **Communications**:
  - **Chat**: Messages are sent via Socket.io events
  - **Video**: Peer-to-peer video streams using WebRTC (Simple-peer library)
  - **Signaling**: Offers, answers, and ICE candidates are exchanged via Socket.io

### Troubleshooting

**"Connecting to server..." message persists**

- Make sure the signaling server is running on port 5000
- Check the browser console (F12) for error messages
- Verify no firewall is blocking localhost:5000

**Camera/Microphone permission denied**

- Check your browser's camera/microphone settings
- Look for permission prompts in the browser address bar
- Some browsers require HTTPS for camera access (but localhost works fine)

**Video not showing in peer streams**

- Ensure all users grant camera permissions
- Check browser console for WebRTC errors
- Verify your internet connection/firewall allows peer connections

**Messages not syncing**

- Refresh the page and rejoin
- Check if Socket.io connection is active (green "✓ Connected")
- Check browser console for any error messages

### Notes

- The app uses **STUN servers** (Google's public STUN servers) for NAT traversal
- Video streams are **peer-to-peer** (not relayed through the server) for better performance
- Chat messages are relayed through the server for synchronization
- The signaling server must be running for any real-time features to work

### File Structure

```
.
├── server.js                    # Signaling server (Express + Socket.io)
├── src/
│   └── pages/
│       └── Communication.tsx    # Group chat & video call component
├── package.json
└── README.md
```

### Performance Tips

- For production, deploy the signaling server to a cloud service (Heroku, AWS, etc.)
- Consider using a TURN server if users are behind restrictive firewalls
- Limit video calls to 5-6 participants for best performance
- Close unused browser tabs to free up resources

Enjoy your real-time communication! 🎉
