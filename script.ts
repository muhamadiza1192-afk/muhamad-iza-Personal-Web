// Interface untuk tipe data draf form
interface FormDraft {
  nama: string;
  email: string;
  subjek: string;
  pesan: string;
}

// Key untuk penyimpanan di LocalStorage
const STORAGE_KEY = 'contact_form_draft';

// 1. Ambil elemen DOM dengan Type Casting
const contactForm = document.getElementById('contactForm') as HTMLFormElement | null;
const nameInput = document.getElementById('nama') as HTMLInputElement | null;
const emailInput = document.getElementById('email') as HTMLInputElement | null;
const subjectInput = document.getElementById('subjek') as HTMLInputElement | null;
const messageInput = document.getElementById('pesan') as HTMLTextAreaElement | null;

// FUNGSI A: Simpan Input ke LocalStorage menggunakan JSON.stringify
function saveDraft(): void {
  const formData: FormDraft = {
    nama: nameInput?.value || '',
    email: emailInput?.value || '',
    subjek: subjectInput?.value || '',
    pesan: messageInput?.value || ''
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// FUNGSI B: Muat Input dari LocalStorage menggunakan JSON.parse
function loadDraft(): void {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const formData: FormDraft = JSON.parse(savedData);
      if (nameInput) nameInput.value = formData.nama || '';
      if (emailInput) emailInput.value = formData.email || '';
      if (subjectInput) subjectInput.value = formData.subjek || '';
      if (messageInput) messageInput.value = formData.pesan || '';
    } catch (error) {
      console.error('Gagal membaca data draf JSON:', error);
    }
  }
}

// 2. Pasang Event Listener 'input' untuk Otomatis Menyimpan Draf
[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
  if (input) {
    input.addEventListener('input', saveDraft);
  }
});

// 3. Event Listener saat Form di-submit (Pengiriman WhatsApp)
if (contactForm) {
  contactForm.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Mencegah reload halaman

    if (!nameInput || !emailInput || !subjectInput || !messageInput) {
      alert('Terjadi kesalahan pada formulir.');
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !subject || !message) {
      alert('Harap isi semua kolom sebelum mengirim pesan!');
      return;
    }

    // Nomor WhatsApp tujuan (tanpa tanda +)
    const phoneNumber = '6281219735165';

    // Format pesan menggunakan Template Literal
    const whatsappMessage = `Halo! Ada pesan baru dari Personal Website kamu:%0A%0A` +
      `*Nama:* ${encodeURIComponent(name)}%0A` +
      `*Email:* ${encodeURIComponent(email)}%0A` +
      `*Subjek:* ${encodeURIComponent(subject)}%0A` +
      `*Pesan:* %0A${encodeURIComponent(message)}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');

    // Hapus draf di LocalStorage & reset formulir setelah terkirim
    localStorage.removeItem(STORAGE_KEY);
    contactForm.reset();
  });
}

// 4. Panggil fungsi loadDraft saat halaman pertama kali dibuka
loadDraft();