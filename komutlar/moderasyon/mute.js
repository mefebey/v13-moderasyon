const Discord = require('discord.js');
const ms = require("ms");
const db = require('quick.db')
const ayarlar = require('../../ayarlar.json')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db/systems.json');
const sdb = low(adapter);

exports.run = async (client, message, args) => {

          	if(!message.member.permissions.has("BAN_MEMBERS") && !message.member.roles.cache.has(ayarlar.mutePerm)) return message.channel.send({embeds: [
                     new Discord.MessageEmbed()
                       .setColor("#ff0000")
                       .setTimestamp()
                       .setDescription(`Bu komudu kullanabilmek için \`ÜYELERİ_BANLA\` yetkisine veya <@&${ayarlar.mutePerm}> sahip olman gerek.`)]})
              var msg = message;
              sdb.read()
              var muterole1 = db.fetch(`muteroluid_${message.guild.id}`);
              var muterole2 = message.guild.roles.cache.find(r => r.id === muterole1);
              if (!muterole2) {
                  try {
                   muterole2 = await message.guild.roles.create({
                              name: "Muted",
                              color: "#1800FF",
                              permissions: [],
                            
                          reason: 'Mrk Mute Rolü'
                          })
                      db.set(`muteroluid_${message.guild.id}`, muterole2.id);
                      message.guild.channels.cache.forEach(async (channel) => {
                          await channel.permissionOverwrites.create(muterole2, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false,
                                CONNECT: false
                            });
                        });
              } catch (err) {
                  console.log(err);
              }
              };



      var hata1 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription('susturmam için bir kullanıcı belirt');









            let kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
              if (!kisi) return message.reply({embeds: [hata1]});
              if(kisi.id === message.author.id) return message.channel.send(' ``Kendi kendine mute atamazsın!``')
             if(kisi.permissions.has("BAN_MEMBERS")) return message.channel.send(' ``Yetkiliye mute atamazsın!``')
             if(kisi.id === client.user.id) return message.channel.send(' ``Yemezler koçum...``')
             if(kisi.roles.cache.has(muterole1)) return message.channel.send(' ``Bu kullanıcı zaten susturulmuş!``')
             var time = args[1];
              var reason = args.slice(2).join(" ")
              if (!time) {
                  if(reason) {
                      if(!sdb.get('mute').find({guild: message.guild.id, user: kisi.id}).value()) {
                          let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: reason, time: "INFINITY", finishtime: "INFINITY"}
                          sdb.get('mute').push(obj12).write()
                          } else {
                              let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: reason, time: "INFINITY", finishtime: "INFINITY"}
                              sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).assign(obj12).write()
                          }
                          if(!kisi.roles.cache.has(muterole2.id)) await kisi.roles.add(muterole2.id);



                          var hata2 = new Discord.MessageEmbed()
                          .setColor('BLUE')
                          .setDescription(`${kisi} **SINIRSIZ** Şekilde Susturuldu!\nNedeni: **${reason}**\nYetkili: **${message.author}**`);



                      message.channel.send({embeds: [hata2]});
                  } else {
                      if(!sdb.get('mute').find({guild: message.guild.id, user: kisi.id}).value()) {
                          let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: "No Reason Given", time: "INFINITY", finishtime: "INFINITY"}
                          sdb.get('mute').push(obj12).write()
                          } else {
                              let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: "No Reason Given", time: "INFINITY", finishtime: "INFINITY"}
                              sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).assign(obj12).write()
                          }
                          if(!kisi.roles.cache.has(muterole2.id)) await kisi.roles.add(muterole2.id);

                          var hata3 = new Discord.MessageEmbed()
                          .setColor('BLUE')
                          .setDescription(`${kisi} **SINIRSIZ** Şekilde Susturuldu!\nNedeni: **${reason}**\nYetkili: **${message.author}**`);

                      message.channel.send({embeds: [hata3]});
                  };
              } else {
                  let finishtime = Date.now() + ms(time.replace(' dakika', 'm').replace(' saat', 'h').replace(' saniye', 's').replace(' gün', 'd'))
                  if(reason){
                      if(!sdb.get('mute').find({guild: message.guild.id, user: kisi.id}).value()) {
                          let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: reason, time: time, finishtime: finishtime}
                          sdb.get('mute').push(obj12).write()
                          } else {
                              let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: reason, time: time, finishtime: finishtime}
                              sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).assign(obj12).write()
                          }
                          if(!kisi.roles.cache.has(muterole2.id)) await kisi.roles.add(muterole2.id);

                          var hata4 = new Discord.MessageEmbed()
                          .setColor('BLUE')
                          .setDescription(`${kisi} **${time}** Süresince Şekilde Susturuldu!\nNedeni: **${reason}**\nYetkili: **${message.author}**`);

                      message.channel.send({embeds: [hata4]});
                      sdb.read()
                      let bitiszamani = sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).value().finishtime
                      if(bitiszamani && bitiszamani !== null && bitiszamani !== "INFINITY") {
                      let ainterval = setInterval(function() {
                          if(bitiszamani <= Date.now()) {
                              clearInterval(ainterval)
                          if(kisi.roles.cache.find(r => r.id === muterole2.id)){
                              kisi.roles.remove(muterole2.id)
                              sdb.get('mute').remove(sdb.get('mute').find({guild:message.guild.id, user: kisi.id}).value()).write()

                              var hata6 = new Discord.MessageEmbed()
                              .setColor('BLUE')
                              .setDescription(`${kisi} Susturulma Süresi Dolduğu İçin Susturulması Kaldırılmıştır.`);
                            message.channel.send({embeds: [hata6]})
                          }
                      }
                         }, 6000);
                      }
                  } else {
                      if(!sdb.get('mute').find({guild: message.guild.id, user: kisi.id}).value()) {
                          let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: "No Reason Given", time: time, finishtime: finishtime}
                          sdb.get('mute').push(obj12).write()
                          } else {
                              let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: "No Reason Given", time: time, finishtime: finishtime}
                              sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).assign(obj12).write()
                          }
                          if(!kisi.roles.cache.has(muterole2.id)) await kisi.roles.add(muterole2.id);
                          var hata7 = new Discord.MessageEmbed()
                          .setColor('BLUE')
                          .setDescription(`${kisi} **${time}** Süresince Şekilde Susturuldu!\nYetkili: **${message.author}**`);
                      message.channel.send({embeds: [hata7]});
                      sdb.read()
                      let bitiszamani = sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).value().finishtime
                      if(bitiszamani && bitiszamani !== null && bitiszamani !== "INFINITY") {
                      let ainterval = setInterval(function() {
                          if(bitiszamani <= Date.now()) {
                              clearInterval(ainterval)
                              if(kisi.roles.cache.find(r => r.id === muterole2.id)){
                                  kisi.roles.remove(muterole2.id)
                                  sdb.get('mute').remove(sdb.get('mute').find({guild:message.guild.id, user: kisi.id}).value()).write()

                                  var hata9 = new Discord.MessageEmbed()
                                  .setColor('BLUE')
                                  .setDescription(`${kisi} Susturulma Süresi Dolduğu İçin Susturulması Kaldırılmıştır.`);
                                message.channel.send({embeds: [hata9]})
                              }
                          }
                         }, 6000);
                      }
                  }
              };
      };

exports.conf = {
  aliases: ['sustur', 'tempmute', 'mute'],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Sunucudaki Bir Kişiyi Susuturur.',
  usage: 'mute {@kullanici} {zaman} {sebep}'
};
