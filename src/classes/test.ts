import Board from "./board";
import SearchNode from "./SearchNode";
import { MinHeap } from "min-heap-typed";

class Solvers {
  initialNode: SearchNode | null;
  twinNode: SearchNode;

  constructor(initial: Board) {
    if (initial === null) {
      throw new Error("Board cannot be null");
    }
    // YOUR CODE HERE
    let moves: number = 0;
    this.initialNode = new SearchNode(initial, moves);
    this.twinNode = new SearchNode(initial.twin(), moves);

    let queue = new MinHeap<SearchNode>([], { comparator: (a, b) => a.priority() - b.priority() });
    let twinQueue = new MinHeap<SearchNode>([], { comparator: (a, b) => a.priority() - b.priority() });

    queue.add(this.initialNode);
    twinQueue.add(this.twinNode);

    while (!queue.isEmpty()) {
      const currentNode = queue.poll();
      const twinCurrentNode = twinQueue.poll();

      if (!currentNode || !twinCurrentNode) {
        throw new Error("Both Queue is empty");
      }

      if (currentNode.board.isGoal()) {
        this.initialNode = currentNode;
        break;
      } else if (twinCurrentNode.board.isGoal()) {
        this.initialNode = null;
        break;
      }

      currentNode.insertNeighbors(queue, currentNode);
      twinCurrentNode.insertNeighbors(twinQueue, twinCurrentNode);
    }
  }

  // is the initial board solvable? (see below)
  isSolvable(): boolean {
    // PLS MODIFY
    return this.initialNode !== null;
  }

  // min number of moves to solve initial board; -1 if unsolvable
  moves(): number | undefined {
    // PLS MODIFY
    return this.isSolvable() ? this.initialNode!.moves : -1;
  }

  // sequence of boards in a shortest solution; null if unsolvable
  solution(): Board[] | null {
    //PLS MODIFY
    if (this.isSolvable()) {
      let sequenceNode: SearchNode | null = this.initialNode;
      let solution: Board[] = [];

      while (sequenceNode !== null) {
        solution.unshift(sequenceNode.getBoard());
        sequenceNode = sequenceNode.previousSearchNode;
      }

      return solution;
    } else {
      return null;
    }
  }

  solve(): void {
    // If the loop exits, the queue is empty and the puzzle is unsolvable
    throw new Error("Puzzle is unsolvable");
  }
}

export default Solvers;

const unsolvableBoard = new Board([[8, 6, 7], [2, 5, 4], [1, 3, 0]]);
const unsolvableSolver = new Solvers(unsolvableBoard);

const solvableBoard = new Board([[1, 2, 3], [4, 5, 6], [7, 0, 8]]);
const solvableSolver = new Solvers(solvableBoard)

const testBoard = new Board([[4, 1, 3], [0, 2, 6], [7, 5, 8]]);
const testSolver = new Solvers(testBoard);

console.log("is solvable: ", solvableSolver.isSolvable());
console.log("is solvable: ", unsolvableSolver.isSolvable());
console.log("is solvable: ", testSolver.isSolvable());

let solution = solvableSolver.solution();
if (solution !== null) {
	for (let board of solution) {
		console.log(board.toStrings());
	}
} else {
  console.log("No solution");
}