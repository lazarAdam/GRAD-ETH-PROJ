var NFTMart = artifacts.require("User");

contract("User", (accounts) => {


    it("bob  a new user, creates an NFT", async () => {

        const contractInstance = await NFTMart.deployed();

        let account = accounts[0]

        let result = await contractInstance.createNewNFT(
            "NFT ZERO",
            web3.utils.toWei('0.001', 'ether'),
            "DIGITAL ART",
            "https://test-url",
            "bob"
            ,
            { from: account }
        )



        assert.equal(result.logs[0].args.result,true)   
        assert.equal(result.logs[1].args.name, "NFT ZERO")

        console.log(result);

    })


    // it(" new user alice, creates an NFT", async () => {

    //     const contractInstance = await NFTMart.deployed();

    //     let account = accounts[1]

    //     let result = await contractInstance.createNewNFT(
    //         "NFT ONE",
    //         web3.utils.toWei('0.001', 'ether'),
    //         "DIGITAL ART",
    //         "https://test-url",
    //         "alice",
    //         { from: account }
    //     )

    //     assert.equal(result.logs[0].args.result,true)   
    //     assert.equal(result.logs[1].args.name, "NFT ONE")
    // })

    
    // it("get  a User", async () => {

    //     const contractInstance = await NFTMart.deployed();

       

    //      let result = await contractInstance.getUserData()

    //     assert.equal(result["userName"], "bob")

    // });

    // it("get the all the NFTs in the list", async () => {

    //     const contractInstance = await NFTMart.deployed();


    //     result = await contractInstance.getAllNFTs()

    //     assert(true)

    // })

    // it("transfer NFT Between two accounts", async () => {

    //     const contractInstance = await NFTMart.deployed();

    //     let AliceBalance, BobBalance, AliceEndBalance, BobEndBalance

    //     [bob,alice] = accounts

    //     AliceBalance = await web3.eth.getBalance(alice)
    //     BobBalance = await web3.eth.getBalance(bob)


    //    result =  await contractInstance.transferFrom(

    //         bob,
    //         alice,
    //         0,
    //         {
    //             from: alice,
    //             value: web3.utils.toWei('0.001', 'ether')
    //         }
    //     )

    //     AliceEndBalance = await web3.eth.getBalance(alice)
    //     BobEndBalance = await web3.eth.getBalance(bob)



    //     assert.equal((AliceEndBalance - AliceBalance) <  0,true)
    //     assert.equal(BobEndBalance - BobBalance, web3.utils.toWei('0.001', 'ether'))

    //     assert.equal(await contractInstance.ownerOf(0), await contractInstance.ownerOf(1))
    //     assert.equal(await contractInstance.balanceOf(alice),2)
    //     assert.equal(await contractInstance.balanceOf(bob),0)


   

    // })


    // it("try to  transfer NFT Between two accounts with insufficient funds", async () => {

    //     const contractInstance = await NFTMart.deployed();

    //     [bob,alice] = accounts

    //     try{

    //         result =  await contractInstance.transferFrom(

             
    //             alice,
    //             bob,
    //             0,
    //             {
    //                 from: alice,
    //                 value: web3.utils.toWei('0.0001', 'ether')
    //             }
    //         )


    //     }catch(exp){

    //         err = exp

    //     }


    //     assert.ok(err)

        


   

    // })



    // it("A user try to approve an NFT that they don't own", async () => {

    //     const contractInstance = await NFTMart.deployed();

    //     bob = accounts[0]

    //     try{

    //         result =  await contractInstance.approve(

    //             bob,
    //             0,
    //             {
    //                 from: bob,
    //             }
    //         )


    //     }catch(exp){

    //         err = exp

    //     }


    //     assert.ok(err)

    //     console.log(err.data.reason);
        
        
        

        


   

    // })



})


