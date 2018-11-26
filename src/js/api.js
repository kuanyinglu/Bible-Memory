import { processFetchedVerses } from './redux/actions';
import store from "./redux/store";

let splitVerses = data => {
  let content = $(data.passages[0].replace(/<b/g, "</p><p><b").replace(/—/g, "—"));
  return content;
};

let pushToVerseData = (i, idStr, content) => {
  let verse = Number(idStr.slice(6, 9));
  let chapter = Number(idStr.slice(3, 6));
  return {id: i - 1, verse: verse, chapter: chapter, content: content.trim()};
};

let removeEmpty = function(str) {
  return str.replace(/\r|\n|&nbsp;/g, "").trim();
};

let getVerseData = (i, element) => {
  let content = null;
  if (element.nodeType !== 3 && removeEmpty(element.textContent).length > 0) {
    let label = $(element).children('[id]');
    if (label.length > 0 && label[0].localName === "b") {
      content = removeEmpty(element.textContent.replace(label[0].textContent, ""));
      return pushToVerseData(i, label[0].id, content);
    } else if (label.length > 0) {
      content = removeEmpty(element.textContent);
      return pushToVerseData(i, label[0].id, content);
    } else {
      content = removeEmpty(element.textContent);
      return pushToVerseData(i, element.id, content);
    }
  }
};

export const getVerses = reference => {
  let encodedVerse = encodeURI(reference.toLowerCase());
  $.ajax({
    url: "https://api.esv.org/v3/passage/html/?q=" + encodedVerse + "&include-passage-references=false&include-chapter-numbers=false&include-first-verse-numbers=false&include-verse-numbers=true&include-footnotes=false&include-footnote-body=false&include-headings=false&include-subheadings=false&include-surrounding-chapters-below=false&include-audio-link=false&include-short-copyright=false",
    headers: {
      "Authorization": "Token " + token
    },
    type: 'GET',
    dataType: 'json',
    processData: false,
    success: data => {
      if (data.passages && data.passages.length > 0) {
        let rawVerses = splitVerses(data);
        let verseData = rawVerses.map(getVerseData).toArray();
        store.dispatch(processFetchedVerses(verseData));
      } else {
        alert("No verses are found");
      }
    },
    error: () => {
      alert("Cannot get verses.");
    }
  });
};