/* eslint-disable no-undef */

task('request-data', 'Calls an API Consumer Contract to request external data')
  .addParam('contract', 'The address of the API Consumer contract that you want to call')
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract
    console.log('Calling API Consumer contract ', contractAddr, ' on network ', network.name)
    const APIConsumer = await ethers.getContractFactory('APIConsumer')

    // Get signer information
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    // Create connection to API Consumer Contract and call the createRequestTo function
    const apiConsumerContract = new ethers.Contract(contractAddr, APIConsumer.interface, signer)
    const result = await apiConsumerContract.requestVolumeData({ gasLimit: 200000 })
    console.log(
      'Contract ',
      contractAddr,
      ' external data request successfully called.  '
    )
    console.log('Transaction Hash: ' + result.hash)
    console.log('Run the following to read the returned result:')
    console.log('yarn hardhat read-data --contract ' + contractAddr + ' --network ' + network.name)
  })
module.exports = {}
