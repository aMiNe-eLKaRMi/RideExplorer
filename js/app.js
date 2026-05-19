/**
 * RideExplorer - Cinematic Luxury Edition Logic
 */

// --- DATA ---
const ADVENTURES = [
    {
        id: 'adv-1',
        title: 'Marrakech → Atlas Adventure',
        duration: '6 Hours',
        difficulty: 'Medium',
        groupSize: '8 Riders',
        date: '12 September 2026',
        price: 120,
        stops: ['Atlas Mountains', 'Berber Café', 'Mountain Sunset'],
        image: 'https://images.unsplash.com/photo-1597212618440-806262de4fe6?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'adv-2',
        title: 'Marrakech → Agafay Desert Escape',
        duration: '1 Day',
        difficulty: 'Easy',
        groupSize: '12 Riders',
        date: '25 September 2026',
        price: 180,
        stops: ['Agafay Desert', 'Desert Camp', 'Sunset Viewpoint'],
        image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'adv-3',
        title: 'Atlas Extreme Expedition',
        duration: '2 Days',
        difficulty: 'Hard',
        groupSize: '6 Riders',
        date: '8 October 2026',
        price: 350,
        stops: ['Rocky Trails', 'Hidden Villages', 'High Atlas Peaks'],
        image: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&q=80&w=800'
    }
];

const MOTORCYCLES = [
    {
        id: 'moto-1',
        name: 'CF Moto 450 MT',
        specs: '449cc Touring',
        desc: 'Lightweight off-road touring machine.',
        image: 'https://images.unsplash.com/photo-1539121405283-2bb73027132a?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'moto-2',
        name: 'BMW R1250 GS Adventure',
        specs: '1254cc Boxer',
        desc: 'Premium adventure touring icon.',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'moto-3',
        name: 'Yamaha Tenere 700',
        specs: '689cc CP2',
        desc: 'Rally-inspired adventure legend.',
        image: 'https://images.unsplash.com/photo-1614165933024-4903366bc907?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'moto-4',
        name: 'Honda Africa Twin',
        specs: '1084cc Twin',
        desc: 'Legendary touring adventure master.',
        image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800'
    }
];

// --- STATE ---
let selectedAdventure = null;
let selectedMotorcycle = null;

// --- DOM ELEMENTS ---
const advContainer = document.getElementById('adventures-container');
const bikesContainer = document.getElementById('bikes-container');
const summaryContainer = document.getElementById('booking-summary');
const confirmBtn = document.getElementById('confirm-booking');

// --- FUNCTIONS ---

/**
 * Render Adventure Cards
 */
function renderAdventures() {
    advContainer.innerHTML = ADVENTURES.map(adv => `
        <div class="card adventure-card" data-id="${adv.id}">
            <div class="card-image-container">
                <img src="${adv.image}" alt="${adv.title}" class="card-image">
                <div class="card-overlay"></div>
            </div>
            <div class="card-content">
                <span class="card-date">${adv.date}</span>
                <h3 class="card-title">${adv.title}</h3>
                <div class="card-meta">
                    <div class="meta-item">⏱ ${adv.duration}</div>
                    <div class="meta-item">🏔 ${adv.difficulty}</div>
                    <div class="meta-item">👥 ${adv.groupSize}</div>
                    <div class="meta-item">📍 ${adv.stops.length} Stops</div>
                </div>
                <ul class="card-stops">
                    ${adv.stops.map(stop => `<li>${stop}</li>`).join('')}
                </ul>
                <div class="card-footer">
                    <div class="card-price">${adv.price}€</div>
                    <button class="btn btn-primary" style="padding: 0.8rem 2rem;">Join</button>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.adventure-card').forEach(card => {
        card.addEventListener('click', () => {
            selectedAdventure = ADVENTURES.find(a => a.id === card.dataset.id);
            updateSelectionUI('.adventure-card', card);
            updateSummary();
        });
    });
}

/**
 * Render Motorcycle Cards
 */
function renderMotorcycles() {
    bikesContainer.innerHTML = MOTORCYCLES.map(bike => `
        <div class="card bike-card" data-id="${bike.id}">
            <div class="card-image-container">
                <img src="${bike.image}" alt="${bike.name}" class="card-image">
                <div class="bike-specs">${bike.specs}</div>
                <div class="card-overlay"></div>
            </div>
            <div class="card-content">
                <h3 class="card-title" style="margin-bottom: 0.5rem;">${bike.name}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem;">${bike.desc}</p>
                <button class="btn btn-primary" style="width: 100%">Choose this Motorcycle</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.bike-card').forEach(card => {
        card.addEventListener('click', () => {
            selectedMotorcycle = MOTORCYCLES.find(m => m.id === card.dataset.id);
            updateSelectionUI('.bike-card', card);
            updateSummary();
        });
    });
}

/**
 * Toggle visual selection
 */
function updateSelectionUI(selector, selectedCard) {
    document.querySelectorAll(selector).forEach(c => c.classList.remove('selected'));
    selectedCard.classList.add('selected');
}

/**
 * Update Booking Summary
 */
function updateSummary() {
    if (!selectedAdventure || !selectedMotorcycle) {
        summaryContainer.innerHTML = `<p class="placeholder-text">Select your adventure and your machine to continue.</p>`;
        confirmBtn.disabled = true;
        return;
    }

    summaryContainer.innerHTML = `
        <div class="summary-item">
            <span class="summary-label">Adventure</span>
            <span class="summary-value">${selectedAdventure.title}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Departure Date</span>
            <span class="summary-value">${selectedAdventure.date}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Selected Machine</span>
            <span class="summary-value">${selectedMotorcycle.name}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Group Details</span>
            <span class="summary-value">${selectedAdventure.groupSize} | ${selectedAdventure.duration}</span>
        </div>
        <div class="summary-item total-row">
            <span class="summary-label">Experience Price</span>
            <span class="total-value">${selectedAdventure.price}€</span>
        </div>
    `;

    confirmBtn.disabled = false;
}

/**
 * Confirmation
 */
confirmBtn.addEventListener('click', () => {
    confirmBtn.innerHTML = "Processing Reservation...";
    confirmBtn.style.opacity = "0.7";
    
    setTimeout(() => {
        alert(`Reservation Confirmed.\n\nAdventure: ${selectedAdventure.title}\nMachine: ${selectedMotorcycle.name}\nDate: ${selectedAdventure.date}\n\nSee you in the Atlas.`);
        confirmBtn.innerHTML = "Reserve My Spot";
        confirmBtn.style.opacity = "1";
    }, 1500);
});

// --- INITIALIZE ---
function init() {
    renderAdventures();
    renderMotorcycles();
    
    // Smooth reveal observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', init);
