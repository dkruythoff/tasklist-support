const button = document.querySelector('.add')
const input = document.getElementById('inputField')
const container = document.querySelector('.container');
const clear = document.querySelector('.clear');
const list = document.querySelector('.list-ul')
const items = JSON.parse(localStorage.getItem('items')) || [];

button.addEventListener('click', addItems)
input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addItems();
    }
})

// Function to add items to list and to items array
function addItems() {
    const inputValue = input.value;
    const item = {
        inputValue: inputValue,
        complete: false
    }

    if (inputValue !== '') {
        let li = document.createElement('div');

        list.appendChild(li);
        li.innerHTML += `
    <div class="row mb-1 bg-primary rounded text-light checked"><div class="col-sm my-auto checked">${inputValue}</></div><div class="col-sm checked">

    <button class="btn btn-primary btn delete rounded float-right checked">Remove</button>

    <button class="btn btn-primary btn edit rounded float-right checked">Edit</button>
    
    <button class="btn btn-primary btn complete rounded float-right checked">Complete</button>

    </div></div>`

        input.value = '';

        // Push inputValue (item) to items array
        items.push(item);
        // Push inputValue (item) to local Storage
        localStorage.setItem('items', JSON.stringify(items));
    }
}

// Single click handler for the entire list
// Since events bubble up (https://javascript.info/bubbling-and-capturing), 
// we can use one catch-all and check what exactly was clicked. 
// This will automatically react to any dynamically added HTML
function listClickHandler(event) {
    // We can check what was clicked with Element.matches(), which accepts a CSS selector

    // The delete button was clicked
    if (event.target.matches('button.delete')) {
        for (let i = 0; i < items.length; i++) {
            if ((e.target.classList.contains('delete') && e.target.parentElement.previousElementSibling.textContent) === items[i].inputValue) {
                console.log('ITEM REMOVED FROM LOCAL STORAGE')
                e.target.parentElement.parentElement.remove();
                items.splice([i], 1)
                // Set Updated localStorage
                localStorage.setItem('items', JSON.stringify(items));
            }
        }
    }

    // The edit button was clicked
    if (event.target.matches('button.edit')) {
        if (e.target.classList.contains('edit')) {
            e.target.parentElement.previousElementSibling.innerHTML = `<input type="text" class="edit-field"><button class="btn btn-primary btn-sm text-light edit-button rounded ml-2">Edit</button>`;
        }
    }

    // The edit-button (better name is save) was clicked
    if (event.target.matches('button.edit-button')) {
        const editField = document.querySelector('.edit-field');
        e.target.parentElement.innerHTML = `${editField.value}`
    }
}

// Complete Function

// function contains(e) {

//     if (e.target.classList.contains('complete')) {

//         const nodes = e.target.parentElement.getElementsByTagName('button');
//             for (let i=0; i<nodes.length; i++) {
//             nodes[i].classList.remove('bg-primary', 'text-light')
//             nodes[i].classList.add('bg-secondary', 'text-muted');
//         }
//         const buttonDiv = e.target.parentElement;
//         const getRow = e.target.parentElement.parentElement;
//         e.target.classList.remove('bg-primary', 'text-light')
//         e.target.classList.add('bg-secondary', 'text-muted');
//         buttonDiv.classList.remove('bg-primary')
//         getRow.classList.remove('bg-primary', 'text-light');
//         buttonDiv.classList.add('bg-secondary');
//         getRow.classList.add('bg-secondary', 'text-muted');

//     }   
// }

// (e.target.classList.contains('complete') && 


// I want to move this into the big click handler, but I'm not entirely sure what it does
function contains(e) {
    for (let i = 0; i < items.length; i++) {
        if (e.target.parentElement.previousElementSibling.textContent === items[i].inputValue) {
            items[i].complete = true;
            e.target.parentElement.previousElementSibling.classList.add('bg-secondary', 'text-muted')
            e.target.parentElement.classList.add('bg-secondary', 'text-muted')
            e.target.parentElement.classList.add('bg-secondary', 'text-muted')
            e.target.previousElementSibling.classList.add('bg-secondary', 'text-muted')
            e.target.classList.add('bg-secondary', 'text-muted')
            e.target.previousElementSibling.previousElementSibling.classList.add('bg-secondary', 'text-muted')
            e.target.parentElement.parentElement.classList.remove('bg-primary');
            e.target.parentElement.parentElement.classList.add('bg-secondary', 'text-muted')
            localStorage.setItem('items', JSON.stringify(items));
        }
    }
}

// Button to Clear Items from list
let clearAll = document.querySelector('.clear')

clearAll.addEventListener('click', function () {
    list.innerHTML = '';
    localStorage.clear();
    items.splice(0, items.length);
})


// Function AddItems() Ending


window.addEventListener('DOMContentLoaded', function () {
    for (let i = 0; i < items.length; i++) {
        if (items[i].complete === false) {
            let li = document.createElement('li');
            list.appendChild(li);
            li.innerHTML += `
    <div class="row mb-1 bg-primary rounded text-light"><div class="col-sm my-auto">${items[i].inputValue}</></div><div class="col-sm">

    <button class="btn btn-primary btn delete rounded  float-right">Remove</button>

    <button class="btn btn-primary btn edit rounded float-right ">Edit</button>
    
    <button class="btn btn-primary btn complete rounded  float-right">Complete</button>

    </div></div>`
        } else {
            let li = document.createElement('li');
            list.appendChild(li);
            li.innerHTML += `
    <div class="row mb-1 bg-secondary rounded text-muted"><div class="col-sm my-auto">${items[i].inputValue}</></div><div class="col-sm">

    <button class="btn btn-secondary btn delete rounded float-right">Remove</button>

    <button class="btn btn-secondary btn edit rounded float-right ">Edit</button>
    
    <button class="btn btn-secondary btn complete rounded  float-right">Complete</button>

    </div></div>`
        }
    }

    if (!list.classList.contains('list-populated')) {
        clear.classList.remove('d-none')
    }

    list.addEventListener('click', contains);
})













