var app = {};
app.init = function() {
    if (typeof(jQuery) === "undefined" || typeof(_) === "undefined" || typeof(Popper) === "undefined" || typeof(bible) === "undefined" || typeof(jQuery().affix) === "undefined") {
        console.log("meh");
        setTimeout(app.init, 1000);
    } else {
        console.log("Hello World!");
    }
};
app.init();
