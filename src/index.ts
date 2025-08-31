import dotenv from 'dotenv';
import express from 'express';

import { GameSocket } from './connection';
import { SeaGodStrategy } from './planner';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const SERVER_URL = process.env.SOCKET_URL || 'http://localhost';
const GAME_ID = process.env.GAME_ID ?? '91234a86-5234-4eac-b5e4-dcff08d4e8b7';
const PLAYER_ID = process.env.PLAYER_ID_JOIN_GAME ?? 'player1-xxx';

async function seaGod() {
  const socketClient = GameSocket.connect(SERVER_URL);
  const seaGod = new SeaGodStrategy(socketClient, PLAYER_ID, GAME_ID);

  socketClient.on(EventSocketType.CONNECT, () => {
    socketClient.joinGame({ game_id: GAME_ID, player_id: PLAYER_ID });
  });

  socketClient.on(EventSocketType.JOIN_GAME, (_resp: { game_id: string; player_id: string }) => {
    seaGod.onJoinGame();
  });

  socketClient.on(EventSocketType.TICK, (t: Ticktack) => {
    try {
      seaGod.onTick(t);
    } catch (e) {
      console.error(e);
    }
  });
}

seaGod().catch(console.error);

async function mountainGod() {
  const socketClient = GameSocket.connect(SERVER_URL);
  socketClient.on(EventSocketType.CONNECT, () => {
    socketClient.joinGame({ game_id: GAME_ID, player_id: 'player2-xxx' });
  });
}

mountainGod();

app.listen(PORT, () => {
  console.log(`Express server running on ${SERVER_URL}:${PORT}`);
});
