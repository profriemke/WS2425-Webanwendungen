let patienten = []

patienten.push('Anna')
console.log(patienten)
patienten.push('Horst')
console.log(patienten)

console.log(patienten.shift())

patienten.push('Svenja')
console.log(patienten)
patienten.push('Malte')
console.log(patienten)

for(let [index, patient] of patienten){
    console.log(index+'. Patient: '+patient)
}
for (let [index, patient] of patienten.entries()) {
    console.log(index + '. Patient: ' + patient);
}