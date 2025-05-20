// Game state variables
let residents = [
    { name: 'Alice', task: null },
    { name: 'Bob', task: null },
    { name: 'Charlie', task: null },
    { name: 'Dana', task: null },
    { name: 'Eve', task: null }
];

let resources = 100; // initial resources in the city
let population = residents.length;
let cityGrid = Array(5).fill().map(() => Array(5).fill('empty')); // A 5x5 city grid, all cells start empty

// Helper function to update the resident list on the UI
function updateResidentList() {
    const residentListDiv = document.getElementById('resident-list');
    residentListDiv.innerHTML = ''; // Clear previous list

    residents.forEach((resident, index) => {
        const residentDiv = document.createElement('div');
        residentDiv.innerHTML = `${resident.name} - Current Task: <span id="task-${index}">None</span>`;
        residentListDiv.appendChild(residentDiv);
    });
}

// Helper function to update resident statuses
function updateStatus() {
    const statusList = document.getElementById('status-list');
    statusList.innerHTML = ''; // Clear previous status

    residents.forEach((resident, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${resident.name} is currently: ${resident.task ? resident.task : 'Idle'}`;
        statusList.appendChild(listItem);
    });
}

// Display the current city grid
function displayCityGrid() {
    const cityGridDiv = document.getElementById('city-grid');
    cityGridDiv.innerHTML = ''; // Clear previous grid

    cityGrid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add(cell); // Add class for the type of building (e.g., house, farm)
            cellDiv.onclick = () => selectCell(rowIndex, colIndex); // Select cell to build or remove a building
            cityGridDiv.appendChild(cellDiv);
        });
    });
}

// Handle building or removing structures in the city
function selectCell(row, col) {
    if (resources < 20) {
        alert("Not enough resources to build!");
        return;
    }

    // Toggle between building a house, farm, or factory
    if (cityGrid[row][col] === 'empty') {
        const structure = prompt("Enter structure to build (house, farm, factory):");
        if (structure === 'house' || structure === 'farm' || structure === 'factory') {
            cityGrid[row][col] = structure;
            resources -= 20; // Building costs resources
        } else {
            alert("Invalid structure type.");
        }
    } else {
        // Remove structure
        cityGrid[row][col] = 'empty';
        resources += 10; // Remove structure, get some resources back
    }

    // Update the city grid display and resources
    displayCityGrid();
    document.getElementById('resources').textContent = resources;
}

// Assign tasks to residents
function assignTask(task) {
    for (let i = 0; i < residents.length; i++) {
        if (!residents[i].task) {
            residents[i].task = task;
            break;
        }
    }

    updateResidentList();
    updateStatus();
}

// Simulate the passing of time (advance resources, tasks, etc.)
function advanceTime() {
    // Handle task progress
    residents.forEach(resident => {
        if (resident.task === 'gathering') {
            resources += 10; // Gather resources
        } else if (resident.task === 'building') {
            resources -= 5; // Building costs resources
        } else if (resident.task === 'farming') {
            resources += 15; // Farming increases resources
        }
    });

    // Update UI elements
    document.getElementById('resources').textContent = resources;
    updateStatus();
}

// Initial setup
updateResidentList();
updateStatus();
displayCityGrid();
