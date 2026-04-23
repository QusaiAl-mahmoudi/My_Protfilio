//كود تحقق الارسال عبر البريد الالكتورني
AOS.init({ duration: 800, once: true });

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const spinner = document.getElementById('spinner');
const statusMessage = document.getElementById('statusMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    submitBtn.disabled = true;
    btnText.textContent = "جاري الإرسال...";
    spinner.style.display = "block";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
    })
    .then(async (response) => {
        if (response.status === 200) {
            statusMessage.textContent = " تم الإرسال بنجاح!✅.";
            statusMessage.className = "p-6 rounded-2xl text-center font-bold bg-green-100 text-green-700 block mt-4";
            form.reset();
            setTimeout(() => {
                window.location.href = `https://wa.me/967781319875?text= مرحبا ي بش مهندس ، أنا ${object.name}. رسالة جديدة ${object.service}.`;
            }, 2000);
        } else {
            statusMessage.textContent = "❌ فشل الإرسال، حاول لاحقاً.";
            statusMessage.className = "p-6 rounded-2xl text-center font-bold bg-red-100 text-red-700 block mt-4";
        }
    })
    .catch(() => {
        statusMessage.textContent = "❌ خطأ في الاتصال.";
        statusMessage.className = "p-6 rounded-2xl text-center font-bold bg-red-100 text-red-700 block mt-4";
    })
    .finally(() => {
        submitBtn.disabled = false;
        btnText.textContent = "إرسال";
        spinner.style.display = "none";
    });
});