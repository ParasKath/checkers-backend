global.__basePath = process.cwd() + '/';
const app = require(__basePath + 'app/app.js');
const port = process.env.NODE_PORT || 5000 ;
const host = process.env.NODE_HOST || '0.0.0.0';

/**
 * @description Listen Server at configured port
 * @event App Listener
 */

console.log("Application running on port : " + port + " and host: " + host);

 const io = require('socket.io')(app.listen(port,host), {
    transports: ['websocket'],
  });
  
  
  const onDisconnectFactory = require('../app/handlers/onDisconnectFactory');
  const movePieceFactory = require('../app/handlers/movePieceFactory');
  const leaveGameFactory = require('../app/handlers/leaveGameFactory');
  const createGameFactory = require('../app/handlers/createGameFactory');
  const joinGameFactory = require('../app/handlers/joinGameFactory');
  const chatMessageFactory = require('../app/handlers/chatMessageFactory');
  
  const sendGames = require('../app/helpers/sendGames');
  
  
  io.on('connection', (socket) => {
  
    sendGames(socket);
    
  
    socket.on(
      'disconnect',
      onDisconnectFactory({ io, socket })
    );
  
    socket.on('move-piece', movePieceFactory({ io, socket }));
  
    socket.on('leave-game', leaveGameFactory({ socket, io }));
  
    socket.on(
      'chat-message',
      chatMessageFactory({ socket, io })
    );
  
    socket.on(
      'create-game',
      createGameFactory({ io, socket })
    );
  
    socket.on('join-game', joinGameFactory({ io, socket }));
  });






// app.listen(port,host, function () {
//     console.log(`Listening port ${port}`);
// });