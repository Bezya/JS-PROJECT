(function() {
    let galleryService = new GalleryService();

    class BaseGallery {
        constructor() {
            this.DOMElements = {
                btnAdd: document.querySelector("#add-photo"),
                counter: document.querySelector("#js-count"),
                dateDropdown: document.querySelector("#dropdown-date"),
                nameDropdown: document.querySelector("#dropdown-name"),
                gallery: document.querySelector(".js-gallery"),

                galleryForm: document.querySelector('.gallery-form'),
                createAndUpdateForm: document.querySelector(".create-form"),
                btnCreateItem: document.querySelector("#create-item"),

                btnCreateAndUpdate: document.querySelector("#btn-create-update"),
                createUrl: document.querySelector("#createUrl"),
                createName: document.querySelector("#createName"),
                createDescription: document.querySelector("#createDescription"),
                btnReturn: document.querySelector("#btn-return"),
            };

            this.isUpdate = null;
            this.imgData = null;
        }

        init(data) {
            this.saveData(data);
            this.buildGallery();
            return data;
        }

        saveData(data) {
            this.imgData = data;
        }

        initListeners() {
            //this.DOMElements.btnAdd.addEventListener("click", this.addOneImg.bind(this));
            this.DOMElements.gallery.addEventListener("click", this.getItemForEdit.bind(this));
            this.DOMElements.btnCreateItem.addEventListener("click", this.getFormForCreate.bind(this));
            this.DOMElements.btnReturn.addEventListener("click", this.showGallery.bind(this));
        }

        bodyRequest() {
            return {
                url: this.DOMElements.createUrl.value,
                name: this.DOMElements.createName.value,
                description: this.DOMElements.createDescription.value,
                date: Date.now()
            }
        }

        getFormForCreate() {
            this.isUpdate = null;
            this.showCreateAndUpdateFom();
        }

        showCreateAndUpdateFom() {
            this.setCorrectBtnName();
            service.showHideElement(this.DOMElements.createAndUpdateForm, this.DOMElements.galleryForm);
        }

        showGallery() {
            service.showHideElement(this.DOMElements.galleryForm, this.DOMElements.createAndUpdateForm);
            this.buildGallery();
        }

        fillFields(item) {
            this.DOMElements.createUrl.value = item.url;
            this.DOMElements.createName.value = item.name;
            this.DOMElements.createDescription.value = item.description;
        }

        getItemForDelete(e) {
            if (e.target.classList.contains('btn-danger')) {
                return e.target.getAttribute('data-id');
            }
        }

        getItemForEdit(e) {
            e.preventDefault();
            if (e.target.classList.contains('edit')) {
                let element = e.target;
                while (!element.classList.contains('gallery-item')) {
                    element = element.parentNode;
                }
                let id = element.getAttribute('data-id');
                let imgForUpdate = this.imgData.find((item) => item.id == id);
                this.fillFields(imgForUpdate);
                this.isUpdate = id;
                this.showCreateAndUpdateFom();
                return imgForUpdate;
            }
        }

        setCorrectBtnName(){
            let btnName = this.isUpdate ? 'Изменить элемент галереи' : 'Создать элемент галереи';
            this.DOMElements.btnCreateAndUpdate.innerHTML = btnName;
        }

        buildGallery(){
            let result = '';
            this.imgData.forEach(item => {
                result += galleryService.galleryTemplate(item);
            });
            this.DOMElements.gallery.innerHTML = result;
        }

        sortingHandler(type, event) {
            event.preventDefault();
            event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
            let sortingType = event.target.getAttribute("sorting-type");
            sortingType && this.applySortingMethod(sortingType);
            return sortingType;
        }

        applySortingMethod(sortingType) {
            this.DOMElements.gallery.innerHTML = '';
            this.restoreImg(galleryService.sortingConfig[sortingType]);
        }

        restoreImg(sortingFunction) {
            this.DOMElements.gallery.innerHTML = '';
            this.imgData.sort(sortingFunction);
            this.imgData.forEach((item) => this.DOMElements.gallery.innerHTML += galleryService.galleryTemplate(item));
        }

        checkSorting(typeName, typeDate) {
            if (typeName) {
                this.DOMElements.nameDropdown.querySelector("button").innerHTML = typeName === 'A' ?
                    'Вперед: от А до Я' : 'Назад: от Я до А';
                this.applySortingMethod(typeName);
            }
            if (typeDate) {
                this.DOMElements.dateDropdown.querySelector("button").innerHTML = typeDate === 'New' ?
                    'Сначала новые' : 'Сначала старые';
                this.applySortingMethod(typeDate);
            }
        }

        /*setNumberOfImg() {
            this.counter.innerHTML = this.imgData.length;
        }

        checkImgDataEnd(arr) {
            if (arr.length === 0) {
                this.btnAdd.classList.add("disabled");
                $('#jsModal').modal('show');
                return true
            }return false;
        }

        addOneImg() {
            if (this.checkImgDataEnd(this.imgData)) return;
            this.showedImgData.push(this.imgData.shift());
            this.gallery.innerHTML += galleryService.galleryTemplate(this.showedImgData[this.showedImgData.length - 1]);
            this.setNumberOfImg();
            this.updateLocalImgData();
        }*/
    }

    window.app = window.app || {};
    window.app.BaseGallery = BaseGallery;

}());