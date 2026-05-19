// Data
const trips = [
    {
        id: 'trip-1',
        title: 'Marrakech → Atlas Adventure',
        duration: '6h',
        difficulty: 'Medium',
        price: 120,
        image: 'https://images.unsplash.com/photo-1539121405283-2bb73027132a?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'trip-2',
        title: 'Marrakech → Desert Dunes Ride',
        duration: '1 Day',
        difficulty: 'Easy',
        price: 180,
        image: 'https://images.unsplash.com/photo-1547134306-0569733075d9?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'trip-3',
        title: 'Atlas Mountains Extreme Ride',
        duration: '2 Days',
        difficulty: 'Hard',
        price: 350,
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800'
    }
];

const motorcycles = [
    {
        id: 'bike-1',
        model: 'CF Moto 450',
        power: '46 HP',
        description: 'Compact and agile, perfect for mountain passes.',
        price: 0, // Included in base trip or small fee
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'bike-2',
        model: 'Honda Africa Twin',
        power: '101 HP',
        description: 'The legendary off-road master for any terrain.',
        price: 50,
        image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'bike-3',
        model: 'Yamaha Tenere 700',
        power: '73 HP',
        description: 'Pure adventure spirit with a rally-bred engine.',
        price: 40,
        image: 'https://images.unsplash.com/photo-1614165933024-4903366bc907?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'bike-4',
        model: 'BMW GS 1250',
        power: '136 HP',
        description: 'The king of adventure touring. Luxury meets power.',
        price: 80,
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=800'
    }
];

// State
let selectedTrip = null;
let selectedBike = null;

// DOM Elements
const tripsContainer = document.getElementById('trips-container');
const bikesContainer = document.getElementById('bikes-container');
const bookingSummary = document.getElementById('booking-summary');
const confirmBtn = document.getElementById('confirm-booking');

// Initialize
function init() {
    renderTrips();
    renderBikes();
    updateSummary();
}

function renderTrips() {
    tripsContainer.innerHTML = trips.map(trip => `
        <div class="card trip-card" data-id="${trip.id}">
            <img src="${trip.image}" alt="${trip.title}" class="card-image">
            <h3 class="card-title">${trip.title}</h3>
            <div class="card-info">
                <span>⏱ ${trip.duration}</span> | 
                <span>🏔 ${trip.difficulty}</span>
            </div>
            <div class="card-price">${trip.price}€</div>
        </div>
    `).join('');

    document.querySelectorAll('.trip-card').forEach(card => {
        card.addEventListener('click', () => selectTrip(card.dataset.id));
    });
}

function renderBikes() {
    bikesContainer.innerHTML = motorcycles.map(bike => `
        <div class="card bike-card" data-id="${bike.id}">
            <img src="${bike.image}" alt="${bike.model}" class="card-image">
            <h3 class="card-title">${bike.model}</h3>
            <div class="card-info">
                <strong>Power:</strong> ${bike.power}<br>
                ${bike.description}
            </div>
            <div class="card-price">${bike.price > 0 ? `+${bike.price}€` : 'Included'}</div>
            <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;">Choose this bike</button>
        </div>
    `).join('');

    document.querySelectorAll('.bike-card').forEach(card => {
        card.addEventListener('click', () => selectBike(card.dataset.id));
    });
}

function selectTrip(id) {
    selectedTrip = trips.find(t => t.id === id);
    document.querySelectorAll('.trip-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.id === id);
    });
    updateSummary();
}

function selectBike(id) {
    selectedBike = motorcycles.find(b => b.id === id);
    document.querySelectorAll('.bike-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.id === id);
    });
    updateSummary();
}

function updateSummary() {
    if (!selectedTrip && !selectedBike) {
        bookingSummary.innerHTML = '<p class="placeholder-text">Please select a trip and a motorcycle to see your summary.</p>';
        confirmBtn.disabled = true;
        return;
    }

    const totalPrice = (selectedTrip ? selectedTrip.price : 0) + (selectedBike ? selectedBike.price : 0);

    bookingSummary.innerHTML = `
        <div class="summary-item">
            <span>Selected Trip</span>
            <span>${selectedTrip ? selectedTrip.title : 'Not selected'}</span>
        </div>
        <div class="summary-item">
            <span>Selected Motorcycle</span>
            <span>${selectedBike ? selectedBike.model : 'Not selected'}</span>
        </div>
        ${selectedTrip && selectedBike ? `
            <div class="summary-total">
                Total: ${totalPrice}€
            </div>
        ` : ''}
    `;

    confirmBtn.disabled = !(selectedTrip && selectedBike);
}

confirmBtn.addEventListener('click', () => {
    alert(`Adventure Confirmed!\n\nTrip: ${selectedTrip.title}\nBike: ${selectedBike.model}\nTotal: ${selectedTrip.price + selectedBike.price}€\n\nSee you in Morocco!`);
});

// Run Init
init();
