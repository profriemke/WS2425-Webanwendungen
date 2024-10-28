const Database = require('better-sqlite3')

const db = new Database('kunde.sqlite')

const getAllKunden = db.prepare('SELECT * FROM kunde WHERE vorname=?')

const kunden = getAllKunden.all('Takuma')

console.log(kunden)

db.close()