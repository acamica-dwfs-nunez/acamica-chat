const socket = new WebSocket('ws://chat-acamica.herokuapp.com/')


var controller = new ControllerMessage();

var viewLoading = new LoadingView();
var viewLogin = new LoginView(controller);
var viewChat = new ChatView(controller);

socket.addEventListener('open', function(event) {
  viewLoading.hide();
  viewLogin.show();
})

socket.addEventListener('message', function(event) {
  const data = JSON.parse(event.data)
  if (data && data.type) {
    switch (data.type) {
      case 'login':
        viewLogin.doLogin(data)
        viewLoading.hide();
        viewChat.show();
        window.userdata = data              
        break
      case 'message':
        viewChat.addMessage(data, window.userdata)
        break
    }
  }  
  //controller.processMessage(data);
})

