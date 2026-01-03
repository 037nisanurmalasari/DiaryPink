// Pakai db yang dikirim dari index.html
const db = window._db;

// SIMPAN DIARY TANPA FOTO
document.getElementById("saveBtn").onclick = async () => {

    const mood = document.getElementById("mood").value;
    const catatan = document.getElementById("catatan").value;

    if (catatan.trim() === "") {
        alert("Isi catatan dulu!");
        return;
    }

    document.getElementById("status").innerHTML = "Menyimpan...";

    // Simpan ke database
    const diaryRef = ref(db, "diary/");
    await push(diaryRef, {
        mood,
        catatan,
        waktu: new Date().toLocaleString()
    });

    document.getElementById("status").innerHTML = "Tersimpan!";
    document.getElementById("catatan").value = "";
};


// TAMPILKAN DIARY
function loadDiary() {
    const diaryRef = ref(db, "diary/");

    onValue(diaryRef, snapshot => {
        const list = document.getElementById("listDiary");
        list.innerHTML = "";

        snapshot.forEach(child => {
            const data = child.val();

            list.innerHTML += `
                <div class="note">
                    <b>${data.waktu}</b> — ${data.mood}<br>
                    ${data.catatan}
                </div>
            `;
        });
    });
}

loadDiary();
