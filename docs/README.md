# docs/

| File | What it is | Source of truth? |
|---|---|---|
| `findings.md` | What the study established, how, what changed, what's open | Hand-written — start here |
| `MakeGoodPowerChairRequirements.md` | Numbered requirements (SHALL/SHOULD/MAY) | Hand-written |
| `decision-matrix.md` | Options per subsystem with trade-offs | Hand-written |
| `regulatory-notes.md` | FDA / ISO / airline flags | Hand-written |
| `configurator-guide.md` | How to use and extend the configurator | Hand-written |
| `price-matrix.md` | Cost ranges for 7 named configurations | **Generated** by `tools/run-scenarios.js` |
| `price-book.md` | Unit prices and their basis | **Generated** by `tools/pricebook.js` from `configurator/index.html` |
| `examples/*.md` | Full build sheets (config, warnings, parts, checklist) per configuration | **Generated** by `tools/run-scenarios.js` |

Don't edit generated files by hand — change the configurator and rerun the scripts from the repo root:

```bash
node docs/tools/run-scenarios.js
node docs/tools/pricebook.js
```
