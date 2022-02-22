const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require('../../ayarlar.json')

exports.run = async (bot, message, args) => {
  let prefix = ayarlar.prefix
 if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({embeds:[
      new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTimestamp()
      .setDescription('Bu komutu kullanmak için \`ÜYELERİ_AT\` yetkisine sahip olmalısın!')]});
  if (!args[0]) return message.channel.send({embeds:[
    new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("#ff0000")
      .setDescription(`Aç yada kapat yazmalısın!! Örnek: **${prefix}sa-as aç**`)]});
      if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send({embeds:[
        new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTimestamp()
        .setDescription(`Lüten **aç** ya da **kapat** Yazın!`)]})

     if (args[0] === 'aç') {
      let acikmi = await db.fetch(`ssaass_${message.guild.id}`)
      if(acikmi == "acik") return message.channel.send({embeds:[
        new Discord.MessageEmbed()
                  .setColor("#ff0000")
                  .setTimestamp()
                  .setDescription('Sa-as zaten açık ki!')]})
    db.set(`ssaass_${message.guild.id}`, 'acik')
    return message.channel.send({embeds:[
      new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTimestamp()
      .setDescription(`Artık bot Sa diyince As diyecek. Kapatmak için "\`${prefix}sa-as kapat\`" yazmalısın.`)]});
  }

  if (args[0] === 'kapat') {
    db.delete(`ssaass_${message.guild.id}`)
    message.channel.send({embeds:[
      new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTimestamp()
      .setDescription(`Artık biri sa diyince cevap vermeyecek. Açmak için "\`${prefix}sa-as aç\`" yazmalısın.`)]});
     } else return message.channel.send({embeds:[
        new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTimestamp()
        .setDescription(`Link-Engel sistemi zaten ayarlanmamış!`)]})

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sa-as-sistemi'],
  permLevel: 0,
  kategori: "Ayarlar"
};

exports.help = {
  name: 'sa-as',
  description: 'Sa As ayarlarsın.',
  usage: 'sa-as'
};
