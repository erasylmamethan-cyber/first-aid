/* Анимированные иллюстрации первой помощи — детальные SVG-сцены.
   Анатомические ориентиры (ключицы, грудина, соски, рёберная дуга, пупок, лопатки, колено),
   кисти с фалангами, суставами и ногтями, лица в профиль. Работают без интернета. */
(function(){
const K = {
  bg:'#E9EEF4', floor:'#CCD5E0', floorL:'#B8C3D1',
  line:'#2A2F36', soft:'#8A6A55',
  hair:'#3B2A1F', rHair:'#1E1916',
  vShirt:'#5B8DBE', vShirtS:'#41709F', vPants:'#3F4B60', vPantsS:'#323C4E',
  rShirt:'#3E8E6B', rShirtS:'#2C6E52', rPants:'#2F3A4A', shoe:'#1F2227',
  lip:'#C9786B', lipD:'#A9584D', nail:'#F6DCCB', crease:'#B07A57',
  mark:'#E11D48', water:'#3B9BE0', cloth:'#F7F3E8', clothS:'#D9D1BD', blood:'#B91C1C',
  onesie:'#F3B6C6', onesieS:'#D98FA6', table:'#D8C2A3'
};
const LW = 1.5;
const st = (w=LW) => `stroke="${K.line}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const P = (d, fill, cls='', w=LW) => `<path ${cls?`class="${cls}" `:''}d="${d}" fill="${fill}" ${st(w)}/>`;
const Ln = (d, color=K.line, w=1.2, extra='') => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const L = (d, color, w, cls='') => `<g${cls?` class="${cls}"`:''}><path d="${d}" fill="none" stroke="${K.line}" stroke-width="${w+3}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const C = (cx, cy, r, fill, cls='') => `<circle ${cls?`class="${cls}" `:''}cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${st()}/>`;
const T = (x, y, s, size=12, fill=K.line, w=700, anchor='middle') => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${w}" fill="${fill}" text-anchor="${anchor}" font-family="system-ui,-apple-system,Roboto,sans-serif" paint-order="stroke" stroke="${K.bg}" stroke-width="3">${s}</text>`;
const DEFS = `<defs>
<linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8D6B6"/><stop offset="1" stop-color="#E6B18C"/></linearGradient>
<linearGradient id="gs2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E6B18C"/><stop offset=".5" stop-color="#F8D6B6"/><stop offset="1" stop-color="#E3AC86"/></linearGradient>
<linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9A07A"/><stop offset="1" stop-color="#B98058"/></linearGradient>
<linearGradient id="gr2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#BE845C"/><stop offset=".55" stop-color="#DBA27C"/><stop offset="1" stop-color="#C08860"/></linearGradient>
<linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBE0C8"/><stop offset="1" stop-color="#EDBE9C"/></linearGradient>
<radialGradient id="gchest" cx=".5" cy=".42" r=".62"><stop offset="0" stop-color="#F9DABD"/><stop offset=".75" stop-color="#EDBD98"/><stop offset="1" stop-color="#DCA47E"/></radialGradient>
<radialGradient id="gbelly" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#F9D9BC"/><stop offset="1" stop-color="#E2AA84"/></radialGradient>
<linearGradient id="gpen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E9C400"/><stop offset=".45" stop-color="#FFE45C"/><stop offset="1" stop-color="#D4AE00"/></linearGradient>
<linearGradient id="gjeans" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4C5A72"/><stop offset="1" stop-color="#36425A"/></linearGradient>
<marker id="fa-ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${K.mark}"/></marker>
<marker id="fa-ahb" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${K.water}"/></marker>
</defs>`;
const svg = (body, label) => `<svg viewBox="0 0 320 170" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${DEFS}<rect width="320" height="170" fill="${K.bg}"/>${body}</svg>`;
const floor = (y=142) => `<rect x="0" y="${y}" width="320" height="${170-y}" fill="${K.floor}"/><line x1="0" y1="${y}" x2="320" y2="${y}" stroke="${K.floorL}" stroke-width="2"/>`;
const target = (x, y, r=7) => `<g class="fa-target"><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${K.mark}" stroke-width="2.4"/><circle cx="${x}" cy="${y}" r="2.4" fill="${K.mark}"/></g>`;
const cross = (x, y, s=18) => `<g stroke="${K.mark}" stroke-width="4" stroke-linecap="round"><line x1="${x-s/2}" y1="${y-s/2}" x2="${x+s/2}" y2="${y+s/2}"/><line x1="${x+s/2}" y1="${y-s/2}" x2="${x-s/2}" y2="${y+s/2}"/></g>`;
const arrow = (d, cls='', blue=false) => `<g class="${cls}"><path d="${d}" fill="none" stroke="${blue?K.water:K.mark}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#${blue?'fa-ahb':'fa-ah'})"/></g>`;
const badge = (x, y, s, w=70, fill=K.line) => `<g><rect x="${x}" y="${y}" width="${w}" height="22" rx="11" fill="${fill}"/><text x="${x+w/2}" y="${y+15.5}" font-size="12" font-weight="800" fill="#fff" text-anchor="middle" font-family="system-ui,-apple-system,Roboto,sans-serif">${s}</text></g>`;
const num = (x, y, n) => `<g><circle cx="${x}" cy="${y}" r="10" fill="${K.mark}"/><text x="${x}" y="${y+4.5}" font-size="13" font-weight="900" fill="#fff" text-anchor="middle" font-family="system-ui,sans-serif">${n}</text></g>`;

/* =================== КИСТИ =================== */
// палец вдоль +x: фаланги, складки суставов, ноготь
function finger(x, y, len, w, ang=0, g='url(#gr)', nail=true){
  const r = w/2;
  return `<g transform="translate(${x},${y}) rotate(${ang})">` +
    `<path d="M0,${-r} L${len-r},${-r*0.92} A${r*0.95},${r*0.95} 0 0 1 ${len-r},${r*0.92} L0,${r} Z" fill="${g}" ${st(1.3)}/>` +
    Ln(`M${len*0.36},${-r*0.55} q1.2,${r*0.55} 0,${r*1.1}`, K.crease, 0.9) +
    Ln(`M${len*0.68},${-r*0.5} q1,${r*0.5} 0,${r}`, K.crease, 0.9) +
    (nail ? `<rect x="${len-r*2.15}" y="${-r*0.62}" width="${r*1.75}" height="${r*1.24}" rx="${r*0.55}" fill="${K.nail}" stroke="${K.crease}" stroke-width=".8"/>` : '') +
    `</g>`;
}
// кисть тыльной стороной вверх, пальцы вдоль +x, начало координат — середина запястья
function dorsalHand(x, y, rot=0, s=1, o={}){
  const g = o.g || 'url(#gr)', g2 = o.g2 || 'url(#gr2)';
  const fy = o.fy || [-15,-4.5,6,15.5], fl = o.fl || [42,48,45,35], fa = o.fa || [-4,0,2,7];
  const mirror = o.mirror ? ' scale(1,-1)' : '';
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})${mirror}">` +
    (o.noThumb ? '' : finger(4, -17, 40, 12.5, -36, g)) +
    fy.map((yy,i)=>finger(48, yy, fl[i], i===3?9.5:10.8, fa[i], g, !o.noNails)).join('') +
    `<path d="M-2,-19 C14,-23 34,-24 50,-21 C55,-19 57,-14 57,-9 L57,13 C57,18 54,21 49,22 C33,24 14,23 -2,19 Z" fill="${g2}" ${st(1.4)}/>` +
    Ln('M8,-12 C22,-14 36,-15 49,-14 M8,-2 C22,-3 36,-4 50,-4 M8,8 C22,8 36,7 49,6', '#C48A62', 0.8, 'opacity=".7"') +
    `<g fill="none" stroke="#B57C55" stroke-width="1"><path d="M50,-17 q3,2 0,5"/><path d="M51,-7 q3,2 0,5"/><path d="M50,3.5 q3,2 0,5"/><path d="M48,13 q3,2 0,5"/></g>` +
    `</g>`;
}
// предплечье (рукав закатан) от запястья влево
function forearm(x, y, rot=0, len=120, w=40, sleeve=K.rShirt){
  return `<g transform="translate(${x},${y}) rotate(${rot})">` +
    `<path d="M2,${-w/2+2} C-30,${-w/2} -70,${-w/2-3} ${-len},${-w/2-5} L${-len},${w/2+5} C-70,${w/2+3} -30,${w/2} 2,${w/2-2} Z" fill="url(#gr)" ${st(1.4)}/>` +
    Ln(`M-20,-4 C-45,-6 -70,-7 -95,-9`, '#C48A62', 0.9, 'opacity=".6"') +
    `<path d="M${-len+48},${-w/2-8} L${-len},${-w/2-10} L${-len},${w/2+10} L${-len+48},${w/2+8} Q${-len+56},0 ${-len+48},${-w/2-8} Z" fill="${sleeve}" ${st(1.4)}/>` +
    Ln(`M${-len+40},${-w/2-6} Q${-len+47},0 ${-len+40},${w/2+6}`, K.rShirtS, 1.4) +
    `</g>`;
}
// две кисти в замок сверху: основание нижней ладони на грудине, пальцы верхней — между пальцами нижней
function interlocked(x, y, rot=0, s=1){
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">` +
    forearm(-6, 10, 6, 150, 36) + forearm(-10, -8, -5, 150, 38) +
    dorsalHand(0, 4, 4, 1, {fy:[-15,-4,7,17], fl:[44,50,47,37]}) +
    dorsalHand(-6, -4, -3, 1.04, {fy:[-9.5,1,11.5,21], fl:[34,38,36,28], fa:[2,4,6,10]}) +
    `</g>`;
}
// кулак (большой палец внутрь) + обхватывающая кисть
function fistGrip(x, y, s=1){
  return `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M-26,-16 C-26,-26 -14,-30 0,-30 C16,-30 28,-24 28,-12 L28,14 C28,24 16,28 0,28 C-14,28 -26,24 -26,14 Z" fill="url(#gr2)" ${st(1.4)}/>` +
    [-17,-6,5,16].map(yy => `<path d="M-24,${yy-5} C-14,${yy-7} 6,${yy-7} 22,${yy-5} C26,${yy-3} 26,${yy+3} 22,${yy+5} C6,${yy+7} -14,${yy+7} -24,${yy+5} Z" fill="url(#gr)" ${st(1.1)}/>`).join('') +
    [-14,-3,8].map((yy,i) => finger(-34, yy, 58-i*3, 10.5, 2, 'url(#gr)')).join('') +
    finger(-30, 20, 44, 12, -8, 'url(#gr)') +
    `</g>`;
}
// два пальца (указательный и средний) вниз, остальные поджаты — вид сбоку
function twoFingersDown(x, y, s=1){
  return `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M-16,-46 C-18,-30 -16,-16 -10,-10 L14,-10 C20,-18 22,-34 20,-48 Z" fill="url(#gr2)" ${st(1.4)}/>` +
    `<path d="M10,-14 C22,-14 28,-8 26,-2 C24,4 16,4 12,0" fill="url(#gr)" ${st(1.2)}/>` +
    finger(-10, -10, 26, 9.5, 90) + finger(-1, -10, 28, 9.5, 90) +
    `</g>`;
}

/* =================== ЛИЦА =================== */
// голова лёжа на спине, макушка влево, лицо вверх: губы, нос, ноздря, закрытый глаз с ресницами, бровь, ухо
function headUp(x, y, s=1, o={}){
  const g = o.baby ? 'url(#gb)' : 'url(#gs)';
  if(o.baby) return `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M-14,-24 C-30,-22 -36,-6 -33,8 C-30,22 -16,30 2,28 L16,24 C24,12 28,0 27,-12 C26,-17 24,-20 21,-21 C20,-23 18,-24 16,-24 C14,-26 12,-26 10,-28 C6,-26 2,-24 -2,-25 C-6,-26 -10,-25 -14,-24 Z" fill="${g}" ${st()}/>` +
    `<path d="M-14,-24 C-24,-22 -30,-14 -31,-6 C-26,-12 -20,-18 -14,-20 Z" fill="#C79A6E" opacity=".8"/>` +
    `<ellipse cx="-2" cy="4" rx="5" ry="6.5" fill="${g}" ${st(1.1)}/>` + Ln('M-3,1 q3,3 0,6', K.soft, 0.9) +
    Ln('M-4,-17 q4,3 8,0', K.line, 1.3) + Ln('M-3,-15 l-1,2 M0,-14 l0,2 M3,-15 l1,2', K.line, 0.8) +
    `<ellipse cx="16" cy="-20" rx="3.2" ry="2" fill="${K.lip}" stroke="${K.lipD}" stroke-width=".8"/>` +
    `<ellipse cx="4" cy="-8" rx="5" ry="3" fill="#F4A9A0" opacity=".5"/>` + `</g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M-14,-26 C-26,-24 -34,-8 -32,6 C-30,20 -16,30 2,28 L18,24 C24,10 30,-4 28,-16 C27,-21 25,-24 22,-25 C22,-27 21,-28 19,-28 C18,-30 16,-31 14,-31 C12,-31 11,-33 10,-38 C6,-34 4,-30 0,-29 C-4,-30 -10,-28 -14,-26 Z" fill="${g}" ${st()}/>` +
    `<path d="M-12,-27 C-26,-26 -36,-8 -33,8 C-30,22 -16,31 0,29 C-10,22 -18,10 -18,-4 C-18,-14 -16,-22 -12,-27 Z" fill="${K.hair}" ${st(1.2)}/>` +
    `<ellipse cx="-2" cy="5" rx="5.5" ry="8" fill="${g}" ${st(1.1)}/>` + Ln('M-3,1 q4,4 0,8', K.soft, 1) +
    Ln('M-9,-25 q6,-3 13,-1', K.hair, 2.2) +
    Ln('M-6,-19 q4,3.5 9,0', K.line, 1.4) + Ln('M-5,-17.5 l-1,2.2 M-1.5,-16.5 l0,2.4 M2,-17.3 l1,2.2', K.line, 0.8) +
    Ln('M9,-33 q2.5,1 3,3', K.soft, 1) +
    `<path d="M14.5,-30.6 C16,-31.6 17.8,-30.8 19,-28.4 C17.8,-28.6 16,-28.8 14.5,-30.6 Z" fill="${K.lip}" stroke="${K.lipD}" stroke-width=".8"/>` +
    `<path d="M19.2,-28.2 C20.6,-28.8 22,-27.4 22.2,-25.4 C21,-26 20,-26.8 19.2,-28.2 Z" fill="${K.lip}" stroke="${K.lipD}" stroke-width=".8"/>` +
    Ln('M15,-30 C16.8,-29 18,-28.6 19.6,-27.8', K.lipD, 0.9) +
    Ln('M24,-14 C21,-8 17,-2 12,2', '#D8A07C', 1, 'opacity=".8"') +
    `</g>`;
}
// голова в профиль, лицо влево; глаз, рот, нос, ухо, бровь
function headProfile(x, y, s=1, rot=0, o={}){
  const g = o.g || 'url(#gr)', hair = o.hair || K.rHair;
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">` +
    `<path d="M10,-30 C26,-30 34,-16 32,0 C31,12 24,22 12,26 L4,26 C-2,26 -6,24 -9,20 C-12,19 -14,17 -14,15 C-15,14 -16,12 -15,11 C-17,10 -18,8 -16,7 C-17,5 -18,3 -18,1 L-22,-3 C-23,-5 -21,-7 -18,-9 C-18,-14 -16,-19 -14,-22 C-10,-28 -2,-31 10,-30 Z" fill="${g}" ${st()}/>` +
    `<path d="M-14,-22 C-10,-30 0,-34 12,-32 C28,-30 36,-16 32,2 C28,-6 22,-14 12,-16 C4,-18 -6,-20 -14,-22 Z" fill="${hair}" ${st(1.2)}/>` +
    `<ellipse cx="12" cy="0" rx="5" ry="7.5" fill="${g}" ${st(1.1)}/>` + Ln('M11,-3 q3,3 0,7', K.soft, 1) +
    Ln('M-15,-15 q5,-2 10,0', K.rHair, 2) +
    `<ellipse cx="-10" cy="-9" rx="3" ry="2.2" fill="#fff" stroke="${K.line}" stroke-width=".9"/><circle cx="-11" cy="-9" r="1.3" fill="${K.line}"/>` +
    Ln('M-19,0 q2,1.5 4,1', K.soft, 1) +
    (o.open ? `<ellipse cx="-14" cy="11" rx="3" ry="3.4" fill="#7A2E2E" stroke="${K.lipD}" stroke-width="1"/>`
            : `<path d="M-17,10 C-15,9 -13,9.5 -11,10.5" fill="none" stroke="${K.lipD}" stroke-width="1.6" stroke-linecap="round"/>`) +
    `</g>`;
}

/* =================== ФИГУРЫ =================== */
function lyingAdult(opts={}){
  return `<g>` +
    P('M196,112 L292,116 Q304,118 304,128 L304,142 L196,142 Z', 'url(#gjeans)') + Ln('M200,126 L300,129', K.vPantsS, 1.2) +
    P('M298,100 C310,98 316,104 316,112 L316,142 L300,142 Z', K.shoe) + Ln('M300,118 L314,118', '#3A3F47', 1.2) +
    `<g class="${opts.chestCls||''}">` +
      P('M72,124 C74,110 86,105 100,104 C120,102 140,104 160,107 C176,109 188,110 196,113 C200,116 200,124 199,142 L72,142 Z', K.vShirt) +
      Ln('M110,110 C120,116 126,128 124,140 M164,112 C160,122 160,132 162,140', K.vShirtS, 1.2) +
      `<path d="M84,110 C88,107 96,106 104,106" fill="none" stroke="#6F9CCB" stroke-width="2" stroke-linecap="round"/>` +
    `</g>` +
    P('M60,120 C64,118 70,117 76,117 L80,140 L62,141 Z', 'url(#gs)') + Ln('M66,122 C68,128 70,134 70,140', '#D8A07C', 1) +
    headUp(44, 124, 0.62) +
    L('M88,128 C100,130 112,132 126,134', K.vShirtS, 12) +
    `<path d="M126,128 C140,130 156,131 166,132 L166,140 C156,140 140,140 126,140 Z" fill="url(#gs)" ${st(1.3)}/>` +
    `<g transform="translate(166,136) scale(.42)">${['-9','-3','3','9'].map((yy,i)=>finger(16, +yy, [26,30,28,22][i], 7, 0, 'url(#gs)')).join('')}<path d="M0,-12 C8,-14 16,-13 20,-10 L20,10 C16,13 8,14 0,12 Z" fill="url(#gs)" ${st(2.4)}/></g>` +
    `</g>`;
}
function rescuerLegs(){
  return L('M168,96 L152,138', K.rPants, 20) + L('M152,138 L198,140', K.rPants, 15) + P('M192,132 L218,132 Q222,136 218,141 L192,141 Z', K.shoe);
}
function rescuerUpper(){
  return `<g class="fa-push">` +
    L('M168,96 L128,56', K.rShirt, 30) + Ln('M150,68 C146,78 150,88 156,92', K.rShirtS, 1.4) +
    `<path d="M118,58 L130,58 L128,78 L120,78 Z" fill="${K.rShirtS}" ${st(1.3)}/>` +
    `<path d="M120,77 L128,77 L127,96 L121,96 Z" fill="url(#gr2)" ${st(1.3)}/>` +
    headProfile(112, 36, 0.52, -38) +
    `<path d="M108,104 C108,99 112,96 118,96 L130,96 C134,96 136,99 136,103 C136,107 133,108 129,108 L113,108 C110,108 108,107 108,104 Z" fill="url(#gr)" ${st(1.3)}/>` +
    finger(110, 98, 20, 6, -168) + finger(111, 102, 19, 6, -172) + finger(106, 96, 16, 5.5, -150) +
    Ln('M120,98 L128,98', '#B57C55', 1) +
  `</g>`;
}
function babyLying(){
  return `<rect x="40" y="128" width="250" height="14" rx="3" fill="${K.table}" ${st()}/>` +
    P('M116,110 C122,100 132,98 144,98 L206,102 C214,104 216,108 216,116 L216,128 L116,128 Z', K.onesie) +
    Ln('M150,100 C152,110 152,120 150,128', K.onesieS, 1.2) +
    P('M214,108 L260,110 C268,112 270,116 270,122 L270,128 L214,128 Z', K.onesie) +
    `<ellipse cx="274" cy="118" rx="8" ry="9" fill="url(#gb)" ${st(1.2)}/>` +
    headUp(96, 114, 0.6, {baby:true});
}
function standVictim(bend=0, hands='side'){
  const sx = 120 - bend*0.6, sy = 50 + bend*0.35;
  return `<g>` + L('M128,96 L122,140', 'url(#gjeans)', 18) + L('M140,96 L146,140', 'url(#gjeans)', 18) +
    P('M106,134 L130,134 Q132,140 130,143 L106,143 Z', K.shoe) + P('M136,134 L160,134 Q162,140 160,143 L136,143 Z', K.shoe) +
    L(`M134,96 L${sx+10},${sy+12}`, K.vShirt, 34) +
    headProfile(sx-2, sy-8, 0.5, bend*0.4, {g:'url(#gs)', hair:K.hair, open: hands==='throat'}) +
    (hands==='throat'
      ? L(`M${sx+18},${sy+8} L${sx+4},${sy+8}`, K.vShirtS, 10) + `<g transform="translate(${sx-2},${sy+7}) rotate(-80) scale(.3)">${dorsalHand(0,0,0,1,{g:'url(#gs)', g2:'url(#gs2)'})}</g>`
      : L(`M${sx+14},${sy+8} L${sx-2},${sy+46}`, K.vShirtS, 10) + C(sx-3, sy+50, 5, 'url(#gs)')) +
    `</g>`;
}

/* =================== СЦЕНЫ =================== */
const S = {};

S.safety = () => svg(floor() + lyingAdult() +
  `<g class="fa-pulse"><path d="M262,18 L300,84 L224,84 Z" fill="#FBBF24" stroke="${K.line}" stroke-width="2" stroke-linejoin="round"/>${T(262,74,'!',34,K.line,900)}</g>` +
  T(110, 34, 'Огонь? Ток? Дорога?', 14, K.line, 800) + T(110, 54, 'Сначала — ваша безопасность', 12, K.mark, 800), 'Проверьте, что вокруг безопасно');

S.shake = () => svg(floor() + L('M200,92 L176,136', K.rPants, 20) + L('M176,136 L222,138', K.rPants, 15) + lyingAdult() +
  `<g class="fa-shake">` + L('M200,92 L152,60', K.rShirt, 30) +
  L('M146,62 L106,100', K.rShirtS, 12) + `<g transform="translate(100,106) rotate(130) scale(.36)">${dorsalHand(0,0,0,1)}</g>` +
  headProfile(140, 44, 0.5, -30, {open:true}) + `</g>` +
  `<g class="fa-pulse"><rect x="196" y="14" width="114" height="30" rx="15" fill="#fff" stroke="${K.line}" stroke-width="1.6"/>${T(253,34,'Вы меня слышите?',12)}</g>`, 'Окликните и потрясите за плечи');

S.airway = (o={}) => {
  const baby = o.infant;
  return svg(floor(152) +
    P('M150,100 C168,90 190,88 214,90 L320,92 L320,152 L150,152 Z', baby ? K.onesie : K.vShirt) +
    P('M128,106 C136,98 150,94 160,94 L164,152 L132,152 Z', baby ? 'url(#gb)' : 'url(#gs)') +
    `<g class="${baby ? '' : 'fa-tilt'}">` + headUp(102, 112, baby ? 1.25 : 1.3, {baby}) +
      `<g transform="translate(108,62) rotate(196) scale(.62)">${dorsalHand(0,0,0,1)}</g>` +
      `<path d="M112,58 C130,50 150,40 176,26" fill="none" stroke="${K.line}" stroke-width="15" stroke-linecap="round"/><path d="M112,58 C130,50 150,40 176,26" fill="none" stroke="${K.rShirtS}" stroke-width="12" stroke-linecap="round"/>` +
      `<g transform="translate(150,98) rotate(-58) scale(.55)">${finger(0,-6,40,11,0)}${finger(0,6,42,11,0)}<path d="M-30,-14 C-14,-18 0,-14 2,-10 L2,12 C0,16 -14,18 -30,14 Z" fill="url(#gr2)" ${st(2.4)}/></g>` +
      `<path d="M134,120 C150,132 170,146 190,160" fill="none" stroke="${K.line}" stroke-width="15" stroke-linecap="round"/><path d="M134,120 C150,132 170,146 190,160" fill="none" stroke="${K.rShirtS}" stroke-width="12" stroke-linecap="round"/>` +
    `</g>` +
    (baby ? T(250, 40, 'Голову — прямо', 14, K.line, 800) + T(250, 60, 'не запрокидывать', 12, K.mark, 800)
          : T(250, 34, 'Лоб — назад', 13, K.line, 800) + T(250, 54, 'Подбородок — вверх', 13, K.line, 800) +
            arrow('M84,28 C68,30 58,40 54,54', 'fa-blink') + arrow('M196,120 C202,106 196,94 184,88', 'fa-blink')), 'Откройте дыхательные пути');
};

S.look = (o={}) => {
  const baby = o.infant;
  return svg(floor() + (baby ? babyLying() : lyingAdult({chestCls:'fa-rise'})) +
    L('M104,92 L170,62', K.rShirt, 26) + headProfile(90, 80, 0.48, 60) +
    `<path d="M92,92 L150,${baby?106:104}" stroke="${K.mark}" stroke-width="2" stroke-dasharray="4 4" class="fa-dash"/>` +
    `<g transform="translate(276,54)"><circle r="30" fill="#fff" stroke="${K.line}" stroke-width="2"/>` +
    `<circle r="24" fill="none" stroke="${K.mark}" stroke-width="5" stroke-dasharray="151" class="fa-ring10" transform="rotate(-90)"/>` +
    `<text y="6" font-size="15" font-weight="900" fill="${K.line}" text-anchor="middle" font-family="system-ui,sans-serif">10 с</text></g>` +
    T(196, 22, 'Грудь поднимается?', 13, K.line, 800), 'Смотрите на грудную клетку 10 секунд');
};

S.phone = () => svg(
  `<g transform="translate(70,20)"><rect x="0" y="0" width="68" height="128" rx="12" fill="${K.line}"/><rect x="5" y="12" width="58" height="100" rx="4" fill="#fff"/>` +
  `<text x="34" y="62" font-size="24" font-weight="900" fill="${K.mark}" text-anchor="middle" font-family="system-ui,sans-serif">103</text>` +
  `<text x="34" y="84" font-size="10" font-weight="800" fill="${K.line}" text-anchor="middle" font-family="system-ui,sans-serif">громкая</text><text x="34" y="96" font-size="10" font-weight="800" fill="${K.line}" text-anchor="middle" font-family="system-ui,sans-serif">связь</text>` +
  `<g class="fa-waves"><path d="M82,40 q12,24 0,48" fill="none" stroke="${K.water}" stroke-width="3.5" stroke-linecap="round"/><path d="M94,30 q20,34 0,68" fill="none" stroke="${K.water}" stroke-width="3.5" stroke-linecap="round"/></g></g>` +
  `<g transform="translate(196,40)" class="fa-pulse"><rect x="0" y="0" width="86" height="86" rx="12" fill="#16A34A" stroke="${K.line}" stroke-width="2"/>` +
  `<path d="M43,22 c-9,-12 -28,-4 -22,12 c4,10 22,24 22,24 c0,0 18,-14 22,-24 c6,-16 -13,-24 -22,-12z" fill="#fff"/><path d="M46,30 l-8,12 h8 l-6,12" fill="none" stroke="#16A34A" stroke-width="3" stroke-linejoin="round"/>` +
  `<text x="43" y="78" font-size="13" font-weight="900" fill="#fff" text-anchor="middle" font-family="system-ui,sans-serif">АНД</text></g>` + T(239, 152, 'дефибриллятор', 12, K.line, 800), 'Позвоните 103 и найдите дефибриллятор');

/* ----- грудная клетка сверху (голова вверху) ----- */
function chestTop(){
  return `<path d="M-4,170 L-4,40 C20,30 44,24 58,20 L94,170 Z" fill="${K.vShirt}" ${st()}/>` +
    `<path d="M324,170 L324,40 C300,30 276,24 262,20 L226,170 Z" fill="${K.vShirt}" ${st()}/>` +
    Ln('M20,60 C34,90 50,130 64,170 M300,60 C286,90 270,130 256,170', K.vShirtS, 1.4) +
    `<path d="M136,-4 L184,-4 L188,12 C214,16 244,22 268,30 C276,60 274,110 262,170 L58,170 C46,110 44,60 52,30 C76,22 106,16 132,12 Z" fill="url(#gchest)" ${st()}/>` +
    Ln('M142,0 C146,6 152,12 156,16 M178,0 C174,6 168,12 164,16', '#D19A74', 1.4) +
    `<path d="M152,18 C156,22 164,22 168,18" fill="none" stroke="#C88E68" stroke-width="1.6"/>` +
    Ln('M152,18 C134,16 110,18 82,26 M168,18 C186,16 210,18 238,26', '#C88E68', 2) +
    Ln('M160,24 L160,104', '#D3A07B', 3.4) + Ln('M160,104 L160,112', '#D3A07B', 1.8) +
    Ln('M88,86 C104,98 132,102 154,94 M232,86 C216,98 188,102 166,94', '#CF9670', 1.8) +
    `<circle cx="110" cy="84" r="5.5" fill="#D99A86" stroke="#B9786A" stroke-width="1"/><circle cx="110" cy="84" r="2" fill="#B9786A"/>` +
    `<circle cx="210" cy="84" r="5.5" fill="#D99A86" stroke="#B9786A" stroke-width="1"/><circle cx="210" cy="84" r="2" fill="#B9786A"/>` +
    Ln('M96,150 C116,128 140,114 160,112 C180,114 204,128 224,150', '#CF9670', 1.8) +
    Ln('M74,118 C80,128 84,140 86,150 M246,118 C240,128 236,140 234,150', '#D8A584', 1.2, 'opacity=".7"');
}
S.handsTop = (o={}) => {
  const t = o.type || 'adult';
  if(t==='infant') return svg(
    `<rect x="-2" y="-2" width="324" height="174" fill="#F7E3D2"/>` +
    `<path d="M70,-4 L250,-4 C262,40 262,110 250,174 L70,174 C58,110 58,40 70,-4 Z" fill="url(#gb)" ${st()}/>` +
    Ln('M130,6 C142,14 178,14 190,6', '#DDAF8E', 1.6) +
    `<circle cx="122" cy="70" r="4" fill="#E6A99A" stroke="#C98677" stroke-width="1"/><circle cx="198" cy="70" r="4" fill="#E6A99A" stroke="#C98677" stroke-width="1"/>` +
    `<path d="M112,70 H208" stroke="${K.line}" stroke-width="1.4" stroke-dasharray="5 4"/>` + T(232, 64, 'линия сосков', 10, K.line, 800, 'start') +
    Ln('M160,22 L160,110', '#E1B595', 2.6) + `<circle cx="160" cy="150" r="3" fill="#D9A585"/>` +
    target(160, 84, 9) +
    `<g class="fa-press">${twoFingersDown(160, 82, 1.15)}<path d="M154,30 C150,10 148,-4 150,-10 L178,-10 C180,0 180,14 176,32 Z" fill="url(#gr2)" ${st(1.3)}/></g>` +
    T(40, 120, '≈ 4 см', 15, K.mark, 900) + T(40, 138, 'на треть', 11, K.line, 800) + T(40, 152, 'груди', 11, K.line, 800), 'Два пальца в центр груди ниже линии сосков');
  if(t==='child') return svg(chestTop() + target(160, 92, 9) +
    `<g class="fa-press">${forearm(118, 94, 4, 140, 34)}${dorsalHand(118, 94, 4, 0.92, {fa:[-14,-12,-10,-6]})}</g>` +
    T(292, 44, 'одна', 13, K.line, 800, 'end') + T(292, 60, 'ладонь', 13, K.line, 800, 'end') + T(292, 158, '≈ 5 см', 14, K.mark, 900, 'end'), 'Основание одной ладони на нижнюю половину грудины');
  return svg(chestTop() + target(160, 94, 10) +
    `<g class="fa-press">${interlocked(152, 94, 0, 0.98)}</g>` +
    T(300, 44, 'центр', 13, K.line, 800, 'end') + T(300, 60, 'груди', 13, K.line, 800, 'end') + T(300, 158, '5–6 см', 14, K.mark, 900, 'end'), 'Основание ладони в центр груди, вторая сверху, пальцы в замок');
};

S.compress = (o={}) => {
  const t = o.type || 'adult';
  if(t==='infant') return svg(floor() + babyLying() +
    `<g class="fa-push">${L('M262,4 L188,40', K.rShirtS, 13)}<path d="M180,30 C176,40 172,50 170,56 L190,58 C196,48 200,40 198,30 Z" fill="url(#gr2)" ${st(1.3)}/>${twoFingersDown(176, 90, 0.72)}</g>` + target(172, 100, 6) +
    T(64, 34, '≈ 4 см', 15, K.mark, 900) + T(64, 52, '2 пальца', 12, K.line, 800), 'Нажимайте двумя пальцами');
  const child = t==='child';
  return svg(floor() + rescuerLegs() + lyingAdult({chestCls:'fa-chest'}) + rescuerUpper() +
    `<g transform="translate(36,60)">${arrow('M0,0 V30','fa-blink')}${T(0,-8, child?'≈ 5 см':'5–6 см', 14, K.mark, 900)}</g>` +
    T(250, 28, child ? 'одна ладонь' : 'руки прямые', 13, K.line, 800), 'Давите на грудь в такт сигналу');
};

S.breath = (o={}) => {
  const baby = (o.type==='infant');
  return svg(floor(152) +
    `<g class="fa-rise2">` + P('M150,100 C168,90 190,88 214,90 L320,92 L320,152 L150,152 Z', baby ? K.onesie : K.vShirt) + `</g>` +
    P('M128,106 C136,98 150,94 160,94 L164,152 L132,152 Z', baby ? 'url(#gb)' : 'url(#gs)') +
    headUp(102, 112, baby ? 1.25 : 1.3, {baby}) +
    headProfile(baby ? 118 : 128, baby ? 52 : 46, 1.15, -62, {}) +
    (baby
      ? T(254, 30, 'рот и нос', 14, K.line, 800) + T(254, 48, 'малыша вместе', 12, K.line, 700)
      : `<g transform="translate(96,60) rotate(70) scale(.5)">${finger(0,-6,34,11,0)}${finger(0,8,30,13,10)}</g>` +
        `<path d="M94,52 C80,40 66,30 50,24" fill="none" stroke="${K.line}" stroke-width="15" stroke-linecap="round"/><path d="M94,52 C80,40 66,30 50,24" fill="none" stroke="${K.rShirtS}" stroke-width="12" stroke-linecap="round"/>` +
        T(254, 30, 'нос зажат', 14, K.line, 800) + T(254, 48, 'рот к рту', 12, K.line, 700)) +
    `<g class="fa-air">${arrow('M130,64 C128,70 126,74 124,78', '', true)}</g>` +
    arrow('M300,84 V62', 'fa-blink', true) + T(252, 76, 'грудь вверх?', 13, K.water, 900), 'Сделайте вдохи, грудь должна подняться');
};

S.recovery = () => svg(
  `<rect width="320" height="170" fill="#DCE3EC"/>` +
  L('M120,92 L120,40 L108,22', K.vShirtS, 13) + `<g transform="translate(106,18) rotate(-110) scale(.34)">${dorsalHand(0,0,0,1,{g:'url(#gs)', g2:'url(#gs2)'})}</g>` +
  L('M206,100 L300,96', 'url(#gjeans)', 22) + P('M296,86 C306,84 312,90 312,96 C312,104 306,108 298,106 Z', K.shoe) +
  P('M96,82 C104,74 124,72 144,74 L200,80 C214,84 218,96 214,110 C200,118 150,118 112,114 C96,110 90,96 96,82 Z', K.vShirt, 'fa-breathe') +
  Ln('M140,78 C146,90 146,104 140,114', K.vShirtS, 1.2) +
  L('M200,104 L232,140 L282,136', 'url(#gjeans)', 22) + P('M280,128 C292,126 298,132 298,138 C298,146 290,150 280,148 Z', K.shoe) +
  `<g transform="translate(70,96) rotate(90)">${headProfile(0,0,0.62,0,{g:'url(#gs)', hair:K.hair})}</g>` +
  L('M124,96 C112,110 96,118 84,118', K.vShirtS, 12) + `<g transform="translate(80,118) rotate(180) scale(.3)">${dorsalHand(0,0,0,1,{g:'url(#gs)', g2:'url(#gs2)'})}</g>` +
  num(92, 18, 1) + T(104, 23, 'рука вперёд', 11, K.line, 800, 'start') +
  num(28, 140, 2) + T(40, 145, 'кисть под щёку', 11, K.line, 800, 'start') +
  num(222, 162, 3) + T(234, 166, 'колено согнуто', 11, K.line, 800, 'start') +
  T(48, 72, 'рот вниз', 11, K.mark, 900), 'Положение на боку');

function victimForearm(){
  return P('M20,104 C20,94 28,92 36,92 L250,86 C262,86 270,92 270,100 C270,110 262,116 250,116 L36,118 C26,118 20,114 20,104 Z', 'url(#gs)') +
    `<g transform="translate(266,101) scale(.5)">${[-12,-4,4,12].map((yy,i)=>finger(10, yy, [36,40,38,30][i], 9, 0, 'url(#gs)')).join('')}${finger(-4,-18,30,11,-30,'url(#gs)')}<path d="M-6,-16 C6,-18 14,-16 16,-12 L16,12 C14,16 6,18 -6,16 Z" fill="url(#gs)" ${st(3)}/></g>`;
}
S.press = () => svg(floor(130) + victimForearm() +
  `<ellipse cx="140" cy="102" rx="16" ry="5" fill="${K.blood}"/>` +
  `<rect x="110" y="84" width="62" height="24" rx="4" fill="${K.cloth}" ${st()}/>` + Ln('M114,92 H168 M114,100 H168', K.clothS, 1) +
  `<g class="fa-press">${forearm(120, 98, 70, 120, 34)}${dorsalHand(120, 98, -20, 0.62, {fa:[-6,-4,-2,0]})}</g>` +
  arrow('M74,22 V56', 'fa-blink') + T(74, 16, 'сильно, 10 мин', 12, K.mark, 900), 'Прижмите рану тканью и давите');

S.bandage = () => svg(floor(130) + victimForearm() +
  `<rect x="118" y="80" width="46" height="18" rx="5" fill="${K.clothS}" ${st()}/>` +
  [0,1,2,3,4,5].map(i => `<rect class="fa-wrap fa-d${i}" x="${92+i*16}" y="84" width="24" height="36" rx="3" fill="${K.cloth}" ${st()} transform="skewX(-14)"/>`).join('') +
  `<g class="fa-wrap fa-d6"><circle cx="210" cy="122" r="5" fill="${K.cloth}" ${st()}/><path d="M210,126 l-6,12 M210,126 l7,11" stroke="${K.line}" stroke-width="2"/></g>` +
  T(160, 30, 'валик → туго, витки внахлёст', 13, K.line, 800) + T(210, 160, 'узел сбоку', 11, K.line, 700), 'Давящая повязка');

S.moreCloth = () => svg(floor(130) + victimForearm() +
  `<rect x="108" y="84" width="70" height="34" rx="4" fill="${K.cloth}" ${st()}/>` +
  `<ellipse cx="140" cy="100" rx="18" ry="8" fill="${K.blood}" opacity=".75"/>` +
  `<g class="fa-drop"><rect x="104" y="70" width="78" height="20" rx="4" fill="#fff" ${st()}/></g>` +
  T(240, 34, 'старую не снимать', 13, K.mark, 900) + T(240, 52, 'новую — сверху', 13, K.line, 800), 'Положите ещё ткань сверху');

function thigh(labels=true){
  return P('M6,64 C10,56 24,52 40,52 L232,62 C252,62 266,70 272,82 C286,82 300,88 304,98 C302,110 290,116 274,116 C266,124 252,126 236,124 L40,130 C22,130 8,124 6,112 Z', 'url(#gs)') +
    Ln('M30,54 C36,76 36,108 30,128', '#D8A584', 1.4) +
    `<ellipse cx="276" cy="99" rx="14" ry="11" fill="#F1C29F" stroke="#C88E68" stroke-width="1.3"/>` +
    Ln('M60,70 C120,74 180,76 230,76', '#F9DEC6', 3, 'opacity=".7"') +
    (labels ? T(18, 44, 'бедро', 11, K.soft, 800, 'start') + T(296, 72, 'колено', 11, K.soft, 800, 'end') : '');
}
S.tqMeasure = () => svg(floor(142) + thigh() +
  `<ellipse cx="178" cy="94" rx="12" ry="5" fill="${K.blood}"/>` + T(178, 140, 'рана', 11, K.blood, 900) +
  `<g class="fa-pulse">${[0,1,2,3].map(i => `<g transform="translate(${122+i*12},50) rotate(90)">${finger(0,0,62,11.5,0)}</g>`).join('')}</g>` +
  `<path d="M116,44 H170" stroke="${K.mark}" stroke-width="2.4"/><path d="M116,38 v12 M170,38 v12" stroke="${K.mark}" stroke-width="2.4"/>` +
  T(143, 30, '4 пальца = 5–7 см', 13, K.mark, 900) +
  `<rect x="100" y="54" width="10" height="74" rx="3" fill="#7C4A2D" ${st()} class="fa-blink"/>` + T(98, 158, 'жгут здесь', 12, K.line, 900), 'Отмерьте 4 пальца выше раны');

S.tqTwist = () => svg(floor(142) + thigh(false) +
  `<ellipse cx="178" cy="94" rx="12" ry="5" fill="${K.blood}" opacity=".5"/>` +
  `<rect x="98" y="54" width="18" height="76" rx="4" fill="#7C4A2D" ${st()}/>` + Ln('M101,60 V124 M113,60 V124', '#5E3720', 1) +
  `<g class="fa-spin" style="transform-origin:107px 50px"><rect x="64" y="46" width="86" height="8" rx="4" fill="#A16207" ${st()}/></g>` +
  arrow('M146,26 q-38,-18 -76,0', 'fa-blink') + T(232, 30, 'крутите, пока', 13, K.line, 800) + T(232, 46, 'кровь не остановится', 12, K.line, 700) +
  T(60, 104, '14:35', 13, K.mark, 900, 'start') + T(60, 158, 'запишите время', 11, K.mark, 800, 'start'), 'Закрутите жгут палкой');

S.chokeSign = () => svg(floor() + standVictim(0, 'throat') +
  `<g class="fa-blink"><path d="M92,34 l-12,-6 M90,46 l-14,0 M94,58 l-12,6" stroke="${K.mark}" stroke-width="2.6" stroke-linecap="round"/></g>` +
  T(236, 46, 'не может', 14, K.line, 800) + T(236, 64, 'говорить, кашлять,', 12, K.line, 700) + T(236, 80, 'дышать', 12, K.line, 700) +
  T(236, 116, 'Воду не давать!', 13, K.mark, 900), 'Человек подавился');

S.backBlows = () => svg(floor() +
  L('M214,56 L150,96 L114,96', K.rShirtS, 10) +
  L('M150,96 L146,140', 'url(#gjeans)', 18) + L('M160,96 L166,140', 'url(#gjeans)', 18) +
  L('M154,94 L102,70', K.vShirt, 34) + headProfile(80, 80, 0.48, -40, {g:'url(#gs)', hair:K.hair, open:true}) +
  L('M110,76 L102,112', K.vShirtS, 10) +
  Ln('M118,58 q8,-6 16,0 M132,64 q8,-6 16,0', K.vShirtS, 2) + target(128, 64, 8) +
  L('M222,96 L218,140', K.rPants, 18) + L('M232,96 L238,140', K.rPants, 18) +
  L('M226,96 L214,46', K.rShirt, 30) + headProfile(210, 28, 0.48, 10) +
  `<g class="fa-strike" style="transform-origin:212px 50px">` + L('M212,50 L172,32', K.rShirtS, 11) + L('M172,32 L148,52', 'url(#gr)', 9) +
  `<g transform="translate(144,56) rotate(140) scale(.3)">${dorsalHand(0,0,0,1)}</g></g>` +
  T(62, 24, 'между лопатками', 12, K.mark, 900, 'start'), 'Удары между лопатками');

S.hug = () => svg(floor() + standVictim(18) +
  L('M172,96 L150,140', K.rPants, 18) + L('M182,96 L196,140', K.rPants, 18) +
  P('M136,134 L160,134 Q162,140 160,143 L136,143 Z', K.shoe) + P('M190,134 L214,134 Q216,140 214,143 L190,143 Z', K.shoe) +
  L('M176,96 L166,44', K.rShirt, 30) + headProfile(162, 26, 0.48, 6) +
  L('M160,56 L146,88 L122,90', K.rShirtS, 10) + `<g transform="translate(116,90) scale(.3)">${fistGrip(0,0,1)}</g>` +
  T(250, 30, 'нога вперёд', 13, K.line, 800) + T(250, 48, 'обхватить', 13, K.line, 800) + T(250, 64, 'на уровне пояса', 11, K.line, 700), 'Встаньте сзади и обхватите');

S.thrust = () => svg(
  `<path d="M60,-4 L260,-4 C268,40 272,100 266,174 L54,174 C48,100 52,40 60,-4 Z" fill="url(#gbelly)" ${st()}/>` +
  Ln('M96,40 C120,22 140,12 160,10 C180,12 200,22 224,40', '#CF9670', 2) + Ln('M160,0 L160,12', '#D3A07B', 3) +
  T(236, 30, 'рёбра', 11, K.soft, 800, 'start') +
  Ln('M158,140 C156,146 158,150 162,150 C166,150 166,144 162,140', '#B9806A', 1.8) + `<ellipse cx="161" cy="145" rx="3" ry="4" fill="#C8907A"/>` +
  T(196, 152, 'пупок', 11, K.soft, 800, 'start') +
  `<path d="M-4,96 C30,92 70,90 110,92 L110,118 C70,120 30,122 -4,124 Z" fill="url(#gr)" ${st()}/><path d="M-4,92 L30,90 L30,126 L-4,128 Z" fill="${K.rShirt}" ${st()}/>` +
  `<path d="M324,90 C290,88 250,88 212,90 L212,116 C250,118 290,120 324,122 Z" fill="url(#gr)" ${st()}/><path d="M324,86 L290,86 L290,124 L324,126 Z" fill="${K.rShirt}" ${st()}/>` +
  `<g class="fa-thrust">${fistGrip(160, 104, 1.05)}</g>` +
  `<path d="M150,128 L172,128" stroke="${K.mark}" stroke-width="2" stroke-dasharray="3 3"/>` +
  arrow('M206,92 C214,70 214,50 204,36', 'fa-blink') + T(232, 76, 'на себя', 14, K.mark, 900, 'start') + T(232, 94, 'и вверх', 14, K.mark, 900, 'start') +
  T(80, 160, 'кулак выше пупка', 12, K.line, 900), 'Кулак выше пупка, толчок на себя и вверх');

S.infantBack = () => svg(floor(156) +
  L('M300,128 L60,112', K.rPants, 24) +
  `<path d="M300,92 C240,98 160,110 96,122 L94,132 C160,122 240,108 300,104 Z" fill="url(#gr)" ${st()}/>` +
  P('M110,100 C120,90 140,88 150,88 L222,82 C232,82 236,88 234,94 L232,104 L112,112 Z', K.onesie) +
  `<g transform="translate(94,114) rotate(180)">${headUp(0,0,0.55,{baby:true})}</g>` +
  `<g transform="translate(80,124) rotate(-10) scale(.32)">${finger(0,-10,40,11,0)}${finger(0,6,44,11,6)}</g>` +
  target(150, 92, 7) +
  `<g class="fa-strike" style="transform-origin:230px 20px">` + L('M262,6 L196,36', K.rShirtS, 11) +
  `<g transform="translate(190,44) rotate(150) scale(.34)">${dorsalHand(0,0,0,1)}</g></g>` +
  T(40, 32, 'голова ниже тела', 13, K.line, 800, 'start') + T(40, 50, 'держите челюсть', 11, K.line, 700, 'start'), 'Малыш лицом вниз на предплечье, удары между лопатками');

S.infantChest = () => svg(floor(156) +
  L('M300,128 L60,116', K.rPants, 24) +
  `<path d="M300,124 C240,124 160,126 96,128 L96,138 C160,138 240,136 300,136 Z" fill="url(#gr)" ${st()}/>` +
  P('M112,112 C122,100 140,98 152,98 L224,96 C234,98 236,104 236,110 L234,122 L114,126 Z', K.onesie) +
  headUp(96, 116, 0.55, {baby:true}) +
  `<path d="M130,100 h44" stroke="${K.line}" stroke-width="1.3" stroke-dasharray="4 4"/>` +
  `<g class="fa-push">${L('M262,6 L190,40', K.rShirtS, 12)}<path d="M180,32 C176,42 172,52 170,58 L190,60 C196,50 200,42 198,32 Z" fill="url(#gr2)" ${st(1.3)}/>${twoFingersDown(176, 90, 0.62)}</g>` +
  T(40, 36, 'на спине', 13, K.line, 800, 'start') + T(40, 54, '2 пальца ниже', 11, K.line, 700, 'start') + T(40, 68, 'линии сосков', 11, K.line, 700, 'start'), 'Малыш на спине, два пальца в центр груди');

S.infantCheck = () => svg(floor() + babyLying() +
  `<g class="fa-shake">${L('M304,16 L290,96', K.rShirtS, 11)}<g transform="translate(288,104) rotate(100) scale(.34)">${dorsalHand(0,0,0,1)}</g></g>` +
  Ln('M268,100 l-6,-8 M278,96 l0,-10', K.mark, 2.2, 'class="fa-blink"') +
  T(150, 40, 'пощекочите стопу', 14, K.line, 800) + T(150, 60, 'не трясите', 13, K.mark, 900), 'Пощекочите стопу');

S.burnCool = () => svg(floor(150) +
  `<rect x="118" y="6" width="70" height="16" rx="6" fill="#94A3B8" ${st()}/><rect x="170" y="18" width="14" height="22" rx="4" fill="#94A3B8" ${st()}/>` +
  `<g class="fa-water"><path d="M177,40 V96" stroke="${K.water}" stroke-width="12" stroke-dasharray="10 8" stroke-linecap="round" opacity=".85"/></g>` +
  victimForearm() +
  `<ellipse cx="176" cy="102" rx="22" ry="8" fill="#F28B82" stroke="${K.blood}" stroke-width="1.4"/>` +
  `<path class="fa-water" d="M150,120 q-6,14 -2,22 M200,120 q6,14 2,22" stroke="${K.water}" stroke-width="4" stroke-linecap="round" fill="none"/>` +
  badge(16, 16, '20 минут', 84, K.water), 'Охлаждайте проточной водой 20 минут');

S.burnCover = () => svg(floor(150) + victimForearm() +
  `<ellipse cx="150" cy="102" rx="24" ry="8" fill="#F28B82" stroke="${K.blood}" stroke-width="1.4"/>` +
  `<rect class="fa-film" x="102" y="80" width="100" height="42" rx="6" fill="#BFE3FF" opacity=".55" stroke="${K.water}" stroke-width="2"/>` +
  `<path d="M108,86 l20,30 M140,84 l20,32 M172,84 l20,32" stroke="#fff" stroke-width="2" opacity=".7" class="fa-film"/>` +
  T(150, 38, 'плёнка, не туго', 14, K.line, 800) + T(150, 150, 'масло, лёд, крем — нельзя', 13, K.mark, 900), 'Закройте плёнкой');

function body(zones){
  const hi = n => zones.includes(n);
  const f = (n, base) => hi(n) ? '#FCA5A5' : base;
  const z = n => hi(n) ? 'fa-zone' : '';
  return `<g transform="translate(60,8)">` +
    C(40, 16, 14, f('face','url(#gs)'), z('face')) +
    `<rect x="34" y="28" width="12" height="8" fill="${f('neck','url(#gs)')}" ${st()} class="${z('neck')}"/>` +
    P('M14,38 Q40,32 66,38 L70,92 L10,92 Z', f('back', K.vShirt), z('back')) +
    P('M10,92 L70,92 L68,106 L12,106 Z', f('pelvis', K.vPants), z('pelvis')) +
    L('M14,42 L4,90', K.vShirtS, 10) + L('M66,42 L76,90', K.vShirtS, 10) +
    C(3, 96, 6, f('hands','url(#gs)'), z('hands')) + C(77, 96, 6, f('hands','url(#gs)'), z('hands')) +
    P('M14,106 L36,106 L34,150 L18,150 Z', f('thigh', K.vPants), z('thigh')) + P('M44,106 L66,106 L62,150 L46,150 Z', f('thigh', K.vPants), z('thigh')) +
    `<rect x="14" y="148" width="22" height="8" rx="4" fill="${f('feet', K.shoe)}" class="${z('feet')}"/><rect x="44" y="148" width="22" height="8" rx="4" fill="${f('feet', K.shoe)}" class="${z('feet')}"/>` +
    `</g>`;
}
S.zones = (o={}) => svg(body(o.zones||[]) + (o.side||''), 'Опасные зоны');

S.diabCheck = () => svg(
  `<path d="M6,72 C40,66 100,60 140,58 C156,58 166,64 166,76 C166,88 156,92 140,92 C100,94 40,98 6,102 Z" fill="url(#gs)" ${st()}/>` +
  `<g class="fa-pulse"><rect x="96" y="54" width="30" height="44" rx="6" fill="#DC2626" ${st()}/>` +
  `<text x="111" y="73" font-size="14" font-weight="900" fill="#fff" text-anchor="middle" font-family="system-ui,sans-serif">✚</text><text x="111" y="89" font-size="7" font-weight="900" fill="#fff" text-anchor="middle" font-family="system-ui,sans-serif">ДИАБЕТ</text></g>` +
  T(80, 126, 'браслет или кулон', 13, K.line, 800) + T(80, 144, '«диабет»', 13, K.mark, 900) +
  P('M206,40 L300,40 L300,140 L206,140 Z', 'url(#gjeans)') + Ln('M206,64 H300', K.line, 1.6) +
  `<g class="fa-peek"><rect x="232" y="10" width="16" height="70" rx="6" fill="#E5E7EB" ${st()}/><rect x="232" y="10" width="16" height="14" rx="4" fill="#2563EB" ${st()}/><rect x="235" y="36" width="10" height="18" rx="2" fill="#93C5FD"/></g>` +
  T(253, 160, 'шприц-ручка', 12, K.line, 800), 'Ищите браслет и шприц-ручку');

S.sugar = () => svg(
  `<path d="M40,40 L52,140 L104,140 L116,40 Z" fill="#FDBA74" opacity=".9" stroke="${K.line}" stroke-width="2"/><path d="M40,40 L116,40" stroke="${K.line}" stroke-width="2"/>` +
  `<path d="M96,40 L120,6" stroke="#EF4444" stroke-width="5" stroke-linecap="round"/>` + T(78, 160, 'сок', 13, K.line, 800) +
  [0,1,2,3].map(i => `<rect class="fa-pulse" x="${140+(i%2)*30}" y="${80+Math.floor(i/2)*30}" width="26" height="26" rx="3" fill="#fff" ${st()}/>`).join('') +
  T(169, 160, '4–5 кусочков', 13, K.line, 800) +
  `<ellipse cx="262" cy="112" rx="34" ry="14" fill="#FCD34D" ${st()}/><path d="M228,112 v-14 a34,14 0 0 1 68,0 v14" fill="#FDE68A" ${st()}/>` +
  T(262, 160, 'ложка мёда', 13, K.line, 800), 'Быстрый сахар');

S.clock = (o={}) => svg(
  `<g transform="translate(110,85)"><circle r="62" fill="#fff" stroke="${K.line}" stroke-width="3"/>` +
  [...Array(12)].map((_,i)=>`<line x1="0" y1="-54" x2="0" y2="-46" stroke="${K.line}" stroke-width="3" transform="rotate(${i*30})"/>`).join('') +
  (o.stamp ? `<line x1="0" y1="0" x2="0" y2="-34" stroke="${K.line}" stroke-width="5" stroke-linecap="round" transform="rotate(30)"/><line x1="0" y1="0" x2="0" y2="-48" stroke="${K.line}" stroke-width="3" stroke-linecap="round" transform="rotate(210)"/>`
           : `<g class="fa-sweep"><line x1="0" y1="0" x2="0" y2="-50" stroke="${K.mark}" stroke-width="4" stroke-linecap="round"/></g>`) +
  `<circle r="5" fill="${K.line}"/></g>` +
  (o.stamp ? `<g transform="translate(220,46)" class="fa-pulse"><rect width="84" height="84" rx="14" fill="#16A34A"/><path d="M22,44 l14,14 l28,-30" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>` + T(262, 154, 'время запомнено', 12, K.line, 800)
           : badge(206, 70, o.label || '', 100, K.water) + T(256, 120, 'обратный отсчёт', 12, K.line, 700)), o.stamp ? 'Время отмечено' : 'Таймер');

S.noMouth = () => svg(
  `<g transform="translate(40,30)"><path d="M0,0 L10,90 L50,90 L60,0 Z" fill="#BFDBFE" stroke="${K.line}" stroke-width="2"/>${cross(30,45,64)}</g>` +
  `<g transform="translate(140,40)"><rect x="0" y="20" width="60" height="26" rx="13" fill="#fff" stroke="${K.line}" stroke-width="2"/><path d="M30,20 v26" stroke="${K.line}" stroke-width="2"/>${cross(30,33,58)}</g>` +
  T(160, 150, 'ничего в рот', 15, K.mark, 900) + T(262, 70, 'может', 13, K.line, 800) + T(262, 88, 'захлебнуться', 13, K.line, 800), 'Ничего не давайте в рот');

// лицо анфас: брови, глаза со зрачками, нос, губы, уши
function faceFront(x, y, s=1, droop=false){
  return `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M-30,-6 C-30,-34 -16,-44 0,-44 C16,-44 30,-34 30,-6 C30,18 18,36 0,38 C-18,36 -30,18 -30,-6 Z" fill="url(#gs)" ${st()}/>` +
    `<path d="M-31,-8 C-32,-36 -16,-48 2,-46 C18,-46 32,-36 31,-8 C26,-26 16,-34 0,-34 C-14,-34 -26,-26 -31,-8 Z" fill="${K.hair}" ${st(1.2)}/>` +
    `<ellipse cx="-31" cy="0" rx="4" ry="8" fill="url(#gs)" ${st(1.1)}/><ellipse cx="31" cy="0" rx="4" ry="8" fill="url(#gs)" ${st(1.1)}/>` +
    Ln('M-19,-16 q6,-3 12,0 M7,-16 q6,-3 12,0', K.hair, 2.2) +
    `<ellipse cx="-12" cy="-8" rx="5" ry="3.2" fill="#fff" ${st(.9)}/><circle cx="-12" cy="-8" r="2" fill="${K.line}"/>` +
    `<ellipse cx="12" cy="${droop?-6:-8}" rx="5" ry="${droop?2.4:3.2}" fill="#fff" ${st(.9)}/><circle cx="12" cy="${droop?-6:-8}" r="2" fill="${K.line}"/>` +
    Ln('M0,-6 C-2,2 -4,6 -2,8 C0,9 3,9 4,7', K.soft, 1.3) +
    (droop
      ? `<path d="M-12,18 C-6,15 4,17 10,22 C12,24 13,27 12,28 C6,24 -4,22 -12,18 Z" fill="${K.lip}" stroke="${K.lipD}" stroke-width="1"/>`
      : `<path d="M-12,16 C-6,13 6,13 12,16 C6,22 -6,22 -12,16 Z" fill="${K.lip}" stroke="${K.lipD}" stroke-width="1"/>`) +
    `</g>`;
}
S.fast = () => svg(
  faceFront(56, 68, 1, true) + `<g class="fa-blink">${arrow('M84,82 L74,96')}</g>` +
  T(56, 128, 'улыбка', 13, K.line, 800) + T(56, 146, 'перекошена', 12, K.mark, 900) +
  `<g transform="translate(160,30)">${faceFront(0,6,0.32)}${P('M-16,22 L16,22 L18,74 L-18,74 Z', K.vShirt)}${L('M14,30 L56,26', K.vShirtS, 9)}<g class="fa-drift" style="transform-origin:-14px 30px">${L('M-14,30 L-56,26', K.vShirtS, 9)}</g></g>` +
  T(160, 128, 'руки', 13, K.line, 800) + T(160, 146, 'одна падает', 12, K.mark, 900) +
  `<g transform="translate(266,40)"><path d="M-36,-20 h72 a10,10 0 0 1 10,10 v32 a10,10 0 0 1 -10,10 h-46 l-12,12 v-12 h-14 a10,10 0 0 1 -10,-10 v-32 a10,10 0 0 1 10,-10z" fill="#fff" stroke="${K.line}" stroke-width="2"/><path d="M-26,4 q6,-12 12,0 t12,0 t12,0 t12,0" fill="none" stroke="${K.mark}" stroke-width="3" class="fa-blink"/></g>` +
  T(266, 128, 'речь', 13, K.line, 800) + T(266, 146, 'невнятная', 12, K.mark, 900), 'Три признака инсульта');

S.strokeWait = () => svg(floor() +
  `<rect x="22" y="110" width="66" height="26" rx="12" fill="#E5E7EB" ${st()}/>` +
  P('M96,112 C100,100 112,96 124,96 L200,104 C212,108 212,114 212,120 L212,142 L92,142 Z', K.vShirt) + L('M210,120 L300,128', 'url(#gjeans)', 22) +
  headUp(66, 100, 0.6) +
  `<g transform="translate(232,20)"><path d="M0,0 L6,42 L30,42 L36,0 Z" fill="#BFDBFE" stroke="${K.line}" stroke-width="2"/>${cross(18,22,40)}</g>` +
  `<g transform="translate(280,30)"><rect x="-14" y="6" width="28" height="14" rx="7" fill="#fff" stroke="${K.line}" stroke-width="2"/>${cross(0,13,30)}</g>` +
  T(80, 40, 'голова чуть выше', 12, K.line, 800), 'Уложите, голова чуть приподнята');

S.anaphSigns = () => svg(
  `<g transform="translate(90,82)">${faceFront(0,0,1.25)}` +
  `<ellipse cx="0" cy="22" rx="18" ry="9" fill="#EF6F6F" stroke="${K.lipD}" stroke-width="1.6" class="fa-swell"/>` +
  [[-26,6],[-22,-26],[24,-28],[28,8],[-8,-34],[12,-38],[-30,20],[30,22]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.6" fill="#FCA5A5" stroke="#EF4444" stroke-width="1"/>`).join('') + `</g>` +
  `<g class="fa-blink"><path d="M160,108 q12,-8 0,-16 q-12,-8 0,-16" fill="none" stroke="${K.water}" stroke-width="3"/><path d="M176,108 q12,-8 0,-16 q-12,-8 0,-16" fill="none" stroke="${K.water}" stroke-width="3"/></g>` +
  T(250, 50, 'отёк губ, языка', 13, K.line, 800) + T(250, 72, 'трудно дышать', 13, K.mark, 900) + T(250, 94, 'сыпь, слабость', 13, K.line, 800), 'Признаки анафилаксии');

// шприц-ручка с адреналином: синий предохранитель, корпус с этикеткой и окошком, оранжевый кончик
function injector(x, y, s=1, rot=0, capOff=false){
  const tx = (yy, txt, size, fill, w=900) => `<text x="0" y="${yy}" font-size="${size}" font-weight="${w}" fill="${fill}" text-anchor="middle" font-family="system-ui,sans-serif">${txt}</text>`;
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">` +
    (capOff ? '' : `<rect x="-11" y="-74" width="22" height="16" rx="5" fill="#2563EB" ${st()}/>` + Ln('M-6,-70 V-62 M0,-70 V-62 M6,-70 V-62', '#1D4ED8', 1.2)) +
    `<path d="M-12,-58 L12,-58 L13,22 C13,26 10,28 6,28 L-6,28 C-10,28 -13,26 -13,22 Z" fill="url(#gpen)" ${st()}/>` +
    `<rect x="-9" y="-46" width="18" height="40" rx="3" fill="#fff" stroke="#B59400" stroke-width="1"/>` +
    tx(-34, 'АДРЕ-', 5.2, K.line) + tx(-27, 'НАЛИН', 5.2, K.line) + tx(-17, '0,3 мг', 4.6, K.mark, 700) +
    `<rect x="-5" y="-2" width="10" height="12" rx="2" fill="#BFE3FF" stroke="#7FA9C9" stroke-width=".8"/>` +
    Ln('M-11,14 H11 M-11,18 H11', '#B59400', 1) +
    `<path d="M-10,28 L10,28 L8,44 C8,47 6,48 4,48 L-4,48 C-6,48 -8,47 -8,44 Z" fill="#F97316" ${st()}/>` +
    `</g>`;
}
S.phonePen = () => svg(
  `<g transform="translate(40,20)"><rect width="64" height="120" rx="12" fill="${K.line}"/><rect x="5" y="12" width="54" height="94" rx="4" fill="#fff"/>` +
  `<text x="32" y="60" font-size="22" font-weight="900" fill="${K.mark}" text-anchor="middle" font-family="system-ui,sans-serif">103</text><text x="32" y="80" font-size="8" font-weight="800" fill="${K.line}" text-anchor="middle" font-family="system-ui,sans-serif">анафилаксия</text></g>` +
  P('M160,76 L292,76 L302,156 L150,156 Z', '#8B5E3C') + Ln('M160,76 q66,-44 132,0', K.line, 3) + Ln('M170,96 H284', '#6E4A2F', 1.4) +
  `<g class="fa-peek">${injector(226, 96, 1)}</g>` + T(226, 168, 'шприц-ручка', 12, K.line, 800), 'Звоните 103 и найдите шприц-ручку');

S.inject = () => svg(floor(152) +
  `<path d="M6,94 C6,74 22,68 40,68 L250,66 C272,66 286,78 286,96 C286,114 272,124 250,124 L40,124 C22,124 6,116 6,94 Z" fill="url(#gjeans)" ${st()}/>` +
  Ln('M30,72 L270,70', '#5D6C86', 1.2, 'stroke-dasharray="5 4"') + T(150, 146, 'наружная сторона бедра', 12, K.line, 800) + target(150, 68, 8) + `<g transform="translate(0,0)">` +
  `<g class="fa-push"><g transform="translate(0,30)">${injector(150, 14, 0.78, 0, true)}` +
  `<path d="M134,-8 C134,-14 140,-16 150,-16 C160,-16 166,-14 166,-8 L166,22 C166,28 160,30 150,30 C140,30 134,28 134,22 Z" fill="url(#gr2)" ${st()}/>` +
  [-6,4,14].map(yy=>Ln(`M136,${yy} C144,${yy+2} 156,${yy+2} 164,${yy}`, '#B57C55', 1.1)).join('') +
  `<path d="M166,-4 C176,-4 182,4 180,12 C178,18 170,18 166,16" fill="url(#gr)" ${st(1.2)}/>` + `</g></g>` +
  `<g transform="translate(250,36) rotate(20)"><rect x="-11" y="-8" width="22" height="16" rx="5" fill="#2563EB" ${st()}/></g>` + T(250, 66, 'колпачок', 10, K.line, 800) +
  `<g class="fa-blink">${T(206, 30, 'щёлк!', 14, K.mark, 900, 'start')}</g>` + badge(16, 14, 'держите 10 с', 104, K.mark) + `</g>`, 'Укол в наружную сторону бедра');

S.legsRaised = () => svg(floor() +
  `<rect x="214" y="104" width="70" height="38" rx="8" fill="#8B5E3C" ${st()}/>` +
  P('M72,124 C74,112 86,108 100,108 L180,112 C190,114 190,118 190,126 L190,142 L72,142 Z', K.vShirt) +
  L('M188,126 L244,104 L296,98', 'url(#gjeans)', 20) +
  headUp(50, 126, 0.6) +
  arrow('M262,60 V86', 'fa-blink') + T(140, 40, 'лёжа, ноги выше', 14, K.line, 800) + T(140, 60, 'вставать нельзя', 13, K.mark, 900), 'Лёжа, ноги приподняты');

S.seizure = () => svg(floor() +
  `<rect x="20" y="122" width="56" height="20" rx="8" fill="#7C3AED" ${st()}/>` + T(48, 160, 'куртка', 11, K.line, 800) +
  `<g class="fa-jerk">` + lyingAdult() + `</g>` +
  `<g transform="translate(120,40)">${P('M-30,-6 q-12,0 -12,6 q0,6 12,6 L30,4 L30,-4 Z','#CBD5E1')}${cross(0,0,50)}</g>` +
  T(246, 34, 'не держать', 14, K.mark, 900) + T(246, 54, 'ничего в рот', 14, K.mark, 900), 'Не держите, ничего в рот');

S.fracture = () => svg(floor(150) +
  `<path d="M6,70 C40,68 90,70 120,74 C150,82 180,96 206,100 L300,98 C310,98 314,104 314,112 C314,120 308,126 300,126 L200,126 C170,122 140,108 116,100 C80,98 40,98 6,98 Z" fill="url(#gs)" ${st()}/>` +
  `<path d="M116,74 C120,82 120,92 116,100" fill="none" stroke="${K.blood}" stroke-width="3" stroke-dasharray="4 3"/>` + `<ellipse cx="120" cy="87" rx="12" ry="16" fill="#9F7AEA" opacity=".25"/>` +
  `<g opacity=".9">${arrow('M200,40 q-40,-10 -80,10')}</g>` + cross(160, 40, 34) +
  T(160, 148, 'не выпрямлять, не вправлять', 13, K.mark, 900), 'Не выпрямляйте и не вправляйте');

/* ----- косынка для руки: 3 кадра по очереди ----- */
function torsoFront(){
  return `<g transform="translate(0,18)"><path d="M100,40 C120,30 140,28 160,28 C180,28 200,30 220,40 L232,170 L88,170 Z" fill="${K.vShirt}" ${st()}/>` +
    `<path d="M146,6 L174,6 L176,34 L144,34 Z" fill="url(#gs)" ${st()}/>` + faceFront(160, -10, 0.55) +
    Ln('M138,34 C146,42 174,42 182,34', K.vShirtS, 1.4) +
    L('M100,44 L90,120', K.vShirtS, 18) + `<ellipse cx="88" cy="128" rx="8" ry="10" fill="url(#gs)" ${st()}/></g>`;
}
function injuredArm(){
  return `<g transform="translate(0,18)">` + L('M220,44 L230,104', K.vShirtS, 18) + `<path d="M232,96 C210,98 180,98 140,94 L140,112 C180,116 210,116 232,114 Z" fill="url(#gs)" ${st()}/>` +
    `<ellipse cx="134" cy="102" rx="10" ry="9" fill="url(#gs)" ${st()}/>` + Ln('M126,98 h-6 M126,104 h-7', K.crease, 1) + `</g>`;
}
const SLING = 'M118,40 L244,96 C236,120 220,128 214,130 L176,124 C190,110 210,70 212,44 Z';
S.sling = () => svg(
  `<g class="fa-f3 fa-k0">${torsoFront()}<path transform="translate(0,18)" d="M118,40 L244,92 L176,160 Z" fill="#FDE68A" opacity=".95" ${st(1.6)}/>${injuredArm()}${num(22,22,1)}${T(36,27,'ткань под руку,',11,K.line,800,'start')}${T(22,44,'конец — на здоровое',11,K.line,800,'start')}${T(22,58,'плечо',11,K.line,800,'start')}${T(276,150,'угол у локтя',11,K.mark,900)}</g>` +
  `<g class="fa-f3 fa-k1">${torsoFront()}${injuredArm()}<path transform="translate(0,18)" d="${SLING}" fill="#FDE68A" opacity=".95" ${st(1.6)}/>${num(22,22,2)}${T(36,27,'нижний конец —',11,K.line,800,'start')}${T(22,44,'поверх руки',11,K.line,800,'start')}${T(22,58,'к плечу',11,K.line,800,'start')}${arrow('M190,166 C230,146 236,96 214,68','fa-blink')}</g>` +
  `<g class="fa-f3 fa-k2">${torsoFront()}${injuredArm()}<path transform="translate(0,18)" d="${SLING}" fill="#FDE68A" opacity=".95" ${st(1.6)}/><circle cx="208" cy="58" r="8" fill="#F59E0B" ${st()}/><circle cx="240" cy="118" r="5" fill="#F59E0B" ${st()}/>${num(22,22,3)}${T(36,27,'узел над',11,K.line,800,'start')}${T(22,44,'ключицей,',11,K.line,800,'start')}${T(22,58,'угол заколоть',11,K.line,800,'start')}${target(208,58,12)}</g>`,
  'Косынка для руки: 3 шага');

/* =================== КАРТА СЦЕН =================== */
const MAP = {
  'compress-adult':()=>S.compress({type:'adult'}), 'compress-child':()=>S.compress({type:'child'}), 'compress-infant':()=>S.compress({type:'infant'}),
  'breath-adult':()=>S.breath({type:'adult'}), 'breath-child':()=>S.breath({type:'child'}), 'breath-infant':()=>S.breath({type:'infant'}),
  'hands-adult':()=>S.handsTop({type:'adult'}), 'hands-child':()=>S.handsTop({type:'child'}), 'hands-infant':()=>S.handsTop({type:'infant'}),
  'airway':()=>S.airway(), 'airway-infant':()=>S.airway({infant:true}),
  'look':()=>S.look(), 'look-infant':()=>S.look({infant:true}),
  'clock5':()=>S.clock({label:'5 минут'}), 'clock15':()=>S.clock({label:'15 минут'}), 'clock20':()=>S.clock({label:'20 минут'}),
  'stamp':()=>S.clock({stamp:true}),
  'zones-burn':()=>S.zones({zones:['face','neck','hands','feet','pelvis'], side: T(250,40,'лицо, шея,',13,K.line,800)+T(250,58,'кисти, стопы,',13,K.line,800)+T(250,76,'пах',13,K.line,800)+T(250,110,'больше ладони',13,K.mark,900)}),
  'zones-fracture':()=>S.zones({zones:['thigh','pelvis','back','neck','face'], side: T(250,40,'бедро, таз,',13,K.line,800)+T(250,58,'спина, шея,',13,K.line,800)+T(250,76,'голова',13,K.line,800)+T(250,110,'звоните 103',13,K.mark,900)})
};
window.FA_ANIM = function(name){ try{ return (MAP[name] || S[name] || (()=>''))(); }catch(e){ return ''; } };

/* =================== АНИМАЦИИ =================== */
const css = `
.fa-anim svg{width:100%;height:100%;display:block}
.fa-target{animation:fa-pulse 1.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.fa-pulse{animation:fa-pulse 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.fa-blink{animation:fa-blink 1.1s ease-in-out infinite}
.fa-shake{animation:fa-shake .35s ease-in-out infinite}
.fa-tilt{animation:fa-tilt 2.6s ease-in-out infinite;transform-box:view-box;transform-origin:150px 128px}
.fa-dash{animation:fa-dash 1s linear infinite}
.fa-ring10{stroke-dashoffset:0;animation:fa-ring 10s linear infinite}
.fa-waves{animation:fa-blink 1s ease-in-out infinite}
.fa-press{animation:fa-press .55s ease-in-out infinite}
.fa-push{animation:fa-push .545s ease-in-out infinite}
.fa-metro .fa-push{animation:none;transition:transform 90ms ease-out}
.fa-metro.hit .fa-push{transform:translateY(7px)}
.fa-metro.paused .fa-push{transform:none}
.fa-rise2{animation:fa-rise2 2s ease-in-out infinite}
.fa-air{animation:fa-air 2s ease-in-out infinite}
.fa-breathe{animation:fa-breathe 3s ease-in-out infinite;transform-box:fill-box;transform-origin:bottom}
.fa-wrap{opacity:0;animation:fa-wrap 4.2s ease-in-out infinite}
.fa-d0{animation-delay:0s}.fa-d1{animation-delay:.35s}.fa-d2{animation-delay:.7s}.fa-d3{animation-delay:1.05s}.fa-d4{animation-delay:1.4s}.fa-d5{animation-delay:1.75s}.fa-d6{animation-delay:2.1s}
.fa-drop{animation:fa-drop 2.4s ease-in-out infinite}
.fa-spin{animation:fa-spin 2.4s ease-in-out infinite}
.fa-strike{animation:fa-strike 1s ease-in infinite}
.fa-thrust{animation:fa-thrust 1.2s ease-in-out infinite}
.fa-water{animation:fa-water .5s linear infinite}
.fa-film{animation:fa-film 3s ease-in-out infinite}
.fa-zone{animation:fa-blink 1.2s ease-in-out infinite}
.fa-peek{animation:fa-peek 1.8s ease-in-out infinite}
.fa-sweep{animation:fa-sweep 6s linear infinite;transform-origin:0 0}
.fa-drift{animation:fa-drift 2.4s ease-in-out infinite}
.fa-swell{animation:fa-swell 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.fa-jerk{animation:fa-jerk .22s linear infinite}
.fa-f3{opacity:0;animation:fa-f3 7.5s linear infinite}
.fa-k0{animation-delay:0s}.fa-k1{animation-delay:2.5s}.fa-k2{animation-delay:5s}
@keyframes fa-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
@keyframes fa-blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes fa-shake{0%,100%{transform:translate(0,0)}25%{transform:translate(-2px,2px)}75%{transform:translate(2px,-1px)}}
@keyframes fa-tilt{0%,15%{transform:rotate(0)}45%,85%{transform:rotate(12deg)}100%{transform:rotate(0)}}
@keyframes fa-dash{to{stroke-dashoffset:-16}}
@keyframes fa-ring{to{stroke-dashoffset:151}}
@keyframes fa-press{0%,100%{transform:translateY(0)}45%{transform:translateY(4px)}}
@keyframes fa-push{0%,100%{transform:translateY(0)}40%{transform:translateY(7px)}}
@keyframes fa-rise2{0%,100%{transform:translateY(0)}45%,60%{transform:translateY(-6px)}}
@keyframes fa-air{0%,100%{opacity:0}30%,55%{opacity:1}}
@keyframes fa-breathe{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.04)}}
@keyframes fa-wrap{0%{opacity:0}12%,80%{opacity:1}100%{opacity:0}}
@keyframes fa-drop{0%{transform:translateY(-30px);opacity:0}40%,85%{transform:translateY(14px);opacity:1}100%{transform:translateY(14px);opacity:0}}
@keyframes fa-spin{0%,10%{transform:rotate(0)}60%,90%{transform:rotate(360deg)}100%{transform:rotate(360deg)}}
@keyframes fa-strike{0%,40%{transform:rotate(-22deg)}70%{transform:rotate(4deg)}100%{transform:rotate(-22deg)}}
@keyframes fa-thrust{0%,40%{transform:translate(0,0)}60%{transform:translate(0,-9px)}100%{transform:translate(0,0)}}
@keyframes fa-water{to{stroke-dashoffset:-18}}
@keyframes fa-film{0%{opacity:0;transform:translateX(-30px)}35%,85%{opacity:1;transform:none}100%{opacity:0}}
@keyframes fa-peek{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes fa-sweep{to{transform:rotate(360deg)}}
@keyframes fa-drift{0%,20%{transform:rotate(0)}60%,90%{transform:rotate(-28deg)}100%{transform:rotate(0)}}
@keyframes fa-swell{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
@keyframes fa-jerk{0%,100%{transform:translate(0,0)}25%{transform:translate(1.5px,-1px)}50%{transform:translate(-1px,1px)}75%{transform:translate(1px,1px)}}
@keyframes fa-f3{0%{opacity:0}2%,31%{opacity:1}33.3%,100%{opacity:0}}
@media (prefers-reduced-motion: reduce){[class^="fa-"],[class*=" fa-"]{animation:none!important}.fa-wrap,.fa-film,.fa-air{opacity:1}.fa-f3{opacity:0}.fa-k2{opacity:1}}
`;
const stl = document.createElement('style'); stl.textContent = css; document.head.appendChild(stl);
})();
