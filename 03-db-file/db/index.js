const Database = require('better-sqlite3')

const db = new Database('kunde.sqlite')

const getAllKunden = db.prepare('SELECT * FROM kunde WHERE vorname=?')

let kunden = getAllKunden.all('Takuma')

console.log(kunden)

kunden = getAllKunden.all('Palina')
console.log(kunden)
//console.log(kunden[0].automarke)

db.close()