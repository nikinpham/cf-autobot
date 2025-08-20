export type Bomb = {
    row: number;
    col: number;
    remainTime: number;
    playerId: number;
    power: number;
    createAt: number;
}

export type Spoil = {
    row: number;
    col: number;
    spoilType: number;
}

export type WeaponHammer = {
    playerId: number;
    power: number;
    destination: {
        row: number;
        col: number;
    };
    createAt: number;
}

export type WeaponWind = {
    playerId: number;
    row: number;
    col: number;
    destination: number
}

export type WeaponPlace = {
    playerId: number;
    row: number;
    col: number;
}

export type Player = {
    id: string;
    currentPosition: {
        col: number;
        row: number;
    };
    spawnBegin: {
        col: number;
        row: number;
    };
    score: number;
    lives: number;
    transformType: number;
    ownerWeapon: number[];
    currentWeapon: number;
    hasTransform: boolean;
    timeToUseSpecialWeapons: number;
    haveSpecialWeapon: true;
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