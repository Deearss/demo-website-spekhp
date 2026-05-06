# Task 2: Home Page & SEO Optimization

Target: Memperbagus halaman depan untuk user, memperbaiki layout komponen, dan menambahkan fitur SEO dasar.

## Priority: High (Must Have)
1. **Perbaikan Layout**:
   - Pastikan PhoneGrid di home page rapi di semua ukuran layar (responsive).
   - Pastikan gambar HP di PhoneGrid tidak pecah/melar (gunakan object-contain).
   - Hapus komponen AdBanner jika dirasa mengganggu visual utama, atau ganti dengan dummy banner yang lebih estetik.
2. **SEO Metadata Dasar**:
   - Tambahkan metadata export di `src/app/layout.tsx` (Title, Description).
   - Tambahkan favicon sederhana.

## Priority: Medium (Nice to Have)
3. **Empty State Homepage**: Jika tidak ada HP yang sesuai dengan filter (contoh: cari nama HP yang tidak ada), tampilkan ilustrasi/pesan yang bagus, bukan hanya blank.
4. **Loading Skeleton**: Saat fetching data di homepage, ganti spinner kecil dengan skeleton loading grid yang keren.

## Priority: Low (Optional)
5. **Dark Mode Toggle**: Tambahkan tombol untuk switch ke Light Mode (walaupun tema defaultnya dark).
