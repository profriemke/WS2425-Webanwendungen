let s ="Hallo wie geht es?"
let r =''
for(let i=s.length-1; i>=0;i--){
    console.log(s[i])
    r = r+ s[i]
    console.log(i+' '+r)
}

console.log(r)