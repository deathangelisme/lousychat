// from https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API
// cross-browser compatible page visibility properties

var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
 
addHiddenWindowListener = function() {
  if (typeof document.addEventListener === "undefined" || typeof hidden === "undefined") throw "Page visibility is not supported in this browser";
  document.removeEventListener(visibilityChange);
  document.addEventListener(visibilityChange, function() {
    if (document[hidden]) {
      Meteor.call('updateChatStatus', 0);
    } else {
      Meteor.call('updateChatStatus', 1);
    }
  }, false);
}