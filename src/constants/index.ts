export enum MAP_VALUES {
    ROAD = 0,
    OUTLINE = 1,
    BOX = 2,
    BRICK_WALL = 3,
    PRISON = 5,
    GOD_BADGE = 6,
    SPECIAL_ROAD = 7
}

export enum SPOIL_TYPES {
    STICKY_RICE = 32,
    CHUNG_CAKE = 33,
    NINE_TUSK_ELEPHANT = 34,
    NINE_SPUR_ROOSTER = 35,
    NINE_MANE_HAIR_HORSE = 36,
    BOMB = 99
}

export enum GAME_STATUS {
    RUNNING = 2,
    PAUSE = 3,
    GAME_OVER = 10
}

export enum PLAYER_TAGS {
    MOVING_BANNED = "player:moving-banned",
    START_MOVING = "player:start-moving",
    STOP_MOVING = "player:stop-moving",
    BE_ISOLATED = "player:be-isolated",
    BACK_TO_PLAYGROUND = "player:back-to-playground",
    PICK_SPOIL = "player:pick-spoil",
    STUN_BY_WEAPON = "player:stun-by-weapon",
    STUN_TIMEOUT = "player:stun-timeout",
    TRANSFORMED = "player:transformed",
    SWITCHED_WEAPON = "player:switched-weapon"
}

export enum BOMB_TAGS {
    SETUP = "bomb:setup",
    EXPLODED = "bomb:exploded"
}

export enum GAME_TAGS {
    GAME_START = "start-game",
    UPDATE_DATA = "update-data"
}

export enum WEDDING_TAGS {
    INTO_WEDDING_ROOM = "player:into-wedding-room",
    OUT_TO_WEDDING_ROOM = "player:out-to-wedding-room",
    WEDDING_COMPLETED = "player:wedding-completed"
}

export enum HAMMER_TAGS {
    SETUP = "hammer:setup",
    EXPLODED = "hammer:exploded"
}

export enum WOODEN_TAGS {
    SETUP = "wooden-pestle:setup"
}

export enum WEAPON_WIND_TAGS {
    SETUP = "wind:setup",
    EXPLODED = "wind:exploded"
}

export enum DIRECTIONS {
    LEFT = '1',
    RIGHT = '2',
    UP = '3',
    DOWN = '4',
    ATTACK = 'b',
    STOP_MOVING = 'x'
}

export enum TRANSFORMED_TYPES {
    MOUNTAIN_GOD = '1',
    SEA_GOD = '2'
}