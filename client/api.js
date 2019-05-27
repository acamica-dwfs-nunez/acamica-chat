window.userdata = {}
const socket = new WebSocket('ws://chat-acamica.herokuapp.com/')

const loadscreen = document.getElementById('loading')
const login = document.getElementById('login')
const chat = document.getElementById('chat')

const usernameInput = document.getElementById('username')
const loginbtn = document.getElementById('loginBtn')
const msgbutton = document.getElementById('msgbutton')

const msgs = document.getElementById('msgs')
socket.addEventListener('open', function(event) {
  loadscreen.style.display = 'none'
  login.style.display = 'flex'
})
socket.addEventListener('message', function(event) {
  const data = JSON.parse(event.data)
  console.log(data)

  if (data && data.type) {
    switch (data.type) {
      case 'login':
        const name = document.getElementById('nombre')
        console.log(name)
        name.innerHTML = data.name
        loadscreen.style.display = 'none'
        chat.style.display = 'flex'
        window.userdata = data
        break
      case 'message':
        console.log(data)
        const container = document.createElement('div')
        container.classList.add(data.id === window.userdata.id ? 'bbcontainerr' : 'bbcontainerl')
        container.innerText = data.name
        const msg = document.createElement('div')
        msg.classList.add(`messageBubble`, data.id === window.userdata.id ? 'right' : 'left')
        msg.innerText = data.msg
        container.appendChild(msg)
        msgs.appendChild(container)
        break
      default:
        break
    }
  }
})

loginbtn.addEventListener('click', () => {
  let { value } = usernameInput
  if (value) {
    let data = { type: 'login', body: { name: value } }
    socket.send(JSON.stringify(data))
    loadscreen.style.display = 'flex'
    login.style.display = 'none'
  }
})

msgbutton.addEventListener('click', () => {
  const { value } = document.getElementById('msgcontent')
  if (value) {
    let data = { type: 'message', body: { msg: value }, name: window.userdata.name }
    socket.send(JSON.stringify(data))
    document.getElementById('msgcontent').value = ''
  }
})
