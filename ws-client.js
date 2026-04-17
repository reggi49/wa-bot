import WebSocket from 'ws'
import { config } from './config.js'

let ws
let onMessageCallback

export function connectWS(onMessage) {
  onMessageCallback = onMessage

  const url = `${config.openClawWsUrl}/ws?token=${config.token}`

  ws = new WebSocket(url)

  ws.on('open', () => {
    console.log('🔥 OpenClaw WS connected')

    ws.send(JSON.stringify({
      type: "init",
      payload: {
        session_id: "wa-bot-system"
      }
    }))
  })

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString())
      if (onMessageCallback) onMessageCallback(msg)
    } catch (e) {
      console.log("⚠️ Parse error:", e.message)
    }
  })

  ws.on('close', (code, reason) => {
    console.log(`❌ WS closed (${code}). Reconnecting in 5s...`)
    setTimeout(() => connectWS(onMessageCallback), 5000)
  })

  ws.on('error', (err) => {
    console.log("❌ WS error:", err.message)
  })
}

export function sendToAgent(message, session_id) {
  if (!ws || ws.readyState !== 1) return

  ws.send(JSON.stringify({
    type: "chat",
    payload: {
      message,
      session_id,
      stream: false
    }
  }))
}