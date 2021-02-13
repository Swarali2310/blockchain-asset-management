App =
{
    handle: null,
    web3Provider: null,
      contracts: {},
      web3:null,
      

       initWeb3: function() 
       {
    
            // Is there an injected web3 instance?
            if (typeof web3 !== 'undefined') {
              App.web3Provider = web3.currentProvider;
            } else {
              // If no injected web3 instance is detected, fall back to Ganache
              App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
            }
            App.web3 = new Web3(App.web3Provider);


                return App.initContract();
      },

      initContract: function() 
      {
    
            $.getJSON('./contracts/Adoption.json', function(data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var AdoptionArtifact = data;
          App.contracts.Adoption = TruffleContract(AdoptionArtifact);

          // Set the provider for our contract
          App.contracts.Adoption.setProvider(App.web3Provider);

          // Use our contract to retrieve and mark the adopted pets

            App.contracts.Adoption.deployed().then(function(instance) {
    App.handle = instance;
    console.log("deployed");

 

  });
        });

    }

};

function onButtonAdd()
{
   //alert("in onButtonAdd");
    var x = "t";
    var prop_id;
    var account;
   $.getJSON('../Properties.json', function(data) 
   {
      x=data;
      prop_id=x[x.length-1].id;
    //console.log(account);
    
      /*propertyObject = data[parseInt(document.cookie)];
      console.log(propertyObject);*/
    web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            console.log(error);
          }
           account = accounts[0];
           console.log(account);
           console.log(prop_id);
           App.handle.addProperty(account,prop_id,{from: account})
                                  .then(function(result)
                                  {
                                    if(Boolean(result)==true)
                                    {
                                      App.handle.getAddress.call(prop_id)
                                      .then(function(addr){alert("The property is registered with user "+addr);})
                                    }
                                    else
                                    {
                                      App.handle.getAddress.call(prop_id)
                                      .then(function(addr){alert("The property is already registered under user "+addr);})
                                    }
                                  })
                                      

 });
    
    });


 
}


function onButtonBuy()
{
    /*var event=App.handle.checkLease();
    event.watch(function(error,result){if (!error)
        console.log(result);});*/
    var account;
    var owner=null;
    var property_id = document.getElementById("property_id").value;
    web3.eth.getAccounts(function(error, accounts) 
    {
      if (error) 
      {
        console.log(error);
      }

      account = accounts[0];
    })
	console.log(App.handle.getAddress.call(property_id));
    App.handle.getAddress.call(property_id)
      .then(function(addr)
        {
          owner=addr;
          console.log(addr);
          App.handle.buyProperty(owner,account,property_id)
            .then(function(bool)
              {
                console.log(Boolean(bool) + " transaction completed");
                App.handle.getAddress.call(property_id)
                  .then(function(addr){console.log("Property transferred to " + addr);
                                        alert("The property is transferred to "+ addr);
                                      })

              }
            )
        }
        );
}

function onButtonLease()
{
  var account,owner,timeOut;
  var prop_id = document.getElementById("property_id").value;
  var years = document.getElementById("years").value;
  var weeks = document.getElementById("weeks").value;
  var days = document.getElementById("days").value;
  timeOut=years*3600+weeks*60+days*1;
  web3.eth.getAccounts(function(error, accounts) 
    {
      if (error) 
      {
        console.log(error);
      }

      account = accounts[0];  //renter
    });

  App.handle.getAddress.call(prop_id)
      .then(function(addr)
      {
        owner=addr;
        console.log("Reaches just before the func start");
        App.handle.leasePropertyStart(owner,account,prop_id,years,weeks,days,{from:account})
            .then(function(result)
            {
               
                console.log("timeout="+timeOut);
                App.handle.getAddress.call(prop_id)
                  .then(function(addr){console.log("Property leased to "+addr);
                                      alert("Property leased to "+addr+" for a period of "+years+" years "+weeks+" weeks "+days+" days ");
                                    })

                

            })
              var checker=setTimeout(forChecker.bind(null,owner,account,prop_id),timeOut*1000);
      });

    /*var eventVar=App.handle.checkLease();
    eventVar.watch(function(error,result)
    {
      if(!error)
      {
        console.log("property id= "+result.args.prop_id);
        console.log("contract_end= "+result.args.contract_end);
        App.handle.leasePropertyEnd(owner,account,prop_id,{from:account,to:owner})
        .then(function(result)
        {
            App.handle.getAddress.call(prop_id)
                  .then(function(addr){console.log("Property with "+prop_id+" NOW belongs to "+addr);})
        })
      }
    })*/
    

}

function forChecker(owner,account,p)  
{
 //  alert("in checker");
  console.log(owner);
  console.log(account);
  console.log(p);
  /*var p=document.getElementById("prop_id_lease_prop").value;
    var owner=0xf17f52151EbEF6C7334FAD080c5704D77216b732;
    var renter=0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef;
   

   App.handle.getAddress.call(p)
      .then(function(addr)
      {
        renter=addr;
        console.log("renter="+renter);
      })

  App.handle.getOldOwner.call(p)
    .then(function(addr1)
    {
      owner=addr1;
      console.log("owner="+owner);
    })*/
  App.handle.leasePropertyEnd(owner,p)
    .then(function(result)
    {
      App.handle.getAddress.call(p)
        .then(function(addr)
        {
          console.log("Lease period expired! Property "+p+" belongs to "+addr);
          alert("Lease period expired! Property "+p+" belongs to "+addr)
        })
    })

   
}

function setupBuy(){
  var create_textfields = document.getElementById("text_fields");
  create_textfields.innerHTML = ""
  document.getElementById("time").innerHTML=""
  document.getElementById("button_container").innerHTML=""
  var text_field = document.createElement("input");
  text_field.id="property_id"
  text_field.type="text"
  text_field.placeholder="Property ID"
  text_field.value=propertyObject.id;
  text_field.disabled=true;
  console.log(create_textfields)
  console.log(text_field)
  create_textfields.appendChild(text_field);

  var button = document.createElement("button")
  button.className="button success medium-12"
  button.innerHTML="Buy Property"
  button.setAttribute("onclick","onButtonBuy()");
  document.getElementById("button_container").appendChild(button);
}

function setupRegister(){
/*  var create_textfields = document.getElementById("text_fields");
  create_textfields.innerHTML=""
  document.getElementById("time").innerHTML=""
  document.getElementById("button_container").innerHTML=""
  var text_field = document.createElement("input");
  text_field.id="owner_address"
  text_field.type="text"
  text_field.placeholder="Owner Address"
  create_textfields.appendChild(text_field)

  var text_field1 = document.createElement("input");
  text_field1.id="property_id"
  text_field1.type="text"
  text_field1.placeholder="Property ID"

  create_textfields.appendChild(text_field1);

  var button = document.createElement("button")
  button.className="button success medium-12"
  button.innerHTML="Register Property"
  button.setAttribute("onclick","onButtonAdd()");
  document.getElementById("button_container").appendChild(button);

  $(function(){
    $('#container').load('/home/anand/foundation/WebDevelopment/getPropertyDetails.html');
  });*/


}

function setupLease(){
  var create_textfields = document.getElementById("text_fields");
  create_textfields.innerHTML=""
  document.getElementById("time").innerHTML=""
  document.getElementById("button_container").innerHTML=""
  var text_field = document.createElement("input");
  text_field.id="property_id"
  text_field.type="text"
  text_field.placeholder="Property ID"
  text_field.value=propertyObject.id;
  text_field.disabled=true;
  create_textfields.appendChild(text_field);

  document.getElementById("time").innerHTML+='<div class="medium-4 column"><input type=text id=years placeholder="No of years"></div><div class="medium-4 column"><input type=text id=weeks placeholder="No of weeks"></div><div class="medium-4 column"><input type=text id=days placeholder="No of days"></div>'

  var button = document.createElement("button")
  button.className="button success medium-12"
  button.innerHTML="Lease Property"
  button.setAttribute("onclick","onButtonLease()");
  //console.log(button)
  document.getElementById("button_container").appendChild(button);
  //console.log(document.getElementById("button_container"))
}

function onButtonGetOwner()
{
  var prop_id=document.getElementById(  "prop_id_get_owner").value;


  App.handle.getAddress.call(prop_id)
    .then(function(addr)
    {
      alert(prop_id+"  ==>>  "+addr);
      console.log(prop_id+" = "+addr);
    })
}


function onPageLoad()
{
    setTimeout(onButtonGetCOC.bind(),1000);
}

function onButtonGetCOC()
{

  //var prop_id=document.getElementById("propertyId").value;
  var container = document.getElementById("container_timeline").innerHTML

          App.handle.getChainOfCustody.call(document.cookie)
    .then(function(properties)
    {
        //console.log(properties);
        console.log(properties.length);
        for(i=0;i<properties.length /*&& properties[i]!== '0x0000000000000000000000000000000000000000'*/;i++)
        {
          console.log(properties[i]);
          document.getElementById("container_timeline").innerHTML += '<div class="container left"><div class="content">' + properties[i] + '</div></div>'
        }
    })

}


$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
}); 
