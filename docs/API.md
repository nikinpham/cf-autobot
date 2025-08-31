# BOMB AUTO BOT – API Specification

---

## API-1a – JOIN GAME

- **Socket Event**: `join game`
- **Method**:

```js
socketClient.emit('join game', Parameters);
```

- **Description**:
  Register bot into a match.

### Input Parameters

| Name      | Type   | Required | Description                     |
| --------- | ------ | :------: | ------------------------------- |
| game_id   | string |    ✅    | Unique identifier of the match. |
| player_id | string |    ✅    | Bot/player unique identifier.   |

### Example

```js
socketClient.emit('join game', {
  game_id: '5fa409dd-0b4a-45ee-8cbc-d645affe7f36',
  player_id: 'player1-xxx',
});
```

---

## API-1b – JOIN GAME

- **Socket Event**: `join game`
- **Method**:

```js
socketClient.on('join game', callbackFunction);
```

- **Description**:
  > Response parameters of callbackFunction(Response).  
  > When the team listens to this event, it must send API-4 (register character power).  
  > If not sent before the match starts, you will randomly receive a god to transform into.

### Input Parameters

| Name      | Type   | Required | Description                     |
| --------- | ------ | :------: | ------------------------------- |
| game_id   | string |    ✅    | Unique identifier of the match. |
| player_id | string |    ✅    | Bot/player unique identifier.   |

### Example

```json
{
  "game_id": "5fa409dd-0b4a-45ee-8cbc-d645affe7f36",
  "player_id": "player1-xxx"
}
```

---

## API-2 – TICKTACK

- **Socket Event**: `ticktack player`
- **Method**:

```js
socketClient.on('ticktack player', callbackFunction);
```

- **Description**:
  Response parameters of callbackFunction(Response).

### Ticktack Data Structure

| Name           | Type                         | Description                                                       |
| -------------- | ---------------------------- | ----------------------------------------------------------------- |
| id             | number                       | ID of the request                                                 |
| timestamp      | number                       | Timestamp of the request                                          |
| player_id      | string                       | Unique identifier of the player that triggered the ticktack event |
| map_info       | [Map](#map-object-structure) | Information of the game map                                       |
| tag            | [Tag Enum](#tag-enum-values) | Reason for ticktack update                                        |
| gameRemainTime | string                       | Remaining game time in seconds                                    |

### Map Object Structure

| Name          | Type                                        | Description                      |
| ------------- | ------------------------------------------- | -------------------------------- |
| size          | [MapSize](#map-size-structure)              |                                  |
| players       | [Player](#player-object-structure)[]        |                                  |
| map           | number[][]                                  | [Map values](#map-values)        |
| bombs         | [Bomb](#bomb)[]                             |                                  |
| spoils        | [Spoil](#spoil)[]                           |                                  |
| weaponHammers | [WeaponHammer](#weapon-hammer)[]            |                                  |
| weaponWinds   | [WeaponWind](#weapon-wind)[]                |                                  |
| weaponPlaces  | [WeaponPlace](#weapon-place)[]              |                                  |
| cellSize      | number                                      | Training: 35px; Fighting: 55px   |
| gameStatus    | [GameStatus Enum](#game-status-enum-values) | Only available in fighting stage |

#### Map Values

| Value | Name       | Description                                                                                                                    |
| :---: | ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
|   0   | ROAD       | Empty cell (players can pass through)                                                                                          |
|   1   | WALL       | Map boundary (indestructible)                                                                                                  |
|   2   | BOX        | Obstacle (can be destroyed)                                                                                                    |
|   3   | BRICK_WALL | Brick wall (blocks access to 'God Badge', can be destroyed using Wooden Hammer)                                                |
|   5   | PRISON     | Prison                                                                                                                         |
|   6   | GOD_BADGE  | God Badge (allows players to transform into an invincible god) <br> Players must stand on the badge for 3 seconds to transform |
|   7   | OTHER_ROAD | Land destroyed by special weapons (can be passed through)                                                                      |

#### Game Status Enum Values

| Value | Name          | Description |
| :---: | ------------- | ----------- |
|   2   | RUNNING_ROUND |             |
|   3   | PAUSE_ROUND   |             |
|  10   | GAME_OVER     |             |

### Player Object Structure

| Name                    | Type                  | Description |
| ----------------------- | --------------------- | ----------- |
| id                      | string                |             |
| currentPosition         | [Position](#position) |             |
| spawnBegin              | [Position](#position) |             |
| score                   | number                |             |
| lives                   | number                |             |
| transformType           | number                |             |
| ownerWeapon             | number[]              |             |
| currentWeapon           | number                |             |
| hasTransform            | boolean               |             |
| timeToUseSpecialWeapons | number                |             |
| haveSpecialWeapon       | boolean               |             |
| isStun                  | boolean               |             |
| speed                   | number                |             |
| power                   | number                |             |
| delay                   | number                |             |
| box                     | number                |             |
| brickWall               | number                |             |
| stickyRice              | number                |             |
| chungCake               | number                |             |
| nineTuskElephant        | number                |             |
| nineSpurRooster         | number                |             |
| nineManeHairHorse       | number                |             |
| eternalBadge            | number                |             |

#### Position

| Name | Type   | Description         |
| ---- | ------ | ------------------- |
| col  | number | Horizontal position |
| row  | number | Vertical position   |

#### Map Size

| Name | Type   | Description                                    |
| ---- | ------ | ---------------------------------------------- |
| cols | number | Number of columns (horizontal axis of the map) |
| rows | number | Number of rows (vertical axis of the map)      |

#### Bomb

extends [Position](#position).
| Name | Type | Description |
|------------|--------|-------------|
| remainTime | number | |
| playerId | number | |
| power | number | |
| createAt | number | |

#### Spoil

extends [Position](#position).
| Name | Type | Description |
|----------|--------|---------------------------------|
| spoil_type | [Spoil enum values](#spoil-enum-values) | |

#### Spoil enum values

| Value | Name                 | Description                 |
| ----- | -------------------- | --------------------------- |
| 32    | STICKY_RICE          | +1 Point                    |
| 33    | CHUNG_CAKE           | +2 Points                   |
| 34    | NINE_TUSK_ELEPHANT   | +5 Points and +1 Bomb power |
| 35    | NINE_SPUR_ROOSTER    | +3 Points                   |
| 36    | NINE_MANE_HAIR_HORSE | +4 Points                   |

#### Weapon Hammer

| Name        | Type                  | Description |
| ----------- | --------------------- | ----------- |
| playerId    | number                |             |
| power       | number                |             |
| destination | [Position](#position) |             |
| createAt    | number                |             |

#### Weapon Wind

extends [Position](#position).
| Name | Type | Description |
|----------|--------|---------------------------------|
| playerId | number | |
| destination |number | |

#### Weapon Place

extends [Position](#position).
| Name | Type | Description |
|----------|--------|---------------------------------|
| playerId | number | |

### Tag Enum Values

| Value                      | Name                | Description |
| :------------------------- | ------------------- | ----------- |
| player-joined              | JOINED              |             |
| player:moving-banned       | MOVING_BANNED       |             |
| player:start-moving        | START_MOVING        |             |
| player:stop-moving         | STOP_MOVING         |             |
| player:be-isolated         | BE_ISOLATED         |             |
| player:back-to-playground  | BACK_TO_PLAYGROUND  |             |
| player:pick-spoil          | PICK_SPOIL          |             |
| player:stun-by-weapon      | STUN_BY_WEAPON      |             |
| player:stun-timeout        | STUN_TIMEOUT        |             |
| player:transformed         | TRANSFORMED         |             |
| player:switched-weapon     | SWITCHED_WEAPON     |             |
| player:into-wedding-room   | INTO_WEDDING_ROOM   |             |
| player:out-to-wedding-room | OUT_TO_WEDDING_ROOM |             |
| player:wedding-completed   | WEDDING_COMPLETED   |             |
| bomb:setup                 | SETUP               |             |
| bomb:exploded              | EXPLODED            |             |
| start-game                 | GAME_START          |             |
| hammer:setup               | HAMMER_SETUP        |             |
| hammer:exploded            | HAMMER_EXPLODED     |             |
| wooden-pestle:setup        | WOODEN_SETUP        |             |
| wind:setup                 | WIND_SETUP          |             |
| wind:exploded              | WIND_EXPLODED       |             |

### Example

```json
{
  "id": 144,
  "timestamp": 1755936505373,
  "tag": "player-joined",
  "player_id": "player1-xxx",
  "gameRemainTime": 0,
  "map_info": {
    "size": {
      "cols": 42,
      "rows": 19
    },
    "players": [
      {
        "id": "player1-xxx",
        "currentPosition": {
          "col": 2,
          "row": 2
        },
        "spawnBegin": {
          "col": 2,
          "row": 2
        },
        "score": 0,
        "lives": 1000,
        "ownerWeapon": [1],
        "currentWeapon": 1,
        "hasTransform": false,
        "timeToUseSpecialWeapons": 4,
        "haveSpecialWeapon": true,
        "isStun": false,
        "speed": 230,
        "power": 1,
        "delay": 2000,
        "box": 0,
        "stickyRice": 0,
        "chungCake": 0,
        "nineTuskElephant": 0,
        "nineSpurRooster": 0,
        "nineManeHairHorse": 0,
        "eternalBadge": 0,
        "brickWall": 0
      },
      {
        "id": "player2-xxx",
        "currentPosition": {
          "col": 39,
          "row": 16
        },
        "spawnBegin": {
          "col": 39,
          "row": 16
        },
        "score": 0,
        "lives": 1000,
        "ownerWeapon": [1],
        "currentWeapon": 1,
        "hasTransform": false,
        "timeToUseSpecialWeapons": 4,
        "haveSpecialWeapon": true,
        "isStun": false,
        "speed": 230,
        "power": 1,
        "delay": 2000,
        "box": 0,
        "stickyRice": 0,
        "chungCake": 0,
        "nineTuskElephant": 0,
        "nineSpurRooster": 0,
        "nineManeHairHorse": 0,
        "eternalBadge": 0,
        "brickWall": 0
      }
    ],
    "map": [
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1
      ],
      [
        1, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0,
        0, 0, 0, 0, 1
      ],
      [
        1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2,
        0, 0, 0, 0, 1
      ],
      [
        1, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 0, 0, 2, 1, 2, 3, 0, 3, 3, 3, 3, 3, 3, 0, 3, 2, 1, 2, 0, 0, 2, 2, 2, 1, 2, 2,
        0, 0, 0, 0, 1
      ],
      [
        1, 0, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 0, 0, 2, 1, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 1, 2, 0, 0, 2, 2, 2, 1, 2, 2, 0,
        0, 0, 0, 0, 1
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 0, 0, 2, 1, 2, 3, 0, 3, 3, 0, 3, 2, 1, 2, 3, 3, 2, 2, 2, 1, 2, 2, 0, 0,
        0, 0, 0, 0, 1
      ],
      [
        1, 0, 0, 5, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 0, 0, 2, 1, 2, 0, 2, 2, 0, 2, 1, 2, 0, 0, 2, 2, 2, 1, 2, 2, 0, 0, 0,
        0, 5, 0, 0, 1
      ],
      [
        1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 1, 3, 3, 3, 3, 1, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 1
      ],
      [
        1, 0, 0, 0, 3, 0, 3, 0, 3, 3, 0, 2, 2, 2, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 2, 2, 2, 0, 3, 3, 0, 3, 0,
        3, 0, 0, 0, 1
      ],
      [
        1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 3, 0, 3, 0, 3, 0, 6, 2, 2, 6, 0, 3, 0, 3, 0, 3, 0, 0, 0, 2, 2, 2, 2, 2,
        2, 2, 0, 0, 1
      ],
      [
        1, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 3, 2, 2, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 2, 2, 3, 3, 0, 3, 0, 3, 0,
        3, 0, 0, 0, 1
      ],
      [
        1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 1, 3, 3, 3, 3, 1, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 1
      ],
      [
        1, 0, 0, 5, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 0, 0, 2, 1, 2, 0, 2, 2, 0, 2, 1, 2, 0, 0, 2, 2, 2, 1, 2, 2, 0, 0, 0,
        0, 5, 0, 0, 1
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 0, 0, 2, 1, 2, 3, 0, 3, 3, 0, 3, 2, 1, 2, 3, 3, 2, 2, 2, 1, 2, 2, 0, 0,
        0, 0, 0, 0, 1
      ],
      [
        1, 0, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 0, 0, 2, 1, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 1, 2, 0, 0, 2, 2, 2, 1, 2, 2, 0,
        0, 0, 0, 0, 1
      ],
      [
        1, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 0, 0, 2, 1, 2, 3, 0, 3, 3, 3, 3, 3, 3, 0, 3, 2, 1, 2, 0, 0, 2, 2, 2, 1, 2, 2,
        0, 0, 0, 0, 1
      ],
      [
        1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2,
        0, 0, 0, 0, 1
      ],
      [
        1, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3,
        0, 0, 0, 0, 1
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1
      ]
    ],
    "bombs": [],
    "spoils": [],
    "weaponHammers": [],
    "weaponWinds": [],
    "weaponPlaces": [],
    "gameStatus": null,
    "cellSize": 35
  }
}
```

---

## API-3 – DRIVE PLAYER

- **Socket Event**: `drive player`
- **Method**:

```js
socketClient.emit('drive player', Parameters);
```

- **Description**:
  Send request to move your bot.

### Input Parameters

| Name          | Type                                                       | Required | Description |
| ------------- | ---------------------------------------------------------- | :------: | ----------- |
| direction     | string (sequence of [Direction Values](#direction-values)) |    ✅    |             |
| characterType | "child" or undefined                                       |    ❌    |             |

#### Direction Values

| Value | Name        | Description |
| ----- | ----------- | ----------- |
| '1'   | MOVE_LEFT   |             |
| '2'   | MOVE_RIGHT  |             |
| '3'   | MOVE_UP     |             |
| '4'   | MOVE_DOWN   |             |
| 'b'   | ATTACK      |             |
| 'x'   | STOP_MOVING |             |

### Example

Control main bot

```js
socketClient.emit('drive player', {
  direction: '111b2222',
});
```

Control sub bot

```js
socketClient.emit('drive player', {
  direction: '1',
  characterType: 'child',
});
```

---

## API-4 – REGISTER CHARACTER POWER

- **Socket Event**: `register character power`
- **Method**:

```js
socketClient.emit('register character power', Parameters);
```

- **Description**:
  If the player does not choose a god, the server will randomly assign one before the match starts!

### Input Parameters

| Name   | Type                              | Required | Description |
| ------ | --------------------------------- | :------: | ----------- |
| gameId | string                            |    ✅    |             |
| type   | [Transform Type](#transform-type) |    ✅    |             |

#### Transform Type

| Value | Name         | Description |
| ----- | ------------ | ----------- |
| '1'   | MOUNTAIN_GOD |             |
| '2'   | SEA_GOD      |             |

### Example

```js
socketClient.emit('register character power', {
  gameId: 'a7557424-be4f-47e9-b20e-345b055bf128',
  type: 1,
});
```

---

## API-5 – ACTIONS

- **Socket Event**: `action`
- **Method**:

```js
socketClient.emit('action', Parameters);
```

- **Description**:
  > USE_WEAPON:  
  > If the player transforms into:
  >
  > - Mountain God (Son Tinh): the player can cast 'Sacred Wooden Pestle', with a cooldown of 10 seconds for each throw.
  > - Sea God (Thuy Tinh): the player can cast 'Sacred Storm Wind', with a cooldown of 5 seconds for each cast.
  >
  > MARRY_WIFE:  
  > After obtaining the 'Eternal Badge', the player can marry the princess (Mi Nuong).
  >
  > - For the first 3 seconds after sending the marriage command, the character will enter the wedding room state (moving will cancel this state).
  > - The character will stay in the wedding room for 9 seconds of the wedding ceremony.
  > - 3 seconds after the wedding ceremony ends, a child will be born (controlled by the teams).

### Input Parameters

| Name    | Type                                       | Required | Description |
| ------- | ------------------------------------------ | :------: | ----------- |
| action  | [Actions Enum Values](#action-enum-values) |    ✅    |             |
| payload | [Payload Action](#payload-action)          |    ❌    |             |

#### Payload Action

| Name          | Type                  | Required | Description                                                                                                        |
| ------------- | --------------------- | :------: | ------------------------------------------------------------------------------------------------------------------ |
| destination   | [Position](#position) |    ❌    | Only used when MOUNTAIN_GOD                                                                                        |
| distance      | number                |    ❌    | Only used when SEA_GOD. Determines the target of Sacred Storm Wind. If not emitted, it defaults to infinite range. |
| characterType | "child" or undefined  |    ❌    |                                                                                                                    |

#### Action Enum Values

| Value         | Name          | Description |
| ------------- | ------------- | ----------- |
| switch weapon | SWITCH_WEAPON |             |
| use weapon    | USE_WEAPON    |             |
| marry wife    | MARRY_WIFE    |             |

### Example

#### Example 1

```js
socketClient.emit('action', {
  action: 'marry wife',
});
```

#### Example 2

```js
socketClient.emit('action', {
  action: 'use weapon',
  payload: {
    destination: { col: 13, row: 4 },
    characterType: 'child',
  },
});
```

## API-6 – PLAYER SPEAK

- **Socket Event**: `player speak`
- **Method**:

```js
socketClient.emit('player speak', Parameters);
```

### Input Parameters

| Name    | Type   | Required | Description                        |
| ------- | ------ | :------: | ---------------------------------- |
| command | string |    ✅    | The text the player wants to chat. |

### Example

```js
socketClient.emit('player speak', {
  command: 't4',
});
```
