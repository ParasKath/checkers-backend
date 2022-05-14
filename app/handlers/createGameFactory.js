const { createGame } = require('../../build/gameManager');
const sendGames = require('../helpers/sendGames');

module.exports = ({ io, socket }) => (name,email) => {
  const game = createGame({ player: socket, name,email });
  // game.id=name;
  // game.email.push(email);
  sendGames(io);
  socket.emit('your-game-created', game.id);
  socket.emit('color', 'red');
};