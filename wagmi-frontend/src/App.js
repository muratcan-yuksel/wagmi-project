import { useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import abi from "./contracts/Wave.json";

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userName, setUserName] = useState("");
  const [displayedUserName, setDisplayedUserName] = useState("initial name");
  const [error, setError] = useState(null);
  const contractAddress = "0xd3119cF15a2C983e6fA744dEfeD9c6051A8B7Fd7";
  const contractABI = abi.abi;

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

  const handleInput = (name) => {
    // setUserName(name);
    console.log(name.target.value);
    setUserName(name.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const waveContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const txn = await waveContract.setName(
        utils.formatBytes32String(userName)
      );
      console.log("setting user name");
      await txn.wait();
      console.log("user name set", txn.hash);
      setDisplayedUserName(userName);
    }
  };

  useEffect(() => {
    // checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      <h1>Wagmi Project</h1>
      <input onChange={handleInput} type="text" />
      <button onClick={handleClick}>Wave</button>
      <p> {displayedUserName} waved!</p>
    </div>
  );
};

export default App;
