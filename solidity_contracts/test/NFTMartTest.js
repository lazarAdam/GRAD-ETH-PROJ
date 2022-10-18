var NFTMart = artifacts.require("newContract");

contract("newContract", (accounts)=>{

    
    it("create a User", async () => {
        
        const contractInstance = await NFTMart.deployed();

        let address = await contractInstance.owner()

        let account = accounts[0]

        assert.equal(address,account)

    });
    it("check if child contract exist", async () => {
        
        const contractInstance = await NFTMart.deployed();

        let value = await contractInstance.message()

        
        
        assert.equal( typeof value === "string",true)

    });

})