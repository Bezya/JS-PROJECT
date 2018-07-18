(function() {

    class LoginController {
        constructor(loginModel, loginView) {
            this.loginModel = loginModel;
            this.loginView = loginView;
            this.url = "http://localhost:3000/login/"
        }

        bindEvents() {
            this.loginView.DOMElements.btnSingIn.addEventListener("click", (e) => {
                e.preventDefault();
                let data = this.loginView.getLogAndPass();
                this.loginModel.logAndPassValidation(data).then(
                    res => {
											//this.loginView.hideAlert();
											window.location.href = '/#main';
										},
                    rej => this.loginView.alertHandler(rej)
                )
            });

            this.loginView.DOMElements.btnExit.addEventListener("click", () => {
                this.loginModel.logOut();
            });
        }

        checkSession() {
            let logIn = this.loginModel.checkSession();
            if (logIn) {
                window.location.href = '/#main ';
            } else {
                window.location.href = '/#';
            }
        }

        init() {
            this.checkSession();
            this.bindEvents();
        }
    }

    window.app = window.app || {};
    window.app.LoginController = LoginController;

})();