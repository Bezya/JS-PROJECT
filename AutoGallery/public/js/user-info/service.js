function UserService() {

    this.setBtnName = (element, btnName) => {
        if (element.type === 'password') {
            btnName.innerHTML = 'Показать пароль';
        } else if (element.type === 'text') {
            btnName.innerHTML = 'Скрыть пароль';
        }
    };

    this.showPassword = element => element.type === 'password' ? element.type = 'text' : element.type = 'password';
}