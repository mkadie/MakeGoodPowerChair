# Price Matrix

Parts-cost ranges for seven representative configurations, **computed by the configurator's rules engine** (`configurator/index.html`, rules 0.4) — not hand-tallied. Regenerate with `docs/tools/run-scenarios.js` after any change to the price book or rules.

Prices: US retail, September 2026, USD. Ranges exclude shipping, tax, filament, printed parts, and items marked TBD. Basis per line: `listed` = seen in a US retail listing; `est.` = estimate to verify; `donated` = $0. Full build sheets with line items and verification checklists are in `docs/examples/`.

## Summary

| # | Configuration | Parts low | Parts high | Lines priced | Blocking | Cautions | Build sheet |
|---|---|---|---|---|---|---|---|
| A | Donated hoverboard, minimum | $511 | $1,262 | 25/25 | 0 | 2 | [A-donated-minimum.md](examples/A-donated-minimum.md) |
| B | Configurator defaults | $651 | $1,502 | 23/23 | 0 | 1 | [B-default.md](examples/B-default.md) |
| C | New hubs, hot-swap, solenoid brake | $949 | $2,228 | 29/29 | 0 | 1 | [C-hoverboard-hotswap.md](examples/C-hoverboard-hotswap.md) |
| D | New hubs on 2× ODrive S1 | $1,081 | $2,260 | 29/30 | 0 | 1 | [D-odrive.md](examples/D-odrive.md) |
| E | Wheelchair gearmotors + RoboClaw | $1,055 | $2,231 | 21/21 | 0 | 1 | [E-wheelchair-brushed.md](examples/E-wheelchair-brushed.md) |
| F | Wheelchair motors + standard controller | $850 | $2,106 | 18/18 | 0 | 3 | [F-wheelchair-standard.md](examples/F-wheelchair-standard.md) |
| G | Full assist + Sip-N-Puff + buddy seat | $1,533 | $3,397 | 41/42 | 0 | 2 | [G-full-assist.md](examples/G-full-assist.md) |

## What each configuration is

**A. Donated hoverboard, minimum** — Cheapest viable 36 V build: donated hoverboard, VESC, 2×2 Ah DeWalt, manual wheel locks, no assist, parent e-stop remote.

**B. Configurator defaults** — What the tool proposes untouched: new hubs, VESC, 2×2 Ah, lift-lever dual mode, BLE remote, key+app settings.

**C. New hubs, hot-swap, solenoid brake** — Recommended 36 V build for daily use: new 8 in hubs, VESC, 4×5 Ah hot-swap, solenoid pin lock + manual locks, BLE remote.

**D. New hubs on 2× ODrive S1** — Same as C but ODrive S1 instead of VESC (brake resistor included, listed price).

**E. Wheelchair gearmotors + RoboClaw** — 24 V brushed wheelchair gearmotors with integrated EM brake, RoboClaw 2x30A, 24 V 10 Ah pack.

**F. Wheelchair motors + standard controller** — Most conventional: 24 V gearmotors with a standard wheelchair controller/joystick, 24 V 6 Ah pack, tether kill cord, on-chair settings only — no supervisor-driven remote.

**G. Full assist + Sip-N-Puff + buddy seat** — Everything on: C plus VENTUNO Q assist (collision, drop-off, tip, power), Sip-N-Puff + joystick input, buddy seat, ventilator on own batteries.

## Key choices side by side

| Choice | A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|
| Drive | hub36 | hub36 | hub36 | hub36 | wcbrushed | wcbrushed | hub36 |
| Motor source | donated | new | new | new | new | new | new |
| Wheel | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| Controller | vesc | vesc | vesc | odrive | roboclaw | wcctrl | vesc |
| Battery | 2ah | 2ah | hot | hot | b24_10 | b24_6 | hot |
| Parking brake | manual | manual | manual, pin | manual, pin | integ, manual | integ | manual, pin |
| Dual mode | lift | lift | lift | lift | lift | lift | lift |
| Assist computer | none | none | none | none | none | none | ventuno |
| Assist features | tip, power | tip, power | tip, power | tip, power | tip, power | tip, power | collide, drop, tip, power |
| Driver input | joy | joy | joy | joy | joy | joy | joy, snp |
| Supervision | estop, takeover | estop, takeover | estop, takeover | estop, takeover | estop, takeover | tether | estop, takeover |
| Attendant link | ble | ble | ble | ble | ble | none | ble |
| Passenger | none | none | none | none | none | none | seat |
| Ventilator | none | none | none | none | none | none | indep |

Values are the configurator's option keys (see `configurator-guide.md` for the key → label table).

## Reading the numbers

- **Low** sums every line's low price; **high** sums every high. A real build lands somewhere between, and closer to low if parts are bought carefully and the builder already owns a charger and tools.
- The spread is mostly `est.` uncertainty. As lines move to `listed` the range tightens.
- Configuration A assumes a donated hoverboard that passes the pre-teardown test. A failed donation costs time, not money.
- Wheelchair-motor builds (E, F) look price-competitive with 36 V builds but add 6–14 kg of drive hardware to a toddler chair — see the weight cautions in their build sheets.
- G is the ceiling: vision assist (VENTUNO Q, $299 listed) and a buddy seat sub-frame are the big adders. Sip-N-Puff and head-array inputs are priced TBD (R.O.A.R. modules).

## Cost levers, largest first

1. Motor source — donated ($0) vs new hubs ($140–260/pair) vs wheelchair motors ($320–900/pair)
2. Battery capacity — 2×2 Ah ($58–120) vs 4×5 Ah hot-swap ($236–516) vs 24 V 10 Ah ($270–700)
3. Assist compute — none vs UNO Q ($45–70 est.) vs VENTUNO Q ($299 listed)
4. Controller — VESC ($180–260 est.) vs 2× ODrive S1 ($322 listed incl. heat spreaders) vs RoboClaw ($135 listed)
5. Brake strategy — manual locks only ($30–80) vs solenoid pin ($65–170) vs EM brake ($110–320)
