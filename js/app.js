/**
 * RideExplorer - Premium Guided Adventure Logic (Midnight Gold Edition)
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
        tag: 'Popular',
        image: 'https://images.unsplash.com/photo-1597212618440-806262de4fe6?auto=format&fit=crop&q=80&w=800'
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
        tag: 'Recommended',
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
        stops: ['Rocky Mountain Trails', 'Hidden Villages', 'High Atlas Peaks'],
        tag: 'Elite',
        image: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&q=80&w=800'
    }
];

const MOTORCYCLES = [
    {
        id: 'moto-1',
        name: 'CF Moto 450 MT',
        power: '44 HP',
        desc: 'Lightweight and nimble, perfect for technical Atlas trails.',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800'
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
const header = document.getElementById('header');

// --- FUNCTIONS ---

/**
 * Render Adventure Cards
 */
function renderAdventures() {
    advContainer.innerHTML = ADVENTURES.map(adv => `
        <div class="card adventure-card" data-id="${adv.id}">
            <div class="card-img-container">
                <img src="${adv.image}" alt="${adv.title}" class="card-image">
            </div>
            <div class="card-body">
                <span class="card-tag">${adv.tag}</span>
                <h3 class="card-title">${adv.title}</h3>
                <div class="card-meta">
                    <span>⏱ ${adv.duration}</span>
                    <span>🏔 ${adv.difficulty}</span>
                </div>
                <ul class="card-stops">
                    ${adv.stops.map(stop => `<li>${stop}</li>`).join('')}
                </ul>
                <div class="card-footer">
                    <div class="card-price">${adv.price}€</div>
                    <button class="btn btn-select">Join Experience</button>
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
            <div class="card-img-container">
                <img src="${bike.image}" alt="${bike.name}" class="card-image">
            </div>
            <div class="card-body">
                <span class="card-tag">${bike.power}</span>
                <h3 class="card-title">${bike.name}</h3>
                <p class="card-stops" style="border: none; padding: 0; margin-bottom: 2rem;">${bike.desc}</p>
                <div class="card-footer">
                    <button class="btn btn-select" style="width: 100%">Select this Machine</button>
                </div>
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
            <p class="placeholder-text" style="color: var(--primary); letter-spacing: 2px; text-transform: uppercase; font-size: 0.8rem;">
                Select your journey and your fleet to reveal the summary.
            </p>
        `;
        confirmBtn.disabled = true;
        return;
    }

    summaryContainer.innerHTML = `
        <div class="summary-row">
            <span class="summary-label">Experience</span>
            <span class="summary-value">${selectedAdventure.title}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Departure</span>
            <span class="summary-value">${selectedAdventure.date}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Machine</span>
            <span class="summary-value">${selectedMotorcycle.name}</span>
        </div>
        <div class="summary-row total-row">
            <span class="summary-label">Final Investment</span>
            <span class="total-value">${selectedAdventure.price}€</span>
        </div>
    `;

    confirmBtn.disabled = false;
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/**
 * Booking Confirmation
 */
confirmBtn.addEventListener('click', () => {
    confirmBtn.innerHTML = "Processing Spot...";
    
    setTimeout(() => {
        alert(`Reservation Confirmed.\n\nJourney: ${selectedAdventure.title}\nMachine: ${selectedMotorcycle.name}\nDate: ${selectedAdventure.date}\n\nPrepare for the Atlas.`);
        confirmBtn.innerHTML = "Reserve My Spot";
    }, 1500);
});

// --- INITIALIZE ---
function init() {
    renderAdventures();
    renderMotorcycles();
    
    // Smooth reveal on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    document.querySelectorAll('.section').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', init);
