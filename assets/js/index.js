var anime = require('anime.min.js');
document.getElementById("test").innerHTML = "FAKE";

anime({
  targets: 'h1',
  translateX: 250,
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 800
});