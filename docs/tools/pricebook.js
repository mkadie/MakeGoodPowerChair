// Renders the configurator's price book (the P table) to docs/price-book.md. Run from the repo root.
const fs=require('fs');
const html=fs.readFileSync(process.argv[2]||'configurator/index.html','utf8');
const src=html.slice(html.indexOf('<script>')+8, html.lastIndexOf('</script>'));
const P=eval('('+src.match(/const P = (\{[\s\S]*?\n\});/)[1]+')');
// map pk -> item/category from add(...) calls
const map={};
const re=/add\("([^"]+)",\s*(`[^`]*`|"[^"]*"|s\.[^,]+?\?"[^"]*":"[^"]*"),\s*[^,]+,\s*(?:[^,]*?),\s*(?:s\.\w+==="\w+"\?)?"(\w+)"(?::"(\w+)")?\)/g;
let m; while((m=re.exec(src))){const cat=m[1];let item=m[2].replace(/^`|`$/g,'').replace(/^"|"$/g,'').replace(/\$\{[^}]+\}/g,'…');
  if(item.startsWith('s.')) item=item.match(/"([^"]*)"/)[1];
  for(const k of [m[3],m[4]].filter(Boolean)) if(!map[k]) map[k]={cat,item};}
const manual={rp2350:["Control","RP2350 supervisor board"],sense:["Power","Per-pack voltage sense divider"],wcBrushed:["Drive","Wheelchair gearmotor, 24 V brushed, EM brake + freewheel, new"],wcBldc:["Drive","Wheelchair brushless hub wheel, 24 V, EM brake, new"],odrive:["Control","ODrive S1"],dump:["Power","Bus brake / dump resistor with switch"],roboclaw:["Control","RoboClaw 2x30A"],buddy:["Mechanical","Buddy seat and guards"],jack:["Input","3.5 mm switch jacks"],ventuno:["Assist","Arduino VENTUNO Q"],hubDon:["Drive","Hub motors from donated hoverboard"],donated:["Drive","Donated working hoverboard"],hubSalv:["Drive","Hoverboard-class hub motor, salvaged"],hubNew:["Drive","Hoverboard-class hub motor, new"],wcBrushedSalv:["Drive","Wheelchair gearmotor, salvaged"],wcBldcSalv:["Drive","Wheelchair brushless hub wheel, salvaged"],hbBoard:["Control","Hoverboard mainboard (STM32F103)"],dcb203:["Power","DeWalt 20V MAX 2 Ah (DCB203)"],dcb205:["Power","DeWalt 20V MAX 5 Ah (DCB205)"],chgSla:["Power","24 V SLA charger"],chg24:["Power","24 V Li-ion charger"],ventCable:["Power","Ventilator manufacturer DC cable"],snp:["Input","R.O.A.R. Sip-N-Puff module"],head:["Input","Head array"]};
for(const [k,v] of Object.entries(manual)) map[k]={cat:v[0],item:v[1]};
const cats={};
for(const [k,v] of Object.entries(P)){const mm=map[k]||{cat:"?",item:k};(cats[mm.cat]=cats[mm.cat]||[]).push([k,mm.item,v])}
let t=`# Price Book

Unit prices (USD, per item) used by the configurator. This is a rendered view of the \`P\` table in \`configurator/index.html\`; **edit the configurator, not this file**, then regenerate with \`docs/tools/pricebook.js\`.

Basis: \`listed\` = seen in a US retail listing, September 2026 · \`est\` = estimate, verify before relying on it · \`donated\` = $0 · TBD = priced by the vendor at build time.

Rule of thumb for updating: a line moves from \`est\` to \`listed\` only with a retailer URL and date noted in the commit message.

`;
const order=["Drive","Control","Power","Brake","Mechanical","Safety","Input","Assist","Tools","?"];
for(const c of order){if(!cats[c])continue;t+=`## ${c==="?"?"Unmapped":c}\n\n| Key | Item | Low | High | Basis |\n|---|---|---|---|---|\n`;
 for(const [k,item,v] of cats[c]) t+=`| \`${k}\` | ${item} | ${v?'$'+v[0]:'TBD'} | ${v?'$'+v[1]:'TBD'} | ${v?v[2]:'vendor'} |\n`; t+='\n'}
const n=Object.values(P).length, listed=Object.values(P).filter(v=>v&&v[2]==='listed').length, est=Object.values(P).filter(v=>v&&v[2]==='est').length;
t+=`## Coverage\n\n${n} price-book entries: ${listed} listed, ${est} estimated, ${Object.values(P).filter(v=>v&&v[2]==='donated').length} donated, ${Object.values(P).filter(v=>!v).length} TBD. Priority for verification: the \`est\` lines with the largest high values (VESC, wheelchair controller, 24 V packs, EM brakes, buddy-seat sub-frame).\n`;
fs.writeFileSync('docs/price-book.md',t);
