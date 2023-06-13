import type { GameState } from "./types.ts";

export { crayon } from "https://deno.land/x/crayon@3.3.3/mod.ts";
export { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts";

export const gameState: GameState = {
  ticTacToeArena: [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ],

  isGameOver: false,
  currentPlayer: "player",

  selectedCaseY: -1,
  selectedCaseX: -1,

  rankedAIPredictions: [],
  bestAIMove: { y: -1, x: -1 },
};
