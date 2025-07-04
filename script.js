const API_KEY = "8f5b249ea6334a0c9bb54946253006";

async function getWeather() {
  const location = document.getElementById("locationInput").value;
  const resultDiv = document.getElementById("result");

  if (!location) {
    resultDiv.innerHTML = "⛔ Please enter a location.";
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      resultDiv.innerHTML = "❌ Could not fetch weather. Try another location.";
      return;
    }

    const data = await response.json();
    const { temp_c, condition } = data.current;
    const city = data.location.name;
    const country = data.location.country;

    resultDiv.innerHTML = `
      <p>📍 <strong>${city}, ${country}</strong></p>
      <p>🌡️ Temperature: <strong>${temp_c}°C</strong></p>
      <p>🌥️ Condition: <strong>${condition.text}</strong></p>
      <img src="${condition.icon}" alt="${condition.text}" />
    `;
  } catch (error) {
    resultDiv.innerHTML = "⚠️ Error fetching weather data.";
    console.error(error);
  }
}
