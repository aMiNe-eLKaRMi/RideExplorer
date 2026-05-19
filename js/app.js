/**
 * RideExplorer - Premium Guided Adventure Logic
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
        stops: ['Atlas Mountain View', 'Traditional Berber Café', 'Sunset Panorama'],
        tag: 'Popular'
    },
    {
        id: 'adv-2',
        title: 'Marrakech → Desert Escape',
        duration: '1 Day',
        difficulty: 'Easy',
        groupSize: '12 Riders',
        date: '25 September 2026',
        price: 180,
        stops: ['Agafay Desert', 'Desert Camp', 'Camel Break Point'],
        tag: 'Recommended'
    },
    {
        id: 'adv-3',
        title: 'Atlas Extreme Expedition',
        duration: '2 Days',
        difficulty: 'Hard',
        groupSize: '6 Riders',
        date: '8 October 2026',
        price: 350,
        stops: ['Rocky Mountain Trails', 'Hidden Villages', 'High Atlas Peaks'],
        tag: 'Elite'
    }
];

const MOTORCYCLES = [
    {
        id: 'moto-1',
        name: 'CF Moto 450 MT',
        power: '44 HP',
        desc: 'Lightweight and nimble, perfect for technical Atlas trails.',
        image: 'https://images.unsplash.com/photo-1539121405283-2bb73027132a?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'moto-2',
        name: 'Honda Africa Twin',
        power: '101 HP',
        desc: 'The ultimate adventure icon. Power meets legendary reliability.',
        image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'moto-3',
        name: 'Yamaha Tenere 700',
        power: '73 HP',
        desc: 'Rally-bred performance for those who seek the pure desert experience.',
        image: 'https://images.unsplash.com/photo-1614165933024-4903366bc907?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'moto-4',
        name: 'BMW R1250 GS Adventure',
        power: '136 HP',
        desc: 'Unmatched comfort and technology for long-distance mountain crossing.',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=800'
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
            <span class="card-tag">${adv.tag}</span>
            <h3 class="card-title">${adv.title}</h3>
            <div class="card-meta">
                <div class="meta-item">⏱ ${adv.duration}</div>
                <div class="meta-item">🏔 ${adv.difficulty}</div>
                <div class="meta-item">👥 ${adv.groupSize}</div>
                <div class="meta-item">📅 ${adv.date}</div>
            </div>
            <ul class="card-stops">
                ${adv.stops.map(stop => `<li>${stop}</li>`).join('')}
            </ul>
            <div class="card-footer">
                <div class="card-price">${adv.price}€</div>
                <button class="btn btn-primary btn-select">Join</button>
            </div>
        </div>
    `).join('');

    // Add click events
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
            <img src="${bike.image}" alt="${bike.name}" class="bike-image">
            <div class="bike-power">${bike.power}</div>
            <h3 class="card-title">${bike.name}</h3>
            <p class="bike-desc">${bike.desc}</p>
            <div class="card-footer">
                <button class="btn btn-primary btn-select" style="width: 100%">Choose this Motorcycle</button>
            </div>
        </div>
    `).join('');

    // Add click events
    document.querySelectorAll('.bike-card').forEach(card => {
        card.addEventListener('click', () => {
            selectedMotorcycle = MOTORCYCLES.find(m => m.id === card.dataset.id);
            updateSelectionUI('.bike-card', card);
            updateSummary();
        });
    });
}

/**
 * Toggle visual selection in UI
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
        summaryContainer.innerHTML = `
            <p class="placeholder-text">Select an adventure and a motorcycle to secure your spot in the group.</p>
        `;
        confirmBtn.disabled = true;
        return;
    }

    summaryContainer.innerHTML = `
        <div class="summary-row">
            <span class="summary-label">Adventure</span>
            <span class="summary-value">${selectedAdventure.title}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Departure Date</span>
            <span class="summary-value">${selectedAdventure.date}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Motorcycle</span>
            <span class="summary-value">${selectedMotorcycle.name}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Group Details</span>
            <span class="summary-value">${selectedAdventure.groupSize} | ${selectedAdventure.duration}</span>
        </div>
        <div class="summary-row total-row">
            <span class="summary-label">Total Experience Price</span>
            <span class="total-value">${selectedAdventure.price}€</span>
        </div>
    `;

    confirmBtn.disabled = false;
}

/**
 * Booking Confirmation
 */
confirmBtn.addEventListener('click', () => {
    confirmBtn.innerHTML = "Booking Confirmed...";
    confirmBtn.style.backgroundColor = "#4CAF50";
    
    setTimeout(() => {
        alert(`Success! Your spot for the "${selectedAdventure.title}" on ${selectedAdventure.date} has been reserved.\n\nYou will ride the ${selectedMotorcycle.name}.\n\nSee you in Morocco!`);
        confirmBtn.innerHTML = "Reserve My Spot";
        confirmBtn.style.backgroundColor = "var(--primary)";
    }, 1000);
});

// --- INITIALIZE ---
function init() {
    renderAdventures();
    renderMotorcycles();
    
    // Smooth reveal on scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

document.addEventListener('DOMContentLoaded', init);
