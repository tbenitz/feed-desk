const wall = document.getElementById("wall");
const statusEl = document.getElementById("status");
const sourcesEl = document.getElementById("sources");
const tiles = new Map();
const srcState = {};
let featured = null, audioId = null;

function logStatus(m) { statusEl.textContent = m; }
function setSrc(n, st, d="") {
  srcState[n] = {st, d};
  sourcesEl.innerHTML = Object.entries(srcState).map(([k,v]) =>
    `<div class="src"><span>${k}</span><span class="${v.st}">${v.st}${v.d?" · "+v.d:""}</span></div>`
  ).join("");
}
function shuffle(a){ const x=a.slice(); for(let i=x.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [x[i],x[j]]=[x[j],x[i]]; } return x; }
function uid(){ return "t"+Math.random().toString(36).slice(2,8); }
function ytId(u){ const m=String(u||"").match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/); return m?m[1]:null; }
function esc(s){ return String(s||"").replace(/[&<>"]/g,c=>({"&":"&","<":"<",">":">","\"":"""}[c])); }

function matchKind(kind, f){
  if(kind==="mix") return true;
  if(kind==="traffic") return f.kind==="traffic";
  return f.kind!=="traffic";
}

function constantFeeds(kind){
  const list = Array.isArray(window.CONSTANT_FEEDS) ? window.CONSTANT_FEEDS : [];
  const out = list.filter(f => matchKind(kind, f));
  setSrc("Constant desk", out.length?"ok":"bad", out.length+" baked-in");
  return out;
}

async function getJSON(url, ms=10000){
  const ctrl=new AbortController();
  const t=setTimeout(()=>ctrl.abort(), ms);
  try {
    const r=await fetch(url,{signal:ctrl.signal,cache:"no-store"});
    if(!r.ok) throw new Error(String(r.status));
    return await r.json();
  } finally { clearTimeout(t); }
}

async function caltrans(n){
  setSrc("Caltrans extra","wait");
  const d=shuffle(["d3","d4","d7","d8","d11","d12"])[0];
  const num=d.slice(1).padStart(2,"0");
  const data=await getJSON(`https://cwwp2.dot.ca.gov/data/${d}/cctv/cctvStatusD${num}.json`,12000);
  const out=[];
  for(const row of data.data||[]){
    const c=row.cctv||row, loc=c.location||{};
    const img=(((c.imageData||{}).static)||{}).currentImageURL;
    if(c.inService==="true" && img) out.push({title:loc.locationName||"Caltrans",kind:"traffic",source:"Caltrans",type:"image",url:img,refresh:15000});
  }
  setSrc("Caltrans extra", out.length?"ok":"bad", out.length+" cams");
  return shuffle(out).slice(0,n);
}

async function catalog(n){
  setSrc("Live catalog","wait");
  const data=await getJSON("https://cdn.jsdelivr.net/gh/willytop8/Live-Environment-Streams@main/data/US.json",20000);
  const usable=(data.features||[]).map(f=>f.properties||{}).filter(p=>p.status==="active"&&p.url&&p.url_type==="youtube");
  setSrc("Live catalog", usable.length?"ok":"bad", usable.length+" YT");
  return shuffle(usable).slice(0,n).map(p=>{
    const id=ytId(p.url);
    return {title:p.display_name||p.name,kind:p.environment==="traffic"?"traffic":"webcam",source:"catalog",type:"youtube",videoId:id};
  }).filter(x=>x.videoId);
}

function dedupe(list){
  const seen=new Set(), out=[];
  for(const f of list){
    const k=f.videoId||f.channel||f.url;
    if(!k||seen.has(k)) continue;
    seen.add(k); out.push(f);
  }
  return out;
}

async function gather(kind, extras){
  const base = constantFeeds(kind);
  if(!extras) return base;
  const jobs=[];
  if(kind!=="live") jobs.push(caltrans(8).catch(e=>{setSrc("Caltrans extra","bad",e.message);return[];}));
  if(kind!=="traffic") jobs.push(catalog(6).catch(e=>{setSrc("Live catalog","bad",e.message);return[];}));
  const more = jobs.length ? (await Promise.all(jobs)).flat() : [];
  return dedupe(base.concat(more));
}

function addTile(feed){
  const id=uid();
  const el=document.createElement("article");
  el.className="tile";
  el.innerHTML=`<div class="bar"><span class="badge ${esc(feed.kind)}">${esc(feed.kind)}</span><span class="name">${esc(feed.title)}</span><button class="iconbtn mute">🔇</button><button class="iconbtn feat">▣</button><button class="iconbtn x">✕</button></div><div class="stage"></div>`;
  const stage=el.querySelector(".stage");
  mount(id, stage, feed, true);
  el.querySelector(".feat").onclick=e=>{e.stopPropagation(); feature(id);};
  el.querySelector(".x").onclick=e=>{e.stopPropagation(); remove(id);};
  el.querySelector(".mute").onclick=e=>{e.stopPropagation(); toggle(id);};
  el.onclick=e=>{ if(!e.target.closest(".iconbtn")) feature(id); };
  wall.appendChild(el);
  tiles.set(id, Object.assign(tiles.get(id)||{}, {el, feed, muted:true}));
}

function mount(id, stage, feed, muted){
  if(feed.type==="image"){
    const img=document.createElement("img");
    const bump=()=>{ img.src=feed.url+(feed.url.includes("?")?"&":"?")+"t="+Date.now(); };
    img.onerror=()=>{ stage.innerHTML=`<div class="broken">still failed</div>`; };
    bump(); stage.appendChild(img);
    const rec=tiles.get(id)||{};
    rec.refresh=setInterval(bump, feed.refresh||12000);
    tiles.set(id, rec);
    return;
  }
  if(feed.type==="youtube"||feed.type==="youtube-channel"){
    const f=document.createElement("iframe");
    f.allow="autoplay; encrypted-media; picture-in-picture";
    f.referrerPolicy="strict-origin-when-cross-origin";
    const mute=muted?1:0;
    f.src=feed.videoId
      ? `https://www.youtube-nocookie.com/embed/${feed.videoId}?autoplay=1&mute=${mute}&rel=0`
      : `https://www.youtube-nocookie.com/embed/live_stream?channel=${feed.channel}&autoplay=1&mute=${mute}&rel=0`;
    stage.appendChild(f);
    return;
  }
  if(feed.type==="hls"){
    const v=document.createElement("video");
    v.muted=!!muted; v.autoplay=true; v.playsInline=true;
    stage.appendChild(v);
    const rec=tiles.get(id)||{}; rec.media=v; tiles.set(id, rec);
    if(window.Hls && Hls.isSupported()){
      const h=new Hls(); h.loadSource(feed.url); h.attachMedia(v);
      h.on(Hls.Events.ERROR,(_,d)=>{ if(d.fatal){ h.destroy(); stage.innerHTML=`<div class="broken">HLS blocked</div>`; }});
      rec.hls=h;
    } else v.src=feed.url;
    v.play().catch(()=>{});
  }
}

function feature(id){
  featured = featured===id ? null : id;
  wall.classList.toggle("focus-mode", !!featured);
  for(const [k,t] of tiles) t.el.classList.toggle("featured", k===featured);
}
function silence(){
  for(const [id,t] of tiles){
    t.muted=true; t.el.classList.remove("audio-on");
    const b=t.el.querySelector(".mute"); if(b) b.textContent="🔇";
    if(t.media) t.media.muted=true;
    const f=t.el.querySelector("iframe");
    if(f && /mute=0/.test(f.src)) f.src=f.src.replace("mute=0","mute=1");
  }
  audioId=null;
}
function toggle(id){
  const t=tiles.get(id); if(!t) return;
  if(audioId===id){ silence(); return; }
  silence(); t.muted=false; audioId=id; t.el.classList.add("audio-on");
  t.el.querySelector(".mute").textContent="🔊";
  if(t.media){ t.media.muted=false; t.media.play().catch(()=>{}); }
  const f=t.el.querySelector("iframe");
  if(f) f.src=f.src.replace("mute=1","mute=0");
}
function remove(id){
  const t=tiles.get(id); if(!t) return;
  if(t.refresh) clearInterval(t.refresh);
  if(t.hls) try{ t.hls.destroy(); }catch(_){}
  t.el.remove(); tiles.delete(id);
  if(featured===id){ featured=null; wall.classList.remove("focus-mode"); }
  if(audioId===id) audioId=null;
}
function clearAll(){ [...tiles.keys()].forEach(remove); }

async function scan(extras){
  logStatus(extras?"Adding extras…":"Loading constant feeds…");
  try{
    const feeds=await gather(document.getElementById("kind").value, extras);
    if(!extras) clearAll();
    feeds.forEach(addTile);
    logStatus("On air: "+tiles.size+" panels");
  }catch(e){ logStatus("Scan failed: "+e.message); }
}

document.getElementById("cols").onchange=e=>wall.style.setProperty("--cols", e.target.value);
document.getElementById("scan").onclick=()=>scan(false);
document.getElementById("more").onclick=()=>scan(true);
document.getElementById("clear").onclick=clearAll;
document.getElementById("add").onclick=()=>{
  const raw=document.getElementById("custom").value.trim(); if(!raw) return;
  const id=ytId(raw);
  if(id) addTile({title:"Custom YT",kind:"live",type:"youtube",videoId:id});
  else if(/\.m3u8/i.test(raw)) addTile({title:"Custom HLS",kind:"live",type:"hls",url:raw});
  else addTile({title:"Custom",kind:"live",type:"image",url:raw,refresh:8000});
  document.getElementById("custom").value="";
};
scan(false);
