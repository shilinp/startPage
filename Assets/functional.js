var allowHistory = 0;

function defaults() {
    var arr = [];
   //  var hist = [];
    //
   //  if (localStorage.getItem("hist") === null) {
   //      localStorage.setItem("hist", JSON.stringify(hist));
   //  }

    if (localStorage.getItem("arr") === null) {
        arr.push(["g", "https://www.google.com", "https://www.google.com/#q="]);
        arr.push(["r", "https://www.reddit.com", "https://www.reddit.com/r/"]);
        arr.push(["y", "https://www.youtube.com", "https://www.youtube.com/results?search_query="]);
        arr.push(["t", "https://www.twitter.com", "https://www.twitter.com/search?q="]);
        arr.push(["4", "https://www.4chan.org", "https://www.4chan.org/"]);
        arr.push(["w", "https://www.wolframalpha.com", "https://www.wolframalpha.com/input/?i="]);
        arr.push(["s", "https://soundcloud.com", "https://soundcloud.com/search?q="]);
        arr.push(["tr", "https://www.tumblr.com", "https://www.tumblr.com/search/"]);
        localStorage.setItem("arr", JSON.stringify(arr));
    }

   //  if (localStorage.getItem("check") == 1) {
   //      document.getElementById("checkbox").checked = true;
   //      allowHistory = 1;
   //  }
}

// function historyrecord(checkbox) {
//     if (checkbox.checked) {
//         allowHistory = 1;
//         localStorage.setItem("check", 1);
//     }
// }
//
// function historyfunc() {
//     var hist = JSON.parse(localStorage.getItem("hist"));
//     if (allowHistory == 0) {
//         document.getElementById("historyBox").innerHTML = "You have disabled history!"
//     } else if (hist == "") {
//         document.getElementById("historyBox").innerHTML = "You haven't visited any pages yet!"
//     } else if (document.getElementById("historyBox").innerHTML == "") {
//         for (i = 0; i < hist.length; i++) {
//             var x = i + 1;
//             document.getElementById("historyBox").innerHTML += "<tr><td class = \"macroNumber\">" + x + "</td>";
//             document.getElementById("historyBox").innerHTML += "<td class = \"macroLetter\">" + "-" + hist[i] + "</td></tr></br>";
//         }
//     } else {
//         document.getElementById("historyBox").innerHTML = "";
//     }
// }

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

function updateMacroTable() {
    var arr = JSON.parse(localStorage.getItem("arr"));
    for (i = 0; i < arr.length; i++) {
        var x = i + 1;
        document.write("<tr><td class = \"macroNumber\">" + x + "</td>");
        document.write("<td class = \"macroLetter\">" + "-" + arr[i][0] + "</td>");
        document.write("<td class = \"macroURL\">" + arr[i][1] + "</td>");
        document.write("<td class = \"macroURL\">" + arr[i][2] + "</td></tr>");
    }
}

function changebackground() {
    var url = document.getElementById('bgchanger').value;
    localStorage.setItem("backIMG", url);
    document.getElementsByTagName('body')[0].style.backgroundImage = "url('" + localStorage.getItem("backIMG") + "')";
}

function clearStorage() {
    localStorage.clear();
    location.reload(true);
    defaults();
}

function toggle() {
    var ele = document.getElementById("toggleText");
    var button = document.getElementById("hamburger");
    if (ele.style.display == "block") {
        ele.className = "animated slideOutLeft";
        button.style.left = "0px";
        setTimeout(function() {
            ele.style.display = "none";
        }, 500);
    } else {
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
    var h = Math.abs(today.getHours() - 12);
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('dateTXT').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-
TEXT DATA
-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

function store() //Stores a website shortcut
{
    var arr = JSON.parse(localStorage.getItem("arr"));

    var charInput = document.getElementById("character_enter").value;
    document.getElementById("character_enter").value = "";
    var webURL = document.getElementById("url_enter").value;
    document.getElementById("url_enter").value = "";
    var queryURL = document.getElementById("search_enter").value;
    document.getElementById("search_enter").value = "";
    var bool;
    for (i = 0; i < arr.length; i++) {
        if (charInput == arr[i][0]) {
            bool = 1;
        }
    }
    if (bool != 1) {
        arr.push([charInput, webURL, queryURL]);
        location.reload(true);
    } else {
        alert("That Macro ID is already taken!")
    }
    localStorage.setItem("arr", JSON.stringify(arr));
}

function clearSites() {
    localStorage.removeItem("arr");
    defaults();
    location.reload(true);
}

// function clearHistory() {
//     localStorage.removeItem("hist");
//     defaults();
//     location.reload(true);
// }

function clearIndividual() {
    var arr = JSON.parse(localStorage.getItem("arr"));

    var x = document.getElementById("clear_one").value;
    document.getElementById("clear_one").value = "";
    var v = parseInt(x, 10);
    var y = [];
    for (i = 0;
        (i + v) < arr.length; i++) {
        y.unshift(arr[arr.length - i - 1]);
        arr.pop();
    }
    arr.pop();
    for (i = 0; i < y.length; i++) {
        arr.push(y[i]);
    }
    localStorage.setItem("arr", JSON.stringify(arr));
    location.reload(true);
}
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-
SEARCH
-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
function find(userInput) //Returns position of arr in the arr has a character that matches the 0 position of userInput
{
    var arr = JSON.parse(localStorage.getItem("arr"));
    for (i = 0; i < arr.length; i++) {
        if (userInput.charAt(1) != userInput.charAt(arr.length - 1) && userInput.charAt(2) != " ") {
            if (arr[i][0].charAt(0) == userInput.charAt(1) && arr[i][0].charAt(1) == userInput.charAt(2)) {
                return i;
            }
        } else if (userInput.charAt(1) == userInput.charAt(arr.length - 1) || userInput.charAt(2) == " ") {
            if (arr[i][0] == userInput.charAt(1)) {
                return i;
            }
        }
    }
    return -1;
}

function search() //Action command to search the internet
{
    var arr = JSON.parse(localStorage.getItem("arr"));
   //  var hist = JSON.parse(localStorage.getItem("hist"));

    var userInput = document.getElementById("userInput").value;

    if (userInput.charAt(0) == "-") {
        var num = find(userInput);
        if (num != -1) {
            if (userInput.charAt(2) == " " || userInput.charAt(3) == " ") {
                var query = arr[num][2];
                var site = query.concat(userInput.substr(userInput.indexOf(" ") + 1));
               //  if (allowHistory == 1) {
               //      hist.push(arr[num][1] + " Search: " + userInput.substr(userInput.indexOf(" ") + 1));
               //      localStorage.setItem("hist", JSON.stringify(hist));
               //  }
                window.location.href = site;
            } else {
               //  if (allowHistory == 1) {
               //      hist.push(arr[num][1]);
               //      localStorage.setItem("hist", JSON.stringify(hist));
               //  }
                window.location.href = arr[num][1];
            }
        }
    } else {
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (userInput.match(regex)) { //Test for url
            // if (allowHistory == 1) {
            //     hist.push(userInput);
            //     localStorage.setItem("hist", JSON.stringify(hist));
            // }
            if (!userInput.match(/^https?:\/\//i)) {
                userInput = 'http://' + userInput;
            }
            window.location.href = userInput;
        } else { //Default search Google
            var google = "https://www.google.com/search?q=";
            var search = google.concat(userInput);
            // if (allowHistory == 1) {
            //     hist.push(userInput);
            //     localStorage.setItem("hist", JSON.stringify(hist));
            // }
            window.location.href = search;
        }
    }
}
