// Sample NEO data
const neoData = [
    {
        name: "2024 AB1",
        closestApproachDate: "2024-01-01",
        diameter: 0.5,
        velocity: 25.3,
        distance: 0.002,
        potentialHazard: "Yes",
    },
    {
        name: "2024 AC2",
        closestApproachDate: "2024-03-15",
        diameter: 1.2,
        velocity: 18.5,
        distance: 0.004,
        potentialHazard: "No",
    },
    {
        name: "2024 AD3",
        closestApproachDate: "2024-07-10",
        diameter: 0.8,
        velocity: 22.7,
        distance: 0.006,
        potentialHazard: "Yes",

        name: "392704 (2012 AE1)",
        size: 933.340215038,
        approach_date: "2024-10-07",
        distance: "30498428.282413953"
    },
];

// Populate the NEO table
const neoTableBody = document.getElementById("neoTableBody");
neoData.forEach((neo) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${neo.name}</td>
        <td>${neo.closestApproachDate}</td>
        <td>${neo.diameter}</td>
        <td>${neo.velocity}</td>
        <td>${neo.distance}</td>
        <td>${neo.potentialHazard}</td>
    `;
    neoTableBody.appendChild(row);
});

// Chart.js - Visualization
const ctx = document.getElementById('neoChart').getContext('2d');
const neoChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: neoData.map(neo => neo.name),
        datasets: [{
            label: 'Diameter (km)',
            data: neoData.map(neo => neo.diameter),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Diameter (km)',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
        },
    },
});

// Function to filter NEOs based on user input
function applyFilters() {
    const minDiameter = parseFloat(document.getElementById("minDiameter").value) || 0;
    const maxDiameter = parseFloat(document.getElementById("maxDiameter").value) || Infinity;
    const maxVelocity = parseFloat(document.getElementById("maxVelocity").value) || Infinity;
    const potentialHazard = document.getElementById("potentialHazard").value;

    // Clear existing table
    neoTableBody.innerHTML = '';

    // Filter NEO data
    const filteredNEOs = neoData.filter(neo => {
        const isDiameterInRange = neo.diameter >= minDiameter && neo.diameter <= maxDiameter;
        const isVelocityInRange = neo.velocity <= maxVelocity;
        const isPotentialHazardMatch = potentialHazard === "all" || neo.potentialHazard === potentialHazard;

        return isDiameterInRange && isVelocityInRange && isPotentialHazardMatch;
    });

    // Populate the filtered NEOs into the table
    filteredNEOs.forEach((neo) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${neo.name}</td>
            <td>${neo.closestApproachDate}</td>
            <td>${neo.diameter}</td>
            <td>${neo.velocity}</td>
            <td>${neo.distance}</td>
            <td>${neo.potentialHazard}</td>
        `;
        neoTableBody.appendChild(row);
    });
}

// Event listener for the Apply Filters button
document.getElementById("applyFilters").addEventListener("click", applyFilters);


