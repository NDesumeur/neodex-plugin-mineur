// Mineur : Creuse toujours plus bas avec ta foreuse, remonte les minerais, vends-les à la surface et améliore ta machine. Gare au carburant et à la lave.
// Jeu NeoDex en pixel art dessiné à la main (police bitmap, cadres et boutons en pixels). Il tourne dans le bac à sable de NeoDex.
const HTML = `<div class="appWrap wide">
  <div class="agHead"><span class="label">Mineur</span><span class="hint">Flèches ou ZQSD : avancer et creuser · ↑ : remonter (consomme) · 1 2 3 : améliorations (à la surface)</span></div>
  <div class="gMain"><div class="gameBox"><canvas id="gc" width="240" height="204"></canvas></div>
    <div class="gSide">
      <div class="sysCard"><b>RECORDS</b><div class="gStats" id="gStats"></div></div>
      <div class="row"><button class="btn main" id="gNew">NOUVELLE PARTIE</button></div>
      <div class="row"><button class="btn" id="mnUp0">RÉSERVOIR</button><button class="btn" id="mnUp1">SOUTE</button></div><div class="row"><button class="btn" id="mnUp2">FORET</button></div>
      <div class="hint">À la surface, tout se vend et le plein se fait tout seul.</div><div class="hint">Plus on descend, plus les minerais valent cher : cuivre, fer, argent, or, rubis, saphir. La roche dure demande un meilleur foret, la lave renvoie à la surface en perdant la soute.</div>
    </div></div>
</div>`;
const CSS = `.gMain{display:flex;gap:22px;align-items:flex-start;flex-wrap:wrap}
.gameBox{display:grid;place-items:center;padding:10px;background:#05010b;flex:2;min-width:320px;position:relative}
.gameBox canvas{width:100%;image-rendering:pixelated;cursor:var(--cp,pointer);touch-action:none}
.gSide{display:flex;flex-direction:column;gap:14px;flex:1;min-width:250px;max-width:420px}
.gSide .sysCard{display:flex;flex-direction:column}
.gStats{display:grid;grid-template-columns:1fr auto;gap:4px 14px}
.gStats b{text-align:right}
.gameBox canvas{max-width:560px;aspect-ratio:240/204}`;
/* ---------- l'habillage pixel art, dessiné à la main : police bitmap (accents compris), cadres, boutons, icônes ----------
   Tout est en pixels pleins, agrandis par 2 sans lissage : aucun dégradé, aucune ombre floue. */
const PXK = (() => {
  // chaque lettre : ses lignes, de haut en bas, à partir de la ligne 2 de la case (0-1 : accents des majuscules, 9-10 : jambages)
  const S = {
    A: '.###. #...# #...# ##### #...# #...# #...#', B: '####. #...# #...# ####. #...# #...# ####.', C: '.###. #...# #.... #.... #.... #...# .###.',
    D: '####. #...# #...# #...# #...# #...# ####.', E: '##### #.... #.... ####. #.... #.... #####', F: '##### #.... #.... ####. #.... #.... #....',
    G: '.###. #...# #.... #.### #...# #...# .####', H: '#...# #...# #...# ##### #...# #...# #...#', I: '### .#. .#. .#. .#. .#. ###',
    J: '..### ...#. ...#. ...#. #..#. #..#. .##..', K: '#...# #..#. #.#.. ##... #.#.. #..#. #...#', L: '#.... #.... #.... #.... #.... #.... #####',
    M: '#...# ##.## #.#.# #.#.# #...# #...# #...#', N: '#...# ##..# #.#.# #..## #...# #...# #...#', O: '.###. #...# #...# #...# #...# #...# .###.',
    P: '####. #...# #...# ####. #.... #.... #....', Q: '.###. #...# #...# #...# #.#.# #..#. .##.#', R: '####. #...# #...# ####. #.#.. #..#. #...#',
    S: '.#### #.... #.... .###. ....# ....# ####.', T: '##### ..#.. ..#.. ..#.. ..#.. ..#.. ..#..', U: '#...# #...# #...# #...# #...# #...# .###.',
    V: '#...# #...# #...# #...# #...# .#.#. ..#..', W: '#...# #...# #...# #.#.# #.#.# ##.## #...#', X: '#...# #...# .#.#. ..#.. .#.#. #...# #...#',
    Y: '#...# #...# .#.#. ..#.. ..#.. ..#.. ..#..', Z: '##### ....# ...#. ..#.. .#... #.... #####',
    a: '..... ..... .###. ....# .#### #...# .####', b: '#.... #.... ####. #...# #...# #...# ####.', c: '..... ..... .###. #.... #.... #.... .###.',
    d: '....# ....# .#### #...# #...# #...# .####', e: '..... ..... .###. #...# ##### #.... .###.', f: '..## .#.. #### .#.. .#.. .#.. .#..',
    g: '..... ..... .#### #...# #...# #...# .#### ....# .###.', h: '#.... #.... ####. #...# #...# #...# #...#', i: '.#. ... ##. .#. .#. .#. ###',
    'ı': '... ... ##. .#. .#. .#. ###', j: '...# .... ..## ...# ...# ...# ...# #..# .##.', k: '#... #... #..# #.#. ##.. #.#. #..#',
    l: '##. .#. .#. .#. .#. .#. ###', m: '..... ..... ##.#. #.#.# #.#.# #.#.# #...#', n: '..... ..... ####. #...# #...# #...# #...#',
    o: '..... ..... .###. #...# #...# #...# .###.', p: '..... ..... ####. #...# #...# #...# ####. #.... #....', q: '..... ..... .#### #...# #...# #...# .#### ....# ....#',
    r: '.... .... #.## ##.. #... #... #...', s: '..... ..... .#### #.... .###. ....# ####.', t: '.#.. .#.. #### .#.. .#.. .#.. ..##',
    u: '..... ..... #...# #...# #...# #..## .##.#', v: '..... ..... #...# #...# #...# .#.#. ..#..', w: '..... ..... #...# #...# #.#.# #.#.# .#.#.',
    x: '..... ..... #...# .#.#. ..#.. .#.#. #...#', y: '..... ..... #...# #...# #...# #...# .#### ....# .###.', z: '..... ..... ##### ...#. ..#.. .#... #####',
    0: '.###. #...# #..## #.#.# ##..# #...# .###.', 1: '..#.. .##.. ..#.. ..#.. ..#.. ..#.. .###.', 2: '.###. #...# ....# ...#. ..#.. .#... #####',
    3: '####. ....# ....# .###. ....# ....# ####.', 4: '...#. ..##. .#.#. #..#. ##### ...#. ...#.', 5: '##### #.... ####. ....# ....# #...# .###.',
    6: '.###. #.... #.... ####. #...# #...# .###.', 7: '##### ....# ...#. ..#.. .#... .#... .#...', 8: '.###. #...# #...# .###. #...# #...# .###.',
    9: '.###. #...# #...# .#### ....# ....# .###.',
    '.': '. . . . . . #', ',': '.. .. .. .. .. .# .# #.', ':': '. . # . . . #', ';': '.. .. .# .. .. .# .# #.', '!': '# # # # # . #',
    '?': '.###. #...# ....# ...#. ..#.. ..... ..#..', "'": '# # . . . . .', '"': '#.# #.# ... ... ... ... ...', '-': '... ... ... ### ... ... ...',
    '+': '..... ..#.. ..#.. ##### ..#.. ..#.. .....', '/': '....# ...#. ...#. ..#.. .#... .#... #....', '(': '.# #. #. #. #. #. .#', ')': '#. .# .# .# .# .# #.',
    '%': '##..# ##.#. ...#. ..#.. .#... .#.## #..##', '·': '. . . # . . .', '×': '..... ..... #...# .#.#. ..#.. .#.#. #...#',
    '<': '...# ..#. .#.. #... .#.. ..#. ...#', '>': '#... .#.. ..#. ...# ..#. .#.. #...', '=': '.... .... #### .... #### .... ....',
    '_': '..... ..... ..... ..... ..... ..... #####', '#': '.#.#. .#.#. ##### .#.#. ##### .#.#. .#.#.', '&': '.##.. #..#. #.#.. .#... #.#.# #..#. .##.#',
    '…': '..... ..... ..... ..... ..... ..... #.#.#', '«': '..... ..#.# .#.#. #.#.. .#.#. ..#.# .....', '»': '..... #.#.. .#.#. ..#.# .#.#. #.#.. .....',
    '◀': '...# ..## .### #### .### ..## ...#', '▶': '#... ##.. ###. #### ###. ##.. #...', '→': '..... ..#.. ...#. ##### ...#. ..#.. .....',
    '←': '..... ..#.. .#... ##### .#... ..#.. .....', '↑': '..#.. .###. #.#.# ..#.. ..#.. ..#.. ..#..', '↓': '..#.. ..#.. ..#.. ..#.. #.#.# .###. ..#..',
    '*': '..... #.#.# .###. ##### .###. #.#.# .....', '[': '## #. #. #. #. #. ##', ']': '## .# .# .# .# .# ##', '|': '# # # # # # #',
    '@': '.###. #...# #.### #.#.# #.### #.... .###.', '€': '..### .#... ####. .#... ####. .#... ..###', '$': '..#.. .#### #.#.. .###. ..#.# ####. ..#..',
    '°': '.#. #.# .#. ... ... ... ...', '~': '..... ..... .#..# #.##. ..... ..... .....', '♪': '..##. ..#.# ..#.. ..#.. .##.. ###.. .#...',
  };
  const ACC = { a: ['..#', '.#.'], g: ['#..', '.#.'], c: ['.#.', '#.#'], d: ['...', '#.#'], t: ['.#.#', '#.#.'], z: ['.#.', '##.'] };  // aigu, grave, circonflexe, tréma, tilde, cédille
  const COMP = { é: 'ea', è: 'eg', ê: 'ec', ë: 'ed', á: 'aa', à: 'ag', â: 'ac', ä: 'ad', í: 'ıa', ì: 'ıg', î: 'ıc', ï: 'ıd', ó: 'oa', ò: 'og', ô: 'oc', ö: 'od',
    ú: 'ua', ù: 'ug', û: 'uc', ü: 'ud', ÿ: 'yd', ñ: 'nt', ç: 'cz', É: 'Ea', È: 'Eg', Ê: 'Ec', Ë: 'Ed', Á: 'Aa', À: 'Ag', Â: 'Ac', Ä: 'Ad', Í: 'Ia', Î: 'Ic', Ï: 'Id',
    Ó: 'Oa', Ô: 'Oc', Ö: 'Od', Ú: 'Ua', Ù: 'Ug', Û: 'Uc', Ü: 'Ud', Ñ: 'Nt', Ç: 'Cz' };
  const SUB = { 'œ': 'oe', 'Œ': 'OE', '’': "'", '‘': "'", '“': '"', '”': '"', '–': '-', '—': '-', ' ': ' ', ' ': ' ', '•': '·', '✓': 'v', 'ᐸ': '<', 'ᐳ': '>', '＜': '<', '＞': '>', '｜': '|', '／': '/', '！': '!', '？': '?', '（': '(', '）': ')', '：': ':', '　': ' ' };  // ᐸ ᐳ : les < > des titres YouTube
  const H = 11, glyphs = new Map(); let raster;
  function glyph(ch) {
    let g = glyphs.get(ch); if (g) return g;
    const px = [], add = (rows, ox, oy) => rows.forEach((r, y) => { for (let x = 0; x < r.length; x++) if (r[x] === '#') px.push([ox + x, oy + y]); });
    const c = COMP[ch], src = S[c ? c[0] : ch]; let w = 3;
    if (src) {
      const rows = src.split(' '); w = Math.max(...rows.map(r => r.length)); add(rows, 0, 2);
      if (c) { const a = ACC[c[1]]; add(a, Math.floor((w - a[0].length) / 2), c[1] === 'z' ? 9 : /[A-Z]/.test(c[0]) ? 0 : 1); }
    } else if (ch !== ' ') {  // japonais, emoji… : la lettre du système, réduite à des pixels nets (sans lissage) sur la même hauteur que la police
      const q = (raster ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true })), RW = 16;
      q.canvas.width = RW; q.canvas.height = H; q.font = '11px "MS Gothic", "Yu Gothic UI", Meiryo, "Segoe UI Symbol", sans-serif'; q.fillStyle = '#000'; q.fillText(ch, 0, 10);
      const d = q.getImageData(0, 0, RW, H).data; let mx = 0;
      for (let y = 0; y < H; y++) for (let x = 0; x < RW; x++) if (d[(y * RW + x) * 4 + 3] > 110) { px.push([x, y]); mx = Math.max(mx, x + 1); }
      w = mx || 3;
      if (!px.length) { w = 5; add(['#####', '#...#', '#...#', '#...#', '#...#', '#...#', '#####'], 0, 2); }  // vraiment inconnue : une petite case
    }
    g = { w, px }; glyphs.set(ch, g); return g;
  }
  function layout(text) {
    let x = 0; const items = [];
    for (const ch of String(text)) for (const c of SUB[ch] ?? ch) { const g = glyph(c); items.push([g, x]); x += g.w + 1; }
    return { w: Math.max(0, x - 1), items };
  }
  function draw(g, text, x, y, color, s = 1) {  // (x, y) : coin haut gauche de la case
    const L = layout(text); g.fillStyle = color;
    for (const [gl, ox] of L.items) for (const [px, py] of gl.px) g.fillRect(x + (ox + px) * s, y + py * s, s, s);
    return L.w * s;
  }
  const bmp = new Map();
  function sprite(text, color, s = 1) {  // le texte tout prêt, gardé pour les images suivantes du jeu
    const k = text + '|' + color + '|' + s; let c = bmp.get(k); if (c) return c;
    c = document.createElement('canvas'); c.width = Math.max(1, layout(text).w * s); c.height = H * s; draw(c.getContext('2d'), text, 0, 0, color, s);
    if (bmp.size > 400) bmp.delete(bmp.keys().next().value);
    bmp.set(k, c); return c;
  }
  // comme fillText : (x, y) sur la ligne de base, aligné à gauche, au centre ou à droite
  function fill(g, text, x, y, color, s = 1, align = 'left') {
    const c = sprite(String(text), color, s), dx = align === 'center' ? -c.width / 2 : align === 'right' ? -c.width : 0;
    g.drawImage(c, Math.round(x + dx), Math.round(y - 9 * s));
  }
  const scale = size => Math.max(1, Math.round((size || 8) / 8));
  function art(rows, pal, s = 1) {  // un dessin en lignes de caractères, chaque caractère une couleur de la palette (« . » : transparent)
    const c = document.createElement('canvas'); c.width = Math.max(...rows.map(r => r.length)) * s; c.height = rows.length * s;
    const g = c.getContext('2d');
    rows.forEach((r, y) => { for (let x = 0; x < r.length; x++) { const col = pal[r[x]]; if (col) { g.fillStyle = col; g.fillRect(x * s, y * s, s, s); } } });
    return c;
  }
  return { H, layout, draw, sprite, fill, scale, art };
})();

// les pièces de l'interface, pixel par pixel (K : contour, les autres lettres : la palette du jeu)
const PX_PANEL = ['..KKKKKKKKKKKK..', '.KAAAAAAAAAAAAK.', 'KALAAAAAAAAAALSK', 'KAAKKKKKKKKKKSSK', 'KAAKHHHHHHHHKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK',
  'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKKKKKKKKKKSSK', 'KALSSSSSSSSSSLSK', '.KSSSSSSSSSSSSK.', '..KKKKKKKKKKKK..'];
const PX_CARD = ['.KKKKKKKKKK.', 'KFFFFFFFFFFK', 'KFHHHHHHHHFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFSSSSSSSSFK', 'KFFFFFFFFFFK', '.KKKKKKKKKK.'];
const PX_BTN = ['.KKKKKKKKKK.', 'KWWWWWWWWWWK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK', 'KDDDDDDDDDDK', '.KKKKKKKKKK.'];
const PX_BTN_DOWN = ['............', '............', '.KKKKKKKKKK.', 'KBBBBBBBBBBK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KWWWWWWWWWWK', '.KKKKKKKKKK.'];
const PX_TRACK = ['.KKKKKKKKKK.', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KHHHHHHHHHHK', '.KKKKKKKKKK.'];
const PX_KNOB = ['.KKKKK.', 'KWWWWWK', 'KWAAABK', 'KWAAABK', 'KKKKKKK', 'KWAAABK', 'KWAAABK', 'KBBBBBK', 'KDDDDDK', '.KKKKK.'];
const PX_RAIL = ['KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDHHDDK'];
const PX_ICONS = {
  play: ['kk......', 'kakk....', 'kaaakk..', 'kaaaaakk', 'kaaaaaak', 'kaaaaakk', 'kaaakk..', 'kakk....', 'kk......'],
  full: ['www...www', 'w.......w', 'w.......w', '.........', '....a....', '.........', 'w.......w', 'w.......w', 'www...www'],
  note: ['...aaaaaa', '...aaaaaa', '...a....a', '...a....a', '...a....a', '.aaa..aaa', 'aaaa.aaaa', 'aaaa.aaaa', '.aa...aa.'],
  star: ['....g....', '....g....', '...ggg...', 'ggggwgggg', '.ggwwwgg.', '..ggggg..', '..oo.oo..', '.oo...oo.', '.o.....o.'],
  crown: ['g...g...g', 'gg.ggg.gg', 'ggggggggg', 'grgggggrg', 'ggggggggg', 'ooooooooo'],
  folder: ['oooo.....', 'oggoooooo', 'ggggggggg', 'ggggggggg', 'ggggggggg', 'ggggggggg', 'ooooooooo'],
  vol: ['....w....', '...ww..b.', 'wwwww.b.b', 'wwwww.b.b', 'wwwww.b.b', 'wwwww.b.b', '...ww..b.', '....w....'],
  clock: ['..wwwww..', '.w.....w.', 'w...a...w', 'w...a...w', 'w...aaa.w', 'w.......w', 'w.......w', '.w.....w.', '..wwwww..'],
  cursor: ['....a....', '..aaaaa..', '.a..a..a.', '.a.....a.', 'aaa.w.aaa', '.a.....a.', '.a..a..a.', '..aaaaa..', '....a....'],
  plus: ['...b...', '...b...', '...b...', 'bbbbbbb', '...b...', '...b...', '...b...'],
  down: ['wwwwwww', '.wwwww.', '..www..', '...w...'],
};

/* habille la page du jeu : root = son conteneur, T = sa palette, icons = [motif du texte, icône] pour les boutons et libellés */
function pxSkin(root, { T, icons = [], emblem, title }) {
  root.classList.add('pxk'); const s = 2, url = c => c.toDataURL();
  const btnPal = (M, W, B, D) => ({ K: T.k, W, M, B, D });
  const BN = btnPal(T.btn, T.btnHi, T.btnLo, T.k2), BH = btnPal(T.btnHov, T.btnHovHi, T.btnLo, T.k2);
  const BA = btnPal(T.acc, T.accL, T.accS, T.accD), BAH = btnPal(T.accL, '#ffffff', T.acc, T.accD);
  const img = { panel: PXK.art(PX_PANEL, { K: T.k, A: T.acc, S: T.accS, L: T.rivet, H: T.hl, D: T.fill }, s),
    card: PXK.art(PX_CARD, { K: T.k, F: T.line, H: T.hl, D: T.fill, S: T.k2 }, s), cardOn: PXK.art(PX_CARD, { K: T.k, F: T.acc, H: T.accS, D: T.fillOn, S: T.accD }, s),
    btn: PXK.art(PX_BTN, BN, s), btnH: PXK.art(PX_BTN, BH, s), btnD: PXK.art(PX_BTN_DOWN, BH, s),
    main: PXK.art(PX_BTN, BA, s), mainH: PXK.art(PX_BTN, BAH, s), mainD: PXK.art(PX_BTN_DOWN, BA, s),
    track: PXK.art(PX_TRACK, { K: T.k, D: T.k2, H: T.line }, s), knob: PXK.art(PX_KNOB, { K: T.k, W: T.accL, A: T.acc, B: T.accS, D: T.accD }, s),
    rail: PXK.art(PX_RAIL, { K: T.k, D: T.k2, H: T.line }, s), tile: PXK.art(T.tile, { x: T.bgDot, ':': T.bgDot2, '+': T.spark, '*': T.spark2 }, s) };
  const u = Object.fromEntries(Object.entries(img).map(([k, c]) => [k, url(c)]));
  const nine = (k, sl) => `border-style:solid;border-width:${sl * s}px;border-image:url(${u[k]}) ${sl * s} fill / ${sl * s}px stretch`;
  const IP = { k: T.k, w: T.text, a: T.acc, b: T.acc2, g: T.gold, o: T.orange, r: T.red, n: T.green, N: T.green2, m: T.muted, s: T.accS };
  const iconUrl = new Map(), icon = name => {
    let v = iconUrl.get(name); if (!v) { const c = PXK.art(PX_ICONS[name] || emblem, IP, s); v = { u: url(c), w: c.width, h: c.height }; iconUrl.set(name, v); }
    const b = document.createElement('b'); b.className = 'pxI'; b.setAttribute('aria-hidden', 'true'); b.style.cssText = `width:${v.w}px;height:${v.h}px;background-image:url(${v.u})`; return b;
  };
  const R = '.pxk.pxk';
  const css = document.createElement('style');
  css.textContent = `html,html body{background:${T.bg} url(${u.tile}) 0 0/${img.tile.width}px ${img.tile.height}px repeat!important}
::-webkit-scrollbar{width:16px;height:16px} ::-webkit-scrollbar-track{background:url(${u.rail}) 0 0/16px 8px repeat-y} ::-webkit-scrollbar-thumb{${nine('main', 4)}} ::-webkit-scrollbar-corner{background:none}
${R}{color:${T.text}}
${R} .px{box-shadow:none;background:none}
${R} .agHead{gap:18px;margin:0}
${R} .agHead .label{display:flex;align-items:center;gap:12px}
${R} .btn,${R} .tab{${nine('btn', 4)};height:auto;min-height:0;padding:0 6px 4px;margin:0;color:${T.text};font:12px/1 monospace;display:inline-flex;align-items:center;gap:6px;filter:none;text-shadow:none;letter-spacing:0;cursor:var(--cp,pointer)}
${R} .btn:hover,${R} .tab:hover{border-image-source:url(${u.btnH})}
${R} .btn:active,${R} .tab:active{border-image-source:url(${u.btnD});padding:4px 6px 0}
${R} .btn.main,${R} .tab.on{border-image-source:url(${u.main});color:${T.k}}
${R} .btn.main:hover,${R} .tab.on:hover{border-image-source:url(${u.mainH})}
${R} .btn.main:active,${R} .tab.on:active{border-image-source:url(${u.mainD})}
${R} .btn:focus-visible,${R} .tab:focus-visible{outline:2px dashed ${T.acc2};outline-offset:2px}
${R} .btn .pxV,${R} .tab .pxV{white-space:nowrap}
${R} .sysCard{${nine('card', 4)};padding:4px 6px;gap:8px;background:none}
${R} .sysCard.on{border-image-source:url(${u.cardOn})}
${R} .sysCard.on>b{color:${T.acc}}
${R} .sysCard>b{color:${T.text}}
${R} .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
${R} .gameBox,${R} .thBox{${nine('panel', 5)};box-shadow:none;background:none;padding:2px;gap:8px;grid-template-rows:auto auto}
${R} .gameBox canvas,${R} .thBox canvas{display:block;background:#05010b}
${R} .gameBox:fullscreen,${R} .thBox:fullscreen{border:0;padding:0;background:#000}
${R} .rhFs{position:static;opacity:1;justify-self:end;margin:0 6px 6px 0}
${R} .rhTabs{gap:8px;flex-wrap:wrap}
${R} .hint{color:${T.muted};line-height:24px}
${R} label{color:${T.muted};display:inline-flex;align-items:center;gap:8px}
${R} .rhDel{color:${T.red};top:6px;right:8px}
${R} input[type=range]{-webkit-appearance:none;appearance:none;background:none;height:20px;width:150px}
${R} input[type=range]::-webkit-slider-runnable-track{height:12px;${nine('track', 2)}}
${R} input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:20px;border:0;background:url(${u.knob}) 0 0/100% 100%;margin-top:-8px;cursor:var(--cp,pointer)}
${R} .pxSel{justify-content:space-between;gap:10px;max-width:100%;overflow:hidden}
${R} .rhImport .pxSel{flex:1;min-width:0}
.pxMenu{position:fixed;z-index:50;${nine('card', 4)};padding:2px;max-height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:2px;color:${T.text}}
.pxMenu button{all:unset;padding:3px 8px;cursor:var(--cp,pointer);white-space:nowrap}
.pxMenu button:hover,.pxMenu button:focus-visible,.pxMenu button.on{background:${T.btnHov};color:${T.text}}
.pxMenu button.on{color:${T.acc}}
.pxT{position:relative;white-space:normal;font:12px/1 monospace;letter-spacing:0;text-transform:none}
.pxT i{display:inline-block;vertical-align:middle;background:currentColor;-webkit-mask:var(--m) 0 0/100% 100% no-repeat;mask:var(--m) 0 0/100% 100% no-repeat;image-rendering:pixelated}
.pxI{display:inline-block;vertical-align:middle;background:0 0/100% 100% no-repeat;image-rendering:pixelated;margin-right:6px}
.pxV>.pxI+.pxI{margin-left:-4px}
.pxSr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}`;
  document.head.append(css);
  // un mot = une image (en masque : sa couleur suit celle du texte), une règle par mot pour ne pas répéter l'image
  const words = new Map(), sheet = document.head.appendChild(document.createElement('style')).sheet;
  const word = w => {
    let k = words.get(w);
    if (!k) { const c = PXK.sprite(w, '#fff', s); k = 'pw' + words.size; words.set(w, k); sheet.insertRule(`.${k}{--m:url(${c.toDataURL()});width:${c.width}px;height:${c.height}px}`, sheet.cssRules.length); }
    const i = document.createElement('i'); i.className = k; return i;
  };
  function render(vis, text, lead) {
    const parts = [], ic = lead && icons.find(([re]) => re.test(text.trim()));
    if (ic) parts.push(icon(ic[1]));
    for (const m of text.matchAll(/(★+)|(\s+)|([^\s★]+)/g)) {
      if (m[1]) for (const _ of m[1]) parts.push(icon('star'));
      else if (m[2]) parts.push(document.createTextNode(' '));
      else parts.push(word(m[3]));
    }
    vis.replaceChildren(...parts);
  }
  const lead = node => node.parentElement?.matches('button,label,.tab,.btn') && !node.previousSibling;
  function pixText(node) {  // le texte reste dans la page (lecteur d'écran, copier) ; on voit ses lettres en pixels
    const wrap = document.createElement('span'), sr = document.createElement('span'), vis = document.createElement('span');
    wrap.className = 'pxT'; sr.className = 'pxSr'; vis.className = 'pxV'; vis.setAttribute('aria-hidden', 'true');
    const first = lead(node); node.replaceWith(wrap); sr.append(node); wrap.append(sr, vis); render(vis, node.data, first);
  }
  function pxSelect(sel) {  // une liste déroulante en pixels ; la vraie reste cachée et garde sa valeur et ses événements
    sel.dataset.px = '1'; sel.style.display = 'none';
    const b = document.createElement('button'), lab = document.createElement('span'); b.type = 'button'; b.className = 'btn pxSel'; b.append(lab, icon('down')); sel.after(b);
    const sync = () => { const t = sel.selectedOptions[0]?.textContent || '—'; if (lab.dataset.t !== t) { lab.dataset.t = t; lab.textContent = t; } };
    const d = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    Object.defineProperty(sel, 'value', { configurable: true, get() { return d.get.call(this); }, set(v) { d.set.call(this, v); sync(); } });
    new MutationObserver(sync).observe(sel, { childList: true, subtree: true, characterData: true, attributes: true });
    sel.addEventListener('change', sync);
    b.onclick = () => {
      document.querySelector('.pxMenu')?.remove();
      const m = document.createElement('div'), r = b.getBoundingClientRect(); m.className = 'pxMenu'; m.setAttribute('role', 'listbox');
      for (const o of sel.options) {
        const it = document.createElement('button'); it.type = 'button'; it.textContent = o.textContent; it.className = o.selected ? 'on' : ''; it.setAttribute('role', 'option');
        it.onclick = () => { sel.value = o.value; sel.dispatchEvent(new Event('input', { bubbles: true })); sel.dispatchEvent(new Event('change', { bubbles: true })); close(); b.focus(); };
        m.append(it);
      }
      root.append(m);
      const below = innerHeight - r.bottom; m.style.minWidth = r.width + 'px'; m.style.left = Math.min(r.left, innerWidth - m.offsetWidth - 4) + 'px';
      m.style.top = (below > m.offsetHeight + 8 || below > r.top ? r.bottom + 2 : r.top - m.offsetHeight - 2) + 'px';
      const close = () => { m.remove(); removeEventListener('pointerdown', out, true); removeEventListener('keydown', key, true); removeEventListener('blur', close); };
      const out = e => { if (!m.contains(e.target) && e.target !== b && !b.contains(e.target)) close(); };
      const key = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); b.focus(); } };
      addEventListener('pointerdown', out, true); addEventListener('keydown', key, true); addEventListener('blur', close);
      (m.querySelector('.on') || m.firstChild)?.focus();
    };
    sync();
  }
  const SKIP = 'select,option,textarea,script,style,canvas,.pxT,[data-pxskip]';
  let queued = false;
  function pass() {
    queued = false;
    root.querySelectorAll('select.gSel:not([data-px])').forEach(pxSelect);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), todo = [];
    for (let n; (n = w.nextNode());) if (n.data.trim() && n.parentElement && !n.parentElement.closest(SKIP)) todo.push(n);
    todo.forEach(pixText);
  }
  new MutationObserver(ms => {
    for (const m of ms) if (m.type === 'characterData') { const wrap = m.target.parentNode?.closest?.('.pxT'); if (wrap) render(wrap.lastChild, m.target.data, false); }
    if (!queued) { queued = true; queueMicrotask(pass); }
  }).observe(root, { childList: true, subtree: true, characterData: true });
  // le titre : grosses lettres à contour, trois tons, et l'emblème du jeu
  const lab = root.querySelector('.agHead .label');
  if (lab) {
    const L = PXK.layout(title), c = document.createElement('canvas'), g = c.getContext('2d'), on = [];
    c.width = L.w + 3; c.height = PXK.H + 3;
    for (const [gl, ox] of L.items) for (const [x, y] of gl.px) on.push([ox + x + 1, y + 1]);
    g.fillStyle = T.k; for (const [x, y] of on) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [2, 2], [1, 2], [2, 1]]) g.fillRect(x + dx, y + dy, 1, 1);
    for (const [x, y] of on) { g.fillStyle = y <= 5 ? T.accL : y <= 7 ? T.acc : T.accS; g.fillRect(x, y, 1, 1); }
    const big = document.createElement('canvas'), z = 4; big.width = c.width * z; big.height = c.height * z;
    const bg = big.getContext('2d'); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, big.width, big.height);
    const t = document.createElement('b'); t.className = 'pxI'; t.style.cssText = `width:${big.width}px;height:${big.height}px;background-image:url(${big.toDataURL()})`;
    const e = PXK.art(emblem, IP, 3), em = document.createElement('b'); em.className = 'pxI'; em.style.cssText = `width:${e.width}px;height:${e.height}px;background-image:url(${e.toDataURL()})`;
    const sr = document.createElement('span'); sr.className = 'pxSr'; sr.textContent = lab.textContent;
    lab.dataset.pxskip = '1'; lab.replaceChildren(em, t, sr);
  }
  pass();
}

export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const host = ctx.host, { el, toast, sfx } = host;
  const folder = ctx.folder;
  host.addStyle(CSS);
  view.innerHTML = HTML;
  pxSkin(view.querySelector('.appWrap'), { title: "MINEUR", T: {"k": "#0a0604", "k2": "#160e08", "fill": "#22160c", "fillOn": "#2e1e10", "hl": "#3a2614", "line": "#5a3a1a", "acc": "#ffd84a", "accL": "#fff4b0", "accS": "#c49a1a", "accD": "#4a3a06", "rivet": "#fff4b0", "btn": "#3a2614", "btnHi": "#6a4a24", "btnLo": "#160e08", "btnHov": "#4a3018", "btnHovHi": "#8a5e2e", "text": "#fff4e0", "muted": "#c8a880", "acc2": "#ff4a6a", "gold": "#ffd84a", "orange": "#ffa030", "red": "#ff4a5a", "green": "#7ee07a", "green2": "#2f8a3a", "bg": "#0c0804", "bgDot": "#22160c", "bgDot2": "#160e08", "spark": "#5a3a1a", "spark2": "#ff4a6a", "tile": ["................", "...:............", "................", "..........+.....", "................", "................", ".....:..........", "................", "................", ".............:..", "................", "..+.............", "................", ".........:......", "................", "................"]},
  emblem: ["............", "..kkkkk.....", ".kgggggk....", ".kgwwggk....", "kkkgggkkkk..", "kggggggggk..", "kkkkkkkkkk..", ".kmk..kmk...", ".kkk..kkk...", "oooooooooooo", "ooorooooooro", "oooooooobooo"],
  icons: [[/^NOUVELLE/, "play"], [/^RECORDS/, "crown"]] });
  const $ = id => view.querySelector('#' + id) || document.getElementById(id);
  const doc = async n => { try { return await folder.read(n); } catch { return null; } };
  const games = { best: {}, ...(await doc('games')) };
  let gamesTimer = null;
  const saveGames = () => { clearTimeout(gamesTimer); gamesTimer = setTimeout(() => { gamesTimer = null; folder.write('games', games).catch(() => {}); }, 500); };
  const best = (k, v) => { const b = games.best[k]; if (b == null || v > b) { games.best[k] = v; saveGames(); return true; } return false; };
  const gstore = (k, init) => (games[k] ??= init);
function gameLoop(st, appKey, update, draw) {
  cancelAnimationFrame(st.raf);
  const STEP = 1000 / 60; let acc = 0, last = performance.now();
  const frame = t => {
    if (!view.classList.contains('on')) { st.raf = 0; if (st.mode === 'play') st.mode = 'pause'; return; }  // leaving the tab pauses the game
    st.raf = requestAnimationFrame(frame);
    acc += Math.min(200, t - last); last = t;
    while (acc >= STEP) { if (st.mode === 'play') update(); st.tick++; acc -= STEP; }
    draw();
  };
  st.raf = requestAnimationFrame(frame);
}
function gameText(g, w, lines, y0) {  // lignes centrées en police pixel, sur une bande sombre
  g.fillStyle = 'rgba(11,3,28,.72)'; g.fillRect(0, y0 - 14, w, lines.length * 14 + 14);
  lines.forEach(([text, color, size], i) => PXK.fill(g, text, w / 2, y0 + i * 14, color, PXK.scale(size), 'center'));
}
const px = (g, color, x, y, w = 1, h = 1) => { g.fillStyle = color; g.fillRect(Math.round(x), Math.round(y), w, h); };
function sprite(g, rows, x, y, pal) { rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const c = pal[r[i]]; if (c) px(g, c, x + i, y + j); } }); }
const seeded = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const pxFont = (g, text, x, y, color, size = 8, align = 'left') => { const s = PXK.scale(size); PXK.fill(g, text, x + s, y + s, '#05010b', s, align); PXK.fill(g, text, x, y, color, s, align); };

const clock = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
// petits outils communs aux jeux : une toile pré-dessinée, la position du pointeur dans le canevas, un bip
const cnv = (w, h, fn) => { const c = el('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); g.imageSmoothingEnabled = false; fn(g); return c; };
const spr = (rows, pal) => cnv(Math.max(...rows.map(r => r.length)), rows.length, g => sprite(g, rows, 0, 0, pal));
const W = 240, H = 204, cv = $('gc'), g = cv.getContext('2d'); g.imageSmoothingEnabled = false;
const cpos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; };
let actx = null;
const beep = (f, d = .1, type = 'square', slide = 0, vol = .08) => { try { actx ??= new AudioContext(); const o = actx.createOscillator(), gn = actx.createGain(), t = actx.currentTime; o.type = type; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d); gn.gain.setValueAtTime(vol, t); gn.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(gn).connect(actx.destination); o.start(t); o.stop(t + d + .02); } catch {} };
const keyOk = e => view.classList.contains('on') && !/INPUT|SELECT|TEXTAREA/.test(e.target.tagName);
const showStats = rows => $('gStats').replaceChildren(...rows.flatMap(([a, b]) => [el('span', '', a), el('b', '', String(b))]));

/* ---------- Mineur : creuser toujours plus bas, remonter les minerais, les vendre à la surface et améliorer sa machine. Gare au carburant et à la lave. ---------- */
const MN = {T: 12, COLS: 20, ROWS: 90, SURF: 3, VIEW: 15};
const MN_ORES = [{n: 'Cuivre', v: 5, c: '#e08a4a', d: 0}, {n: 'Fer', v: 12, c: '#c8c8d8', d: 8}, {n: 'Argent', v: 30, c: '#e8f0ff', d: 20}, {n: 'Or', v: 70, c: '#ffd84a', d: 35}, {n: 'Rubis', v: 160, c: '#ff4a6a', d: 55}, {n: 'Saphir', v: 320, c: '#5a8aff', d: 72}];
const mns = gstore('mineur', {deep: 0, cash: 0});
let mn = null;
// 0 vide, 1 terre, 2 roche dure, 3 lave, 10+i minerai i
function mnWorld(seed) {
  const r = seeded(seed), w = Array.from({length: MN.ROWS}, (_, y) => Array.from({length: MN.COLS}, () => y < MN.SURF ? 0 : 1));
  for (let y = MN.SURF + 1; y < MN.ROWS; y++) for (let x = 0; x < MN.COLS; x++) {
    const k = r(), depth = y - MN.SURF;
    if (k < .04 + depth / 500) w[y][x] = 2; else if (depth > 30 && k < .06 + depth / 900) w[y][x] = 3; else if (k < .26) { const ok = MN_ORES.map((o, i) => [o, i]).filter(([o]) => depth >= o.d); const [, i] = ok[Math.floor(Math.pow(r(), .7) * ok.length)]; w[y][x] = 10 + i; }
    if (k > .97) w[y][x] = 0;  // des poches vides
  }
  return w;
}
function mnNew() {
  mn = Object.assign(mn || {tick: 0, raf: 0}, {mode: 'play', w: mnWorld(Math.floor(Math.random() * 1e9)), x: 4, y: MN.SURF - 1, fx: 4, fy: MN.SURF - 1, tank: 60, fuel: 60, hold: 8, bag: [], drill: 1, cash: 0, deep: 0, dig: null, msg: '', msgAt: -999, fall: 0, keys: {}, lastMove: 0, cam: 0});
  mnInfo();
}
const mnSay = t => { mn.msg = t; mn.msgAt = mn.tick; };
const MN_UP = [['Réservoir', 'tank', 30, t => 40 + t * 2], ['Soute', 'hold', 4, h => 30 + h * 6], ['Foret', 'drill', 1, d => 150 * d * d]];
function mnBuy(i) {
  const [name, key, add, cost] = MN_UP[i], price = Math.round(cost(mn[key]));
  if (key === 'drill' && mn.drill >= 3) return mnSay('Foret au maximum');
  if (mn.y >= MN.SURF) return mnSay('Les achats se font à la surface');
  if (mn.cash < price) return mnSay(name + ' : il faut ' + price + ' $');
  mn.cash -= price; mn[key] += add; if (key === 'tank') mn.fuel = mn.tank; beep(880, .1, 'triangle', 1320, .07); mnSay(name + ' amélioré !'); mnInfo();
}
function mnSurface() {  // à la surface : on vend tout et on refait le plein
  if (mn.bag.length) { const v = mn.bag.reduce((a, i) => a + MN_ORES[i].v, 0); mn.cash += v; mnSay('Vendu : ' + v + ' $'); mn.bag = []; [660, 880].forEach((f, i) => setTimeout(() => beep(f, .08, 'triangle'), i * 80)); }
  const need = Math.ceil(mn.tank - mn.fuel), pay = Math.min(need, mn.cash); if (pay > 0) { mn.cash -= pay; mn.fuel += pay; }
  if (mn.fuel < 3 && mn.cash <= 0) mn.fuel = 20;  // jamais bloqué en haut sans rien
  if (mn.cash > mns.cash) mns.cash = mn.cash; saveGames(); mnInfo();
}
function mnRescue(why) { mn.bag = []; mn.x = 4; mn.y = MN.SURF - 1; mn.fx = mn.x; mn.fy = mn.y; mn.fuel = Math.max(15, mn.fuel); mn.cash = Math.max(0, mn.cash - 25); mnSay(why + ' : secours, -25 $, soute perdue'); beep(140, .5, 'sawtooth', 60, .08); mnInfo(); }
function mnTry(dx, dy) {
  const nx = mn.x + dx, ny = mn.y + dy; if (nx < 0 || nx >= MN.COLS || ny < 0 || ny >= MN.ROWS) return;
  const t = mn.w[ny][nx];
  if (dy < 0 && t !== 0) return;  // on ne creuse pas vers le haut
  if (t === 0) { if (dy < 0) { if (mn.fuel < .5) return; mn.fuel -= .5; } mn.x = nx; mn.y = ny; return; }
  if (t === 3) { mn.w[ny][nx] = 0; return mnRescue('La lave'); }
  if (mn.fuel < 1) return mnRescue('Panne sèche');
  const hard = t === 2 ? Math.max(1, 4 - mn.drill) : 1;
  mn.dig = {x: nx, y: ny, n: 0, need: hard * 8}; mn.fuel -= hard;
}
function mnUpdate() {
  const m = mn;
  if (m.dig) { if (++m.dig.n >= m.dig.need) { const t = m.w[m.dig.y][m.dig.x]; if (t >= 10) { if (m.bag.length < m.hold) { m.bag.push(t - 10); beep(700 + (t - 10) * 120, .05, 'square', 0, .05); } else mnSay('Soute pleine : remonte vendre'); } else beep(160 + Math.random() * 60, .03, 'square', 0, .04); m.w[m.dig.y][m.dig.x] = 0; m.x = m.dig.x; m.y = m.dig.y; m.dig = null; } }
  else if (m.y + 1 < MN.ROWS && m.w[m.y + 1][m.x] === 0 && !m.keys.up) { if (++m.fall >= 4) { m.y++; m.fall = 0; } }
  else if (m.tick - m.lastMove >= 7) { const k = m.keys, d = k.left ? [-1, 0] : k.right ? [1, 0] : k.down ? [0, 1] : k.up ? [0, -1] : null; if (d) { mnTry(...d); m.lastMove = m.tick; } }
  m.fx += (m.x - m.fx) * .35; m.fy += (m.y - m.fy) * .35;
  const depth = Math.max(0, m.y - MN.SURF + 1); if (depth > m.deep) { m.deep = depth; if (depth > mns.deep) { mns.deep = depth; saveGames(); } mnInfo(); }
  if (m.y < MN.SURF && !m.wasUp) mnSurface(); m.wasUp = m.y < MN.SURF;
  if (m.fuel <= 0 && m.y >= MN.SURF && !m.dig) mnRescue('Panne sèche');
  m.cam += (Math.max(0, m.fy - 6) - m.cam) * .15;
}
const MN_DIRT = [0, 1, 2].map(v => cnv(12, 12, b => { const r = seeded(v + 3); px(b, '#6a4428', 0, 0, 12, 12); for (let i = 0; i < 12; i++) px(b, r() < .5 ? '#7a5030' : '#55361e', Math.floor(r() * 12), Math.floor(r() * 12), 2, 1); }));
const MN_ROCK = cnv(12, 12, b => { px(b, '#4a4a5a', 0, 0, 12, 12); px(b, '#6a6a7a', 1, 1, 5, 4); px(b, '#5a5a6a', 6, 6, 5, 5); px(b, '#2a2a3a', 0, 5, 7, 1); px(b, '#2a2a3a', 6, 5, 1, 7); px(b, '#8a8a9a', 2, 1, 2, 1); });
const MN_LAVA = [0, 1].map(f => cnv(12, 12, b => { px(b, '#c02a10', 0, 0, 12, 12); for (let i = 0; i < 6; i++) px(b, '#ffa030', (i * 5 + f * 3) % 11, (i * 7 + f * 2) % 11, 2, 1); px(b, '#ffe080', 3 + f * 4, 5, 1, 1); }));
const MN_ORE = MN_ORES.map((o, i) => cnv(12, 12, b => { b.drawImage(MN_DIRT[i % 3], 0, 0); for (const [x, y] of [[2, 3], [7, 2], [4, 7], [8, 8]]) { px(b, '#05010b', x - 1, y - 1, 4, 4); px(b, o.c, x, y, 2, 2); px(b, '#ffffff', x, y, 1, 1); } }));
const MN_RIG = spr(['...kkkk.....', '..kyyyyk....', '..kywwyk....', 'kkkyyyykkk..', 'kyyyyyyyyykk', 'kyoyyyyyyyGk', 'kkkkkkkkkkGk', '.kGk..kGk.k.', '.kkk..kkk...'], {k: '#05010b', y: '#ffd84a', w: '#8ad8ff', o: '#ff9a3d', G: '#8a8aa8'});
function mnDraw() {
  const m = mn, oy = Math.round(m.cam * MN.T), r0 = Math.floor(m.cam), top = 22;
  for (let y = 0; y < H; y++) px(g, y < top ? '#140c20' : '#1a0e08', 0, y, W, 1);
  for (let ry = r0; ry < r0 + MN.VIEW + 2 && ry < MN.ROWS; ry++) for (let x = 0; x < MN.COLS; x++) {
    const t = m.w[ry][x], X = x * MN.T, Y = top + ry * MN.T - oy; if (Y > H || Y < top - MN.T) continue;
    if (ry < MN.SURF) { px(g, ry === MN.SURF - 1 ? '#2a3a6a' : '#1a2450', X, Y, MN.T, MN.T); continue; }
    if (t === 0) { px(g, '#120a06', X, Y, MN.T, MN.T); if (m.w[ry - 1]?.[x] && ry > MN.SURF) px(g, '#0a0604', X, Y, MN.T, 2); continue; }
    g.drawImage(t === 1 ? MN_DIRT[(x * 7 + ry * 3) % 3] : t === 2 ? MN_ROCK : t === 3 ? MN_LAVA[Math.floor(m.tick / 15 + x) % 2] : MN_ORE[t - 10], X, Y);
    if (ry === MN.SURF) px(g, '#3a8a3a', X, Y, MN.T, 3);
  }
  // la surface : la boutique et le dépôt de carburant
  const sy = top + (MN.SURF - 1) * MN.T - oy;
  if (sy > top - 30) { px(g, '#05010b', 150, sy - 14, 40, 26); px(g, '#8a5428', 151, sy - 13, 38, 24); px(g, '#ff4a5a', 151, sy - 13, 38, 5); pxFont(g, '$', 170, sy + 6, '#ffd84a', 8, 'center'); px(g, '#05010b', 200, sy - 6, 14, 18); px(g, '#c02a2a', 201, sy - 5, 12, 16); px(g, '#ffffff', 204, sy - 2, 6, 2); }
  if (m.dig && m.tick % 4 < 2) px(g, '#ffd84a', m.dig.x * MN.T + 5, top + m.dig.y * MN.T - oy + 5, 2, 2);
  const X = Math.round(m.fx * MN.T), Y = Math.round(top + m.fy * MN.T - oy) + 3; g.drawImage(MN_RIG, X, Y - (m.dig ? (m.tick % 4 < 2 ? 1 : 0) : 0));
  // le tableau de bord
  px(g, '#05010b', 0, 0, W, top - 1);
  pxFont(g, m.cash + ' $', 4, 9, '#ffd84a', 6); pxFont(g, 'prof. ' + Math.max(0, m.y - MN.SURF + 1) + ' m', 4, 18, '#c8b8a0', 6);
  px(g, '#2a1a2a', 80, 4, 60, 5); px(g, m.fuel / m.tank > .25 ? '#5fdf6a' : '#ff4a5a', 80, 4, Math.round(60 * m.fuel / m.tank), 5); pxFont(g, 'carburant', 110, 18, '#8a7a6a', 6, 'center');
  for (let i = 0; i < m.hold; i++) { const o = m.bag[i]; px(g, o != null ? MN_ORES[o].c : '#2a1a2a', 150 + (i % 12) * 7, 4 + Math.floor(i / 12) * 7, 5, 5); }
  if (m.tick - m.msgAt < 150) pxFont(g, m.msg, W / 2, H - 6, '#ffffff', 6, 'center');
}
const MN_KEYS = {ArrowLeft: 'left', ArrowRight: 'right', ArrowDown: 'down', ArrowUp: 'up', q: 'left', a: 'left', d: 'right', s: 'down', z: 'up', w: 'up'};
document.addEventListener('keydown', e => { if (!keyOk(e) || !mn) return; const k = MN_KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key]; if (k) { e.preventDefault(); if (!mn.keys[k]) mn.lastMove = -99; mn.keys[k] = true; } const b = '123'.indexOf(e.key); if (b >= 0) mnBuy(b); });
document.addEventListener('keyup', e => { if (!mn) return; const k = MN_KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key]; if (k) mn.keys[k] = false; });
cv.onpointerdown = e => { e.preventDefault(); if (!mn) return; const [x, y] = cpos(e), dx = x - (mn.x * MN.T + 6), dy = y - (22 + mn.y * MN.T - mn.cam * MN.T + 6); mn.keys = Math.abs(dx) > Math.abs(dy) ? {[dx < 0 ? 'left' : 'right']: true} : {[dy < 0 ? 'up' : 'down']: true}; mn.lastMove = -99; cv.setPointerCapture(e.pointerId); };
cv.onpointerup = () => { if (mn) mn.keys = {}; };
function mnInfo() {
  showStats([['Plus profond', mns.deep + ' m'], ['Plus riche', mns.cash + ' $'], ['Cette partie', mn ? mn.deep + ' m · ' + mn.cash + ' $' : '—']]);
  if (!mn) return; MN_UP.forEach(([name, key, , cost], i) => { const b = $('mnUp' + i); b.textContent = name.toUpperCase() + ' · ' + (key === 'drill' && mn.drill >= 3 ? 'MAX' : Math.round(cost(mn[key])) + ' $'); });
}
MN_UP.forEach((_, i) => $('mnUp' + i).onclick = () => { mnBuy(i); $('mnUp' + i).blur(); });
$('gNew').onclick = () => { mnNew(); $('gNew').blur(); };
{  // vérification : le monde a de la terre sous la surface et des minerais plus chers en profondeur ; creuser coûte du carburant
  const w = mnWorld(5), deep = w.slice(70).flat().filter(t => t >= 10).map(t => MN_ORES[t - 10].v), top = w.slice(3, 12).flat().filter(t => t >= 10).map(t => MN_ORES[t - 10].v), avg = a => a.reduce((s, v) => s + v, 0) / a.length;
  const keep = mn; mn = null; mnNew(); const f0 = mn.fuel; mn.w[MN.SURF][4] = 1; mnTry(0, 1); const used = f0 - mn.fuel;
  console.assert(w[2].every(t => t === 0) && avg(deep) > avg(top) * 3 && used === 1 && mn.dig, 'mineur'); mn = keep;
}
ctx.onOpen(() => { if (!mn) mnNew(); gameLoop(mn, 'mineur', mnUpdate, mnDraw); mnInfo(); });

}
