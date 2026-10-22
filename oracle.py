import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def sheets(a):
    n = -(-a//32)
    return f"The {a} sq ft of wall in 4 by 8 ft sheets takes {pl(n,' sheet',' sheets')}, leaving {n*32-a} sq ft."
def nails(n, e, f):
    per = -(-288//e) + 2*(-(-96//f))
    return f"The {pl(n,' sheet',' sheets')} at {e} inches on the edge and {f} inches in the field take {per} nails a sheet, {n*per} nails in all."
def boxes(n, b, p, s):
    k = -(-n//b); c = k*p
    return f"The {n} nails in boxes of {b} take {pl(k,' box',' boxes')}, leaving {k*b-n} nails, and cost ${money(c)}, or ${money(hu(c,s))} a sheet over the {s}."
def cost(n, p):
    return f"The {pl(n,' sheet',' sheets')} at ${dec(p)} cost ${money(n*p)}."
random.seed(760)
R=random.randint
cases = [
 dict(fn="sheets", args=["400"], expect=sheets(400)),
 dict(fn="nails", args=["13","6","12"], expect=nails(13,6,12)),
 dict(fn="boxes", args=["832","500","12.50","13"], expect=boxes(832,500,1250,13)),
 dict(fn="cost", args=["13","28.50"], expect=cost(13,2850)),
]
for _ in range(25):
    a=R(1,1000000); cases.append(dict(fn="sheets", args=[str(a)], expect=sheets(a)))
for _ in range(25):
    n,e,f=R(1,100000),R(1,48),R(1,48); cases.append(dict(fn="nails", args=[str(n),str(e),str(f)], expect=nails(n,e,f)))
for _ in range(20):
    n,b,p,s=R(1,100000000),R(1,100000),R(1,1000000),R(1,100000); cases.append(dict(fn="boxes", args=[str(n),str(b),dec(p),str(s)], expect=boxes(n,b,p,s)))
for _ in range(15):
    n,p=R(1,100000),R(1,1000000); cases.append(dict(fn="cost", args=[str(n),dec(p)], expect=cost(n,p)))
errs=[["sheets",["0"]],["sheets",["1000001"]],["nails",["0","6","12"]],["nails",["13","0","12"]],["nails",["13","6","0"]],["nails",["13","49","12"]],
 ["boxes",["0","500","12.50","13"]],["boxes",["832","0","12.50","13"]],["boxes",["832","500","0","13"]],["boxes",["832","500","12.50","0"]],["cost",["0","28.50"]],["cost",["13","0"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
