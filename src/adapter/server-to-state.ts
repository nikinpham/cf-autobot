import { djb2Hash, mapCellToEnum, mapSpoilToEnum } from "../helpers";

export type BotState = {};
/**
 * Convert a raw game tick update (from server) into a processed state
 * that can be easily consumed by the client for rendering or decision making.
 */
function botState(tick: Ticktack): BotState {
    const { timestamp, map_info, player_id } = tick;

    // Map dimensions
    const W = map_info.size.cols | 0;
    const H = map_info.size.rows | 0;

    // Current tick timestamp
    const now = Number(timestamp);

    // Identify "me" and "opponent" based on player_id
    const p1 = map_info.players[0];
    const p2 = map_info.players[1];
    const meRaw = p1?.id === player_id ? p1 : p2;
    const oppRaw = p1?.id === player_id ? p2 : p1;

    // Convert the raw map into a grid of enums
    const grid = new Uint8Array(W * H);

    for (let y = 0; y < H; y++) {
        const row = map_info.map[y];
        for (let x = 0; x < W; x++) {
            const v = row[x];
            grid[y * W + x] = mapCellToEnum(v); // Map cell to enum value
        }
    }

    // Place spoils (power-ups, items, etc.) on the grid
    for (const s of map_info.spoils ?? []) {
        const i = (s.col | 0) * W + (s.row | 0); // index = row-major calculation
        grid[i] = mapSpoilToEnum(s); // Convert spoil type to enum
    }

    // Place bombs on the grid and keep track of them
    const bombs: Bomb[] = [];
    for (const b of map_info.bombs ?? []) {
        bombs.push(b);
        const bi = (b.row | 0) * W + (b.col | 0); // index of bomb
        grid[bi] = SpoilType.BOMB; // Mark grid cell as bomb
    }

    // Hash of the grid for change detection (fast comparison)
    const gridVersion = djb2Hash(grid);

    // Hash bombs' positions and timers to detect bomb state changes
    const bombsHash = djb2Hash(
        bombs.flatMap((bb) => [bb.col & 255, bb.row & 255, (bb.remainTime / 100) | 0]),
    );

    // Return structured state
    return { now, W, H, grid, bombs, gridVersion, bombsHash };
}

export default botState;