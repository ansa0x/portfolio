/* Anusha Ghimire — portfolio interactions.
   Everything here is decoration or progressive enhancement: the page
   reads fine with JavaScript off. */
(() => {
  document.documentElement.classList.add("js");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Pixel sprites ----------
     Each sprite is a grid of palette keys; "." is transparent. */
  const PAL = {
    c: "#f5ead0", l: "#b9a8ec", p: "#8a77d0", b: "#6f88c9", B: "#4f65a8",
    t: "#9fe5e3", y: "#f1cf86", Y: "#c99a4a", g: "#8fd3b0", G: "#4d8a7a",
    r: "#f2b3c8", k: "#10153a", w: "#ffffff",
    m: "#1e2666", M: "#28327a",
  };

  const SPRITES = {
    cloud: ["......cccc......", "....cccccccc....", "..ccccccccccccc.", ".ccccccccccccccc", "cccccccccccccccc", ".llllllllllllll."],
    skyCloud: ["......MMMM......", "....MMMMMMMM....", "..MMMMMMMMMMMMM.", ".MMMMMMMMMMMMMMM", "MMMMMMMMMMMMMMMM", ".mmmmmmmmmmmmmm."],
    skyCloudSmall: ["...MMMM...", ".MMMMMMMM.", "MMMMMMMMMM", ".mmmmmmmm."],
    cloudSmall: ["...cccc...", ".cccccccc.", "cccccccccc", ".llllllll."],
    heart: [".rr.rr.", "rrrrrrr", "rwrrrrr", ".rrrrr.", "..rrr..", "...r..."],
    picture: ["bbbbbbbbb", "btttttyyb", "bttgttttb", "btgggtgtb", "bgggggggb", "bbbbbbbbb"],
    code: ["..t...l.c..", ".t...l...c.", "t....l....c", ".t..l....c.", "..t.l...c.."],
    laptop: [".bbbbbbbbb.", ".bkkkkkkkb.", ".bktttkkkb.", ".bkkllllkb.", ".bkttkkkkb.", ".bbbbbbbbb.", "ccccccccccc", ".ccccccccc."],
    star: ["....y....", "....y....", "...yyy...", "yyyyyyyyy", ".yyyyyyy.", "..yyyyy..", "..yy.yy..", ".yy...yy."],
    sparkle: ["...t...", "...t...", "..twt..", "ttwwwtt", "..twt..", "...t...", "...t..."],
    coin: [".yyyy.", "yyccyy", "yycyyy", "yycyyy", "yycyyy", "yyYYyy", ".yyyy."],
    sprout: ["gg...gg", ".gg.gg.", "..ggg..", "...G...", "...G...", "...G..."],
    mushroom: ["..llll..", ".llwlll.", "lllllwll", "lwllllll", "..cccc..", "..cccc..", "..cccc.."],
    flower: [".l.l.", "..y..", ".l.l.", "..g..", "g.g..", ".gg..", "..g.."],
    player: ["...cccc...", "..cccccc..", "..cccccc..", "..cccccc..", "...cccc...", "....cc....", ".llllllll.", "llllllllll", "llllllllll", "llllllllll", "ll......ll"],
    shield: ["bbbbbbb", "btwtttb", "btttttb", "btttttb", ".btttb.", "..btb..", "...b..."],
    flag: ["c......", "cyyyyy.", "cyyyyyy", "cyyyyy.", "c......", "c......", "c......", "cc....."],
    briefcase: ["..pppp..", "..p..p..", "llllllll", "llllllll", "pppyyppp", "llllllll", "llllllll"],
    chest: [".yyyyyy.", "ybbbbbby", "ybbbbbby", "yyyyyyyy", "ybbyybby", "ybbbbbby", "yyyyyyyy"],
    door: ["..ppp..", ".plllp.", "plllllp", "plllllp", "pllllyp", "plllllp", "plllllp", "ccccccc"],
    scroll: [".cccccc.", ".cbbbbc.", ".cccccc.", ".cbbbcc.", ".cccccc.", ".cbbbbc.", ".cccccc."],
    book: ["pppppppp", "pccccccp", "pcbbbbcp", "pccccccp", "pcbbbccp", "pccccccp", "pppppppp"],
    potion: ["..cccc..", "...ll...", "...tt...", "..tttt..", ".ttwttt.", "tttttttt", ".tttttt.", "..tttt.."],
    phone: ["bbbbbb", "bttttb", "bttttb", "bttttb", "bttttb", "bttttb", "bbccbb", "bbbbbb"],
    gear: [".l.l.l.", "lllllll", ".ll.ll.", "ll...ll", ".ll.ll.", "lllllll", ".l.l.l."],
    envelope: ["cccccccc", "bccccccb", "cbccccbc", "ccbccbcc", "cccbbccc", "cccccccc"],
    bunny: ["..c...c..", "..cr.cr..", "..cr.cr..", "..ccccc..", ".ccccccc.", ".ckcccck.", ".cccrccc.", "..ccccc..", ".ccccccc.", ".ccccccc.", "..cc.cc.."],
    cat: ["l......l", "ll....ll", "llllllll", "lkllllkl", "lllrrlll", "llllllll", ".llllll."],
    badge: ["bbbbbbbb", "bccbtttb", "bccbbbbb", "bccbtttb", "bbbbbbbb"],
    bubbleA: [".ccccccc.", "ccccccccc", "ccbcbcbcc", "ccccccccc", ".ccccccc.", "..cc.....", ".c......."],
  };

  function spriteSVG(rows, scale) {
    const w = Math.max(...rows.map((r) => r.length));
    const h = rows.length;
    let rects = "";
    rows.forEach((row, y) => {
      let x = 0;
      while (x < row.length) {
        const ch = row[x];
        if (ch === "." || ch === " " || !PAL[ch]) { x++; continue; }
        let run = 1;
        while (row[x + run] === ch) run++;
        rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${PAL[ch]}"/>`;
        x += run;
      }
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w * scale}" height="${h * scale}" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${rects}</svg>`;
  }

  document.querySelectorAll("[data-sprite]").forEach((el) => {
    const rows = SPRITES[el.dataset.sprite];
    if (rows) el.innerHTML = spriteSVG(rows, Number(el.dataset.scale) || 4);
  });

  /* ---------- Stepped pixel hills ---------- */
  const HILLS = {
    far:  { h: 300, base: 170, amp: 70, freq: [1.3, 3.1], seed: 1.7, fill: "#19205a", top: "#232b6e" },
    mid:  { h: 220, base: 120, amp: 55, freq: [2.1, 4.7], seed: 4.2, fill: "#1f2766", top: "#2e3880" },
    near: { h: 130, base: 70,  amp: 30, freq: [2.9, 6.3], seed: 8.9, fill: "#252f72", top: "#8fd3b0" },
    foot: { h: 120, base: 70,  amp: 30, freq: [2.4, 5.6], seed: 2.3, fill: "#1c2462", top: "#2e3880" },
  };
  const STEP = 16;
  const W = 1600;

  function hillPath(cfg, offset) {
    let d = `M0 ${cfg.h}`;
    for (let x = 0; x <= W; x += STEP) {
      const t = x / W;
      const y = cfg.base
        - Math.sin(t * Math.PI * cfg.freq[0] + cfg.seed) * cfg.amp * 0.6
        - Math.sin(t * Math.PI * cfg.freq[1] + cfg.seed * 2) * cfg.amp * 0.4;
      const yq = Math.round(cfg.h - y) - (Math.round(cfg.h - y) % 8) + offset;
      d += ` V${yq} H${x + STEP}`;
    }
    return d + ` V${cfg.h} Z`;
  }

  document.querySelectorAll("[data-hills]").forEach((svg) => {
    const cfg = HILLS[svg.dataset.hills];
    if (!cfg) return;
    svg.setAttribute("viewBox", `0 0 ${W} ${cfg.h}`);
    svg.setAttribute("shape-rendering", "crispEdges");
    svg.innerHTML = `<path d="${hillPath(cfg, 0)}" fill="${cfg.top}"/><path d="${hillPath(cfg, 6)}" fill="${cfg.fill}"/>`;
  });

  /* ---------- Stars ---------- */
  const stars = document.getElementById("stars");
  if (stars) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 70; i++) {
      const s = document.createElement("i");
      if (i % 9 === 0) s.className = "big";
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${Math.random() * 100}%`;
      s.style.setProperty("--d", `${3 + Math.random() * 5}s`);
      s.style.setProperty("--delay", `${-Math.random() * 6}s`);
      frag.appendChild(s);
    }
    stars.appendChild(frag);
  }

  /* ---------- Profile photo ----------
     Drop a photo in assets/ named profile.png, .jpg, .jpeg or .webp.
     Until one exists, the placeholder card is shown. */
  const photo = document.getElementById("profilePhoto");
  const frame = document.getElementById("photoFrame");
  if (photo && frame) {
    const candidates = ["assets/profile.png", "assets/profile.jpg", "assets/profile.jpeg", "assets/profile.webp"];
    let idx = 0;
    const tryNext = () => {
      idx++;
      if (idx < candidates.length) photo.src = candidates[idx];
      else frame.classList.add("no-photo");
    };
    photo.addEventListener("error", tryNext);
    photo.addEventListener("load", () => frame.classList.remove("no-photo"));
    if (photo.complete && photo.naturalWidth === 0) tryNext();

  }

  /* ---------- Nav ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "CLOSE" : "MENU";
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "MENU";
      }
    });
  }

  const navAnchors = [...document.querySelectorAll(".nav-links a")];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

  /* ---------- Experience tabs ---------- */
  const tabs = [...document.querySelectorAll(".xp-tab")];
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  };
  if (tabs.length) {
    select(tabs[0], false);
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab, false));
      tab.addEventListener("keydown", (e) => {
        const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (next) {
          e.preventDefault();
          select(tabs[(i + next + tabs.length) % tabs.length], true);
        } else if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
        else if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Contact dialog typewriter ---------- */
  const dialog = document.getElementById("dialogText");
  if (dialog && !reduceMotion) {
    const full = dialog.textContent.trim();
    dialog.style.minHeight = `${dialog.offsetHeight}px`;
    dialog.textContent = "";
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      dialog.classList.add("typing");
      let i = 0;
      const tick = () => {
        dialog.textContent = full.slice(0, ++i);
        if (i < full.length) setTimeout(tick, 22);
      };
      tick();
    }, { threshold: 0.6 });
    io.observe(dialog);
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  if (reduceMotion) return;

  /* ---------- Parallax + mouse drift ---------- */
  const parallax = [...document.querySelectorAll("[data-parallax]")];
  const depthEls = [...document.querySelectorAll("[data-depth]")];
  let mx = 0, my = 0, ticking = false;

  const render = () => {
    ticking = false;
    const y = window.scrollY;
    if (y < window.innerHeight * 1.3) {
      parallax.forEach((el) => {
        el.style.transform = `translate3d(0, ${(y * Number(el.dataset.parallax)).toFixed(1)}px, 0)`;
      });
    }
    depthEls.forEach((el) => {
      const d = Number(el.dataset.depth);
      el.style.transform = `translate3d(${(mx * d).toFixed(1)}px, ${(my * d).toFixed(1)}px, 0)`;
    });
  };
  const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } };

  window.addEventListener("scroll", queue, { passive: true });
  if (finePointer) {
    window.addEventListener("pointermove", (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      queue();
    }, { passive: true });

    /* tiny pixel burst on click */
    window.addEventListener("click", (e) => {
      if (e.target.closest("a, button, summary, input, textarea")) return;
      const colors = [PAL.c, PAL.l, PAL.t, PAL.y];
      for (let i = 0; i < 6; i++) {
        const p = document.createElement("span");
        p.className = "burst";
        const angle = (Math.PI * 2 * i) / 6;
        p.style.left = `${e.clientX}px`;
        p.style.top = `${e.clientY}px`;
        p.style.background = colors[i % colors.length];
        p.style.setProperty("--dx", `${Math.cos(angle) * 22}px`);
        p.style.setProperty("--dy", `${Math.sin(angle) * 22}px`);
        document.body.appendChild(p);
        p.addEventListener("animationend", () => p.remove());
      }
    });
  }
  render();
})();
