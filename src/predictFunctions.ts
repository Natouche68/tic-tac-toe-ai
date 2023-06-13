import type { AIPrediction } from "./types.ts";
import { gameState } from "./globalVariables.ts";
import {
  checkIfWin,
  getEmptyCases,
  rankPredictions,
  renderTicTacToeArena,
  renderTitle,
  sleep,
} from "./utils.ts";

export async function chooseCaseAI() {
  renderTitle();

  const aiPredictions: AIPrediction[] = [];
  gameState.bestAIMove = { y: -1, x: -1 };

  const emptyCases = getEmptyCases(gameState.ticTacToeArena);

  for (let i = 0; i < emptyCases.length; i++) {
    const newPrediction: AIPrediction = {
      aiMove: {
        y: emptyCases[i].y,
        x: emptyCases[i].x,
      },
      lastPlayerMove: {
        y: -1,
        x: -1,
      },
      arena: structuredClone(gameState.ticTacToeArena),
      score: 0,
      depth: 0,
      completed: false,
    };

    newPrediction.arena[newPrediction.aiMove.y][newPrediction.aiMove.x] = "x";

    if (checkIfWin(newPrediction.arena) === "x") {
      newPrediction.completed = true;
      newPrediction.score = 10 - newPrediction.depth;
    }

    aiPredictions.push(newPrediction);
  }

  predictPlayerMoves(aiPredictions, 8);

  gameState.ticTacToeArena[gameState.bestAIMove.y][gameState.bestAIMove.x] =
    "x";

  renderTicTacToeArena();

  await sleep(3000);

  return;
}

export function predictPlayerMoves(
  aiPredictions: AIPrediction[],
  predictionDepth: number,
) {
  if (predictionDepth !== 0) {
    let newAIPredictions: AIPrediction[] = [];

    aiPredictions.forEach((prediction) => {
      if (!prediction.completed) {
        let addNewPredictions = true;
        let numberOfBadPredictions = 0;
        const newPredictionsfromCurrentPrediction: AIPrediction[] = [];
        const newEmptyCases = getEmptyCases(prediction.arena);

        for (let i = 0; i < newEmptyCases.length; i++) {
          const newPrediction: AIPrediction = {
            aiMove: {
              y: prediction.aiMove.y,
              x: prediction.aiMove.x,
            },
            lastPlayerMove: {
              y: newEmptyCases[i].y,
              x: newEmptyCases[i].x,
            },
            arena: structuredClone(prediction.arena),
            score: 0,
            depth: prediction.depth + 1,
            completed: false,
          };

          newPrediction.arena[newEmptyCases[i].y][newEmptyCases[i].x] = "o";

          if (checkIfWin(newPrediction.arena) === "o") {
            newPrediction.completed = true;
            newPrediction.score = -10;
            addNewPredictions = false;
            numberOfBadPredictions += 1;

            if (
              predictionDepth === 8 && gameState.bestAIMove.y === -1 &&
              gameState.bestAIMove.x === -1
            ) {
              gameState.bestAIMove.y = newPrediction.lastPlayerMove.y;
              gameState.bestAIMove.x = newPrediction.lastPlayerMove.x;
            }
          } else {
            newPredictionsfromCurrentPrediction.push(newPrediction);
          }
        }

        if (addNewPredictions) {
          newAIPredictions = [
            ...newAIPredictions,
            ...newPredictionsfromCurrentPrediction,
          ];
        } else {
          prediction.completed = true;

          if (
            (numberOfBadPredictions > 1 || newEmptyCases.length === 2) &&
            gameState.bestAIMove.y === -1 && gameState.bestAIMove.x === -1
          ) {
            gameState.bestAIMove.y = prediction.lastPlayerMove.y;
            gameState.bestAIMove.x = prediction.lastPlayerMove.x;
          }

          prediction.score = -50;
          newAIPredictions.push(prediction);
        }
      } else {
        newAIPredictions.push(prediction);
      }
    });

    predictAIMoves(newAIPredictions, predictionDepth - 1);
  } else {
    rankPredictions(aiPredictions);
  }
}

export function predictAIMoves(
  aiPredictions: AIPrediction[],
  predictionDepth: number,
) {
  if (predictionDepth !== 0) {
    const newAIPredictions: AIPrediction[] = [];

    aiPredictions.forEach((prediction) => {
      if (!prediction.completed) {
        const newEmptyCases = getEmptyCases(prediction.arena);

        for (let i = 0; i < newEmptyCases.length; i++) {
          const newPrediction: AIPrediction = {
            aiMove: {
              y: prediction.aiMove.y,
              x: prediction.aiMove.x,
            },
            lastPlayerMove: {
              y: prediction.lastPlayerMove.y,
              x: prediction.lastPlayerMove.x,
            },
            arena: structuredClone(prediction.arena),
            score: 0,
            depth: prediction.depth + 1,
            completed: false,
          };

          newPrediction.arena[newEmptyCases[i].y][newEmptyCases[i].x] = "x";

          if (checkIfWin(newPrediction.arena) === "x") {
            newPrediction.completed = true;
            newPrediction.score = 10 - newPrediction.depth;
          }

          newAIPredictions.push(newPrediction);
        }
      } else {
        newAIPredictions.push(prediction);
      }
    });

    predictPlayerMoves(newAIPredictions, predictionDepth - 1);
  } else {
    rankPredictions(aiPredictions);
  }
}
