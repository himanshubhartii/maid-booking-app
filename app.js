const maids = [
  {
    name: "Sunita",
    service: "Cleaning",
    experience: 5,
    contact: "9876543210",
    address: "Andheri East, Mumbai",
    photo: "https://i.imgur.com/1X6RZ9G.png"
  },
  {
    name: "Rekha",
    service: "Cooking",
    experience: 8,
    contact: "9123456780",
    address: "Borivali West, Mumbai",
    photo: "https://i.imgur.com/WxNkK7C.png"
  },
  {
    name: "Anita",
    service: "Cleaning",
    experience: 2,
    contact: "9001122334",
    address: "Malad West, Mumbai",
    photo: "https://i.imgur.com/4YQZ6hF.png"
  }
];

let selectedService = "";
let selectedMaid = null;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function selectService(service) {
  selectedService = service;
  showMaidList();
}

function showMaidList() {
  const list = document.getElementById("maidList");
  list.innerHTML = "";

  const filtered = maids
    .filter(m => m.service === selectedService)
    .sort((a, b) => b.experience - a.experience);

  filtered.forEach(maid => {
    const div = document.createElement("div");
    div.className = "maid-card";

    div.innerHTML = `
      <div style="display:flex;gap:12px;align-items:center;">
        <img src="${maid.photo}" style="width:60px;height:60px;border-radius:50%;">
        <div>
          <h3 style="margin:0;">${maid.name}</h3>
          <p style="margin:4px 0;">${maid.experience} yrs experience</p>
        </div>
      </div>
    `;

    div.onclick = () => {
      selectedMaid = maid;
      showScreen("datetime");
    };

    list.appendChild(div);
  });

  showScreen("maids");
}

function confirmBooking() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!date || !time) {
    alert("Please select date and time");
    return;
  }

  document.getElementById("maidPhoto").src = selectedMaid.photo;
  document.getElementById("maidName").innerText = selectedMaid.name;
  document.getElementById("maidContact").innerText = selectedMaid.contact;
  document.getElementById("maidAddress").innerText = selectedMaid.address;
  document.getElementById("callBtn").href = "tel:" + selectedMaid.contact;

  document.getElementById("bookingMeta").innerText =
    `Service: ${selectedService}
Date: ${date}
Time: ${time}`;

  showScreen("confirmation");
}

function goHome() {
  showScreen("home");
}
