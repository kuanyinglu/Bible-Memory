var app = {};
app.init = function() {
  if (typeof(jQuery) === "undefined" || typeof(jQuery().site) === "undefined" || typeof(verses) === "undefined" || typeof(api) === "undefined" || typeof(autosize) === "undefined" || typeof(settings) === "undefined" || typeof(token) === "undefined") {
    setTimeout(app.init, 1000);
  } else {
    $('#accordion').accordion();
    ui.renderVerseButtons();
    settings.init();

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
