var property_data;
App1 = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.

    $.getJSON('../Properties.json', function(data) {
      property_data = data;
      console.log("init")
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].title);
        petTemplate.find('img').attr('src', data[i].picture);
        //petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-type').text(data[i].plan.type);
        petTemplate.find('.pet-location').text(data[i].location.street + ", " + data[i].location.city);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        petTemplate.find('.btn-details').attr('onclick','onDetailsClick('+i+')');
        petsRow.append(petTemplate.html());
      }
    });

    return App1.initWeb3();
  },

  initWeb3: function() {
    
    // Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App1.web3Provider = web3.currentProvider;
} else {
  // If no injected web3 instance is detected, fall back to Ganache
  App1.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App1.web3Provider);


    return App1.initContract();
  },

  initContract: function() {
    
    $.getJSON('./build/contracts/Adoption.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract
  var AdoptionArtifact = data;
  App1.contracts.Adoption = TruffleContract(AdoptionArtifact);

  // Set the provider for our contract
  App1.contracts.Adoption.setProvider(App1.web3Provider);

  // Use our contract to retrieve and mark the adopted pets
  return App1.markAdopted();
});

    return App1.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App1.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    
    var adoptionInstance;

App1.contracts.Adoption.deployed().then(function(instance) {
  adoptionInstance = instance;

  return adoptionInstance.getAdopters.call();
}).then(function(adopters) {
  for (i = 0; i < adopters.length; i++) {
    if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});

  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

   var adoptionInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App1.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;

    // Execute adopt as a transaction by sending account
    return adoptionInstance.adopt(petId, {from: account});
  }).then(function(result) {
    return App1.markAdopted();
  }).catch(function(err) {
    console.log(err.message);
  });
});
  }

};

function onDetailsClick(identity){
  console.log(identity);
  document.cookie = "";
  document.cookie = identity+"";
  window.location.href="./PropertyDetails.html"

}



$(function() {
  $(window).load(function() {
    App1.init();
  });
});


