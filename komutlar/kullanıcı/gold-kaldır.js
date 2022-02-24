const db = require('quick.db')
const ayarlar = require("../../ayarlar.json")
const Discord = require('discord.js')
exports.run = async (client, message, args) => {
  if(message.member.id !== ayarlar.sahip) return message.channel.send('Bu komut sadece \`Sahibime\` özeldir.')
  let nesne = args[0]
  if (!nesne) return message.reply('Herhangi bir ID belirtiniz.')
      if(isNaN(nesne)) return message.channel.send("ID girmen gerekiyor!")
  db.delete(`üyelikk_${nesne}`)
  const log = new Discord.MessageEmbed()
  .setColor("RED")
  .setTimestamp()
  .setAuthor({name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true ,}) })
  .setFooter({text: ayarlar.footer})
  .setDescription(`${client.emojis.cache.get(ayarlar.tik)} \`${nesne}\` ID'li Kullanıcının Gold Üyeliği Silindi!`)
  
  message.channel.send(`${client.emojis.cache.get(ayarlar.tik)} **${nesne}** ID'li kişi, özel üyelik sisteminden kaldırıldı.`)
  message.guild.channels.cache.get(ayarlar.sohbet).send(`${client.emojis.cache.get(ayarlar.toplar)} <@${nesne}> Gold üyeliğinizin süresi doldu!`);
  message.client.channels.cache.get(ayarlar.VIPLog).send({embeds: [log]})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gold-kaldır','goldkaldır','goldsil','gold-sil'],
    kategori: 'yapımcı',
  permLevel: 5
};
exports.help = {
  name: 'gold-üye-kaldır',
  description: 'Gold üye siler.',
  usage: 'gold-üye-kaldır',
  emoji: "ℹ"
};
