# WA-Bot OpenClaw Integration

This project is a WhatsApp Bot implemented using `@whiskeysockets/baileys` that integrates with the OpenClaw WebSocket server to handle conversational intelligence and chat flows.

## Project Structure

- `index.js`: The main entry point. Sets up the WhatsApp socket connection and listens to incoming messages.
- `config.js`: Configuration for the OpenClaw WebSocket URL and authentication token.
- `ws-client.js`: The WebSocket client that connects to the OpenClaw agent and handles incoming/outgoing events to the backend.
- `handler.js`: Contains functions that handle the formatting and relaying of messages between WhatsApp and the OpenClaw agent.

## Setup & Running

1. Ensure you have Node.js installed on your machine.
2. Run `npm install` to install dependencies.
3. Start the application: `node index.js`.
4. A QR code will display in your terminal. Scan it using your WhatsApp application to authenticate the device's session.

## Configuration

Update `config.js` as necessary to point `openClawWsUrl` and `token` to a valid instance of the OpenClaw service.
