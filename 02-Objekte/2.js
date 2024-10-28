const person = {
    lastName: 'Riemke',
    firstName: 'Thorsten',
    write: function () {
        console.log(`Name: ${this.firstName} ${this.lastName}`)
        console.log('Name: ' + this.firstName + ' ' + this.lastName)
        console.log('Name: ', this.firstName, this.lastName)
    }
}
person.write()
person.write = function () { console.log('haha') }
person.write()