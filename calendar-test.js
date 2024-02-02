document.addEventListener('DOMContentLoaded', function () {
    // Fetch events from server
    fetchEvents();

    function fetchEvents() {
        fetch('calendar.php')
            .then(response => response.json())
            .then(data => {
                // Render calendar with fetched events
                renderCalendar(data);
            });
    }

    function renderCalendar(events) {
        // Implement your calendar rendering logic here
        // You can use libraries like FullCalendar or build your own

        // Example: Display events in the console
        console.log('Fetched Events:', events);
    }

    // Example: Add event through JavaScript
    // You can replace this with your own UI/interaction logic
    document.getElementById('calendar-container').addEventListener('click', function () {
        const date = '2024-02-01'; // Replace with the selected date
        const event = prompt('Enter event for ' + date);
        if (event !== null && event !== '') {
            // Save the event to the server
            saveEvent(date, event);
        }
    });

    function saveEvent(date, event) {
        // Send a POST request to save the event
        fetch('calendar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                date: date,
                event: event,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Event saved successfully, fetch updated events
                fetchEvents();
            } else {
                console.error('Error saving event:', data);
            }
        });
    }
});
