# Findings and How We Got There

Working record of what the design study has established so far, what it rests on, and what is still open. Companion to `decision-matrix.md` (the options), `price-matrix.md` (the numbers), and the configurator (the rules). Written for James / MakeGood as the handoff document; corrections welcome.

Dates: study ran 2026-09-30 → 2026-10-13. Prices are September 2026 US retail.

## 1. Method

The study went: **requirements → option survey → rules engine → cost model**, and each step is traceable.

1. **Requirements first.** Everything started from a numbered requirements doc (`MakeGoodPowerChairRequirements.md`, v0.1 → v0.10). Every requirement is tagged SHALL / SHOULD / MAY and has an ID (DRV-2a, SAF-1, VNT-3…). Options were only admitted if they could be mapped to requirement IDs.
2. **Option survey.** For each subsystem we listed the candidates a volunteer builder could actually buy or salvage in the US, and recorded for each: what it costs, what it needs to work, and which requirements it fails. Sources were vendor datasheets and product pages, the EFeru hoverboard FOC firmware docs (for hoverboard motor characteristics), ODrive's published hoverboard setup guide, and hands-on EV/BMS experience from prior projects (four world-record EVs, an FDA-certified wheelchair BMS).
3. **Rules engine.** The option interactions were encoded as rules in the configurator: *this option requires that one*, *this combination is blocked*, *this combination needs a caution*. That forced every "it depends" into an explicit, testable statement. The engine is ~300 lines of plain JavaScript in `configurator/index.html`; anyone can read the rules.
4. **Cost model.** Every part has a low/high price and a **basis tag**: `listed` (seen in a US retail listing, Sept 2026), `est.` (our estimate, needs verification), or `donated`. Totals are honest ranges, not point values, and the tool reports how many lines are priced vs TBD.
5. **Verification checklist.** Each selected option contributes test steps to a checklist, keyed to requirement IDs, so the build sheet doubles as an acceptance test plan.

What this method does *not* do: no parts have been bought or bench-tested yet. Every `est.` price and every "verify" note is a real to-do. See §6.

## 2. What we established

### 2.1 Two viable motor families, two bus voltages

- **Hoverboard-class hub motors** (36 V brushless, hall-sensored, 6.5/8/10 in). Cheap ($70–130/pair new, $0 donated), no gearbox, no built-in brake. Need a brushless FOC controller with hall support.
- **Standard wheelchair motors** (24 V). Brushed gearmotors with integrated EM parking brake and freewheel lever (~$160–200 listed, ~3 kg each), or brushless hub wheels with EM brake (~$250–450 est., ~7 kg each).

The choice drives everything downstream: bus voltage, controller family, battery family, brake strategy. The configurator greys out incompatible options rather than letting a builder discover the mismatch after ordering.

**Weight matters more than usual.** The TMT is a toddler chair. Wheelchair motors add 6–14 kg of drive hardware. Every wheelchair-motor configuration carries a caution to re-check CG, tip stability, and lift-lever force.

### 2.2 Donated hoverboards are a legitimate motor source

A working donated hoverboard yields a matched motor pair for $0. The findings that make this safe rather than sketchy:

- **Test before teardown.** Power it up, confirm both wheels drive smoothly both directions, no grinding, no hall faults. Record make/model and UL 2272 status.
- **Incoming inspection after teardown** (DRV-2a/2d): bearings, all 6 hall states, matched phase resistance L/R, insulation, tire, axle flats.
- **The hoverboard's own battery is not reused** by default. Age and cell quality are unknown. If considered at all: UL 2272 label, capacity test, BMS check. Otherwise it goes to battery recycling.
- **The hoverboard's mainboard is replaced.** Reflashing it (EFeru FOC) works but violates the no-reflash principle; it's kept as a documented alternate for people who already have the ST-Link and the skills.

### 2.3 Motor controller: no reflashing, closed loop, watchdog

Requirements that fell out of the survey (ELE-1/2): configuration-only (no custom firmware), closed-loop speed control (so the chair can't run away downhill), current limits, command-loss watchdog, regen/brake-resistor handling, fault reporting, and a versioned config file so volunteer builds are reproducible.

| Controller | Verdict | Why |
|---|---|---|
| VESC dual | Default for 36 V | FOC + halls, open tooling, config exports from VESC Tool. **Clone quality varies widely** — specify vetted units, bench-test each. |
| 2× ODrive S1 | Strong alternate | Listed $149 each, 12–50.5 V, 40 A cont. with heat spreader, CAN/UART/PWM/analog, brake resistor in box, publishes a hoverboard setup guide, calibration tolerant of phase/hall wiring order. **Caveat:** at 42 V (full 10S) there is only ~8 V headroom to the 50.5 V trip, so brake resistors stay fitted even with regen off. |
| RoboClaw 2x30A | Default for brushed 24 V | Listed $135, 6–34 V, encoder speed loop, regen. |
| Sabertooth 2x32 | Alternate, brushed | No built-in encoder loop (needs Kangaroo add-on); ~8 week lead time when checked. |
| ZS-X11H | **Bench only** | Open-loop, no current limit, no watchdog. Blocked for a delivered chair. |
| Reflashed hoverboard board | Alternate only | Conflicts with no-reflash goal. |
| Standard wheelchair controller | Works, but | Proprietary, often needs a dealer programmer. Parent remotes, alternate inputs and profiles only work if it exposes an input the supervisor can drive (joystick emulation). |

Supervisor ↔ controller link: CAN preferred, UART acceptable, checksum + timeout required.

### 2.4 Battery: DeWalt 20V MAX pairs for 36 V, 24 V packs for wheelchair motors

- Two DeWalt 20V MAX packs in series ≈ 36 V nominal (same 10S-class bus as a hoverboard). 2 Ah = 72 Wh total, 5 Ah = 180 Wh. Packs are under 100 Wh each, so they travel as ordinary carry-on spares.
- **Hot-swap** (4× 5 Ah, 360 Wh) works with ideal-diode ORing (LM74700-class) between the two pairs. Consequence: ideal diodes block regen into the packs, so with regen on *all* regen energy goes to the dump resistor — size it accordingly.
- Counterfeit DeWalt-style packs are everywhere at low prices. Genuine only, from authorized retailers.
- 24 V chair packs: 6 Ah (144 Wh) and 10 Ah (240 Wh) listed; branded packs sit at the top of the range, generics lower but check BMS quality and UN 38.3 paperwork. 240 Wh exceeds the 160 Wh airline threshold — allowed as an installed mobility-aid battery, but spares are restricted (REG-6).
- SLA/AGM: cheap but 7–8 kg for a 12 Ah pair and not quick-change. Carried as an option, cautioned.

### 2.5 Brakes: at least one must hold with power off

SAF-1: hold on a 1:12 slope, power off, max mass, in every drive mode. Findings:

- Hoverboard hubs have no brake → an add-on is mandatory. Options: manual wheel locks (not automatic; caregiver-applied), solenoid pin lock into an indexed disc (zero-speed engage only; supervisor must enforce), spring-applied EM friction brake, or a bicycle disc caliper with spring return.
- Wheelchair motors bring their own spring-applied EM brake. With VESC/ODrive (no brake output) the coil needs a hit-and-hold driver.
- **Dual-mode gotcha:** motor brakes hold only when the drive wheels are on the ground. In lift-lever or pod configurations the printed wheels need their own locks for manual mode (DM-7).
- Any electrically-released brake needs a manual release (SAF-2c) so a dead chair can be moved.

### 2.6 Dual manual/power mechanism

Three mechanisms survived: lever-deployed drive wheels that lift the printed wheels (default), a removable power pod, and friction drive on the printed tire. Power-only is blocked — it fails the dual-mode requirement (MEC-7). Friction drive spins the push rims under power, so rim guards are required (DM-9) and wet/TPU slip has to be tested. Lift and pod need deploy/lock interlock switches and an over-center lock on the lever.

### 2.7 Supervision is a parent setting, not a design decision

This was the biggest reframing in the study. Rather than deciding whether a toddler chair *should* have a dead-man switch, the design offers hold-to-run, e-stop remote, attendant takeover, tether kill cord, driver enable switch, timed sessions, proximity limit, and fully independent — in any combination, saved as profiles (CFG-2). Each carries documented trade-offs. Only the **Safety Floor** (device-fault protections: link loss → stop, input fault → stop, brake on power loss, overtemp, overvoltage) is fixed.

Practical consequences found: remote options need a link (BLE or 2.4 GHz RC with failsafe); proximity limit needs BLE ranging, which is imprecise and must be documented as such; a phone-app settings UI needs a radio-equipped supervisor (Pico 2 W class).

### 2.8 Assistive driving is advisory and subtract-only

Assist (collision, drop-off/stair/curb, street/vehicle, tip/slope, power/range) can **warn, slow, or stop-with-override**. It never adds motion or steering. It is independent of the Safety Floor so a failed assist module cannot degrade basic safety. Override method matches the driver's own input device.

Findings: tip and power monitoring need no assist computer (IMU + bus monitor on the supervisor). Collision and drop-off can run on ranging sensors alone; vision needs a compute platform (Arduino VENTUNO Q listed at $299 with 40 TOPS NPU and 3× MIPI-CSI; UNO Q cheaper but vision capability unverified). Street/vehicle awareness should stay at Warn — stopping in a roadway can be worse than continuing. Stop-level assist with false positives gets turned off by frustrated users; tune and publish test results before delivery (ASD-12). All processing on-device (ASD-9).

### 2.9 Ventilator

Mounting is in scope. Feeding the ventilator from the chair bus is possible (isolated DC-DC in the vent's labeled input range, separate fuse and switch, traction cutoff before vent cutoff) but **FDA accessory status is unresolved (REG-2)**. Chair-fed vent is carried as "option B" with a blocking caution to resolve before publishing or delivering. No passengers with a ventilator mounted.

## 3. Cost picture

From the seven scenarios in `price-matrix.md`: a donated-hoverboard minimum build lands around **$500–$1,250** in parts; a daily-use 36 V build with hot-swap batteries and a solenoid brake around **$950–$2,200**; wheelchair-motor builds **$850–$2,200**; everything-on with vision assist and Sip-N-Puff **$1,500–$3,400**. Ranges are wide because roughly 70% of lines are still `est.`; the listed-price lines (motors, batteries, ODrive, RoboClaw, VENTUNO Q) are the anchors.

Biggest cost levers, in order: motor source (donated vs new vs wheelchair), battery capacity, assist compute, controller.

## 4. What changed our minds during the study

- The project brief listed "maybe bike parts, maybe hoverboard parts." The e-bike route was not developed in this study: hoverboard hubs cover the same small-wheel niche at lower cost with a 36 V bus the DeWalt pairs already match, and typical e-bike controllers lack the watchdog and closed-loop speed behaviour ELE-2 requires. Worth a short revisit if a builder has e-bike parts on hand.
- Started assuming we'd pick a supervision scheme; ended with the parent-choice model.
- Started with reflashed hoverboard boards as the cheap path; demoted to alternate once "reproducible by volunteers" became a hard requirement.
- Added wheelchair motors as a full family after realising some builders will prefer wheelchair-rated parts with integrated brakes over the hoverboard route, despite the weight.

## 5. Open items (ordered by how much they block)

1. **Regulatory position** — trainer/DIY vs FDA Class II powered wheelchair (21 CFR 890.3860). Shapes licensing, documentation, and whether chair-fed ventilator is offered at all.
2. **Bench test VESC dual vs 2× ODrive S1** on real hoverboard hubs at chair loads. Decides the 36 V default.
3. **Catalog hoverboard motor variants** — wheel size, axle diameter/flat, pole pairs, hall connector — so the axle clamp either covers all of them or the BOM locks to one.
4. Verify every `est.` price; move to `listed` or drop.
5. Lift-lever mechanism design and lever-force measurement with a 25 kg occupant.
6. License for public release.

## 6. Confidence

High: motor families, controller requirements, battery families, brake requirements, the parent-choice supervision model, the subtract-only assist model. These rest on datasheets, published guides, and prior BMS/EV work.

Medium: specific controller recommendations (VESC vs ODrive) — datasheet-level only, no bench time yet.

Low: `est.` prices, hoverboard axle variant coverage, lever-force numbers, anything marked "verify" in the configurator.
