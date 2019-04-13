//NOTE! I changed the index.html from pointing to js/app.js to just app.js for the sake of typescript so beware!
function Beast(beast) {
  this.image_url = beast.image_url;
  this.title = beast.title;
  this.description = beast.description;
  this.keyword = beast.keyword;
  this.horns = beast.horns;
}

/** @type {beastArray} */
Beast.allBeasts = []; //?
Beast.allBeastsUniqueNames = new Set();
Beast.appendTheGeneratedUniqueNamesToDropDown = function () {
  Beast.allBeastsUniqueNames.forEach(function (one) {
    $('select').append('  <option value="' + one + '">' + one + '</option>');
  });
};
Beast.prototype.render = function () {
  // create a div, store it in variable,
  // Evan pointed out were creating it, then finding it, then updating it,
  //but that seems inefficiet
  $('main').append('<div class="clone"></div>');
  var beastClone = $('div[class="clone"]');
  var beastHtml = $('#photo-template').html();
  beastClone.html(beastHtml);
  beastClone.find('h2').text(this.title);
  beastClone.find('img').attr('src', this.image_url);
  beastClone.find('p').text(this.description);
  beastClone.removeClass('clone');
  beastClone.attr('class', this.keyword);
  beastClone.addClass('allBeastClass');
  //now to try to append text to the drop down
  // now to hide them... this is working on most but not all...
  // $(`#${this.title}`).hide();
};
var helperFunctions = /** @class */ (function () {
  function helperFunctions() {
  }
  helperFunctions.hideAll = function () {
    $('.aHornedBeast').hide();
  };
  helperFunctions.compareAllBeastsLengthTheLengthOftheDropDown = function () {
    // there are 20 beasts in the array
    var options = $('option');
    return options.length;
  };
  helperFunctions.first = function () {
    return Beast.allBeasts[0];
  };
  return helperFunctions;
}());
function hideAll() {
  $('.allBeastClass').hide();
}
$('select').on('change', function () {
  var currentlySelected = $('option:selected').val();
  hideAll();
  var showMe = $('.' + currentlySelected).show();
});
Beast.readJson = function (myJSONsource) {
  $.get(myJSONsource, 'json')
    .then(function (data) {
      data.forEach(function (item) {
        console.log(item);
        console.clear();
        // @ts-ignore
        Beast.allBeasts.push((new Beast(item)));
        // this a unique set of the keyword names
        Beast.allBeastsUniqueNames.add(item.keyword.toLocaleLowerCase());
      });
    })
    .then(Beast.loadBeasts);
};
Beast.loadBeasts = function () {
  Beast.allBeasts.forEach(function (beast) { return beast.render(); });
  Beast.appendTheGeneratedUniqueNamesToDropDown;
};
$('#firstPage, #secondPage').click(function () {
  console.log(this.id);
  if (this.id === 'firstPage') {
    Beast.allBeasts = [];
    hideAll();
    Beast.readJson('data/page-1.json');
  }
  else if (this.id === 'secondPage') {
    hideAll();
    Beast.allBeasts = [];
    Beast.readJson('data/page-2.json');
  }
});
// $('#hornSelect').change(function(){
// })
$(function () {
  //@ts-ignore
  Beast.readJson(jsonSource = 'data/\page-1.json');
});
