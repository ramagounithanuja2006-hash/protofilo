const mode=document.getElementById("mode");

mode.onclick=()=>{

document.body.classList.toggle("dark");

}

const topBtn=document.getElementById("topBtn");

window.onscroll=()=>{

if(document.documentElement.scrollTop>200)
topBtn.style.display="block";
else
topBtn.style.display="none";

}

topBtn.onclick=()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

}
