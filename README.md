# Sheath Math

Wall sheathing arithmetic. The 400 sq ft of wall in 4 by 8 ft sheets takes 13 sheets, leaving 16 sq ft.

## Named constants

A sheet is 4 by 8 ft: 32 sq ft, 288 inches round the edge, and it crosses 2 interior framing lines of 96 inches each.

## What it computes

- **The sheets truth** - sheets: the wall area (1 to 1000000 sq ft) divided by 32, rounded up, with the square feet left.
- **The nails truth** - nails a sheet: 288 over the edge spacing plus 2 times 96 over the field spacing (1 to 48 inches each), each rounded up, times the sheets (1 to 100000).
- **The boxes truth** - boxes: the nails divided by the nails a box (1 to 100000), rounded up, the nails left, the cost at the box price and the cost a sheet.
- **The cost truth** - cost: the sheets at their price (0.01 to 10000 dollars).

## Boundary

Arithmetic only. Counting applied as written. It has not seen any wall and does not know the local code, the nailing schedule, the framing or any engineered shear requirement, and it gives no verdict that a wall is built to code or will hold. Every other number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/sheathmath/
Repo: https://github.com/iLanis-agent/sheathmath
