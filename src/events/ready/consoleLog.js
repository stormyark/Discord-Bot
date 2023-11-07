const { ActivityType } = require("discord.js");

module.exports = (client) => {
  console.log(`${client.user.username} is online.`);
  client.user.setActivity({ name: "Paneled", type: ActivityType.Watching });
};
