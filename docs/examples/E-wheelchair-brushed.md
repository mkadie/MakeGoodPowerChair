<!-- Generated from configurator/index.html rules 0.4, 2026-10-14 -->
# E. Wheelchair gearmotors + RoboClaw

24 V brushed wheelchair gearmotors with integrated EM brake, RoboClaw 2x30A, 24 V 10 Ah pack.

## Configuration
- Driver mass (max): Up to 25 kg
- Friend riding along: No passenger
- Manual / power mechanism: Lever-deployed drive wheels
- Drive motors: Wheelchair gearmotor
- Motor source: New
- Drive wheel size: 8–8.5 in
- Motor controller: RoboClaw 2x30A
- Battery: 24 V Li-ion 10 Ah
- Regenerative braking: Off
- Parking brake: Motor's built-in EM brake, Manual wheel locks
- Assistive driving computer: None
- Assist features: Tip / slope monitoring, Power monitoring and range
- Assist default level: Warn only
- Ventilator: None
- Driver input: Joystick
- Supervision: E-stop remote, Attendant takeover
- Attendant link: Bluetooth LE
- Parent settings interface: Both

## Warnings
- [caution] Wheelchair gearmotors weigh about 3 kg each or more. Recheck CG, tip stability, and lift-lever force for a toddler chair.
- [info] Some vendors offer an encoder only in place of the brake. Confirm a model with both, or fit an external encoder.
- [info] 240 Wh is over 160 Wh. Airline rules allow it as an installed mobility-aid battery, but limit spares (REG-6).
- [info] Branded chair packs listed at the high end of the range; generic packs cost less but check BMS quality and airline paperwork.

## Parts
| Category | Item | Qty | Est. cost (USD) | Price basis | Note |
|---|---|---|---|---|---|
| Control | RP2350 supervisor board | 1 | 7–15 | est | radio-equipped, e.g. Pico 2 W class |
| Power | Main fuse or DC breaker, bus-rated | 1 | 10–25 | est |  |
| Power | Main power switch, child-inaccessible | 1 | 10–30 | est | SAF-3 |
| Power | Battery state display | 1 | 5–20 | est | BAT-9 |
| Drive | Wheelchair gearmotor, 24 V brushed, integrated EM brake + freewheel | 2 | 320–400 | listed | e.g. 250 W class, 17 mm keyed shaft |
| Drive | Drive wheel with keyed hub, 8 in | 2 | 80–180 | est |  |
| Drive | Motor mounting brackets | 2 | 20–60 | est |  |
| Control | Wheel/shaft encoder for closed-loop speed | 2 | 40–120 | est | ELE-2 |
| Drive | Motor temperature sensor | 2 | 2–6 | est | SAF-9 |
| Control | RoboClaw 2x30A | 1 | 135–135 | listed | 6–34 V, encoder speed control, regen |
| Power | 24 V Li-ion pack, 10 Ah (240 Wh), removable, UN38.3 docs | 1 | 270–700 | listed |  |
| Power | 24 V Li-ion charger (29.4 V) | 1 | 25–60 | est |  |
| Mechanical | Lift lever linkage with over-center lock | 1 | 30–100 | est | DM-3 |
| Safety | Deploy/lock interlock switch | 2 | 6–20 | est | DM-2 |
| Brake | Wheel lock, lever-on-tire | 2 | 30–80 | est |  |
| Assist | IMU (pitch/roll/rate) | 1 | 5–15 | est |  |
| Assist | Bus current/voltage monitor | 1 | 5–15 | est |  |
| Input | Proportional joystick, adjustable mount | 1 | 20–150 | est | INP-4 |
| Control | Parent remote (BLE) with e-stop button | 1 | 20–60 | est |  |
| Control | Keyswitch for settings lock | 1 | 5–15 | est | CFG-3 |
| Control | Small status display | 1 | 10–25 | est | CFG-8 |

**Parts total: $1,055–$2,231** (21 of 21 lines priced; excludes shipping, tax, filament, TBD items). Prices as of Sept 2026; "listed" = seen in a US retail listing, "est." = estimate to verify.

## Verification
- [ ] Load the versioned controller config file; verify speed cap, current limits, and command timeout (ELE-2a, SAF-5).
- [ ] Stability in manual, powered, and transition positions (DM-8). Lever force with max occupant (DM-5).
- [ ] Manual mode: motor brakes released or drive wheels lifted, with no drag on the printed wheels (DM-6).
- [ ] Motor EM brakes engage on power loss and e-stop; freewheel/manual release returns safely (SAF-2b, SAF-2c).
- [ ] Brake hold on 1:12 slope, power off, max mass, in every drive mode (SAF-1, DM-7).
- [ ] Run the tip/slope test protocol before enabling above Warn (ASD-12).
- [ ] Run the power test protocol before enabling above Warn (ASD-12).
- [ ] Tip test: IMU beyond recovery angle disables drive and alerts caregiver (ASD-13, proposed).
- [ ] Unplug or fault each input device while driving: chair stops (INP-3).
- [ ] Link-loss test: turn the remote off while driving; chair stops within the set time (ATT-3).
