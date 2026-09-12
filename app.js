(function () {
  var CATALOG = [
    {key:"nbc", title:"NBC News Live", group:"start", kind:"news", type:"ytc", id:"UCeY0bbntWzzVIaj2z3QigXg"},
    {key:"bloom", title:"Bloomberg Live", group:"start", kind:"news", type:"ytc", id:"UCIALMKvObZNtJ6AmdCLP7Lg"},
    {key:"aje", title:"Al Jazeera English", group:"start", kind:"news", type:"yt", id:"gCNeDWCI0vo"},
    {key:"zoo", title:"LA I-5 Zoo Drive", group:"start", kind:"traffic", type:"img", url:"https://cwwp2.dot.ca.gov/data/d7/cctv/image/i531zoodrive/i531zoodrive.jpg"},

    {key:"sky", title:"Sky News", group:"news", kind:"news", type:"yt", id:"xDWQ3LkccY8"},
    {key:"abc", title:"ABC News Live", group:"news", kind:"news", type:"yt", id:"iipR5yUp36o"},
    {key:"f24", title:"France 24 English", group:"news", kind:"news", type:"yt", id:"Ap-UM1O9RBU"},
    {key:"dw", title:"DW News", group:"news", kind:"news", type:"yt", id:"LuKwFajn37U"},
    {key:"un", title:"United Nations Live", group:"news", kind:"news", type:"ytc", id:"UC5O114-PQNYkurlTg6hekZw"},
    {key:"ajc", title:"Al Jazeera channel", group:"news", kind:"news", type:"ytc", id:"UCNye-wNBqNL5ZzHSJj3l8Bg"},
    {key:"nasa", title:"NASA Live", group:"news", kind:"live", type:"ytc", id:"UCLA_DiR1FfKNvjuUpBHmylQ"},

    {key:"olive", title:"LA I-5 Olive", group:"traffic", kind:"traffic", type:"img", url:"https://cwwp2.dot.ca.gov/data/d7/cctv/image/i537olive/i537olive.jpg"},
    {key:"burb", title:"LA I-5 Burbank", group:"traffic", kind:"traffic", type:"img", url:"https://cwwp2.dot.ca.gov/data/d7/cctv/image/i540northofburbankblvd/i540northofburbankblvd.jpg"},
    {key:"mead", title:"LA I-5 Meadowdale", group:"traffic", kind:"traffic", type:"img", url:"https://cwwp2.dot.ca.gov/data/d7/cctv/image/i525meadowdale/i525meadowdale.jpg"},
    {key:"sf280", title:"SF I-280 Daly Blvd", group:"traffic", kind:"traffic", type:"img", url:"https://cwwp2.dot.ca.gov/data/d4/cctv/image/tv327i280johndalyblvd/tv327i280johndalyblvd.jpg"},
    {key:"sf580", title:"SF I-580 / SR-24", group:"traffic", kind:"traffic", type:"img", url:"https://cwwp2.dot.ca.gov/data/d4/cctv/image/tv102i580westofsr24/tv102i580westofsr24.jpg"},
    {key:"sac5", title:"SAC I-5 Pocket", group:"traffic", kind:"traffic", type:"img", url:"https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy5atpocket/hwy5atpocket.jpg"},
    {key:"sd8", title:"SD I-8 Hotel Circle", group:"traffic", kind:"traffic", type:"img", url:"https://cwwp2.dot.ca.gov/data/d11/cctv/image/c005i8hotelcircle/c005i8hotelcircle.jpg"},
    {key:"oc5", title:"OC I-5 Harbor", group:"traffic", kind:"traffic", type:"img", url:"https://cwwp2.dot.ca.gov/data/d12/cctv/image/i57harborboulevard/i57harborboulevard.jpg"},

    {key:"hls-aje", title:"Al Jazeera HLS", group:"iptv", kind:"iptv", type:"hls", url:"https://live-hls-apps-aje-fa.getaj.net/AJE/index.m3u8"},
    {key:"hls-cgtn", title:"CGTN HLS", group:"iptv", kind:"iptv", type:"hls", url:"https://news.cgtn.com/resource/live/english/cgtn-news.m3u8"},
    {key:"hls-dw", title:"DW News HLS", group:"iptv", kind:"iptv", type:"hls", url:"https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8"},
    {key:"hls-f24", title:"France 24 HLS", group:"iptv", kind:"iptv", type:"hls", url:"https://live.france24.com/hls/live/2037218/F24_EN_HI_HLS/master_5000.m3u8"}
  ];

  var wall = document.getElementById("wall");
  var statusEl = document.getElementById("status");
  var pick = document.getElementById("pick");
  var tiles = {};
  var used = {};
  var featured = null;
  var audioId = null;
  var n = 0;

  function setStatus(m) { statusEl.textContent = m; }
  function esc(s) {
    return String(s || "").replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">");
  }
  function ytIdFromUrl(u) {
    var m = String(u || "").match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|live\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }
  function count() { return Object.keys(tiles).length; }
  function feedByKey(k) {
    for (var i = 0; i < CATALOG.length; i++) if (CATALOG[i].key === k) return CATALOG[i];
    return null;
  }
  function fillPick() {
    pick.innerHTML = "";
    for (var i = 0; i < CATALOG.length; i++) {
      var f = CATALOG[i];
      if (used[f.key]) continue;
      var o = document.createElement("option");
      o.value = f.key;
      o.textContent = f.group + " — " + f.title;
      pick.appendChild(o);
    }
    if (!pick.options.length) {
      var z = document.createElement("option");
      z.textContent = "all added";
      pick.appendChild(z);
    }
  }

  function addTile(feed) {
    if (!feed) return;
    if (feed.key && used[feed.key]) return;
    if (feed.key) used[feed.key] = true;
    var id = "t" + (++n);
    var el = document.createElement("article");
    el.className = "tile";
    el.innerHTML = '<div class="bar"><span class="badge ' + esc(feed.kind) + '">' + esc(feed.kind) + '</span><span class="name">' + esc(feed.title) + '</span><button class="iconbtn mute" type="button">mute</button><button class="iconbtn feat" type="button">big</button><button class="iconbtn x" type="button">x</button></div><div class="stage"></div>';
    var stage = el.querySelector(".stage");
    mount(id, stage, feed, true);
    el.querySelector(".feat").onclick = function (e) { e.stopPropagation(); feature(id); };
    el.querySelector(".x").onclick = function (e) { e.stopPropagation(); remove(id, feed.key); };
    el.querySelector(".mute").onclick = function (e) { e.stopPropagation(); toggle(id); };
    el.onclick = function (e) { if (!e.target.closest(".iconbtn")) feature(id); };
    wall.appendChild(el);
    tiles[id] = {el: el, feed: feed, muted: true};
    fillPick();
    setStatus("On air: " + count() + " panels");
  }

  function mount(id, stage, feed, muted) {
    if (feed.type === "img") {
      var img = document.createElement("img");
      img.alt = feed.title;
      img.referrerPolicy = "no-referrer";
      function bump() {
        img.src = feed.url + (feed.url.indexOf("?") >= 0 ? "&" : "?") + "t=" + Date.now();
      }
      img.onerror = function () { stage.innerHTML = '<div class="broken">cam offline</div>'; };
      bump();
      stage.appendChild(img);
      tiles[id] = tiles[id] || {};
      tiles[id].refresh = setInterval(bump, 12000);
      return;
    }
    if (feed.type === "hls") {
      var v = document.createElement("video");
      v.muted = !!muted;
      v.autoplay = true;
      v.playsInline = true;
      v.controls = false;
      stage.appendChild(v);
      tiles[id] = tiles[id] || {};
      tiles[id].media = v;
      if (window.Hls && Hls.isSupported()) {
        var h = new Hls();
        h.loadSource(feed.url);
        h.attachMedia(v);
        h.on(Hls.Events.ERROR, function (_, d) {
          if (d && d.fatal) {
            try { h.destroy(); } catch (e) {}
            stage.innerHTML = '<div class="broken">HLS blocked by CORS</div>';
          }
        });
        tiles[id].hls = h;
      } else {
        v.src = feed.url;
      }
      v.play().catch(function () {});
      return;
    }
    var f = document.createElement("iframe");
    f.allow = "autoplay; encrypted-media; picture-in-picture";
    f.referrerPolicy = "origin";
    var mute = muted ? 1 : 0;
    if (feed.type === "yt") {
      f.src = "https://www.youtube.com/embed/" + feed.id + "?autoplay=1&mute=" + mute + "&rel=0";
    } else {
      f.src = "https://www.youtube.com/embed/live_stream?channel=" + feed.id + "&autoplay=1&mute=" + mute + "&rel=0";
    }
    stage.appendChild(f);
  }

  function feature(id) {
    featured = featured === id ? null : id;
    wall.classList.toggle("focus-mode", !!featured);
    for (var k in tiles) if (tiles[k].el) tiles[k].el.classList.toggle("featured", k === featured);
  }
  function silence() {
    for (var id in tiles) {
      var t = tiles[id];
      t.muted = true;
      if (t.el) t.el.classList.remove("audio-on");
      var b = t.el && t.el.querySelector(".mute");
      if (b) b.textContent = "mute";
      if (t.media) t.media.muted = true;
      var fr = t.el && t.el.querySelector("iframe");
      if (fr && /mute=0/.test(fr.src)) fr.src = fr.src.replace("mute=0", "mute=1");
    }
    audioId = null;
  }
  function toggle(id) {
    var t = tiles[id];
    if (!t) return;
    if (audioId === id) { silence(); return; }
    silence();
    t.muted = false;
    audioId = id;
    t.el.classList.add("audio-on");
    t.el.querySelector(".mute").textContent = "on";
    if (t.media) { t.media.muted = false; t.media.play().catch(function () {}); }
    var fr = t.el.querySelector("iframe");
    if (fr) fr.src = fr.src.replace("mute=1", "mute=0");
  }
  function remove(id, key) {
    var t = tiles[id];
    if (!t) return;
    if (t.refresh) clearInterval(t.refresh);
    if (t.hls) try { t.hls.destroy(); } catch (e) {}
    if (t.el) t.el.remove();
    delete tiles[id];
    if (key) delete used[key];
    if (featured === id) { featured = null; wall.classList.remove("focus-mode"); }
    if (audioId === id) audioId = null;
    fillPick();
    setStatus("On air: " + count() + " panels");
  }
  function clearAll() {
    var keys = Object.keys(tiles);
    for (var i = 0; i < keys.length; i++) {
      var t = tiles[keys[i]];
      remove(keys[i], t && t.feed && t.feed.key);
    }
  }
  function addGroup(name) {
    for (var i = 0; i < CATALOG.length; i++) {
      if (CATALOG[i].group === name) addTile(CATALOG[i]);
    }
  }

  document.getElementById("cols").onchange = function (e) {
    wall.style.setProperty("--cols", e.target.value);
  };
  document.getElementById("clear").onclick = clearAll;
  document.getElementById("reset4").onclick = function () {
    clearAll();
    addGroup("start");
  };
  var groupBtns = document.querySelectorAll("[data-group]");
  for (var i = 0; i < groupBtns.length; i++) {
    groupBtns[i].onclick = function () { addGroup(this.getAttribute("data-group")); };
  }
  document.getElementById("addone").onclick = function () {
    addTile(feedByKey(pick.value));
  };
  document.getElementById("add").onclick = function () {
    var raw = document.getElementById("custom").value.trim();
    if (!raw) return;
    var id = ytIdFromUrl(raw);
    if (id) addTile({title:"Custom YT", kind:"live", type:"yt", id:id});
    else if (/\.m3u8/i.test(raw)) addTile({title:"Custom HLS", kind:"iptv", type:"hls", url:raw});
    else addTile({title:"Custom", kind:"live", type:"img", url:raw});
    document.getElementById("custom").value = "";
  };

  fillPick();
  addGroup("start");
})();
