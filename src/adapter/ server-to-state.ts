import { SPOIL_TYPES } from "../constants";
import { djb2Hash, mapCellToEnum, mapSpoilToEnum } from "../helpers";
import { TickUpdate } from "../types/game-info";
import { Bomb } from "../types/player";

export type State = {
}

function parseTickToState(tick: TickUpdate): State {
    const { timestamp, map_info, player_id } = tick;

    const W = map_info.size.cols | 0;
    const H = map_info.size.rows | 0;
    const now = Number(timestamp);

    const p1 = map_info.players[0];
    const p2 = map_info.players[1];
    const meRaw = p1?.player_id === player_id ? p1 : p2;
    const oppRaw = p1?.player_id === player_id ? p2 : p1;

    // Convert Grid
    const grid = new Uint8Array(W * H);

    for (let y = 0; y < H; y++) {
        const row = map_info.map[y];
        for (let x = 0; x < W; x++) {
            const v = row[x];
            grid[y * W + x] = mapCellToEnum(v);
        }
    }

    for (const s of map_info.spoils ?? []) {
        const i = (s.col | 0) * W + (s.row | 0);
        grid[i] = mapSpoilToEnum(s);
    }

    const bombs: Bomb[] = [];
    for (const b of map_info.bombs ?? []) {
        bombs.push(b);
        const bi = (b.row | 0) * W + (b.col | 0);
        grid[bi] = SPOIL_TYPES.BOMB;
    }

    const gridVersion = djb2Hash(grid);
    const bombsHash = djb2Hash(
        bombs.flatMap((bb) => [bb.col & 255, bb.row & 255, (bb.remainTime / 100) | 0]),
    );

    return { now, W, H, grid, bombs, gridVersion, bombsHash };
}
export default parseTickToState;