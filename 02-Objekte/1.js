const person = new Object()

person.vorname = 'Horst'
person.alter = 8
person.schuh = 48


console.log(person.vorname)

const mitarbeiter = {
    vorname: 'Lydia',
    nachname: 'Meier',
    position: 'Vorstand',
    ausgabe: function () {
        console.log(this.vorname + this.nachname + this.position)
    }
}

console.log(mitarbeiter.vorname)
ausgabe(mitarbeiter)
mitarbeiter.ausgabe()



function ausgabe({ nachname, position }) {
    console.log('Nachname: ' + nachname + ' Position: ' + position)
}