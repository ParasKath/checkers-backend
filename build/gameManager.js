let nextGameId = 0;

const movePiece = require('./movePiece');

const games = [];
const GamesStarted= [];

const getGameForPlayer = (player) => {
  const ans= games.find((g) =>
    g.players.find((p) => {
      if(p.socket === player)
      {
        //console.log(g);
        return player;
      }
    })
  );
  return ans;
};

exports.getGames = () =>
  games.map((g) => {
    const { players, ...game } = g;
    return {
      ...game,
      numberOfPlayers: players.length,
    };
  });

exports.createGame = ({ player, name,email }) => {
 const player1= {
   email:email,
   color:'red'
 }

  const game = {
    name,
    turn: 'red',
    players: [
      {
        socket: player,
        color: 'red',
      },
    ],
    chat: [],
    id: name,
    board: [
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 2, 0, 2, 0, 2, 0, 2],
    ],
    email:[player1]
  };
  games.push(game);

  return game;
};

exports.movePiece = ({
  player,
  selectedPiece,
  destination,
}) => {
  const game = getGameForPlayer(player);
  movePiece({ game, destination, selectedPiece });
};

exports.getGameById = (gameId) =>
  exports.getGames().find((g) => g.id === gameId);

exports.addPlayerToGame = ({ player, gameId }) => {

  const game = games.find((g) => g.id === gameId);

  //console.log(games);
  game.players.push({
    color: 'black',
    socket: player,
  });

  return 'black';
};

exports.endGame = ({ player, winner }) => {
  
  const game = getGameForPlayer(player);
  
  // players might disconnect while in the lobby
  if (!game) return;
  games.splice(games.indexOf(game), 1);
  game.players.forEach((currentPlayer) => {
    if (player !== currentPlayer.socket)
    {
      game.email.forEach(emailid=>{
        if(emailid.color === currentPlayer.color)
        {
          console.log("Add 50");
          console.log(emailid.email);

        }
        else
        {
          console.log("Subtract 50");
          console.log(emailid.email);
        }
      })
      currentPlayer.socket.emit('end-game');
    }
      
    if (winner) currentPlayer.socket.emit('winner', winner);
  });
};

exports.isGameOver = ({ player }) => {
  const game = getGameForPlayer(player);

  let redCount = 0;
  let blackCount = 0;
  for (let i = 0; i < game.board.length; i++) {
    for (let j = 0; j < game.board[i].length; j++) {
      if (
        game.board[i][j] === 1 ||
        game.board[i][j] === 3
      ) {
        redCount++;
      }
      if (
        game.board[i][j] === 2 ||
        game.board[i][j] === 4
      ) {
        blackCount++;
      }
    }
  }
  if (redCount === 0) {
    return 'black';
  } else if (blackCount === 0) {
    return 'red';
  } else {
    return false;
  }
};

exports.addChatMessage = ({ player, message }) => {
  const game = getGameForPlayer(player);
  game.chat.push(message);
};

