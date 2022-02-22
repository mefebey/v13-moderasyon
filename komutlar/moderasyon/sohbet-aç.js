const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_CHANNELS"))
    return message.channel.send({embeds: [
      new Discord.MessageEmbed()
        .setColor("#ff0000")
        .addFields({
          name: "Hata", 
         value: `•\`sohbet-aç\`Komutunu kullanabilmek için , \`Kanalları Yönet\` **Yetkisine sahip olmanız gerekir**.`
        })
        .setImage(
          "https://cdn.discordapp.com/attachments/872871069973880833/945372009410482236/unknown.png"
        )
        ]});



  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
  message.channel.permissionOverwrites.create(every, {
    SEND_MESSAGES: null
  });

  const yazı = new Discord.MessageEmbed()
   .setColor('RANDOM')
   .setTimestamp()
   .setDescription('**Sohbet Kanalı `Yazılabilir` Durumuna Getirilmiştir.**')

   message.channel.send({embeds:[yazı]});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["aç"],
  permLevel: 0
};

exports.help = {
  name: 'sohbet-aç',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: '.sohbet-aç',
  emoji: "ℹ"
};
