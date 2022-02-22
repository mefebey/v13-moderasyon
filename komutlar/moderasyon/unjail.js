const Discord = require('discord.js');
const db = require("quick.db");
const ayarlar = require("../../ayarlar.json")
exports.run = async(client, message, args) => {
    let tik = ayarlar.tik 
    let duyuru = ayarlar.duyuru
    let zil = ayarlar.zil
    const kanal = ayarlar.jailLog
    const rol = ayarlar.jailRol
    const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor({
                name: message.member.displayName, 
                iconURL: client.user.displayAvatarURL({	dynamic: true,	})	})
            .setTimestamp()
    if (!message.member.permissions.has("KICK_MEMBERS") && !message.member.roles.cache.has(ayarlar.jailPerm)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için \`ÜYELERİ_AT\` yetkin olmalı!`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    const jailKontrol = ayarlar.jailLog
    const jailKontrol2 = ayarlar.jailRol
    if(!jailKontrol && !jailKontrol2) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription("Komutu kullanabilmek için jail-sistemini ayarlaman lazım.")]}) 
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle kullanıcıyı belirtmelisin.")] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (!member.roles.cache.get(rol)) return message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı zaten cezalandırılmamış.`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    try {
    await member.roles.remove(rol)
    await message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından karantinadan alındı.`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    await message.react(tik)
    await client.channels.cache.get(kanal).send({ embeds: [
        embed.setDescription(`     
    Birisi karantinadan çıkartıldı!

   ${client.emojis.cache.get(duyuru)} **Kullanıcı**: ${member ? member.toString() : ""} - \`(${member.id})\`
   ${client.emojis.cache.get(zil)} **Yetkili**: ${message.author} - \`(${message.author.id})\`
    `)]})
} catch {
    message.channel.send({ embeds: [embed.setDescription(`Bu kullanıcıyı jail'den çıkartmadım!`)]})}
   
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['hapis-çıkar'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'unjail',
    description: 'jailcik',
    usage: '',
    emoji: "ℹ"
  };