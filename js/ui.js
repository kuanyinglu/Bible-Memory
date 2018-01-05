var ui = {};
ui.openPractice = function(caller) {
  $('#accordion').accordion('open', 1);
  autosize($('textarea'));
  $('#answer').val(parser.fetchVersesFromReference(caller.textContent).join(" "));

  autosize.update($('textarea'));
};
