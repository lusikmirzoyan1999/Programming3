function Matrix(n, m) {
    var matrix = [];
    for (var y = 0; y < m; y++) {
        matrix[y] = [];
        for (var x = 0; x < n; x++) {
            matrix[y][x] = Math.round(Math.random());
        }
    }

    matrix[34][44] = 2;
    matrix[45][44] = 2;
    matrix[34][34] = 2;
    matrix[20][30] = 2;
    matrix[29][17] = 2;
    matrix[50][10] = 2;
    matrix[50][50] = 2;
    matrix[25][21] = 3;
    matrix[30][18] = 3;
    matrix[33][44] = 3;
    matrix[3][26] = 3;
    matrix[5][16] = 3;
    matrix[49][12] = 3;
    matrix[47][34] = 3;
    matrix[35][26] = 3;
    matrix[35][16] = 3;
    matrix[29][44] = 3;
    matrix[27][47] = 4;
    matrix[23][30] = 4;
    matrix[14][7] = 4;
    matrix[30][20] = 4;
    matrix[26][36] = 4;
    matrix[37][50] = 4;
    matrix[39][50] = 4;
    matrix[40][50] = 5;
    matrix[15][8] = 5;
    matrix[28][44] = 5;
    matrix[34][44] = 5;

    return matrix;
}

var matrix = Matrix(100, 100);
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var varakArr = [];
var antivarakArr = [];
var side = 8;

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gre = new GrassEater(x, y, 2);
                grassEaterArr.push(gre);
            }
            else if (matrix[y][x] == 3) {
                var gres = new Predator(x, y, 3);
                predatorArr.push(gres);
            }
            else if (matrix[y][x] == 4) {
                var grv = new Varak(x, y, 4);
                varakArr.push(grv);
            }
            else if (matrix[y][x] == 5) {
                var grav = new Antivarak(x, y, 5);
                antivarakArr.push(grav);
            }
        }
    }

}



function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }

    }

    for (var i in grassArr) {
        grassArr[i].mul();


    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();

    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in varakArr) {
        varakArr[i].eat();
    }
    for (var i in antivarakArr) {
        antivarakArr[i].eat();
    }

}