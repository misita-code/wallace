import React from "react";
import BotCard from "./BotCard";

const BotCollection = ({ bots, enlistBot, setSelectedBot }) => {
  return (
    <div>
      <h2>Bot Collection</h2>
      <div className="bot-collection">
        {bots.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            enlistBot={enlistBot}
            setSelectedBot={setSelectedBot}
          />
        ))}
      </div>
    </div>
  );
};

export default BotCollection;
