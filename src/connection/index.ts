import { io as ClientIO, Socket } from 'socket.io-client';

type EmitJoin = { game_id: string; player_id: string };
type EmitDrive = { direction: string; characterType?: 'child' };
type EmitRegister = { gameId: string; type: TransformType.MOUNTAIN_GOD | TransformType.SEA_GOD };
type EmitAction = {
  action: ActionType.SWITCH_WEAPON | ActionType.USE_WEAPON | ActionType.MARRY_WIFE;
  payload?: Partial<{
    destination: Position;
    distance: number;
    characterType?: 'child';
  }>;
};

export class GameSocket {
  constructor(private socket: Socket) {}

  static connect(url: string) {
    const socket = ClientIO(url, {
      transports: ['websocket'],
      reconnection: true,
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
