'use strict';

function saveUsers(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

function loadUsersFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val);
}

function clearUserFromStorage(key) {
    localStorage.removeItem(key);
}