require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "add",
    description: "Adds two numbers together.",
    options: [
      {
        name: "first_number",
        description: "The first number to add.",
        type: ApplicationCommandOptionType.Number, // Type.Number needs to match the value
        choices: [
          {
            name: "one",
            value: 1,
          },
          {
            name: "two",
            value: 2,
          },
          {
            name: "three",
            value: 3,
          },
        ],
        required: true,
      },
      {
        name: "second_number",
        description: "The second number to add.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "ping",
    description: "Replies with pong!",
  },
  {
    name: "embed",
    description: "Sends an embed message.",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );
    console.log("Successfully registered slash commands.");
  } catch (error) {
    console.log(`There was an ${error}`);
  }
})();
