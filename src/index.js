require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { OpenAI } = require("openai");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const CHANNELS = ["1170806352130613318"];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!CHANNELS.includes(message.channel.id)) return;

  await message.channel.sendTyping();

  const sendTypingInterval = setInterval(() => {
    message.channel.sendTyping();
  }, 5000);

  const response = await openai.chat.completions
    .create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Chat GPT is a friendly chatbot.",
        },
        {
          role: "user",
          content: message.content,
        },
      ],
    })
    .catch((error) => console.error("OpenAI API Error:", error));

  clearInterval(sendTypingInterval);

  if (!response) {
    message.reply(
      "I'm sorry, I'm having trouble thinking of a response right now."
    );
    return;
  }

  message.reply(response.choices[0].message.content);
});

eventHandler(client);

client.login(process.env.TOKEN);

// node /src/index.js
