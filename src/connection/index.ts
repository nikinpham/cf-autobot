import { io as ClientIO, Socket } from 'socket.io-client';
// import parseTickToState from '../adapter/server-to-state';

// function createPlayerSocket(host: string, player_id: string): Socket {
//     const socket: Socket = ClientIO(host, {
//         transports: ['websocket'],
//         reconnection: true
//     });

//     socket.on('connect', () => {
//         socket.emit('join game', {
//             game_id: process.env.GAME_ID,
//             player_id: player_id
//         });
//     });

//     socket.on('join game', res => {
//         socket.emit('register character power', {
//             gameId: res.game_id,
//             type: TransformType.SEA_GOD
//         });
//     });

//     const outBuf = new Uint8Array(256);

//     socket.on("ticktack player", (res: Ticktack) => {
//         // socket.emit('player speak', { command: 't4' });
//         if (res.player_id === "player1-xxx") {
//             // console.log(JSON.stringify(res))
//             const s = parseTickToState(res);
//             // socket.emit('drive player', {
//             //     direction: '2b11'
//             // });
//         }
//     });

//     socket.on('drive player', res => {
//         if (res.player_id === "player1-xxx") {
//         }
//     });

//     return socket;
// }

// export default createPlayerSocket
type EmitJoin = { game_id: string; player_id: string };
type EmitDrive = { direction: string; characterType?: "child" };
type EmitRegister = { gameId: string; type: TransformType.MOUNTAIN_GOD | TransformType.SEA_GOD };
type EmitAction = {
    action: ActionType.SWITCH_WEAPON |
    ActionType.USE_WEAPON |
    ActionType.MARRY_WIFE;
    payload?: Partial<
        {
            destination: Position;
            distance: number;
            characterType?: "child"
        }>
};

export class GameSocket {
    constructor(private socket: Socket) { }

    static connect(url: string) {
        const socket = ClientIO(url, {
            transports: ["websocket"],
            reconnection: true
        });
        return new GameSocket(socket);
    }

    on<T = any>(event: string, cb: (data: T) => void) {
        this.socket.on(event, cb);
    }

    joinGame(p: EmitJoin) {
        this.socket.emit(EmitType.JOIN_GAME, p);
    }
    drive(p: EmitDrive) {
        this.socket.emit(EmitType.DRIVE_PLAYER, p);
    }
    register(p: EmitRegister) {
        this.socket.emit(EmitType.REGISTER_CHARACTER_POWER, p);
    }
    action(p: EmitAction) {
        this.socket.emit(EmitType.ACTION, p);
    }
}