# start

follow petshop tutorial to the end

# geth
geth --datadir <datadir> init <genesis_file> the genesis file must have chain_id = 1 to match with network_id in following command
geth --port 3000 --networkid 1 --datadir blk/ --maxpeers=5 --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3"

# truffle
truffle compile
geth console> unlock, eth.defaultAccount = eth.coinbase, reduce gas limit in truffle.js if exceeds block gas limit
truffle migrate
npm run dev

## thats all
