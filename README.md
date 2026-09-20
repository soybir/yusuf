# Yusuf Mobilya Hesaplama

Bu dal, MIT lisanslı [WoodworkingShop](https://github.com/RajwanYair/WoodworkingShop) projesine uyarlanacak Türkçe atölye özelliklerinin ilk çalışan çekirdeğidir.

## İlk özellik: Tek Delik / Üçlü Delik

Girdiler:

- Dolap iç yüksekliği
- Raf sayısı
- Raf kalınlığı
- Tek Delik veya Üçlü Delik seçimi

Hesap:

```text
Net boşluk = (yükseklik - raf sayısı × raf kalınlığı) ÷ (raf sayısı + 1)
Orta delik(n) = n × net boşluk + (n - 1) × raf kalınlığı
```

Üçlü Delik seçilirse:

- Alt delik = orta delik - 50 mm
- Üst delik = orta delik + 70 mm

## Doğrulama örneği

1762 mm yükseklik, 4 raf ve 19 mm kalınlık için orta delikler:

`337.2 / 693.4 / 1049.6 / 1405.8 mm`

## Çalıştırma

Node.js 22 veya üstü gerekir.

```bash
npm install
npm test
npm run typecheck
```

## Durum

- [x] Hesaplama motoru
- [x] Tek Delik
- [x] Üçlü Delik (50 mm aşağı, 70 mm yukarı)
- [x] Hatalı ölçü kontrolleri
- [x] Otomatik testler
- [ ] WoodworkingShop tam kaynak ağacına entegrasyon
- [ ] Türkçe kullanıcı arayüzü
- [ ] PDF/DXF çıktısına delik ölçüleri
