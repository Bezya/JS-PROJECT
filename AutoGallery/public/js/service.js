
function Service() {

    this.hideElement = function(element) {element.classList.add('hide')}; //скрывает элемент

    this.showElement = function(element) { element.classList.remove('hide') }; //показывает элемент

    this.showHideElement = function(showEl, hideEl) {//показывает и скрывает
        showEl.classList.add('show');
        hideEl.classList.remove('show');
    };

    this.showHideViews = function(showEl, hideEl) { // показывает/скрывает (массивы элементов)
        showEl.forEach((item) => {
            item.classList.add('show')
        });
        hideEl.forEach((item) => {
            item.classList.remove('show')
        });
    };

    this.hideAllView = function(viewsEl) { // скрывает массив элементов
        viewsEl.forEach(element => {
            element.classList.remove("show");
        });
    };

    this.inheritance = function(parent, child) { //функция наследования
        let tempChild = child.prototype;
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;

        for (let key in tempChild) {
            if (tempChild.hasOwnProperty(key)) {
                child.prototype[key] = tempChild[key];
            }
        }
    };
}
window.service = new Service();