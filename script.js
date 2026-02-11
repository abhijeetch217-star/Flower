const colorSets=[
  ["#ff6b81","#ff4d6d"],
  ["#ff8fab","#fb6f92"],
  ["#c77dff","#9d4edd"],
  ["#ffd166","#f48c06"]
];

let autoInterval=null;

function random(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function createFlower(x,y){

  const size=70+Math.random()*30;
  const colors=random(colorSets);

  const flower=document.createElement("div");
  flower.className="flower";
  flower.style.left=x+"px";
  flower.style.top=y+"px";
  flower.style.width=size+"px";
  flower.style.height=size+"px";

  const petalCount=7+Math.floor(Math.random()*3);

  for(let i=0;i<petalCount;i++){
    let petal=document.createElement("div");
    petal.className="petal";

    let petalSize=size/(1.8+Math.random()*0.3);

    petal.style.width=petalSize+"px";
    petal.style.height=petalSize*1.2+"px";
    petal.style.background=
      `radial-gradient(circle at 30% 30%, ${colors[0]}, ${colors[1]})`;

    let angle=(360/petalCount)*i + Math.random()*15;
    let distance=size/3 + Math.random()*10;

    petal.style.left=size/2-petalSize/2+"px";
    petal.style.top=size/2-petalSize/2+"px";
    petal.style.transform=
      `rotate(${angle}deg) translateY(-${distance}px)`;

    flower.appendChild(petal);
  }

  const center=document.createElement("div");
  center.className="center";
  center.style.width=size/3+"px";
  center.style.height=size/3+"px";
  center.style.background="radial-gradient(#6d4c41,#3e2723)";
  center.style.left=size/2-size/6+"px";
  center.style.top=size/2-size/6+"px";
  flower.appendChild(center);

  const stem=document.createElement("div");
  stem.className="stem";
  flower.appendChild(stem);

  // Leaves
  for(let i=0;i<2;i++){
    let leaf=document.createElement("div");
    leaf.className="leaf";
    leaf.style.left="50%";
    leaf.style.bottom="-40px";
    leaf.style.transform=`rotate(${i===0?-40:40}deg)`;
    flower.appendChild(leaf);
  }

  document.body.appendChild(flower);
}

/* Click to create flower */
document.addEventListener("click",(e)=>{
  createFlower(e.clientX,e.clientY);
});

/* Auto Bloom */
document.getElementById("autoBtn").onclick=function(){
  if(autoInterval){
    clearInterval(autoInterval);
    autoInterval=null;
    this.textContent="Auto Bloom";
  }else{
    autoInterval=setInterval(()=>{
      createFlower(
        Math.random()*window.innerWidth,
        Math.random()*window.innerHeight
      );
    },700);
    this.textContent="Stop";
  }
};

/* Reset */
document.getElementById("resetBtn").onclick=function(){
  document.querySelectorAll(".flower,.fallingPetal,.wind,.heart").forEach(f=>f.remove());
};

/* Falling petals */
setInterval(()=>{
  let petal=document.createElement("div");
  petal.className="fallingPetal";
  petal.style.left=Math.random()*window.innerWidth+"px";
  document.body.appendChild(petal);
  setTimeout(()=>petal.remove(),6000);
},1000);

/* Wind */
setInterval(()=>{
  let wind=document.createElement("div");
  wind.className="wind";
  wind.style.top=Math.random()*window.innerHeight+"px";
  document.body.appendChild(wind);
  setTimeout(()=>wind.remove(),8000);
},1200);

/* Long press hearts (mobile) */
let pressTimer;

document.addEventListener("touchstart",function(e){
  pressTimer=setTimeout(()=>{
    for(let i=0;i<8;i++){
      let heart=document.createElement("div");
      heart.className="heart";
      heart.style.left=e.touches[0].clientX+(Math.random()*40-20)+"px";
      heart.style.top=e.touches[0].clientY+"px";
      document.body.appendChild(heart);
      setTimeout(()=>heart.remove(),3000);
    }
  },500);
});

document.addEventListener("touchend",function(){
  clearTimeout(pressTimer);
});
