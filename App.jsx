import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [message,setMessage]= useState("");
  const [privateKey,setPrivateKey]= useState("");
  

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        signMessage={signMessage}
        setSignMessage= {setSignMessage}
        address={address}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
