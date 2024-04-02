class Board {
	// create a board from an n-by-n array of tiles,
	// where tiles[row][col] = tile at (row, col)
	tiles: number[][];
	hammingDistance: number;
	manhattanDistance: number;
	neighboringBoard: Board[];

	constructor(tiles: number[][]) {
		// YOUR CODE HERE
		// this.tiles = new Array(tiles.length).fill(0).map(() => new Array(tiles.length).fill(0));
		this.tiles = tiles;
		this.neighboringBoard = [];

		let hammingTotal: number = 0;
		let manhattanTotal: number = 0;

		for (let i = 0; i < this.dimension(); i++) {
			for (let j = 0; j < this.dimension(); j++) {
				let tile = tiles[i][j];

				if (tile === 0) continue;

				if (tile !== 0 && tile !== i * this.dimension() + j + 1) {
					hammingTotal++;
				}

				const target = this.findPosition(tile)!;
				const targetRow = target[0];
				const targetCol = target[1];
				manhattanTotal += Math.abs(i - targetRow) + Math.abs(j - targetCol);
			}
		}
		this.hammingDistance = hammingTotal;
		this.manhattanDistance = manhattanTotal;
	}

	findPosition(tile: number): [number, number] {
		let targetRow = Math.floor((tile - 1) / this.dimension());
		let targetCol = (tile - 1) % this.dimension();
		return [targetRow, targetCol];
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
		return this.hammingDistance;
	}

	// sum of Manhattan distances between tiles and goal
	manhattan(): number {
		return this.manhattanDistance;
	}

	// is this board the goal board?
	isGoal(): boolean {
		// PLS MODIFY
		return this.hamming() === 0;
	}
 
	// does this board equal y?
	equals(y: Board): boolean {
		// PLS MODIFY
		let bool = true;
		let array2d = this.tiles;
		let array2d2 = y.tiles;
		if (y === null || !(y instanceof Board) || this.dimension() !== y.dimension()) {
			bool = false;
			return bool;
		}

		for (let i = 0; i < array2d.length; i++) {
			for (let j = 0; j < array2d[i].length; j++) {
				if (array2d[i][j] !== array2d2[i][j]) {
					bool = false;
					break;
				}
			}
			if (!bool) break;
		}
		return bool
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
// const board2 = new Board(tiles3);

// // 1 2 0
// // 4 5 3
// // 7 8 6

// const board3 = new Board(tiles2);
// console.log("dimension: ", board3.dimension());
// console.log("length: ", board3.tiles.length);
// console.log("manhattan: ", board3.manhattan());
// console.log("hamming: ", board3.hamming());
// console.log("isGoal: ", board3.isGoal());
// console.log("equals: ", board.equals(board3));
// console.log("equals: ", board3.equals(board3));
// console.log("neighbors: ", board3.neighbors());
// console.log("twin: ", board3.twin());
// console.log("tilesCopy: ", board3.tilesCopy());
// console.log("toStrings: ", board3.toStrings());
