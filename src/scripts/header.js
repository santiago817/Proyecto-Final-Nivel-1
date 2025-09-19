export function multiHeader() {
  const body = document.body;

  const headerMobile = `
    <header id="header-mobile" class="w-full h-35 ms:px-90">
      <img class="py-6 px-3" src="./src/images/icons/logo-f7862584.svg" alt="" />
      <div class="flex-1 flex h-20 items-center justify-center">
        <button class="openModal flex shadow-sm rounded-2xl border border-gray-300">
          <input type="text" placeholder="Add Ubication" class="px-4 py-4 rounded-l-2xl border border-gray-200 text-sm sm:text-base w-34 cursor-pointer pointer-events-none" />
          <input type="text" id="guestsLabel" placeholder="Add guests" class="px-4 py-3 border border-gray-200 text-sm sm:text-base w-30 cursor-pointer pointer-events-none" />
          <div class="px-4 py-2 rounded-r-2xl border border-gray-200 flex items-center justify-center">
            <img src="./src/images/icons/search.png" alt="" width="20" />
          </div>
        </button>
      </div>
    </header>
  `;

  const headerTablet = `
    <header id="header-tablet" class="w-full h-25 px-6 md:px-20 hidden">
      <div class="flex items-center py-5 w-full justify-between">
        <div class="flex">
          <img src="./src/images/icons/logo-f7862584.svg" alt="" />
        </div>
        <div class="flex">
          <button class="openModal flex shadow-sm rounded-2xl border border-gray-300">
            <input type="text" placeholder="Add location" class="px-4 py-4 rounded-l-2xl border border-gray-200 text-sm sm:text-base w-34 cursor-pointer pointer-events-none" />
            <input type="text" id="guestsLabelTablet" placeholder="Add guests" class="px-4 py-3 border border-gray-200 text-sm sm:text-base w-30 cursor-pointer pointer-events-none" />
            <div class="px-4 py-2 rounded-r-2xl border border-gray-200 flex items-center justify-center">
              <img src="./src/images/icons/search.png" alt="" width="20" />
            </div>
          </button>
        </div>
      </div>
    </header>
  `;

  const headerPC = `
    <header id="header-pc" class="w-full h-25 px-10 hidden">
      <div class="flex items-center py-5 w-full justify-between">
        <div class="flex">
          <img src="./src/images/icons/logo-f7862584.svg" alt="" />
        </div>
        <div class="flex">
          <button class="openModal flex shadow-sm rounded-2xl border border-gray-300">
            <input type="text" placeholder="Add location" class="px-4 py-4 rounded-l-2xl border border-gray-200 text-sm sm:text-base w-40 cursor-pointer pointer-events-none" />
            <input type="text" id="guestsLabelPC" placeholder="Add guests" class="px-4 py-3 border border-gray-200 text-sm sm:text-base w-40 cursor-pointer pointer-events-none" />
            <div class="px-4 py-2 rounded-r-2xl border border-gray-200 flex items-center justify-center">
              <img src="./src/images/icons/search.svg" alt="" width="20" />
            </div>
          </button>
        </div>
      </div>
    </header>
  `;

  ["header-mobile", "header-tablet", "header-pc"].forEach((id) => {
    const existing = document.getElementById(id);
    if (existing) existing.remove();
  });

  body.insertAdjacentHTML("afterbegin", headerMobile);
  body.insertAdjacentHTML("afterbegin", headerTablet);
  body.insertAdjacentHTML("afterbegin", headerPC);

  function handleResize() {
    const width = window.innerWidth;
    const mobile = document.getElementById("header-mobile");
    const tablet = document.getElementById("header-tablet");
    const pc = document.getElementById("header-pc");

    if (width < 640) {
      mobile.classList.remove("hidden");
      tablet.classList.add("hidden");
      pc.classList.add("hidden");
    } else if (width < 1024) {
      mobile.classList.add("hidden");
      tablet.classList.remove("hidden");
      pc.classList.add("hidden");
    } else {
      mobile.classList.add("hidden");
      tablet.classList.add("hidden");
      pc.classList.remove("hidden");
    }
  }

  handleResize();
  window.addEventListener("resize", handleResize);

  const stays = [
    { city: "Helsinki", country: "Finland", maxGuests: 3 },
    { city: "Turku", country: "Finland", maxGuests: 5 },
    { city: "Vaasa", country: "Finland", maxGuests: 6 },
    { city: "Oulu", country: "Finland", maxGuests: 2 },
  ];

  const locations = [...new Set(stays.map((s) => `${s.city}, ${s.country}`))];

  const modalHTML = `
<div id="searchModal" class="fixed inset-0 bg-black/50 hidden items-start justify-center">
  <div class="bg-white w-full h-[90%]  p-6 flex flex-col justify-between">
    <div class="flex flex-col overflow-auto">
      <h2 class="text-xl font-bold mb-2">Edit Your Search</h2>

      
      <div class="flex flex-col w-full">
        <!-- Location Selector -->
        <div class="relative w-full mb-0">
          <select 
            id="locationSelect" 
            required 
            class="w-full rounded-2xl border px-4 pt-4 pb-2 appearance-none bg-transparent text-xl"
          >
            <option value="" disabled selected></option>
            ${locations
              .map((loc) => `<option value="${loc}">${loc}</option>`)
              .join("")}
          </select>
          <label 
            for="locationSelect" 
            class="absolute left-4 top-1 text-black text-xs pointer-events-none transition-all duration-200"
          >
            Location
          </label>
        </div>

        
        <div class="relative w-full mt-0">
          <p class="text-xl border rounded-2xl py-4 px-4 pb-2" id="totalGuests">0</p>
          <label 
            for="totalGuests" 
            class="absolute left-4 top-1 text-black text-xs pointer-events-none transition-all duration-200"
          >
            Guests
          </label>
        </div>
      </div>
      <br>

      
      <div class="flex flex-col gap-4 mt-4">
        <div class="flex flex-col items-start gap-2">
          <span>Adults</span>
          <span class="text-gray-400">Ages 13 or above</span>
          <div class="flex items-center gap-2">
            <button id="adultMinus" class="px-2 py-1 bg-gray-200 ">-</button>
            <span id="adultCount">0</span>
            <button id="adultPlus" class="px-2 py-1 bg-gray-200">+</button>
          </div>
        </div>
        <br>
    
        
        <div class="flex flex-col items-start gap-2">
          <span>Children</span>
          <span class="text-gray-400">Ages 13 or above</span>
          <div class="flex items-center gap-2">
            <button id="childMinus" class="px-2 py-1 bg-gray-200 ">-</button>
            <span id="childCount">0</span>
            <button id="childPlus" class="px-2 py-1 bg-gray-200 ">+</button>
          </div>
        </div>
      </div>
    </div>

   <div class="flex justify-between mt-4 gap-2">
  <button id="closeModal" class="px-5 py-5 bg-gray-200 rounded-2xl text-sm">Close</button>
  <button id="filterBtn" class="flex items-center gap-4 px-5 py-5 bg-[#eb5757] text-white rounded-2xl text-sm">
    <img src="./src/images/icons/search.svg" alt="Filter" class="w-4 h-4"/>
    Filter
  </button>
</div>
`;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("searchModal");
  const closeModal = document.getElementById("closeModal");

  document.querySelectorAll(".openModal").forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  let adults = 0,
    children = 0;
  const adultCountEl = document.getElementById("adultCount");
  const childCountEl = document.getElementById("childCount");
  const totalGuestsEl = document.getElementById("totalGuests");

  function updateGuests() {
    adultCountEl.textContent = adults;
    childCountEl.textContent = children;
    totalGuestsEl.textContent = adults + children;

    const mobileLabel = document.getElementById("guestsLabel");
    const tabletLabel = document.getElementById("guestsLabelTablet");
    const pcLabel = document.getElementById("guestsLabelPC");
    const total = adults + children;
    const text = total > 0 ? `${total} Guests` : "Add guests";

    if (mobileLabel) mobileLabel.value = text;
    if (tabletLabel) tabletLabel.value = text;
    if (pcLabel) pcLabel.value = text;
  }

  document.getElementById("adultPlus").addEventListener("click", () => {
    adults++;
    updateGuests();
  });
  document.getElementById("adultMinus").addEventListener("click", () => {
    if (adults > 0) adults--;
    updateGuests();
  });
  document.getElementById("childPlus").addEventListener("click", () => {
    children++;
    updateGuests();
  });
  document.getElementById("childMinus").addEventListener("click", () => {
    if (children > 0) children--;
    updateGuests();
  });
}
