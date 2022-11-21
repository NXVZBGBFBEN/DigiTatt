require("dotenv").config();
const {Client, GatewayIntentBits, EmbedBuilder} = require("discord.js");
const client = new Client({
    intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b)
});
const embed = new EmbedBuilder()
    .setColor(0x000000)
    .setTitle("メッセージが削除されました")

client.on("ready", () => {
    console.log(`${client.user.tag}でログインしています．`);
});

client.on("messageDelete", message => {
    embed.setAuthor({name: `${message.author.username}`});
    embed.setFields();
    if (message.content) {
        embed.addFields({
            name: "削除されたメッセージ", value: `${message.content}`
        },);
        if (message.attachments.size) {
            embed.addFields({
                name: "削除された添付ファイル", value: `${message.attachments.map(attachment => attachment.url).join("\n")}`
            },);
        }
    } else {
        embed.addFields({
            name: "削除された添付ファイル", value: `${message.attachments.map(attachment => attachment.url).join("\n")}`
        },);
    }
    message.channel.send({embeds: [embed]});
})

client.login(process.env.TOKEN);