/**
 * RideExplorer - Premium Modern Edition
 */

// --- DATA ---
const ADVENTURES = [
    {
        id: 'adv-1',
        title: 'High Atlas Summit',
        subtitle: 'The Roof of North Africa',
        duration: '6 Hours',
        difficulty: 'Medium',
        price: 120,
        tags: ['Mountain', 'Technical'],
        image: 'https://pictures.altai-travel.com/1920x0/high-atlas-mountains-morocco-istock-3663.jpg'
    },
    {
        id: 'adv-2',
        title: 'Sahara Sunset Dunes',
        subtitle: 'Ride the Golden Waves',
        duration: '1 Day',
        difficulty: 'Easy',
        price: 180,
        tags: ['Desert', 'Landscape'],
        image: 'https://www.shutterstock.com/image-photo/sand-dunes-sahara-desert-amazing-600nw-2459690293.jpg'
    },
    {
        id: 'adv-3',
        title: 'Agafay Rocky Trails',
        subtitle: 'The Hidden Desert',
        duration: '2 Days',
        difficulty: 'Hard',
        price: 350,
        tags: ['Enduro', 'Extreme'],
        image: 'https://desert-maroc.com/wordpress2012/wp-content/uploads//rando-desert-agafay-1024x683.jpg'
    }
];

const MOTORCYCLES = [
    {
        id: 'moto-1',
        name: 'CF Moto 450 MT',
        type: 'Enduro',
        specs: { cc: '449cc', hp: '44hp', weight: '175kg' },
        price: 'Included',
        image: 'https://www.motoplanete.com/CF-Moto/zoom-700px/10690-450-MT-2024-1000px.webp'
    },
    {
        id: 'moto-2',
        name: 'BMW R1250 GS',
        type: 'Premium',
        specs: { cc: '1254cc', hp: '136hp', weight: '249kg' },
        price: '+45€/day',
        image: 'https://images5.1000ps.net/images_bikekat/2019/7-BMW/9550-R_1250_GS_Adventure/001.jpg?format=webp&quality=80&trim.threshold=80&trim.percentpadding=1&scale=both&width=1168&height=664&bgcolor=rgba_39_42_44_0&mode=pad'
    },
    {
        id: 'moto-3',
        name: 'Yamaha Tenere 700',
        type: 'Touring',
        specs: { cc: '689cc', hp: '73hp', weight: '204kg' },
        price: '+25€/day',
        image: 'https://i.pinimg.com/736x/46/de/de/46dede9122cc2f1fd55bbc0d5cd38aea.jpg'
    }
];

// --- STATE ---
let selectedAdventure = null;
let selectedMotorcycle = null;

// --- DOM ELEMENTS ---
const advContainer = document.getElementById('adventures-container');
const bikesContainer = document.getElementById('bikes-container');
const summaryContainer = document.getElementById('booking-summary');
const totalPriceEl = document.getElementById('total-price');
const confirmBtn = document.getElementById('confirm-booking');

// --- FUNCTIONS ---

/**
 * Render Adventure Cards (Storytelling style)
 */
function renderAdventures() {
    advContainer.innerHTML = ADVENTURES.map(adv => `
        <div class="group relative bg-white/5 border border-white/10 rounded-[40px] overflow-hidden transition-all duration-500 hover:border-desert hover:-translate-y-2 trip-card cursor-pointer" data-id="${adv.id}">
            <div class="h-[400px] overflow-hidden relative">
                <img src="${adv.image}" alt="${adv.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div class="absolute top-6 right-6 bg-desert text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                    ${adv.difficulty}
                </div>
            </div>
            <div class="p-10 relative">
                <div class="flex gap-2 mb-4">
                    ${adv.tags.map(tag => `<span class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">${tag}</span>`).join('<span class="text-gray-700">|</span>')}
                </div>
                <h3 class="text-3xl font-black mb-2">${adv.title}</h3>
                <p class="text-gray-400 mb-8 font-light">${adv.subtitle}</p>
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2 text-desert font-bold">
                        <i data-lucide="clock" class="w-4 h-4"></i>
                        ${adv.duration}
                    </div>
                    <div class="text-2xl font-black">${adv.price}€</div>
                </div>
            </div>
            <div class="absolute inset-0 border-2 border-desert opacity-0 group-[.selected]:opacity-100 transition-opacity rounded-[40px] pointer-events-none"></div>
        </div>
    `).join('');

    lucide.createIcons();

    document.querySelectorAll('.trip-card').forEach(card => {
        card.addEventListener('click', () => {
            selectedAdventure = ADVENTURES.find(a => a.id === card.dataset.id);
            document.querySelectorAll('.trip-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            updateSummary();
        });
    });
}

/**
 * Render Motorcycle Cards (Premium specs style)
 */
function renderMotorcycles(filter = 'All Machines') {
    const filtered = filter === 'All Machines' ? MOTORCYCLES : MOTORCYCLES.filter(m => m.type === filter);
    
    bikesContainer.innerHTML = filtered.map(bike => `
        <div class="group bg-white/5 border border-white/10 rounded-[40px] p-8 transition-all duration-500 hover:bg-white/10 bike-card cursor-pointer relative" data-id="${bike.id}">
            <div class="mb-8 overflow-hidden rounded-[30px] h-64 bg-black/40">
                <img src="${bike.image}" alt="${bike.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0">
            </div>
            <div class="flex justify-between items-start mb-6">
                <div>
                    <span class="text-[10px] font-bold uppercase tracking-widest text-desert mb-2 block">${bike.type}</span>
                    <h3 class="text-2xl font-black">${bike.name}</h3>
                </div>
                <div class="text-right">
                    <span class="text-xs text-gray-500 block uppercase">Price</span>
                    <span class="font-bold">${bike.price}</span>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4 py-6 border-t border-white/5">
                <div class="text-center">
                    <span class="block text-[10px] text-gray-500 uppercase mb-1">Engine</span>
                    <span class="font-bold text-sm">${bike.specs.cc}</span>
                </div>
                <div class="text-center border-x border-white/5">
                    <span class="block text-[10px] text-gray-500 uppercase mb-1">Power</span>
                    <span class="font-bold text-sm">${bike.specs.hp}</span>
                </div>
                <div class="text-center">
                    <span class="block text-[10px] text-gray-500 uppercase mb-1">Weight</span>
                    <span class="font-bold text-sm">${bike.specs.weight}</span>
                </div>
            </div>
            <div class="absolute inset-0 border-2 border-desert opacity-0 group-[.selected]:opacity-100 transition-opacity rounded-[40px] pointer-events-none"></div>
        </div>
    `).join('');

    document.querySelectorAll('.bike-card').forEach(card => {
        card.addEventListener('click', () => {
            selectedMotorcycle = MOTORCYCLES.find(m => m.id === card.dataset.id);
            document.querySelectorAll('.bike-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            updateSummary();
        });
    });
}

/**
 * Update Booking Summary Dashboard
 */
function updateSummary() {
    if (!selectedAdventure || !selectedMotorcycle) {
        summaryContainer.innerHTML = `
            <p class="text-gray-500 italic flex items-center gap-3">
                <i data-lucide="info" class="w-5 h-5"></i>
                Waiting for your selection...
            </p>
        `;
        totalPriceEl.innerText = "0€";
        confirmBtn.disabled = true;
        lucide.createIcons();
        return;
    }

    // Calculate extra cost
    let extra = 0;
    if (selectedMotorcycle.price.includes('+')) {
        extra = parseInt(selectedMotorcycle.price.replace('€/day', '').replace('+', ''));
    }
    const total = selectedAdventure.price + extra;

    summaryContainer.innerHTML = `
        <div class="space-y-6">
            <div class="flex justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-desert/20 rounded-xl flex items-center justify-center text-desert">
                        <i data-lucide="map"></i>
                    </div>
                    <div>
                        <span class="text-[10px] uppercase font-bold text-gray-500 block">Selected Trip</span>
                        <span class="font-bold">${selectedAdventure.title}</span>
                    </div>
                </div>
                <div class="text-right">
                    <span class="block text-gray-400 text-sm">${selectedAdventure.price}€</span>
                </div>
            </div>
            <div class="flex justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-desert/20 rounded-xl flex items-center justify-center text-desert">
                        <i data-lucide="bike"></i>
                    </div>
                    <div>
                        <span class="text-[10px] uppercase font-bold text-gray-500 block">Selected Machine</span>
                        <span class="font-bold">${selectedMotorcycle.name}</span>
                    </div>
                </div>
                <div class="text-right">
                    <span class="block text-gray-400 text-sm">${selectedMotorcycle.price}</span>
                </div>
            </div>
            <div class="p-6 bg-desert/10 rounded-2xl border border-desert/20">
                <div class="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-desert mb-2">
                    <i data-lucide="calendar" class="w-4 h-4"></i>
                    Expedition Details
                </div>
                <p class="text-sm text-gray-300">Duration: ${selectedAdventure.duration} | Difficulty: ${selectedAdventure.difficulty}</p>
            </div>
        </div>
    `;

    totalPriceEl.innerText = `${total}€`;
    confirmBtn.disabled = false;
    lucide.createIcons();
}

/**
 * Filter System
 */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active', 'bg-desert', 'text-white', 'shadow-xl', 'shadow-desert/20');
            b.classList.add('bg-white/5', 'border', 'border-white/10');
        });
        btn.classList.add('active', 'bg-desert', 'text-white', 'shadow-xl', 'shadow-desert/20');
        btn.classList.remove('bg-white/5', 'border', 'border-white/10');
        renderMotorcycles(btn.innerText);
    });
});

/**
 * Scroll Reveal & Navbar
 */
function handleScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Reveal Up animations
    document.querySelectorAll('.reveal-up').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            el.classList.add('active');
        }
    });
}

// --- INITIALIZE ---
function init() {
    renderAdventures();
    renderMotorcycles();
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    confirmBtn.addEventListener('click', () => {
        confirmBtn.innerHTML = '<span class="animate-pulse">PROCESSING...</span>';
        setTimeout(() => {
            alert(`Expedition Confirmed!\n\nTrip: ${selectedAdventure.title}\nMachine: ${selectedMotorcycle.name}\nTotal: ${totalPriceEl.innerText}\n\nOur expert guides are preparing your route. See you in Morocco.`);
            confirmBtn.innerText = 'CONFIRM RESERVATION';
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', init);
