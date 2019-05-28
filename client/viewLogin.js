class LoginView {
 
    constructor() {
        let usernameInput = document.getElementById('username')
        this.login = document.getElementById('login')
        this.loginbtn = document.getElementById('loginBtn')
        this.loginbtn.addEventListener('click', () => {
            let { value } = usernameInput
            controller.processLogin(value);
        })
    }
    show = function() {
        this.login.style.display = 'flex'
    }
    hide = function() {
        this.login.style.display = 'none'
    }

    doLogin = function(data) {
        const name = document.getElementById('nombre')
        name.innerHTML = data.name
    }

    
}