import Board from "./board";
import SearchNode from "./SearchNode";
import { MinHeap } from "min-heap-typed";

class Solver {
	// find a solution to the initial board (using the A* algorithm)
	initialNode: SearchNode; // bNode
	twinNode: SearchNode; // bTwinNode

	constructor(initial: Board) {
		if (initial === null) {
			throw new Error("Board cannot be null");
		}
		// YOUR CODE HERE
		let moves: number = 0;
		this.initialNode = new SearchNode(initial, moves);
		this.twinNode = new SearchNode(initial.twin(), moves);
		
		this.solve();
	}

	// is the initial board solvable? (see below)
	isSolvable(): boolean {
		// PLS MODIFY
		let firstNode: SearchNode | null = this.initialNode;

		while (firstNode && firstNode.previousSearchNode !== null) {
			firstNode = firstNode.previousSearchNode
		}

		if (firstNode) {
			return firstNode.getBoard() === this.twinNode.getBoard() ? false : true;
		} else return false;
	}

	// min number of moves to solve initial board; -1 if unsolvable
	moves(): number | undefined {
		// PLS MODIFY
		return this.isSolvable() ? this.initialNode.moves : -1;
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
		let queue = new MinHeap<SearchNode>([], { comparator: (a, b) => a.priority() - b.priority() });
		queue.add(this.initialNode);

		while (!queue.isEmpty()) {
			const currentNode = queue.poll();

			if (!currentNode) {
				throw new Error("Queue is empty");
			}

			if (currentNode.board.isGoal()) {
				this.initialNode = currentNode;
				return; // Solution found, exit the loop
			}

			for (const neighbor of currentNode.neighbors()) {
				const previousBoard = currentNode.previousSearchNode ? currentNode.previousSearchNode.getBoard() : null;

				if (previousBoard !== neighbor) {
					const moves = currentNode.moves + 1;
					const node = new SearchNode(neighbor, moves);
					node.previousSearchNode = currentNode;
					queue.add(node);
				}
			}
		}

		// If the loop exits, the queue is empty and the puzzle is unsolvable
		throw new Error("Puzzle is unsolvable");
	}

}

export default Solver;
