class LoadingView {
    constructor() {
        this.loadscreen = document.getElementById('loading')   
        this.show();     
    }

    hide = function() {
        this.loadscreen.style.display = 'none'
    }
    show = function() {
        this.loadscreen.style.display = 'flex'
    }
}