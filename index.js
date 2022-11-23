require("dotenv").config();
const {Client, GatewayIntentBits, EmbedBuilder} = require("discord.js");
const client = new Client({
    intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b)
});
const embed = new EmbedBuilder()
    .setColor(0x000000)

client.on("ready", () => {
    console.log(`READY\n${client.user.tag}(${client.user.id})`);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    if (oldMessage.author.id === client.user.id && newMessage.embeds[0] === undefined) {
        oldMessage.edit({embeds: [oldMessage.embeds[0]]});
    }
});

client.on("messageDelete", message => {
    if (message.author.avatarURL()) {
        embed.setAuthor({name: `${message.author.username}`, iconURL: `${message.author.avatarURL()}`});
    } else if (message.author.avatarURL() === null) {
        embed.setAuthor({name: `${message.author.username}`, iconURL: "https://cdn.discordapp.com/embed/avatars/1.png"})
    } else {
        console.log("アバターアイコンで例外が発生しました");
    }
    if (message.author.id === client.user.id) {
        const r_embed = message.embeds[0];
        message.channel.send({content: "**メッセージが削除されました**", embeds: [r_embed]});
        return;
    }
    if (message.content) {
        embed.setDescription(`${message.content}`);
        if (message.attachments.size) {
            embed.setDescription(`${message.content}\n${message.attachments.map(attachment => attachment.url).join("\n")}`);
        }
    } else if (message.attachments.size) {
        embed.setDescription(`${message.attachments.map(attachment => attachment.url).join("\n")}`);
    } else {
        console.log("送信コンテンツで例外が発生しました");
    }
    message.channel.send({content: "**メッセージが削除されました**", embeds: [embed]});
});

client.login(process.env.TOKEN);