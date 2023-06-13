import type { AIPrediction, TicTacToeCase } from "./types.ts";
import { crayon, gameState } from "./globalVariables.ts";

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

export function arenaCoordsToNumber(y: number, x: number): number {
  switch (y) {
    case 0:
      switch (x) {
        case 0:
          return 1;

        case 1:
          return 2;

        case 2:
          return 3;

        default:
          return 0;
      }

    case 1:
      switch (x) {
        case 0:
          return 4;

        case 1:
          return 5;

        case 2:
          return 6;

        default:
          return 0;
      }

    case 2:
      switch (x) {
        case 0:
          return 7;

        case 1:
          return 8;

        case 2:
          return 9;

        default:
          return 0;
      }

    default:
      return 0;
  }
}

export function numberToArenaCoords(number: number): { y: number; x: number } {
  switch (number) {
    case 1:
      return { y: 0, x: 0 };

    case 2:
      return { y: 0, x: 1 };

    case 3:
      return { y: 0, x: 2 };

    case 4:
      return { y: 1, x: 0 };

    case 5:
      return { y: 1, x: 1 };

    case 6:
      return { y: 1, x: 2 };

    case 7:
      return { y: 2, x: 0 };

    case 8:
      return { y: 2, x: 1 };

    case 9:
      return { y: 2, x: 2 };

    default:
      return { y: -1, x: -1 };
  }
}

export function rankPredictions(aiPredictions: AIPrediction[]) {
  gameState.rankedAIPredictions = [
    {
      moveY: 0,
      moveX: 0,
      averageScore: 0,
      predictions: [],
    },
    {
      moveY: 0,
      moveX: 1,
      averageScore: 0,
      predictions: [],
    },
    {
      moveY: 0,
      moveX: 2,
      averageScore: 0,
      predictions: [],
    },
    {
      moveY: 1,
      moveX: 0,
      averageScore: 0,
      predictions: [],
    },
    {
      moveY: 1,
      moveX: 1,
      averageScore: 0,
      predictions: [],
    },
    {
      moveY: 1,
      moveX: 2,
      averageScore: 0,
      predictions: [],
    },
    {
      moveY: 2,
      moveX: 0,
      averageScore: 0,
      predictions: [],
    },
    {
      moveY: 2,
      moveX: 1,
      averageScore: 0,
      predictions: [],
    },
    {
      moveY: 2,
      moveX: 2,
      averageScore: 0,
      predictions: [],
    },
  ];

  aiPredictions.forEach((aiPrediction) => {
    gameState
      .rankedAIPredictions[
        arenaCoordsToNumber(aiPrediction.aiMove.y, aiPrediction.aiMove.x) - 1
      ].predictions.push(aiPrediction);
  });

  gameState.rankedAIPredictions.forEach((predictionGroup) => {
    let totalScore = 0;

    predictionGroup.predictions.forEach((aiPrediction) => {
      totalScore += aiPrediction.score;
    });

    if (totalScore !== 0 && predictionGroup.predictions.length !== 0) {
      predictionGroup.averageScore = totalScore /
        predictionGroup.predictions.length;
    } else {
      predictionGroup.averageScore = -1000;
    }
  });

  gameState.rankedAIPredictions.sort((a, b) => {
    return b.averageScore - a.averageScore;
  });

  if (gameState.bestAIMove.y === -1 && gameState.bestAIMove.x === -1) {
    gameState.bestAIMove.y = gameState.rankedAIPredictions[0].moveY;
    gameState.bestAIMove.x = gameState.rankedAIPredictions[0].moveX;
  }
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
