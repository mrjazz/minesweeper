var EMPTY = -1;
var BOMB = 9;
var WIDTH = 10;
var HEIGHT = 10;

export default class Game {

    static init() {
        var _map = [];
        for(var i = 0; i < HEIGHT; i++) {
            var row = [];
            for(var j = 0; j < WIDTH; j++) {
                row.push(Math.round(Math.random() * 10) == 1 ? BOMB : EMPTY);
            }
            _map.push(row);
        }
        return _map;
    }

    static applyUpdate(map, updates) {
        for (var i in updates) {
            var update = updates[i];
            map[update.y][update.x] = update.v;
        }
        return map;
    }

    static getUpdatesForShoot(map, x, y) {        
        if (        
            x < 0 ||
            y < 0 ||
            x >= WIDTH ||
            y >= WIDTH ||
            map[y][x] != -1
        ) {
            return [];
        }
        
        var self = this;

        var updates = [];
        var around = this.howManyAround(map, x, y);        
        updates.push({x: x, y: y, v: around});
        map = this.applyUpdate(map, updates);

        if (around === 0) {
            // calculate deeper
            [-1, 0, 1].map(function (delta_y) {
                [-1, 0, 1].map(function (delta_x) {                    
                    var u = self.getUpdatesForShoot(map, x + delta_x, y + delta_y);
                    map = self.applyUpdate(map, u);
                    updates.concat(u);
                });
            });
        }

        return updates;
    }

    static howManyAround(map, x, y) {
        var result = 0;

        if (y > 0 && map[y - 1][x] == BOMB) result++;
        if (y < HEIGHT - 1 && map[y + 1][x] == BOMB) result++;

        if (x < WIDTH - 1 && map[y][x + 1] == BOMB) result++;
        if (x > 0 && map[y][x - 1] == BOMB) result++;

        if (y > 0 && x > 0 && map[y - 1][x - 1] == BOMB) result++;
        if (y > 0 && x < HEIGHT - 1 && map[y - 1][x + 1] == BOMB) result++;

        if (y < HEIGHT - 1 && x > 0 && map[y + 1][x - 1] == BOMB) result++;
        if (y < HEIGHT - 1 && x < WIDTH - 1 && map[y + 1][x + 1] == BOMB) result++;

        return result;
    }

    static shoot(map, x, y) {
        if (y >= map.length || x >= map[0].length) return ["none", map];
        if (y < 0 || x < 0) return ["none", map];

        switch(map[y][x]) {
            case BOMB: return ["fail", map];
            case EMPTY:
                var updates = Game.getUpdatesForShoot(map, x, y);
                var result_map = Game.applyUpdate(map, updates);
                return [this.checkWin(map) === 0 ? "win" : result_map[y][x], result_map];
            default: return ["none", map];
        }
    }

    static showMines(map) {
        for (var i in map) {
            for (var j in map[i]) {
                map[i][j] = map[i][j] == 9 ? 10 : map[i][j];
            }
        }
        return map;
    }

    static checkWin(map) {
        return map.reduce(function (res, row, i) {
            return res + row.reduce(function (res, col, j) {                
                return res + (map[i][j] == -1 ? 1 : 0);
            }, 0);                    
        }, 0);
    }
}

