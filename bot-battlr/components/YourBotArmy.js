import React from "react";

const YourBotArmy = ({ yourArmy, releaseBot, dischargeBot }) => {
  return (
    <div>
      <h2>Your Bot Army</h2>
      {yourArmy.length === 0 ? (
        <p>No bots enlisted yet.</p>
      ) : (
        <div className="your-army">
          {yourArmy.map((bot) => (
            <div key={bot.id}>
              <h3>{bot.name}</h3>
              <button onClick={() => releaseBot(bot)}>Release</button>
              <button onClick={() => dischargeBot(bot)}>Discharge</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourBotArmy;
