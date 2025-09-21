import { stays } from "./stays.js";
export function multiHeader() {
  const body = document.body;

  const headerMobile = `
<header id="header-mobile" class="w-full h-35 ms:px-90">
  <img class="py-6 px-3" src="./src/images/icons/logo-f7862584.svg" alt="" />
  <div class="flex-1 flex h-20 items-center justify-center">
    <button class="openModal flex shadow-sm rounded-2xl border border-gray-300">
      <input type="text" id="locationInputMobile" placeholder="Add location" class="px-4 py-4 rounded-l-2xl border border-gray-200 text-sm sm:text-base w-34 cursor-pointer pointer-events-none text-gray-400 placeholder-gray-400" />
      <input type="text" id="guestsInputMobile" placeholder="Add guests" class="px-4 py-3 border border-gray-200 text-sm sm:text-base w-30 cursor-pointer pointer-events-none text-gray-400 placeholder-gray-400" />
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
        <input type="text" id="locationInputTablet" placeholder="Add location" class="px-4 py-4 rounded-l-2xl border border-gray-200 text-sm sm:text-base w-34 cursor-pointer pointer-events-none placeholder-gray-400 text-gray-400" />
        <input type="text" id="guestsInputTablet" placeholder="Add guests" class="text-gray-400 px-4 py-3 border border-gray-200 text-sm sm:text-base w-30 cursor-pointer pointer-events-none placeholder-gray-400" />
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
        <input type="text" id="locationInputPC" placeholder="Add location" class="px-4 py-4 rounded-l-2xl border border-gray-200 text-sm sm:text-base w-40 cursor-pointer pointer-events-none placeholder-gray-400" />
        <input type="text" id="guestsInputPC" placeholder="Add guests" class="text-gray-400 px-4 py-3 border border-gray-200 text-sm sm:text-base w-40 cursor-pointer pointer-events-none placeholder-gray-400" />
        <div class="px-4 py-2 rounded-r-2xl border border-gray-200 flex items-center justify-center">
          <img src="./src/images/icons/search.svg" alt="" width="20" />
        </div>
      </button>
    </div>
  </div>
</header>
`;

  ["header-mobile", "header-tablet", "header-pc"].forEach((id) => {
    const ex = document.getElementById(id);
    if (ex) ex.remove();
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
      mobile?.classList.remove("hidden");
      tablet?.classList.add("hidden");
      pc?.classList.add("hidden");
    } else if (width < 1024) {
      mobile?.classList.add("hidden");
      tablet?.classList.remove("hidden");
      pc?.classList.add("hidden");
    } else {
      mobile?.classList.add("hidden");
      tablet?.classList.add("hidden");
      pc?.classList.remove("hidden");
    }
  }
  handleResize();
  window.addEventListener("resize", handleResize);

  const uniqueLocations = [
    ...new Set(stays.map((s) => `${s.city}, ${s.country}`)),
  ];

  const modalHTML = `
<div id="searchModal" class="fixed inset-0 bg-black/50 hidden items-start justify-center">
  <div class="bg-white w-full h-[90%] p-6 flex flex-col justify-between">
    <div class="flex flex-col overflow-auto">
      <h2 class="text-xl font-bold mb-2">Edit Your Search</h2>
      <div class="flex flex-col w-full">
        <select id="locationSelect" class="w-full rounded-2xl border border-gray-200 px-4 py-3">
          <option value="" disabled selected>Select location</option>
          ${uniqueLocations
            .map((loc) => `<option value="${loc}">${loc}</option>`)
            .join("")}
        </select>
        <p id="totalGuests" class="text-xl border border-gray-200 rounded-2xl py-3 px-4">0</p>
        <div class="flex flex-col gap-4">
          <div>
          <br>
          </br>
            <span>Adults</span>
            <div class="flex items-center gap-2 mt-2">
              <button id="adultMinus" class="px-2 py-1 bg-gray-200">-</button>
              <span id="adultCount">0</span>
              <button id="adultPlus" class="px-2 py-1 bg-gray-200">+</button>
            </div>
          </div>
          <div>
          <br>
            <span>Children</span>
            <div class="flex items-center gap-2 mt-2">
              <button id="childMinus" class="px-2 py-1 bg-gray-200">-</button>
              <span id="childCount">0</span>
              <button id="childPlus" class="px-2 py-1 bg-gray-200">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-4 gap-3">
      <button id="closeModal" class="px-5 py-3 bg-gray-200 rounded-2xl">Close</button>
      <button id="filterBtn" class="px-5 py-3 bg-[#eb5757] text-white rounded-2xl">Filter</button>
    </div>
  </div>
</div>
`;

  const modalHTML_PC = `
<div id="searchModalPC" class="fixed inset-0 bg-black/50 hidden z-50">
  <div class="bg-white w-full h-[55%] p-8 flex flex-col">
    <h2 class="text-2xl font-bold mb-6">Edit Your Search</h2>
    <div class="flex gap-8 flex-1 overflow-auto">
      <div class="flex-1 flex flex-col">
        <label for="locationSelectPC">Location</label>
        <select id="locationSelectPC" class="w-full rounded-2xl border px-4 py-3">
          <option value="" disabled selected>Select location</option>
          ${uniqueLocations
            .map((loc) => `<option value="${loc}">${loc}</option>`)
            .join("")}
        </select>
      </div>
      <div class="flex-1 flex flex-col">
        <label for="totalGuestsPC">Guests</label>
        <p id="totalGuestsPC" class="text-lg border rounded-2xl py-3 px-4">0</p>
        <div class="flex flex-col gap-6 mt-4">
          <div>
          <br>
          </br>
            <span>Adults</span>
            <div class="flex items-center gap-3 mt-2">
              <button id="adultMinusPC" class="px-3 py-1 bg-gray-200 rounded">-</button>
              <span id="adultCountPC">0</span>
              <button id="adultPlusPC" class="px-3 py-1 bg-gray-200 rounded">+</button>
            </div>
          </div>
          <div>
          <br>
            <span>Children</span>
            <div class="flex items-center gap-3 mt-2">
              <button id="childMinusPC" class="px-3 py-1 bg-gray-200 rounded">-</button>
              <span id="childCountPC">0</span>
              <button id="childPlusPC" class="px-3 py-1 bg-gray-200 rounded">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-4 mt-6">
      <button id="closeModalPC" class="px-6 py-3 bg-gray-200 rounded-xl text-sm">Close</button>
      <button id="filterBtnPC" class="flex items-center gap-3 px-6 py-3 bg-[#eb5757] text-white rounded-xl text-sm">Filter</button>
    </div>
  </div>
</div>
`;

  ["searchModal", "searchModalPC"].forEach((id) => {
    const ex = document.getElementById(id);
    if (ex) ex.remove();
  });

  body.insertAdjacentHTML("beforeend", modalHTML);
  body.insertAdjacentHTML("beforeend", modalHTML_PC);

  const modal = document.getElementById("searchModal");
  const modalPC = document.getElementById("searchModalPC");

  document.querySelectorAll(".openModal").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (window.innerWidth >= 1024 && modalPC) {
        modalPC.classList.remove("hidden");
        modalPC.classList.add("flex");
      } else if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
      }
    });
  });

  document.getElementById("closeModal")?.addEventListener("click", () => {
    modal?.classList.add("hidden");
    modal?.classList.remove("flex");
  });
  document.getElementById("closeModalPC")?.addEventListener("click", () => {
    modalPC?.classList.add("hidden");
    modalPC?.classList.remove("flex");
  });

  let adults = 0,
    children = 0;

  function updateGuests() {
    const total = adults + children;

    ["adultCount", "childCount", "totalGuests"].forEach((id) => {
      const el = document.getElementById(id);
      if (el)
        el.textContent =
          id === "adultCount" ? adults : id === "childCount" ? children : total;
    });

    ["adultCountPC", "childCountPC", "totalGuestsPC"].forEach((id) => {
      const el = document.getElementById(id);
      if (el)
        el.textContent =
          id === "adultCountPC"
            ? adults
            : id === "childCountPC"
            ? children
            : total;
    });

    const totalText = total > 0 ? `${total} Guests` : "Add guests";
    ["guestsInputMobile", "guestsInputTablet", "guestsInputPC"].forEach(
      (id) => {
        const el = document.getElementById(id);
        if (el) el.value = totalText;
      }
    );
  }

  ["adultPlus", "adultMinus", "childPlus", "childMinus"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", () => {
      if (id.includes("Plus")) id.includes("adult") ? adults++ : children++;
      else
        id.includes("adult")
          ? (adults = Math.max(0, adults - 1))
          : (children = Math.max(0, children - 1));
      updateGuests();
    });
  });
  ["adultPlusPC", "adultMinusPC", "childPlusPC", "childMinusPC"].forEach(
    (id) => {
      document.getElementById(id)?.addEventListener("click", () => {
        if (id.includes("Plus")) id.includes("adult") ? adults++ : children++;
        else
          id.includes("adult")
            ? (adults = Math.max(0, adults - 1))
            : (children = Math.max(0, children - 1));
        updateGuests();
      });
    }
  );
  updateGuests();

  let staysContainer = document.getElementById("staysContainer");
  if (!staysContainer) {
    staysContainer = document.createElement("div");
    staysContainer.id = "staysContainer";
  }

  function renderStays(staysToRender) {
    staysContainer.innerHTML = "";
    staysToRender.forEach((stay) => {
      const card = document.createElement("div");
      card.className = "border rounded-lg p-4 shadow";
      card.innerHTML = `
        <h3 class="font-bold">${stay.city}, ${stay.country}</h3>
        <p>Max Guests: ${stay.maxGuests}</p>
      `;
      staysContainer.appendChild(card);
    });
  }

  renderStays(stays);

  function filterAndRender() {
    const location =
      document.getElementById("locationSelect")?.value ||
      document.getElementById("locationSelectPC")?.value;
    const totalGuests = adults + children;

    const filtered = stays.filter((stay) => {
      const matchLocation = location
        ? `${stay.city}, ${stay.country}` === location
        : true;
      const matchGuests = stay.maxGuests >= totalGuests;
      return matchLocation && matchGuests;
    });

    renderStays(filtered);

    modal?.classList.add("hidden");
    modal?.classList.remove("flex");
    modalPC?.classList.add("hidden");
    modalPC?.classList.remove("flex");
  }

  document
    .getElementById("filterBtn")
    ?.addEventListener("click", filterAndRender);
  document
    .getElementById("filterBtnPC")
    ?.addEventListener("click", filterAndRender);
}
