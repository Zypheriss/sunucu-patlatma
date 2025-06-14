const config = require("../config.json");

module.exports = {
  name: "dm",
  description: "Sunucudaki tüm üyelere mesaj gönder",
  async execute(message, args, client) {
    if (!message.guild) {
      return message.reply("Bu komut sadece sunucu içinde kullanılabilir!");
    }

    const hedefSunucu = message.guild;
    const dmMesaji = args.join(" ");

    if (!dmMesaji) {
      return message.reply("Lütfen gönderilecek mesajı yazın.");
    }

    try {
      await message.react("📨");
      await hedefSunucu.members.fetch();
      const uyeler = hedefSunucu.members.cache;

      let gonderilenSayisi = 0;
      let basarisizSayisi = 0;

      console.log(
        `${hedefSunucu.name} sunucusundaki üyelere DM göndermeye başlıyorum`
      );

      for (const [id, uye] of uyeler) {
        if (!uye.user.bot && uye.id !== client.user.id) {
          try {
            await uye.send(dmMesaji);
            gonderilenSayisi++;
            console.log(`📨 DM gönderildi: ${uye.user.tag}`);
          } catch (error) {
            basarisizSayisi++;
            console.log(`⚠️ DM gönderilemedi: ${uye.user.tag}`);
          }
        }
      }

      const cevap = ` Dm Gönderimi tamamladımmm!\n📨 mesajı toplam gönderdiğim kişi sayısı: ${gonderilenSayisi}\n⚠️ Başarısız ＞︿＜: ${basarisizSayisi}`;

      try {
        message.channel.send(cevap);
      } catch (error) {
        const sahip = await client.users.fetch(config.ownerId);
        sahip.send(`${cevap}\nSunucu: ${hedefSunucu.name}`);
      }
    } catch (error) {
      console.error("DM komutunda hata:", error);
      message.reply("DM komutu çalıştırılırken bir hata oluştu.");
    }
  },
};
