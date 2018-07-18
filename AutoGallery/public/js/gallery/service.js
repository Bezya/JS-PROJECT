function GalleryService() {
    const transformUrl = str => (str.indexOf('http://') !== 0) ? `http://${str}` : `${str}`;

    const transformName = name => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

    const transformDescription = str => (str.length > 15) ? `${str.substring(0, 15)}...` : str;

    const getFormattedDate = date => moment(date).format('YYYY/MM/DD');

    this.galleryTemplate = function(item) {
        return `<div class="col-md-4 gallery-item" data-id="${item.id}">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" 
                            data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                            alt="${transformName(item.name)}" 
                            src="${transformUrl(item.url)}" data-holder-rendered="true" 
                            style="height: 225px; width: 100%; display: block;">
                        <div class="card-body">
                            <div class="text-muted">${transformName(item.name)}</div>\
                            <p class="card-text">${transformDescription(item.description)}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary">View</button>
                                    <button type="button" class="btn btn-outline-secondary edit">Edit</button>
                                 </div>
                                <button class="btn btn-danger" data-id="${item.id}">Удалить</button>
                                <small class="text-muted">${getFormattedDate(item.date)}</small>
                            </div>
                        </div>
                    </div>
		        </div>`;
    };

   /* this.createAndUpdateTemplate = function (item) {
        return `<form class="form">
            <h1 class="h3 mb-3 font-weight-normal">Заполните поля</h1>
            <p>URL<p>
            <input type="text" id="createUrl" class="form-control" required>
            <div class="mb-3"></div>
            <p>Наименование<p>
            <input type="text" id="createName" class="form-control">
            <div class="mb-3"></div>
            <p>Описание<p>
            <input type="text" id="createDescription" class="form-control">
            <div class="mb-3"></div>
            <button class="btn btn-lg btn-primary btn-block" id="btn-create" type="submit">Создать/Изменить элемент галереи</button>
        </form>`;
    };*/

    this.sortingConfig = {
        "A": (a, b) => a.name > b.name ? 1 : -1,
        "Z": (a, b) => a.name < b.name ? 1 : -1,
        "New": (a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1,
        "Old": (a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1
    };

    this.removePNode = function(e, element) {
        let target = e.target;
        while (target !== element) {
            if (target.parentNode === element) {
                element.removeChild(target);
                break;
            } else {
                target = target.parentNode
            }
        }
    };
}