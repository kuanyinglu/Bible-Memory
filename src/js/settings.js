var settings = {
    practiceMode: false
};
settings.init = function() {
  Object.keys(settings).forEach(function(option) {
    $('[data-option="' + option + '"] > input').prop('checked', settings[option]);
    settings.effect(option);
  });
};
settings.toggle = function(input) {
  if (input) {
    let option = input.dataset.option;
    if (typeof(settings[option]) !== "undefined") {
      settings[option] = !settings[option];
      settings.effect(option);
    }
  }
};
settings.effect = function(option) {
  if (option === "practiceMode") {
    if (settings.practiceMode) {
      $('#main-grid').addClass('practice');
    } else {
      $('#main-grid').removeClass('practice');
    }
  }
};
