const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require('../../ayarlar.json')

exports.run = async (bot, message, args) => {
    if(message.guild.id !== ayarlar.sunucuID) return message.channel.send('Bu komut sadece \`DESTEK\` sunucumda çalışmaktadır.')
 
    if(message.member.roles.cache.has(ayarlar.VIP) === true) return message.channel.send(`Zaten \`Gold\` rolün bulunuyor fazlasını ne yapacaksın`)

if (db.has(`üyelikk_${message.author.id}`)) {
  try {  
 await message.member.roles.add(ayarlar.VIP)
 await message.channel.send(`Başarıyla \`Gold\` rolünü aldınız. Gold durmunuza bakmak isterseniz **${ayarlar.prefix}gold-durum** `)  
} catch {message.channel.send(`Size rol vermeye yetkim yetmiyor!`)}
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
