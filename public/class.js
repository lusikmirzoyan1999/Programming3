class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 20 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}


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

class Varak {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.age = 0;

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

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    eat() {

        if (this.age >= 7) {
            var emptyCells = this.chooseCell(1);
            var newCell = random(emptyCells);
            if (newCell) {
                var x = newCell[0];
                var y = newCell[1];

                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                matrix[y][x] = 4;
                var newVarak = new Varak(x, y, 4);
                varakArr.push(newVarak);
                this.age = 0;

            }
        }
        this.age++;
    }


}

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

