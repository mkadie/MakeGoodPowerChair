<!-- Generated from configurator/index.html rules 0.4, 2026-10-14 -->
# D. New hubs on 2× ODrive S1

Same as C but ODrive S1 instead of VESC (brake resistor included, listed price).

## Configuration
- Driver mass (max): Up to 25 kg
- Friend riding along: No passenger
- Manual / power mechanism: Lever-deployed drive wheels
- Drive motors: Hoverboard-class hub
- Motor source: New
- Drive wheel size: 8–8.5 in
- Motor controller: 2× ODrive S1
- Battery: 4× DeWalt 5 Ah hot-swap
- Regenerative braking: Off
- Parking brake: Manual wheel locks, Solenoid pin lock
- Assistive driving computer: None
- Assist features: Tip / slope monitoring, Power monitoring and range
- Assist default level: Warn only
- Ventilator: None
- Driver input: Joystick
- Supervision: E-stop remote, Attendant takeover
- Attendant link: Bluetooth LE
- Parent settings interface: Both

## Warnings
- [caution] ODrive S1 bus limit is 50.5 V vs 42 V full 10S. Keep brake resistors fitted even with regen off.
- [info] Counterfeit DeWalt-style packs are common at low prices. Buy genuine packs from authorized retailers.
- [info] Solenoid pin lock engages at zero speed only. The supervisor must enforce this (SAF-2).

## Parts
| Category | Item | Qty | Est. cost (USD) | Price basis | Note |
|---|---|---|---|---|---|
| Control | RP2350 supervisor board | 1 | 7–15 | est | radio-equipped, e.g. Pico 2 W class |
| Power | Main fuse or DC breaker, bus-rated | 1 | 10–25 | est |  |
| Power | Main power switch, child-inaccessible | 1 | 10–30 | est | SAF-3 |
| Power | Battery state display | 1 | 5–20 | est | BAT-9 |
| Drive | Hoverboard-class hub motor, 8 in, 36 V, hall-sensored | 2 | 140–260 | listed | new |
| Drive | Metal axle clamp brackets | 2 | 20–60 | est | MEC-2 |
| Drive | Motor temperature sensor | 2 | 2–6 | est | SAF-9 |
| Control | ODrive S1 | 2 | 298–298 | listed | 12–50.5 V, brake resistor included |
| Control | ODrive S1 heat spreader plate | 2 | 24–24 | listed |  |
| Control | CAN transceiver, 3.3 V | 1 | 2–8 | est |  |
| Power | DeWalt 20V MAX 5 Ah (DCB205, 90 Wh) | 4 | 236–516 | listed | genuine only; ≤100 Wh each |
| Power | DeWalt 20V battery adapter with leads | 4 | 40–100 | est |  |
| Power | Series harness, 2 packs to 36 V | 2 | 10–30 | est |  |
| Power | DeWalt 20V charger | 1 | 30–70 | est | skip if owned |
| Power | Per-pack voltage sense divider | 1 | 1–3 | est | midpoint tap, BAT-4 |
| Power | Ideal-diode controller + MOSFETs (LM74700-class) | 2 | 20–50 | est | BAT-6 |
| Power | Bus brake / dump resistor with switch | 1 | TBD |  | included with ODrive S1 |
| Mechanical | Lift lever linkage with over-center lock | 1 | 30–100 | est | DM-3 |
| Safety | Deploy/lock interlock switch | 2 | 6–20 | est | DM-2 |
| Brake | Wheel lock, lever-on-tire | 4 | 60–160 | est | printed wheels and drive wheels |
| Brake | Push-pull solenoid, spring-engaged | 2 | 30–80 | est | 36 V |
| Brake | Indexed lock disc for wheel | 2 | 20–60 | est |  |
| Brake | Hit-and-hold solenoid/actuator driver | 1 | 5–15 | est | SAF-2a |
| Brake | Manual brake release | 1 | 10–30 | est | SAF-2c |
| Assist | IMU (pitch/roll/rate) | 1 | 5–15 | est |  |
| Assist | Bus current/voltage monitor | 1 | 5–15 | est |  |
| Input | Proportional joystick, adjustable mount | 1 | 20–150 | est | INP-4 |
| Control | Parent remote (BLE) with e-stop button | 1 | 20–60 | est |  |
| Control | Keyswitch for settings lock | 1 | 5–15 | est | CFG-3 |
| Control | Small status display | 1 | 10–25 | est | CFG-8 |

**Parts total: $1,081–$2,260** (29 of 30 lines priced; excludes shipping, tax, filament, TBD items). Prices as of Sept 2026; "listed" = seen in a US retail listing, "est." = estimate to verify.

## Verification
- [ ] Load the versioned controller config file; verify speed cap, current limits, and command timeout (ELE-2a, SAF-5).
- [ ] Hot-swap test: remove one pair while driving; bus must stay up.
- [ ] Stability in manual, powered, and transition positions (DM-8). Lever force with max occupant (DM-5).
- [ ] Add-on brakes engage on power loss and on e-stop; manual release returns safely (SAF-2b, SAF-2c).
- [ ] Brake hold on 1:12 slope, power off, max mass, in every drive mode (SAF-1, DM-7).
- [ ] Run the tip/slope test protocol before enabling above Warn (ASD-12).
- [ ] Run the power test protocol before enabling above Warn (ASD-12).
- [ ] Tip test: IMU beyond recovery angle disables drive and alerts caregiver (ASD-13, proposed).
- [ ] Unplug or fault each input device while driving: chair stops (INP-3).
- [ ] Link-loss test: turn the remote off while driving; chair stops within the set time (ATT-3).
