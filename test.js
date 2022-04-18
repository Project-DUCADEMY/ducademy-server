const a = {
  b: [{ c: 1 }, { c: 2 }, { c: 3 }, { c: 4 }, { c: 5 }, { c: 6 }],
}

a.b[0].c = 2

console.log(a)
