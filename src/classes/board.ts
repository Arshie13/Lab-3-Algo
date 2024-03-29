class Board {
	// create a board from an n-by-n array of tiles,
	// where tiles[row][col] = tile at (row, col)
	tiles: number[][];
	hammingAmount: number;
	manhattanAmount: number;
	neighboringBoard: Board[];

	constructor(tiles: number[][]) {
		// YOUR CODE HERE
		// this.tiles = new Array(tiles.length).fill(0).map(() => new Array(tiles.length).fill(0));
		this.tiles = tiles;
		let hammingTotal = 0;
		let manhattanTotal = 0;
		this.neighboringBoard = [];

		for (let i = 0; i < this.dimension(); i++) {
			for (let j = 0; j < this.dimension(); j++) {
				let tile = tiles[i][j];

				if (tile === 0) continue;

				let compare = i * this.dimension() + j + 1;

				if (tile !== compare) {
					hammingTotal++
				}

				let tileI = Math.floor((tile - 1) / this.dimension());
				let tileJ = (tile -  1) % this.dimension();
				let distance = (Math.abs(i - tileI) + Math.abs(j - tileJ));

				manhattanTotal += distance;
			}
		}
		this.hammingAmount = hammingTotal;
		this.manhattanAmount = manhattanTotal;
	}

	// string representation of this board
	toStrings(): string {
		// PLS MODIFY
		let stringBuilder: string[] = [];
		// stringBuilder.push(this.dimension().toString());

		for (let i = 0; i < this.dimension(); i++) {
			stringBuilder.push("\n");
			for (let j = 0; j < this.dimension(); j++) {
				stringBuilder.push(" " + this.tiles[i][j]);
			}
		}
		return stringBuilder.join('');
	}

	// board dimension n
	dimension(): number {
		// PLS MODIFY
		return this.tiles[0].length
	}

	// number of tiles out of place
	hamming(): number {
		// let hammingTotal = 0;
		// for (let i = 0; i < this.dimension(); i++) {
		// 	for (let j = 0; j < this.dimension(); j++) {
		// 		let tile = this.tiles[i][j];
		// 		if (tile !== 0 && tile !== i * this.dimension() + j + 1) {
		// 			hammingTotal++;
		// 		}
		// 	}
		// }
		return this.hammingAmount;
	}

	// sum of Manhattan distances between tiles and goal
	manhattan(): number {
		// let manhattanTotal = 0;
		// for (let i = 0; i < this.dimension(); i++) {
		// 	for (let j = 0; j < this.dimension(); j++) {
		// 		let tile = this.tiles[i][j];
		// 		if (tile !== 0) { // we don't compute Manhattan distance for the empty tile
		// 			let goalRow = Math.floor((tile - 1) / this.dimension());
		// 			let goalCol = (tile - 1) % this.dimension();
		// 			manhattanTotal += Math.abs(i - goalRow) + Math.abs(j - goalCol);
		// 		}
		// 	}
		// }
		return this.manhattanAmount;
	}

	// is this board the goal board?
	isGoal(): boolean {
		// PLS MODIFY
		return this.hamming() === 0;
	}
 
	// does this board equal y?
	equals(y: Board): boolean {
		// PLS MODIFY
		if (y === null || !(y instanceof Board)) {
			return false;
		}

		const anotherBoard = y;
		if (this.dimension() !== anotherBoard.dimension()) return false;

		for (let i = 0; i < this.dimension(); i++) {
			for (let j = 0; j < this.dimension(); j++) {
				if (this.tiles[i][j] !== anotherBoard.tiles[i][j]) return false;
			}
		}

		return true;
	}

	// all neighboring boards
	neighbors(): Board[] {
		// PLS MODIFY
		if (this.neighboringBoard.length > 0) return this.neighboringBoard;

		else {
			// possible error
			this.neighboringBoard = [];
			let zeroI = 0;
			let zeroJ = 0;

			for (let i = 0; i < this.dimension(); i++) {
				for (let j = 0; j < this.dimension(); j++) {
					if (this.tiles[i][j] === 0) {
						zeroI = i;
						zeroJ = j;
						break;
					}
				}
			}

			for (let k = 0; k < 4; k++) {
				let tileI = zeroI;
				let tileJ = zeroJ;

				switch (k) {
					case 0: tileI++;
						break;
					case 1: tileI--;
						break;
					case 2: tileJ++;
						break;
					case 3: tileJ--;
						break;
				}

				if (tileI < 0 || tileI >= this.dimension() || tileJ < 0 || tileJ >= this.dimension()) continue;

				let neighborTiles = this.tilesCopy();
				neighborTiles[zeroI][zeroJ] = neighborTiles[tileI][tileJ];
				neighborTiles[tileI][tileJ] = 0;

				let neighbor: Board = new Board(neighborTiles);
				this.neighboringBoard.push(neighbor);
			}
			return this.neighboringBoard;
		}
	}

	// a board that is obtained by exchanging any pair of tiles
	twin(): Board {
		// PLS MODIFY
		let twinTiles: number[][] = this.tilesCopy();
		if (this.tiles[0][0] !== 0 && this.tiles[0][1] !== 0) {
			twinTiles[0][0] = this.tiles[0][1];
			twinTiles[0][1] = this.tiles[0][0];
		} else {
			twinTiles[1][0] = this.tiles[1][1];
			twinTiles[1][1] = this.tiles[1][0];
		}
		return new Board(twinTiles)
	}

	tilesCopy(): number[][] {
		let tilesCopy: number[][] = new Array(this.dimension()).fill(0).map(() => new Array(this.dimension()).fill(0));
		for (let i = 0; i < this.dimension(); i++) {
			for (let j = 0; j < this.dimension(); j++) {
				tilesCopy[i][j] = this.tiles[i][j];
			}
		}
		return tilesCopy;
	}
}

export default Board;

// const tiles = [[1, 0], [3, 2]]
// const tiles2 = [[1, 2], [3, 0]]
// const tiles3 = [[1, 2, 0], [4, 5, 3], [7, 8, 6]]

// const board = new Board(tiles);
// const board2 = new Board(tiles2);
// const board3 = new Board(tiles);

// console.log('Board: ', board.toStrings());
// console.log('\n');
// console.log('Board dimension: ', board.dimension());
// console.log('\n');
// console.log('Hamming amount: ', board.hamming());
// console.log('\n');
// console.log('Manhattan amount: ', board.manhattan());
// console.log('\n');
// console.log('is equal: ', board.equals(board2));
// console.log('\n');
// const goalBoard = board.neighbors()[0];
// console.log('is equal: ', board2.equals(goalBoard));
// console.log('\n');
// console.log('neighboring boards: ', board2.isGoal());
// console.log('\n');
// console.log('neighboring boards 3 manhattan amount: ', board.manhattan());
// console.log('\n');
// console.log('neighboring boards 3 hamming amount: ', board.hamming());
// console.log('\n');
// console.log('twin board: ', board2.twin());
// console.log('\n');
// console.log('tiles copy: ', board2.tilesCopy());
// console.log('\n');