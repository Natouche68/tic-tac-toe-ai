import { crayon, gameState } from "./globalVariables.ts";

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

export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export function renderTitle() {
  console.clear();

  console.log(crayon.bgBlue(crayon.white("                    ")));
  console.log(crayon.bgBlue(crayon.white("   Tic Tac Toe AI   ")));
  console.log(crayon.bgBlue(crayon.white("                    ")));

  console.log("");

  if (gameState.currentPlayer === "player") {
    console.log(crayon.bgLightGreen("It's the player's turn."));
  } else if (gameState.currentPlayer === "ai") {
    console.log(crayon.bgRed("It's the AI's turn."));
  }
}

export function renderTicTacToeArena() {
  console.log("");
  console.log(
    ` ${gameState.ticTacToeArena[0][0]} | ${gameState.ticTacToeArena[0][1]} | ${
      gameState.ticTacToeArena[0][2]
    } `,
  );
  console.log(`---+---+---`);
  console.log(
    ` ${gameState.ticTacToeArena[1][0]} | ${gameState.ticTacToeArena[1][1]} | ${
      gameState.ticTacToeArena[1][2]
    } `,
  );
  console.log(`---+---+---`);
  console.log(
    ` ${gameState.ticTacToeArena[2][0]} | ${gameState.ticTacToeArena[2][1]} | ${
      gameState.ticTacToeArena[2][2]
    } `,
  );
  console.log("");
}

export function rankPredictions(aiPredictions: AIPrediction[]) {
  aiPredictions.sort((a, b) => {
    return b.score - a.score;
  });

  gameState.rankedAIPredictions = aiPredictions;
}

export function checkIfWin(arena: TicTacToeCase[][]): " " | "o" | "x" {
  const winPatterns = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  let returnedValue: " " | "o" | "x" = " ";

  winPatterns.forEach((winPattern) => {
    const firstCase = arena[winPattern[0][0]][winPattern[0][1]];
    const secondCase = arena[winPattern[1][0]][winPattern[1][1]];
    const thirdCase = arena[winPattern[2][0]][winPattern[2][1]];

    if (firstCase !== " ") {
      if (firstCase === secondCase && firstCase === thirdCase) {
        if (firstCase === "o") {
          returnedValue = "o";
        } else if (firstCase === "x") {
          returnedValue = "x";
        }
      }
    }
  });

  return returnedValue;
}

export function getEmptyCases(
  arena: TicTacToeCase[][],
): { x: number; y: number }[] {
  const emptyCases: { x: number; y: number }[] = [];

  arena.forEach((row, y) => {
    row.forEach((ticTacToeCase, x) => {
      if (ticTacToeCase === " ") {
        emptyCases.push({
          y,
          x,
        });
      }
    });
  });

  return emptyCases;
}
