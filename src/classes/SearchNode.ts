import Board from "./board";
import { MinHeap } from "min-heap-typed";

class SearchNode {
  board: Board;
  moves: number;
  previousSearchNode: SearchNode | null;
  cachePriority: number | null;

  constructor(board: Board, moves: number) {
    this.board = board;
    this.moves = moves;
    this.previousSearchNode = null;
    this.cachePriority = null;
  }

  priority(): number {
    // dunno if this is how caching works but ok
    if (this.cachePriority !== null) {
      return this.cachePriority;
    }

    let priority = this.moves + this.board.manhattan();
    this.cachePriority = priority;
    return priority;
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

  // tried implementing the visited set in this class but it was not much faster than this lmaooo
  // but then again it was only a few test cases so I might be wrong hehe
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

  // wrote this as a separate method for testing purposes
  insertNeighbors2(queue: MinHeap<SearchNode>, currentNode: SearchNode, visited: Set<string>): void {
    for (const neighbor of currentNode.neighbors()) {
      const neighborString = neighbor.toStrings();
      if (!visited.has(neighborString)) {
        visited.add(neighborString);
        const moves = currentNode.moves + 1;
        const node = new SearchNode(neighbor, moves);
        node.previousSearchNode = currentNode;
        queue.add(node);
      }
    }
  }
}

export default SearchNode;
