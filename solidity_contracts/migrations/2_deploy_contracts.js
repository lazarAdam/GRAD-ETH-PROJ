var contract = artifacts.require("newContract");


module.exports = function(deployer) {
    deployer.deploy(contract);
  };