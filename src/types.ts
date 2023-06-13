export type TicTacToeCase = " " | "x" | "o" | "•";

export type AIPrediction = {
  aiMove: {
    y: number;
    x: number;
  };
  lastPlayerMove: {
    y: number;
    x: number;
  };
  arena: TicTacToeCase[][];
  score: number;
  depth: number;
  completed: boolean;
};

export type AIPredictionRanking = {
  moveY: number;
  moveX: number;
  averageScore: number;
  predictions: AIPrediction[];
};

export type GameState = {
  ticTacToeArena: TicTacToeCase[][];

  isGameOver: boolean;
  currentPlayer: "player" | "ai";

  selectedCaseY: number;
  selectedCaseX: number;

  rankedAIPredictions: AIPredictionRanking[];
  bestAIMove: { y: number; x: number };
};
