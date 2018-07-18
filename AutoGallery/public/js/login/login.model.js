(function() {

    class LoginModel {
        constructor(url) {
            this.getUrl = url;
            this.patternMail = /^\w+@\w+\.\w{2,4}$/i;
            this.patternPass = /^[a-zA-Z0-9]+$/;
            this.errorMsg = null;
            this.errorMsgMap = {
                0: 'Заполните поля логин и пароль',
                1: 'Логин введен неправильно! Логин может состоять только из латинских букв и цифр!',
                2: 'Пароль введен неправильно! Пароль может состоять только из латинских букв или цифр!',
                3: 'Пароль слишком короткий! Пароль должен быть не менее 6 символов!',
                4: 'Неправильные логин или пароль'
            };
        }

        setErrorMsg(key){
            this.errorMsg = this.errorMsgMap[key];
            return false;
        }

        isAnyData(login, pass){return login && pass ? true : this.setErrorMsg(0)};

        isValidLogAndPass(login, pass){
            return (this.patternMail.test(login) ? true : this.setErrorMsg(1)) &&
                (this.patternPass.test(pass) ? true : this.setErrorMsg(2)) &&
                (pass.length >= 6 && pass.length <= 20 ? true : this.setErrorMsg(3));
        }

        isMatchLogAndPass(login, password){
            let options = {
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                method: 'post',
                body: JSON.stringify({ login, password })

            };
            return fetch(this.getUrl, options)
                .then(responce => {
                    if (responce.status == 200) {
                        return responce.json()
                    }
                    throw new Error(responce.status)
                })
                .then(data => data.status)
                .catch(() => this.setErrorMsg(4));
        }

        validation(obj){
            if (this.isAnyData(obj.login, obj.password) &&
                this.isValidLogAndPass(obj.login, obj.password)) {
                return this.isMatchLogAndPass(obj.login, obj.password)
            }
        }

        logAndPassValidation(obj) {
            let val = this.validation(obj);
            return new Promise((resolve,reject)=>{
                if (val) {
                    val.then(res => {
                        if (res) {
                            resolve(true);
                            localStorage.setItem('login', obj.login);
                            localStorage.setItem('password', obj.password);
                        } else {
                            reject(this.errorMsg);
                        }
                    })
                } else {reject(this.errorMsg)}
            })
        }

        checkSession() {
            let log = localStorage.getItem('login');
            let pass = localStorage.getItem('password');
            return !!log && !!pass;
        }

        logOut(){
            localStorage.removeItem('login');
            localStorage.removeItem('password');
        }
    }

    window.app = window.app || {};
    window.app.LoginModel = LoginModel;

}());