import Board from "./board";
import { MinHeap } from "min-heap-typed";

class SearchNode {
  board: Board;
  moves: number;
  previousSearchNode: SearchNode | null;

  constructor(board: Board, moves: number) {
    this.board = board;
    this.moves = moves;
    this.previousSearchNode = null;
  }

  priority(): number {
    return this.moves + this.board.manhattan();
  }

  // is the search node the goal node?
  isGoal(): boolean {
    return this.board.isGoal();
  }

  getBoard(): Board {
    return this.board;
  }

  neighbors(): Board[] {
    return this.board.neighbors();
  }

  heuristic() {
    return this.board.manhattan() + this.moves;
  }

  // compare the search node with another search node
  compare(other: SearchNode): boolean {
    return this.heuristic() < other.heuristic();
  }

  toStrings(): string {
    return this.board.toStrings();
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
}

export default SearchNode;


// const heap = new MinHeap<SearchNode>([], { comparator: (a, b) => a.priority() - b.priority() });
// const node1 = new SearchNode(13)
// const node2 = new SearchNode(15)
// const node3 = new SearchNode(8)

// heap.add(node1);
// heap.add(node2);
// heap.add(node3);

// console.log(heap.poll())
// console.log(heap.peek())
