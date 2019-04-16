"use strict";
let nums = [12, 123, 542, 8, 9, 123, 45, 1112, 12345, 1453124];
const sortNumbersByLength = (arr) => {
    arr.sort((a, b) => (a.toString().length > b.toString().length ? 1 : 0));
    return arr;
};
sortNumbersByLength(nums); //?
//# sourceMappingURL=try.js.map