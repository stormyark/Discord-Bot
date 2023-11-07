module.exports = {
  name: "test",
  description: "test",

  callback: async ({ interaction }) => {
    interaction.reply({
      content: "You can't use this command outside of a server.",
    });
    return;
  },
};
