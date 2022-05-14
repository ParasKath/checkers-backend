const {
  getGameById,
  addPlayerToGame,
} = require('../../build/gameManager');
const sendGames = require('../helpers/sendGames');

module.exports = ({ io, socket }) => (gameId,email) => {
  const game = getGameById(gameId);
  
  if (game.numberOfPlayers < 2) {
    const player2={
      email:email,
      color:'black'
    }
    game.email.push(player2);
    const color = addPlayerToGame({
      player: socket,
      gameId,
    });
    sendGames(io);
    socket.emit('color', color);
  }
  //sendGames(io);
};