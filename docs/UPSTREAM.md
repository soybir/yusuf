# Kaynak proje entegrasyonu

Temel alınan proje: [RajwanYair/WoodworkingShop](https://github.com/RajwanYair/WoodworkingShop)

İncelenen sürüm:

- Sürüm: 5.32.0
- Commit: `3f7739449dc5f07431fb38d756ab3d5e55d1b994`
- Teknoloji: React 19, TypeScript 6, Vite 8, Zustand 5, i18next
- Lisans: MIT

## Hazırlanan entegrasyon

Delik hesaplama motoru, kaynak projenin saf TypeScript motor yapısına uygun şekilde hazırlanmıştır. React veya DOM bağımlılığı yoktur. WoodworkingShop tam kaynak ağacı getirildiğinde bu modül `src/engine/` altında kalacak; kullanıcı arayüzü ve Türkçe çeviri anahtarları ayrı adımda bağlanacaktır.
