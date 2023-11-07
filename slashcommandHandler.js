const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data);
}

const clientId = "1166724963223470121";
const guildId = "795426692268818433";

const rest = new REST({ version: "9" }).setToken(
  "MTE2NjcyNDk2MzIyMzQ3MDEyMQ.Ga9MTA.1bhynQv4K9_8e46Q7Dg6j4AHWDMgwR-_CxI8v4"
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
