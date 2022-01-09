const dot = "•";
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ];
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function isMin10(nr)
{
    if(nr<10) return "0";
    return "";
}
function clock(){
    var hour=document.getElementById("hour");
    var min=document.getElementById("min");
    var sec=document.getElementById("sec");

    var d = new Date();
    
    var [day, month, date, year]= [d.getDay(),d.getMonth(), d.getDate(), d.getFullYear()];

    document.getElementById("date").innerHTML = weekday[day] + ", " + months[month] + " " + date + " " + year + ",&nbsp";

    var hourDegFloat=d.getHours()*15;
    var hourDeg = hourDegFloat.toFixed(2);
    hour.style.filter = `hue-rotate(${hourDeg}deg)`;
    var hourContent = "";
    for(let i = 1; i<=hourDegFloat/15;i++)
    {
        hourContent += dot;
        if(i%8===0) hourContent +='<br>';
    }
    hour.innerHTML = hourContent;
    
    var minDegFloat=d.getMinutes()*6;
    var minDeg = minDegFloat.toFixed(2);
    min.style.filter = `hue-rotate(${minDeg}deg)`;
    var minContent = "";
    for(let i = 1; i<=minDegFloat/6;i++)
    {
        minContent += dot;
        if(i%8===0) minContent +='<br>';
    }
    min.innerHTML = minContent;


    var secDegFloat=d.getSeconds()*6;
    var secDeg = secDegFloat.toFixed(2);
    sec.style.filter = `hue-rotate(${secDeg}deg)`;
    var secContent = "";
    for(let i = 1; i<=secDegFloat/6;i++)
    {
        secContent += dot;
        if(i%8===0) secContent +='<br>';
    }
    sec.innerHTML = secContent;
    
    hour = hourDegFloat/15;
    min = minDegFloat/6;
    sec = secDegFloat/6;

    const aaa = 
    document.getElementById("time").innerHTML = isMin10(hour) + parseInt(hour) + ":" + isMin10(min) + parseInt(min) + ":" + isMin10(sec) + parseInt(sec);
    setTimeout(clock,500);
}
function load(){
    bookmarks();
    var theme=[false];
    if(storage.getItem("-1") === null)
    {
        storage.setObj(-1,theme);
    }
    if(storage.getObj("-1")[0] == true){
            document.body.classList.toggle("dark-theme")
        }
    clock();
}
window.onload = load;