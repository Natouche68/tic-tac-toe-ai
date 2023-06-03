import { crayon } from "https://deno.land/x/crayon@3.3.3/mod.ts";
import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

type TicTacToeCase = " " | "x" | "o" | "•";

type AIPrediction = {
  aiMove: {
    y: number;
    x: number;
  };
  arena: TicTacToeCase[][];
  score: number;
  depth: number;
  completed: boolean;
};

const ticTacToeArena: TicTacToeCase[][] = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

let isGameOver = false;
let currentPlayer: "player" | "ai" = "player";

let selectedCaseY = -1;
let selectedCaseX = -1;

let rankedAIPredictions: AIPrediction[] = [];

renderTitle();

while (!isGameOver) {
  if (currentPlayer === "player") {
    await chooseCasePlayer();

    currentPlayer = "ai";
  } else if (currentPlayer === "ai") {
    await chooseCaseAI();

    currentPlayer = "player";
  }

  const winResult = checkIfWin(ticTacToeArena);

  if (winResult === "o") {
    console.log("The player wins !");
    isGameOver = true;
  } else if (winResult === "x") {
    console.log("The AI wins !");
    isGameOver = true;
  }
}

function renderTitle() {
  console.clear();

  console.log(crayon.bgBlue(crayon.white("                    ")));
  console.log(crayon.bgBlue(crayon.white("   Tic Tac Toe AI   ")));
  console.log(crayon.bgBlue(crayon.white("                    ")));

  console.log("");

  if (currentPlayer === "player") {
    console.log(crayon.bgLightGreen("It's the player's turn."));
  } else if (currentPlayer === "ai") {
    console.log(crayon.bgRed("It's the AI's turn."));
  }
}

function renderTicTacToeArena() {
  console.log("");
  console.log(
    ` ${ticTacToeArena[0][0]} | ${ticTacToeArena[0][1]} | ${
      ticTacToeArena[0][2]
    } `,
  );
  console.log(`---+---+---`);
  console.log(
    ` ${ticTacToeArena[1][0]} | ${ticTacToeArena[1][1]} | ${
      ticTacToeArena[1][2]
    } `,
  );
  console.log(`---+---+---`);
  console.log(
    ` ${ticTacToeArena[2][0]} | ${ticTacToeArena[2][1]} | ${
      ticTacToeArena[2][2]
    } `,
  );
  console.log("");
}

async function chooseCasePlayer() {
  renderTitle();

  if (selectedCaseY === -1 && selectedCaseX === -1) {
    let firstEmptyCaseX = -1;
    let firstEmptyCaseY = 0;
    while (firstEmptyCaseX === -1) {
      firstEmptyCaseX = ticTacToeArena[firstEmptyCaseY].findIndex((
        element: TicTacToeCase,
      ) => element === " ");

      if (firstEmptyCaseX === -1) {
        firstEmptyCaseY++;
      }
    }

    selectedCaseY = firstEmptyCaseY;
    selectedCaseX = firstEmptyCaseX;
  }

  ticTacToeArena[selectedCaseY][selectedCaseX] = "•";

  renderTicTacToeArena();

  const moveSelectedCaseUp = () => {
    selectedCaseY--;
    if (selectedCaseY === -1) {
      selectedCaseY = 2;
    }

    if (ticTacToeArena[selectedCaseY][selectedCaseX] !== " ") {
      moveSelectedCaseUp();
    }
  };

  const moveSelectedCaseDown = () => {
    selectedCaseY++;
    if (selectedCaseY === 3) {
      selectedCaseY = 0;
    }

    if (ticTacToeArena[selectedCaseY][selectedCaseX] !== " ") {
      moveSelectedCaseDown();
    }
  };

  const moveSelectedCaseLeft = () => {
    selectedCaseX--;
    if (selectedCaseX === -1) {
      selectedCaseX = 2;
    }

    if (ticTacToeArena[selectedCaseY][selectedCaseX] !== " ") {
      moveSelectedCaseLeft();
    }
  };

  const moveSelectedCaseRight = () => {
    selectedCaseX++;
    if (selectedCaseX === 3) {
      selectedCaseX = 0;
    }

    if (ticTacToeArena[selectedCaseY][selectedCaseX] !== " ") {
      moveSelectedCaseRight();
    }
  };

  for await (const keypress of readKeypress()) {
    switch (keypress.key) {
      case "up":
        ticTacToeArena[selectedCaseY][selectedCaseX] = " ";

        moveSelectedCaseUp();
        ticTacToeArena[selectedCaseY][selectedCaseX] = "•";

        renderTitle();
        renderTicTacToeArena();
        break;

      case "down":
        ticTacToeArena[selectedCaseY][selectedCaseX] = " ";

        moveSelectedCaseDown();
        ticTacToeArena[selectedCaseY][selectedCaseX] = "•";

        renderTitle();
        renderTicTacToeArena();
        break;

      case "left":
        ticTacToeArena[selectedCaseY][selectedCaseX] = " ";

        moveSelectedCaseLeft();
        ticTacToeArena[selectedCaseY][selectedCaseX] = "•";

        renderTitle();
        renderTicTacToeArena();
        break;

      case "right":
        ticTacToeArena[selectedCaseY][selectedCaseX] = " ";

        moveSelectedCaseRight();
        ticTacToeArena[selectedCaseY][selectedCaseX] = "•";

        renderTitle();
        renderTicTacToeArena();
        break;

      case "return":
        ticTacToeArena[selectedCaseY][selectedCaseX] = "o";
        selectedCaseX = -1;
        selectedCaseY = -1;

        renderTitle();
        renderTicTacToeArena();

        await sleep(1000);
        return;
    }
  }
}

async function chooseCaseAI() {
  renderTitle();

  const aiPredictions: AIPrediction[] = [];

  const emptyCases = getEmptyCases(ticTacToeArena);

  for (let i = 0; i < emptyCases.length; i++) {
    const newPrediction: AIPrediction = {
      aiMove: {
        y: emptyCases[i].y,
        x: emptyCases[i].x,
      },
      arena: structuredClone(ticTacToeArena),
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

  ticTacToeArena[rankedAIPredictions[0].aiMove.y][
    rankedAIPredictions[0].aiMove.x
  ] = "x";

  renderTicTacToeArena();

  await sleep(5000);

  return;
}

function getEmptyCases(arena: TicTacToeCase[][]): { x: number; y: number }[] {
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

function predictPlayerMoves(
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

function predictAIMoves(
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

function rankPredictions(aiPredictions: AIPrediction[]) {
  aiPredictions.sort((a, b) => {
    return b.score - a.score;
  });

  rankedAIPredictions = aiPredictions;
}

function checkIfWin(arena: TicTacToeCase[][]): " " | "o" | "x" {
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
