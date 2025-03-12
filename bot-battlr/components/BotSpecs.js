import React from "react";

const BotSpecs = ({ bot, enlistBot }) => {
  return (
    <div>
      <h2>Bot Details</h2>
      <img src={bot.avatar_url} alt={bot.name} />
      <p>Name: {bot.name}</p>
      <p>Health: {bot.health}</p>
      <p>Damage: {bot.damage}</p>
      <p>Armor: {bot.armor}</p>
      <p>Class: {bot.bot_class}</p>
      <p>Catchphrase: {bot.catchphrase}</p>
      <button onClick={() => enlistBot(bot)}>Enlist this bot</button>
    </div>
  );
};

export default BotSpecs;
