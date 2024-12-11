const habitsContainer = document.getElementById('habits-container');
const addHabitButton = document.getElementById('add-habit-button');
const totalHabitsElement = document.getElementById('total-habits');

const updateTotalHabits = () => {
    const totalHabits = habitsContainer.children.length;
    totalHabitsElement.textContent = totalHabits;
}

const createHabitElement = () => {
    const habitElement = document.createElement('div');
    habitElement.className = 'habit';

    const habitInput = document.createElement('input');
    habitInput.type = 'text';
    habitInput.className = 'habit-input';
    habitInput.placeholder = 'Enter a habit to track...'


    const habitStatus = document.createElement('select');
    habitStatus.className = 'habit-status';


    const incompleteOption = document.createElement('option');
    incompleteOption.value = 'incomplete';
    incompleteOption.innerHTML = 'Incomplete';

    const completeOption = document.createElement('option');
    completeOption.value = 'complete';
    completeOption.innerHTML = 'Complete'
    habitStatus.appendChild(incompleteOption);
    habitStatus.appendChild(completeOption);

    habitElement.appendChild(habitInput);
    habitElement.appendChild(habitStatus);

    return habitElement;
}

addHabitButton.addEventListener('click', function() {
    const newHabit = createHabitElement();
    habitsContainer.appendChild(newHabit);
    updateTotalHabits();
});

updateTotalHabits();

