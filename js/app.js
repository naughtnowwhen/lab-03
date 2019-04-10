
function Beast(beast) {
  this.image_url = beast.image_url;
  this.title = beast.title;
  this.description = beast.description;
  this.keyword = beast.keyword;
  this.horns = beast.horns;

  console.log(this);
}

Beast.allBeasts = [];

Beast.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let beastClone = $('div[class="clone"]');

  let beastHtml = $('#photo-template').html();

  beastClone.html(beastHtml)
  this;

  beastClone.find('h2').text(this.title);
  beastClone.find('img').attr('src', this.image_url);
  beastClone.find('p').text(this.description);
  beastClone.removeClass('clone');
  beastClone.attr('class', this.title);
}



Beast.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {    
        Beast.allBeasts.push(new Beast(item));
      })
    })
    .then(Beast.loadBeasts);
}

Beast.loadBeasts = () => {
  Beast.allBeasts.forEach(beast => beast.render())
}

$(() => Beast.readJson());
