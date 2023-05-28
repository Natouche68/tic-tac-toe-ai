import { crayon } from "https://deno.land/x/crayon@3.3.3/mod.ts";
import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

type TicTacToeCase = " " | "x" | "o" | "•";

const ticTacToeArena: TicTacToeCase[][] = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

let isGameOver = false;
let currentPlayer: "player" | "ai" = "player";

let selectedCaseY = -1;
let selectedCaseX = -1;

renderTitle();

while (!isGameOver) {
  if (currentPlayer === "player") {
    await chooseCasePlayer();

    currentPlayer = "ai";
  } else if (currentPlayer === "ai") {
    await chooseCaseAI();

    currentPlayer = "player";
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

  for await (const keypress of readKeypress()) {
    switch (keypress.key) {
      case "up":
        ticTacToeArena[selectedCaseY][selectedCaseX] = " ";

        selectedCaseY--;
        if (selectedCaseY === -1) {
          selectedCaseY = 2;
        }
        ticTacToeArena[selectedCaseY][selectedCaseX] = "•";

        renderTitle();
        renderTicTacToeArena();
        break;

      case "down":
        ticTacToeArena[selectedCaseY][selectedCaseX] = " ";

        selectedCaseY++;
        if (selectedCaseY === 3) {
          selectedCaseY = 0;
        }
        ticTacToeArena[selectedCaseY][selectedCaseX] = "•";

        renderTitle();
        renderTicTacToeArena();
        break;

      case "left":
        ticTacToeArena[selectedCaseY][selectedCaseX] = " ";

        selectedCaseX--;
        if (selectedCaseX === -1) {
          selectedCaseX = 2;
        }
        ticTacToeArena[selectedCaseY][selectedCaseX] = "•";

        renderTitle();
        renderTicTacToeArena();
        break;

      case "right":
        ticTacToeArena[selectedCaseY][selectedCaseX] = " ";

        selectedCaseX++;
        if (selectedCaseX === 3) {
          selectedCaseX = 0;
        }
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

  await sleep(3000);
  return;
}
