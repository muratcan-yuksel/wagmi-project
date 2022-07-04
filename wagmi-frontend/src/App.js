import { useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import abi from "./contracts/Wave.json";

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userName, setUserName] = useState("initial name");
  const contractAddress = "0xd3119cF15a2C983e6fA744dEfeD9c6051A8B7Fd7";

  const contractABI = abi.abi;

  return (
    <div>
      <h1>Wagmi Project</h1>
      <button>Wave</button>
      <p> {userName} </p>
    </div>
  );
};

export default App;
