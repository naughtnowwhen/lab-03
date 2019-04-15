//NOTE! I changed the index.html from pointing to js/app.js to just app.js for the sake of typescript so beware!



interface Ibeast {
    title: string;
    image_url: string;
    description: string;
    keyword: string;
    horns: number;
    allBeasts: beastArray;
    render: () => void;
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
    Beast.allBeastsUniqueNames.forEach((one : string)=>{
        $('select').append(`  <option value="${one}">${one}</option>`);
    })
}


Beast.prototype.render = function () {
    // create a div, store it in variable, 
    // Evan pointed out were creating it, then finding it, then updating it,
    //but that seems inefficiet
    $('main').append('<div class="clone"></div>');
    let beastClone = $('div[class="clone"]');
    let beastHtml = $('#photo-template').html();
    beastClone.html(beastHtml)
    beastClone.find('h2').text(this.title);
    beastClone.find('img').attr('src', this.image_url);
    beastClone.find('p').text(this.description);
    beastClone.removeClass('clone');
    beastClone.attr('class', this.keyword);
    beastClone.addClass('allBeastClass');
    //now to try to append text to the drop down

    // now to hide them... this is working on most but not all...
    // $(`#${this.title}`).hide();
}


class helperFunctions {
    static hideAll() {
        $('.aHornedBeast').hide();
    }
    static compareAllBeastsLengthTheLengthOftheDropDown() {
        // there are 20 beasts in the array
       let options = $('option');
       return options.length;
    }
    static first () {
        return Beast.allBeasts[0];
    }
}

function hideAll() {
    $('.allBeastClass').hide();
}
$('select').on('change', () => {
    let currentlySelected = $('option:selected').val();
    hideAll();
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
            })
        })
        .then(Beast.loadBeasts)
        
}


Beast.loadBeasts = () => {
    Beast.allBeasts.forEach(beast => beast.render())
    Beast.appendTheGeneratedUniqueNamesToDropDown
}



$('#firstPage, #secondPage').click(function(){
    console.log(this.id);
    if (this.id === 'firstPage'){
        Beast.allBeasts = [];
        hideAll();
        Beast.readJson(`data/\page-1.json`)
    }
    else if (this.id === 'secondPage'){
        hideAll();
        Beast.allBeasts = [];
        Beast.readJson(`data/\page-2.json`);
    }
})

// $('#hornSelect').change(function(){
// })
$(() => {
    //@ts-ignore
    Beast.readJson('data/\page-1.json')
    console.log('anything');
});



