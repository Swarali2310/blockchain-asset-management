# Introduction
The contemporary system uses database as the datasource for carrying out transactions, we propose to replace the centralized databases with decentralized peer to peer blockchain network to carry out the transactions.

# Use Cases
This blockchain based asset management product can be used to carry out asset transactions like buy, sell, lease or auction properties,tangible or non tangibles. 

# Installation
1. Clone this repository and extract it to a folder lets call it BlockchainAssetManagement
2. cd to asset
3. Initialize geth "geth --datadir blockchain/ init blockchain/genesis.json"
4. Start geth 
geth --datadir <datadir> init <genesis_file> the genesis file must have chain_id = 1 to match with network_id in following command
geth --port 3000 --networkid 1 --datadir blockchain/ --maxpeers=5 --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3"
5. open a new terminal and cd to BlockchainAssetManagement
  geth attach blockchain/geth.ipc
  this is where we will type all the commands
  * personal.newAccount()  it is advised that you set a passphrase
  * miner.start(1)
  * eth.defaultAccount = eth.coinbase
  * personal.unlockAccount(eth.coinbase,"<your password>",15000)  // keeps account unlocked for 15000 seconds
6. Start a new terminal and cd to BlockchainAssetManagement
   npm install -g truffle
7. truffle compile
8. truffle migrate
9. npm run dev (for using lite server) or cd to PropertyBazaar and execute "node server.js" (for using nodejs as server)
  
# creating multi peer private blockchain network
  * this requires the nodes to use their lan IP address in --rpcaddr field when running geth 
  * run command "admin" on geth console and copy the enode
  * on the other system's geth console type "admin.addPeer(<enode copied from other system, replace [::] with the ip address of that system>)"
  * to check if the peer has been connected run admin.peers and it should show the new peer
  * dont forget to create new account if first time and start miner by miner.start(n) n is number of thready you want miner to run on
# troubleshoot
  * if you do not have enough ether to buy a property transfer some to the account in your metamask from geth command
  "eth.sendTransaction({"from":eth.coinbase,"to":<metamask account no.>,"value":10000000000000000})"
  * npm permission issues : use sudo, you may also have to execute "npm install lite-server"
  * npm install lite-server installs required node-modules to the current directory
# Windows (Instructions To Run)
  * instead of using "truffle compile" and "truffle migrate" use "truffle.cmd compile" and "truffle.cmd migrate"

# Developer note
  * All solidity codes must be edited in the BlockchainAssetManagement directory's contract dir. After making changes and executing "truffle compile" and "truffle migrate", copy the build directory so generated to the views directory in the PropertyBazaar/view not the other way round.
  * Reason for this is Truffle compile and migrate are location specific, more deatails will be published in later commits.
