import Board from "./board";
import SearchNode from "./SearchNode";
import { MinHeap } from "min-heap-typed";

class Solver {
	// find a solution to the initial board (using the A* algorithm)
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

	insertNeighbors(queue: MinHeap<SearchNode>, currentNode: SearchNode): void {
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

	moves(): number | undefined {
		// PLS MODIFY
		return this.isSolvable() ? this.initialNode!.moves : -1;
	}

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
}

export default Solver;