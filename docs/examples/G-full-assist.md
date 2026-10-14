<!-- Generated from configurator/index.html rules 0.4, 2026-10-14 -->
# G. Full assist + Sip-N-Puff + buddy seat

Everything on: C plus VENTUNO Q assist (collision, drop-off, tip, power), Sip-N-Puff + joystick input, buddy seat, ventilator on own batteries.

## Configuration
- Driver mass (max): Up to 25 kg
- Friend riding along: Buddy seat
- Manual / power mechanism: Lever-deployed drive wheels
- Drive motors: Hoverboard-class hub
- Motor source: New
- Drive wheel size: 8–8.5 in
- Motor controller: VESC dual
- Battery: 4× DeWalt 5 Ah hot-swap
- Regenerative braking: Off
- Parking brake: Manual wheel locks, Solenoid pin lock
- Assistive driving computer: Arduino VENTUNO Q
- Assist features: Collision avoidance, Drop-off / stair / curb edge, Tip / slope monitoring, Power monitoring and range
- Assist default level: Warn + slow
- Ventilator: On its own batteries
- Driver input: Joystick, Sip-N-Puff
- Supervision: E-stop remote, Attendant takeover
- Attendant link: Bluetooth LE
- Parent settings interface: Both

## Warnings
- [caution] VESC clones vary widely. Specify a vetted source and bench-test each unit.
- [caution] Passenger with ventilator mounted is a parent setting, default off. Verify stability for this combination first (PAS-5).
- [info] Counterfeit DeWalt-style packs are common at low prices. Buy genuine packs from authorized retailers.
- [info] Solenoid pin lock engages at zero speed only. The supervisor must enforce this (SAF-2).
- [info] Assist is not part of the Safety Floor. The caregiver guide must state it cannot detect all hazards and may false-alarm (ASD-11).

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
| Control | Dual VESC controller, vetted unit, hall FOC | 1 | 180–260 | est | verify rating at 36 V |
| Control | CAN transceiver, 3.3 V | 1 | 2–8 | est |  |
| Power | DeWalt 20V MAX 5 Ah (DCB205, 90 Wh) | 4 | 236–516 | listed | genuine only; ≤100 Wh each |
| Power | DeWalt 20V battery adapter with leads | 4 | 40–100 | est |  |
| Power | Series harness, 2 packs to 36 V | 2 | 10–30 | est |  |
| Power | DeWalt 20V charger | 1 | 30–70 | est | skip if owned |
| Power | Per-pack voltage sense divider | 1 | 1–3 | est | midpoint tap, BAT-4 |
| Power | Ideal-diode controller + MOSFETs (LM74700-class) | 2 | 20–50 | est | BAT-6 |
| Power | Bus brake / dump resistor with switch | 1 | 10–30 | est | SAF-10 |
| Safety | Passenger seat sensor | 1 | 5–20 | est | PAS-2 |
| Safety | Passenger restraint with latch switch | 1 | 20–60 | est | PAS-3 |
| Mechanical | Metal sub-frame for buddy seat | 1 | 50–150 | est | MEC-3 |
| Mechanical | Buddy seat and guards | 1 | 50–200 | est | PAS-4, PAS-7 width |
| Mechanical | Lift lever linkage with over-center lock | 1 | 30–100 | est | DM-3 |
| Safety | Deploy/lock interlock switch | 2 | 6–20 | est | DM-2 |
| Brake | Wheel lock, lever-on-tire | 4 | 60–160 | est | printed wheels and drive wheels |
| Brake | Push-pull solenoid, spring-engaged | 2 | 30–80 | est | 36 V |
| Brake | Indexed lock disc for wheel | 2 | 20–60 | est |  |
| Brake | Hit-and-hold solenoid/actuator driver | 1 | 5–15 | est | SAF-2a |
| Brake | Manual brake release | 1 | 10–30 | est | SAF-2c |
| Assist | Arduino VENTUNO Q | 1 | 299–299 | listed | Dragonwing IQ8 + STM32H5, 3× MIPI-CSI |
| Assist | Regulated DC-DC for assist computer from 36 V bus | 1 | 15–40 | est | ASD-14 |
| Assist | Assist override switch (matched to driver input) | 1 | 25–70 | est | ASD-3 |
| Assist | Warning annunciator (tones, LEDs, haptic) | 1 | 5–20 | est | ASD-8 |
| Assist | Camera module (MIPI-CSI) | 1 | 25–60 | est | on-device processing only (ASD-9) |
| Assist | ToF/ultrasonic ranging sensor (front, rear, sides) | 4 | 40–100 | est |  |
| Assist | Downward ToF cliff sensor | 2 | 20–50 | est | front corners |
| Assist | IMU (pitch/roll/rate) | 1 | 5–15 | est |  |
| Assist | Bus current/voltage monitor | 1 | 5–15 | est |  |
| Mechanical | Ventilator mount/tray with tubing guard | 1 | 30–100 | est | VNT-8 |
| Input | Proportional joystick, adjustable mount | 1 | 20–150 | est | INP-4 |
| Input | R.O.A.R. Sip-N-Puff module | 1 | TBD |  |  |
| Control | Parent remote (BLE) with e-stop button | 1 | 20–60 | est |  |
| Control | Keyswitch for settings lock | 1 | 5–15 | est | CFG-3 |
| Control | Small status display | 1 | 10–25 | est | CFG-8 |

**Parts total: $1,533–$3,397** (41 of 42 lines priced; excludes shipping, tax, filament, TBD items). Prices as of Sept 2026; "listed" = seen in a US retail listing, "est." = estimate to verify.

## Verification
- [ ] Load the versioned controller config file; verify speed cap, current limits, and command timeout (ELE-2a, SAF-5).
- [ ] Hot-swap test: remove one pair while driving; bus must stay up.
- [ ] Brake hold, ramp climb, stability, and runtime at max combined mass (PAS-1, PAS-6, PAS-8).
- [ ] Stability in manual, powered, and transition positions (DM-8). Lever force with max occupant (DM-5).
- [ ] Add-on brakes engage on power loss and on e-stop; manual release returns safely (SAF-2b, SAF-2c).
- [ ] Brake hold on 1:12 slope, power off, max mass, in every drive mode (SAF-1, DM-7).
- [ ] Pull assist computer power while driving: limits ramp off, no abrupt stop, caregiver alerted (ASD-5).
- [ ] Driver override works with every configured input method (ASD-3).
- [ ] Run the collision test protocol before enabling above Warn (ASD-12).
- [ ] Run the drop-off test protocol before enabling above Warn (ASD-12).
- [ ] Run the tip/slope test protocol before enabling above Warn (ASD-12).
- [ ] Run the power test protocol before enabling above Warn (ASD-12).
- [ ] Tip test: IMU beyond recovery angle disables drive and alerts caregiver (ASD-13, proposed).
- [ ] Stability with ventilator mounted (VNT-9). EMC check: vent operation near motor controller (VNT-7).
- [ ] Unplug or fault each input device while driving: chair stops (INP-3).
- [ ] Link-loss test: turn the remote off while driving; chair stops within the set time (ATT-3).
