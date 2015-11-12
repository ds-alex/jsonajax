//'use strict'
(function (){
    for (var i=0, key; i < localStorage.length; i++){
         key = localStorage.key(i);
         formBlock(JSON.parse(localStorage.getItem(key)));
    }
})();

var url;
	add.onclick = function () {
	console.log (document.getElementById("input").value);
	var username = document.getElementById("input").value;
	url = 'https://api.github.com/users/' + username;
    makeCorsRequest (url);
};


function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    return xhr;
 };

function makeCorsRequest(url) {
    var xhr = createCORSRequest('GET', url);
                  
    xhr.onload = function () {
        var text = JSON.parse(xhr.responseText);
        console.log (text);
        if (text.message == "Not Found"){
            alert ("Wrong user name!");
        } else {
           /* formImg (text.avatar_url, text.name);
            formLi (text.name, 'User name');
            formLi (text.type, 'Acc type');
            formLi (text.id, 'User ID');*/
            localStorage.setItem(text.login, JSON.stringify(text));            
            formBlock (text);
            };
    };

    xhr.onerror = function () {
        console.log ('Error!!!');
    };

    xhr.send();
};

/*function formLi (dat, param) {
    var elem = document.createElement ("li");
    var content = document.createTextNode (param + ': ' + dat);
    var avatar = document.getElementById ("avatar");
    elem.appendChild (content);
    avatar.appendChild (elem);
};
function formImg (dat, param) {
    document.getElementById ("avatar").innerHTML += '<img src="'+ dat +'" alt="' + param + '">'
};*/

function formBlock (dat) {
    var body = document.getElementById ("body");
    if (!dat.name) {
        dat.name = "oh no! this User has no name :(";
    };
    //body.innerHTML += "<div class='body'><div class='head'>"+dat.name+"</div><div class='content'><ul><li><img src='"+ dat.avatar_url +"' alt=''> </li><li>UserID: <span>"+dat.id+"</span></li><li>AccType: <span>"+dat.type+"</span></li></ul></div></div>";
    body.insertAdjacentHTML ("afterBegin", "<div class='body'><div class='head'>"+dat.name+"</div><div class='content'><ul><li><img src='"+ dat.avatar_url +"' alt=''> </li><li>UserID: <span>"+dat.id+"</span></li><li>AccType: <span>"+dat.type+"</span></li></ul></div></div>");
};
 