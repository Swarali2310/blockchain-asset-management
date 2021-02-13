Admin = {
    web3Provider: null,
    web3: null,
    coinbase:null,
    coinbase_balance:null,
    init:function(){
        //Admin.web3Provider = web3.currentProvider;

        Admin.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');

       //Admin.web3Provider = new Web3.providers.HttpProvider('http://192.168.43.58:8545');

        Admin.web3 = new Web3(Admin.web3Provider);
        //var admin_console = $('disp');
        console.log(Admin.web3);
        Admin.coinbase = Admin.web3.eth.coinbase
        Admin.coinbase_balance = Admin.web3.eth.getBalance(Admin.coinbase);
        document.getElementById('coinbase').innerText = Admin.web3.eth.coinbase;
        document.getElementById('coinbase_balance').innerText = Admin.coinbase_balance;
        document.getElementById('peers').innerText = Admin.web3.net.peerCount;
        document.getElementById('currblock').innerText= Admin.web3.eth.blockNumber;
    }

}


function getBlock(){
    //alert("hi")
    var block_no = document.getElementById('block_no').value;
    var block_container = document.getElementById('block').innerHTML;
    var block = Admin.web3.eth.getBlock(block_no);
    var tx = Admin.web3.eth.getTransactionFromBlock(block.number,block_no);	
    document.getElementById('block').innerHTML = "Number : " + block.number +'<br>';
    document.getElementById('block').innerHTML += "Difficulty : " + block.difficulty +'<br>';
    document.getElementById('block').innerHTML += "Extra Data : " + block.extraData +'<br>';
    document.getElementById('block').innerHTML += "Hash : " + block.hash +'<br>';
    document.getElementById('block').innerHTML += "Parent Hash : " + block.parentHash +'<br>';
    document.getElementById('block').innerHTML += "Miner : " + block.miner +'<br>';
    document.getElementById('block').innerHTML += "Transactions : " + block.transactions +'<br>';
    document.getElementById('block').innerHTML += "Timestamp : " + block.timestamp +'<br>';
    document.getElementById('block').innerHTML += "Size : " + block.size +'<br>';

	console.log(tx);
    //document.getElementById('blockno').innerHTML = Admin.web3.eth.getBlockNumber();
console.log(Admin.web3.eth.getBlockNumber())
    console.log(Admin.web3.eth.getBlock(block_no)); 
}

$(function() {
    $(window).load(function() {
      Admin.init();
    });
  });
