

//hmm, this isn't working,  Module '"handlebars/runtime"' has no default export.
// just use the cdn for now.
// import handlebars from 'handlebars/runtime'

//NOTE! I changed the index.html from pointing to js/app.js to just app.js for the sake of typescript so beware!



interface Ibeast {
    title: string;
    image_url: string;
    description: string;
    keyword: string;
    horns: number;
    allBeasts: beastArray;
    // render: () => void;
    toHtml : () => HTMLElement;
}


type beastArray = Ibeast[];
function Beast(this: Ibeast, beast: Ibeast) {
    this.image_url = beast.image_url;
    this.title = beast.title;
    this.description = beast.description;
    this.keyword = beast.keyword;
    this.horns = beast.horns;
};
/** @type {beastArray} */
Beast.allBeasts = [];  //?
Beast.allBeastsUniqueNames = new Set();



Beast.appendTheGeneratedUniqueNamesToDropDown = function () {
    $('option').remove();
    Beast.allBeastsUniqueNames.forEach((one : string)=>{
        $('select').append(`  <option value="${one}">${one}</option>`);
    })
}

// Beast.prototype.render = function () {
//     $('main').append('<div class="clone"></div>');
//     let beastClone = $('div[class="clone"]');
//     let beastHtml = $('#photo-template').html();
//     beastClone.html(beastHtml)
//     beastClone.find('h2').text(this.title);
//     beastClone.find('img').attr('src', this.image_url);
//     beastClone.find('p').text(this.description);
//     beastClone.removeClass('clone');
//     beastClone.attr('class', this.keyword);
//     beastClone.addClass('allBeastClass');
// }

Beast.prototype.toHtml = function () {
    let template = $('#beastTemplate').html();


    //How do i get these types, or intellisense?
    //options = {};
    let compileTheTemplate = Handlebars.compile(template);

    // let that = compileTheTemplate(this);
    // console.log(that);
    // return that;
    console.log(compileTheTemplate(this));
    return compileTheTemplate(this);
  }



function hideAll() {
    $('.allBeastClass').hide();
}

function eraseTheDomForTheSakeofDuplicates () {
    $('.allBeastClass').remove();
}

$('select').on('change', () => {
    let currentlySelected = $('option:selected').val();
    hideAll();
    //@ts-ignore
    let showMe = $(`.${currentlySelected}`).show();
})


Beast.readJson = (myJSONsource : string) => {
    $.get(myJSONsource, 'json')
        .then(data => {
            data.forEach((item: Ibeast) => {
                console.log(item);
                console.clear();

                // @ts-ignore
                Beast.allBeasts.push((new Beast(item)));
                // this a unique set of the keyword names
                Beast.allBeastsUniqueNames.add(item.keyword.toLocaleLowerCase());
                console.log('what was it');
            })
        })
        .then(Beast.loadBeasts)
        
}

  
Beast.loadBeasts = () => {
    Beast.allBeasts.forEach(beast => {
        let toHtml = beast.toHtml();
        $('.image-container').append(toHtml);
    })
    Beast.appendTheGeneratedUniqueNamesToDropDown();
}



$('#firstPage, #secondPage').click(function(){
    console.log(this.id);
    if (this.id === 'firstPage'){
        console.log();
        Beast.allBeasts = [];
        Beast.allBeastsUniqueNames.clear();
        // hideAll();
        eraseTheDomForTheSakeofDuplicates();
        Beast.readJson(`data/\page-1.json`)
    }
    else if (this.id === 'secondPage'){
        // hideAll();
        Beast.allBeasts = [];
        Beast.allBeastsUniqueNames.clear()
        eraseTheDomForTheSakeofDuplicates();
        Beast.readJson(`data/\page-2.json`);
    }
})


$(() => {
    Beast.readJson('data/\page-1.json')
});



