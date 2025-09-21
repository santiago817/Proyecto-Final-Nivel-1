import { stays } from "./stays.js";

export function filterStays() {
  const location =
    document.getElementById("locationSelect")?.value ||
    document.getElementById("locationSelectPC")?.value;

  const adults = parseInt(
    document.getElementById("adultCount")?.textContent || 0
  );
  const children = parseInt(
    document.getElementById("childCount")?.textContent || 0
  );
  const totalGuests = adults + children;

  const filtered = stays.filter((stay) => {
    const matchLocation = location
      ? `${stay.city}, ${stay.country}` === location
      : true;
    const matchGuests = stay.maxGuests >= totalGuests;
    return matchLocation && matchGuests;
  });

  const container = document.getElementById("stays-container");
  container.innerHTML = "";

  
  filtered.forEach((stay) => {
    const card = document.createElement("div");
    card.classList.add("stay-card");

    card.innerHTML = `
      <div class="w-full h-66 md:h-60 lg:h-80 overflow-hidden bg-gray-200 rounded-3xl">
        <img class="w-full h-full object-cover" src="${stay.photo}" alt="" />
      </div>       

      <div class="flex items-center gap-3 mt-2 text-sm">
        ${
          stay.superHost
            ? `<button class="text-black px-4 py-1 rounded-full border">SUPERHOST</button>`
            : ""
        }
        <span class="text-gray-500">${stay.type}</span>
        ${
          stay.beds
            ? `<span class="text-gray-500">· ${stay.beds} beds</span>`
            : ""
        }
        <div class="flex items-center gap-1 ml-auto">
          <svg class="w-4 h-4 text-[#eb5757]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.692h3.884c.969 0
                     1.371 1.24.588 1.81l-3.145 2.285 1.2 3.692c.3.921-.755
                     1.688-1.54 1.118L10 13.347l-3.138 2.177c-.785.57-1.84-.197-1.54-1.118
                     l1.2-3.692-3.145-2.285c-.783-.57-.38-1.81.588-1.81h3.884l1.2-3.692z"/>
          </svg>
          <span class="text-gray-700 font-medium">${stay.rating}</span>
        </div>
      </div>

      <h2 class="font-bold text-[#333] mt-2" style="font-family: 'Montserrat', sans-serif">
        ${stay.title}
      </h2>
    `;

    container.appendChild(card);
  });

  document.getElementById("searchModal")?.classList.add("hidden");
  document.getElementById("searchModalPC")?.classList.add("hidden");
}
