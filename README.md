# Historical Places App

This project is a React-based app to showcase historical places, with data fetched from Firebase. Users can view details, mark places as visited, and navigate through a slider to explore different historical sites.

Features

- Display a list of historical places in a responsive slider
- Mark places as visited, with visual indicators for visited places
- Navigate to place details without reloading the page
- Random place suggestion
- Firebase integration for data management

Getting Started
These instructions will guide you on setting up and running the app.

Prerequisites
Node.js (version 12 or higher recommended)
Firebase Project (for Firestore and other Firebase features)

Testing the App
Sample data in the Firestore places collection in Firebase, where each document should have the following fields:

- id: Unique identifier (e.g., place1)
- name: Name of the historical place
- description: Description of the place
- image: URL of the image
- visited: Boolean indicating if the place has been visited

Installation:

- git clone https://github.com/azrain-dev/historical-places-app.git
- cd historical-places-app
- npm install
- create .env file (You can use the .env file that I have already provided)

Run the app:

- npm run dev

Testing Features:

- Open the app at http://localhost:5173.
- Verify that the slider works smoothly, showing different historical places.
- Click on a place "View Details" button to view details.
- Test the "Back" button to return to the homepage.
- Mark a place as visited, confirm in the popup, and check the visual indicator change. This features working in homepage and view details page.
- Fun features as requested. Click "Random Suggestion" button. The slider will pick a random place to suggest and display to you.

Technologies Used:

- React
- Vite
- Firebase
- React Router
- Redux
