import { io as ClientIO, Socket } from 'socket.io-client';
import { TRANSFORMED_TYPES } from '../constants';

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

    socket.on("ticktack player", res => {
        // socket.emit('player speak', { command: 't4' });
        socket.emit('drive player', {
            direction: '1'
        });
    });

    return socket;
}

export default createPlayerSocket