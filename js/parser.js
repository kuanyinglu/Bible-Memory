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
