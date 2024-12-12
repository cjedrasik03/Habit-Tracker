
// Grabs the needed DOM elements
const habitsContainer = document.getElementById('habits-container');
const addHabitButton = document.getElementById('add-habit-button');
const totalHabitsElement = document.getElementById('total-habits');
const completeSection = document.getElementById('completed-habits');

// Counter for total habit/s, then displays it w/in totalHabitsElement
const updateTotalHabits = () => {
    const habitContTotal = habitsContainer.children.length;
    const compHabitsTotal = completeSection.children.length;

    const totalHabits = habitContTotal + compHabitsTotal;
    totalHabitsElement.textContent = totalHabits;
}

const saveHabitsToLocalStorage = () => {
    const habits = [];

// Gets all habits from both habit containers
    habitsContainer.querySelector('.habit').forEach((habitElement) => {
        const habitInput = habitElement.querySelector('.habit-input').value;
        const habitStatus = habitElement.querySelector('.habit-status').value;
        habits.push({ text: habitInput, status: habitStatus});
    });
    completeSection.querySelector('.habit').forEach((habitElement) => {
        const habitInput = habitElement.querySelector('.habit-input').value;
        const habitStatus = habitElement.querySelector('.habit-status').value;
        habits.push({ text: habitInput, status: habitStatus});
    });
// Saves to the local storage
    localStorage.setItem('habits', JSON.stringify(habits));
}

const loadHabitsFromLocalStorage = () => {
    const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    storedHabits.forEach((habit) => {
        const habitElement = createHabitElement();
        habitElement.querySelector('.habit-input').value = habit.text;
        habitElement.querySelector('.habit-status').value = habit.status;

// Append to the respective section based on habit status
        if (habit.status === 'complete') {
            completeSection.appendChild(habitElement);
        } else {
            habitsContainer.appendChild(habitElement);
        }
    });
    updateTotalHabits();
};

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

// Listens for 'Complete' status and moves to completed section
    habitStatus.addEventListener('change', () => {
        if (habitStatus.value === 'complete') {
            completeSection.appendChild(habitElement);
            updateTotalHabits();
        } else if (habitStatus.value === 'incomplete') {
            habitsContainer.appendChild(habitElement);
        }
        updateTotalHabits();
        saveHabitsToLocalStorage();
    })

// Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
// Listens for delete button click
    deleteButton.addEventListener('click', function() {
        habitElement.remove();
        updateTotalHabits();
        saveHabitsToLocalStorage();
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
    loadHabitsFromLocalStorage();
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

