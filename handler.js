import { sendToAgent } from './ws-client.js'

const pending = {}

export function handleIncoming(sock, sender, text) {
  console.log("📩 WA_IN:", text)

  pending[sender] = sock

  sendToAgent(text, sender)
}

export function handleAgentResponse(msg) {
  if (msg.type === 'final') {
    const sock = pending[msg.session_id]

    if (sock) {
      console.log("📤 WA_OUT:", msg.content)

      sock.sendMessage(msg.session_id, {
        text: msg.content
      })
    }
  }
}
