var interpretor = {};
interpretor.interpret = function(type, verseArray) {
  if (type === "json") {
    let result = [];
    verseArray.forEach(function(verse, id) {
      let ch = null;
      let v = null;
      if (verse.startsWith("\\\\")){
        verse = verse.slice(2);
        ch = Number(verse.slice(0, verse.indexOf("\\\\")));
        verse = verse.slice(verse.indexOf("\\\\") + 2);
      }
      verse = verse.slice(1);
      v = Number(verse.slice(0, verse.indexOf("\\")));
      verse = verse.slice(verse.indexOf("\\") + 1);
      result.push({ch: ch, v: v, verse: verse});
    });
    return result;
  }
};
