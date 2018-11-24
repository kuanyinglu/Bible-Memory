import autosize from 'autosize';
var ui = {};
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
        htmlString = htmlString + "<div class='column'><button class='ui right labeled icon button' onclick='api.getVerse(this.textContent)'><i class='right arrow icon'></i>" + verse + "</button></div>";
      });
      htmlString = htmlString + "</div>";
    });
    target.append(htmlString);
};
ui.practiceBooks = function() {
    verseData = [{verse: "", chapter: "The Old Testament", content: "Genesis, Exodus, Leviticus, Numbers, Deuteronomy, Joshua, Judges, Ruth, 1 Samuel, 2 Samuel, 1 Kings, 2 Kings, 1 Chronicles, 2 Chronicles, Ezra, Nehemiah, Esther, Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon, Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi"}, {verse: "", chapter: "The New Testament", content: "Matthew, Mark, Luke, John, Acts, Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 Thessalonians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus, Philemon, Hebrews, James, 1 Peter, 2 Peter, 1 John, 2 John, 3 John, Jude, Revelation"}];
    ui.openPractice("Books of The Bible");
};
ui.openPractice = function(reference) {
  $('#accordion').accordion('open', 2);
  $('#verse-title').empty();
  $('#main-grid').children('[data-id]').remove();
  $('#verse-title').append(reference);
  $('#menu').show();
  verseData.forEach(function(verse, id) {
    ui.generateVerse(id, verse.chapter, verse.verse, parser.getFirstWord(verse.content));
  });
  ui.generateInput(0);
};
ui.mainUiUpdate = function(id, index, data) {
  let doneVerse = $('span.done[data-id="' + id + '"]');
  let notDoneVerse = $('span.not-done[data-id="' + id + '"]');
  if (doneVerse[0].dataset.lastIndex !== index) {
    doneVerse.text('');
    notDoneVerse.text('');
    if (index === data.length) {
      doneVerse.append(data);
      //Next verse
      $('textarea[data-id="' + id + '"]').closest('.ui.fluid.form').remove();
      ui.generateInput(id + 1);
      $('div.row[data-id="' + id + '"]').popup('destroy');
    } else {
      doneVerse.append(data.slice(0, Math.max(index, 0)));
      notDoneVerse.append(data.slice(index + 1));
    }
  } else {
    doneVerse.text('');
    notDoneVerse.text('');
    notDoneVerse.append(data);
  }
  doneVerse[0].dataset.lastIndex = index;
};
ui.generateVerse = function(id, ch, v, firstWord) {
  let grid = $('#main-grid');
  let htmlString = '<div data-id="' + id + '" class="two column row" data-content="' + firstWord + '"><div data-id="' + id + '" class="verse-input column"></div><div class="column"><div class="verse-container"><p class="verse-paragraph">';
  htmlString = htmlString + '<span class="verse">' + ch + ":" + v + '</span><span data-id="' + id + '" class="done verse-show"></span><span data-id="' + id + '" class="not-done verse-hidden">' + verseData[id].content + '</span><div onclick="ui.redoFromVerse(' + (id + 1) + ')"><button class="ui labeled icon button verse-button"><i class="caret right icon"></i>Start from here</button></div></p>'
  grid.append(htmlString);
  $('div.row[data-id="' + id + '"]').popup({on: "manual"});
};
ui.redoFromVerse = function(num) {
  let id = num - 1;
  $("textarea").closest('.ui.fluid.form').remove();
  verseData.slice(id).forEach(function(verse, index) {
    $('div[data-id="' +  (id + index) + '"]').remove();
    ui.generateVerse(id + index, verse.chapter, verse.verse, parser.getFirstWord(verse.content));
  });
  ui.generateInput(id);
};
ui.peek = function(e, input, show) {
  let id = input.dataset.id;
  if (e.key === "Control") {
    if (show) {
      $('div.row[data-id="' + id + '"]').popup('show');
    } else {
      $('div.row[data-id="' + id + '"]').popup('hide');
    }
  }
};
ui.generateInput = function(id) {
  let row = $('.verse-input.column[data-id="' + id + '"]');
  if (row.length !== 0) {
    row.prepend('<div class="ui fluid form"><div class="field"><textarea data-id="' + id + '" oninput="ui.inputChange(this)" onkeydown="ui.peek(event, this, true)" onkeyup="ui.peek(event, this, false)"></textarea></div></div>');
    $('html, body').animate({
        scrollTop: $("textarea[data-id='" + id + "']").offset().top - (window.innerHeight/2)
    }, 500);
    autosize($('textarea'));
    $('textarea[data-id="' + id + '"]').focus();
  }
};
ui.inputChange = function(input) {
  let seq = Number(input.dataset.id);
  input.value = input.value.replace('  ', ' ');
  if (input.value.length === 1 && input.value === " ") {
      input.value = "";
  }
  let val = input.value;
  ui.progressUpdate(seq, val);
};
ui.progressUpdate = function(id, value) {
  let data = verseData[id].content;
  let temp = parser.getComparedWords(id, value, data);
  let word = temp[0];
  let compareWord = temp[1];
  let successIndex = temp[2];
  let failIndex = temp[3];

  if(parser.compareWord(word, compareWord)) {
    //Fix punctuation, capitalizations etc
    if ($('textarea[data-id="' + id + '"]')[0].value.trim() !== data.slice(0, successIndex)) {
      $('textarea[data-id="' + id + '"]').val(data.slice(0, successIndex));
    }
    ui.mainUiUpdate(id, successIndex, data);
    $('div[data-id="' + id + '"]')[0].dataset.content = temp[4];
  } else {
    ui.mainUiUpdate(id, failIndex, data);
    $('div[data-id="' + id + '"]')[0].dataset.content = compareWord;
  }

  if (parser.inputHasFuture(word, compareWord) && temp[5]) {
    $('textarea[data-id="' + id + '"]').closest(".field").removeClass('error');
  } else {
    $('textarea[data-id="' + id + '"]').closest(".field").addClass('error');
  }
};