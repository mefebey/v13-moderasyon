const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require("../../ayarlar.json")
exports.run = async (client, message, args) => {
let prefix = ayarlar.prefix
  const permError = new Discord.MessageEmbed()
    .setColor('#ed455a')
      .setTitle('• Hata: 01 •')
        .setDescription('```Bu Komutu Kullanmak İçin "Üyeleri Yasakla" Yetkisine Sahip Olmalısın```')
   
  const userError = new Discord.MessageEmbed()
    .setColor('#ed455a')
      .setTitle('• Hata: 02 •')
        .setDescription(`\`Yasağı kaldırmak için bir kullanıcı kimliği girmelisiniz ${prefix}unban İD\``)
 
  const userError2 = new Discord.MessageEmbed()
    .setColor('#ed455a')
      .setTitle('• Hata: 03 •')
        .setDescription("```ID'de Harf Kullanılanamaz```")
 
  const userError3 = new Discord.MessageEmbed()
    .setColor('#ed455a')
      .setTitle('• Hata: 04 •')
        .setDescription('```<Bu Kullanıcı Yasaklanmamış```')
   
 
  if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send
        ({embeds:[permError]})
 
  let user = args[0];
    if  (!user) return message.channel.send
          ({embeds:[userError]})
 
  if  (isNaN(args[0])) return message.channel.send
  ({embeds:[userError2]})
 
  const banList = await message.guild.bans.fetch();
 
  if (!user.id === banList) return message.channel.send
      (userError3)
 try {
 await message.guild.members.unban(user);
await message.channel.send(`<@${user}> Adlı Kullanıcının Yasağı Başarıyla Kaldırıldı.`)
 } catch {
message.channel.send(`<@${user}> Adlı Kullanıcının Yasağını kaldıramıyorum.`)   
 }
  }
 
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
        kategori: "Yetkili"
 
  };
 
  exports.help = {
    name: 'unban',
    description: 'İstediğiniz kişinin banını kaldırır.',
    usage: 'unban [kullanıcı] [sebep]'
  };
