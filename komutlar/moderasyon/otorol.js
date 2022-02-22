const Discord = require('discord.js');
const db = require('quick.db');
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
    if(!kanal) return message.channel.send({embeds:[new Discord.MessageEmbed().setColor('BLACK').setDescription("Bir kanal belirtin! `otorol ayarla #kanal @rol`")]})
    var rol = message.mentions.roles.first()
    if(!rol) return message.channel.send({embeds:[new Discord.MessageEmbed().setColor('BLACK').setDescription("Bir rol belirtin! `otorol ayarla #kanal @rol`")]})
    db.set(`otorol-kanal.${message.guild.id}`, kanal.id)
    db.set(`otorol-rol.${message.guild.id}`, rol.id)
    db.set(`OTO-ROL.${message.guild.id}`, "aktif")
    return message.channel.send({embeds:[new Discord.MessageEmbed().setColor('BLACK').setDescription("Otorol kanalı <#" + kanal.id + "> olarak, otorol rolü <@&" + rol.id + "> olarak ayarlandı!")]})
  }
  if(args[0] == "sıfırla"){
    if(db.has(`OTO-ROL.${message.guild.id}`)){
    db.delete(`OTO-ROL.${message.guild.id}`)
    db.delete(`otorol-kanal.${message.guild.id}`)
    db.delete(`otorol-rol.${message.guild.id}`)
    message.channel.send({embeds:[
      new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTimestamp()
      .setDescription(`${client.emojis.cache.get(tik)} Oto-rol sistemini başarıyla Kapattım.`)]})
  }     else return message.channel.send({embeds:[
    new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTimestamp()
    .setDescription(`${client.emojis.cache.get(carpi)} Oto-rol sistemi zaten ayarlanmamış!`)]})

  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  kategori: "Moderasyon",
  aliases: ['oto-rol'],
  permLevel: 0
};
exports.help = {
  name: "otorol",
  usage: "",
  description: "",
  category: ""
}
