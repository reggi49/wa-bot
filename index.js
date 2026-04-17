import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} from '@whiskeysockets/baileys'

import P from 'pino'
import qrcode from 'qrcode-terminal'

import { connectWS } from './ws-client.js'
import { handleIncoming, handleAgentResponse } from './handler.js'

const logger = P({ level: 'silent' })

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    }
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', ({ connection, qr }) => {
    if (qr) qrcode.generate(qr, { small: true })
    if (connection === 'open') console.log('✅ WA Connected')
  })

  sock.ev.on('messages.upsert', ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const sender = msg.key.remoteJid
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text

    if (!text) return

    handleIncoming(sock, sender, text)
  })

  connectWS(handleAgentResponse)
}

startBot()