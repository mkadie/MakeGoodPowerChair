# Configurator Guide

`configurator/index.html` is a single self-contained web page — no build step, no server, no dependencies beyond a font. Open it in any browser. It walks a builder through 18 decisions and produces a **build sheet**: parts list with cost ranges, warnings, and a verification checklist keyed to requirement IDs.

Worked examples for seven configurations are in `docs/examples/`; their totals are compared in `price-matrix.md`.

## Using it

1. Open the page. Defaults load (configuration B in the price matrix).
2. Work top to bottom. Options that conflict with an earlier choice are greyed out with the reason on hover — e.g. choose wheelchair gearmotors and the VESC/ODrive options disable with "Brushed motors only".
3. Watch the summary bar: **"Build sheet: ready to review"** or **"not ready"** with the count of blocking and caution warnings. A blocking warning highlights the fieldset that caused it.
4. **Copy as Markdown** exports the full build sheet (what the files in `docs/examples/` are). **Copy JSON** exports the configuration for re-import or for attaching to a GitHub issue.
5. Your choices persist in the browser (localStorage). **Reset** returns to defaults.

## The 18 decisions

| # | Decision | Req. | Options (key → label) |
|---|---|---|---|
| 1 | Driver mass (max) | PAS-1 | `15` up to 15 kg (ages ~1–3) · `25` up to 25 kg (ages ~3–8) |
| 2 | Friend riding along | §8 | `none` · `trailer` · `seat` buddy seat · `board` standing board · `play` shared-play modes only |
| 3 | Manual / power mechanism | §9 | `lift` lever-deployed drive wheels · `pod` removable power pod · `friction` friction drive · `poweronly` (blocked) |
| 4 | Drive motors | DRV-2 | `hub36` hoverboard-class hub · `wcbrushed` wheelchair gearmotor · `wcbldc` wheelchair brushless hub wheel |
| 5 | Motor source | DRV-2a | `new` · `donated` (hoverboard only) · `salv` salvaged · `mixed` |
| 6 | Drive wheel size | DRV-3 | `6.5` · `8` · `10` in |
| 7 | Motor controller | ELE-2b | `vesc` · `odrive` · `zs` (bench only) · `reflash` · `roboclaw` · `sabertooth` · `wcctrl` standard wheelchair controller |
| 8 | Battery | §6 | 36 V: `2ah` · `5ah` · `hot` 4×5 Ah hot-swap — 24 V: `b24_6` · `b24_10` · `b24hot` · `sla` |
| 9 | Regenerative braking | SAF-10 | `off` · `on` |
| 10 | Parking brake (multi) | SAF-1/2 | `integ` motor's EM brake · `manual` wheel locks · `pin` solenoid pin · `em` add-on EM · `cable` disc caliper |
| 11 | Assistive driving computer | 4.7 | `none` · `ventuno` · `unoq` · `other` |
| 12 | Assist features (multi) | ASD | `collide` · `drop` · `street` · `tip` · `power` |
| 13 | Assist default level | ASD-2 | `warn` · `slow` · `stop` (with override) |
| 14 | Ventilator | §7 | `none` · `indep` own batteries · `fed` from chair |
| 15 | Driver input (multi) | INP-2 | `joy` · `sw` switches · `scan` single-switch scanning · `snp` Sip-N-Puff · `head` head array |
| 16 | Supervision (multi) | 4.6.2 | `deadman` · `estop` · `takeover` · `tether` · `enable` · `timed` · `prox` · `indep` |
| 17 | Attendant link | ATT-4 | `ble` · `rc` 2.4 GHz with failsafe · `none` |
| 18 | Parent settings interface | CFG-3 | `key` on-chair key + display · `app` phone · `both` |

## How the rules work

Everything lives in one `<script>` block. Three structures matter:

**`P` — the price book.** `key: [low, high, basis]`. `null` means TBD. Rendered in `price-book.md`.

**`DECISIONS` — the form.** Each option is `[key, label, sublabel, availableFn, disabledReason]`. `availableFn(state)` returns false to grey the option out. Example: ODrive is available only when `s.drive !== "wcbrushed"`.

**`compute()` — the rules.** Reads `state`, calls three helpers:
- `add(category, item, qty, note, priceKey)` — a BOM line
- `warn("stop" | "caution" | "info", text, fieldsetId)` — `stop` blocks the build and highlights the fieldset
- `C.push(text)` — a verification checklist item

Rules are grouped by subsystem in source order: always-included parts, drive, controller, battery, passenger, dual mode, brakes, assist, ventilator, inputs, supervision/link, config UI.

### Blocking rules (as of rules 0.4)

| Condition | Why |
|---|---|
| `poweronly` dual mode | Fails dual-mode requirement (1.5a, MEC-7) |
| ZS-X11H controller | Open-loop, no current limit, no watchdog — fails ELE-2 |
| No parking brake | SAF-1 requires hold on 1:12 slope, power off |
| No driver input | Nothing to drive with |
| Remote supervision option with no attendant link | Needs BLE or RC |

### Automatic derivations worth knowing

- Switching to a wheelchair motor family auto-adds `integ` (the motor's own EM brake) to the brake list.
- A dump resistor is added whenever regen is on, hot-swap is selected (ideal diodes block regen into packs), or ODrive is selected (headroom to the 50.5 V trip).
- Lift/pod dual mode doubles the wheel-lock count (printed wheels *and* drive wheels) unless the motors have integrated brakes.
- Choosing an assist computer adds a DC-DC, an override switch matched to the driver input, and an annunciator.
- `tip` and `power` assist features need no assist computer — they run on the supervisor.

## Extending it

- **New part / price:** add to `P`, reference by key in `add(...)`. Mark it `est` until a listing is found.
- **New option:** append to the `opts` array of the decision; add an `availableFn` if it conflicts with anything; add rules in `compute()`.
- **New requirement ID:** cite it in the `note` of the BOM line or the checklist text so the build sheet stays traceable.
- Bump the `rules` version string in the JSON export (`"rules":"0.4"`) when behaviour changes, and regenerate `docs/examples/` and `price-matrix.md` with `docs/tools/run-scenarios.js`.

## Regenerating the docs

```bash
node docs/tools/run-scenarios.js configurator/index.html   # → docs/examples/*.md, docs/price-matrix.md
node docs/tools/pricebook.js                                # → docs/price-book.md
```

Both scripts run the configurator's own JavaScript in Node with a stub DOM, so the generated docs are exactly what the page would produce.

## Limits

- Prices are a snapshot (Sept 2026, US). The tool does not fetch live prices.
- It does not know about your printer, filament, or labour.
- It does not replace the requirements doc — it enforces a subset of its rules.
- Rules are only as good as what we've encoded. If a combination you know is bad isn't flagged, open an issue.
