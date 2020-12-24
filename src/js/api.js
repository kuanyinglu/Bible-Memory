let splitVerses = data => {
  let content = $(data.passages[0].replace(/<b/g, "</p><p><b").replace(/—/g, "—"));
  return content;
};

let pushToVerseData = (idStr, content) => {
  let verse = Number(idStr.slice(6, 9));
  let chapter = Number(idStr.slice(3, 6));
  return { verse: verse, chapter: chapter, content: content.trim() };
};

let removeEmpty = function (str) {
  return str.replace(/\r|\n|&nbsp;/g, "").trim();
};

let getVerseData = (_, element) => {
  let content = null;
  if (element.nodeType !== 3 && removeEmpty(element.textContent).length > 0) {
    let label = $(element).children('[id]');
    let idStr = null;
    if (label.length > 0 && label[0].localName === "b") {
      content = removeEmpty(element.textContent.replace(label[0].textContent, ""));
      idStr = label[0].id;
    } else if (label.length > 0) {
      content = removeEmpty(element.textContent);
      idStr = label[0].id;
    } else {
      content = removeEmpty(element.textContent);
      idStr = element.id;
    }
    return pushToVerseData(idStr, content);
  }
};

let groupVerses = (acc, cur, i) => {
  let found = false;
  acc.forEach(verse => {
    if (verse.chapter === cur.chapter && verse.verse === cur.verse) {
      verse.content = verse.content + " " + cur.content;
      found = true;
    }
  });
  if (!found) {
    acc.push(cur);
  }
  return acc;
};

export const getVerses = reference => {
  let encodedVerse = encodeURI(reference.toLowerCase());
  let promise = new Promise((resolve, reject) => {
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
          let verseData = rawVerses.map(getVerseData)
            .map((i, el) => ({ verse: el.verse, chapter: el.chapter, content: el.content }))
            .toArray()
            .reduce(groupVerses, [])
            .map((el, i) => {
              el.id = i;
              return el;
            });
          resolve(verseData);
        } else {
          alert("No verses are found");
          resolve();
        }
      },
      error: () => {
        alert("Cannot get verses.");
        resolve();
      }
    });
  });
  return promise;
};

export const getUserData = (path, desc) => {
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      url: path,
      headers: {
        "Authorization": "Token " + token
      },
      type: 'POST',
      dataType: 'json',
      processData: false,
      success: data => {
        if (data) {
          resolve(data);
        } else {
          alert("No " + desc + " fetched");
          resolve();
        }
      },
      error: () => {
        alert("Cannot get " + desc + ".");
        resolve();
      }
    });
  });
  return promise;
}


export const userDataAction = (data, path, desc) => {
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      url: path,
      headers: {
        "Authorization": "Token " + token
      },
      type: 'POST',
      dataType: 'json',
      processData: false,
      data: data,
      success: data => {
        if (data) {
          resolve(data);
        }
      },
      error: () => {
        alert("Action " + desc + " failed.");
        resolve();
      }
    });
  });
  return promise;
}