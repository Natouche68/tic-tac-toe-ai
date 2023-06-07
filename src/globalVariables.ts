import type { AIPrediction, TicTacToeCase } from "./utils.ts";

export { crayon } from "https://deno.land/x/crayon@3.3.3/mod.ts";
export { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts";

export const gameState: {
  ticTacToeArena: TicTacToeCase[][];

  isGameOver: boolean;
  currentPlayer: "player" | "ai";

  selectedCaseY: number;
  selectedCaseX: number;

  rankedAIPredictions: AIPrediction[];
} = {
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
};
