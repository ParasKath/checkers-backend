const { addChatMessage } = require('../../build/gameManager');
const sendGames = require('../helpers/sendGames');

module.exports = ({ io, socket }) => (message) => {
  addChatMessage({ player: socket, message });
  sendGames(io);
};