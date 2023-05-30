const secp = require("ethereum-cryptography/secp256k1");

const  { toHex } =require("ethereum-cryptography/utils");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors()); 
app.use(express.json());

const balances = {
  "f98da787d838b05765f1061fef6c43862d24997a3f4513b44f6f2480f06da230": 100,
  "51761cf2b63c8f87297cc580b8699efc86dfa5bb1efe433126b1cd6c9e3292e3": 50,
  "74137ecdb1e5f198d64d3f07393f25373486be47bac62090f9454408dca6ce1c": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params; 
  const balance = balances[address] || 0;
  res.send({ balance });
});
function signTest(hashMessage,signature,publicKey){
 const valid = secp.secp256k1.verify(signature,hashMessage,publicKey)
  if(valid){
    app.post("/send", (req, res) => {
      const { sender, recipient, amount } = req.body;
    
      setInitialBalance(sender);
      setInitialBalance(recipient);
    
      if (balances[sender] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
      } else {
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[sender] });
      }
    });
    
  }
  else {
    res.status(Error).send({message: "Could not verify signature!"})
  }
}


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
