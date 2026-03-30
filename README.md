# Sports Calendar App

A sports event calendar built with React.js as part of the Sportradar Coding Academy Frontend Exercise.

## Overview

This application allows users to view sports events on a monthly calendar, explore event details, and add new events during runtime. It was built to demonstrate core frontend development skills including component architecture, routing, state management, and responsive design.

## Features

### Core Tasks
- Task 1 – Calendar View: Monthly calendar grid showing sports events with event markers on relevant days
- Task 2 – Event Detail Page: Click any event to view full details including teams, date, time, stage, and result
- Task 3 – Add Event: Form to add new events at runtime which instantly appear on the calendar
- Task 4 – Responsiveness: Fully responsive layout for mobile, tablet, and desktop
- Task 5 – Navigation: Navbar with links to Calendar view and Add Event page

### Optional Features
- Filters: Filter events by sport type, team name, and date range
- Go to Month: Jump directly to any month/year from the sidebar
- Styling: Custom CSS per component with a clean dark theme

## Tech Stack

- React.js
- React Router DOM
- JavaScript (ES6+)
- CSS 

## How to Run

1. Clone the repository:
git clone https://github.com/Toma22-hub/sports-calendar

2. Navigate into the project folder:
cd sports-calendar

3. Install dependencies:
npm install

4. Start the app:
npm start

5. Open your browser at:
http://localhost:3000

## Data

The app uses AFC Champions League 2024 match data provided as a JSON file. Each event includes:
- Home and away teams
- Match date and time (UTC)
- Stage (e.g. Round of 16, Final)
- Result and winner (for played matches)
- Sport type

## Assumptions and Decisions

- Events are stored in memory only — no persistent storage is used as per the exercise requirements
- A sport field was added to each event in the JSON to support the sport filter
- The calendar displays the current month by default, with arrows and a month picker to navigate to other months
- New events added via the form appear immediately on the calendar without page refresh

## Author

Built by Jannatul Nime Toma