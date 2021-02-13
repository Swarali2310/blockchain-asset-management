function sayHi(){
console.log("All account ------") 
console.log(personal.listAccounts)
console.log("------------------")

console.log("coinbase account ------") 
console.log(eth.coinbase)
console.log("---------------------")

console.log("All account ------") 
console.log(personal.listAccounts)
console.log("-------------------")

console.log("Unlocking coinbase ------") 
console.log(personal.unlockAccount(eth.coinbase,"",0))
console.log("-------------------")


console.log("Setting default account to coinbase ------") 
console.log(eth.defaultAccount = eth.coinbase)
console.log("-------------------")

miner.start(1)

}

sayHi()