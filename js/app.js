class Containment {
    constructor() {
        this.allBeasts = [];
        this.neverSorted = [];
        this.uniqueNames = [];
        this.firstPage = [];
        this.secondPage = [];
    }
}
let myContainer = new Containment();
var jsonSource;
(function (jsonSource) {
    jsonSource["json1"] = "./data/page-1.json";
    jsonSource["json2"] = "./data/page-2.json";
})(jsonSource || (jsonSource = {}));
class Beast {
    constructor(beastInput) {
        this.beastInput = beastInput;
        this.image_url = beastInput.image_url;
        this.title = beastInput.title;
        this.description = beastInput.description;
        this.keyword = beastInput.keyword;
        this.horns = beastInput.horns;
    }
    static readJson(input = jsonSource.json1) {
        jsonPromise(input);
    }
    toHtml() {
        let $html = $('#beastTemplate').html();
        let compiled = Handlebars.compile($html);
        console.log(this);
        return compiled(this);
    }
    appendToDOM() {
        $('.image-container').append(this.toHtml());
    }
}
// this promise is specifically for loading the JSON, when it's resolved it'll call the next
// promise readyToAppend
let jsonPromise = function (whichJson) {
    return new Promise((resolve, reject) => {
        $.get(whichJson, 'json')
            .then((results) => {
            let output = [];
            results.forEach((result) => {
                output.push(new Beast(result));
                myContainer.allBeasts.push(new Beast(result));
            });
            resolve(output);
            readyToAppend();
        });
    });
};
// i broke these functions out into explicit promises, for a few reasons... to practice explicit promises,
// and even though more verbose, they make sense to me and seem to allow for fine grain control..
// this style of explicit promises came from a techsith video which is about the best example / tutorial / teaching i've experienced on promises...
// He's great and able to break them down to so nicely. 
let readyToAppend = function () {
    return new Promise((resolve, reject) => {
        if (myContainer.allBeasts.length == 20) {
            console.log(myContainer.allBeasts.length);
            resolve('hitting');
        }
    })
        .then((result) => {
        console.log(result, 'line 94');
        myContainer.allBeasts.forEach((beast) => {
            beast.appendToDOM();
        });
    });
};
let aBeast;
$(() => {
    Beast.readJson(jsonSource.json1); //?
});
console.log(myContainer.allBeasts);
//# sourceMappingURL=app.js.map