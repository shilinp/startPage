function test()
{
  var userInput = document.getElementById("userInput").value;
  if (userInput.length == 1 || userInput.charAt(1) == "/" || userInput.charAt(1) == " ")
  {
    if (userInput.charAt(0) == "g"){
      window.location.href = 'http://www.google.com';
    }
    else if (userInput.charAt(0) == "4"){
      if (userInput.charAt(1)==" "){
        var board = userInput.substr(userInput.indexOf(" ")+1)
        var chan= "http://boards.4chan.org/";
        var csite = chan.concat(board);
        window.location.href = csite;
      }
      else{
        window.location.href = 'http://www.4chan.org';
      }
    }
    else if (userInput.charAt(0) == "u"){
      if (userInput.charAt(1)==" "){
        var dict = userInput.substr(userInput.indexOf(" ")+1)
        var urban= "http://www.urbandictionary.com/define.php?term=";
        var usite = urban.concat(dict);
        window.location.href = usite;
      }
      else {
        window.location.href = 'http://www.urbandictionary.com';
      }
    }
    else if (userInput.charAt(0) == "t"){
      if (userInput.charAt(1)==" "){
        var tweet = userInput.substr(userInput.indexOf(" ")+1)
        var twitter= "https://twitter.com/search?q=";
        var tsite = twitter.concat(tweet);
        window.location.href = tsite;
      }
      else {
        window.location.href = 'http://www.twitter.com';
      }
    }
    else if (userInput.charAt(0) == "y"){
      if (userInput.charAt(1)==" "){
        var video = userInput.substr(userInput.indexOf(" ")+1)
        var youtube= "https://www.youtube.com/results?search_query=";
        var ysite = youtube.concat(video);
        window.location.href = ysite;
      }
      else {
        window.location.href = 'http://www.youtube.com';
      }
    }
    else if (userInput.charAt(0) == "s"){
      if (userInput.charAt(1)==" "){
        var song = userInput.substr(userInput.indexOf(" ")+1)
        var soundcloud = "https://soundcloud.com/search?q=";
        var ssite = soundcloud.concat(song);
        window.location.href = ssite;
      }
      else{
        window.location.href = 'http://www.soundcloud.com'
      }
    }
    else if (userInput.charAt(0) == "f"){
      if (userInput.charAt(1)==" "){
        var name = userInput.substr(userInput.indexOf(" ")+1)
        var facebook = "https://www.facebook.com/public?query=";
        var fsite = facebook.concat(name);
        window.location.href = fsite;
      }
      else {
        window.location.href = 'http://www.facebook.com';
      }
    }
    else if (userInput.charAt(0) == "r"){
      if (userInput.charAt(1)=="/"){
        var subreddit = userInput.substr(userInput.indexOf("/")+1)
        var reddit = "https://www.reddit.com/r/"
        var rsite = reddit.concat(subreddit);
        window.location.href = rsite;
      }
      else {
        window.location.href = 'http://www.reddit.com';
      }
    }
    else {
      var google = "https://www.google.com/search?q=";
      var search = google.concat(userInput);
      window.location.href = search;
    }
  }
  else {
    var google = "https://www.google.com/search?q=";
    var search = google.concat(userInput);
    window.location.href = search;
  }
}
