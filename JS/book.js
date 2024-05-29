document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Display confirmation message
        displayConfirmationMessage(data);
    });

    function displayConfirmationMessage(data) {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <div class="confirmation-message">
                <h2>Booking Confirmation</h2>
                <p>Thank you, ${data.fullName}. Your booking has been successfully submitted!</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Destination:</strong> ${data.destination}</p>
                <p><strong>Departure Date:</strong> ${data.departureDate}</p>
                <p><strong>Return Date:</strong> ${data.returnDate}</p>
                <p><strong>Mode of Transport:</strong> ${data.transportMode}</p>
                <p><strong>Travel Class:</strong> ${data.travelClass}</p>
                <p><strong>Special Requests:</strong> ${data.specialRequests}</p>
                <button onclick="window.location.reload();">Book Another Trip</button>
                <button onclick="downloadConfirmationSlip()">Download Confirmation Slip</button>
            </div>
        `;

        // Function to download confirmation slip as PDF
        window.downloadConfirmationSlip = () => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.text('Booking Confirmation', 10, 10);
            doc.text(`Full Name: ${data.fullName}`, 10, 20);
            doc.text(`Email: ${data.email}`, 10, 30);
            doc.text(`Phone: ${data.phone}`, 10, 40);
            doc.text(`Destination: ${data.destination}`, 10, 50);
            doc.text(`Departure Date: ${data.departureDate}`, 10, 60);
            doc.text(`Return Date: ${data.returnDate}`, 10, 70);
            doc.text(`Mode of Transport: ${data.transportMode}`, 10, 80);
            doc.text(`Travel Class: ${data.travelClass}`, 10, 90);
            doc.text(`Special Requests: ${data.specialRequests}`, 10, 100);

            doc.save('confirmation_slip.pdf');
        };
    }

    function addMemberFields() {
        const numAdults = document.getElementById('adults').value;
        const numChildren = document.getElementById('children').value;
        const adultContainer = document.getElementById('adultContainer');
        const childContainer = document.getElementById('childContainer');

        adultContainer.innerHTML = '';
        for (let i = 0; i < numAdults; i++) {
            const div = document.createElement('div');
            div.className = 'form-group member-group';
            div.innerHTML = `
                <h3>Adult ${i + 1}</h3>
                <label for="nameAdult${i}">Full Name</label>
                <input type="text" id="nameAdult${i}" name="nameAdult${i}" required>
                <label for="aadhaarAdult${i}">Aadhaar Number</label>
                <input type="text" id="aadhaarAdult${i}" name="aadhaarAdult${i}" required>
            `;
            adultContainer.appendChild(div);
        }

        childContainer.innerHTML = '';
        for (let i = 0; i < numChildren; i++) {
            const div = document.createElement('div');
            div.className = 'form-group member-group';
            div.innerHTML = `
                <h3>Child ${i + 1}</h3>
                <label for="nameChild${i}">Full Name</label>
                <input type="text" id="nameChild${i}" name="nameChild${i}" required>
                <label for="aadhaarChild${i}">Aadhaar Number</label>
                <input type="text" id="aadhaarChild${i}" name="aadhaarChild${i}" required>
            `;
            childContainer.appendChild(div);
        }
    }

    function updateTravelClassOptions() {
        const transportMode = document.getElementById('transportMode').value;
        const travelClass = document.getElementById('travelClass');

        travelClass.innerHTML = '';

        let options = [];
        if (transportMode === 'air') {
            options = [
                { value: 'economy', text: 'Economy' },
                { value: 'business', text: 'Business' },
                { value: 'first', text: 'First' }
            ];
        } else if (transportMode === 'train') {
            options = [
                { value: 'sleeper', text: 'Sleeper' },
                { value: 'ac3', text: 'AC 3 Tier' },
                { value: 'ac2', text: 'AC 2 Tier' },
                { value: 'ac1', text: 'AC First Class' }
            ];
        } else if (transportMode === 'bus') {
            options = [
                { value: 'regular', text: 'Regular' },
                { value: 'semi-sleeper', text: 'Semi-Sleeper' },
                { value: 'sleeper', text: 'Sleeper' }
            ];
        }

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.text = option.text;
            travelClass.appendChild(opt);
        });
    }

    const adultsField = document.getElementById('adults');
    const childrenField = document.getElementById('children');
    const transportModeField = document.getElementById('transportMode');

    adultsField.addEventListener('change', addMemberFields);
    childrenField.addEventListener('change', addMemberFields);
    transportModeField.addEventListener('change', updateTravelClassOptions);

    addMemberFields();  // Initialize fields on page load
    updateTravelClassOptions();  // Initialize travel class options on page load
});
