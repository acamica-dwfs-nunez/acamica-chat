const http = require('http')
const WebSocketServer = require('websocket').server
const uuid = require('uuid/v4')
const PORT = process.env.PORT || 5000

const server = http.createServer((request, response) => {
  response.end('ws server only')
})

server.listen(PORT, function() {})

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
})

let users = []

// WebSocket server
wsServer.on('request', function(request) {
  let connection = request.accept(null, request.origin)
  const id = uuid()
  connection.on('message', function(message) {
    console.log(`connected user ${id}`)
    console.log(users)
    if (message.type === 'utf8') {
      const req = JSON.parse(message.utf8Data)
      switch (req.type) {
        case 'login':
          users.push({ name: req.body.name, id, connection })
          connection.sendUTF(JSON.stringify({ name: req.body.name, id, type: 'login' }))
          break
        case 'message':
          const name = users.find(({ id }) => id === id).name
          console.log(name)
          for (const user of users) {
            user.connection.sendUTF(JSON.stringify({ name: req.name, msg: req.body.msg, type: 'message', id }))
          }
          break
        default:
          break
      }
    }
  })

  connection.on('close', function(connection) {
    console.log(`disconnected user ${id}`)
    users = users.filter(x => x.id !== id)
  })
})
