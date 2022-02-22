const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send({embeds:[
    new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription('Bu komudu kullanabilmek için `SUNUCUYU_YÖNET` yetkisine sahip olman gerek.')]})
  if (!args[0]) return message.channel.send({embeds:[
    new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription(`Reklam Filtresini Ayarlamak İçin \`link aç\` | Kapatmak İstiyorsanız \`link kapat\` Yazabilirsiniz`)]})     
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send({embeds:[
                new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTimestamp()
                .setDescription(`Lüten **aç** ya da **kapat** Yazın!`)]})
    
                if (args[0] == 'aç') {
     let acikmi = await db.fetch(`reklamFiltre_${message.guild.id}`)
    if(acikmi == "acik") return message.channel.send({embeds:[
      new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTimestamp()
                .setDescription('Reklam Filtresi zaten açık ki!')]})
     db.set(`reklamFiltre_${message.guild.id}`, 'acik')
  message.channel.send({embeds:[
    new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription('Reklam Filtresi başarıyla açıldı. `SUNUCUYU_YÖNET` yetkisi olanların linkleri engellenmeyecektir.')]})

  }

  if (args[0] === 'kapat') {
    if(db.has(`reklamFiltre_${message.guild.id}`)){
    db.delete(`reklamFiltre_${message.guild.id}`, `acik`)
  message.channel.send({embeds:[
              new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription(`Link-Engel sistemini başarıyla Kapattım.`)]})
} else return message.channel.send({embeds:[
  new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setTimestamp()
  .setDescription(`Link-Engel sistemi zaten ayarlanmamış!`)]})
  }

};


exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['link','reklam','linkengel','link-engel','reklamengel','reklam*engel'],
 permLevel: 0
};

exports.help = {
 name: 'reklam-engel',
 description: 'reklamm',
 usage: 'kanal'
};
