var ui = {};
ui.openPractice = function(caller) {
  $('#accordion').accordion('open', 1);
  autosize($('textarea'));
  $('#book-title').empty();
  $('#book-title').append(parser.getBookName(caller.textContent));
  $('#answer').val(parser.fetchVersesFromReference(caller.textContent).join(" "));
};
ui.renderVerseButtons = function() {
    let target = $('#verses-grid');
    let htmlString = "";
    let verseGroups = verses.reduce(function(acc, curr, index) {
        if (index % 5 === 0) {
            acc.push([]);
        }
        acc[acc.length - 1].push(curr);
        return acc;
    }, []);
    verseGroups.forEach(function(group) {
      htmlString = htmlString + "<div class='five column row'>";
      group.forEach(function(verse) {
        htmlString = htmlString + "<div class='column'><button class='ui right labeled icon button' onclick='ui.openPractice(this)'><i class='right arrow icon'></i>" + verse + "</button></div>";
      });
      htmlString = htmlString + "</div>";
    });
    target.append(htmlString);
};
