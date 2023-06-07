export type TicTacToeCase = " " | "x" | "o" | "•";

export type AIPrediction = {
  aiMove: {
    y: number;
    x: number;
  };
  arena: TicTacToeCase[][];
  score: number;
  depth: number;
  completed: boolean;
};

export type GameState = {
  ticTacToeArena: TicTacToeCase[][];

  isGameOver: boolean;
  currentPlayer: "player" | "ai";

  selectedCaseY: number;
  selectedCaseX: number;

  rankedAIPredictions: AIPrediction[];
};
