import context from "./context"
import React, { useState } from "react"
import { ethers } from "ethers";
import deployUser from "../Deploy/deployUser.js"; 
import user_abi from '../utils/decenshare_user.json';
import decenshare_abi from '../utils/decenshare.json';
const MAIN_CONTRACT_ADDRESS = "0x5446Fc945E3F01f202CdD32Dd2f2AbB597725f8A";

var axios = require('axios');
const host="http://localhost:5000";

function encrypt(msg, key){
  console.log("encrypting msg")
  return msg;
}

function decrypt(msg, key){
  console.log("decrypting msg")
  return msg;
}

function generate_keys(passphrase) {
  console.log("generating keys")
  return ["pubkey", "privkey"]
}

const getContract = async (address, abi) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(address, abi, signer);
      console.log(connectedContract)
      return connectedContract;

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

const setupEventListener = async (sc_address, abi) => {
  try {
    const connectedContract = await getContract(sc_address, abi);
    //do something
  } catch (error) {
    console.log(error)
  }
}

//json for chat:{"msg":"this is msg", "timestamp":Date.now()}
//json for post:{"title":"","des":"vnfjn","timestamp":now,"author":""}
async function upload(json) {
  var data = JSON.stringify({
    "pinataOptions": {
      "cidVersion": 1
    },
    "pinataMetadata": {
      "name": "off_chain_zk_voting",
      "keyvalues": {"json":"json"}
    },
    "pinataContent":json
  });
  var config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNWM2ZDhiNS03NmYwLTRjNTUtOTY0NC1kOTIzNmMwZTVjNTgiLCJlbWFpbCI6ImphaW5ldGlrc2hhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjYjk5ZjRhOGU2ZGIzM2I2YTA5OCIsInNjb3BlZEtleVNlY3JldCI6ImFjNjJhOTQ5NzRlYTcwMTc0Zjg4YzQwYTRhM2UzMTRkOWY1YzU0NGVhNjIwNzMzZjY4NTcwODBlZDQzZjFhMWYiLCJpYXQiOjE2NjExMDM5OTR9.GKLNPCS88TmAynM3q08Ib4U7f83ttUnBl6veZdicxC8'
    },
    data : data
  };
  try {
    console.log("uploading data to ipfs")
    const res = await axios(config);
    let hash = res.data.IpfsHash
    console.log(res.id);
    return hash
  } catch (error) {
    console.log(error.response)
  }
}

async function get(hash) {
  var config = {
    method: 'get',
    url: 'https://gateway.pinata.cloud/ipfs/' + hash
  };
  console.log("fetching data from ipfs")
  const res = await axios(config);
  console.log(res.data);
  return res.data
}

const askContractToAddHash = async (sc_address, abi, hash) => {
  try {
    const connectedContract = await getContract(sc_address, abi);
    window.alert("Going to pop wallet now to pay gas...")
    let nftTxn = await connectedContract.set_CID(hash);
    window.alert("Creating proposal...please wait.")
    await nftTxn.wait();
    console.log(nftTxn);
  } catch (error) {
    console.log(error)
  }
}

const askContractToAddkeys = async (sc_address, abi, pub, priv) => {
  try {
    const connectedContract = await getContract(sc_address, abi);
    window.alert("Going to pop wallet now to pay gas...")
    let nftTxn = await connectedContract.setKeys(pub, priv);
    window.alert("Generating Keys...please wait.")
    await nftTxn.wait();
    console.log(nftTxn);
  } catch (error) {
    console.log(error)
  }
}

const askContractToCheckUser = async () => {

}

const askContractToGetScAddress = async () => {
  
}

const askContractToGetPubKey = async () => {
  
}

const askContractToAddUser = async () => {
  
}

const askContractToSetKeys = async () => {
  
}

const askContractToGetContacts = async () => {
  
}

const askContractToAddConnection = async () => {
  
}

const askContractToGetPairPubKey = async () => {
  
}

const askContractToGetPairPrivKey = async () => {
  
}

const askContractToGetMongoId = async () => {
  
}

const askContractToGetPosts = async () => {
  
}

const askContractToAddPost = async () => {
  
}


const askContractToAddVoter = async (sc_address, abi) => {
    try {
      const connectedContract = await getContract(sc_address, abi);
      window.alert("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.updateVote();
      window.alert("Registering Vote...please wait.")
      await nftTxn.wait();
      console.log(nftTxn);
    } catch (error) {
      console.log(error)
    }
  }

const askContractToAddZKPhash = async (sc_address, abi, zkphash) => {
    try {
      const connectedContract = await getContract(sc_address, abi);
      window.alert("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.submitZKHash(zkphash);
      window.alert("Adding Hash to SC..please wait.")
      await nftTxn.wait();
      console.log(nftTxn);
    } catch (error) {
      console.log(error)
    }
  }

const ProposalState = (props) => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [pubKey, setPubKey] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [connections, setConnections] = useState([]);
  const [currChatAddr, setCurrChatAddr] = useState("");
  const [currPairPubKey, setCurrPairPubKey] = useState("");
  const [currPairPrivKey, setCurrPairPrivKey] = useState("");
  const [currChat, setCurrChat] = useState([])
  const [mongo_id, setMongo_id] = useState([])
  const [posts, setPosts] = useState([]);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      window.alert("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)


      // setupEventListener()
    } else {
      window.alert("No authorized account found")
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      getSmartContractAddr()
      // setupEventListener()
    } catch (error) {
      console.log(error)
    }
  }

  const getSmartContractAddr = async () => {
    //check if the currentAccount is added in the main sc:
    checkIfWalletIsConnected();
    let isDeployed = await askContractToCheckUser(decenshare_abi, MAIN_CONTRACT_ADDRESS);
    //if yes:
    if(isDeployed){
      let sc_addr = await askContractToGetScAddress(decenshare_abi, MAIN_CONTRACT_ADDRESS);
      let pub_key = await askContractToGetPubKey(sc_addr, user_abi);
      let priv_key = await askContractToGetPubKey(sc_addr, user_abi);
      setContractAddress(sc_addr);
      setPubKey(pub_key)
      setPrivKey(priv_key)
    }
    //else: deploy a sc:
    else{
      //deploy sc
      let sc_addr = await deployUser();
      //add user to main smart contract:
      let txn = await askContractToAddUser(decenshare_abi, MAIN_CONTRACT_ADDRESS, sc_addr)
      //set public priv keys in sc:
      let keys = generate_keys("passphrase")
      let txn2 = await askContractToSetKeys(sc_addr, user_abi, keys[0], keys[1]);
      
      setContractAddress(sc_addr);
      setPubKey(keys[0])
      setPrivKey(keys[1])
    }
  }

  //get all connections:
  const getAllConnections = async () => {
    let connections = await askContractToGetContacts(contractAddress, user_abi)
    setConnections(connections) //list of addresses
  }

  // add a connection 
  const addConnection = async (address) => {

    //pair keys:
    let keys = generate_keys("passphrase")

    //create mongo chat object:
    let id = ""
    try {
      const response = await fetch(`${host}/api/chat/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      id= await response.json()._id;
      console.log(id) 
    } catch (error) {
      console.log(error)
      return
    }

    // add to contact list of us:
    let txn = await askContractToAddConnection(contractAddress, user_abi, address, keys[0], keys[1], id);

    //add to contact list of 'address':
    //tbddddddddd

    getAllConnections();
  }

  //set chat state:
  const setCurrContactState = async (address) => {
    setCurrChatAddr(address)
    let pair_pub_key = await askContractToGetPairPubKey(contractAddress, user_abi, address)
    let pair_priv_key = await askContractToGetPairPrivKey(contractAddress, user_abi, address)
    setCurrPairPubKey(pair_pub_key)
    setCurrPairPrivKey(pair_priv_key)
    let mongo_id = await askContractToGetMongoId(contractAddress, user_abi, address)
    setMongo_id(mongo_id)
  }

  //set current chat state
  const setCurrMessages = async (address) => {
    //get hash of messages list from mongo:
    let messages = []
    try {
      const response = await fetch(`${host}/api/chat/fetchallmsgs/${mongo_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      messages= await response.json().msgs;
      console.log(messages) 
    } catch (error) {
      console.log(error)
      return
    }

    //fetch encrypted messages from ipfs using hash and decrypt them:
    for(let i=0;i<messages.length;i++){
        let msg = await get(messages[i])
        let decrypted_msg = decrypt(msg, currPairPrivKey)
        messages[i]=decrypted_msg
    }
    setCurrChat(messages)
  }

  //send message 
  const sendMessage = async (address, msg) => {
    let encrypted_msg = encrypt(msg, currPairPubKey)
    let json = {
      "msg":encrypted_msg,
      "time":Date,
    }
    let hash = await upload(json)

    try {
      const response = await fetch(`${host}/api/chat/sendmsg/${mongo_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({"msg":hash }) 
      });
      let res= await response.json();
      console.log(res)
      setCurrMessages();
    } catch (error) {
      console.log(error)
      return
    }
  }

  //get all posts:
  const getAllPosts = async () => {
    let postss = await askContractToGetPosts(MAIN_CONTRACT_ADDRESS, decenshare_abi)
    for(let i=0;i<postss.length;i++){
      let post = await get(postss[i])
      let decrypted_msg = decrypt(post, privKey)
      postss[i]=decrypted_msg
  }
    setPosts(postss) //list of addresses
  }

  // add a post 
  const addPost = async (title, description) => {

    //object to be put to ipfs:
    let post = {
      "title": encrypt(title, pubKey),
      "description":encrypt(description,pubKey),
      "author":encrypt(currentAccount, pubKey)
    }
    //upload post to ipfs and get hash:
    let hash = await upload(post)

    //add hash to sc:
    let txn = await askContractToAddPost(MAIN_CONTRACT_ADDRESS, decenshare_abi, hash);

    getAllPosts();

  }



  return (
    <context.Provider value={{ currentAccount, checkIfWalletIsConnected, connectWallet }}>
      {props.children}
    </context.Provider>
  );
}

export default ProposalState;