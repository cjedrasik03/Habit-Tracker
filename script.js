
// Grabs the needed DOM elements
const habitsContainer = document.getElementById('habits-container');
const addHabitButton = document.getElementById('add-habit-button');
const totalHabitsElement = document.getElementById('total-habits');

// Counter for total habit/s, then displays it w/in totalHabitsElement
const updateTotalHabits = () => {
    const totalHabits = habitsContainer.children.length;
    totalHabitsElement.textContent = totalHabits;
}
// Function to create entire new habit box
const createHabitElement = () => {
    const habitElement = document.createElement('div');
    habitElement.className = 'habit';

// Creates user text input section for any habit to track
    const habitInput = document.createElement('input');
    habitInput.type = 'text';
    habitInput.className = 'habit-input';
    habitInput.placeholder = 'Enter a habit to track...'

// Drop down selector box for the Habit's status
    const habitStatus = document.createElement('select');
    habitStatus.className = 'habit-status';

// Drop down option 'Incomplete'
    const incompleteOption = document.createElement('option');
    incompleteOption.value = 'incomplete';
    incompleteOption.innerHTML = 'Incomplete';

// Drop down option 'Complete'
    const completeOption = document.createElement('option');
    completeOption.value = 'complete';
    completeOption.innerHTML = 'Complete'
// Appends the options to the habitStatus dropdown selector
    habitStatus.appendChild(incompleteOption);
    habitStatus.appendChild(completeOption);

// Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
// Listens for delete button click
    deleteButton.addEventListener('click', function() {
        habitElement.remove();
        updateTotalHabits();
    })

// Appends the following to the current Div element being made
    habitElement.appendChild(habitInput);
    habitElement.appendChild(habitStatus);
    habitElement.appendChild(deleteButton);

// Returns the entire Div that was created
    return habitElement;
};

// Initializes the first habit box upon loading
const initializeApp = () => {
    const initialHabit = createHabitElement();
    habitsContainer.appendChild(initialHabit);
    updateTotalHabits();
};

initializeApp();

// Listens for 'Add A New Habit' button click to run createHabitElement()
addHabitButton.addEventListener('click', function() {
    const newHabit = createHabitElement();
    habitsContainer.appendChild(newHabit);
    updateTotalHabits();
});

// Double checks & updates total habit counter
updateTotalHabits();

