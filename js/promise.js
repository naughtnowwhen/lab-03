export let jsonPromise = function (whichJson) {
    return new Promise((resolve, reject) => {
        $.get(whichJson, 'json')
            .then((results) => {
            let output = [];
            results.forEach((result) => {
                output.push(new Beast(result));
                myContainer.allBeasts.push(new Beast(result));
            });
            aBeast = myContainer.allBeasts[0];
            resolve(output);
        });
    });
};
module.exports = { jsonPromise };
//# sourceMappingURL=promise.js.map