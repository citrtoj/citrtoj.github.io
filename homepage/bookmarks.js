storage = window.localStorage;
const add='<div class="add" title="Add new bookmark"><div class="icon" id="plus"><i class="fas fa-plus"></i></div><p class="name">Add...</p></div>';

var index = -2;
//which bookmark is selected

const withHttp = url => !/^https?:\/\//i.test(url) ? `http://${url}` : url;

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

function swapBookmarks(i,j){
    var tmp1 = storage.getObj(`${i}`);
    var tmp2 = storage.getObj(`${j}`);
    storage.setObj(j,tmp1);
    storage.setObj(i,tmp2);
    showBookmarks();
}
function makeBookmark(c){
    //make the html tags by hand
    bString ="";
    nameAndURL = storage.getObj(`${c}`);
    var len = nameAndURL[0].length;
    imgURL = "https://www.google.com/s2/favicons?sz=128&domain_url=" + nameAndURL[1].split('://')[1];
    imgTag = '<img ondrop="drop(event)" draggable="true" ondragover="allowDrop(event)" ondragstart="drag(event)" id=' + `${c}` + ' src="' + imgURL + '" alt="' + nameAndURL[0] + '">';
    iconTag = /*'<div class="icon">' + */imgTag /*+ '</div>';*/
    descTag = '<p class="name">' + nameAndURL[0].substring(0, 17) + ((nameAndURL[0].length>17)?"...":"") + '</p>';
    bString = `<div title="Right click to edit, drag and drop to swap with another bookmark" class="bookmark" draggable="false" id="${c}" onclick="window.location = '${nameAndURL[1]}';">` + iconTag + descTag + '</div>';
    return bString;
}
function showBookmarks(){
    //render tags after change to localStorage
    bookString = "";
    for(let i=0;i<storage.length-1;i++)
    {
        bookm = makeBookmark(i);
        bookString += bookm;
    }
    document.getElementById("bookmarks").innerHTML = bookString + add;
    plus = document.getElementById("plus");
    plus.addEventListener("click", function(){
        inputURL.value = "";
        inputDesc.value = '';
        popupBg1.classList.remove("hidden");
    });
    bks = document.getElementById("bookmarks").getElementsByClassName("bookmark");
    //all bookmarks
    for(let i=0;i<bks.length;i++)
    {
        bks[i].addEventListener('contextmenu',function(e){
            e.preventDefault();
            index = i;
            document.querySelector(".edit").classList.remove("hidden");
            editURL.value = storage.getObj(`${i}`)[1];
            editDesc.value = storage.getObj(`${i}`)[0];
            return false;
        },false);
    }
}

function deleteBookmarks()
{//exactly what it says on the tin
    for(let i=index;i<storage.length-2;i++)
    {
        let b = storage.getObj(`${i+1}`);
        console.log("b:" + b);
        storage.setObj(i,[b[0],b[1]]);
    }
    storage.removeItem(`${storage.length-2}`);
}

var delCnt=0;

function allowDrop(ev) {
    ev.preventDefault();
  }
  
function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var tg = ev.target;
    swapBookmarks(tg.id,data);
    showBookmarks();
}



function bookmarks(){
    //add bookmark
    showBookmarks();

    //theme thing
    inputURL = document.querySelector("div.popup input[name='URL']");
    inputDesc = document.querySelector("div.popup input[name='desc']");

    editURL = document.querySelectorAll("div.popup input[name='URL']")[1];
    editDesc = document.querySelectorAll("div.popup input[name='desc']")[1];

    plus = document.getElementById("plus");

    popupBg1 = document.querySelector(".popup-bg-1");
    popupBg2 = document.querySelector(".popup-bg-2");

    plus.addEventListener("click", function(){
        inputURL.value = "";
        inputDesc.value = '';
        popupBg1.classList.remove("hidden");
    });

    x = document.querySelectorAll(".fa-times");

    x[0].addEventListener("click",function(){
        popupBg1.classList.add("hidden");
    });

    x[1].addEventListener("click",function(){
        popupBg2.classList.add("hidden");
    });


    hidden = document.querySelectorAll(".z5");

    for(let i=0;i<hidden.length;i++)
    {
        hidden[i].addEventListener("click",function(e){
            if(e.target.parentElement == document.getElementsByTagName("body")[0])
            {
                hidden[i].classList.add("hidden");
            }
        })
    }

    
    themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click",function(){
        document.body.classList.toggle("dark-theme");
        themeValue = storage.getObj('-1');
        themeValue[0]=!(themeValue[0]);
        storage.setObj(-1,themeValue);
    });
    form1 = document.getElementById('form1');
    form1.addEventListener("submit",function(event){
        event.preventDefault();
        var url = inputURL.value;
        url = withHttp(url);
        var desc = inputDesc.value;
        storage.setObj(storage.length-1,[desc,url]);
        popupBg1.classList.add("hidden");
        inputURL.value = "";
        inputDesc.value = '';
        showBookmarks();
    });

    form2 = document.getElementById("form2");
    form2.addEventListener("submit", function(event){
        event.preventDefault();
        
        let desc = editDesc.value;
        let url = editURL.value;
        url = withHttp(url);
        storage.setObj(index,[desc,url]);
        index = -1;
        popupBg2.classList.add("hidden");
        editURL.value = "";
        editDesc.value = '';
        showBookmarks();

    });
    del = document.querySelector("button[name='delete']");

    del.addEventListener("click", function(){
        delCnt++;
        if(delCnt==1)
        {
            del.innerHTML = "Click again to delete";
        }
        if(delCnt == 2)
        {
            delCnt=0;
            del.innerHTML = "Delete";
            deleteBookmarks();
            showBookmarks();
            index = -2;
            popupBg2.classList.add("hidden");
            editURL.value = "";
            editDesc.value = '';
            
            
        }
    });
    
}
