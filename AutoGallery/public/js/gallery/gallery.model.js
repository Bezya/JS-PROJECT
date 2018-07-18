(function() {
	
    class GalleryModel {
        constructor(url) {
            this.getUrl = url;
        }
				//get data from server
        getData() {
            return fetch(this.getUrl).then(responce => responce.json()) // return чтобы мы могли вернуть данные в контролер
                .then(data => {
                    return data;
                })
        }

        requestMethod(method, obj) {
            let requestMethod = {
                headers: { 'Content-type': 'application/json; charset=utf-8' },
                method: method,
                body: this.requestBody(obj)
            };
            return requestMethod;
        }

        requestBody(obj) {return JSON.stringify(obj)}

				//create a gallery item
        createItem(method, obj) { 
            return fetch(this.getUrl, this.requestMethod(method, obj))
                .then(response => {
                    if (!response.status == 201) {
                        throw new Error(response.status);
                    }return response.json();
            });
            return new Promise(
                function(resolve, reject) {
                    resolve(obj);
                })
        }

				//update a gallery item
        updateItem(method, obj, id) { 
            return fetch(this.getUrl + id, this.requestMethod(method, obj))
                .then(response => {
                    if (!response.status == 201) {
                        throw new Error(response.status);
                    }return response.json();
            })
        }

				//action for button: create (add to gallery) or update
        update (action) {
            if(action=="add"){
                this.add()
            } else {
                this.update()
            }
        }

				// delete a gellery item
        deleteItem(id) { //метод для удаления элемента галереи
            let requestMethod = {
                headers: { 'Content-type': 'application/json; charset=utf-8' },
                method: 'delete'
            };
            return fetch(this.getUrl + id, requestMethod).then(response => {
                if (!response.status == 201) {
                    throw new Error(response.status);
                }return response.json();
            })
        }

				//check session: user logIn or not
        checkSession() {
            let log = localStorage.getItem('login');
            let pass = localStorage.getItem('password');
            return !!log && !!pass;
        }

				//set/get/remove data to/from LS
        setDataToLS(name, element) {
            localStorage.setItem(name, element);
        }
        getDataFromLS(name, element) {
            return localStorage.getItem(name, element);
        }
        removeDataFromLS(name) {
            localStorage.removeItem(name);
        }
    }

    window.app = window.app || {};
    window.app.GalleryModel = GalleryModel;

}());