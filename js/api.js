var api = {};
api.getVerse = function(reference) {
  let encodedVerse = encodeURI(reference.toLowerCase());
  $.ajax({
    url: "https://api.esv.org/v3/passage/html/?q=" + encodedVerse + "&include-passage-references=false&include-chapter-numbers=false&include-first-verse-numbers=false&include-verse-numbers=true&include-footnotes=false&include-footnote-body=false&include-headings=false&include-subheadings=false&include-surrounding-chapters-below=false&include-audio-link=false&include-short-copyright=false",
    headers: {
      "Authorization": "Token " + token
    },
    type: 'GET',
    dataType: 'json',
    processData: false,
    success: function (data) {
      let success = api.processData(data);
      if (success) {
        ui.openPractice(data.canonical);
      }
    },
    error: function(){
      alert("Cannot get verses.");
    }
  });
};
api.processData = function(data) {
  if (data.passages && data.passages.length > 0) {
    let content = $(data.passages[0].replace(/<b/g, "</p><p><b").replace(/—/g, " — "));
    verseData = [];
    content.each(api.getVerseData);
    return true;
  } else {
    alert("No verses are found");
    return false;
  }
};
api.getVerseData = function(index, element) {
  let content = null;
  if (element.nodeType !== 3 && api.removeEmpty(element.textContent).length > 0) {
    let label = $(element).children('[id]');
    if (label.length > 0 && label[0].localName === "b") {
      content = api.removeEmpty(element.textContent.replace(label[0].textContent, ""));
      api.pushToVerseData(label[0].id, content);
    } else if (label.length > 0) {
      content = api.removeEmpty(element.textContent);
      api.pushToVerseData(label[0].id, content);
    } else {
      content = api.removeEmpty(element.textContent);
      api.pushToVerseData(element.id, content);
    }
  }
};
api.pushToVerseData = function(idStr, content) {
  let verse = Number(idStr.slice(6, 9));
  let chapter = Number(idStr.slice(3, 6));
  let existingData = verseData.filter(function(v) {return v.verse === verse && v.chapter === chapter});
  if (existingData.length > 0) {
    existingData[0].content = existingData[0].content + " " + content.trim();
  } else {
    verseData.push({verse: verse, chapter: chapter, content: content.trim()});
  }
};
api.removeEmpty = function(str) {
  return str.replace(/\r|\n|&nbsp;/g, "").trim();
};
