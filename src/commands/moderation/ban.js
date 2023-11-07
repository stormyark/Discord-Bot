const {
  Client,
  interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;
    const reason =
      interaction.options.get("reason")?.value || "No reason provided.";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("User not found.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply("You can't ban the owner.");
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // Highest role position of the target user
    const requesterRolePosition = interaction.member.roles.highest.position; // Highest role position of the requester
    const botRolePosition = interaction.guild.me.roles.highest.position; // Highest role position of the bot

    if (targetUserRolePosition >= requesterRolePosition) {
      await interaction.editReply(
        "You can't ban this user because they have the same or higher role than you."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "I can't ban this user because they have the same or higher role than me."
      );
      return;
    }

    // Ban the user
    try {
      await targetUser.ban({ reason });
      await interaction.editReply(
        `Successfully banned ${targetUser.user.tag}.\nReason: ${reason}`
      );
    } catch (error) {
      console.error(`There was an error when banning: ${error}`);
    }
  },

  name: "ban",
  description: "Bans a member from this server.",
  // devOnly: Boolean,
  // testOnly: Boolean,
  options: [
    {
      name: "target-user",
      description: "The user to ban.",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "reason",
      description: "The reason for banning.",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
