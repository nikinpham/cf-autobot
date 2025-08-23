import botState from "../adapter/server-to-state";
import { GameSocket } from "../connection";

export class SeaGodStrategy {
    constructor(private sock: GameSocket, private meId: string, private gameId: string) { }

    onJoinGame() {
        this.sock.register({ gameId: this.gameId, type: TransformType.SEA_GOD });
        console.log("registered", this.meId)
    }

    onTick(t: Ticktack) {
        const s = botState(t);
    }
}