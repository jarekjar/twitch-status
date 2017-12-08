var template = [
  '<div class="container">',
  '<div class="row text-center">',
  '<div class="border col-md-8 col-centered">',
  '<a href="{{url}}" target="_blank"><img src="{{logo}}">',
  '<h3 class="title">{{title}}</h3>',
  '<h3 class="playing">{{game}}</h3>',
  '<h3 class="data">{{info}}</h3></a>',
  "</div>",
  "</div>",
  "</div>"
].join("\n");

var addToDom = [];
var channelName = "";
var channels = [
  "freecodecamp",
  "jaredofguitar",
  "summit1g",
  "h3h3productions",
  "minikerr"
];
$(document).ready(function() {
  console.log("Booted Up!");
  getChannelStatus();
});

var getChannelStatus = function() {
  for (var i = 0; i < channels.length; i++) {
    channelName = channels[i];
    $.getJSON(
      "https://wind-bow.gomix.me/twitch-api/channels/" +
        channelName +
        "?callback=?",
      function(data) {
        var newData = {
          logo: data.logo,
          title: data.display_name,
          info: data.status,
          url: data.url,
          game: data.game
        };
        loadTemplate(newData);
      }
    );
  }
};
var loadTemplate = function(data) {
  $.getJSON(
    "https://wind-bow.gomix.me/twitch-api/streams/" +
      data.title +
      "?callback=?",
    function(streamData) {
      if (streamData.stream === null) {
        data.info = "-Offline-";
        data.game = "";
      }
      var div = Mustache.render(template, data);
      $("#test").append(div);
    }
  );
};