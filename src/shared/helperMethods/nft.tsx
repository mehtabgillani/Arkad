import React, { useEffect } from "react";
const Config = require('./Config')
var w3 = require('web3')
var W3 = new w3(Config.RPCNetwork)
const DefaultPinataURI = 'https://gateway.pinata.cloud/ipfs/'
const DefaultETHSCANURI =
  'https://api.etherscan.io/api?module=contract&action=getabi&address='

// async function GetNFTImageUrl(ContractAddress, nftId) {
//   //let ABI = await GetABI('Eth', ContractAddress)
//   let ABI = Config.STABI
//   const ERC721 = new W3.eth.Contract(ABI, ContractAddress)
//   let result = await NFTContract.methods.tokenURI(nftId).call()
//   let CorrectUrl = DefaultPinataURI + result.substring(7)
//   let response = await GetJson(CorrectUrl)
//   let refine = response.image
//   return refine
// }

async function getRawJsonData(Url) {
  var contractABI = ''
  let RawJson = await GetJson(Url)
  contractABI = JSON.parse(RawJson.result)
  return contractABI
}

async function GetJson(url) {
  const axios = require('axios')
  let a = await axios.get(url)
  return a.data
}

async function GetABI(Network, ContractAddress) {
  let SelectedNetwork = ''
  if (Network === 'Eth') {
    SelectedNetwork = DefaultETHSCANURI
  } else if (Network === 'BSC') {
  } else if (Network === 'TestNetwork') {
  } else {
  }

  let url = SelectedNetwork + ContractAddress
  let response = await getRawJsonData(url)
  if (response != '') {
    return response
  } else {
    return false
  }
}







async function GetContractName(network, contractAddress) {
  // let ABI = await GetABI(network, contractAddress) //Deprecated
  let ABI = Config.STABI
  const ERC721 = new W3.eth.Contract(ABI, contractAddress)
  let userAddress = await ERC721.methods.name().call()
  return userAddress
}

async function GetOwner(network, contractAddress, nftID) {
  // let ABI = await GetABI(network, contractAddress) //Deprecated
  let ABI = Config.STABI
  const ERC721 = new W3.eth.Contract(ABI, contractAddress)
  let userAddress = await ERC721.methods.ownerOf(nftID).call()
  return userAddress
}

export default async function getUserNftsIndexed(network, contractAddress, userAddress, startRange, endRange){
  console.log("i am in my getUserNftsIndexed function");
  console.log("contractAddress",contractAddress)
  console.log("user wallet Address",userAddress)
  let ABI = Config.STABI
  const ERC721 = new W3.eth.Contract(ABI, contractAddress)

  let balance = await ERC721.methods.balanceOf(userAddress).call()
  var tokens: any = [];
  var objects: any = [];

  for (var i = startRange; i < endRange && i < balance; i++) {
    tokens.push(await ERC721.methods.tokenOfOwnerByIndex(userAddress, i).call())
  }

  for (i = 0; i < tokens.length; i++) {
    objects.push(await ERC721.methods.tokenURI(tokens[i]).call())
  }

  let imagesUri = await getNftImageUri(objects)
  let cN = await GetContractName('Eth', contractAddress)
  let nftInfo = {collectionName:cN,tokenIds: tokens, tokenImgUri: imagesUri, totalSupply: balance}
  return nftInfo
}

export async function getUserNfts(network, contractAddress, userAddress) {
  //let ABI = await GetABI(network, contractAddress)
  let ABI = Config.STABI
  const ERC721 = new W3.eth.Contract(ABI, contractAddress)

  let balance = await ERC721.methods.balanceOf(userAddress).call()
  //console.log(balance)

  var tokens: any = [];
  var objects: any = [];
  for (var i = 0; i < balance; i++) {
    tokens.push(await ERC721.methods.tokenOfOwnerByIndex(userAddress, i).call())
    // console.log(tokens[i])
  }

  for (i = 0; i < tokens.length; i++) {
    objects.push(await ERC721.methods.tokenURI(tokens[i]).call())
  }

  let imagesUri = await getNftImageUri(objects)
  let cN = await GetContractName('Eth', contractAddress)
  let nftInfo = {collectionName:cN,tokenIds: tokens, tokenImgUri: imagesUri}
  return nftInfo
}


async function getNftImageUri(nfts) {
  var Data: any = [];
  for (let i = 0; i < nfts.length; i++) {
    let correctUrl = CorrectMeta(nfts[i]);
    try {
      let response = await GetJson(correctUrl);

      let correctImageUrl = CorrectMeta(response.image);
      Data.push(correctImageUrl);
    } catch (error) {
      return { error: "Unable to Process" };
    }
  }
  return Data;
}

function CorrectMeta(Info) {
  let Sstring = Info.slice(0, -(Info.length - 7))
  if (Sstring == 'ipfs://') {
    Info = DefaultPinataURI + Info.substring(7)
    return Info
  } else {
    return Info
  }
}


export async function GetCollectionOwner(network, contractAddress) {
  let ABI = Config.STABI
  const ERC721 = new W3.eth.Contract(ABI, contractAddress)
  let owner = await ERC721.methods.owner.call().call()
  return owner
}


async function GetTotalSupply(network, contractAddress){
  let ABI = Config.STABI
  const ERC721 = new W3.eth.Contract(ABI, contractAddress)
  let owner = await ERC721.methods.totalSupply.call().call()
  return owner
}