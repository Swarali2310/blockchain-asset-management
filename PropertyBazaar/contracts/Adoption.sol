pragma solidity ^0.4.17;

contract Adoption {
 // uint i=0;
   
   mapping(uint=>address) public pid_to_address_map;
   mapping(uint=>uint) public prop_id_to_contract_end;
   mapping(uint=>bool) public pid_to_rented_map;
   //mapping(uint=>address) public pid_to_old_owner;
   mapping(uint=>address[]) public chain_of_custody;
   mapping(address=>uint[]) public account_to_pid_map;
   mapping(uint=>uint) public auction_amount;
   mapping(uint=>address) public auction_owner;
   mapping(address=>uint) public bidding_price_map;
   mapping(uint=>uint[]) public bid_prices;
   mapping(uint=>address[]) public bid_account;

   mapping(uint=>bool) public is_auctioned;
   //mapping(uint=>mapping(address=>uint)) public pid_to_account_to_price_map;

   struct Name  //rename it as User_info
   {
    string fname;
    string lname;
    uint amount;
   }

/*   struct User_info
   {
    string fname;
    string lname;
    string amount;
   }*/

   mapping(address=>Name) public account_to_user_name;  //for showing name with account number in chain of custody
  // mapping(uint=>uint) public pid_to_noOfOwners;

   //event checkLease(uint prop_id,uint indexed contract_end);
  
function addProperty(address owner, uint propid,string first_name,string last_name,uint amt) public {
        if(pid_to_address_map[propid] == 0x0000000000000000000000000000000000000000){
            pid_to_address_map[propid]=owner;
            chain_of_custody[propid].push(owner);
            var info=account_to_user_name[owner];
            info.fname=first_name;
            info.lname=last_name;
            info.amount=amt;
            account_to_pid_map[owner].push(propid);
           // pid_to_noOfOwners[propid]=1;
            //address_to_pid_map[owner]=propid;
            //return (account_to_user_name[owner].fname,account_to_user_name[owner].lname);
           
        }
        
    }

function getAuctioned(uint prop_id) public view returns (uint,bool)
{
  return (prop_id,is_auctioned[prop_id]);
}

function getList(uint prop_id) public view returns (uint[],address[])
{
  return (bid_prices[prop_id],bid_account[prop_id]);
}
function getBidAmount(address acc) public view returns (uint)
{
  return bidding_price_map[acc];
}


function getAuctionPrice(uint propid) public view returns (uint)
{
  return auction_amount[propid];
}

function getAuctionWinner(uint propid) public view returns (address)
{
  return auction_owner[propid];
}

function getProperties(address addr) public view returns (uint[])
{
  return account_to_pid_map[addr];
}

function getUserFirstName(address addr) public view returns (string,string,uint,address)
{
  return (account_to_user_name[addr].fname,account_to_user_name[addr].lname,account_to_user_name[addr].amount,addr);
}


function getAddress(uint prop_id) public view returns (address)
{
  return pid_to_address_map[prop_id];
}

function getRented(uint prop_id) public view returns (bool)
{
  return pid_to_rented_map[prop_id];
}


function getChainOfCustody(uint prop_id) public view returns (address[])
{
  return (chain_of_custody[prop_id]);
}

/*function getCount(uint prop_id) public view returns(uint length) {
    return chain_of_custody[prop_id].length;
  }*/



function buyProperty(address owner, address buyer, uint propid) public payable returns (bool) {

        uint temp;
        if(pid_to_address_map[propid] == owner)
        {
            owner.transfer(msg.value);
            pid_to_address_map[propid] = buyer;
            chain_of_custody[propid].push(buyer);
            account_to_pid_map[buyer].push(propid);
            for(uint j=0;j<account_to_pid_map[owner].length;j++)
            {
              if(account_to_pid_map[owner][j]==propid)
              {
                temp=j;
              }
            }

            for(uint i=temp;i<account_to_pid_map[owner].length-1;i++)
            {
              account_to_pid_map[owner][i]=account_to_pid_map[owner][i+1];
            }

            delete account_to_pid_map[owner][account_to_pid_map[owner].length-1];
            account_to_pid_map[owner].length--;
            //pid_to_noOfOwners[propid]++;
            //checkLease(propid,pid_to_address_map[propid]);
            return true;
        }

        return false;
    }


function leasePropertyStart(address owner,address renter,uint prop_id,uint years_after,uint weeks_after,uint days_after) public returns (uint)
        {
          
            

            if(pid_to_address_map[prop_id]==owner)
            {
                if(pid_to_rented_map[prop_id]==false)
                  {
                   prop_id_to_contract_end[prop_id]=now + years_after* 1 hours + weeks_after * 1 minutes + days_after * 1 seconds;
                   //contract_end=now + years_after* 1 years + weeks_after * 1 weeks + days_after * 1 days;
                    if(now<=prop_id_to_contract_end[prop_id])
                    {
                        //pid_to_old_owner[prop_id]=owner;
                        pid_to_address_map[prop_id]=renter;
                        pid_to_rented_map[prop_id]=true;
                        chain_of_custody[prop_id].push(renter);
                        //pid_to_noOfOwners[prop_id]++;
                    }
                }
            }

            
            
            //checkLease(prop_id,prop_id_to_contract_end[prop_id]);
            
    }


    function leasePropertyEnd(address owner,/*address renter,*/uint prop_id) public
    {
      /*if(pid_to_address_map[prop_id]==renter && now>prop_id_to_contract_end[prop_id])
            {*/
                //pid_to_old_owner[prop_id]=0x0000000000000000000000000000000000000000;
                pid_to_address_map[prop_id]=owner;
                pid_to_rented_map[prop_id]=false;
                chain_of_custody[prop_id].push(owner);
/*                pid_to_noOfOwners[prop_id]--;
                delete chain_of_custody[prop_id][pid_to_noOfOwners[prop_id]];*/
        
            /*}*/
            
            
    }

function startAuction(uint prop_id) public
{
  is_auctioned[prop_id]=true;
}

function auction(address account,uint prop_id,uint price) public 
{

  //is_auctioned[prop_id]=true;
  uint base_amount=account_to_user_name[account].amount;  //the amount the sender expects for the property while registering
  if(price>=base_amount)
  {
    bidding_price_map[account]=price;
    bid_prices[prop_id].push(price);
    bid_account[prop_id].push(account);
   // pid_to_account_to_price_map[prop_id][account]=price;
    if(price>auction_amount[prop_id])
    {
      auction_amount[prop_id]=price;
      auction_owner[prop_id]=account;
    }
  }   
  
}

function endAuction(uint prop_id,address account) public
{
  address owner=pid_to_address_map[prop_id];
  buyProperty(owner,account,prop_id);
  is_auctioned[prop_id]=false;
}


}
