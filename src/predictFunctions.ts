import type { AIPrediction } from "./utils.ts";
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

  const emptyCases = getEmptyCases(gameState.ticTacToeArena);

  for (let i = 0; i < emptyCases.length; i++) {
    const newPrediction: AIPrediction = {
      aiMove: {
        y: emptyCases[i].y,
        x: emptyCases[i].x,
      },
      arena: structuredClone(gameState.ticTacToeArena),
      score: 0,
      depth: 0,
      completed: false,
    };

    newPrediction.arena[newPrediction.aiMove.y][newPrediction.aiMove.x] = "x";

    if (checkIfWin(newPrediction.arena) == "x") {
      newPrediction.completed = true;
      newPrediction.score = 10 - newPrediction.depth;
    }

    aiPredictions.push(newPrediction);
  }

  predictPlayerMoves(aiPredictions, 8);

  gameState.ticTacToeArena[gameState.rankedAIPredictions[0].aiMove.y][
    gameState.rankedAIPredictions[0].aiMove.x
  ] = "x";

  renderTicTacToeArena();

  await sleep(3000);

  return;
}

export function predictPlayerMoves(
  aiPredictions: AIPrediction[],
  predictionDepth: number,
) {
  if (predictionDepth !== 0) {
    const newAIPredictions: AIPrediction[] = [];

    aiPredictions.forEach((prediction, index) => {
      if (!prediction.completed) {
        const newEmptyCases = getEmptyCases(prediction.arena);

        for (let i = 0; i < newEmptyCases.length; i++) {
          const newPrediction: AIPrediction = {
            aiMove: {
              y: prediction.aiMove.y,
              x: prediction.aiMove.x,
            },
            arena: structuredClone(prediction.arena),
            score: 0,
            depth: prediction.depth + 1,
            completed: false,
          };

          newPrediction.arena[newEmptyCases[i].y][newEmptyCases[i].x] = "o";

          if (checkIfWin(newPrediction.arena) == "o") {
            newPrediction.completed = true;
            newPrediction.score = -10;
          }

          newAIPredictions.push(newPrediction);
        }

        prediction.completed = true;
        aiPredictions.splice(index, 1);
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

    aiPredictions.forEach((prediction, index) => {
      if (!prediction.completed) {
        const newEmptyCases = getEmptyCases(prediction.arena);

        for (let i = 0; i < newEmptyCases.length; i++) {
          const newPrediction: AIPrediction = {
            aiMove: {
              y: prediction.aiMove.y,
              x: prediction.aiMove.x,
            },
            arena: structuredClone(prediction.arena),
            score: 0,
            depth: prediction.depth + 1,
            completed: false,
          };

          newPrediction.arena[newEmptyCases[i].y][newEmptyCases[i].x] = "x";

          if (checkIfWin(newPrediction.arena) == "x") {
            newPrediction.completed = true;
            newPrediction.score = 10 - newPrediction.depth;
          }

          newAIPredictions.push(newPrediction);
        }

        prediction.completed = true;
        aiPredictions.splice(index, 1);
      } else {
        newAIPredictions.push(prediction);
      }
    });

    predictPlayerMoves(newAIPredictions, predictionDepth - 1);
  } else {
    rankPredictions(aiPredictions);
  }
}
