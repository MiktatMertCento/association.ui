# DernekX - Dernek Yönetim Sistemi

DernekX, derneklerin yönetim süreçlerini dijitalleştiren ve modernleştiren bir web uygulamasıdır. React ve Firebase teknolojileri kullanılarak geliştirilmiş modern bir yönetim panelidir.

## 🚀 Özellikler

- 🔐 Güvenli Kimlik Doğrulama Sistemi
- 👥 Rol Tabanlı Yetkilendirme (SA, Admin, Editor, Guest)
- 📊 Modern ve Responsive Arayüz
- 🔄 Real-time Veri Senkronizasyonu
- 📱 Mobil Uyumlu Tasarım
- 🌐 Firebase Entegrasyonu

## 🛠️ Kullanılan Teknolojiler

- React.js
- Firebase (Authentication, Firestore, Storage)
- Redux
- Material-UI
- Axios
- JWT Authentication

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Firebase Hesabı

## 🔧 Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd dernekx
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Çevresel değişkenleri ayarlayın:
   - `.env.example` dosyasını `.env` olarak kopyalayın
   - Firebase yapılandırma bilgilerinizi `.env` dosyasına ekleyin

4. Uygulamayı başlatın:
```bash
npm start
# veya
yarn start
```

## 🏗️ Proje Yapısı

```
src/
├── app/
│   ├── auth/         # Kimlik doğrulama bileşenleri
│   ├── components/   # Genel bileşenler
│   ├── contexts/     # React context'leri
│   ├── hooks/        # Özel React hook'ları
│   ├── redux/        # Redux store ve reducer'lar
│   ├── services/     # API servisleri
│   ├── styles/       # Stil dosyaları
│   └── views/        # Sayfa bileşenleri
├── config.js         # Firebase yapılandırması
├── fake-db/         # Test verileri
└── utils.js         # Yardımcı fonksiyonlar
```

## 👥 Kullanıcı Rolleri

- **SA (Super Admin)**: Tam yetkili kullanıcı
- **Admin**: Yönetici yetkileri
- **Editor**: Sınırlı düzenleme yetkileri
- **Guest**: Sadece görüntüleme yetkileri

## 🔒 Güvenlik

- JWT tabanlı kimlik doğrulama
- Rol tabanlı erişim kontrolü
- Hassas bilgiler için çevresel değişkenler
- Firebase güvenlik kuralları

## 🤝 Katkıda Bulunma

1. Bu depoyu fork'layın
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit'leyin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push'layın (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun

## 📝 Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.