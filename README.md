# BOTORIA  DEVELOPMENT

Klasik hızlı bir Patlatma botu

## ⚠️ UYARI
- Bot Kendinden üstün kişilere işlem yapamaz o yüzden Botun rolünü en üste taşıyın veya en üstten bir rol verin

**KENDİ RİSKİNİZLE VE SORUMLULUĞUNUZLA KULLANIN BOTORİA DEVELOPMENT SORUMLU DEĞİLDİR**

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Botu yapılandırın:
   - `config.json` dosyasını düzenleyin
   - Discord Developer Portal'dan bot token'ınızı ekleyin
   - Discord kullanıcı ID'nizi sahip olarak ekleyin
   - İsterseniz nuke mesajını özelleştirin

3. Botu başlatın:
```bash
node index.js
```

## Komutlar

- `.ban` - Tüm üyeleri ve botları banlar
- `.kick` - Tüm üyeleri atar
- `.nuke ` - Tüm Kanalları silip yerine kanal açar açtığı kanallara spam atar 
- `.dm  <mesaj>` - Tüm üyelere DM gönderir
- `.help` - Yardım komutunu gösterir

## Özellikler

- **Sadece sahip erişimi** - Sadece config.json'da belirlediğimiz  sahip id komutları kullanabilir
- **Hızlı çalışma** - İşlemler arasında bekleme süresi yok hızlıca tüm işlemleri yapar
- **Hata yönetimi** - Etkileyemediği üyeleri/kanalları atlar
- **Anlık Konsol** - Hata ve İşlemleri Konsola atar ve işlemleri izlemenize yardımcı olur

## Bot İzinleri Gerekli

- Yönetici (veya özel izinler):
  - Üyeleri Banla
  - Üyeleri At
  - Kanalları Yönet
  - Mesaj Gönder
  - Mesaj Geçmişini Oku

## Uyarı

Bu botun hiç bir türlü satışı yapılamaz  Ve Botun Kullanımından kendiniz sorumlusunuz  Botoria Development sorumlu değildir.