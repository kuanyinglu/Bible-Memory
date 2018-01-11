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
ui.openPractice = function(reference) {
  $('#accordion').accordion('open', 2);
  $('#verse-title').empty();
  $('#main-grid').children('[data-id]').remove();
  $('#verse-title').append(reference);
  $('#menu').show();
  verseData.forEach(function(verse, id) {
    ui.generateVerse(id, verse.chapter, verse.verse, ui.getFirstWord(verse.content));
  });
  ui.generateInput(0);
};
ui.getFirstWord = function(text) {
  let firstSpace = text.indexOf(" ");
  if (firstSpace !== -1) {
    return text.slice(0, firstSpace).replace(/\"/g, '&quot;');
  } else {
    return text.replace(/\"/g, '\\\"');
  }
};
ui.inputChange = function(input) {
  let seq = Number(input.dataset.id);
  input.value = input.value.replace('  ', ' ');
  let val = input.value.trim();
  ui.progressUpdate(seq, val);
};
ui.progressUpdate = function(id, value) {
  let data = verseData[id].content;
  let temp = ui.getComparedWords(id, value, data);
  let word = temp[0];
  let compareWord = temp[1];
  let successIndex = temp[2];
  let failIndex = temp[3];

  if(ui.compareWord(word, compareWord)) {
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

  if (ui.inputHasFuture(word, compareWord) && temp[5]) {
    $('textarea[data-id="' + id + '"]').closest(".field").removeClass('error');
  } else {
    $('textarea[data-id="' + id + '"]').closest(".field").addClass('error');
  }
};
ui.getComparedWords = function(id, value, data) {
  let lastWordStart = value.lastIndexOf(" ");
  let successIndex = 0;
  let failIndex = -1;
  let word = "";
  let compareWord = "";
  let nextWord = "";
  let comparingLatest = true;
  if (lastWordStart !== -1) {
    word = value.slice(lastWordStart + 1);
    let earlierWords = value.slice(0, lastWordStart);
    let matchUntilSpace = data.indexOf(earlierWords) !== -1;
    let lastWordIsComplete = data.length > earlierWords.length && data[earlierWords.length] === " ";
    if(matchUntilSpace && lastWordIsComplete) {
      let remainingVerse = "";
      if (data.length > earlierWords.length) {
        remainingVerse = data.slice(earlierWords.length + 1);
      } else {
        remainingVerse = data;
      }
      let dataNextSpace = remainingVerse.indexOf(" ");
      if (dataNextSpace !== -1) {//Found the word to compare
        compareWord = remainingVerse.slice(0, dataNextSpace);
        failIndex = lastWordStart;
        successIndex = lastWordStart + compareWord.length + 1;
        nextWord = ui.getNextWord(remainingVerse.slice(dataNextSpace + 1));
      } else {//This is the last word
        compareWord = remainingVerse;
        successIndex = data.length;
        failIndex = lastWordStart;
        nextWord = "";
      }
    } else {//Something didn't match, go back a word
      let temp = ui.getComparedWords(id, value.slice(0, lastWordStart), data);
      word = temp[0];
      compareWord = temp[1];
      successIndex = temp[2];
      failIndex = temp[3];
      nextWord = temp[4];
      comparingLatest = false;
    }
  } else {//This is the first word
    word = value;
    let remainingVerse = data;
    let dataNextSpace = remainingVerse.indexOf(" ");
    if (dataNextSpace !== -1) {//Found the word to compare
      compareWord = remainingVerse.slice(0, dataNextSpace);
      successIndex = compareWord.length;
      nextWord = ui.getNextWord(remainingVerse.slice(dataNextSpace + 1));
    } else {//This is the last word
      compareWord = remainingVerse;
      successIndex = remainingVerse.length;
      nextWord = "";
    }
  }
  return [word, compareWord, successIndex, failIndex, nextWord, comparingLatest];
};
ui.getNextWord = function(verse) {
  let nextWord = "";
  let splitPoint = verse.indexOf(" ");
  if (splitPoint !== -1) {
    nextWord = verse.slice(0, splitPoint);
  }
  return nextWord;
};
ui.compareWord = function(w, c) {
  return w.toLowerCase().replace(/\W/g, '') === c.toLowerCase().replace(/\W/g, '');
};
ui.inputHasFuture = function(w, c) {
  return c.toLowerCase().replace(/[^\w\s]/g, '').indexOf(w.toLowerCase().replace(/\W/g, '')) === 0;
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
ui.generateVerse = function(id, ch, v, firstWord) {
  let grid = $('#main-grid');
  let htmlString = '<div data-id="' + id + '" class="two column row" data-content="' + firstWord + '"><div data-id="' + id + '" class="verse-input column"></div><div class="column"><div class="verse-container"><p class="verse-paragraph">';
  htmlString = htmlString + '<span class="verse">' + ch + ":" + v + '</span><span data-id="' + id + '" class="done verse-show"></span><span data-id="' + id + '" class="not-done verse-hidden">' + verseData[id].content + '</span><div onclick="ui.redoFromVerse(' + (id + 1) + ')"><button class="ui labeled icon button verse-button"><i class="caret right icon"></i>Start from this verse</button></div></p>'
  grid.append(htmlString);
    $('div.row[data-id="' + id + '"]').popup({on: "manual"});
};
ui.redoFromVerse = function(num) {
  let id = num - 1;
  $("textarea").closest('.ui.fluid.form').remove();
  verseData.slice(id).forEach(function(verse, index) {
    $('div[data-id="' +  (id + index) + '"]').remove();
    ui.generateVerse(id + index, verse.chapter, verse.verse, ui.getFirstWord(verse.content));
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
