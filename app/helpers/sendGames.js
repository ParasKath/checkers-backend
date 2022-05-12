const { getGames } = require('../../build/gameManager');

module.exports = (sender) => {
  sender.emit('games', getGames());
};