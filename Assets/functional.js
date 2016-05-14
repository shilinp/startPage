var array = [];

function defaults() {
  if (localStorage.getItem("array") === null) {
    array.push(["g", "https://www.google.com", "https://www.google.com/#q="]);
    array.push(["r", "https://www.reddit.com", "https://www.reddit.com/r/"]);
    array.push(["y", "https://www.youtube.com", "https://www.youtube.com/results?search_query="]);
    array.push(["t", "https://www.twitter.com", "https://www.twitter.com/search?q="]);
    array.push(["4", "https://www.4chan.org", "https://www.4chan.org/"]);
    array.push(["w", "https://www.wolframalpha.com", "https://www.wolframalpha.com/input/?i="]);
    array.push(["s", "https://soundcloud.com", "https://soundcloud.com/search?q="]);
    array.push(["tr", "https://www.tumblr.com", "https://www.tumblr.com/search/"]);
    localStorage.setItem("array", JSON.stringify(array));
  }
}

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-
VISUAL DATA
-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

function loadBack() {
  if (localStorage.getItem("backIMG") === null) {
    localStorage.setItem("backIMG", "http://i.imgur.com/eloMQ98.jpg");
  }
  if (localStorage.getItem("accentSTR") === null) {
    localStorage.setItem("accentSTR", "pink");
  }
  document.getElementsByTagName('body')[0].style.backgroundImage = "url('" + localStorage.getItem("backIMG") + "')";
  document.getElementById("userInput").style.borderColor = localStorage.getItem("accentSTR");
  document.getElementById("bgchanger").placeholder = localStorage.getItem("backIMG");
}

function updateMacroTable()
{
  var temp = JSON.parse(localStorage.getItem("array"));
  for (i = 0; i < temp.length; i++) {
    var x = i+1;
    document.write("<tr><td class = \"macroNumber\">" + x + "</td>")
    document.write("<td class = \"macroLetter\">" + "-" + temp[i][0] + "</td>");
    document.write("<td class = \"macroURL\">" + temp[i][1] + "</td>" )
    document.write("<td class = \"macroURL\">" + temp[i][2] + "</td></tr>")
  }
}

function changebackground(){
  var url = document.getElementById('bgchanger').value;
  localStorage.setItem("backIMG", url);
  document.getElementsByTagName('body')[0].style.backgroundImage = "url('" + localStorage.getItem("backIMG") + "')";
}

function clearStorage(){
  localStorage.clear();
  location.reload(true);
  defaults();
}

function toggle() {
	var ele = document.getElementById("toggleText");
	var button = document.getElementById("hamburger");
	if(ele.style.display == "block") {
        ele.className = "animated slideOutLeft";
        button.style.left = "0px";
        setTimeout(function(){ ele.style.display = "none";}, 500);
  }
	else {
    ele.className = "animated slideInLeft";
		ele.style.display = "block";
    button.style.left = "300px";
	}
}
function update(jscolor) {
    // 'jscolor' instance can be used as a string
    var accent = '#' + jscolor;
    localStorage.setItem("accentSTR", accent);
    document.getElementById("userInput").style.borderColor = localStorage.getItem("accentSTR");
}

function startTime() {
    var today = new Date();
    var h = Math.abs(today.getHours()-12);
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('dateTXT').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


/*-=-=-=-=-=-=-=-=-=-=-=-=-=-
TEXT DATA
-=-=-=-=-=-=-=-=-=-=-=-=-=-*/


function localRetrieve() //Place the cached array into the global array variable
{
  array = JSON.parse(localStorage.getItem("array"));
}

function store() //Stores a website shortcut
{
  localRetrieve();
  var charInput = document.getElementById("character_enter").value;
  document.getElementById("character_enter").value = "";
  var webURL = document.getElementById("url_enter").value;
  document.getElementById("url_enter").value = "";
  var queryURL = document.getElementById("search_enter").value;
  document.getElementById("search_enter").value = "";
  var bool;
  for (i = 0; i < array.length; i++)
  {
    if (charInput == array[i][0])
    {
      bool = 1;
    }
  }
  if (bool != 1)
  {
    array.push([charInput, webURL, queryURL]);
    location.reload(true);
  }
  else {
    alert("That Macro ID is already taken!")
  }
  localStorage.setItem("array", JSON.stringify(array));
}

function clearSites()
{
  localStorage.removeItem("array");
  defaults();
  location.reload(true);
}

function clearIndividual()
{
  localRetrieve();
  var x = document.getElementById("clear_one").value;
  document.getElementById("clear_one").value = "";
  var v = parseInt(x, 10);
  var y = [];
  for (i = 0; (i + v) < array.length; i++)
  {
    y.unshift(array[array.length-i-1]);
    array.pop();
  }
  array.pop();
  for (i = 0; i < y.length; i++)
  {
    array.push(y[i]);
  }
  localStorage.setItem("array", JSON.stringify(array));
  location.reload(true);
}


/*-=-=-=-=-=-=-=-=-=-=-=-=-=-
SEARCH
-=-=-=-=-=-=-=-=-=-=-=-=-=-*/


function find(userInput) //Returns position of array in the array has a character that matches the 0 position of userInput
{
  for (i = 0; i < array.length; i++)
  {
    if (userInput.charAt(1) != userInput.charAt(array.length-1) && userInput.charAt(2) != " ")
    {
      if (array[i][0].charAt(0) == userInput.charAt(1) && array[i][0].charAt(1) == userInput.charAt(2))
      {
        return i;
      }
    }
    else if(userInput.charAt(1) == userInput.charAt(array.length-1) || userInput.charAt(2) == " ")
    {
      if (array[i][0] == userInput.charAt(1))
      {
        return i;
      }
    }
  }
  return -1;
}

function search() //Action command to search the internet
{
  localRetrieve();
  var userInput = document.getElementById("userInput").value;
  if (userInput.charAt(0) == "-")
  {
    var num = find(userInput);
    if (num != -1)
    {
      if (userInput.charAt(2) == " " || userInput.charAt(3) == " "){
        var query = array[num][2];
        var site = query.concat(userInput.substr(userInput.indexOf(" ")+1));
        window.location.href = site;
      }
      else {
        window.location.href = array[num][1];
      }
    }
  }
  else {
    var google = "https://www.google.com/search?q=";
    var search = google.concat(userInput);
    window.location.href = search;
  }
}
