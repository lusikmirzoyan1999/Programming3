class Antivarak {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 0;

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


        var emptyCells = this.chooseCell(0, 1);
        var newCell = random(emptyCells);
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = this.naxord;
            this.naxord = matrix[y][x];
            matrix[y][x] = 5;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy <= -90) {

                this.die();
            }

        }




    }
    eat() {
        var emptyCells = this.chooseCell(4, 4);
        var newCell = random(emptyCells);
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 1;
            for (var i in varakArr) {
                if (x == varakArr[i].x && y == varakArr[i].y) {
                    varakArr.splice(i, 1);
                    break;
                }
            }
            var newgrass = new Grass(this.x, this.y, 1);
            grassArr.push(newgrass);
            this.energy += 1;
            if (this.energy >= 15) {
                this.mul();
            }
            this.x = x;
            this.y = y;
        }


        else {
            this.move();
        }

    }
    mul() {

        var newAntivarak = new Antivarak(this.x, this.y, 5);
        antivarakArr.push(newAntivarak);
        matrix[this.y][this.x] = 5;
        this.energy = 0;
    }
    die() {
        for (var i in antivarakArr) {
            if (this.x == antivarakArr[i].x && this.y == antivarakArr[i].y) {
                antivarakArr.splice(i, 1);
                break;
            }
        }

        matrix[this.y][this.x] = 0;
    }
}

