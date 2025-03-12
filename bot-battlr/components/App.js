import React, { useState, useEffect } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import BotSpecs from "./components/BotSpecs";
import SortBar from "./components/SortBar";

function App() {
  const [bots, setBots] = useState([]);
  const [yourArmy, setYourArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  
  useEffect(() => {
    fetch("http://localhost:8001/bots")
      .then((response) => response.json())
      .then((data) => setBots(data));
  }, []);
  
  const enlistBot = (bot) => {
    if (!yourArmy.some((armyBot) => armyBot.bot_class === bot.bot_class)) {
      setYourArmy([...yourArmy, bot]);
    } else {
      alert("Only one bot of each class allowed!");
    }
  };

  const releaseBot = (bot) => {
    setYourArmy(yourArmy.filter((armyBot) => armyBot.id !== bot.id));
  };

  const dischargeBot = (bot) => {
    fetch(`http://localhost:8001/bots/${bot.id}`, {
      method: "DELETE",
    }).then(() => {
      setBots(bots.filter((b) => b.id !== bot.id));
      setYourArmy(yourArmy.filter((armyBot) => armyBot.id !== bot.id));
    });
  };

  return (
    <div>
      <SortBar />
      <BotCollection bots={bots} enlistBot={enlistBot} setSelectedBot={setSelectedBot} />
      {selectedBot && <BotSpecs bot={selectedBot} enlistBot={enlistBot} />}
      <YourBotArmy yourArmy={yourArmy} releaseBot={releaseBot} dischargeBot={dischargeBot} />
    </div>
  );
}

export default App;
