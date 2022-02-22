const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require('../../ayarlar.json')

exports.run = async (bot, message, args) => {
    if(message.guild.id !== ayarlar.sunucuID) return message.channel.send('Bu komut sadece \`DESTEK\` sunucumda çalışmaktadır.')
 
    if(message.member.roles.cache.has(ayarlar.VIP) === true) return message.channel.send(`Zaten \`Gold\` rolün bulunuyor fazlasını ne yapacaksın`)
let kirmizitik = ayarlar.kirmizitik
if (db.has(`üyelikk_${message.author.id}`)) {
      message.channel.send(`${client.emojis.cache.get(kirmizitik)} Başarıyla \`Gold\` rolünü aldınız. Gold durmunuza bakmak isterseniz **.gold-durum** `)
  message.member.roles.add(ayarlar.VIP)
 } else
  message.channel.send('Sistemde sizin adınıza ait gold üye bulunamadı.')
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gold-kontrol','gold-ver','gold-oldum'],
  kategori: 'kullanıcı',
  permLevel: 0
};

exports.help = {
  name: 'gold-kontrol',
  description: 'gold sistemi',
  usage: 'gold',
  emoji: "ℹ"
};