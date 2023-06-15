# Tic-Tac-Toe AI

This is a simple program that lets you play tic-tac-toe against an AI.

I used the Minimax algorithm to make the AI.

## Installation

You can download binaries from the releases.

If you Deno installed on your machine, you can also use this command :

```sh
deno install -n tic-tac-toe-ai https://raw.githubusercontent.com/Natouche68/tic-tac-toe-ai/master/src/main.ts
```

### Build locally

If you want to, you can also build locally the project. After downloading it, run :

```sh
# For Windows
deno task build-win

# For Linux
deno task build-linux

# For Mac
deno task build-mac64
deno task build-mac-arm
```

### Run

If you don't want to install the app, you can also run it using these commands :

```sh
deno task start

# If you want to watch for changes :
deno task dev
```
