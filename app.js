(function () {
    var FEEDS = [
      {title:"ABC News Live",kind:"news",type:"ytc",id:"UCBi2mrWuNuyYy4gbM6fU18Q"},
      {title:"Sky News",kind:"news",type:"ytc",id:"UCoMdktPbSTixAyNGwb-UYkQ"},
      {title:"Al Jazeera English",kind:"news",type:"ytc",id:"UCNye-wNBqNL5ZzHSJj3l8Bg"},
      {title:"France 24 English",kind:"news",type:"ytc",id:"UCQfwfsi5VrQ8yKZ-UWmYOJQ"},
      {title:"NASA Live",kind:"live",type:"ytc",id:"UCLA_DiR1FfKNvjuUpBHmylQ"},
      {title:"NBC News",kind:"news",type:"ytc",id:"UCeY0bbntWzzVIaj2z3QigXg"},
      {title:"C-SPAN",kind:"news",type:"ytc",id:"UCb--64Gl51jIEVE0VtQdQcg"},
      {title:"PBS NewsHour",kind:"news",type:"ytc",id:"UC6ZFN9Tx6xh-skXCuRHCDpQ"},
      {title:"Associated Press",kind:"news",type:"ytc",id:"UC52X5wxOL_s5yw0dQk7NtgA"},
      {title:"CGTN",kind:"news",type:"ytc",id:"UCgrNz-aDmcr2uuto8_DL2jg"},
      {title:"United Nations",kind:"news",type:"ytc",id:"UC5O114-PQNYkurlTg6hekZw"},
      {title:"DW News",kind:"news",type:"ytc",id:"UCknLrEdhRCp1aegoAuM0BgQ"},
      {title:"Euronews",kind:"news",type:"ytc",id:"UCSrZ3UV4jOidv8ppoVuvW9Q"},
      {title:"Bloomberg",kind:"news",type:"ytc",id:"UCIALMKvObZNtJ6AmdCLP7Lg"},
      {title:"TRT World",kind:"news",type:"ytc",id:"UC7fWeaHhqgQ8N0Z1dAhOMzw"},
      {title:"LA I-110 Ave 26",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d7/cctv/image/i110196avenue26offramp/i110196avenue26offramp.jpg"},
      {title:"LA I-5 Slauson",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d7/cctv/image/i52slausonave/i52slausonave.jpg"},
      {title:"LA I-5 Zoo Drive",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d7/cctv/image/i531zoodrive/i531zoodrive.jpg"},
      {title:"LA I-5 Olive",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d7/cctv/image/i537olive/i537olive.jpg"},
      {title:"LA I-5 Burbank",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d7/cctv/image/i540northofburbankblvd/i540northofburbankblvd.jpg"},
      {title:"LA I-5 Meadowdale",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d7/cctv/image/i525meadowdale/i525meadowdale.jpg"},
      {title:"LA I-5 south of I-10",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d7/cctv/image/i517southofi10/i517southofi10.jpg"},
      {title:"SF I-580 / SR-24",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d4/cctv/image/tv102i580westofsr24/tv102i580westofsr24.jpg"},
      {title:"SF I-280 Daly Blvd",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d4/cctv/image/tv327i280johndalyblvd/tv327i280johndalyblvd.jpg"},
      {title:"SF I-680 N Main",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d4/cctv/image/tv216i680northmainstreet/tv216i680northmainstreet.jpg"},
      {title:"SF US-101 Wilfred",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d4/cctv/image/tv127us101wilfredavenue/tv127us101wilfredavenue.jpg"},
      {title:"SF SR-4 Lone Tree",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d4/cctv/image/tv224sr4lonetreeway/tv224sr4lonetreeway.jpg"},
      {title:"SF SR-238 Ashland",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d4/cctv/image/tv709sr238southofashlandavenue/tv709sr238southofashlandavenue.jpg"},
      {title:"SAC I-5 Pocket",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy5atpocket/hwy5atpocket.jpg"},
      {title:"SAC I-5 Florin",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy5atflorin/hwy5atflorin.jpg"},
      {title:"SAC I-5 Gloria",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy5atgloria/hwy5atgloria.jpg"},
      {title:"SAC I-5 43rd",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy5at43rdave/hwy5at43rdave.jpg"},
      {title:"SAC I-5 Seamas",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy5atseamas/hwy5atseamas.jpg"},
      {title:"SAC I-5 Sutterville",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy5atsutterville/hwy5atsutterville.jpg"},
      {title:"SD SR-163 Friars",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d11/cctv/image/c348sr163friarsneb/c348sr163friarsneb.jpg"},
      {title:"SD SR-163 / I-8",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d11/cctv/image/c003sr163i8/c003sr163i8.jpg"},
      {title:"SD I-8 Hotel Circle",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d11/cctv/image/c005i8hotelcircle/c005i8hotelcircle.jpg"},
      {title:"SD I-8 Taylor",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d11/cctv/image/c006i8justeastoftaylor/c006i8justeastoftaylor.jpg"},
      {title:"SD SR-163 south I-8",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d11/cctv/image/c002sr163justsouthofi8/c002sr163justsouthofi8.jpg"},
      {title:"IE I-10 LA County Line",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d8/cctv/image/i1001lacountyline/i1001lacountyline.jpg"},
      {title:"IE I-10 Monte Vista",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d8/cctv/image/i1002eastofmontevista/i1002eastofmontevista.jpg"},
      {title:"IE I-10 Central",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d8/cctv/image/i1003central/i1003central.jpg"},
      {title:"IE I-10 Benson",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d8/cctv/image/i1004bensonavenue/i1004bensonavenue.jpg"},
      {title:"IE I-10 Mountain",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d8/cctv/image/i1005eastofmountainavenue/i1005eastofmountainavenue.jpg"},
      {title:"IE I-10 Euclid",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d8/cctv/image/i1006westofeuclid/i1006westofeuclid.jpg"},
      {title:"OC I-5 Magnolia",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d12/cctv/image/i51northofmagnoliaavenuesouthofsr91/i51northofmagnoliaavenuesouthofsr91.jpg"},
      {title:"OC SR-91 Beach",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d12/cctv/image/sr912beachboulevard/sr912beachboulevard.jpg"},
      {title:"OC SR-57 / SR-22",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d12/cctv/image/sr5712sr22/sr5712sr22.jpg"},
      {title:"OC SR-91 / 55",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d12/cctv/image/sr915rte55hmpole/sr915rte55hmpole.jpg"},
      {title:"OC SR-57 Ball Rd",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d12/cctv/image/sr576ballroad/sr576ballroad.jpg"},
      {title:"OC I-5 Harbor",kind:"traffic",type:"img",url:"https://cwwp2.dot.ca.gov/data/d12/cctv/image/i57harborboulevard/i57harborboulevard.jpg"}
    ];

    var wall = document.getElementById("wall");
    var statusEl = document.getElementById("status");
    var sourcesEl = document.getElementById("sources");
    var tiles = {};
    var featured = null;
    var audioId = null;
    var n = 0;

    function setStatus(m) { statusEl.textContent = m; }
    function esc(s) {
      return String(s || "").replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">");
    }
    function ytIdFromUrl(u) {
      var m = String(u || "").match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
      return m ? m[1] : null;
    }
    function matchKind(kind, f) {
      if (kind === "traffic") return f.kind === "traffic";
      if (kind === "live") return f.kind !== "traffic";
      return true;
    }
    function listKind() {
      var kind = document.getElementById("kind").value;
      var out = [];
      for (var i = 0; i < FEEDS.length; i++) if (matchKind(kind, FEEDS[i])) out.push(FEEDS[i]);
      sourcesEl.innerHTML = '<div class="src"><span>Constant desk</span><span class="ok">ok · ' + out.length + '</span></div>';
      return out;
    }

    function addTile(feed) {
      var id = "t" + (++n);
      var el = document.createElement("article");
      el.className = "tile";
      el.innerHTML = '<div class="bar"><span class="badge ' + esc(feed.kind) + '">' + esc(feed.kind) + '</span><span class="name">' + esc(feed.title) + '</span><button class="iconbtn mute" type="button">mute</button><button class="iconbtn feat" type="button">big</button><button class="iconbtn x" type="button">x</button></div><div class="stage"></div>';
      var stage = el.querySelector(".stage");
      mount(id, stage, feed, true);
      el.querySelector(".feat").onclick = function (e) { e.stopPropagation(); feature(id); };
      el.querySelector(".x").onclick = function (e) { e.stopPropagation(); remove(id); };
      el.querySelector(".mute").onclick = function (e) { e.stopPropagation(); toggle(id); };
      el.onclick = function (e) { if (!e.target.closest(".iconbtn")) feature(id); };
      wall.appendChild(el);
      if (!tiles[id]) tiles[id] = {};
      tiles[id].el = el;
      tiles[id].feed = feed;
      tiles[id].muted = true;
    }

    function mount(id, stage, feed, muted) {
      if (feed.type === "img") {
        var img = document.createElement("img");
        img.alt = feed.title;
        img.referrerPolicy = "no-referrer";
        function bump() {
          img.src = feed.url + (feed.url.indexOf("?") >= 0 ? "&" : "?") + "t=" + Date.now();
        }
        img.onerror = function () {
          stage.innerHTML = '<div class="broken">cam offline</div>';
        };
        bump();
        stage.appendChild(img);
        tiles[id] = tiles[id] || {};
        tiles[id].refresh = setInterval(bump, 12000);
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
      var fr = t.el.querySelector("iframe");
      if (fr) fr.src = fr.src.replace("mute=1", "mute=0");
    }
    function remove(id) {
      var t = tiles[id];
      if (!t) return;
      if (t.refresh) clearInterval(t.refresh);
      if (t.el) t.el.remove();
      delete tiles[id];
      if (featured === id) { featured = null; wall.classList.remove("focus-mode"); }
      if (audioId === id) audioId = null;
    }
    function clearAll() {
      var keys = Object.keys(tiles);
      for (var i = 0; i < keys.length; i++) remove(keys[i]);
    }
    function load() {
      try {
        clearAll();
        var list = listKind();
        for (var i = 0; i < list.length; i++) addTile(list[i]);
        setStatus("On air: " + Object.keys(tiles).length + " panels");
      } catch (e) {
        setStatus("JS error: " + e.message);
      }
    }

    document.getElementById("cols").onchange = function (e) {
      wall.style.setProperty("--cols", e.target.value);
    };
    document.getElementById("scan").onclick = load;
    document.getElementById("clear").onclick = clearAll;
    document.getElementById("kind").onchange = load;
    document.getElementById("add").onclick = function () {
      var raw = document.getElementById("custom").value.trim();
      if (!raw) return;
      var id = ytIdFromUrl(raw);
      if (id) addTile({title:"Custom YT",kind:"live",type:"yt",id:id});
      else addTile({title:"Custom",kind:"live",type:"img",url:raw});
      document.getElementById("custom").value = "";
      setStatus("On air: " + Object.keys(tiles).length + " panels");
    };
    load();
  })();
