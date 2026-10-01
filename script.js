"use strict";
const STORAGE_KEY = 'contact_form_draft';
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nama');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subjek');
const messageInput = document.getElementById('pesan');
function saveDraft() {
    const formData = {
        nama: nameInput?.value || '',
        email: emailInput?.value || '',
        subjek: subjectInput?.value || '',
        pesan: messageInput?.value || ''
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
function loadDraft() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            const formData = JSON.parse(savedData);
            if (nameInput)
                nameInput.value = formData.nama || '';
            if (emailInput)
                emailInput.value = formData.email || '';
            if (subjectInput)
                subjectInput.value = formData.subjek || '';
            if (messageInput)
                messageInput.value = formData.pesan || '';
        }
        catch (error) {
            console.error('Gagal membaca data draf JSON:', error);
        }
    }
}
[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (input) {
        input.addEventListener('input', saveDraft);
    }
});
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
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
        const phoneNumber = '6281219735165';
        const whatsappMessage = `Halo! Ada pesan baru dari Personal Website kamu:%0A%0A` +
            `*Nama:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A` +
            `*Subjek:* ${encodeURIComponent(subject)}%0A` +
            `*Pesan:* %0A${encodeURIComponent(message)}`;
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
        window.open(whatsappURL, '_blank');
        localStorage.removeItem(STORAGE_KEY);
        contactForm.reset();
    });
}
loadDraft();
//# sourceMappingURL=script.js.map