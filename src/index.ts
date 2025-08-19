import dotenv from 'dotenv';
import express from 'express';
import createPlayerSocket from './socket';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.SOCKET_URL || 'http://localhost';

// PLAYER
createPlayerSocket(HOST, process.env.PLAYER_ID_JOIN_GAME || 'player1-xxx');

// DUMP BOT
createPlayerSocket(HOST, "player2-xxx");

app.listen(PORT, () => {
    console.log(`Express server running on ${HOST}:${PORT}`);
});
