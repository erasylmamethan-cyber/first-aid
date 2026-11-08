/* Анатомическая кисть (тыльная сторона) для иллюстраций.
   Пропорции по скелету кисти: пястные кости и три фаланги; фаланги в отношении ≈ 1 : 0,62 : 0,45;
   средний палец длиннее, указательный ≈ безымянному, мизинец заканчивается у последнего сустава безымянного;
   головки пястных костей (костяшки) лежат по дуге; при сгибании пальцы сходятся к ладьевидной кости.
   Суставы (пястно-фаланговый, проксимальный и дистальный межфаланговые) толще фаланг, на тыльной стороне — складки кожи.
   Начало координат — середина запястья, пальцы вдоль +x. Правая кисть: большой палец со стороны −y. */
(function(){
const INK = '#6A4430', CREASE = '#A8704B', NAIL = '#F4DCD0', NAILE = '#C99A86', LUNULA = '#FBEDE6';
const f1 = v => v.toFixed(1);

// контур сегментированного пальца по средней линии pts и ширинам ws (в каждой точке)
function outline(pts, ws){
  const n = pts.length, L = [], R = [];
  for(let i=0;i<n;i++){
    const a = pts[Math.max(0,i-1)], b = pts[Math.min(n-1,i+1)];
    let dx=b[0]-a[0], dy=b[1]-a[1]; const l=Math.hypot(dx,dy)||1; dx/=l; dy/=l;
    const h = ws[i]/2;
    L.push([pts[i][0]-dy*h, pts[i][1]+dx*h]); R.push([pts[i][0]+dy*h, pts[i][1]-dx*h]);
  }
  return {L, R};
}
// сглаженная линия через точки (квадратичные кривые через середины)
function smooth(arr){
  let d = `M${f1(arr[0][0])},${f1(arr[0][1])} `;
  for(let i=1;i<arr.length-1;i++) d += `Q${f1(arr[i][0])},${f1(arr[i][1])} ${f1((arr[i][0]+arr[i+1][0])/2)},${f1((arr[i][1]+arr[i+1][1])/2)} `;
  const e = arr[arr.length-1]; return d + `L${f1(e[0])},${f1(e[1])}`;
}

/* Один палец. base — головка пястной кости; dir — направление (градусы); len — длина пальца;
   w — ширина; flex — [MCP, PIP, DIP] сгибание в градусах; conv — схождение к ладьевидной кости (градусы на единицу сгибания) */
function digit(base, dir, len, w, flex, conv, o){
  const seg = [len*0.483, len*0.300, len*0.217];            // 1 : 0,62 : 0,45
  const pts = [base], ws = [w*1.06];
  let cum = 0, ang = dir*Math.PI/180, x = base[0], y = base[1];
  const joints = [];
  for(let k=0;k<3;k++){
    cum += flex[k];
    const fore = o.side ? 1 : Math.max(0.12, Math.cos(cum*Math.PI/180));  // ракурс: согнутая фаланга короче
    ang += (o.side ? flex[k] : conv * flex[k]) * Math.PI/180;
    const sl = seg[k] * fore;
    const mid = [x + Math.cos(ang)*sl*0.5, y + Math.sin(ang)*sl*0.5];
    x += Math.cos(ang)*sl; y += Math.sin(ang)*sl;
    pts.push(mid); ws.push(w*(k===0 ? 0.90 : k===1 ? 0.86 : 0.84));
    pts.push([x, y]); ws.push(k===0 ? w*1.0 : k===1 ? w*0.90 : w*0.62);
    joints.push({p:[x,y], a:ang, fore});
  }
  // кончик — подушечка: центр полукруга чуть отступает от конца фаланги
  const tipA = ang, tipR = w*0.40;
  pts[pts.length-1] = [x - Math.cos(tipA)*tipR*0.9, y - Math.sin(tipA)*tipR*0.9];
  ws[ws.length-1] = tipR*2;
  const tip = [pts[pts.length-1][0] + Math.cos(tipA)*tipR, pts[pts.length-1][1] + Math.sin(tipA)*tipR];
  const {L, R} = outline(pts, ws);
  const Re = R[R.length-1];
  const cap = `A${f1(tipR)},${f1(tipR*1.05)} 0 0 0 ${f1(Re[0])},${f1(Re[1])}`;
  const sideL = smooth(L), sideR = smooth(R.slice().reverse());
  const fill = `${sideL} ${cap} ${sideR.replace(/^M/, 'L')} Z`;
  const g = o.g;
  let s = `<path d="${fill}" fill="${g}" stroke="none"/>`;
  s += `<path d="${sideL} ${cap}" fill="none" stroke="${INK}" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round"/>`;
  s += `<path d="${sideR}" fill="none" stroke="${INK}" stroke-width="1.25" stroke-linecap="round"/>`;
  // тень вдоль одного края (объём)
  const shade = outline(pts.slice(0,-1), ws.slice(0,-1).map(v=>v*0.62)).R;
  s += `<path d="${smooth(shade)}" fill="none" stroke="${CREASE}" stroke-width="${f1(w*0.18)}" stroke-linecap="round" opacity=".28"/>`;
  const hl = outline(pts.slice(1,-1), ws.slice(1,-1).map(v=>v*0.36)).L;
  s += `<path d="${smooth(hl)}" fill="none" stroke="#FFF2E6" stroke-width="${f1(w*0.16)}" stroke-linecap="round" opacity=".38"/>`;
  // складки на тыльной стороне суставов: PIP — 3 дуги, DIP — 2 дуги
  const crease = (j, count, span) => {
    const nx = -Math.sin(j.a), ny = Math.cos(j.a), tx = Math.cos(j.a), ty = Math.sin(j.a);
    let out = '';
    for(let c=0;c<count;c++){
      const off = (c - (count-1)/2) * 1.7, hw = w*span*(c===1?1:0.8);
      const cx = j.p[0] + tx*off, cy = j.p[1] + ty*off;
      out += `M${f1(cx - nx*hw)},${f1(cy - ny*hw)} Q${f1(cx + tx*1.4)},${f1(cy + ty*1.4)} ${f1(cx + nx*hw)},${f1(cy + ny*hw)} `;
    }
    return `<path d="${out}" fill="none" stroke="${CREASE}" stroke-width=".85" stroke-linecap="round" opacity=".85"/>`;
  };
  if(o.side){
    // сбоку: складки — на тыльном крае над суставами, ноготь — тонкой пластинкой на тыльной стороне кончика
    const back = (j, k) => { const nx = Math.sin(j.a), ny = -Math.cos(j.a), tx = Math.cos(j.a), ty = Math.sin(j.a), r = w*0.5;
      return `M${f1(j.p[0]+nx*r-tx*2)},${f1(j.p[1]+ny*r-ty*2)} q${f1(tx*2+nx*1.6)},${f1(ty*2+ny*1.6)} ${f1(tx*4)},${f1(ty*4)}`; };
    s += `<path d="${back(joints[0])} ${back(joints[1])}" fill="none" stroke="${CREASE}" stroke-width=".9" opacity=".8"/>`;
    if(!o.noNails){
      const a = joints[2].a, nx = Math.sin(a), ny = -Math.cos(a), tx = Math.cos(a), ty = Math.sin(a), r = w*0.42;
      const p0 = [tip[0] - tx*w*0.95 + nx*r, tip[1] - ty*w*0.95 + ny*r], p1 = [tip[0] - tx*w*0.15 + nx*r*0.75, tip[1] - ty*w*0.15 + ny*r*0.75];
      s += `<path d="M${f1(p0[0])},${f1(p0[1])} L${f1(p1[0])},${f1(p1[1])}" stroke="${NAIL}" stroke-width="2.6" stroke-linecap="round"/>` +
           `<path d="M${f1(p0[0])},${f1(p0[1])} L${f1(p1[0])},${f1(p1[1])}" stroke="${NAILE}" stroke-width=".6" fill="none" transform="translate(${f1(nx*1.2)},${f1(ny*1.2)})"/>`;
    }
    return s;
  }
  s += crease(joints[0], 3, 0.30) + crease(joints[1], 2, 0.24);
  // ноготь на дистальной фаланге: ложе, лунка, околоногтевой валик
  if(!o.noNails && joints[2].fore > 0.35){
    const a = joints[2].a, dl = Math.hypot(tip[0]-joints[1].p[0], tip[1]-joints[1].p[1]);
    const nl = dl*0.52, nw = w*0.30;
    const cx = tip[0] - Math.cos(a)*(nl*0.5 + w*0.16), cy = tip[1] - Math.sin(a)*(nl*0.5 + w*0.16);
    const deg = a*180/Math.PI;
    s += `<g transform="translate(${f1(cx)},${f1(cy)}) rotate(${f1(deg)})">` +
      `<path d="M${f1(-nl/2)},${f1(-nw)} C${f1(nl*0.1)},${f1(-nw*1.08)} ${f1(nl*0.5)},${f1(-nw*0.92)} ${f1(nl*0.56)},0 C${f1(nl*0.5)},${f1(nw*0.92)} ${f1(nl*0.1)},${f1(nw*1.08)} ${f1(-nl/2)},${f1(nw)} Q${f1(-nl*0.6)},0 ${f1(-nl/2)},${f1(-nw)} Z" fill="${NAIL}" stroke="${NAILE}" stroke-width=".8"/>` +
      `<path d="M${f1(-nl/2+0.6)},${f1(-nw*0.62)} Q${f1(-nl*0.22)},0 ${f1(-nl/2+0.6)},${f1(nw*0.62)}" fill="${LUNULA}" stroke="none"/>` +
      `<path d="M${f1(-nl/2-0.4)},${f1(-nw*1.05)} Q${f1(-nl*0.66)},0 ${f1(-nl/2-0.4)},${f1(nw*1.05)}" fill="none" stroke="${CREASE}" stroke-width=".7"/>` +
      `<path d="M${f1(nl*0.42)},${f1(-nw*0.7)} Q${f1(nl*0.56)},0 ${f1(nl*0.42)},${f1(nw*0.7)}" fill="none" stroke="#fff" stroke-width=".9" opacity=".8"/>` +
      `</g>`;
  }
  return s;
}

/* Кисть целиком. Совместимо со старой функцией: o.fy (поперечное положение костяшек), o.fl (длины пальцев),
   o.fa (направление пальцев), o.noNails, o.noThumb, o.g / o.g2 (заливки), o.mirror; новое — o.curl (0…1) */
function anatomicHand(x, y, rot=0, s=1, o={}){
  const g = o.g || 'url(#gr)', g2 = o.g2 || 'url(#gr2)';
  const fy = o.fy || [-15,-4.8,5.4,15];
  const fl = o.fl || [38,42,39,31];                         // указательный, средний, безымянный, мизинец
  const fa = o.fa || [-4,0,3,7];
  const widths = [10.4, 11, 10.4, 8.8];
  const mcpX = [50, 52, 50.5, 46];                          // дуга головок пястных костей
  const curl = o.curl ?? 0.12;                              // естественный изгиб в покое
  const cascade = [1, 1.15, 1.3, 1.45];                     // от указательного к мизинцу сгибание растёт
  const mirror = o.mirror ? ' scale(1,-1)' : '';
  let out = `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})${mirror}">`;
  if(!o.noThumb){
    out += digit([18, -16], o.thumbDir ?? -40, o.thumbLen || 42, 13.6, [0, 12 + curl*20, 10 + curl*34], 0.3, {g, noNails:o.noNails});
  }
  // ладонь (тыл): от запястья к головкам пястных костей; со стороны большого пальца — возвышение
  const palm = `M-2,-14.5 C6,-19.6 14,-24.8 23,-25.8 C29,-26.4 34,-23.8 36.6,-20.6 ` +
               `C41,-20.8 45,-19.6 48,-17.4 C51.6,-14.6 53,-11 53.6,-7 C54.2,-1 53.8,5 52.4,10 ` +
               `C51,15 48.6,19 45,21.4 C38,24.6 28,24.4 19,22.6 C11,21 4,18.6 -2,16 C-4,10 -4.6,-8 -2,-14.5 Z`;
  out += `<path d="${palm}" fill="${g2}" stroke="${INK}" stroke-width="1.35" stroke-linejoin="round"/>`;
  // сухожилия разгибателей — от запястья к костяшкам, слегка расходятся
  out += `<path d="M6,-7 C22,-9 36,-12 49,-14.4 M6,-2 C22,-3.4 36,-4.4 51,-4.8 M6,3 C22,3.4 36,4.2 50,5.2 M6,7.6 C20,10 32,12.6 44,14.6" fill="none" stroke="${CREASE}" stroke-width=".9" opacity=".45"/>`;
  if(!o.noThumb){
    out += `<path d="M2,-15 C8,-21.6 16,-25.4 24,-25.8 C30,-26 34,-23.6 36.4,-20.4" fill="none" stroke="${INK}" stroke-width="1.25" stroke-linecap="round"/>` +
           `<path d="M33,-19.4 C38.6,-18.8 44,-18.4 48,-17.4" fill="none" stroke="${CREASE}" stroke-width=".9" opacity=".7"/>`;
  }
  // пальцы: мизинец → указательный (ближние рисуются поверх)
  for(const i of [3,2,1,0]){
    const c = curl*cascade[i];
    out += digit([mcpX[i]-1.5, fy[i]], fa[i], fl[i], widths[i], [c*38, c*62, c*40], -(fy[i]+2)/180, {g, noNails:o.noNails});
  }
  // костяшки — головки пястных костей поверх основания пальцев
  out += mcpX.map((mx,i)=>`<path d="M${f1(mx-4.2)},${f1(fy[i]-widths[i]*0.42)} Q${f1(mx+0.6)},${f1(fy[i])} ${f1(mx-4.2)},${f1(fy[i]+widths[i]*0.42)}" fill="none" stroke="${CREASE}" stroke-width="1" opacity=".75"/>` +
    `<ellipse cx="${f1(mx-2.6)}" cy="${f1(fy[i]-1)}" rx="2.4" ry="${f1(widths[i]*0.22)}" fill="#fff" opacity=".18"/>`).join('');
  return out + `</g>`;
}
// большой палец: пястная кость (видимая часть) + 2 фаланги (1 : 0,7)
function digit3(base, dir, len, w, flex, g, noNails){
  // используем digit с тремя сегментами, где первый — видимая часть пястной кости
  return digit(base, dir, len*1.08, w, [0, flex[0], flex[1]], 0, {g, noNails});
}

/* o.flex — сгибание пальцев [MCP, PIP, DIP] в градусах (отрицательное — разгибание, пальцы приподняты);
   o.thumb — показать большой палец (ближняя сторона); o.g / o.g2 — заливки */
function sideHand(x, y, rot=0, s=1, o={}){
  const g = o.g || 'url(#gr)', g2 = o.g2 || 'url(#gr2)';
  const fl = [36, 40, 37.5, 30], wd = [9.2, 9.6, 9.2, 8.2];
  const by = [-2.4, -3.2, -2.6, -1.6], bx = [49, 50.5, 49.5, 45.5];
  const flex = o.flex || [8, 12, 8];
  const spread = o.spread || [0, 2, 4, 6];
  let out = `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">`;
  // дальние пальцы: мизинец, безымянный, средний (темнее — в тени)
  for(const i of [3,2,1]){
    out += digit([bx[i], by[i]], spread[i] + (o.dir||0), fl[i], wd[i], flex.map((f,k)=>f*(1+i*0.06)), 0, {g:o.gFar||'url(#grs)', side:true, noNails:true});
  }
  // ладонь в профиль: тыл слегка выпуклый, на ладонной стороне — подушка основания ладони (то, чем давят)
  out += `<path d="M-1,-9 C14,-11.6 32,-11 46,-8.2 C50,-7.4 53,-5.4 53.6,-2.4 C54,0.6 53,3.4 50.6,5 C46,7.4 38,8 30,8.6 C22,9.4 16,12 11,13.6 C6,15 1,14 -1,11.6 Z" fill="${g2}" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>`;
  out += `<path d="M4,12.8 C9,10.6 14,10 18,10.6" fill="none" stroke="${CREASE}" stroke-width="1" opacity=".75"/>`;   // складка у основания ладони
  out += `<path d="M6,-9.6 C18,-11 30,-10.8 42,-9" fill="none" stroke="#FFF2E6" stroke-width="2" stroke-linecap="round" opacity=".35"/>`;
  // ближний — указательный
  out += digit([bx[0], by[0]], spread[0] + (o.dir||0), fl[0], wd[0], flex, 0, {g, side:true, noNails:o.noNails});
  // костяшка указательного
  out += `<path d="M${bx[0]-4},${by[0]-5.4} q3,-1.6 6,-0.4" fill="none" stroke="${CREASE}" stroke-width="1" opacity=".8"/>`;
  if(o.thumb !== false){
    // большой палец вдоль ладонной стороны указательного, слегка отведён
    out += digit([20, 5], (o.thumbDir ?? 14) + (o.dir||0), 34, 11.4, [0, 10, 12], 0, {g, side:true, noNails:o.noNails});
    out += `<path d="M8,4 C13,1 19,1.4 24,4.6 C20,8.6 14,10.4 9,10.6 Z" fill="${g2}" stroke="none"/>`;
  }
  return out + `</g>`;
}
window.FA_HAND = { anatomicHand, sideHand };
})();
