<?php

// Initialize session if not already started
session_start();

// Check if events array is set in session, if not, initialize it
if (!isset($_SESSION['events'])) {
    $_SESSION['events'] = [];
}

// Get events from session
$events = $_SESSION['events'];

// Check if the request is a POST request with new event data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input data
    $date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_STRING);
    $event = filter_input(INPUT_POST, 'event', FILTER_SANITIZE_STRING);

    // Add new event to the events array
    $events[$date][] = $event;

    // Update events in session
    $_SESSION['events'] = $events;

    // Send success response
    echo json_encode(['status' => 'success']);
    exit;
}

// Return events as JSON for initial calendar rendering
echo json_encode($events);
