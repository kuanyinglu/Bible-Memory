var app = {};
app.init = function() {
    if (typeof(jQuery) === "undefined" || typeof(_) === "undefined" || typeof(Popper) === "undefined" || typeof(bible) === "undefined" || typeof(jQuery().collapse) === "undefined" || typeof(verses) === "undefined") {
        console.log("meh");
        setTimeout(app.init, 1000);
    } else {
        console.log("Hello World!");
    }
};
app.incrementArray = function(start, end) {
    let length = end - start + 1;
    return (new Array(length)).fill(0).map(function(a, index) {return start + index});
};
app.init();
var parser = {};
parser.parseVerse = function(verseStr) {
    try {
        let splitPoint = verseStr.lastIndexOf(" ");
        let book = verseStr.splice(0, splitPoint);
        let passage = verseStr.splice(splitPoint);
        if (passage.length === 0) {//the whole book
            return parser.fetchVerses(book, 1, 1);
        } else {
            let dashPoint = passage.lastIndexOf("-");

            let start = passage.splice(0, dashPoint);
            let end = passage.splice(dashPoint);
            let startSeparatePoint = start.indexOf(":");
            if (startSeparatePoint !== -1) {
                let
            } else {

            }
        }
    } catch(err) {
        console.log("Error has occurred in parsing");
        return "";
    }
};
parser.getVerse = function(book, ch, v) {
    if (bible[book] && bible[book][ch - 1] && bible[book][ch - 1][v - 1]) {
        let verse = "\\" + v + "\\" + bible[book][ch - 1][v - 1]
        if (v === 1) {
            verse = "\\\\" + ch + "\\\\" + verse;
        }
        return verse;
    } else {
        return "";
    }
};
parser.fetchVerses = function(book, startCh, startV, endCh, endV)
{
    let fetchedVerses = [];
    if (bible[book]) {
        let lastCh = endCh;
        let lastV = endV
        if (!lastCh) {
            lastCh = bible[book].length;
        }
        if (!lastV) {
            lastV = bible[book][lastCh - 1].length;
        }
        if (startCh !== lastCh) {
            fetchedVerses = fetchedVerses.concat(app.incrementArray(startV, bible[book][startCh - 1].length).map(function(n){return parser.getVerse(book, startCh, n)}));
            if (lastCh > startCh + 1) {
                app.incrementArray(startCh, lastCh).map(function(c){fetchedVerses = fetchedVerses.concat(app.incrementArray(1, bible[book][c].length).map(function(n){return parser.getVerse(book, c, n)}))});
            }
            fetchedVerses = fetchedVerses.concat(app.incrementArray(1, lastV).map(function(n){return parser.getVerse(book, lastCh, n)}));
        } else {
            fetchedVerses = fetchedVerses.concat(app.incrementArray(startV, lastV).map(function(n){return parser.getVerse(book, startCh, n)}));
        }
    }
    return fetchedVerses;
};
