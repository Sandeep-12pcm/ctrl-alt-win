document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'YOUR_NASA_API_KEY';
    const startDate = '2024-10-01';
    const endDate = '2024-10-07';

    const tableBody = document.querySelector('#neo-table tbody');

    // Fetch NEO data from NASA API
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const neos = data.near_earth_objects;
            for (let date in neos) {
                neos[date].forEach(neo => {
                    const row = document.createElement('tr');
                    
                    // Name
                    const nameCell = document.createElement('td');
                    nameCell.textContent = neo.name;
                    row.appendChild(nameCell);

                    // Diameter
                    const diameterCell = document.createElement('td');
                    diameterCell.textContent = neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2);
                    row.appendChild(diameterCell);

                    // Velocity
                    const velocityCell = document.createElement('td');
                    velocityCell.textContent = neo.close_approach_data[0].relative_velocity.kilometers_per_hour.toFixed(2);
                    row.appendChild(velocityCell);

                    // Miss Distance
                    const distanceCell = document.createElement('td');
                    distanceCell.textContent = neo.close_approach_data[0].miss_distance.kilometers;
                    row.appendChild(distanceCell);

                    // Append row to the table
                    tableBody.appendChild(row);
                });
            }
        })
        .catch(error => console.error('Error fetching NEO data:', error));
});
