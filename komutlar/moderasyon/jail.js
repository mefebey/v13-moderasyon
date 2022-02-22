const Discord = require('discord.js');
const db = require("quick.db");
const ayarlar = require('../../ayarlar.json')
exports.run = async(client, message, args) => {
    let carpi = ayarlar.carpi
    let tik = ayarlar.kirmizitik 
    let duyuru = ayarlar.duyuru
    let zil = ayarlar.zil
    let toplar = ayarlar.toplar
    const rol = ayarlar.jailRol
    const kanal = ayarlar.jailLog
    const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor({
                name: message.member.displayName, 
                iconURL: client.user.displayAvatarURL({	dynamic: true,	})	})
            .setTimestamp()
    if (!message.member.permissions.has("KICK_MEMBERS") && !message.member.roles.cache.has(ayarlar.jailPerm)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için \`ÜYELERİ_AT\` yetkin olmalı!`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    const jailKontrol = ayarlar.jailRol 
    const jailKontrol2 = ayarlar.jailLog
    if(!jailKontrol && !jailKontrol2) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription("Komutu kullanabilmek için jail-sistemini ayarlaman lazım.")]}) 
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(' ');
    if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle kullanıcıyı belirtmelisin.")] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (reason.length < 1) return message.reply({ embeds: [embed.setDescription('Öncelikle geçerli bir sebep belirtmelisin.')] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if(member.id === message.author.id) return message.channel.send(' ``Kendini jaile atamazsın.``')
    if(member.id === client.user.id) return message.channel.send(' ``Yemezler koçum..``')
    if(member.id === message.guild.ownerID) return message.channel.send(' ``Sunucu sahibini jaile atamazsın.``')
    if (member.roles.cache.get(rol)) return message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı zaten cezalandırılmış.`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (member.roles.cache.has(ayarlar.jailPerm)) return message.reply({ embeds: [embed.setDescription("Bu kişinin yetkisi var!")] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    try {
    await member.roles.add(rol)
    await message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından ${reason} sebebiyle karantinaya atıldı.`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    await message.react(tik)
    await client.channels.cache.get(kanal).send({ embeds: [
        embed.setDescription(`     
    Birisi karantinaya atıldı!

   ${client.emojis.cache.get(duyuru)} **Kullanıcı**: ${member ? member.toString() : ""} - \`(${member.id})\`
   ${client.emojis.cache.get(zil)} **Yetkili**: ${message.author} - \`(${message.author.id})\`
   ${client.emojis.cache.get(toplar)} **Sebep**: \`${reason}\` 
    `)]})
} catch {
    message.channel.send({ embeds: [embed.setDescription(`Bu kullanıcıyı jail'e atamadım!`)]})}
   
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['hapis'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'jail',
    description: 'jailcik',
    usage: '',
    emoji: "ℹ"
  };