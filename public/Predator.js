class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.multiply = 0;
        this.index = index;
        this.naxord = 0;
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
    chooseCell(character1, character2, character3) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var emptyCells = this.chooseCell(0, 1, 4);
        var newCell = random(emptyCells);
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = this.naxord;
            this.naxord = matrix[y][x];
            matrix[y][x] = 3;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy <= -20) {
                this.die();
            }
        }
    }
    eat() {
        var emptyCells = this.chooseCell(2, 2);
        var newCell = random(emptyCells);
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 3;
            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            this.energy += 5
            if (this.energy >= 20) {
                this.mul();
            }
            matrix[this.y][this.x] = this.naxord;
            this.naxord = 0;

            this.x = x;
            this.y = y;
        }
        else {
            this.move();
        }

    }

    die() {
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = this.naxord;
    }
    mul() {
        var emptyCells = this.chooseCell(0, 1);
        var newCell = random(emptyCells);
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            var newPredator = new Predator(x, y, this.index);
            predatorArr.push(newPredator);
            this.naxord = matrix[y][x];
            matrix[y][x] = this.index;
        }
    }
}
