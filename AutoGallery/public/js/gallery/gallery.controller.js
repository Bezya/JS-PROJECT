(function() {

    class GalleryController {
        constructor(galleryModel, galleryView) {
            this.galleryModel = galleryModel;
            this.galleryView = galleryView;
        }

        bindEvents() {
            this.galleryView.DOMElements.btnCreateAndUpdate.addEventListener("click", (e) => {
                e.preventDefault();
                let data = this.galleryView.bodyRequest();
                let id = this.galleryView.isUpdate;

                if (this.galleryView.isUpdate) {
                    this.galleryModel.updateItem('put', data, id)
                        .then(
                            res => this.rebuildGallery().then(() => this.galleryView.showGallery()),
                            rej => { console.log(rej) }
                        )
                } else {
                    this.galleryModel.createItem('post', data)
                        .then(
                            res => this.rebuildGallery().then(() => this.galleryView.showGallery()),
                            rej => console.log(rej)
                        )
                }
            });

            this.galleryView.DOMElements.gallery.addEventListener("click", (e) => {
                e.preventDefault();
                let id = this.galleryView.getItemForDelete(e);
                if (id) {
                    this.galleryModel.deleteItem(id)
                        .then(
                            res => this.rebuildGallery(),
                            rej => console.log(rej)
                        )
                }
            });

            this.galleryView.DOMElements.nameDropdown.addEventListener("click", (e) => {
                let sortingType = this.galleryView.sortingHandler('Name', e);
                this.galleryModel.setDataToLS('sortingTypeName', sortingType)
            });

            this.galleryView.DOMElements.dateDropdown.addEventListener("click", (e) => {
                let sortingType = this.galleryView.sortingHandler('Date', e);
                this.galleryModel.setDataToLS('sortingTypeDate', sortingType)
            })
        }

        rebuildGallery() {
            return this.galleryModel.getData()
                .then(
                    res => {
                        this.galleryView.init(res);
                        this.restoreSorting();
                    },
                    rej => { console.log(rej) }
                )
        }

        restoreSorting() {
            let typeName = this.galleryModel.getDataFromLS('sortingTypeName');
            let typeDate = this.galleryModel.getDataFromLS('sortingTypeDate');
            this.galleryView.checkSorting(typeName, typeDate);
        }

        checkSession() {
            let logIn = this.galleryModel.checkSession();
            if (logIn) {
                window.location.href = '/#main';
            } else {
                window.location.href = '/#';
            }
        }

        init() {
            this.checkSession();
            this.galleryView.initListeners();
            this.rebuildGallery();
            this.bindEvents();
        }
    }

    window.app = window.app || {};
    window.app.GalleryController = GalleryController;

})();