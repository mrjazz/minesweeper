// jest.dontMock('../js/game');
// var game = require('../js/game');

import 'should';

import Game from '../public/js/api/Game.js';

describe('Game logic', function() {

    it('Game init', function() {
        var map = Game.init();
        map.length.should.equal(10);
        map[0].length.should.equal(10);
    });


    it('Game shoot', function() {
        var map = [
            [-1, 9, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, 9, -1, -1, -1, -1, -1, -1, 9, -1],
            [-1, 9, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, 9],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, 9],
            [-1, -1, -1, -1, 9, -1, -1, 9, -1, -1],
            [9, -1, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        ];

        Game.shoot(map, -1, -1)[0].should.equal('none');
        Game.shoot(map, 10, 10)[0].should.equal('none');
        Game.shoot(map, 0, 0)[0].should.equal(2);
        Game.shoot(map, 1, 0)[0].should.equal('fail');

        Game.shoot(map, 0, 1)[0].should.equal(3);
        Game.shoot(map, 0, 2)[0].should.equal(2);
        Game.shoot(map, 0, 3)[0].should.equal(1);
        Game.shoot(map, 0, 4)[0].should.equal(0);
        Game.shoot(map, 2, 1)[0].should.equal(5);
        Game.shoot(map, 9, 1)[0].should.equal(1);

    });


    it('Game shoot2', function() {
        var map = [
            [-1, -1, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, 9, -1, -1, -1, -1, -1, -1, -1],
            [9, 9, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        ];

        var result = Game.shoot(map, 0, 0);
        result[0].should.equal(0); // nothing
        result[1][0][0].should.equal(0);
    });


    it('Game shoot3', function() {
        var map = [
            [-1, -1, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, 9, -1, -1, -1, -1, -1, -1, -1],
            [9, 9, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        ];

        var updates = Game.getUpdatesForShoot(map, 0, 0);
        var result_map = Game.applyUpdate(map, updates);
        //console.log(result_map);
        result_map[0][0].should.equal(0); // nothing
        result_map[0][1].should.equal(2);
        result_map[1][0].should.equal(0);
        result_map[1][1].should.equal(3);
        result_map[2][0].should.equal(2);
        result_map[2][1].should.equal(5);
    });


    it('Game shoot4', function() {
        var map = [
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, 9, 9, 9, 9],
            [-1, -1, -1, -1, -1, -1, 9, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, 9, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, 9, -1, -1, -1]
        ];

        var updates = Game.getUpdatesForShoot(map, 9, 9);
        var result_map = Game.applyUpdate(map, updates);

        result_map[9][9].should.equal(0);
        result_map[9][8].should.equal(0);
        result_map[9][7].should.equal(2);
        result_map[8][9].should.equal(0);
        result_map[8][8].should.equal(0);
        result_map[8][7].should.equal(3);
        result_map[7][9].should.equal(2);
        result_map[7][8].should.equal(3);
        result_map[7][7].should.equal(5);
    });

    it('Check Win', function() {
        var map = [
            [9, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        ];
        Game.checkWin(map).should.equal(99);
    });


    it('Apply update1', function() {
        var map = [
            [-1, -1, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, 9, -1, -1, -1, -1, -1, -1, -1],
            [9, 9, 9, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        ];

        var result = Game.applyUpdate(map, [{
            x: 1,
            y: 1,
            v: 2
        }]);
        result[1][1].should.equal(2);
    });

    it('Apply update2', function() {
        var map = [
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, 9, 9, 9, 9],
            [-1, -1, -1, -1, -1, -1, 9, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, 9, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, 9, -1, -1, -1]
        ];

        var result = Game.applyUpdate(map, [{
            x: 9,
            y: 9,
            v: 0
        }]);
        result[9][9].should.equal(0);
    });

    it('Open Demined', function() {
        var map = [
            [9, 1, -1, -1, -1, -1, -1, 1, -1, -1],
            [1, 1, -1, -1, -1, -1, -1, -1, 9, 1],
            [-1, -1, -1, -1, -1, -1, -1, -1, 1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        ];

        Game.howManyAround(-1, map, 0, 0).should.equal(0);
        map[1][8].should.equal(9);
        Game.howManyAround(-1, map, 8, 1).should.equal(5);

        map = Game.openDemined(map);
        map[0][0].should.equal(10);
    });

    it('Open Demined2', function() {
        var map = [
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, 1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, 3, 1, -1],
            [-1, -1, -1, -1, -1, -1, -1, 9, 1, -1],
            [-1, -1, -1, 2, 2, 1, 2, 2, 1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        ];

        map[7][7].should.equal(9);
        Game.howManyAround(-1, map, 7, 7).should.equal(2);

        map = Game.openDemined(map);
        map[7][7].should.equal(9);
    });

});