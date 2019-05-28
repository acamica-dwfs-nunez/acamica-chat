class ControllerMessage {
    constructor() {
        window.userdata = {}
        // this.eventoController = new Evento(window.userdata);
        // this.messages = []
    }

    processLogin = function(value) {
        if (value) {
            let data = { type: 'login', body: { name: value } }
            socket.send(JSON.stringify(data))
            viewLoading.show();
            viewLogin.hide();
        }
    }
    
    addMessage = function(message) {
        if (message) {
            let data = { type: 'message', body: { msg: message }, name: window.userdata.name }
            socket.send(JSON.stringify(data))
            document.getElementById('msgcontent').value = ''
          }
    }
}