const { EmbedBuilder } = require("discord.js");

module.exports = {
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: "You can't use this command outside of a server.",
        ephemeral: true,
      });
      return;
    }

    const { guild } = interaction;

    const serverInfoEmbed = new EmbedBuilder({
      author: {
        name: guild.name,
        iconURL: guild.iconURL({ size: 256 }),
      },
      fields: [
        {
          name: "Owner",
          value: (await guild.fetchOwner()).user.username,
          inline: true,
        },
        {
          name: "Textchannels",
          value: guild.channels.cache.filter((c) => c.type === 0).toJSON()
            .length,
          inline: true,
        },
        {
          name: "Voicechannels",
          value: guild.channels.cache.filter((c) => c.type === 2).toJSON()
            .length,
          inline: true,
        },
        {
          name: "Categorychannels",
          value: guild.channels.cache.filter((c) => c.type === 4).toJSON()
            .length,
          inline: true,
        },
        {
          name: "Members",
          value: guild.memberCount,
          inline: true,
        },
        {
          name: "Roles",
          value: guild.roles.cache.size,
          inline: true,
        },
      ],

      footer: {
        text: `ID: ${guild.id} | Created at ${guild.createdAt.toDateString()}`,
      },
    });
    interaction.reply({ embeds: [serverInfoEmbed] });
  },

  name: "serverinfo",
  description: "Get serverinfo",
};
