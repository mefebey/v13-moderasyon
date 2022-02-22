const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require('../../ayarlar.json')

exports.run = async (client, message, args) => {
let kirmizitik = ayarlar.kirmizitik
  if (db.has(`üyelikk_${message.author.id}`)) {
   message.channel.send(`${client.emojis.cache.get(kirmizitik)} Gold Durum: \`Aktif!\``)
  message.channel.send(`${client.emojis.cache.get(kirmizitik)} Gold Süre: \`Sınırsız!\``)
 } else
  message.channel.send('Sistemde sizin adınıza ait gold üye bulunamadı.')
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['durum','gold-durum','golddurum','goldurum'],
  kategori: 'kullanıcı',
  permLevel: 0
};

exports.help = {
  name: 'gold-durum',
  description: 'gold sistemi',
  usage: 'gold-durum',
  emoji: "ℹ"
};