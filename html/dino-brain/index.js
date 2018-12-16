// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
// var server = require('http').Server(app);
var io = require('socket.io')(server);//.listen(server);
// var io = require('socket.io')(server);
var port = process.env.PORT || 80;
// var port = 80;

server.listen(port);

var osc = require('node-osc');
var oscServer = new osc.Server(3333, '192.168.8.50');
var oscClient = new osc.Client('192.168.8.50', 3334);

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var numUsers = 0;

io.on('connection', (socket) => {

  console.log('client connected');

  oscClient.send('/getPos', 1);

  var addedUser = false;


  oscServer.on('message', function(msg, rinfo) {
    console.log(msg, rinfo);
    socket.emit("osc message", msg);


    
  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    // socket.broadcast.emit('new message', {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });

  });

  socket.on('message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
    socket.emit('new message', {
      username: socket.username,
      message: data
    });
    oscClient.send('/status', 'test');

  });

  socket.on('motorsOnOff', (data) => {

    console.log('motorsOnOff '+data);
    
    oscClient.send('/motorsOnOff', data);

  });

  socket.on('center', (data) => {

    console.log('center '+data);
    
    oscClient.send('/center', data);

  });

  socket.on('homePos', (data) => {

    console.log('homePos '+data);
    
    oscClient.send('/homePos', data);

  });

  socket.on('xy send', (data) => {
    // we tell the client to execute 'new message'
    // socket.broadcast.emit('xy2', 'hello');
    // oscClient.send('/xy', data[0]+" "+data[1]);
    console.log('xy '+data[0]+' '+data[1]);
    oscClient.send('/x', data[0]);
    oscClient.send('/y', data[1]);
    oscClient.send('/xy', data[0]+' '+data[1]);
  });

  socket.on('recStart', (data) => {

    console.log('recStart '+data);
    
    oscClient.send('/recStart', data);

  });

  socket.on('recStop', (data) => {

    console.log('recStop '+data);
    
    oscClient.send('/recStop', data);

  });

  socket.on('seqStart', (data) => {

    console.log('seqStart '+data);
    
    oscClient.send('/seqStart', data);

  });

  socket.on('seqStop', (data) => {

    console.log('seqStop '+data);
    
    oscClient.send('/seqStop', data);

  });

  socket.on('seqNum', (data) => {

    console.log('seqNum '+data);
    
    oscClient.send('/seqNum', data);

  });

  socket.on('nextSeq', (data) => {
    
    oscClient.send('/nextSeq', data);

  });

  socket.on('prevSeq', (data) => {
    
    oscClient.send('/prevSeq', data);

  });

  socket.on('saveSeq', (data) => {
    
    oscClient.send('/saveSeq', data);

  });

  socket.on('getCurSeq', (data) => {
    
    oscClient.send('/getCurSeq', data);

  });

  socket.on('autoEnabled', (data) => {
    
    oscClient.send('/autoEnabled', data);

  });

  socket.on('autoStartTime', (data) => {
    
    oscClient.send('/autoStartTime', data);

  });

  socket.on('autoEndTime', (data) => {
    
    oscClient.send('/autoEndTime', data);

  });

  socket.on('autoStartSeq', (data) => {
    
    oscClient.send('/autoStartSeq', data);

  });

  socket.on('autoInterval', (data) => {
    
    oscClient.send('/autoInterval', data);

  });

  socket.on('autoEndSeq', (data) => {
    
    oscClient.send('/autoEndSeq', data);

  });

  socket.on('getSettings', (data) => {
    
    oscClient.send('/getSettings', data);

  });

  socket.on('systemShutdown', (data) => {
    
    oscClient.send('/systemShutdown', data);

  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    // if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
