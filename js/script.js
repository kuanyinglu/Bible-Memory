var app = {};
app.init = function() {
    if (typeof(jQuery) === "undefined" || typeof(bible) === "undefined" || typeof(jQuery().site) === "undefined" || typeof(verses) === "undefined" || typeof(parser) === "undefined" || typeof(autosize) === "undefined") {
        setTimeout(app.init, 1000);
    } else {
        $('.ui.accordion').accordion();
        app.test();
        console.log("Hello World!");
    }
};
app.incrementArray = function(start, end) {
    let length = end - start + 1;
    if (length > 0) {
        return (new Array(length)).fill(0).map(function(a, index) {return start + index});
    } else {
        return [];
    }
};
//Tests
app.test = function(){
    let testArray = [];
    testArray.push(parser.fetchVerses("Matthew", 26, 74, 25, 1).length === 0);
    testArray.push(parser.fetchVerses("Matthew", 26, 74, 27, 3).length === 5);
    testArray.push(parser.fetchVerses("Matthew", 26, 74).length === 88);
    testArray.push(parser.fetchVerses("Matthew", 0, 1).length === 0);
    testArray.push(parser.fetchVerses("Matthew", 1, 0).length === 0);
    testArray.push(parser.fetchVerses("Matthew", 29, 1).length === 0);
    testArray.push(parser.fetchVerses("Matthew", 28, 21).length === 0);
    testArray.push(parser.fetchVerses("NoBook", 1, 1).length === 0);
    testArray.push(parser.fetchVersesFromReference("Obadiah").length === 21);
    testArray.push(parser.fetchVersesFromReference("1 John").length === 105);
    testArray.push(parser.fetchVersesFromReference("1 John 1").length === 10);
    testArray.push(parser.fetchVersesFromReference("1 John 6").length === 0);
    testArray.push(parser.fetchVersesFromReference("1 John 1:10").length === 1);
    testArray.push(parser.fetchVersesFromReference("1 John 1-2").length === 39);
    testArray.push(parser.fetchVersesFromReference("1 John 1:1-2").length === 2);
    testArray.push(parser.fetchVersesFromReference("1 John 1-2:1").length === 11);
    testArray.push(parser.fetchVersesFromReference("1 John 1:1-2:1").length === 11);
    if (testArray.some(function(test) {return !test})) {
        console.log("Test failed");
    }
};
app.init();
app.speak = function() {
    console.log("YAY");
};
