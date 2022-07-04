import { useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import abi from "./contracts/Wave.json";

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userName, setUserName] = useState("initial name");
  const [error, setError] = useState(null);
  const contractAddress = "0xd3119cF15a2C983e6fA744dEfeD9c6051A8B7Fd7";
  const contractABI = abi.abi;

  const handleInput = (e) => {
    e.preventDefault();
    console.log("clicked");
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setIsWalletConnected(true);
        console.log("Account Connected: ", account);
      } else {
        setError("Please install a MetaMask wallet to use our bank.");
        console.log("No Metamask detected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [isWalletConnected]);

  return (
    <div>
      <h1>Wagmi Project</h1>
      <button onClick={handleInput}>Wave</button>
      <p> {userName} </p>
    </div>
  );
};

export default App;
