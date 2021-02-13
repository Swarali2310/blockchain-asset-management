module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "192.168.43.164",
      port: 8545,
      network_id: "1", // Match any network id
      gas: 2001952
    }
  }
};

//geth --port 3000 --networkid 1 --datadir blk/ --maxpeers=5 --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3"

