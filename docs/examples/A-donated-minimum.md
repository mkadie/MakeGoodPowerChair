<!-- Generated from configurator/index.html rules 0.4, 2026-10-14 -->
# A. Donated hoverboard, minimum

Cheapest viable 36 V build: donated hoverboard, VESC, 2×2 Ah DeWalt, manual wheel locks, no assist, parent e-stop remote.

## Configuration
- Driver mass (max): Up to 25 kg
- Friend riding along: No passenger
- Manual / power mechanism: Lever-deployed drive wheels
- Drive motors: Hoverboard-class hub
- Motor source: Donated working hoverboard
- Drive wheel size: 8–8.5 in
- Motor controller: VESC dual
- Battery: 2× DeWalt 2 Ah
- Regenerative braking: Off
- Parking brake: Manual wheel locks
- Assistive driving computer: None
- Assist features: Tip / slope monitoring, Power monitoring and range
- Assist default level: Warn only
- Ventilator: None
- Driver input: Joystick
- Supervision: E-stop remote, Attendant takeover
- Attendant link: Bluetooth LE
- Parent settings interface: On-chair key + display

## Warnings
- [caution] Donated hoverboard battery: not reused in the chair by default. Its age and cell quality are unknown. If considered, require a UL 2272 label, capacity test, and BMS check; otherwise send it to battery recycling (DRV-2d).
- [caution] VESC clones vary widely. Specify a vetted source and bench-test each unit.
- [info] Counterfeit DeWalt-style packs are common at low prices. Buy genuine packs from authorized retailers.
- [info] Manual locks only: not automatic. The chair holds only when a caregiver applies them.

## Parts
| Category | Item | Qty | Est. cost (USD) | Price basis | Note |
|---|---|---|---|---|---|
| Control | RP2350 supervisor board | 1 | 7–15 | est | radio-equipped, e.g. Pico 2 W class |
| Power | Main fuse or DC breaker, bus-rated | 1 | 10–25 | est |  |
| Power | Main power switch, child-inaccessible | 1 | 10–30 | est | SAF-3 |
| Power | Battery state display | 1 | 5–20 | est | BAT-9 |
| Drive | Donated working hoverboard | 1 | 0–0 | donated | source of a matched motor pair; controller still replaced |
| Drive | Hub motors from donated hoverboard, 8 in, 36 V | 2 | 0–0 | donated | wheel size set by the donated unit |
| Tools | Teardown tools (driver bits, wire cutters, heat shrink) | 1 | 0–20 | est | skip if owned |
| Drive | Metal axle clamp brackets | 2 | 20–60 | est | MEC-2 |
| Drive | Motor temperature sensor | 2 | 2–6 | est | SAF-9 |
| Control | Dual VESC controller, vetted unit, hall FOC | 1 | 180–260 | est | verify rating at 36 V |
| Control | CAN transceiver, 3.3 V | 1 | 2–8 | est |  |
| Power | DeWalt 20V MAX 2 Ah (DCB203, 36 Wh) | 2 | 58–120 | listed | genuine only; ≤100 Wh each |
| Power | DeWalt 20V battery adapter with leads | 2 | 20–50 | est |  |
| Power | Series harness, 2 packs to 36 V | 1 | 5–15 | est |  |
| Power | DeWalt 20V charger | 1 | 30–70 | est | skip if owned |
| Power | Per-pack voltage sense divider | 1 | 1–3 | est | midpoint tap, BAT-4 |
| Mechanical | Lift lever linkage with over-center lock | 1 | 30–100 | est | DM-3 |
| Safety | Deploy/lock interlock switch | 2 | 6–20 | est | DM-2 |
| Brake | Wheel lock, lever-on-tire | 4 | 60–160 | est | printed wheels and drive wheels |
| Assist | IMU (pitch/roll/rate) | 1 | 5–15 | est |  |
| Assist | Bus current/voltage monitor | 1 | 5–15 | est |  |
| Input | Proportional joystick, adjustable mount | 1 | 20–150 | est | INP-4 |
| Control | Parent remote (BLE) with e-stop button | 1 | 20–60 | est |  |
| Control | Keyswitch for settings lock | 1 | 5–15 | est | CFG-3 |
| Control | Small status display | 1 | 10–25 | est | CFG-8 |

**Parts total: $511–$1,262** (25 of 25 lines priced; excludes shipping, tax, filament, TBD items). Prices as of Sept 2026; "listed" = seen in a US retail listing, "est." = estimate to verify.

## Verification
- [ ] Before teardown: power up the donated hoverboard and confirm both wheels drive smoothly in both directions, with no grinding or hall faults. Record make, model, and any UL 2272 label.
- [ ] After teardown: incoming inspection per DRV-2a/DRV-2d (bearings, all 6 hall states, phase resistance, insulation, tire, axle).
- [ ] Load the versioned controller config file; verify speed cap, current limits, and command timeout (ELE-2a, SAF-5).
- [ ] Stability in manual, powered, and transition positions (DM-8). Lever force with max occupant (DM-5).
- [ ] Brake hold on 1:12 slope, power off, max mass, in every drive mode (SAF-1, DM-7).
- [ ] Run the tip/slope test protocol before enabling above Warn (ASD-12).
- [ ] Run the power test protocol before enabling above Warn (ASD-12).
- [ ] Tip test: IMU beyond recovery angle disables drive and alerts caregiver (ASD-13, proposed).
- [ ] Unplug or fault each input device while driving: chair stops (INP-3).
- [ ] Link-loss test: turn the remote off while driving; chair stops within the set time (ATT-3).
