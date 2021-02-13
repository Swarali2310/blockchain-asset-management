Admin = {
    web3Provider: null,
    web3: null,
    coinbase:null,
    coinbase_balance:null,
    is_mining:false,
    init:function(){
        //Admin.web3Provider = web3.currentProvider;


        Admin.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');

        Admin.web3 = new Web3(Admin.web3Provider);
        //var admin_console = $('disp');
        console.log(Admin.web3);
        Admin.coinbase = Admin.web3.eth.coinbase;
        Admin.coinbase_balance = Admin.web3.eth.getBalance(Admin.coinbase);
        Admin.is_mining=Admin.web3.eth.mining;
        document.getElementById('coinbase').innerText = Admin.web3.eth.coinbase;
        document.getElementById('coinbase_balance').innerText = Admin.coinbase_balance;
        document.getElementById('is_mining').innerText = Admin.is_mining;
        document.getElementById('peers').innerText = Admin.web3.net.peerCount;
        document.getElementById('currblock').innerText= Admin.web3.eth.blockNumber;
    }

}


function getBlock(){
    //alert("hi")
    var block_no = document.getElementById('block_no').value;
    var block = Admin.web3.eth.getBlock(block_no);
    var trans_count=Admin.web3.eth.getBlockTransactionCount(block_no);
    document.getElementById('block').innerHTML = "Number : " + block.number +'<br>';
    document.getElementById('block').innerHTML += "Hash : " + block.hash +'<br>';
    document.getElementById('block').innerHTML += "Miner : " + block.miner +'<br>';
    document.getElementById('block').innerHTML += "Size : " + block.size +'<br>';
    document.getElementById('block').innerHTML += "Transaction Count : " + trans_count +'<br>';
    if(trans_count!=0)
    {
        document.getElementById('block').innerHTML += "<br><b>Transaction Data</b>"+'<br><br>';   
        var trans_details=Admin.web3.eth.getTransaction(block.transactions[0]);
        document.getElementById('block').innerHTML += "Transaction index in block : " + trans_details.transactionIndex +'<br>';
        document.getElementById('block').innerHTML += "from : " + trans_details.from +'<br>';
        document.getElementById('block').innerHTML += "to : " + trans_details.to +'<br>';
        var len=trans_details.input.length;
        document.getElementById('block').innerHTML += "input : " + trans_details.input.substring(len-8,len) +'<br>';
    }
    
    
    //document.getElementById('block').innerHTML += "Difficulty : " + block.difficulty +'<br>';
    //document.getElementById('block').innerHTML += "Extra Data : " + block.extraData +'<br>';
    
    //document.getElementById('block').innerHTML += "Parent Hash : " + block.parentHash +'<br>';
    
    
    //document.getElementById('block').innerHTML += "Timestamp : " + block.timestamp +'<br>';
    

	
    //document.getElementById('blockno').innerHTML = Admin.web3.eth.getBlockNumber();
/*console.log(Admin.web3.eth.getBlockNumber())
    console.log(Admin.web3.eth.getBlock(block_no)); */
}

$(function() {
    $(window).load(function() {
      Admin.init();
    });
  });
//check for blocknumber 7236