// Runs the configurator's rules engine headlessly for a set of named scenarios and writes
// docs/examples/*.md and docs/price-matrix.md. Run from the repo root: node docs/tools/run-scenarios.js
const fs=require('fs');
const html=fs.readFileSync(process.argv[2]||'configurator/index.html','utf8');
const src=html.slice(html.indexOf('<script>')+8, html.lastIndexOf('</script>'));
// minimal DOM stub
const mk=()=>{const el={innerHTML:'',textContent:'',style:{},value:'',children:[],classList:{toggle(){},add(){}},
  appendChild(c){this.children.push(c);return c},querySelectorAll(){return[]},focus(){},addEventListener(){}};return el};
const reg={};
global.document={getElementById:id=>reg[id]||(reg[id]=mk()),createElement:mk,activeElement:null};
global.window={};
global.localStorage=undefined;
global.navigator={};
const vm=require('vm');
const ctx={document,window,console,localStorage:undefined,navigator:{}};
vm.createContext(ctx);
vm.runInContext(src+'\nctx_export={P,DECISIONS,defaults,normalize,compute,exportMd,money,setState:s=>{state=s},getState:()=>state,last:()=>window._last};', ctx);
const E=ctx.ctx_export;
// scenarios
const S={
 "A-donated-minimum":{name:"A. Donated hoverboard, minimum",desc:"Cheapest viable 36 V build: donated hoverboard, VESC, 2×2 Ah DeWalt, manual wheel locks, no assist, parent e-stop remote.",
  cfg:{motorsrc:"donated",batt:"2ah",brake:["manual"],sup:["estop","takeover"],cfgui:"key"}},
 "B-default":{name:"B. Configurator defaults",desc:"What the tool proposes untouched: new hubs, VESC, 2×2 Ah, lift-lever dual mode, BLE remote, key+app settings.",cfg:{}},
 "C-hoverboard-hotswap":{name:"C. New hubs, hot-swap, solenoid brake",desc:"Recommended 36 V build for daily use: new 8 in hubs, VESC, 4×5 Ah hot-swap, solenoid pin lock + manual locks, BLE remote.",
  cfg:{batt:"hot",brake:["manual","pin"]}},
 "D-odrive":{name:"D. New hubs on 2× ODrive S1",desc:"Same as C but ODrive S1 instead of VESC (brake resistor included, listed price).",
  cfg:{ctrl:"odrive",batt:"hot",brake:["manual","pin"]}},
 "E-wheelchair-brushed":{name:"E. Wheelchair gearmotors + RoboClaw",desc:"24 V brushed wheelchair gearmotors with integrated EM brake, RoboClaw 2x30A, 24 V 10 Ah pack.",
  cfg:{drive:"wcbrushed",ctrl:"roboclaw",batt:"b24_10",brake:["integ","manual"]}},
 "F-wheelchair-standard":{name:"F. Wheelchair motors + standard controller",desc:"Most conventional: 24 V gearmotors with a standard wheelchair controller/joystick, 24 V 6 Ah pack, tether kill cord, on-chair settings only — no supervisor-driven remote.",
  cfg:{drive:"wcbrushed",ctrl:"wcctrl",batt:"b24_6",brake:["integ"],sup:["tether"],link:"none",cfgui:"key"}},
 "G-full-assist":{name:"G. Full assist + Sip-N-Puff + buddy seat",desc:"Everything on: C plus VENTUNO Q assist (collision, drop-off, tip, power), Sip-N-Puff + joystick input, buddy seat, ventilator on own batteries.",
  cfg:{batt:"hot",brake:["manual","pin"],aiplat:"ventuno",assist:["collide","drop","tip","power"],assistlvl:"slow",input:["joy","snp"],passenger:"seat",vent:"indep"}},
};
const out={};
fs.mkdirSync('docs/examples',{recursive:true});
for(const [k,v] of Object.entries(S)){
  const s=E.normalize(Object.assign(E.defaults(),v.cfg)); E.setState(s); E.compute();
  const L=E.last(); const md=E.exportMd();
  const nS=L.W.filter(w=>w.lvl==="stop").length,nC=L.W.filter(w=>w.lvl==="caution").length;
  out[k]={name:v.name,desc:v.desc,lo:L.lo,hi:L.hi,priced:L.priced,lines:L.bom.length,stop:nS,caution:nC,cfg:s};
  fs.writeFileSync(`docs/examples/${k}.md`,`<!-- Generated from configurator/index.html rules 0.4, ${new Date().toISOString().slice(0,10)} -->\n# ${v.name}\n\n${v.desc}\n\n`+md.replace(/^# .*\n\n/,''));
}
// ---- price matrix
const M=out;
const D=Object.entries(M);
const name=(d,v)=>v;
let t=`# Price Matrix

Parts-cost ranges for seven representative configurations, **computed by the configurator's rules engine** (\`configurator/index.html\`, rules 0.4) — not hand-tallied. Regenerate with \`docs/tools/run-scenarios.js\` after any change to the price book or rules.

Prices: US retail, September 2026, USD. Ranges exclude shipping, tax, filament, printed parts, and items marked TBD. Basis per line: \`listed\` = seen in a US retail listing; \`est.\` = estimate to verify; \`donated\` = $0. Full build sheets with line items and verification checklists are in \`docs/examples/\`.

## Summary

| # | Configuration | Parts low | Parts high | Lines priced | Blocking | Cautions | Build sheet |
|---|---|---|---|---|---|---|---|
`;
for(const [k,o] of D){t+=`| ${o.name.split('.')[0]} | ${o.name.replace(/^[A-G]\. /,'')} | $${o.lo.toLocaleString()} | $${o.hi.toLocaleString()} | ${o.priced}/${o.lines} | ${o.stop} | ${o.caution} | [${k}.md](examples/${k}.md) |\n`}
t+=`
## What each configuration is

`;
for(const [k,o] of D){t+=`**${o.name}** — ${o.desc}\n\n`}
t+=`## Key choices side by side

| Choice | ${D.map(([k,o])=>o.name.split('.')[0]).join(' | ')} |
|---|${D.map(()=>'---').join('|')}|
`;
const rows=[["Drive","drive"],["Motor source","motorsrc"],["Wheel","wheel"],["Controller","ctrl"],["Battery","batt"],["Parking brake","brake"],["Dual mode","dual"],["Assist computer","aiplat"],["Assist features","assist"],["Driver input","input"],["Supervision","sup"],["Attendant link","link"],["Passenger","passenger"],["Ventilator","vent"]];
for(const [lab,key] of rows){t+=`| ${lab} | ${D.map(([k,o])=>{const v=o.cfg[key];return Array.isArray(v)?(v.join(', ')||'—'):v}).join(' | ')} |\n`}
t+=`
Values are the configurator's option keys (see \`configurator-guide.md\` for the key → label table).

## Reading the numbers

- **Low** sums every line's low price; **high** sums every high. A real build lands somewhere between, and closer to low if parts are bought carefully and the builder already owns a charger and tools.
- The spread is mostly \`est.\` uncertainty. As lines move to \`listed\` the range tightens.
- Configuration A assumes a donated hoverboard that passes the pre-teardown test. A failed donation costs time, not money.
- Wheelchair-motor builds (E, F) look price-competitive with 36 V builds but add 6–14 kg of drive hardware to a toddler chair — see the weight cautions in their build sheets.
- G is the ceiling: vision assist (VENTUNO Q, $299 listed) and a buddy seat sub-frame are the big adders. Sip-N-Puff and head-array inputs are priced TBD (R.O.A.R. modules).

## Cost levers, largest first

1. Motor source — donated ($0) vs new hubs ($140–260/pair) vs wheelchair motors ($320–900/pair)
2. Battery capacity — 2×2 Ah ($58–120) vs 4×5 Ah hot-swap ($236–516) vs 24 V 10 Ah ($270–700)
3. Assist compute — none vs UNO Q ($45–70 est.) vs VENTUNO Q ($299 listed)
4. Controller — VESC ($180–260 est.) vs 2× ODrive S1 ($322 listed incl. heat spreaders) vs RoboClaw ($135 listed)
5. Brake strategy — manual locks only ($30–80) vs solenoid pin ($65–170) vs EM brake ($110–320)
`;
fs.writeFileSync('docs/price-matrix.md',t);
