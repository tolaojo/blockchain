import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex }  from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";



 async function Wallet({ address, setAddress, balance, setBalance,privateKey,setPrivateKey, message,setMessage }) {
 
  function change(evt){
    const message = evt.target.value;
    setMessage(message);
    const bytes = utf8ToBytes(message);
    const hashMessage = keccak256(bytes);   
  }

    async function onChange(evt) {
    
    const privateKey = evt.target.value;
    setPrivateKey(privateKey)
    const publicKey = secp.secp256k1.getPublicKey(privateKey)
    const address = toHex(publicKey).slice(0,10);
   
   
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  const signature = secp.secp256k1.sign(hashMessage ,privateKey,{ recovered: true });
  

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Enter private Key " value={privateKey} onChange={onChange}></input>

      </label>

        <h1>Your Message</h1>
        <label>
        Message
        <input placeholder="Enter Message" value={message} onChange={change}></input>

      </label>

      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
  }


export default Wallet;
