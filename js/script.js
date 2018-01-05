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
    if (length > 0) {
        return (new Array(length)).fill(0).map(function(a, index) {return start + index});
    } else {
        return [];
    }
};
app.init();

var parser = {};
parser.fetchVersesFromReference = function(verseStr) {
    try {
        let fetchedVerses = [];
        let splitPoint = verseStr.lastIndexOf(" ");
        if (splitPoint === -1 || splitPoint === 1) {//the whole book
            fetchedVerses = parser.fetchVerses(verseStr, 1, 1);
        } else {
            let book = verseStr.slice(0, splitPoint);
            let passage = verseStr.slice(splitPoint + 1);
            let dashPoint = passage.indexOf("-");
            if (dashPoint === -1) {//1 verse or 1 chapter
                let colonPoint = passage.indexOf(":");
                if (colonPoint === -1) {//1 chapter
                    fetchedVerses = parser.fetchVerses(book, Number(passage), 1, Number(passage));
                } else {//1 verse
                    let ch = Number(passage.slice(0, colonPoint));
                    let v = Number(passage.slice(colonPoint + 1));
                    fetchedVerses = parser.fetchVerses(book, ch, v, ch, v);
                }
            } else {
                let start = passage.slice(0, dashPoint);
                let startCh = null;
                let startV = null;
                let end = passage.slice(dashPoint + 1);
                let endCh = null;
                let endV = null;
                let startColonPoint = start.indexOf(":");
                if (startColonPoint === -1) {
                    startCh = Number(start);
                    startV = 1;
                } else {
                    startCh = Number(start.slice(0, startColonPoint));
                    startV = Number(start.slice(startColonPoint + 1));
                }
                let endColonPoint = end.indexOf(":");
                if (endColonPoint === -1) {
                    if (startColonPoint === -1) {
                        endCh = Number(end);
                    } else {
                        endCh = startCh;
                        endV = Number(end);
                    }
                } else {
                    endCh = Number(end.slice(0, endColonPoint));
                    endV = Number(end.slice(endColonPoint + 1));
                }
                fetchedVerses = parser.fetchVerses(book, startCh, startV, endCh, endV);
            }
        }
        return fetchedVerses;
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
        console.log("None existant verses were attempted to be read");
        return "";
    }
};
parser.fetchVerses = function(book, startCh, startV, endCh, endV)
{
    let fetchedVerses = [];
    if (bible[book] && startCh > 0 && startCh <= bible[book].length && startV > 0 && startV <= bible[book][startCh - 1].length) {
        let lastCh = endCh;
        let lastV = endV
        if (!lastCh) {
            lastCh = bible[book].length;
        }
        if (!lastV) {
            lastV = bible[book][lastCh - 1].length;
        }
        if (lastCh > startCh) {
            fetchedVerses = fetchedVerses.concat(app.incrementArray(startV, bible[book][startCh - 1].length).map(function(n){return parser.getVerse(book, startCh, n)}));//First chapter
            if (lastCh > startCh + 1) {
                app.incrementArray(startCh + 1, lastCh - 1).map(function(c){fetchedVerses = fetchedVerses.concat(app.incrementArray(1, bible[book][c - 1].length).map(function(n){return parser.getVerse(book, c, n)}))});//Middle chapters
            }
            fetchedVerses = fetchedVerses.concat(app.incrementArray(1, lastV).map(function(n){return parser.getVerse(book, lastCh, n)}));//Last chapter
        } else if (startCh === lastCh) {
            fetchedVerses = fetchedVerses.concat(app.incrementArray(startV, lastV).map(function(n){return parser.getVerse(book, startCh, n)}));
        }
    }
    return fetchedVerses;
};
//Tests
(function(){
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
})();
