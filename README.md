🌤️ Weather Dashboard – React Project Overview

Project Description:

This is a responsive Weather Dashboard built using React that provides real-time weather updates using the OpenWeatherMap API. Users can search for any city to view the current weather, a 5-day forecast, and optionally save cities as favorites for quick access. It includes support for unit toggling between Celsius and Fahrenheit, dark/light mode themes, and persists user preferences.

Key Features:

City Weather Search:

Search any city using the search bar.

Fetches current weather and forecast from OpenWeatherMap API.

Handles invalid city errors gracefully.

Current Weather Display:

City Name & Country.

Temperature (°C or °F).

Weather Condition (e.g., Clear, Rain).

Humidity, Wind Speed, Pressure, Visibility.

Weather icon & "Feels Like" temperature.

5-Day Forecast:

Displays a 5-day forecast in card format.

Includes daily min and max temperatures.

Unit Toggle:

Users can switch between °C and °F.

Favorites Feature:

Add or remove cities as favorites.

Favorites are stored in local storage.

Dark/Light Mode:

Toggle between dark and light themes.

Persistent across sessions.

Responsive Design:

Works across mobile, tablet, and desktop devices.

##Tech Stack:

Frontend: React (with Hooks)

Styling: Native CSS

State Management: React Context API

API: OpenWeatherMap API

Deployment: Vercel

How to Install and Run Locally:

Clone the Repository:

bash
Copy
Edit
git clone https://github.com/sachintambehwar/weatherApp
cd weather-dashboard
Install Dependencies:

npm install
Set Up Environment Variables:

Create a .env file in the root folder.

Add your OpenWeatherMap API key:

npm run dev
