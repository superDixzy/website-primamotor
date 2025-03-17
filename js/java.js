document.addEventListener("DOMContentLoaded", function () {
    let logoContainer = document.querySelector(".logo-container");
    let mainContent = document.querySelector(".main-content");
    let scrollingContainer = document.querySelector(".scrolling-container");

    // **Pastikan elemen ditemukan**
    if (!logoContainer || !mainContent || !scrollingContainer) return;

    // **Animasi Logo Loading & Masuk ke Laman Utama**
    setTimeout(() => {
        logoContainer.classList.add("hide"); // Fade-out logo
        setTimeout(() => {
            logoContainer.style.display = "none"; // Hilangkan logo dari layar
            mainContent.style.display = "block"; // Tampilkan halaman utama
            setTimeout(() => mainContent.classList.add("show"), 50); // Fade-in halaman utama
            startMarquee(); // Jalankan animasi teks berjalan
        }, 1000);
    }, 3000); // Logo tampil selama 3 detik sebelum menghilang

    // **Fungsi Animasi Teks Berjalan**
    function startMarquee() {
        let textWidth = scrollingContainer.scrollWidth; // Panjang teks berjalan
        let containerWidth = scrollingContainer.parentElement.clientWidth; // Lebar layar

        let pos1 = containerWidth; // **Teks pertama mulai dari luar layar kanan**
        let pos2 = containerWidth + textWidth; // **Teks kedua belum muncul hingga teks pertama keluar**
        let targetPos = (containerWidth / 2) - (textWidth / 2); // **Posisi tengah layar**
        
        let speed = 3; // Kecepatan awal animasi
        let animationStep = 1; // **Menentukan tahap animasi**
        let delayTime = 100; // **Atur waktu jeda sebelum teks kedua masuk (dalam milidetik)**

        function animate() {
            if (animationStep === 1) {
                // **Teks pertama keluar terlebih dahulu**
                pos1 -= speed;
                scrollingContainer.style.transform = `translateX(${pos1}px)`;

                // **Jika teks pertama keluar sepenuhnya dari layar**
                if (pos1 + textWidth <= -50) {
                    animationStep = 2; // **Persiapkan teks kedua**
                    setTimeout(() => { 
                        pos2 = containerWidth; // **Reset posisi teks kedua ke luar layar kanan**
                        animate(); // **Lanjut animasi setelah jeda waktu**
                    }, delayTime);
                    return;
                }
            } else if (animationStep === 2) {
                // **Teks kedua mulai masuk**
                pos2 -= speed;
                scrollingContainer.style.transform = `translateX(${pos2}px)`;

                // **Kurangi kecepatan saat teks kedua mendekati tengah**
                if (pos2 <= targetPos + 50) {
                    speed = Math.max(0.5, speed * 0.9);
                }

                // **Jika teks kedua mencapai tengah, hentikan animasi dengan mulus**
                if (Math.abs(pos2 - targetPos) < 1) {
                    scrollingContainer.style.transform = `translateX(${targetPos}px)`;
                    return; // **Stop animasi di sini**
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    }
});
