import { MAP_VALUES, SPOIL_TYPES } from "../constants";
import { Spoil } from "../types/player";

function mapCellToEnum(v: number): number {
    switch (v) {
        case 1: return MAP_VALUES.OUTLINE;
        case 2: return MAP_VALUES.BOX;
        case 3: return MAP_VALUES.BRICK_WALL;
        case 5: return MAP_VALUES.PRISON;
        case 6: return MAP_VALUES.GOD_BADGE;
        default: return MAP_VALUES.ROAD;
    }
}


function mapSpoilToEnum(s: Spoil): number {
    switch ((s.spoilType)) {
        case 33: return SPOIL_TYPES.CHUNG_CAKE;
        case 34: return SPOIL_TYPES.NINE_TUSK_ELEPHANT;
        case 35: return SPOIL_TYPES.NINE_SPUR_ROOSTER;
        case 36: return SPOIL_TYPES.NINE_MANE_HAIR_HORSE;
        default: return SPOIL_TYPES.STICKY_RICE;
    }
}

/**
 * djb2Hash - A simple and fast non-cryptographic hash function
 * Commonly used for quick change detection on arrays/buffers.
 *
 * @param buf - Input data (Uint8Array or number array)
 * @returns A 32-bit unsigned integer hash
 */
function djb2Hash(buf: Uint8Array | number[]): number {
    // Initialize hash with a "magic" constant seed (5381)
    let h = 5381 >>> 0;

    const n = buf.length;
    for (let i = 0; i < n; i++) {
        // Hash = hash * 33 + current_value
        // (h << 5) is h * 32, so (h << 5) + h = h * 33
        // >>> 0 ensures the result stays as an unsigned 32-bit integer
        h = (((h << 5) + h) + (buf[i]!)) >>> 0;
    }

    // Return the final hash value as a 32-bit unsigned integer
    return h >>> 0;
}


export {
    djb2Hash, mapCellToEnum,
    mapSpoilToEnum
};
