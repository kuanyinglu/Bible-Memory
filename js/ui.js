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
        htmlString = htmlString + "<div class='column'><button class='ui right labeled icon button' onclick='ui.openPractice(this)'><i class='right arrow icon'></i>" + verse + "</button></div>";
      });
      htmlString = htmlString + "</div>";
    });
    target.append(htmlString);
};
ui.openPractice = function(caller) {
  $('#accordion').accordion('open', 1);
  $('#verse-title').empty();
  $('#main-grid').children('[data-id]').remove();
  $('#verse-title').append(caller.textContent);
  verseData = interpretor.interpret("json", parser.fetchVersesFromReference(caller.textContent));
  verseData.forEach(function(verse, id) {
    ui.generateVerse(id, verse.ch, verse.v);
  });
  ui.generateInput(0);
  $('p.not-done[data-id="0"]').append(verseData[0].verse);
};
ui.inputChange = function(input) {
  let seq = Number(input.dataset.id);
  let val = input.value.trim();
  ui.progress(seq, val);
};
ui.progress = function(id, value) {
  let data = verseData[id].verse;
  let temp = ui.getComparedWords(id, value, data);
  let word = temp[0];
  let compareWord = temp[1];
  let successIndex = temp[2];
  let failIndex = temp[3];
  if(ui.compareWord(word, compareWord)) {
    if ($('textarea[data-id="' + id + '"]')[0].value.trim() !== data.slice(0, successIndex)) {
      $('textarea[data-id="' + id + '"]').val(data.slice(0, successIndex));
    }
    ui.progressUpdate(id, successIndex, data);
  } else {
    ui.progressUpdate(id, failIndex, data);
  }
};
ui.getComparedWords = function(id, value, data) {
  let lastWordStart = value.lastIndexOf(" ");
  let successIndex = 0;
  let failIndex = 0;
  let word = "";
  let compareWord = "";
  if (lastWordStart !== -1) {
    word = value.slice(lastWordStart + 1);
    if(data.indexOf(value.slice(0, lastWordStart)) !== -1) {
      let remainingVerse = data.slice(lastWordStart + 1);
      let dataNextSpace = remainingVerse.indexOf(" ");
      if (dataNextSpace !== -1) {//Found the word to compare
        compareWord = remainingVerse.slice(0, dataNextSpace);
        failIndex = lastWordStart;
        successIndex = lastWordStart + compareWord.length + 1;
      } else {//This is the last word
        compareWord = remainingVerse;
        successIndex = data.length;
        failIndex = lastWordStart;
      }
    } else {//Something didn't match, go back a word
      let temp = ui.getComparedWords(id, value.slice(0, lastWordStart), data);
      word = temp[0];
      compareWord = temp[1];
      successIndex = temp[2];
      failIndex = temp[3];
    }
  } else {//This is the first word
    word = value;
    let remainingVerse = data;
    let dataNextSpace = remainingVerse.indexOf(" ");
    if (dataNextSpace !== -1) {//Found the word to compare
      compareWord = remainingVerse.slice(0, dataNextSpace);
      successIndex = compareWord.length;
    } else {//This is the last word
      compareWord = remainingVerse;
      successIndex = remainingVerse.length;
    }
  }
  return [word, compareWord, successIndex, failIndex];
};
ui.compareWord = function(w, c) {
  return w.toLowerCase().replace(/\W/g, '') === c.toLowerCase().replace(/\W/g, '');
};
ui.progressUpdate = function(id, index, data) {
  if ($('p.done[data-id="' + id + '"]')[0].dataset.lastIndex !== index) {
    if (index > 0) {
      $('p.done[data-id="' + id + '"]').show();
      $('p[data-id="' + id + '"]').empty();
      if (index === data.length) {
        $('p.done[data-id="' + id + '"]').append(data);
        //Next verse
         $("textarea[data-id='" + id + "']").remove();
         ui.generateInput(id + 1);
      } else {
        $('p.done[data-id="' + id + '"]').append(data.slice(0, index));
        $('p.not-done[data-id="' + id + '"]').append(data.slice(index + 1));
      }
    } else {
      $('p.done[data-id="' + id + '"]').hide();
      $('p[data-id="' + id + '"]').empty();
      $('p.not-done[data-id="' + id + '"]').append(data);
    }
    $('p.done[data-id="' + id + '"]')[0].dataset.lastIndex = index;
  }
};
ui.generateInput = function(id) {
  let row = $('.verse-input.column[data-id="' + id + '"]');
  if (row.length !== 0) {
    row.prepend('<div class="ui fluid form"><textarea data-id="' + id + '" oninput="ui.inputChange(this)"></textarea></div>');
    $('html, body').animate({
        scrollTop: $("textarea[data-id='" + id + "']").offset().top - (window.innerHeight/2)
    }, 500);
    autosize($('textarea'));
    $('textarea[data-id="' + id + '"]').focus();
  }
};
ui.generateVerse = function(id, ch, v) {
  let grid = $('#main-grid');
  let htmlString = '<div data-id="' + id + '" class="two column row"><div data-id="' + id + '" class="verse-input column"></div><div class="column"><div>';
  if (ch) {
    htmlString = htmlString + '<h3 class="inline">' + ch + '</h3>';
  }
  htmlString = htmlString + '<sup class="inline">' + v + '</sup><p data-id="' + id + '" class="done inline verse-show"></p><p data-id="' + id + '" class="not-done inline verse-hidden">' + verseData[id].verse + '</p>'
  grid.append(htmlString);
};
