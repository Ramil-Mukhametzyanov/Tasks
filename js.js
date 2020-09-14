var options = {
 "show_dates": true
};
var tasks = [];
var Tb = new Date();
var Te = new Date();
var q = 0;
var cur = "";
var curid = -1;
function find(name){
 for(var i = 0; i < tasks.length; i++){
  if(tasks[i].name == name) return i;
 }
 return -1;
}

function display_time(t){
 if(t < 60) return t + "s";
 if(t < 60 * 60) return Math.round(t/60) + "m";
 if(t < 24 * 60 * 60) return Math.round(10*t/60/60)/10 + "h";
 if(t < 30.4 * 24 * 60 * 60) return Math.round(10*t/60/60/24)/10 + "d";
 if(t < 12 * 30.4 * 24 * 60 * 60) return Math.round(10*t/60/60/24/30.4)/10 + "m";
 return Math.round(10*t/60/60/24/30.4)/10 + "y";
}

function count(v){
 Te = new Date();
 var el = document.getElementById('end' + v);

 el.innerHTML = Te;
 var el = document.getElementById('dur' + v);

 dur = Math.round((Te - Tb)/100)
 var tdur = 0;
 for(var i = 0; i < tasks[v].t.length; i++) tdur += tasks[v].t[i].dur;
 tdur += dur;
 el.innerHTML = display_time(dur);
 tasks[v].Te = Te;
 tasks[v].dur = dur;
 var el = document.getElementById('tdur' + v);

 el.innerHTML = display_time(tdur);

 if(q) clearTimeout(q);
 q = setTimeout("count(" + v + ");", 100);
 return q;
}

function drawEl(ind){
 var task = tasks[ind];
 var Tb = task.Tb;
 var Te = task.Te;
 var name = task.name;
 var t = "<div id=task" + ind + " onclick=\"rune(tasks[" + ind + "].name);\" onmouseover=\"this.style.color='#007700';\" onmouseout=\"this.style.color='#000000';\">";
 t += name + " - <span id=dur" + ind + ">0s</span>/<span id=tdur" + ind + ">0s</span><br>";
 if(options.show_dates){
  t += "<div id=begin" + ind + ">" + Tb + "</div><div id=end" + ind + ">"+ Te + "</div>";
 }
 t += "</div>";
 var el = document.getElementById('task_table');
 var T = el.innerHTML + t;
 el.innerHTML = T;
}

function create(name){
 append(name);
 var ind = tasks.length;
 tasks[ind] = {};
 tasks[ind].name = name;
 tasks[ind].t = [];
 Tb = new Date();


 Te = Tb;
 var dur = Math.round((Te - Tb)/100);
 tasks[ind].Tb = Tb;
 tasks[ind].Te = Te;
 tasks[ind].dur = dur;
 return ind;
}

function start(ind){
  Tb = new Date();


  Te = Tb;
  var dur = Math.round((Te - Tb)/100);
  tasks[ind].Tb = Tb;
  tasks[ind].Te = Te;
  tasks[ind].dur = dur;
}

function update(ind){
 var el = document.getElementById('begin' + ind);
 el.innerHTML = tasks[ind].Tb;
 var el = document.getElementById('end' + ind);
 el.innerHTML = tasks[ind].Te;
 var el = document.getElementById('dur' + ind);
 el.innerHTML = tasks[ind].dur;
}

function add(name){
 stop();
 var ind = find(name);
 if(ind == -1){
  ind = create(name);
  drawEl(ind);
 }else{
  start(ind);
  update(ind);
 }
 current(name,tasks[ind].Tb-0);
 cur = name;
 curid = ind;
 q = setTimeout("count(" + ind + ");", 100);
}

function run(){

 var val = document.getElementById('task').value;

 if(val == cur) return;
 if(val) add(val);
}

function rune(t){

 if(t == cur) stop();
 else if(t) add(t);
}

function stop(){
 if(curid == -1) return;
 ind = curid;
 name = cur;
 var l = tasks[ind].t.length;
 tasks[ind].t[l] = {};
 tasks[ind].t[l].Tb = tasks[ind].Tb;
 tasks[ind].t[l].Te = tasks[ind].Te;
 tasks[ind].t[l].dur = tasks[ind].dur;
 save(name,tasks[ind].Tb-0,tasks[ind].Te-0);
 
 var end = tasks[ind].Te - 0;
 curid = -1;
 cur = "";
 current("",end);

 if(q) clearTimeout(q);
 q = 0;
}

function append(task) {

 console.log("Save to server list (" + task + ")");
 var xhr = new XMLHttpRequest();
 var body ="";
 body += 'name=' + encodeURIComponent(task);

 xhr.onreadystatechange = function(){};
 xhr.onerror = function(){
  alert(`Ошибка соединения`);
 };
 xhr.open("POST", 'append.php', true);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.send(body);
}


function current(task,begin) {

 console.log("Save to server(" + task + ") as current");
 var xhr = new XMLHttpRequest();
 var body ="";
 body += 'name=' + encodeURIComponent(task);
 body += '&begin=' + encodeURIComponent(begin);

 xhr.onreadystatechange = function(){};
 xhr.onerror = function(){
  alert(`Ошибка соединения`);
 };
 xhr.open("POST", 'current.php', true);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.send(body);
}

function save(task,begin,end) {

 console.log("Save to server(" + task + ")");
 var xhr = new XMLHttpRequest();
 var body ="";
 body += 'name=' + encodeURIComponent(task);
 body += '&begin=' + encodeURIComponent(begin);
 body += '&end=' + encodeURIComponent(end);

 xhr.onreadystatechange = function(){};
 xhr.onerror = function(){
  alert(`Ошибка соединения`);
 };
 xhr.open("POST", 'save.php', true);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.send(body);
}