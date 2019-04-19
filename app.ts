import { rejects } from "assert";

// import $ from 'jquery';
//reminder to check, check check, the compiled javascript for strings like a source...
//the second time i had a source string to the json that wasn't valid because of transpile. 

interface beastInterface {
    image_url: string;
    title: string;
    description: string;
    keyword: string;
    horns: number;
    pageJson?: number;
    toHtml(): string;
    appendToDOM() : void;  
}

class Containment {
    public allBeasts: beastInterface[] = [];
    public neverSorted: beastInterface[] = [];
    public uniqueNames: string[] = [];
    public firstPage: beastInterface[] = [];
    public secondPage: beastInterface[] = [];
}

let myContainer = new Containment();


enum jsonSource {
    json1 = './data/\page-1.json',
    json2 = './data/\page-2.json'
}

class Beast implements beastInterface {

    public image_url: string;
    public title: string;
    public description: string;
    public keyword: string;
    public horns: number;
    public pageJson?: number;

    constructor(
        public beastInput: beastInterface
    ) {
        this.image_url = beastInput.image_url;
        this.title = beastInput.title;
        this.description = beastInput.description;
        this.keyword = beastInput.keyword;
        this.horns = beastInput.horns;
    }

    static readJson(input: jsonSource | string = jsonSource.json1) {
        jsonPromise(input);
    }

    toHtml() {
        let $html = $('#beastTemplate').html();
        let compiled = Handlebars.compile($html);
        console.log(this);
        return compiled(this);
    }
    appendToDOM() {
        $('.image-container').append(this.toHtml())
    }
}

// this promise is specifically for loading the JSON, when it's resolved it'll call the next
// promise readyToAppend
let jsonPromise = function(whichJson : string) {
    return new Promise((resolve, reject)=>{
        $.get(whichJson, 'json')
        .then((results)=>{
           let output : beastInterface[] = [];
            results.forEach((result : beastInterface)=>{
            output.push(new Beast(result));
            myContainer.allBeasts.push(new Beast(result))
           })
            resolve(output);
            readyToAppend();
        })
    })
  }

  // i broke these functions out into explicit promises, for a few reasons... to practice explicit promises,
  // and even though more verbose, they make sense to me and seem to allow for fine grain control..
  // this style of explicit promises came from a techsith video which is about the best example / tutorial / teaching i've experienced on promises...
  // He's great and able to break them down to so nicely. 
 let readyToAppend = function() {
     return new Promise((resolve, reject)=>{
         if (myContainer.allBeasts.length == 20){
             console.log(myContainer.allBeasts.length);
            resolve('hitting');
         }
     })
     .then((result)=>{
        console.log(result, 'line 94');
        myContainer.allBeasts.forEach((beast)=> {
            beast.appendToDOM();
        })
     })
 }

 

let aBeast;
$(() => {
    Beast.readJson(jsonSource.json1); //?
});


console.log(myContainer.allBeasts)


