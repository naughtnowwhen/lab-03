"use strict";
//hmm, this isn't working,  Module '"handlebars/runtime"' has no default export.
// just use the cdn for now.
// import handlebars from 'handlebars/runtime'
function Beast(beast) {
    this.image_url = beast.image_url;
    this.title = beast.title;
    this.description = beast.description;
    this.keyword = beast.keyword;
    this.horns = beast.horns;
}
;
/** @type {beastArray} */
Beast.allBeasts = []; //?
/** @type {beastArray} */
Beast.allBeastsSortedByHorns = [];
/** @type {beastArray} */
Beast.allBeastsNeverSorted = [];
Beast.allBeastsUniqueNames = new Set();
Beast.appendTheGeneratedUniqueNamesToDropDown = function () {
    $('option').remove();
    Beast.allBeastsUniqueNames.forEach((one) => {
        $('select').append(`  <option value="${one}">${one}</option>`);
    });
};
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
    return compileTheTemplate(this);
};
function hideAll() {
    $('.allBeastClass').hide();
}
function eraseTheDomForTheSakeofDuplicates() {
    $('.allBeastClass').remove();
}
$('select').on('change', () => {
    let currentlySelected = $('option:selected').val();
    hideAll();
    //@ts-ignore
    let showMe = $(`.${currentlySelected}`).show();
});
Beast.readJson = (myJSONsource) => {
    $.get(myJSONsource, 'json')
        .then(data => {
        data.forEach((item) => {
            console.log(item);
            console.clear();
            // @ts-ignore
            Beast.allBeasts.push((new Beast(item)));
            //@ts-ignore
            Beast.allBeastsNeverSorted.push((new Beast(item)));
            // this a unique set of the keyword names
            Beast.allBeastsUniqueNames.add(item.keyword.toLocaleLowerCase());
            console.log('what was it');
        });
    })
        .then(Beast.loadBeasts);
};
Beast.loadBeasts = () => {
    Beast.allBeasts.forEach(beast => {
        let toHtml = beast.toHtml();
        $('.image-container').append(toHtml);
    });
    Beast.appendTheGeneratedUniqueNamesToDropDown();
};
$('#firstPage, #secondPage').click(function () {
    console.log(this.id);
    if (this.id === 'firstPage') {
        console.log();
        Beast.allBeasts = [];
        Beast.allBeastsUniqueNames.clear();
        // hideAll();
        eraseTheDomForTheSakeofDuplicates();
        Beast.readJson(`data/\page-1.json`);
    }
    else if (this.id === 'secondPage') {
        // hideAll();
        Beast.allBeasts = [];
        Beast.allBeastsUniqueNames.clear();
        eraseTheDomForTheSakeofDuplicates();
        Beast.readJson(`data/\page-2.json`);
    }
});
// sort just just nums
let numSortReturnsNumberArr = (beasts) => {
    let numsSorted = [];
    let sorting = beasts.sort((aBeast, bBeast) => {
        return aBeast.horns - bBeast.horns;
    });
    sorting.forEach((beast, index) => {
        numsSorted[index] = beast.horns;
    });
    return numsSorted;
};
const numSortReturnsBeastArr = (unSortedBeasts) => {
    return unSortedBeasts.sort((a, b) => {
        return a.horns - b.horns;
    });
};
const sortByTitle = () => {
    let sortMe = [...Beast.allBeasts];
    return sortMe.sort((a, b) => {
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    });
};
// Beast.loadBeasts = () => {
//     Beast.allBeasts.forEach(beast => {
//         let toHtml = beast.toHtml();
//         $('.image-container').append(toHtml);
//     })
//     Beast.appendTheGeneratedUniqueNamesToDropDown();
// }
const andNowRenderTheSortedBeastsByTitle = () => {
    Beast.allBeasts = sortByTitle();
    eraseTheDomForTheSakeofDuplicates();
    Beast.loadBeasts();
};
const andNowRenderTheSortedBeastsByHorns = () => {
    let unsorted = [...Beast.allBeasts];
    let sortedBeasts = numSortReturnsBeastArr(Beast.allBeasts);
    Beast.allBeastsSortedByHorns = sortedBeasts;
    console.log(sortedBeasts);
    eraseTheDomForTheSakeofDuplicates();
    Beast.loadBeasts();
};
let didThatSortNums = () => {
    let nums = [];
    numSortReturnsBeastArr(Beast.allBeasts).forEach((beast) => {
        nums.push(beast.horns);
    });
    return nums;
};
$('#hornSort').on('click', () => {
    andNowRenderTheSortedBeastsByHorns();
});
$('#nameSort').click(() => {
    andNowRenderTheSortedBeastsByTitle();
});
console.log(didThatSortNums);
// steps to render the beasts according to horn count
let step1 = 'run a sort function that will return an Ibeast array sorted by horn nums, i dont see any reason i shouldnt then just set Beast.allBeasts to this new value, or maybe a new arr like Beast.allBeastsSortedByHorn would be more appropriate.';
let step2 = 'on click of a sortByHorns button, remove all the beasts from the dom using eraseTheDomForTheSakeofDuplicates';
let step3 = 'allBeasts is still active, i believe i can reuse the toHtml function already written thatll render them in order';
let alphaSort = (beasts) => {
    return beasts.sort((a, b) => {
        return a.title > b.title ? 1 : 0;
    });
};
// let executeFirstThenLog = (fun : INumSort, args : Ibeast[]) => {
//     let execucute = fun([...args]);
//     let output : number[] = [];
//     execucute.forEach((sorted, index)=>{
//         output[index] = sorted.horns;
//         console.log(sorted.horns);
//     })
//     return output;
// }
let allTheBeasts = Beast.allBeasts;
// let exececuted = executeFirstThenLog(numSortReturnsNumberArr, Beast.allBeasts);
$(() => {
    Beast.readJson('data/\page-1.json');
});
//# sourceMappingURL=app.js.map