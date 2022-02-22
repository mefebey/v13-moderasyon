const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require(`../../ayarlar.json`)
exports.run = async(client, message, args) => {
  let tik = ayarlar.tik
  let carpi = ayarlar.carpi
  if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({embeds:[
           new Discord.MessageEmbed()
             .setColor("#ff0000")
             .setTimestamp()
             .setDescription(`${client.emojis.cache.get(carpi)} Bu komudu kullanabilmek için \`ÜYELERİ_AT\` yetkisine sahip olman gerek.`)]})
             if(!args[0]) return message.channel.send({embeds:[new Discord.MessageEmbed().setColor('BLACK').setDescription("Bir seçenek belirtin! `ayarla - sıfırla`")]})
  if(args[0] == "ayarla"){
  var kanal = message.mentions.channels.first()
  if(!kanal) return message.channel.send({embeds:[new Discord.MessageEmbed().setColor('BLACK').setDescription("Bir kanal belirtin! `sayaç ayarla #kanal @rol`")]})
  var hedef = Number(args[2])
  if(!hedef) return message.channel.send({embeds:[new Discord.MessageEmbed().setColor('BLACK').setDescription("Bir sayı belirtiniz")]})
  if(hedef <= message.guild.memberCount) return message.channel.send({embeds:[new Discord.MessageEmbed().setColor('BLACK').setDescription("Girdiğiniz sayı, sunucuzun üye sayısından küçük")]})
  db.set(`sayaçhedef.${message.guild.id}`, hedef)
  db.set(`sayaçkanal.${message.guild.id}`, kanal.id)
  db.set(`sayaç.${message.guild.id}`, "açık")
  return message.channel.send({embeds:[new Discord.MessageEmbed().setColor('BLACK').setDescription("Sayaç kanalı <#" + kanal.id + "> olarak, otorol rolü `" + hedef + "` olarak ayarlandı!")]})
  }
  if(args[0] == "sıfırla"){
    if(db.has(`sayaç.${message.guild.id}`)){
    db.delete(`sayaçhedef.${message.guild.id}`)
    db.delete(`sayaçkanal.${message.guild.id}`)
    db.delete(`sayaç.${message.guild.id}`)
    message.channel.send({embeds:[
      new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTimestamp()
      .setDescription(`${client.emojis.cache.get(tik)} Sayaç sistemini başarıyla Kapattım.`)]})
  }     else return message.channel.send({embeds:[
    new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTimestamp()
    .setDescription(`${client.emojis.cache.get(carpi)} Sayaç sistemi zaten ayarlanmamış!`)]})
  }
};
exports.conf = {
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "sayaç"
}
