import { io as ClientIO, Socket } from 'socket.io-client';
import parseTickToState from '../adapter/server-to-state';
import { TRANSFORMED_TYPES } from '../constants';
import { TickUpdate } from '../types/game-info';

function createPlayerSocket(host: string, player_id: string): Socket {
    const socket: Socket = ClientIO(host, {
        transports: ['websocket'],
        reconnection: true
    });

    socket.on('connect', () => {
        socket.emit('join game', {
            game_id: process.env.GAME_ID,
            player_id: player_id
        });
    });

    socket.on('join game', res => {
        socket.emit('register character power', {
            gameId: res.game_id,
            type: TRANSFORMED_TYPES.SEA_GOD
        });
    });

    const outBuf = new Uint8Array(256);

    socket.on("ticktack player", (res: TickUpdate) => {
        // socket.emit('player speak', { command: 't4' });
        if (res.player_id === "player1-xxx") {
            // console.log(res)
            const s = parseTickToState(res);
            // socket.emit('drive player', {
            //     direction: '2b11'
            // });
        }
    });

    socket.on('drive player', res => {
        if (res.player_id === "player1-xxx") {
            // console.log(res.direction);
        }
    });

    return socket;
}

export default createPlayerSocket