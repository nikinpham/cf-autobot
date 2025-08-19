export type TickUpdate = {
    id: number;
    timestamp: number;
    player_id: string;
    map_info: {
        size: {
            cols: number;
            rows: number;
        };
        players: Player[];
        map: number[][];
        bombs: Bomb[];
        spoils: Spoil[];
        weaponHammers: WeaponHammer[];
        weaponWinds: WeaponWind[];
        weaponPlaces: WeaponPlace[];
        gameStatus: number;
        cellSize: number;
    };
    tag: string;
    gameRemainTime: string;
} 