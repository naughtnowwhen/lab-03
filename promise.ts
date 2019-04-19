export let jsonPromise = function(whichJson : string) {
  return new Promise((resolve, reject)=>{
      $.get(whichJson, 'json')
      .then((results)=>{
         let output : beastInterface[] = [];
          results.forEach((result : beastInterface)=>{
          output.push(new Beast(result));
          myContainer.allBeasts.push(new Beast(result))
         })
         aBeast = myContainer.allBeasts[0];
          resolve(output);
      })
  })
}

module.exports = {jsonPromise}