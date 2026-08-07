const nameBox = document.getElementById("name");
const ageBox = document.getElementById("age");
const result = document.getElementById("result");

load();

function load() {

const data = JSON.parse(localStorage.getItem("x7-user"));

if(!data){

result.innerHTML="💜 ยังไม่มีข้อมูล";

return;

}

nameBox.value=data.name;

ageBox.value=data.age;

showData(data);

}

function save(){

const name=nameBox.value.trim();

const age=ageBox.value.trim();

if(name===""||age===""){

toast("⚠️ กรุณากรอกข้อมูลให้ครบ");

return;

}

const data={name,age};

localStorage.setItem("x7-user",JSON.stringify(data));

showData(data);

toast("💖 บันทึกข้อมูลสำเร็จ");

}

function clearData(){

localStorage.removeItem("x7-user");

nameBox.value="";

ageBox.value="";

result.innerHTML="💜 ยังไม่มีข้อมูล";

toast("🗑️ ล้างข้อมูลแล้ว");

}

function showData(data){

result.innerHTML=

`👤 ${data.name}<br>🎂 ${data.age} ปี`;

}

function toast(text){

const old=document.querySelector(".toast");

if(old) old.remove();

const div=document.createElement("div");

div.className="toast";

div.textContent=text;

document.body.appendChild(div);

requestAnimationFrame(()=>{

div.classList.add("show");

});

setTimeout(()=>{

div.classList.remove("show");

setTimeout(()=>{

div.remove();

},300);

},2200);

}

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("click",()=>{

btn.animate(

[

{transform:"scale(1)"},

{transform:"scale(.95)"},

{transform:"scale(1)"}

],

{

duration:180,

easing:"ease-out"

}

);

});

});

[nameBox,ageBox].forEach(input=>{

input.addEventListener("keydown",e=>{

if(e.key==="Enter") save();

});

});
