export type Position = {
    row: number;
    col: number;
}

export type Bomb = Position & {
    remainTime: number;
    playerId: number;
    power: number;
    createAt: number;
}

export type Spoil = Position & {
    spoilType: number;
}

export type WeaponHammer = {
    playerId: number;
    power: number;
    destination: Position;
    createAt: number;
}

export type WeaponWind = Position & {
    playerId: number;
}

export type WeaponPlace = Position & {
    playerId: number;
}

export type Player = {
    id: string;
    currentPosition: Position;
    spawnBegin: Position;
    score: number;
    lives: number;
    transformType: number;
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
    stickyRice: number;
    chungCake: number;
    nineTuskElephant: number;
    nineSpurRooster: number;
    nineManeHairHorse: number;
    eternalBadge: number;
    brickWall: number;
}