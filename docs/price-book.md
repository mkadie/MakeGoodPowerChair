# Price Book

Unit prices (USD, per item) used by the configurator. This is a rendered view of the `P` table in `configurator/index.html`; **edit the configurator, not this file**, then regenerate with `docs/tools/pricebook.js`.

Basis: `listed` = seen in a US retail listing, September 2026 · `est` = estimate, verify before relying on it · `donated` = $0 · TBD = priced by the vendor at build time.

Rule of thumb for updating: a line moves from `est` to `listed` only with a retailer URL and date noted in the commit message.

## Drive

| Key | Item | Low | High | Basis |
|---|---|---|---|---|
| `hubNew` | Hoverboard-class hub motor, new | $70 | $130 | listed |
| `hubSalv` | Hoverboard-class hub motor, salvaged | $15 | $40 | est |
| `donated` | Donated working hoverboard | $0 | $0 | donated |
| `hubDon` | Hub motors from donated hoverboard | $0 | $0 | donated |
| `axleBr` | Metal axle clamp brackets | $10 | $30 | est |
| `therm` | Motor temperature sensor | $1 | $3 | est |
| `wcBrushed` | Wheelchair gearmotor, 24 V brushed, EM brake + freewheel, new | $160 | $200 | listed |
| `wcBrushedSalv` | Wheelchair gearmotor, salvaged | $40 | $120 | est |
| `wcBldc` | Wheelchair brushless hub wheel, 24 V, EM brake, new | $250 | $450 | est |
| `wcBldcSalv` | Wheelchair brushless hub wheel, salvaged | $60 | $150 | est |
| `wcWheel` | Drive wheel with keyed hub, … in | $40 | $90 | est |

## Control

| Key | Item | Low | High | Basis |
|---|---|---|---|---|
| `rp2350` | RP2350 supervisor board | $7 | $15 | est |
| `vesc` | Dual VESC controller, vetted unit, hall FOC | $180 | $260 | est |
| `can` | CAN transceiver, 3.3 V | $2 | $8 | est |
| `odrive` | ODrive S1 | $149 | $149 | listed |
| `odHeat` | ODrive S1 heat spreader plate | $12 | $12 | listed |
| `zs` | ZS-X11H hall BLDC driver | $15 | $30 | est |
| `hbBoard` | Hoverboard mainboard (STM32F103) | $20 | $40 | est |
| `encoder` | Wheel/shaft encoder for closed-loop speed | $20 | $60 | est |
| `roboclaw` | RoboClaw 2x30A | $135 | $135 | listed |
| `sabertooth` | Sabertooth 2x32 | $125 | $125 | listed |
| `wcCtrl` | Standard wheelchair controller with joystick and brake outputs | $150 | $600 | est |
| `bleRemote` | Parent remote (BLE) with e-stop button | $20 | $60 | est |
| `rc` | 2.4 GHz RC transmitter + receiver with failsafe | $40 | $120 | est |
| `keysw` | Keyswitch for settings lock | $5 | $15 | est |
| `disp` | Small status display | $10 | $25 | est |

## Power

| Key | Item | Low | High | Basis |
|---|---|---|---|---|
| `fuse` | Main fuse or DC breaker, bus-rated | $10 | $25 | est |
| `mainsw` | Main power switch, child-inaccessible | $10 | $30 | est |
| `sense` | Per-pack voltage sense divider | $1 | $3 | est |
| `battdisp` | Battery state display | $5 | $20 | est |
| `dcb203` | DeWalt 20V MAX 2 Ah (DCB203) | $29 | $60 | listed |
| `dcb205` | DeWalt 20V MAX 5 Ah (DCB205) | $59 | $129 | listed |
| `dwAdapt` | DeWalt 20V battery adapter with leads | $10 | $25 | est |
| `dwHarn` | Series harness, 2 packs to 36 V | $5 | $15 | est |
| `dwChg` | DeWalt 20V charger | $30 | $70 | est |
| `idealD` | Ideal-diode controller + MOSFETs (LM74700-class) | $10 | $25 | est |
| `dump` | Bus brake / dump resistor with switch | $10 | $30 | est |
| `b24_6` | 24 V Li-ion pack, 6 Ah (144 Wh), removable, UN38.3 docs | $150 | $495 | listed |
| `b24_10` | 24 V Li-ion pack, 10 Ah (240 Wh), removable, UN38.3 docs | $270 | $700 | listed |
| `sla12` | 12 V SLA/AGM 12 Ah, non-spillable | $30 | $60 | est |
| `chg24` | 24 V Li-ion charger | $25 | $60 | est |
| `chgSla` | 24 V SLA charger | $25 | $50 | est |
| `dcdc` | Isolated DC-DC converter within the vent's labeled DC input range | $60 | $200 | est |
| `ventCable` | Ventilator manufacturer DC cable | TBD | TBD | vendor |
| `ventFuse` | Separate vent-feed fuse and switch | $10 | $25 | est |

## Brake

| Key | Item | Low | High | Basis |
|---|---|---|---|---|
| `wlock` | Wheel lock, lever-on-tire | $15 | $40 | est |
| `sol` | Push-pull solenoid, spring-engaged | $15 | $40 | est |
| `idxDisc` | Indexed lock disc for wheel | $10 | $30 | est |
| `emBrake` | Spring-applied, solenoid-released friction brake | $40 | $120 | est |
| `rotorAd` | Rotor/drum adapter | $15 | $40 | est |
| `caliper` | Bicycle disc caliper + rotor | $25 | $60 | est |
| `springAct` | Spring return + release actuator | $20 | $60 | est |
| `hitHold` | Brake coil driver output (hit-and-hold) | $5 | $15 | est |
| `manRel` | Manual brake release | $10 | $30 | est |

## Mechanical

| Key | Item | Low | High | Basis |
|---|---|---|---|---|
| `subframe` | Metal sub-frame for buddy seat | $50 | $150 | est |
| `buddy` | Buddy seat and guards | $50 | $200 | est |
| `hitch` | Trailer hitch, load-rated, into metal bracket | $20 | $50 | est |
| `trailer` | Passenger trailer with seat | $80 | $200 | est |
| `board` | Rear ride-on board with handle | $40 | $100 | est |
| `lever` | Lift lever linkage with over-center lock | $30 | $100 | est |
| `pod` | Power pod frame with quick-release mounts | $50 | $150 | est |
| `fricArm` | Spring-loaded friction drive arm | $20 | $60 | est |
| `ventMount` | Ventilator mount/tray with tubing guard | $30 | $100 | est |

## Safety

| Key | Item | Low | High | Basis |
|---|---|---|---|---|
| `seatSens` | Passenger seat sensor | $5 | $20 | est |
| `restraint` | Passenger restraint with latch switch | $20 | $60 | est |
| `interlock` | Deploy/lock interlock switch | $3 | $10 | est |
| `rimGuard` | Push-rim guards | $10 | $30 | est |
| `tether` | Magnetic tether kill switch with lanyard | $10 | $25 | est |

## Input

| Key | Item | Low | High | Basis |
|---|---|---|---|---|
| `joy` | Proportional joystick, adjustable mount | $20 | $150 | est |
| `adSwitch` | Driver enable switch (adapted switch) | $25 | $70 | est |
| `jack` | 3.5 mm switch jacks | $2 | $5 | est |
| `scanDisp` | Scan indicator display or LEDs | $10 | $30 | est |
| `snp` | R.O.A.R. Sip-N-Puff module | TBD | TBD | vendor |
| `head` | Head array | TBD | TBD | vendor |

## Assist

| Key | Item | Low | High | Basis |
|---|---|---|---|---|
| `ventuno` | Arduino VENTUNO Q | $299 | $299 | listed |
| `unoq` | Arduino UNO Q | $45 | $70 | est |
| `otherAI` | Sponsor assist computer | $100 | $400 | est |
| `cam` | Camera module (MIPI-CSI) | $25 | $60 | est |
| `tof` | ToF/ultrasonic ranging sensor (front, rear, sides) | $10 | $25 | est |
| `cliff` | Downward ToF cliff sensor | $10 | $25 | est |
| `imu` | IMU (pitch/roll/rate) | $5 | $15 | est |
| `pwrMon` | Bus current/voltage monitor | $5 | $15 | est |
| `annunc` | Warning annunciator (tones, LEDs, haptic) | $5 | $20 | est |
| `ovr` | Assist override switch (matched to driver input) | $25 | $70 | est |
| `dcdc12` | Regulated DC-DC for assist computer from … V bus | $15 | $40 | est |

## Tools

| Key | Item | Low | High | Basis |
|---|---|---|---|---|
| `teardownTools` | Teardown tools (driver bits, wire cutters, heat shrink) | $0 | $20 | est |
| `inspect` | Incoming inspection: hall/encoder tester, milliohm meter, insulation check | $30 | $80 | est |
| `stlink` | ST-Link programmer | $10 | $25 | est |

## Coverage

88 price-book entries: 11 listed, 72 estimated, 2 donated, 3 TBD. Priority for verification: the `est` lines with the largest high values (VESC, wheelchair controller, 24 V packs, EM brakes, buddy-seat sub-frame).
