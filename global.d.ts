export { };
declare global {
    const enum EmitType {
        JOIN_GAME = "join game",
        DRIVE_PLAYER = "drive player",
        REGISTER_CHARACTER_POWER = "register character power",
        ACTION = "action",
    }

    const enum EventSocketType {
        JOIN_GAME = "join game",
        TICK = "ticktack player",
        CONNECT = "connect"
    }

    const enum MapValues {
        ROAD = 0,
        WALL = 1,
        BOX = 2,
        BRICK_WALL = 3,
        PRISON = 5,
        GOD_BADGE = 6,
        OTHER_ROAD = 7
    }

    const enum GameStatus {
        RUNNING_ROUND = 2,
        PAUSE_ROUND = 3,
        GAME_OVER = 10
    }

    type DirectionValue = "1" | "2" | "3" | "4" | "b" | "x";

    const enum TransformType {
        MOUNTAIN_GOD = 1,
        SEA_GOD = 2
    }

    const enum ActionType {
        SWITCH_WEAPON = "switch weapon",
        USE_WEAPON = "use weapon",
        MARRY_WIFE = "marry wife"
    }

    const enum SpoilType {
        STICKY_RICE = 32,       // +1 Point
        CHUNG_CAKE = 33,        // +2 Points
        NINE_TUSK_ELEPHANT = 34,// +5 Points and +1 Bomb power
        NINE_SPUR_ROOSTER = 35, // +3 Points
        NINE_MANE_HAIR_HORSE = 36 // +4 Points
    }

    interface Position {
        col: number;
        row: number;
    }

    const enum TagEnum {
        PLAYER_JOINED = "player-joined",
        PLAYER_MOVING_BANNED = "player:moving-banned",
        PLAYER_START_MOVING = "player:start-moving",
        PLAYER_STOP_MOVING = "player:stop-moving",
        PLAYER_BE_ISOLATED = "player:be-isolated",
        PLAYER_BACK_TO_PLAYGROUND = "player:back-to-playground",
        PLAYER_PICK_SPOIL = "player:pick-spoil",
        PLAYER_STUN_BY_WEAPON = "player:stun-by-weapon",
        PLAYER_STUN_TIMEOUT = "player:stun-timeout",
        PLAYER_TRANSFORMED = "player:transformed",
        PLAYER_SWITCHED_WEAPON = "player:switched-weapon",
        PLAYER_INTO_WEDDING_ROOM = "player:into-wedding-room",
        PLAYER_OUT_TO_WEDDING_ROOM = "player:out-to-wedding-room",
        PLAYER_WEDDING_COMPLETED = "player:wedding-completed",
        BOMB_SETUP = "bomb:setup",
        BOMB_EXPLODED = "bomb:exploded",
        START_GAME = "start-game",
        HAMMER_SETUP = "hammer:setup",
        HAMMER_EXPLODED = "hammer:exploded",
        WOODEN_PESTLE_SETUP = "wooden-pestle:setup",
        WIND_SETUP = "wind:setup",
        WIND_EXPLODED = "wind:exploded"
    }


    interface Player {
        id: string;
        currentPosition: Position;
        spawnBegin: Position;
        score: number;
        lives: number;
        transformType: TransformType;
        ownerWeapon: number[];
        currentWeapon: number;
        hasTransform: boolean;
        timeToUseSpecialWeapons: number;
        haveSpecialWeapon: boolean;
        isStun: boolean;
        speed: number;
        power: number;
        delay: number;
        box: number;
        brickWall: number;
        stickyRice: number;
        chungCake: number;
        nineTuskElephant: number;
        nineSpurRooster: number;
        nineManeHairHorse: number;
        eternalBadge: number;
    }

    interface Ticktack {
        id: number;
        timestamp: number;
        player_id: string;
        tag: string;
        gameRemainTime: number | string;
        map_info: MapInfo;
    }

    interface MapInfo {
        size: { cols: number; rows: number };
        players: Player[];
        map: number[][];
        bombs: Bomb[];
        spoils: Spoil[];
        weaponHammers: WeaponHammer[];
        weaponWinds: WeaponWind[];
        weaponPlaces: WeaponPlace[];
        cellSize: number;
        gameStatus?: GameStatus | null;
    }

    interface Bomb extends Position {
        remainTime: number;
        playerId: number;
        power: number;
        createAt: number;
    }

    interface Spoil extends Position {
        spoil_type: number;
    }

    interface WeaponHammer {
        playerId: number;
        power: number;
        destination: Position;
        createAt: number;
    }

    interface WeaponWind extends Position {
        playerId: number;
        destination: number;
    }

    interface WeaponPlace extends Position {
        playerId: number;
    }
}