// Sheath Math engine: the 4 by 8 ft sheets a wall takes, the nails a sheet takes at an edge and field spacing, the boxes of nails, and the cost. Exact integers, half-up on display only. Named constants: a sheet is 4 by 8 ft (32 sq ft, 288 inches round the edge), with 2 interior framing lines of 96 inches. Every other number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _HGT = "the wall height must be from 1 to 240 inches with no decimal places";
var _AREA = "the wall area must be from 1 to 1000000 sq ft with no decimal places";
var _SP = "the spacing must be from 1 to 48 inches with no decimal places";
var _NS = "the sheet count must be from 1 to 100000 with no decimal places";
var _NN = "the nail count must be from 1 to 100000000 with no decimal places";
var _BOX = "the nails a box must be from 1 to 100000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function sheetsTruth(area) {
  var a = _i(area, _AREA, 7, 1, 1000000);
  var n = Math.floor((a + 31) / 32), spare = n * 32 - a;
  return "The " + a + " sq ft of wall in 4 by 8 ft sheets takes " + _pl(n, " sheet", " sheets") + ", leaving " + spare + " sq ft.";
}
function nailsTruth(sheets, edge, field) {
  var n = _i(sheets, _NS, 6, 1, 100000), e = _i(edge, _SP, 2, 1, 48), f = _i(field, _SP, 2, 1, 48);
  var per = Math.floor((288 + e - 1) / e) + 2 * Math.floor((96 + f - 1) / f);
  return "The " + _pl(n, " sheet", " sheets") + " at " + e + " inches on the edge and " + f + " inches in the field take " + per + " nails a sheet, " + n * per + " nails in all.";
}
function boxesTruth(nails, perbox, price, sheets) {
  var n = _i(nails, _NN, 9, 1, 100000000), b = _i(perbox, _BOX, 6, 1, 100000), p = _p(price, _PRICE, 5, 2, 1, 1000000), s = _i(sheets, _NS, 6, 1, 100000);
  var k = Math.floor((n + b - 1) / b), left = k * b - n, cents = k * p;
  return "The " + n + " nails in boxes of " + b + " take " + _pl(k, " box", " boxes") + ", leaving " + left + " nails, and cost $" + _money(cents) + ", or $" + _money(_hu(cents, s)) + " a sheet over the " + s + ".";
}
function costTruth(sheets, price) {
  var n = _i(sheets, _NS, 6, 1, 100000), p = _p(price, _PRICE, 5, 2, 1, 1000000);
  return "The " + _pl(n, " sheet", " sheets") + " at $" + _dec(p, 2) + " cost $" + _money(n * p) + ".";
}
