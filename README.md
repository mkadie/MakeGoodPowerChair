# MakeGood Power Chair

Open-source powered drive add-on for the MakeGood **Toddler Mobility Trainer (TMT)** — a 3D-printed pediatric mobility chair for ages ~1–8.

The goal is a **dual-mode** chair: it works as a manual chair (child self-propels on the printed wheels) *and* as a power chair, and is buildable by volunteer makers using desktop FDM printers plus commodity parts (hoverboard-class hub motors or standard 24 V wheelchair motors, off-the-shelf controllers, quick-swap tool batteries).

Status: **private / pre-release.** Design discussion between R.O.A.R. / TSSFAA and MakeGood INC. Not yet safe to build from.

## Design principles

- **Affordable and open.** Donated hoverboards are a first-class motor source. Every part has a documented alternative.
- **Grows with the child.** Manual today, powered tomorrow, same frame.
- **Parents choose supervision.** Dead-man switch, e-stop, tether, timed sessions, etc. are *configurations* a parent selects with documented trade-offs — not decisions baked into the design. Only device-fault protections (the "Safety Floor") are non-configurable.
- **Assistive driving is advisory.** Optional AI assist (collision, drop-off/stair, street/vehicle, tip, power monitoring) is subtract-only: it can warn, slow, or stop-with-override. It never adds motion or steering, and it is always easily overridden. A system that reduces injuries, not one that gets blamed for them.
- **No reflashing.** Prefer controllers configured through their own tooling (VESC, ODrive, RoboClaw...) over hacked firmware, so volunteer builds are reproducible.

## Repo layout

| Path | Contents |
|---|---|
| `docs/` | Requirements, decision matrix, regulatory notes |
| `hardware/cad/` | TMT adapter parts, hub mounts, deploy lever — source CAD |
| `hardware/stl/` | Exported print files |
| `hardware/electrical/` | Wiring, battery interface, BMS, controller config |
| `firmware/` | Supervisor MCU (RP2350 / CircuitPython) — input, heartbeat, parent config |
| `assist/` | Optional AI driving-assist (advisory only) |
| `configurator/` | Browser-based build configurator → parts list, cost, warnings, checklist |

## Configurator

Open `configurator/index.html` in a browser. It turns ~14 build decisions (motor source, controller, battery, brake, supervision mode, assist...) into a parts list with cost ranges, blocking/caution/info warnings, and a verification checklist. Single self-contained file, no build step.

## References

- MakeGood TMT: https://3d-mobility.org/tmt — MakerWorld model 2066081
- MakeGood INC: https://makegood.design/
- R.O.A.R. / TSSFAA: https://tssfaa.com

## License

TBD — intended to match the MakeGood / TMT license once the project goes public. Until then, all rights reserved; shared privately for collaboration.
