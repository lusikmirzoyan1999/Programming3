class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.multiply = 0;
        this.index = index;

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character1, character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character1 || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var emptyCells = this.chooseCell(0, 0);
        var newCell = random(emptyCells);
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = 2;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }


    eat() {
        var emptyCells = this.chooseCell(1, 4);
        var newCell = random(emptyCells);
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            if (matrix[y][x] == 1) {
                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;
                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                this.energy++;

                if (this.energy >= 25) {
                    this.mul();
                }
                this.x = x;
                this.y = y;
            }
            else if (matrix[y][x] == 4) {
                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;
                for (var i in varakArr) {
                    if (x == varakArr[i].x && y == varakArr[i].y) {
                        varakArr.splice(i, 1);
                        break;
                    }
                }

                this.energy -= 50;

                this.x = x;
                this.y = y;
                this.move();
            }
        }


        else {
            this.move();
        }

    }

    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];

            var newGrassEater = new GrassEater(x, y, this.index);
            grassEaterArr.push(newGrassEater);
            matrix[y][x] = this.index;
        }
    }
}

