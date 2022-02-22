const Discord = require('discord.js');
const ayarlar = require('../../ayarlar.json')
const db = require("quick.db");
exports.run = async(client, message, args) => {
  if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply({embeds: [
     new Discord.MessageEmbed()
       .setColor('RANDOM')
       .setTimestamp()
       .setDescription(`${client.emojis.cache.get(unlem)} Bu komutu kullanabilmek için \`YÖNETİCİ\` iznine sahip olmalısın!`)]});
    let kanal = message.mentions.channels.first()
if(!kanal) return message.channel.send('Lütfen Mesaj log kanalını belirt!')
    db.set(`mesajlog_${message.guild.id}`, kanal.id)
    return message.channel.send(`${client.emojis.cache.get(ayarlar.tik)} Mesaj log kanalı başarı ile <#${kanal.id}> olarak ayarlandı!`)

};


exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0


};
exports.help = {
    name : "mesaj-log"
    };
