//NOTE! I changed the index.html from pointing to js/app.js to just app.js for the sake of typescript so beware!

interface Ibeast {
    title: string;
    image_url: string;
    description: string;
    keyword: string;
    horns: number
    allBeasts: beastArray;
    render: () => void;
}
type beastArray = Ibeast[];
function Beast(this : Ibeast, beast: Ibeast) {
    this.image_url = beast.image_url;
    this.title = beast.title;
    this.description = beast.description;
    this.keyword = beast.keyword;
    this.horns = beast.horns;
};
/** @type {beastArray} */
Beast.allBeasts = [];
Beast.prototype.render = function () {
    $('main').append('<div class="clone"></div>');
    let beastClone = $('div[class="clone"]');
    let beastHtml = $('#photo-template').html();
    beastClone.html(beastHtml)
    beastClone.find('h2').text(this.title);
    beastClone.find('img').attr('src', this.image_url);
    beastClone.find('p').text(this.description);
    beastClone.removeClass('clone');
    beastClone.attr('class', this.title);

    //now to try to append text to the drop down
    $('select').append(`<option value="${this.title}">${this.title}</option>`);
}


Beast.readJson = () => {
    $.get('data/page-1.json', 'json')
        .then(data => {
            data.forEach((item: Ibeast) => {
                // @ts-ignore
                Beast.allBeasts.push((new Beast(item)));
            })
        })
        .then(Beast.loadBeasts);
}
Beast.loadBeasts = () => {
    Beast.allBeasts.forEach(beast => beast.render())
}

$(() => Beast.readJson());