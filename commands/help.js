module.exports = {
  name: "help",
  description: "Tüm mevcut komutları göster",
  async execute(message, args, client) {
    if (!message.guild) {
      return message.reply("Bu komut sadece sunucu içinde kullanılabilir!");
    }

    const yardimEmbed = {
      color: 0xff0000,
      title: "🔥 BOTORIA - Komut Listesi",
      description:
        "Güçlü sunucu yönetim komutları - Sadece sunucu içinde çalışır",
      fields: [
        {
          name: ".ban",
          value: "Sunucudaki tüm üyeleri ve botları banla",
          inline: false,
        },
        {
          name: "👢 .kick",
          value: "Sunucudaki tüm üyeleri at",
          inline: false,
        },
        {
          name: "💥 .nuke",
          value:
            "Tüm kanalları siler ve Yeni kanallar açar Açılan kanallara spam atar",
          inline: false,
        },
        {
          name: ".dm <mesaj>",
          value: "Tüm üyelere mesaj gönder\nÖrnek: `.dm Merhaba herkese!`",
          inline: false,
        },
        {
          name: "❓ .help",
          value: "Bu yardım mesajını göster",
          inline: false,
        },
      ],
      footer: {
        text: "Zypheris.",
      },
      timestamp: new Date(),
    };

    try {
      await message.reply({ embeds: [yardimEmbed] });
    } catch (error) {
      const yardimMetni = `🔥 **BOTORIA - Komut Listesi**

 **.ban** - Tüm üyeleri ve botları banla
 **.kick** - Tüm üyeleri at  
 **.nuke** - Tüm kanalları sil ve spam yap
 **.dm <mesaj>** - Tüm üyelere DM gönder
❓ **.help** - Bu yardımı göster

**Kullanım:** Sadece sunucu içinde çalışır!

⚠️ **Uyarı:**Yaptığınız işlerden Botoria Development sorumlu değildir`;

      message.reply(yardimMetni);
    }
  },
};
