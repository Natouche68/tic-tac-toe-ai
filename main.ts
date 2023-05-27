import { crayon } from "https://deno.land/x/crayon@3.3.3/mod.ts";

type TicTacToeCase = " " | "x" | "o";

const ticTacToeArena: TicTacToeCase[][] = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

console.log(crayon.bgBlue(crayon.white("                    ")));
console.log(crayon.bgBlue(crayon.white("   Tic Tac Toe AI   ")));
console.log(crayon.bgBlue(crayon.white("                    ")));

console.log("");

renderTicTacToeArena();

function renderTicTacToeArena() {
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
}
