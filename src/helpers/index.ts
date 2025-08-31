function mapCellToEnum(v: number): number {
  switch (v) {
    case MapValues.WALL:
      return MapValues.WALL;
    case MapValues.BOX:
      return MapValues.BOX;
    case MapValues.BRICK_WALL:
      return MapValues.BRICK_WALL;
    case MapValues.PRISON:
      return MapValues.PRISON;
    case MapValues.GOD_BADGE:
      return MapValues.GOD_BADGE;
    default:
      return MapValues.ROAD;
  }
}

function mapSpoilToEnum(s: Spoil): number {
  switch (s.spoil_type) {
    case SpoilType.CHUNG_CAKE:
      return SpoilType.CHUNG_CAKE;
    case SpoilType.NINE_TUSK_ELEPHANT:
      return SpoilType.NINE_TUSK_ELEPHANT;
    case SpoilType.NINE_SPUR_ROOSTER:
      return SpoilType.NINE_SPUR_ROOSTER;
    case SpoilType.NINE_MANE_HAIR_HORSE:
      return SpoilType.NINE_MANE_HAIR_HORSE;
    default:
      return SpoilType.STICKY_RICE;
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
    h = ((h << 5) + h + buf[i]!) >>> 0;
  }

  // Return the final hash value as a 32-bit unsigned integer
  return h >>> 0;
}

export { djb2Hash, mapCellToEnum, mapSpoilToEnum };
