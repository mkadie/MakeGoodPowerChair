# Build Decision Matrix

Pre-purchase decisions a builder makes before ordering parts. Each row is a choice; the configurator (`/configurator`) encodes the same choices and resolves them into a parts list with pricing. This doc is the human-readable record of *why* each option exists and what it trades off.

Status: **DRAFT.** Options listed are candidates, not endorsements. Cost figures are order-of-magnitude placeholders until the BOM is validated.

Legend: ✅ recommended default · ⚠️ caution / needs verification · ⛔ blocking combination

---

## 1. Drive motors

| Option | Pros | Cons | Notes |
|---|---|---|---|
| Donated hoverboard hubs (teardown) | $0, abundant, built-in tire | Variable quality; axle/hall variants; must pass incoming inspection | Controller always replaced. See inspection checklist below. |
| New hoverboard-class hubs | Known-good, consistent | ~$40–80/pair | Specify one axle variant in BOM |
| Standard 24 V wheelchair motors (gearmotor + wheel) | Integrated brake, wheelchair-rated, proven | Heavier, pricier, larger | Pairs naturally with standard wheelchair controllers |

**Teardown incoming inspection:** bearings free/no play · all 6 hall states valid · matched phase resistance L/R · insulation check · tire condition · axle flats undamaged. Recalibrate controller after any motor swap.

## 2. Motor controller

Requirements: configuration-only (no reflashing) · closed-loop speed control (no downhill runaway) · current limits · command-loss watchdog · brake resistor / regen handling · fault reporting · versioned config file.

| Option | Fit | Notes |
|---|---|---|
| VESC dual | ✅ best open-source fit | FOC with halls; config exports from VESC Tool. Clone quality varies — specify vetted units. |
| ODrive S1 ×2 | ✅ | 12–50.5 V, 40 A cont. w/ heat spreader; USB/UART/CAN/PWM/analog; ships brake resistor; publishes hoverboard setup guide. ⚠️ At 42 V full charge only ~8 V headroom to trip — brake resistor mandatory. |
| RoboClaw | ✅ | Simple, robust, well documented |
| Sabertooth | ⚠️ | Brushed-oriented; limited for hub motors |
| Reflashed hoverboard board (EFeru FOC) | ⚠️ | Cheap but violates no-reflash rule; not reproducible for volunteers |
| Standard wheelchair controller | ✅ with wheelchair motors | ⛔ with hoverboard hubs (brushless mismatch) |

Supervisor ↔ controller interface: CAN preferred, UART acceptable; checksum + timeout required.

## 3. Battery

| Option | Pros | Cons |
|---|---|---|
| DeWalt 20V MAX packs (hot-swap pair) | Ubiquitous, cheap, parents already own them, airline-friendly sizes | Needs adapter + ideal-diode ORing for hot swap; 18 V nominal limits top speed |
| Airline-allowed power banks | Travel-friendly | Current limits usually too low for drive — ⚠️ verify |
| 24 V chair pack | Right voltage, wheelchair-rated | Heavier, not quick-swap by default |
| Custom pack + BMS | Fits exactly | Build complexity; ⚠️ FDA/UN 38.3 implications |

⛔ Shared battery with a ventilator: see `regulatory-notes.md` before choosing.

## 4. Parking brake

| Option | Notes |
|---|---|
| Manual wheel lock (TMT style) | Simplest; child/parent operated |
| Solenoid pin lock | Electrically released; fails-locked |
| Spring-applied EM brake | Wheelchair standard; fails-locked; power to release |
| Integrated wheelchair-motor brake | Comes with option 1c motors |

Safety Floor rule: loss of power SHALL NOT release a brake on a slope.

## 5. Manual ↔ power mechanism

| Option | Notes |
|---|---|
| Lever-deployed hub motors lifting printed wheels | Both modes on one frame; mechanical complexity |
| Removable power pod | Clean separation; needs quick-connect |
| Friction drive on printed wheels | Cheapest; wear and wet-performance concerns |

## 6. Passenger / buddy riding

Trailer · buddy seat · standing board · shared-play modes. ⛔ No passengers when a ventilator is mounted.

## 7. Supervision mode (parent-selected)

Dead-man switch · wired/wireless e-stop · tether · timed sessions · speed cap · attendant remote with kill switch · geofence (with assist). Each is a *configuration*, documented with trade-offs. Only the Safety Floor (device-fault protections) is fixed.

## 8. AI assist (optional, advisory)

Collision · drop-off/stair · street/vehicle · tip · power monitoring. Subtract-only: warn → slow → stop-with-override. Override method matches the driver's own input device. Candidate platforms: Arduino UNO Q / VENTUNO Q, or sponsor hardware.

---

## Open decisions

- [ ] Lock BOM to one hoverboard axle variant, or design mount for all known variants
- [ ] Bench-test VESC dual vs 2× ODrive S1 on hoverboard hubs at chair loads
- [ ] Catalog hoverboard motor variants (wheel size, axle, pole pairs, hall connector)
- [ ] Settle regulatory position (trainer / DIY vs. FDA Class II powered wheelchair, 21 CFR 890.3860)
- [ ] License selection for public release
