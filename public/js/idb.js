let db;

const request = indexedDB.open('budget_tracker', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)

request.onupgradeneeded = function (event) {
    // save a reference to the database 
    const db = event.target.result;

    db.createObjectStore('new_budget', { autoIncrement: true });
};

// upon a successful 
request.onsuccess = function (event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is online, if yes run uploadBudget() function to send all local db data to api
    if (navigator.onLine) {
        // we haven't created this yet, but we will soon, so let's comment it out for now
        // uploadBudget();
    }
};

request.onerror = function (event) {
    // log error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new data and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_budget'], 'readwrite');

    // access the object store for `new_pizza`
    const budgetObjectStore = transaction.objectStore('new_budget');

    // add record to your store with add method
    budgetObjectStore.add(record);
}