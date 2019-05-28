class ChatView  {
    constructor(controller) {
        this.chat = document.getElementById('chat')
        this.msgs = document.getElementById('msgs')
        this.controller = controller

        this.msgbutton = document.getElementById('msgbutton')
        this.msgbutton.addEventListener('click', () => {
            const { value } = document.getElementById('msgcontent')
            controller.addMessage(value)
        })
  
    }
    show = function() {
        this.chat.style.display = 'flex'
    }
    hide = function() {
        this.chat.style.display = 'none'
    }

    addMessage = function(data, userdata) {
        const container = document.createElement('div')
        container.classList.add(data.id === userdata.id ? 'bbcontainerr' : 'bbcontainerl')
        container.innerText = data.name
        const msg = document.createElement('div')
        msg.classList.add(`messageBubble`, data.id === userdata.id ? 'right' : 'left')
        msg.innerText = data.msg
        container.appendChild(msg)
        msgs.appendChild(container)
    }
}