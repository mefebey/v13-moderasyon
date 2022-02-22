const db = require("quick.db")
const Discord = require('discord.js');
const ayarlar = require("../../ayarlar.json")
exports.run = async (client, message, args) => {
  setTimeout(() => message.delete(), 2000);
  let yes = ayarlar.tik
  let no = ayarlar.carpi
  var USER = message.author;
  var REASON = args.slice(0).join("  ");
  if(!REASON) return message.channel.send(`${client.emojis.cache.get(no)} ${message.author} Lütfen sebep yazınız.`).then((msg) => setTimeout(() => msg.delete(), 6000));

  db.set(`afk_${USER.id}`, REASON);
  db.set(`afk_süre_${USER.id}`, Date.now());
  message.channel.send(`${client.emojis.cache.get(yes)} ${message.author} Başarıyla ${REASON} sebebiyle afk oldunuz.`).then((msg) => setTimeout(() => msg.delete(), 6000));
};
  
 

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  kategori: 'kullanıcı',
  permLevel: 0 
};

exports.help = {
  name: 'afk', 
  description: 'Afk moduna girmenizi sağlar.',
  usage: 'afk <sebep>',
  emoji: "ℹ"
};