var $, fill, log;

$ = require('jquery');

(fill = function(item) {
  return $('.tagline').append("" + item);
})('The most creative minds in Art');

fill;

(log = function() {
  return console.log('Testing coffee');
})();
