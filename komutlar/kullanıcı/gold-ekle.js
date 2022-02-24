const db = require('quick.db')
const ayarlar = require("../../ayarlar.json")
const Discord = require('discord.js')
exports.run = async (client, message, args) => {
  if(message.member.id !== ayarlar.sahip) return message.channel.send('Bu komut sadece \`Sahibime\` özeldir.')
  let nesne = args[0]
  if (!nesne) return message.reply('Herhangi bir ID belirtiniz.')
    if(isNaN(nesne)) return message.channel.send("ID girmen gerekiyor!")
  db.set(`üyelikk_${nesne}`, 'üyelik')
  let kirmizitik = ayarlar.kirmizitik
  const log = new Discord.MessageEmbed()
  .setColor("RED")
  .setTimestamp()
  .setAuthor({ name:message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true, }) })
  .setFooter({text: `${ayarlar.setFooter}` })
  .setDescription(`${client.emojis.cache.get(kirmizitik)} \`${nesne}\` ID'li Kullanıcı Gold Üyeliğe Eklendi`)

  message.channel.send(`${client.emojis.cache.get(kirmizitik)} **${nesne}** ID'li kişi, özel üyelik sistemine eklendi.`)
 message.client.channels.cache.get(ayarlar.VIPLog).send({embeds: [log]})
 message.guild.channels.cache.get(ayarlar.sohbet).send(`${client.emojis.cache.get(ayarlar.kalp)} Tebrikler <@${nesne}>! Gold Üyeliğe hoşgeldin!`);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gold-ekle','goldekle','vipekle','vip'],
    kategori: 'yapımcı',
  permLevel: 5
};
exports.help = {
  name: 'gold-üye-ekle',
  description: 'Gold üye ekler',
  usage: 'gold-üye-ekle',
  emoji: "ℹ"
};
