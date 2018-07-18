(function() {
    let service = new Service();

    let login = document.querySelector("#login-view");
    let main = document.querySelector("#main-view");
    let info = document.querySelector("#info-view");
    let nav = document.querySelector("#nav-block");
    let create = document.querySelector("#create-form");


    let controllers = {};
    let routeConfig = {
        "": {
            show: () => {
                service.showHideViews([login], [main, info, nav, create]);
            },
            init: () => {
                let url = "http://localhost:3000/login";
                let loginModel = new window.app.LoginModel(url);
                let loginView = new window.app.LoginView();
                let loginController = new window.app.LoginController(loginModel, loginView);
                loginController.init();
            }
        },

        "main": {
            show: () => {
                service.showHideViews([main, nav], [login, info, create]);
            },
            init: () => {
                let url = "http://localhost:3000/cars/";
                let galleryModel = new window.app.GalleryModel(url);
                let galleryView = new window.app.BaseGallery();
                let galleryController = new window.app.GalleryController(galleryModel, galleryView);
                galleryController.init();
            }
        },

        "info": {
            show: () => {
                service.showHideViews([info, nav], [main, login, create]);
            },
            init: () => {
                //let observer = new window.app.Observer;
                let infoModel = new window.app.InfoModel();
                let infoView = new window.app.UserInfoView();
                let infoController = new window.app.InfoController(infoModel, infoView);
                infoController.init();
            }
        },
    };

    function updateRoute() {
        let routeName = document.location.hash.replace(/^#/, '');
        if (controllers[routeName]) {
            controllers[routeName].show();
        } else {
            let route = routeConfig[routeName];
            if (route) {
                route.init();
                route.show();
                controllers[routeName] = route;
            }
        }
    }

    window.app = window.app || {};
    window.app.Router = { updateRoute: updateRoute };

}());