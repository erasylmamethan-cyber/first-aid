/* Анимированные иллюстрации первой помощи. Рисованные SVG-сцены на человеке:
   точные места (грудина, линия сосков, пупок, лопатки), руки с пальцами.
   Каждая сцена — функция, возвращающая <svg> 320×170. Работают без интернета. */
(function(){
const K = {
  bg:'#E8EEF5', floor:'#C9D3DF', floorL:'#B5C1CF',
  skin:'#F2C6A0', skinS:'#DCA27A', resc:'#C68A60', rescS:'#A86F47',
  vShirt:'#5B8DBE', vShirtS:'#4674A2', vPants:'#46546B',
  rShirt:'#3E8E6B', rShirtS:'#2E7255', rPants:'#2F3A4A',
  hair:'#3A2A1E', rHair:'#1E1916', line:'#26303B',
  mark:'#E11D48', water:'#3B9BE0', cloth:'#F7F3E8', clothS:'#D8D0BC', blood:'#B91C1C',
  baby:'#F6D2B4', babyS:'#E2AE8A', onesie:'#F3B6C6', onesieS:'#DC90A6', table:'#D9C3A5'
};
const LW = 1.6;
const P = (d, fill, cls='') => `<path ${cls?`class="${cls}" `:''}d="${d}" fill="${fill}" stroke="${K.line}" stroke-width="${LW}" stroke-linejoin="round" stroke-linecap="round"/>`;
// толстая «конечность» с контуром
const L = (d, color, w, cls='') => `<g${cls?` class="${cls}"`:''}><path d="${d}" fill="none" stroke="${K.line}" stroke-width="${w+3.2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const C = (cx, cy, r, fill, cls='') => `<circle ${cls?`class="${cls}" `:''}cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${K.line}" stroke-width="${LW}"/>`;
const T = (x, y, s, size=12, fill=K.line, w=700, anchor='middle') => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${w}" fill="${fill}" text-anchor="${anchor}" font-family="system-ui,-apple-system,Roboto,sans-serif">${s}</text>`;
const svg = (body, label) => `<svg viewBox="0 0 320 170" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="170" fill="${K.bg}"/>${body}</svg>`;
const floor = (y=142) => `<rect x="0" y="${y}" width="320" height="${170-y}" fill="${K.floor}"/><line x1="0" y1="${y}" x2="320" y2="${y}" stroke="${K.floorL}" stroke-width="2"/>`;
const target = (x, y, r=7) => `<g class="fa-target"><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${K.mark}" stroke-width="2.4"/><circle cx="${x}" cy="${y}" r="2.6" fill="${K.mark}"/></g>`;
const cross = (x, y, s=18) => `<g stroke="${K.mark}" stroke-width="4" stroke-linecap="round"><line x1="${x-s/2}" y1="${y-s/2}" x2="${x+s/2}" y2="${y+s/2}"/><line x1="${x+s/2}" y1="${y-s/2}" x2="${x-s/2}" y2="${y+s/2}"/></g>`;
const arrow = (d, cls='', color=K.mark) => `<g class="${cls}"><path d="${d}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#fa-ah)"/></g>`;
const defs = `<defs><marker id="fa-ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${K.mark}"/></marker></defs>`;
const badge = (x, y, s, w=70, fill=K.line) => `<g><rect x="${x}" y="${y}" width="${w}" height="22" rx="11" fill="${fill}"/>${T(x+w/2, y+15.5, s, 12, '#fff')}</g>`;

/* ---------- кисти рук ---------- */
// кисть сверху: ладонь + 4 пальца + большой палец; поворот rot (градусы), пальцы смотрят вверх при rot=0
function handTop(x, y, s=1, rot=0, skin=K.resc){
  const f = (dx, len) => `<rect x="${dx-3.4}" y="${-17-len}" width="6.8" height="${len+6}" rx="3.4" fill="${skin}" stroke="${K.line}" stroke-width="${LW/s}"/>`;
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">` +
    f(-9, 13) + f(-2.5, 16) + f(4, 15) + f(10, 11) +
    `<rect x="-14" y="-17" width="28" height="31" rx="11" fill="${skin}" stroke="${K.line}" stroke-width="${LW/s}"/>` +
    `<rect x="-22" y="-6" width="7" height="20" rx="3.5" transform="rotate(-35 -18 4)" fill="${skin}" stroke="${K.line}" stroke-width="${LW/s}"/>` +
    `<path d="M-8,-5 q8,4 16,0" fill="none" stroke="${K.rescS}" stroke-width="${1.2/s}"/></g>`;
}
// две руки в замок сверху
function handsLock(x, y, s=1){
  return `<g transform="translate(${x},${y}) scale(${s})">` +
    handTop(0, 4, 1, 0, K.rescS) + handTop(0, 0, 1, 0) +
    `<path d="M-11,-30 v10 M-4,-34 v12 M3,-33 v12 M9,-28 v9" stroke="${K.rescS}" stroke-width="1.3"/></g>`;
}
// два пальца (указательный + средний) сверху
function twoFingers(x, y, s=1, rot=0){
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">` +
    `<rect x="-8" y="-6" width="7.5" height="34" rx="3.7" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/>` +
    `<rect x="0.5" y="-9" width="7.5" height="37" rx="3.7" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/>` +
    `<path d="M-14,26 q14,-6 28,0 v22 h-28z" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/>` +
    `<path d="M-6,0 h4 M2,-3 h4" stroke="${K.rescS}" stroke-width="1.2"/></g>`;
}

/* ---------- лежащий взрослый (сбоку, лицом вверх, голова слева) ---------- */
function lyingAdult(opts={}){
  const tilt = opts.tilt ? `class="${opts.tilt}"` : '';
  return `<g>` +
    // ноги
    P('M196,112 L292,118 Q304,120 304,130 L304,142 L196,142 Z', K.vPants) +
    `<rect x="300" y="104" width="13" height="38" rx="6" fill="${K.rPants}" stroke="${K.line}" stroke-width="${LW}"/>` +
    // туловище
    `<g class="${opts.chestCls||''}">` + P('M70,122 Q74,107 98,106 L186,110 Q199,112 199,124 L199,142 L70,142 Z', K.vShirt) +
    P('M150,108 Q156,118 154,140', 'none') + `</g>` +
    // голова и шея
    `<g ${tilt}>` +
    P('M58,124 L74,120 L76,138 L60,140 Z', K.skin) +
    C(45, 126, 15, K.hair) + C(50, 124, 14, K.skin) +
    P('M50,110 Q55,101 60,111', K.skin) +
    `<path d="M44,117 q3,2 6,0" fill="none" stroke="${K.line}" stroke-width="1.4" stroke-linecap="round"/>` +
    `<path d="M59,116 q3,1 5,-1" fill="none" stroke="${K.line}" stroke-width="1.4" stroke-linecap="round"/>` +
    P('M40,128 q2,4 6,3', 'none') + `</g>` +
    // ближняя рука вдоль тела
    L('M86,128 L126,134', K.vShirtS, 12) + L('M126,134 L166,136', K.skin, 9) +
    C(170, 136, 5.5, K.skin) +
    `</g>`;
}
/* ---------- спасатель на коленях у груди (сбоку, лицом влево): ноги позади пострадавшего, руки прямые ---------- */
function rescuerLegs(){
  return L('M168,96 L152,138', K.rPants, 20) + L('M152,138 L198,140', K.rPants, 15) + `<rect x="194" y="131" width="22" height="11" rx="5" fill="${K.rHair}"/>`;
}
function rescuerUpper(){
  return `<g class="fa-push">` +
    L('M168,96 L126,54', K.rShirt, 30) +
    L('M124,56 L123,76', K.rShirtS, 13) + L('M123,76 L122,96', K.resc, 10) +
    C(110, 38, 13, K.resc) + P('M97,35 Q99,22 112,24 Q123,26 123,36 Q116,29 106,31 Z', K.rHair) +
    `<path d="M103,44 q3,2 6,0" fill="none" stroke="${K.line}" stroke-width="1.3"/>` +
    P('M108,104 q0,-8 10,-9 l14,0 q8,1 8,8 q-2,5 -8,5 l-16,0 q-8,0 -8,-4z', K.resc) +
    `<path d="M114,96 q-4,-6 0,-10 M120,95 q-3,-7 1,-11 M126,95 q-2,-6 2,-10" fill="none" stroke="${K.line}" stroke-width="1.3" stroke-linecap="round"/>` +
  `</g>`;
}

/* ---------- сцены ---------- */
const SCENES = {};

SCENES.safety = () => svg(defs + floor() + lyingAdult() +
  `<g class="fa-pulse"><path d="M262,18 L300,84 L224,84 Z" fill="#FBBF24" stroke="${K.line}" stroke-width="2" stroke-linejoin="round"/>${T(262,74,'!',34,K.line,900)}</g>` +
  T(110, 34, 'Огонь? Ток? Дорога?', 14, K.line, 800) + T(110, 54, 'Сначала — ваша безопасность', 12, K.mark, 800), 'Проверьте, что вокруг безопасно');

SCENES.shake = () => svg(floor() + lyingAdult() +
  L('M200,92 L176,136', K.rPants, 20) + L('M176,136 L222,138', K.rPants, 15) +
  `<g class="fa-shake">` + L('M200,92 L150,60', K.rShirt, 30) +
  L('M146,62 L104,104', K.rShirtS, 12) + L('M104,104 L88,112', K.resc, 9) + C(86,114,6,K.resc) +
  C(140, 42, 13, K.resc) + P('M127,38 Q130,26 142,28 Q152,30 152,40 Q145,33 136,35 Z', K.rHair) + `</g>` +
  `<g class="fa-pulse"><rect x="196" y="14" width="114" height="30" rx="15" fill="#fff" stroke="${K.line}" stroke-width="1.6"/>${T(253,34,'Вы меня слышите?',12)}</g>` +
  `<path d="M74,104 l-6,-6 M80,100 l-2,-8 M90,102 l4,-7" stroke="${K.mark}" stroke-width="2.2" stroke-linecap="round" class="fa-blink"/>`, 'Окликните и потрясите за плечи');

// голова крупно: запрокидывание головы и подъём подбородка
SCENES.airway = (o={}) => {
  const baby = o.infant;
  const skin = baby ? K.baby : K.skin;
  return svg(defs + floor(150) +
    // тело уходит вправо
    P('M150,96 Q170,88 210,90 L320,92 L320,150 L150,150 Z', baby ? K.onesie : K.vShirt) +
    `<g class="${baby ? 'fa-hold' : 'fa-tilt'}">` +
      P('M128,104 L158,94 L162,150 L132,150 Z', skin) +
      C(92, 112, 38, K.hair) + C(102, 108, 36, skin) +
      P('M96,73 Q104,58 116,74', skin) +
      `<path d="M82,88 q7,4 14,0" fill="none" stroke="${K.line}" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M120,86 q6,2 10,-2" fill="none" stroke="${K.line}" stroke-width="2" stroke-linecap="round"/>` +
      P('M126,98 Q138,96 140,108', 'none') +
      // ладонь на лбу
      `<path d="M40,40 Q60,52 74,70 L86,76 Q92,70 88,62 L70,46 Q58,34 40,40 Z" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}" stroke-linejoin="round"/>` +
      `<path d="M68,58 l18,10 M66,64 l16,9" stroke="${K.rescS}" stroke-width="1.4"/>` +
      // два пальца под подбородком
      `<g>` + L('M196,150 L160,118', K.rShirtS, 12) + `<rect x="138" y="100" width="26" height="8" rx="4" transform="rotate(-35 150 104)" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/><rect x="140" y="108" width="24" height="8" rx="4" transform="rotate(-35 152 112)" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/>` + `</g>` +
    `</g>` +
    (baby ? T(250, 40, 'Голову — прямо', 14, K.line, 800) + T(250, 60, 'не запрокидывать', 12, K.mark, 700)
          : arrow('M70,26 q-26,6 -30,30', 'fa-blink') + arrow('M186,118 q6,-20 -10,-34', 'fa-blink') +
            T(250, 36, 'Лоб — назад', 13, K.line, 800) + T(250, 56, 'Подбородок — вверх', 13, K.line, 800)), 'Откройте дыхательные пути');
};

// посмотреть-послушать-почувствовать 10 секунд
SCENES.look = (o={}) => {
  const baby = o.infant;
  return svg(defs + floor() + (baby ? babyLying() : lyingAdult({chestCls:'fa-rise'})) +
    `<g>${C(88, 82, 14, K.resc)}${P('M76,76 q2,-12 14,-10 q9,2 10,10 q-8,-5 -14,-3z', K.rHair)}` +
    L('M100,88 L160,64', K.rShirt, 26) + `</g>` +
    `<path d="M92,90 L150,${baby?110:104}" stroke="${K.mark}" stroke-width="2" stroke-dasharray="4 4" class="fa-dash"/>` +
    `<g transform="translate(276,54)"><circle r="30" fill="#fff" stroke="${K.line}" stroke-width="2"/>` +
    `<circle r="24" fill="none" stroke="${K.mark}" stroke-width="5" stroke-dasharray="151" class="fa-ring10" transform="rotate(-90)"/>` +
    T(0, 6, '10 с', 15, K.line, 900) + `</g>` +
    T(196, 24, 'Грудь поднимается?', 13, K.line, 800), 'Смотрите на грудную клетку 10 секунд');
};

SCENES.phone = () => svg(defs +
  `<g transform="translate(70,20)"><rect x="0" y="0" width="68" height="128" rx="12" fill="${K.line}"/><rect x="5" y="12" width="58" height="100" rx="4" fill="#fff"/>` +
  T(34, 62, '103', 24, K.mark, 900) + T(34, 84, 'громкая', 10, K.line, 800) + T(34, 96, 'связь', 10, K.line, 800) +
  `<g class="fa-waves"><path d="M82,40 q12,24 0,48" fill="none" stroke="${K.water}" stroke-width="3.5" stroke-linecap="round"/><path d="M94,30 q20,34 0,68" fill="none" stroke="${K.water}" stroke-width="3.5" stroke-linecap="round"/></g></g>` +
  `<g transform="translate(196,40)" class="fa-pulse"><rect x="0" y="0" width="86" height="86" rx="12" fill="#16A34A" stroke="${K.line}" stroke-width="2"/>` +
  `<path d="M43,22 c-9,-12 -28,-4 -22,12 c4,10 22,24 22,24 c0,0 18,-14 22,-24 c6,-16 -13,-24 -22,-12z" fill="#fff"/><path d="M46,30 l-8,12 h8 l-6,12" fill="none" stroke="#16A34A" stroke-width="3" stroke-linejoin="round"/>` +
  T(43, 78, 'АНД', 13, '#fff', 900) + `</g>` + T(239, 152, 'дефибриллятор', 12, K.line, 800), 'Позвоните 103 и найдите дефибриллятор');

/* ---------- грудная клетка сверху: где ставить руки ---------- */
function torsoTop(baby){
  if(baby) return P('M110,20 Q160,8 210,20 Q232,60 222,130 Q160,150 98,130 Q88,60 110,20 Z', K.baby) +
    C(136, 66, 3.2, K.babyS) + C(184, 66, 3.2, K.babyS) + `<circle cx="160" cy="112" r="3" fill="${K.babyS}"/>` +
    `<path d="M128,66 H192" stroke="${K.line}" stroke-width="1.4" stroke-dasharray="4 4"/>`;
  return P('M82,12 Q160,0 238,12 Q262,30 254,88 Q244,140 230,170 L90,170 Q76,140 66,88 Q58,30 82,12 Z', K.skin) +
    `<path d="M160,22 V106" stroke="${K.skinS}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M106,100 Q160,128 214,100" fill="none" stroke="${K.skinS}" stroke-width="2"/>` +
    C(124, 64, 4, K.skinS) + C(196, 64, 4, K.skinS) + `<circle cx="160" cy="150" r="3.4" fill="${K.skinS}"/>` +
    T(160, 16, 'грудина', 10, K.rescS, 700);
}
SCENES.handsTop = (o={}) => {
  const t = o.type || 'adult';
  if(t==='infant') return svg(torsoTop(true) + target(160, 76, 8) +
    `<g class="fa-press">${twoFingers(160, 78, 1.0)}</g>` +
    T(270, 62, 'ниже линии', 12, K.line, 800) + T(270, 78, 'сосков', 12, K.line, 800) + T(270, 104, '≈ 4 см', 14, K.mark, 900), 'Два пальца в центр груди ниже линии сосков');
  if(t==='child') return svg(torsoTop() + target(160, 86, 9) +
    `<g class="fa-press">${handTop(160, 112, 1.55, 0)}</g>` +
    T(282, 70, 'одна', 13, K.line, 800) + T(282, 86, 'ладонь', 13, K.line, 800) + T(282, 112, '≈ 5 см', 14, K.mark, 900), 'Основание одной ладони на нижнюю половину грудины');
  return svg(torsoTop() + target(160, 82, 9) +
    `<g class="fa-press">${handsLock(160, 110, 1.55)}</g>` +
    T(284, 64, 'центр', 13, K.line, 800) + T(284, 80, 'груди', 13, K.line, 800) + T(284, 108, '5–6 см', 14, K.mark, 900), 'Основание ладони в центр груди, вторая сверху');
};

/* ---------- нажатия в такт метроному (сбоку) ---------- */
function babyLying(){
  return `<rect x="40" y="128" width="250" height="14" rx="3" fill="${K.table}" stroke="${K.line}" stroke-width="${LW}"/>` +
    P('M118,112 Q124,100 142,100 L208,104 Q216,106 216,116 L216,128 L118,128 Z', K.onesie) +
    P('M214,110 L262,112 Q270,114 270,122 L270,128 L214,128 Z', K.onesie) +
    C(98, 112, 18, K.baby) + P('M96,94 Q102,88 108,96', K.baby) +
    `<path d="M92,104 q3,2 6,0" fill="none" stroke="${K.line}" stroke-width="1.4"/>`;
}
SCENES.compress = (o={}) => {
  const t = o.type || 'adult';
  if(t==='infant') return svg(defs + floor() + babyLying() +
    `<g class="fa-push">${L('M262,6 L172,58', K.rShirtS, 13)}${twoFingers(160, 92, 0.7, 180)}</g>` + target(160, 101, 6) +
    T(70, 34, '≈ 4 см', 15, K.mark, 900) + T(70, 52, '2 пальца', 12, K.line, 800), 'Нажимайте двумя пальцами');
  const child = t==='child';
  return svg(defs + floor() + rescuerLegs() + lyingAdult({chestCls:'fa-chest'}) + rescuerUpper() +
    `<g transform="translate(36,60)">${arrow('M0,0 V30','fa-blink')}${T(0,-8, child?'≈ 5 см':'5–6 см', 14, K.mark, 900)}</g>` +
    (child ? T(250, 28, 'одна ладонь', 13, K.line, 800) : T(250, 28, 'руки прямые', 13, K.line, 800)), 'Давите на грудь в такт сигналу');
};

/* ---------- вдохи ---------- */
SCENES.breath = (o={}) => {
  const baby = (o.type==='infant');
  const skin = baby ? K.baby : K.skin;
  return svg(defs + floor(150) +
    `<g class="fa-rise2">` + P('M150,96 Q170,88 210,90 L320,92 L320,150 L150,150 Z', baby ? K.onesie : K.vShirt) + `</g>` +
    P('M128,104 L158,94 L162,150 L132,150 Z', skin) +
    C(92, 112, 38, K.hair) + C(102, 108, 36, skin) +
    `<path d="M82,90 q7,4 14,0" fill="none" stroke="${K.line}" stroke-width="2" stroke-linecap="round"/>` +
    // голова спасателя сверху, рот к рту
    C(132, 38, 26, K.resc) + P('M108,30 Q112,8 136,10 Q158,14 158,34 Q144,22 124,26 Z', K.rHair) +
    (baby
      ? `<ellipse cx="114" cy="70" rx="22" ry="14" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/>` + T(250, 30, 'рот и нос', 14, K.line, 800) + T(250, 48, 'малыша вместе', 12, K.line, 700)
      : P('M110,58 L122,72 L134,60 Z', K.resc) +
        // пальцы зажимают нос
        `<rect x="88" y="58" width="22" height="8" rx="4" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/><rect x="88" y="70" width="20" height="8" rx="4" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/>` +
        L('M60,40 L88,62', K.rShirtS, 11) +
        T(250, 30, 'нос зажат', 14, K.line, 800) + T(250, 48, 'рот к рту', 12, K.line, 700)) +
    `<g class="fa-air"><path d="M120,76 q4,8 0,14" fill="none" stroke="${K.water}" stroke-width="3" stroke-linecap="round"/></g>` +
    arrow('M300,84 V62', 'fa-blink', K.water) + T(250, 76, 'грудь вверх?', 13, K.water, 900), 'Сделайте вдохи, грудь должна подняться');
};

/* ---------- устойчивое положение на боку ---------- */
SCENES.recovery = () => svg(floor() +
  // туловище на боку
  P('M78,100 Q90,82 120,82 L196,86 Q210,90 208,108 L204,130 Q160,140 96,134 Q74,128 78,100 Z', K.vShirt, 'fa-breathe') +
  // нижняя нога прямо, верхняя согнута
  L('M204,120 L290,128', K.vPants, 20) + L('M200,104 L246,82 L262,128', K.vPants, 20) +
  // голова, рот вниз
  C(56, 104, 16, K.hair) + C(60, 108, 15, K.skin) + `<path d="M54,118 q4,3 8,0" fill="none" stroke="${K.line}" stroke-width="1.4"/>` +
  // рука под щекой
  L('M96,100 L72,122', K.vShirtS, 11) + `<ellipse cx="62" cy="128" rx="12" ry="6" fill="${K.skin}" stroke="${K.line}" stroke-width="${LW}"/>` +
  T(246, 30, 'на боку, рот вниз', 13, K.line, 800) + T(246, 48, 'верхнее колено согнуто', 11, K.line, 700), 'Положение на боку');

/* ---------- кровотечение ---------- */
function forearm(){
  return P('M20,104 Q20,92 34,92 L250,86 Q268,86 270,100 Q270,114 254,116 L34,118 Q20,118 20,104 Z', K.skin) +
    `<path d="M250,88 q30,-6 46,6 q8,8 0,16 q-18,10 -46,6" fill="${K.skin}" stroke="${K.line}" stroke-width="${LW}"/>`;
}
SCENES.press = () => svg(defs + floor(130) + forearm() +
  `<ellipse cx="140" cy="102" rx="16" ry="5" fill="${K.blood}"/>` +
  `<rect x="112" y="84" width="58" height="22" rx="4" fill="${K.cloth}" stroke="${K.line}" stroke-width="${LW}"/>` +
  `<g class="fa-press">${L('M146,118 L156,170', K.rShirtS, 16)}${handTop(141, 96, 1.2, 0, K.rescS)}${handTop(141, 92, 1.2, 0)}</g>` +
  arrow('M74,22 V56', 'fa-blink') + T(74, 16, 'сильно, 10 мин', 12, K.mark, 900), 'Прижмите рану тканью и давите');

SCENES.bandage = () => svg(floor(130) + forearm() +
  `<rect x="118" y="80" width="46" height="18" rx="5" fill="${K.clothS}" stroke="${K.line}" stroke-width="${LW}"/>` +
  [0,1,2,3,4,5].map(i => `<rect class="fa-wrap fa-d${i}" x="${92+i*16}" y="84" width="24" height="36" rx="3" fill="${K.cloth}" stroke="${K.line}" stroke-width="${LW}" transform="skewX(-14)"/>`).join('') +
  `<g class="fa-wrap fa-d6"><circle cx="210" cy="122" r="5" fill="${K.cloth}" stroke="${K.line}" stroke-width="${LW}"/><path d="M210,126 l-6,12 M210,126 l7,11" stroke="${K.line}" stroke-width="2"/></g>` +
  T(160, 30, 'валик → туго, витки внахлёст', 13, K.line, 800) + T(210, 160, 'узел сбоку', 11, K.line, 700), 'Давящая повязка');

SCENES.moreCloth = () => svg(defs + floor(130) + forearm() +
  `<rect x="108" y="84" width="70" height="34" rx="4" fill="${K.cloth}" stroke="${K.line}" stroke-width="${LW}"/>` +
  `<ellipse cx="140" cy="100" rx="18" ry="8" fill="${K.blood}" opacity=".75"/>` +
  `<g class="fa-drop"><rect x="104" y="70" width="78" height="20" rx="4" fill="#fff" stroke="${K.line}" stroke-width="${LW}"/></g>` +
  T(240, 34, 'старую не снимать', 13, K.mark, 900) + T(240, 52, 'новую — сверху', 13, K.line, 800), 'Положите ещё ткань сверху');

function thigh(labels=true){
  return P('M10,70 Q10,56 30,54 L240,64 Q262,66 262,92 Q262,116 240,118 L30,128 Q10,128 10,112 Z', K.skin) +
    P('M240,64 Q290,66 300,90 Q290,116 240,118', K.skin) + (labels ? T(14, 48, 'бедро', 11, K.rescS, 700, 'start') + T(292, 52, 'колено', 11, K.rescS, 700) : '');
}
SCENES.tqMeasure = () => svg(defs + floor(140) + thigh() +
  `<ellipse cx="176" cy="94" rx="12" ry="5" fill="${K.blood}"/>` + T(176, 136, 'рана', 11, K.blood, 800) +
  // 4 пальца поперёк бедра выше раны
  `<g class="fa-pulse">` + [0,1,2,3].map(i => `<rect x="${120+i*13}" y="58" width="12" height="44" rx="6" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/>`).join('') + `</g>` +
  `<path d="M120,48 H172" stroke="${K.mark}" stroke-width="2.4"/><path d="M120,42 v12 M172,42 v12" stroke="${K.mark}" stroke-width="2.4"/>` +
  T(146, 36, '4 пальца = 5–7 см', 13, K.mark, 900) +
  `<rect x="104" y="56" width="10" height="72" rx="3" fill="#7C4A2D" stroke="${K.line}" stroke-width="${LW}" class="fa-blink"/>` + T(96, 156, 'жгут здесь', 12, K.line, 900), 'Отмерьте 4 пальца выше раны');

SCENES.tqTwist = () => svg(defs + floor(140) + thigh(false) +
  `<ellipse cx="176" cy="94" rx="12" ry="5" fill="${K.blood}" opacity=".5"/>` +
  `<rect x="98" y="54" width="18" height="76" rx="4" fill="#7C4A2D" stroke="${K.line}" stroke-width="${LW}"/>` +
  `<g class="fa-spin" style="transform-origin:107px 50px"><rect x="64" y="46" width="86" height="8" rx="4" fill="#A16207" stroke="${K.line}" stroke-width="${LW}"/></g>` +
  arrow('M146,26 q-38,-18 -76,0', 'fa-blink') + T(220, 36, 'крутите, пока', 13, K.line, 800) + T(220, 52, 'кровь не остановится', 12, K.line, 700) +
  T(60, 104, '14:35', 13, K.mark, 900, 'start') + T(60, 150, 'запишите время', 11, K.mark, 800, 'start'), 'Закрутите жгут палкой');

/* ---------- стоящие фигуры: удушье ---------- */
function standVictim(bend=0, hands='side'){
  const sx = 120 - bend*0.6, sy = 50 + bend*0.35;
  return `<g>` + L('M128,96 L122,140', K.vPants, 18) + L('M140,96 L146,140', K.vPants, 18) +
    `<rect x="108" y="134" width="22" height="9" rx="4" fill="${K.rPants}"/><rect x="138" y="134" width="22" height="9" rx="4" fill="${K.rPants}"/>` +
    L(`M134,96 L${sx+10},${sy+12}`, K.vShirt, 34) +
    C(sx+2, sy-10, 14, K.hair) + C(sx-2, sy-8, 13, K.skin) +
    (hands==='throat' ? L(`M${sx+18},${sy+8} L${sx+2},${sy+6}`, K.vShirtS, 10) + L(`M${sx+4},${sy+14} L${sx-6},${sy+4}`, K.vShirtS, 10) +
      `<ellipse cx="${sx-6}" cy="${sy+5}" rx="8" ry="6" fill="${K.skin}" stroke="${K.line}" stroke-width="${LW}"/>`
      : L(`M${sx+14},${sy+8} L${sx-2},${sy+46}`, K.vShirtS, 10) + C(sx-3, sy+50, 5, K.skin)) +
    `</g>`;
}
SCENES.chokeSign = () => svg(floor() + standVictim(0, 'throat') +
  `<g class="fa-blink"><path d="M92,34 l-12,-6 M90,46 l-14,0 M94,58 l-12,6" stroke="${K.mark}" stroke-width="2.6" stroke-linecap="round"/></g>` +
  T(236, 46, 'не может', 14, K.line, 800) + T(236, 64, 'говорить, кашлять,', 12, K.line, 700) + T(236, 80, 'дышать', 12, K.line, 700) +
  T(236, 116, 'Воду не давать!', 13, K.mark, 900), 'Человек подавился');

SCENES.backBlows = () => svg(defs + floor() +
  L('M214,56 L150,96 L114,96', K.rShirtS, 10) +
  // пострадавший наклонён вперёд
  L('M150,96 L146,140', K.vPants, 18) + L('M160,96 L166,140', K.vPants, 18) +
  L('M154,94 L102,70', K.vShirt, 34) + C(82, 78, 14, K.hair) + C(80, 82, 13, K.skin) +
  L('M110,76 L102,112', K.vShirtS, 10) +
  // лопатки
  `<path d="M118,58 q8,-6 16,0 M132,64 q8,-6 16,0" fill="none" stroke="${K.vShirtS}" stroke-width="2"/>` + target(128, 64, 8) +
  // спасатель сбоку-сзади
  L('M222,96 L218,140', K.rPants, 18) + L('M232,96 L238,140', K.rPants, 18) +
  L('M226,96 L214,46', K.rShirt, 30) + C(210, 28, 13, K.resc) + P('M198,26 Q200,14 212,15 Q222,17 222,27 Q215,21 206,23 Z', K.rHair) +
  // бьющая рука
  `<g class="fa-strike" style="transform-origin:212px 50px">` + L('M212,50 L172,32', K.rShirtS, 11) + L('M172,32 L142,56', K.resc, 9) +
  `<ellipse cx="136" cy="56" rx="9" ry="6" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/></g>` +
  T(62, 26, 'между лопатками', 12, K.mark, 900, 'start'), 'Удары между лопатками');

SCENES.hug = () => svg(defs + floor() + standVictim(18) +
  // спасатель сзади: нога вперёд
  L('M172,96 L150,140', K.rPants, 18) + L('M182,96 L196,140', K.rPants, 18) +
  `<rect x="138" y="134" width="22" height="9" rx="4" fill="${K.rHair}"/><rect x="190" y="134" width="22" height="9" rx="4" fill="${K.rHair}"/>` +
  L('M176,96 L166,44', K.rShirt, 30) + C(162, 26, 13, K.resc) + P('M150,24 Q152,12 164,13 Q174,15 174,25 Q167,19 158,21 Z', K.rHair) +
  // руки обхватывают на уровне пояса, кулак спереди
  L('M160,56 L146,88 L118,90', K.rShirtS, 10) + `<ellipse cx="114" cy="90" rx="8" ry="7" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/>` + T(246, 30, 'нога вперёд', 13, K.line, 800) + T(246, 48, 'обхватить', 13, K.line, 800) + T(246, 64, 'на уровне пояса', 11, K.line, 700), 'Встаньте сзади и обхватите');

SCENES.thrust = () => svg(defs +
  // туловище сбоку крупно
  P('M40,10 Q20,60 34,110 Q44,150 70,170 L200,170 L200,10 Z', K.vShirt) +
  `<path d="M40,64 Q70,70 110,62" fill="none" stroke="${K.vShirtS}" stroke-width="2" stroke-dasharray="5 4"/>` + T(118, 58, 'рёбра', 11, K.cloth, 700, 'start') +
  `<circle cx="38" cy="122" r="3" fill="${K.line}"/>` + T(14, 140, 'пупок', 11, K.line, 800, 'start') +
  // кулак выше пупка + обхватывающая кисть
  `<g class="fa-thrust">` + L('M240,120 L80,96', K.rShirtS, 13) +
  `<rect x="22" y="80" width="34" height="30" rx="10" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/>` +
  `<path d="M30,84 v22 M38,82 v24 M46,84 v22" stroke="${K.rescS}" stroke-width="1.4"/>` +
  `<path d="M52,76 q24,-4 30,14 q-4,18 -26,22" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/>` + `</g>` +
  arrow('M66,90 q50,4 70,-40', 'fa-blink') + T(266, 34, 'на себя', 15, K.mark, 900) + T(266, 54, 'и вверх', 15, K.mark, 900), 'Кулак выше пупка, толчок на себя и вверх');

/* ---------- младенец ---------- */
SCENES.infantBack = () => svg(defs + floor(156) +
  // предплечье и бедро спасателя, голова малыша ниже тела
  L('M300,128 L60,112', K.rPants, 24) + L('M290,94 L96,124', K.resc, 13) +
  P('M110,100 Q120,90 150,88 L222,82 Q234,82 234,94 L232,104 L112,112 Z', K.onesie) +
  C(94, 114, 17, K.baby) + `<path d="M84,124 q4,3 9,0" fill="none" stroke="${K.line}" stroke-width="1.4"/>` +
  `<path d="M74,118 q10,10 26,8" fill="none" stroke="${K.resc}" stroke-width="7" stroke-linecap="round"/>` +
  target(150, 92, 7) +
  `<g class="fa-strike" style="transform-origin:220px 20px">` + L('M250,10 L190,40', K.rShirtS, 11) + `<ellipse cx="164" cy="62" rx="14" ry="9" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}" transform="rotate(-30 164 62)"/>` + L('M190,40 L170,56', K.resc, 9) + `</g>` +
  T(40, 34, 'голова ниже', 13, K.line, 800, 'start') + T(40, 52, 'держите челюсть', 11, K.line, 700, 'start'), 'Малыш лицом вниз на предплечье, удары между лопатками');

SCENES.infantChest = () => svg(defs + floor(156) +
  L('M300,128 L60,116', K.rPants, 24) + L('M290,134 L96,130', K.resc, 13) +
  P('M112,112 Q122,100 152,98 L224,96 Q236,98 236,110 L234,122 L114,126 Z', K.onesie) +
  C(96, 118, 17, K.baby) + `<path d="M90,108 q4,-3 8,0" fill="none" stroke="${K.line}" stroke-width="1.4"/>` +
  `<path d="M128,100 h44" stroke="${K.line}" stroke-width="1.3" stroke-dasharray="4 4"/>` +
  `<g class="fa-push">` + L('M250,20 L168,62', K.rShirtS, 11) + twoFingers(156, 80, 0.5, 20) + `</g>` +
  T(46, 40, 'на спине', 13, K.line, 800, 'start') + T(46, 58, '2 пальца ниже', 11, K.line, 700, 'start') + T(46, 72, 'линии сосков', 11, K.line, 700, 'start'), 'Малыш на спине, два пальца в центр груди');

SCENES.infantCheck = () => svg(floor() + babyLying() +
  `<g class="fa-shake">` + `<rect x="270" y="104" width="22" height="12" rx="6" fill="${K.resc}" stroke="${K.line}" stroke-width="${LW}"/>` + L('M300,20 L284,104', K.resc, 9) + `</g>` +
  `<path d="M276,96 l-6,-8 M286,92 l0,-10" stroke="${K.mark}" stroke-width="2.2" stroke-linecap="round" class="fa-blink"/>` +
  T(150, 40, 'пощекочите стопу', 14, K.line, 800) + T(150, 60, 'не трясите', 13, K.mark, 900), 'Пощекочите стопу');

/* ---------- ожоги ---------- */
SCENES.burnCool = () => svg(floor(150) +
  `<rect x="118" y="6" width="70" height="16" rx="6" fill="#94A3B8" stroke="${K.line}" stroke-width="${LW}"/><rect x="170" y="18" width="14" height="22" rx="4" fill="#94A3B8" stroke="${K.line}" stroke-width="${LW}"/>` +
  `<g class="fa-water"><path d="M177,40 V96" stroke="${K.water}" stroke-width="12" stroke-dasharray="10 8" stroke-linecap="round" opacity=".85"/></g>` +
  P('M20,110 Q20,98 34,98 L250,92 Q268,92 270,106 Q270,120 254,122 L34,124 Q20,124 20,110 Z', K.skin) +
  `<ellipse cx="176" cy="104" rx="22" ry="8" fill="#F28B82" stroke="${K.blood}" stroke-width="1.4"/>` +
  `<path class="fa-water" d="M150,124 q-6,14 -2,22 M200,124 q6,14 2,22" stroke="${K.water}" stroke-width="4" stroke-linecap="round" fill="none"/>` +
  badge(16, 16, '20 минут', 84, K.water), 'Охлаждайте проточной водой 20 минут');

SCENES.burnCover = () => svg(floor(150) +
  P('M20,96 Q20,84 34,84 L250,78 Q268,78 270,92 Q270,106 254,108 L34,110 Q20,110 20,96 Z', K.skin) +
  `<ellipse cx="150" cy="94" rx="24" ry="8" fill="#F28B82" stroke="${K.blood}" stroke-width="1.4"/>` +
  `<rect class="fa-film" x="102" y="74" width="100" height="42" rx="6" fill="#BFE3FF" opacity=".55" stroke="${K.water}" stroke-width="2"/>` +
  `<path d="M108,80 l20,30 M140,78 l20,32 M172,78 l20,32" stroke="#fff" stroke-width="2" opacity=".7" class="fa-film"/>` +
  T(150, 38, 'плёнка, не туго', 14, K.line, 800) + T(150, 144, 'масло, лёд, крем — нельзя', 13, K.mark, 900), 'Закройте плёнкой');

/* ---------- фигура спереди с зонами ---------- */
function body(zones){
  const z = (cond, el) => cond ? el.replace('<', '<g class="fa-zone">').replace(/\/>$/, '/></g>') : el;
  const hi = n => zones.includes(n);
  return `<g transform="translate(60,8)">` +
    C(40, 16, 14, hi('face') ? '#FCA5A5' : K.skin, hi('face') ? 'fa-zone' : '') +
    `<rect x="34" y="28" width="12" height="8" fill="${hi('neck') ? '#FCA5A5' : K.skin}" stroke="${K.line}" stroke-width="${LW}" class="${hi('neck')?'fa-zone':''}"/>` +
    P('M14,38 Q40,32 66,38 L70,92 L10,92 Z', hi('back') ? '#FCA5A5' : K.vShirt, hi('back')?'fa-zone':'') +
    P('M10,92 L70,92 L68,106 L12,106 Z', hi('pelvis') ? '#FCA5A5' : K.vPants, hi('pelvis')?'fa-zone':'') +
    L('M14,42 L4,90', K.vShirtS, 10) + L('M66,42 L76,90', K.vShirtS, 10) +
    C(3, 96, 6, hi('hands') ? '#FCA5A5' : K.skin, hi('hands')?'fa-zone':'') + C(77, 96, 6, hi('hands') ? '#FCA5A5' : K.skin, hi('hands')?'fa-zone':'') +
    P('M14,106 L36,106 L34,150 L18,150 Z', hi('thigh') ? '#FCA5A5' : K.vPants, hi('thigh')?'fa-zone':'') + P('M44,106 L66,106 L62,150 L46,150 Z', hi('thigh') ? '#FCA5A5' : K.vPants, hi('thigh')?'fa-zone':'') +
    `<rect x="14" y="148" width="22" height="8" rx="4" fill="${hi('feet') ? '#FCA5A5' : K.rPants}" class="${hi('feet')?'fa-zone':''}"/><rect x="44" y="148" width="22" height="8" rx="4" fill="${hi('feet') ? '#FCA5A5' : K.rPants}" class="${hi('feet')?'fa-zone':''}"/>` +
    `</g>`;
}
SCENES.zones = (o={}) => svg(body(o.zones||[]) + (o.side||''), 'Опасные зоны');

/* ---------- диабет ---------- */
SCENES.diabCheck = () => svg(
  // запястье с браслетом
  P('M10,70 L150,58 Q166,58 166,74 Q166,90 150,92 L10,100 Z', K.skin) +
  `<g class="fa-pulse"><rect x="96" y="54" width="30" height="44" rx="6" fill="#DC2626" stroke="${K.line}" stroke-width="${LW}"/>` + T(111, 72, '✚', 14, '#fff', 900) + T(111, 88, 'SOS', 9, '#fff', 900) + `</g>` +
  T(80, 126, 'браслет или кулон', 13, K.line, 800) + T(80, 144, '«диабет»', 13, K.mark, 900) +
  // карман со шприц-ручкой
  P('M206,40 L300,40 L300,140 L206,140 Z', K.vPants) + `<path d="M206,64 H300" stroke="${K.line}" stroke-width="1.6"/>` +
  `<g class="fa-peek"><rect x="232" y="14" width="16" height="64" rx="6" fill="#E5E7EB" stroke="${K.line}" stroke-width="${LW}"/><rect x="232" y="14" width="16" height="12" rx="4" fill="#2563EB"/></g>` +
  T(253, 160, 'шприц-ручка', 12, K.line, 800), 'Ищите браслет и шприц-ручку');

SCENES.sugar = () => svg(
  `<path d="M40,40 L52,140 L104,140 L116,40 Z" fill="#FDBA74" opacity=".9" stroke="${K.line}" stroke-width="2"/><path d="M40,40 L116,40" stroke="${K.line}" stroke-width="2"/>` +
  `<path d="M96,40 L120,6" stroke="#EF4444" stroke-width="5" stroke-linecap="round"/>` + T(78, 160, 'сок', 13, K.line, 800) +
  [0,1,2,3].map(i => `<rect class="fa-pulse" x="${140+(i%2)*30}" y="${80+Math.floor(i/2)*30}" width="26" height="26" rx="3" fill="#fff" stroke="${K.line}" stroke-width="${LW}"/>`).join('') +
  T(169, 160, '4–5 кусочков', 13, K.line, 800) +
  `<ellipse cx="262" cy="112" rx="34" ry="14" fill="#FCD34D" stroke="${K.line}" stroke-width="${LW}"/><path d="M228,112 v-14 a34,14 0 0 1 68,0 v14" fill="#FDE68A" stroke="${K.line}" stroke-width="${LW}"/>` +
  T(262, 160, 'ложка мёда', 13, K.line, 800), 'Быстрый сахар');

SCENES.clock = (o={}) => svg(
  `<g transform="translate(110,85)"><circle r="62" fill="#fff" stroke="${K.line}" stroke-width="3"/>` +
  [...Array(12)].map((_,i)=>`<line x1="0" y1="-54" x2="0" y2="-46" stroke="${K.line}" stroke-width="3" transform="rotate(${i*30})"/>`).join('') +
  (o.stamp ? `<line x1="0" y1="0" x2="0" y2="-34" stroke="${K.line}" stroke-width="5" stroke-linecap="round" transform="rotate(${o.h||30})"/><line x1="0" y1="0" x2="0" y2="-48" stroke="${K.line}" stroke-width="3" stroke-linecap="round" transform="rotate(${o.m||210})"/>`
           : `<g class="fa-sweep"><line x1="0" y1="0" x2="0" y2="-50" stroke="${K.mark}" stroke-width="4" stroke-linecap="round"/></g>`) +
  `<circle r="5" fill="${K.line}"/></g>` +
  (o.stamp ? `<g transform="translate(220,46)" class="fa-pulse"><rect width="84" height="84" rx="14" fill="#16A34A"/><path d="M22,44 l14,14 l28,-30" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>` + T(262, 154, 'время запомнено', 12, K.line, 800)
           : badge(206, 70, o.label || '', 100, K.water) + T(256, 120, 'обратный отсчёт', 12, K.line, 700)), o.stamp ? 'Время отмечено' : 'Таймер');

SCENES.noMouth = () => svg(
  `<g transform="translate(40,30)"><path d="M0,0 L10,90 L50,90 L60,0 Z" fill="#BFDBFE" stroke="${K.line}" stroke-width="2"/>${cross(30,45,64)}</g>` +
  `<g transform="translate(140,40)"><rect x="0" y="20" width="60" height="26" rx="13" fill="#fff" stroke="${K.line}" stroke-width="2"/><path d="M30,20 v26" stroke="${K.line}" stroke-width="2"/>${cross(30,33,58)}</g>` +
  T(160, 150, 'ничего в рот', 15, K.mark, 900) + T(262, 70, 'может', 13, K.line, 800) + T(262, 88, 'захлебнуться', 13, K.line, 800), 'Ничего не давайте в рот');

/* ---------- инсульт ---------- */
SCENES.fast = () => svg(
  // лицо: один угол рта опущен
  `<g transform="translate(56,64)">${C(0,0,40,K.skin)}${C(-14,-10,4,K.line)}${C(14,-10,4,K.line)}<path d="M-18,14 Q-4,22 6,18 Q14,22 18,30" fill="none" stroke="${K.mark}" stroke-width="3.4" stroke-linecap="round" class="fa-blink"/></g>` +
  T(56, 128, 'улыбка', 13, K.line, 800) + T(56, 146, 'перекошена', 12, K.mark, 900) +
  // руки: одна опускается
  `<g transform="translate(160,30)">${C(0,8,12,K.skin)}${P('M-16,22 L16,22 L18,74 L-18,74 Z', K.vShirt)}${L('M14,30 L56,26', K.vShirtS, 9)}<g class="fa-drift" style="transform-origin:-14px 30px">${L('M-14,30 L-56,26', K.vShirtS, 9)}</g></g>` +
  T(160, 128, 'руки', 13, K.line, 800) + T(160, 146, 'одна падает', 12, K.mark, 900) +
  // речь
  `<g transform="translate(266,40)"><path d="M-36,-20 h72 a10,10 0 0 1 10,10 v32 a10,10 0 0 1 -10,10 h-46 l-12,12 v-12 h-14 a10,10 0 0 1 -10,-10 v-32 a10,10 0 0 1 10,-10z" fill="#fff" stroke="${K.line}" stroke-width="2"/><path d="M-26,4 q6,-12 12,0 t12,0 t12,0 t12,0" fill="none" stroke="${K.mark}" stroke-width="3" class="fa-blink"/></g>` +
  T(266, 128, 'речь', 13, K.line, 800) + T(266, 146, 'невнятная', 12, K.mark, 900), 'Три признака инсульта');

SCENES.strokeWait = () => svg(floor() +
  `<rect x="22" y="104" width="60" height="26" rx="12" fill="#E5E7EB" stroke="${K.line}" stroke-width="${LW}"/>` +
  P('M96,112 Q100,98 120,96 L200,104 Q212,108 212,120 L212,142 L92,142 Z', K.vShirt) + L('M210,120 L300,128', K.vPants, 22) +
  C(66, 96, 15, K.hair) + C(70, 94, 14, K.skin) +
  `<g transform="translate(232,20)"><path d="M0,0 L6,42 L30,42 L36,0 Z" fill="#BFDBFE" stroke="${K.line}" stroke-width="2"/>${cross(18,22,40)}</g>` +
  `<g transform="translate(280,30)"><rect x="-14" y="6" width="28" height="14" rx="7" fill="#fff" stroke="${K.line}" stroke-width="2"/>${cross(0,13,30)}</g>` +
  T(70, 40, 'голова чуть выше', 12, K.line, 800), 'Уложите, голова чуть приподнята');

/* ---------- анафилаксия ---------- */
SCENES.anaphSigns = () => svg(
  `<g transform="translate(90,76)">${C(0,0,54,K.skin)}${C(-20,-14,4.5,K.line)}${C(20,-14,4.5,K.line)}` +
  `<ellipse cx="0" cy="26" rx="22" ry="11" fill="#F87171" stroke="${K.line}" stroke-width="2" class="fa-swell"/>` +
  [[-34,4],[-28,-30],[30,-32],[36,8],[-10,-40],[14,-44]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#FCA5A5" stroke="#EF4444" stroke-width="1.5"/>`).join('') + `</g>` +
  `<g class="fa-blink"><path d="M160,100 q12,-8 0,-16 q-12,-8 0,-16" fill="none" stroke="${K.water}" stroke-width="3"/><path d="M176,100 q12,-8 0,-16 q-12,-8 0,-16" fill="none" stroke="${K.water}" stroke-width="3"/></g>` +
  T(250, 50, 'отёк губ, языка', 13, K.line, 800) + T(250, 72, 'трудно дышать', 13, K.mark, 900) + T(250, 94, 'сыпь, слабость', 13, K.line, 800), 'Признаки анафилаксии');

function injector(x, y, rot=0){
  return `<g transform="translate(${x},${y}) rotate(${rot})"><rect x="-10" y="-60" width="20" height="78" rx="8" fill="#FDE047" stroke="${K.line}" stroke-width="${LW}"/><rect x="-10" y="10" width="20" height="18" rx="6" fill="#F97316" stroke="${K.line}" stroke-width="${LW}"/><rect x="-10" y="-60" width="20" height="14" rx="6" fill="#2563EB"/></g>`;
}
SCENES.phonePen = () => svg(
  `<g transform="translate(40,20)"><rect width="64" height="120" rx="12" fill="${K.line}"/><rect x="5" y="12" width="54" height="94" rx="4" fill="#fff"/>${T(32,60,'103',22,K.mark,900)}${T(32,80,'анафилаксия',8,K.line,800)}</g>` +
  P('M170,70 L290,70 L300,150 L160,150 Z', '#8B5E3C') + `<path d="M170,70 q60,-40 120,0" fill="none" stroke="${K.line}" stroke-width="3"/>` +
  `<g class="fa-peek">${injector(230, 92, 0)}</g>` + T(230, 166, 'шприц-ручка', 12, K.line, 800), 'Звоните 103 и найдите шприц-ручку');

SCENES.inject = () => svg(defs + floor(150) +
  // бедро сбоку, наружная сторона
  P('M10,96 Q10,74 36,72 L250,70 Q276,72 280,96 Q276,122 250,124 L36,124 Q10,122 10,96 Z', K.vPants) +
  `<path d="M40,74 H250" stroke="${K.vShirtS}" stroke-width="2" stroke-dasharray="5 4"/>` + T(150, 144, 'наружная сторона бедра', 12, K.line, 800) +
  target(150, 74, 8) +
  `<g class="fa-push"><g transform="translate(150,52) scale(.75)">${injector(0, 0, 0)}</g></g>` +
  `<g class="fa-blink">${T(206, 34, 'щёлк!', 14, K.mark, 900, 'start')}</g>` + badge(16, 14, 'держите 10 с', 104, K.mark), 'Укол в наружную сторону бедра');

SCENES.legsRaised = () => svg(floor() +
  `<rect x="214" y="104" width="70" height="38" rx="8" fill="#8B5E3C" stroke="${K.line}" stroke-width="${LW}"/>` +
  P('M70,124 Q74,110 98,108 L180,112 Q190,114 190,126 L190,142 L70,142 Z', K.vShirt) +
  L('M188,126 L244,104 L296,98', K.vPants, 20) +
  C(52, 128, 14, K.hair) + C(56, 127, 13, K.skin) +
  arrow('M262,60 V86', 'fa-blink') + T(140, 40, 'лёжа, ноги выше', 14, K.line, 800) + T(140, 60, 'вставать нельзя', 13, K.mark, 900), 'Лёжа, ноги приподняты');

/* ---------- судороги ---------- */
SCENES.seizure = () => svg(defs + floor() +
  `<rect x="20" y="122" width="56" height="20" rx="8" fill="#7C3AED" stroke="${K.line}" stroke-width="${LW}"/>` + T(48, 160, 'куртка', 11, K.line, 800) +
  `<g class="fa-jerk">` + lyingAdult() + `</g>` +
  `<g transform="translate(120,40)">${P('M-30,-6 q-12,0 -12,6 q0,6 12,6 L30,4 L30,-4 Z','#CBD5E1')}${cross(0,0,50)}</g>` +
  T(246, 34, 'не держать', 14, K.mark, 900) + T(246, 54, 'ничего в рот', 14, K.mark, 900), 'Не держите, ничего в рот');

/* ---------- перелом ---------- */
SCENES.fracture = () => svg(defs + floor(150) +
  P('M10,70 L120,74 L200,96 L300,96 L300,124 L196,124 L116,100 L10,98 Z', K.skin) +
  `<path d="M120,74 L116,100" stroke="${K.blood}" stroke-width="3" stroke-dasharray="4 3"/>` +
  `<g opacity=".9">${arrow('M200,40 q-40,-10 -80,10', '', K.line)}</g>` + cross(160, 40, 34) +
  T(160, 148, 'не выпрямлять, не вправлять', 13, K.mark, 900), 'Не выпрямляйте и не вправляйте');

SCENES.sling = () => svg(
  `<g transform="translate(110,0)">${C(50,26,18,K.skin)}${P('M10,50 Q50,40 90,50 L96,170 L4,170 Z', K.vShirt)}` +
  L('M12,56 L20,106 L70,96', K.vShirtS, 13) + C(76, 95, 7, K.skin) +
  `<path d="M14,56 Q30,120 86,92 L84,60" fill="#FDE68A" opacity=".9" stroke="${K.line}" stroke-width="2" class="fa-pulse"/></g>` +
  T(52, 50, 'подвяжите', 13, K.line, 800) + T(52, 68, 'к телу', 13, K.line, 800) + T(270, 50, 'шарф', 13, K.line, 800) + T(270, 68, 'рубашка', 13, K.line, 800), 'Подвяжите руку к телу');

/* ---------- метроном ---------- */
const MAP = {
  'compress-adult':()=>SCENES.compress({type:'adult'}), 'compress-child':()=>SCENES.compress({type:'child'}), 'compress-infant':()=>SCENES.compress({type:'infant'}),
  'breath-adult':()=>SCENES.breath({type:'adult'}), 'breath-child':()=>SCENES.breath({type:'child'}), 'breath-infant':()=>SCENES.breath({type:'infant'}),
  'hands-adult':()=>SCENES.handsTop({type:'adult'}), 'hands-child':()=>SCENES.handsTop({type:'child'}), 'hands-infant':()=>SCENES.handsTop({type:'infant'}),
  'airway':()=>SCENES.airway(), 'airway-infant':()=>SCENES.airway({infant:true}),
  'look':()=>SCENES.look(), 'look-infant':()=>SCENES.look({infant:true}),
  'clock5':()=>SCENES.clock({label:'5 минут'}), 'clock15':()=>SCENES.clock({label:'15 минут'}), 'clock20':()=>SCENES.clock({label:'20 минут'}),
  'stamp':()=>SCENES.clock({stamp:true}),
  'zones-burn':()=>SCENES.zones({zones:['face','neck','hands','feet','pelvis'], side: T(250,40,'лицо, шея,',13,K.line,800)+T(250,58,'кисти, стопы,',13,K.line,800)+T(250,76,'пах',13,K.line,800)+T(250,110,'больше ладони',13,K.mark,900)}),
  'zones-fracture':()=>SCENES.zones({zones:['thigh','pelvis','back','neck','face'], side: T(250,40,'бедро, таз,',13,K.line,800)+T(250,58,'спина, шея,',13,K.line,800)+T(250,76,'голова',13,K.line,800)+T(250,110,'звоните 103',13,K.mark,900)})
};
window.FA_ANIM = function(name){ try{ return (MAP[name] || SCENES[name] || (()=>''))(); }catch(e){ return ''; } };

/* ---------- анимации ---------- */
const css = `
.fa-anim svg{width:100%;height:100%;display:block}
.fa-target{animation:fa-pulse 1.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.fa-pulse{animation:fa-pulse 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.fa-blink{animation:fa-blink 1.1s ease-in-out infinite}
.fa-scan{animation:fa-scan 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.fa-shake{animation:fa-shake .35s ease-in-out infinite}
.fa-tilt{animation:fa-tilt 2.6s ease-in-out infinite;transform-box:view-box;transform-origin:150px 128px}
.fa-rise{animation:fa-none 1s}
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
.fa-hold{}
@keyframes fa-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
@keyframes fa-blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes fa-scan{0%,100%{transform:translateX(-10px)}50%{transform:translateX(10px)}}
@keyframes fa-shake{0%,100%{transform:translate(0,0)}25%{transform:translate(-2px,2px)}75%{transform:translate(2px,-1px)}}
@keyframes fa-tilt{0%,15%{transform:rotate(0)}45%,85%{transform:rotate(14deg)}100%{transform:rotate(0)}}
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
@keyframes fa-thrust{0%,40%{transform:translate(0,0)}60%{transform:translate(8px,-8px)}100%{transform:translate(0,0)}}
@keyframes fa-water{to{stroke-dashoffset:-18}}
@keyframes fa-film{0%{opacity:0;transform:translateX(-30px)}35%,85%{opacity:1;transform:none}100%{opacity:0}}
@keyframes fa-peek{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes fa-sweep{to{transform:rotate(360deg)}}
@keyframes fa-drift{0%,20%{transform:rotate(0)}60%,90%{transform:rotate(-28deg)}100%{transform:rotate(0)}}
@keyframes fa-swell{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
@keyframes fa-jerk{0%,100%{transform:translate(0,0)}25%{transform:translate(1.5px,-1px)}50%{transform:translate(-1px,1px)}75%{transform:translate(1px,1px)}}
@keyframes fa-none{}
@media (prefers-reduced-motion: reduce){[class^="fa-"],[class*=" fa-"]{animation:none!important}.fa-wrap,.fa-film,.fa-air{opacity:1}}
`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
})();
