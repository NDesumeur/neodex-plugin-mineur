// lancé par le test « local » de NeoDex : la vérification interne, creuser au clavier (avec le bruit du foret), vendre (la caisse),
// la mine profonde (couches, roche noire, nouveaux minerais), le plein écran et la place prise (avec NEO_SHOTS : garde des images du jeu)
module.exports = async ({ pj, sleep }) => {
  const C = code => pj(`(() => { const T = document.getElementById('gc').__mn, mn = T.st(); ${code} })()`);
  const key = (k, up) => pj(`document.dispatchEvent(new KeyboardEvent('${up ? 'keyup' : 'keydown'}', {key: '${k}', bubbles: true})), 0`);
  const shot = async n => { if (!process.env.NEO_SHOTS) return; const d = await pj(`document.getElementById('gc').toDataURL()`); require('fs').writeFileSync(require('path').join(process.env.NEO_SHOTS, 'mineur-' + n + '.png'), Buffer.from(d.split(',')[1], 'base64')); };
  await pj(`window.__e = []; addEventListener('error', e => __e.push(e.message)); 0`);
  const chk = await C('return T.check();'); if (chk !== 'ok') throw new Error('vérification : ' + chk);
  await pj(`document.getElementById('gNew').click(), 0`); await sleep(200);
  // creuser trois cases vers le bas, un minerai dans la deuxième
  await C('for (let y = 3; y < 7; y++) mn.w[y][4] = 1; mn.w[4][4] = 10; mn.w[3][3] = mn.w[3][5] = 2; return 0;');
  const s0 = await C('return T.sounds();');
  await key('ArrowDown'); await sleep(1100); await key('ArrowDown', true); await sleep(300);
  const dug = await C('return mn.y + "|" + mn.bag.length;'); const [y, bag] = dug.split('|').map(Number);
  if (y < 4 || bag < 1) throw new Error('le foret devait descendre et ramasser le cuivre : ' + dug);
  if (!(await C('return T.sounds();') > s0 + 2)) throw new Error('le foret devait faire du bruit');
  await shot('0-creuse');
  // remonter : on vend à la surface (la caisse sonne)
  const s1 = await C('return T.sounds();'), cash0 = await C('return mn.cash;');
  await C('mn.dig = null; mn.keys = {}; mn.x = 4; mn.y = 2; mn.fy = 2; mn.wasUp = false; return 0;'); await sleep(300);
  if (await C('return mn.bag.length;') !== 0 || !/Vendu/.test(await C('return mn.msg;'))) throw new Error('le minerai devait se vendre (le plein peut ensuite reprendre l\'argent) : ' + cash0);
  if (!(await C('return T.sounds();') > s1)) throw new Error('la vente devait sonner');
  await sleep(500); await shot('1-vente');
  // 1.2.0 : la vente détaillée, la ville, le gaz qui abîme la coque, un rocher qui tombe
  await C('mn.bag = [3, 3, 5]; mn.relicBag = [{n: "Statuette", v: 900}]; mn.x = 4; mn.y = 2; mn.fy = 2; mn.cam = 0; mn.w[3][4] = 1; T.surface(); return 0;');
  const sale = await C('return JSON.stringify(mn.sale);'); if (!/Statuette/.test(sale) || !/Saphir/.test(sale)) throw new Error('la vente devait être détaillée : ' + sale);
  await sleep(200); await shot('1b-detail');
  const hp = await C('mn.x = 6; mn.y = 30; mn.fy = 30; mn.cam = 24; mn.keys = {}; for (let y = 28; y < 36; y++) for (let x = 4; x < 9; x++) mn.w[y][x] = 1; mn.w[31][6] = 5; mn.w[30][6] = 0; mn.w[29][6] = 0; mn.w[28][6] = 6; mn.hp = mn.hull; mn.keys = {down: true}; mn.lastMove = -99; for (let i = 0; i < 60; i++) T.update(); mn.keys = {}; return mn.hp + "/" + mn.hull + " " + mn.y;');
  if (!(parseInt(hp) < parseInt(hp.split('/')[1]))) throw new Error('le gaz ou le rocher devait abîmer la coque : ' + hp);
  await sleep(200);
  await shot('1c-dangers');
  // la mine profonde : la pierre bleue vers 95 m, des diamants et de la roche noire
  await C('mn.drill = 2; mn.tank = mn.fuel = 400; for (let y = 3; y < 100; y++) mn.w[y][10] = 0; mn.w[100][10] = 4; mn.x = 10; mn.y = 98; mn.fy = 98; mn.cam = 92; for (let x = 0; x < 20; x++) if (mn.w[99][x] > 0 && x !== 10) mn.w[99][x] = 10 + 6 + (x % 2); return 0;'); await sleep(500);
  const msg = await C('return mn.msg;'); if (!/pierre bleue/i.test(msg)) throw new Error('la nouvelle couche devait être annoncée : ' + msg);
  await C('mn.y = 99; return 0;'); await sleep(200); await key('ArrowDown'); await sleep(200); await key('ArrowDown', true);
  if (!/foret 3/.test(await C('return mn.msg;'))) throw new Error('la roche noire devait demander un foret 3');
  await shot('2-profond');
  await C('for (let y = 3; y < 230; y++) mn.w[y][10] = 0; mn.x = 10; mn.y = mn.fy = 225; mn.cam = 219; for (let x = 0; x < 20; x++) for (let y = 222; y < 235; y++) if (mn.w[y][x] === 1 && (x + y) % 3 === 0) mn.w[y][x] = 10 + 10; return 0;'); await sleep(600);
  if (await C('return mn.layer;') !== 4) throw new Error('le cœur du monde devait être atteint');
  await shot('3-coeur');
  const pr = await C('const p = window.__pr = 0; mn.dig = null; for (let y = 225; y < 242; y++) mn.w[y][10] = 0; mn.x = 10; mn.y = mn.fy = 240; mn.cam = 228; T.update(); return mn.found;');
  if (!pr) throw new Error('la créature devait être trouvée au fond');
  await sleep(300); await shot('4-creature');
  await pj(`document.getElementById('gNew').click(), 0`);
  const errs = await pj(`window.__e.join(' | ')`); if (errs) throw new Error('erreur : ' + errs);
  // plein écran, et la zone de jeu qui tient dans la fenêtre
  await pj(`document.getElementById('gFs').click(), 0`); await sleep(700);
  const fs = await pj(`(() => { const c = document.getElementById('gc'), r = c.getBoundingClientRect(); return document.fullscreenElement === c.parentElement && (Math.abs(r.height - innerHeight) < 3 || Math.abs(r.width - innerWidth) < 3); })()`);
  await pj(`document.fullscreenElement && document.exitFullscreen(), 0`); await sleep(300);
  if (!fs) throw new Error('le plein écran ne remplit pas l\'écran');
  const L = await pj(`(() => { const r = document.getElementById('gc').getBoundingClientRect(); let s = 0; for (let e = document.getElementById('gc').parentElement; e; e = e.parentElement) s += e.scrollTop; return { bottom: Math.round(r.bottom + s), h: Math.round(r.height), wh: innerHeight, ww: innerWidth, sw: document.documentElement.scrollWidth }; })()`);
  if (process.env.NEO_FIT_LOG) console.log('FIT', JSON.stringify(L));
  if (L.bottom > L.wh + 1 || L.sw > L.ww + 1 || L.h < 280) throw new Error('la zone de jeu dépasse la fenêtre ou reste petite : ' + JSON.stringify(L));
  return 'vérification ok · foret qui gratte · vente qui sonne · vente détaillée · gaz et rocher · couches annoncées · roche noire · 225 m · plein écran · ' + L.h + ' px dans ' + L.ww + '×' + L.wh;
};
