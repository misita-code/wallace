import React from "react";

const BotCard = ({ bot, enlistBot, setSelectedBot }) => {
  return (
    <div className="bot-card">
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p>{bot.catchphrase}</p>
      <button onClick={() => setSelectedBot(bot)}>See Details</button>
      <button onClick={() => enlistBot(bot)}>Enlist</button>
    </div>
  );
};

export default BotCard;
