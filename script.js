const nameBox = document.getElementById("name");
const ageBox = document.getElementById("age");
const result = document.getElementById("result");

load();

function load() {
    const data = JSON.parse(localStorage.getItem("x7-user"));

    if (!data) {
        result.innerHTML = "💜 ยังไม่มีข้อมูล";
        return;
    }

    nameBox.value = data.name;
    ageBox.value = data.age;
    render(data);
}

function save() {
    const name = nameBox.value.trim();
    const age = ageBox.value.trim();

    if (!name || !age) {
        toast("⚠️ กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    const data = { name, age };

    localStorage.setItem("x7-user", JSON.stringify(data));

    render(data);

    toast("💖 บันทึกข้อมูลเรียบร้อย");
}

function render(data) {
    result.innerHTML = `
        <h3>✨ ข้อมูลของคุณ</h3>
        <p>👤 ${data.name}</p>
        <p>🎂 ${data.age} ปี</p>
    `;
}

function clearData() {

    if (!confirm("ล้างข้อมูลทั้งหมด?")) return;

    localStorage.removeItem("x7-user");

    nameBox.value = "";
    ageBox.value = "";

    result.innerHTML = "💜 ยังไม่มีข้อมูล";

    toast("🗑️ ล้างข้อมูลแล้ว");
}

function toast(text) {

    let t = document.createElement("div");

    t.className = "toast";

    t.innerText = text;

    document.body.appendChild(t);

    setTimeout(() => t.classList.add("show"), 10);

    setTimeout(() => {

        t.classList.remove("show");

        setTimeout(() => t.remove(), 250);

    }, 2200);

}

[nameBox, ageBox].forEach(input => {

    input.addEventListener("keydown", e => {

        if (e.key === "Enter") save();

    });

});

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", e => {

        btn.animate([
            { transform: "scale(1)" },
            { transform: "scale(.95)" },
            { transform: "scale(1)" }
        ], {
            duration: 180,
            easing: "ease-out"
        });

        let ripple = document.createElement("span");

        ripple.className = "ripple";

        ripple.style.left = e.offsetX + "px";

        ripple.style.top = e.offsetY + "px";

        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

    });

});
