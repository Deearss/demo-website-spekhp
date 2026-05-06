Prompt: Improve Admin Panel - WebSpec Demo
Yo, gue mau lu bantu improve admin panel di project ini. Ada beberapa hal yang perlu dibenerin dan ditambahin. Kerjain satu-satu dari yang paling critical dulu ya.

🔴 CRITICAL — Fix dulu ini sebelum yang lain

1. Bug Scroll di Halaman Form (Tambah HP & Edit HP)
   Root cause-nya ada di elemen <html> yang punya class h-full. Ini bikin scroll page stuck di tengah form — bagian bawah kayak Sound & Comms, Battery & Misc, sama tombol "Simpan Data" nggak bisa dijangkau sama admin. Fix-nya: hapus h-full dari elemen <html>, atau ubah layout agar konten area bisa scroll dengan benar. Pastiin setelah fix, user bisa scroll semua jalan ke bawah sampai tombol Simpan.

🟠 HIGH PRIORITY — Kerjain abis yang critical 2. Ganti Browser Prompt → Custom Toast Notification
Sekarang konfirmasi delete pakai window.confirm() / window.prompt() bawaan browser yang tampilannya jadul dan nggak branded. Ganti dengan:

Modal konfirmasi custom yang muncul di tengah layar saat admin klik "Hapus", dengan teks kayak "Yakin mau hapus [Nama HP]? Aksi ini tidak bisa dibatalkan." dan dua tombol: Batal (secondary) dan Hapus (merah/danger)
Setelah berhasil hapus, muncul toast notification custom (pojok kanan bawah atau atas, dengan animasi slide-in) yang bilang "HP berhasil dihapus!" warnanya success (hijau atau sesuai design system yang ada)
Toast yang sama juga harusnya muncul setelah berhasil simpan data (tambah/edit), kasih feedback ke admin bahwa aksinya berhasil

3. Auto-generate Slug dari Nama HP
   Di form Tambah/Edit HP, field "Slug (URL-friendly)" sekarang harus diisi manual. Tambahin logic: setiap kali user ngetik di field "Nama HP", field Slug otomatis keisi dengan versi slug-nya (huruf kecil, spasi diganti -, karakter spesial dihapus). Tapi tetap bisa diedit manual kalau user mau override. Contoh: "Samsung Galaxy S25" → samsung-galaxy-s25.
4. Field Brand → Dropdown/Autocomplete
   Sekarang field "Brand" di form itu free-text input, rawan typo. Ganti jadi <select> dropdown yang isinya diambil dari daftar brand yang udah ada di database (Samsung, Apple, Xiaomi, OPPO, Vivo, Realme, OnePlus, Google). Kalau mau lebih keren, bisa pakai combobox yang bisa search + ada opsi "Tambah brand baru" untuk fleksibilitas.
5. Sticky Tombol Simpan + Batal
   Form di halaman Tambah/Edit HP panjang banget (30+ field). Tombol "Simpan Data" dan "Batal" cuma ada di paling bawah, jadi admin harus scroll semua jalan ke bawah setiap mau save. Fix-nya: tambahin tombol Simpan & Batal yang sticky di bagian bawah layar (sticky footer bar), atau duplikat tombolnya di bagian atas form juga. Jadi admin bisa simpan kapan aja tanpa harus scroll.

🟡 MEDIUM — Kerjain setelah yang di atas done 6. Preview Gambar di Form
Field "URL Gambar" cuma input text biasa. Tambahin: setelah user ngetik/paste URL gambar dan blur dari field (atau dengan debounce), tampilkan preview thumbnail kecil di sebelah input. Kalau URL-nya invalid atau gambar gagal load, tampilkan placeholder dengan ikon dan teks "Gambar tidak bisa dimuat". 7. Validasi Real-time di Form
Tambahin validasi yang langsung kasih feedback tanpa harus nunggu submit:

Field wajib (Slug, Nama HP, Brand) dikasih border merah + pesan error kalau dikosongkan
Slug wajib unik — kasih warning kalau slug yang diketik udah dipakai HP lain
Tahun Rilis harus angka yang masuk akal (misalnya antara 2000–2030)

8. Pagination di Daftar HP
   Sekarang semua 50+ HP dirender sekaligus. Tambahin pagination sederhana (misalnya 15–20 HP per halaman) atau infinite scroll, biar page load lebih cepat dan tabelnya nggak terlalu panjang kalau data makin banyak.
9. Sorting Kolom di Tabel
   Header tabel (Nama HP, Brand, Tahun Rilis) bisa diklik untuk sorting ascending/descending. Kasih indikator arrow (▲▼) di header yang aktif di-sort.

🟢 NICE TO HAVE — Kalau ada waktu 10. Breadcrumb Navigation
Tambahin breadcrumb di bawah page title, contoh: Dashboard > Daftar HP > Edit: Galaxy S24+. Buat admin lebih gampang navigasi terutama waktu di halaman edit. 11. Upgrade Dashboard

Tambahin shortcut tombol Edit/Hapus langsung dari tabel "HP Baru Ditambahkan" di Dashboard
Tambahin link "Lihat Semua →" di bawah tabel yang ngarah ke halaman Daftar HP
Tambahin satu stat card lagi: misalnya "HP Ditambahkan Bulan Ini" atau distribusi per brand

12. Empty State untuk Filter/Search
    Kalau admin search nama HP yang nggak ada, atau filter brand yang hasilnya kosong, tampilin empty state yang proper (ikon + teks "Nggak ada HP yang cocok dengan pencarian ini") bukan tabel kosong tanpa keterangan.

Prioritas kerjain dari atas ke bawah ya. Mulai dari bug scroll dulu karena itu yang paling blocking.
