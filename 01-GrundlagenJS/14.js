let a = [2, 7, 3]
function double(x) {
    return x * 2
}
function triple(x) {
    return x * 3
}
function multifyArray(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = fn(arr[i])
    }
    return arr
}
console.log(multifyArray(a, double))
console.log(multifyArray(a, triple))