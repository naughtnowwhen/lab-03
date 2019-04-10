//NOTE! I changed the index.html from pointing to js/app.js to just app.js for the sake of typescript so beware!
function Beast(beast) {
    this.image_url = beast.image_url;
    this.title = beast.title;
    this.description = beast.description;
    this.keyword = beast.keyword;
    this.horns = beast.horns;
}
;
/** @type {beastArray} */
Beast.allBeasts = [];
Beast.prototype.render = function () {
    $('main').append('<div class="clone"></div>');
    var beastClone = $('div[class="clone"]');
    var beastHtml = $('#photo-template').html();
    beastClone.html(beastHtml);
    beastClone.find('h2').text(this.title);
    beastClone.find('img').attr('src', this.image_url);
    beastClone.find('p').text(this.description);
    beastClone.removeClass('clone');
    beastClone.attr('class', this.title);
    //now to try to append text to the drop down
    $('select').append("<option value=\"" + this.title + "\">" + this.title + "</option>");
};
Beast.readJson = function () {
    $.get('data/page-1.json', 'json')
        .then(function (data) {
        data.forEach(function (item) {
            // @ts-ignore
            Beast.allBeasts.push((new Beast(item)));
        });
    })
        .then(Beast.loadBeasts);
};
Beast.loadBeasts = function () {
    Beast.allBeasts.forEach(function (beast) { return beast.render(); });
};
$(function () { return Beast.readJson(); });
