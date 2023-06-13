import type { TicTacToeCase } from "./types.ts";
import { crayon, gameState, readKeypress } from "./globalVariables.ts";
import {
  checkIfWin,
  numberToArenaCoords,
  renderTicTacToeArena,
  renderTitle,
  sleep,
} from "./utils.ts";
import { chooseCaseAI } from "./predictFunctions.ts";

renderTitle();

while (!gameState.isGameOver) {
  if (gameState.currentPlayer === "player") {
    await chooseCasePlayer();

    gameState.currentPlayer = "ai";
  } else if (gameState.currentPlayer === "ai") {
    await chooseCaseAI();

    gameState.currentPlayer = "player";
  }

  const winResult = checkIfWin(gameState.ticTacToeArena);

  if (winResult === "o") {
    console.log(crayon.bgGreen(crayon.white("The player wins !")));
    gameState.isGameOver = true;
  } else if (winResult === "x") {
    console.log(crayon.bgRed(crayon.white("The AI wins !")));
    gameState.isGameOver = true;
  }
}

async function chooseCasePlayer() {
  renderTitle();

  if (gameState.selectedCaseY === -1 && gameState.selectedCaseX === -1) {
    let firstEmptyCaseX = -1;
    let firstEmptyCaseY = 0;
    while (firstEmptyCaseX === -1) {
      firstEmptyCaseX = gameState.ticTacToeArena[firstEmptyCaseY].findIndex((
        element: TicTacToeCase,
      ) => element === " ");

      if (firstEmptyCaseX === -1) {
        firstEmptyCaseY++;
      }
    }

    gameState.selectedCaseY = firstEmptyCaseY;
    gameState.selectedCaseX = firstEmptyCaseX;
  }

  gameState.ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] =
    "•";

  renderTicTacToeArena();

  const moveSelectedCaseUp = () => {
    gameState.selectedCaseY--;
    if (gameState.selectedCaseY === -1) {
      gameState.selectedCaseY = 2;
    }

    if (
      gameState
        .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] !==
        " "
    ) {
      moveSelectedCaseUp();
    }
  };

  const moveSelectedCaseDown = () => {
    gameState.selectedCaseY++;
    if (gameState.selectedCaseY === 3) {
      gameState.selectedCaseY = 0;
    }

    if (
      gameState
        .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] !==
        " "
    ) {
      moveSelectedCaseDown();
    }
  };

  const moveSelectedCaseLeft = () => {
    gameState.selectedCaseX--;
    if (gameState.selectedCaseX === -1) {
      gameState.selectedCaseX = 2;
    }

    if (
      gameState
        .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] !==
        " "
    ) {
      moveSelectedCaseLeft();
    }
  };

  const moveSelectedCaseRight = () => {
    gameState.selectedCaseX++;
    if (gameState.selectedCaseX === 3) {
      gameState.selectedCaseX = 0;
    }

    if (
      gameState
        .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] !==
        " "
    ) {
      moveSelectedCaseRight();
    }
  };

  for await (const keypress of readKeypress()) {
    switch (keypress.key) {
      case "up":
        gameState
          .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] =
            " ";

        moveSelectedCaseUp();
        gameState
          .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] =
            "•";

        renderTitle();
        renderTicTacToeArena();
        break;

      case "down":
        gameState
          .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] =
            " ";

        moveSelectedCaseDown();
        gameState
          .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] =
            "•";

        renderTitle();
        renderTicTacToeArena();
        break;

      case "left":
        gameState
          .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] =
            " ";

        moveSelectedCaseLeft();
        gameState
          .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] =
            "•";

        renderTitle();
        renderTicTacToeArena();
        break;

      case "right":
        gameState
          .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] =
            " ";

        moveSelectedCaseRight();
        gameState
          .ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] =
            "•";

        renderTitle();
        renderTicTacToeArena();
        break;

      case "1":
        if (await updateTicTacToeArenaForPlayer(numberToArenaCoords(1))) {
          return;
        }
        break;

      case "2":
        if (await updateTicTacToeArenaForPlayer(numberToArenaCoords(2))) {
          return;
        }
        break;

      case "3":
        if (await updateTicTacToeArenaForPlayer(numberToArenaCoords(3))) {
          return;
        }
        break;

      case "4":
        if (await updateTicTacToeArenaForPlayer(numberToArenaCoords(4))) {
          return;
        }
        break;

      case "5":
        if (await updateTicTacToeArenaForPlayer(numberToArenaCoords(5))) {
          return;
        }
        break;

      case "6":
        if (await updateTicTacToeArenaForPlayer(numberToArenaCoords(6))) {
          return;
        }
        break;

      case "7":
        if (await updateTicTacToeArenaForPlayer(numberToArenaCoords(7))) {
          return;
        }
        break;

      case "8":
        if (await updateTicTacToeArenaForPlayer(numberToArenaCoords(8))) {
          return;
        }
        break;

      case "9":
        if (await updateTicTacToeArenaForPlayer(numberToArenaCoords(9))) {
          return;
        }
        break;

      case "return":
        if (
          await updateTicTacToeArenaForPlayer({
            y: gameState.selectedCaseY,
            x: gameState.selectedCaseX,
          })
        ) {
          return;
        }
        break;
    }
  }
}

async function updateTicTacToeArenaForPlayer(
  coords: { y: number; x: number },
): Promise<boolean> {
  if (
    gameState.ticTacToeArena[coords.y][coords.x] === " " ||
    gameState.ticTacToeArena[coords.y][coords.x] === "•"
  ) {
    gameState.ticTacToeArena[gameState.selectedCaseY][gameState.selectedCaseX] =
      " ";

    gameState
      .ticTacToeArena[coords.y][coords.x] = "o";
    gameState.selectedCaseX = -1;
    gameState.selectedCaseY = -1;

    renderTitle();
    renderTicTacToeArena();

    await sleep(1000);

    return true;
  } else {
    return false;
  }
}
