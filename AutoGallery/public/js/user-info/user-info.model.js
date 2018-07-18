(function() {

    class InfoModel {
        constructor() {
            this.login = localStorage.getItem('login');
            this.password = localStorage.getItem('password');
        }

        checkSession() {
            let log = localStorage.getItem('login');
            let pass = localStorage.getItem('password');
            return !!log && !!pass;
        }
    }

    window.app = window.app || {};
    window.app.InfoModel = InfoModel;

}());