let verdopple = function (a){
    return a*2
}
let verdreifache = function (a){
    return a*3
}

let vervierfache = (a) =>{
    return a*4
}

function berechne(x, funktion){
    return funktion(x)
}


console.log(berechne(2, verdopple))
console.log(berechne(2, verdreifache))