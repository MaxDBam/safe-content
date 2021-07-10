'use strict';

const KEY = 'theUsers';
const KEY2 = 'loggedInUser';

var gUsers = _createUsers();
var gSortBy = 'name';

function _createUsers() {
    var users = loadUsersFromStorage(KEY);
    if (users && users.length) return users;

    users = [];
    users.push(_createUser('Alex', '908964D', true, ''));
    users.push(_createUser('Michael', '649089Du', true, ''));
    users.push(_createUser('Tal', '699089DU', false, ''));

    saveUsers(KEY, users)

    return users;
}

function _createUser(userName, password, falseOrTrue, lastLoginDate) {
    return {
        userName: userName,
        password: password,
        isAdmin: falseOrTrue,
        lastLoginDate: lastLoginDate
    };
}

function getUsersToShow() {
    // var users = gUsers.slice();
    const sortedUsers = gUsers.sort(userComparator);
    return sortedUsers;

}

function userComparator(user1, user2) {
    switch (gSortBy) {
        case 'name':
            if (user1.userName.toLowerCase() > user2.userName.toLowerCase()) return 1;
            if (user1.userName.toLowerCase() < user2.userName.toLowerCase()) return -1;
            return;
        case 'lastLoginDate':
            return user2[gSortBy] - user1[gSortBy];
    }
}

function doLogin(userName, password) {
    var userIndex = gUsers.find((user, idx) => (user.userName === userName && user.password === password));
    console.log(userIndex);
    if (!userIndex) {
        return 'null';
    } else getLoggedInPage(userIndex);
}

function getLoggedInPage(user) {
    var loggedInUser;
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.secret-content').style.display = 'block';
    user.lastLoginDate = Date.now();
    loggedInUser = user;
    gLoggedInUser = user;
    saveUsers(KEY2, loggedInUser);
    document.querySelector('h1').innerHTML = 'Hello, ' + user.userName;
    document.querySelector('h1').style.display = 'block';
    document.querySelector('button').style.display = 'block';
    document.querySelector('button').innerText = 'Log Out';
    saveUsers(KEY, gUsers);
    if (user.isAdmin) {
        document.querySelector('.admin-page-link').style.display = 'block';

    }
}

function doLogOut() {
    document.querySelector('.login').style.display = 'flex';
    document.querySelector('.secret-content').style.display = 'none';
    document.querySelector('button').style.display = 'none';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.admin-page-link').style.display = 'none';
    document.querySelector('h1').innerText = '';
    clearUserFromStorage(KEY2);
}

function checkIfLoggedIn() {
    var loggedUser = loadUsersFromStorage(KEY2);
    if (!loggedUser) {
        document.querySelector('input[name="uname"]').value = '';
        document.querySelector('input[name="pswrd"]').value = '';
        return;
    } else getLoggedInPage(loggedUser);
}

function checkIfNotAdmin() {
    var loggedUser = loadUsersFromStorage(KEY2);
    // var users = loadUsersFromStorage(KEY);
    gLoggedInUser = loggedUser;
    console.log(loggedUser);
    // saveUsers(KEY, users);
    if (!loggedUser || !loggedUser.isAdmin) {
        console.log(loggedUser);
        window.location.href = 'index.html';
    } else return;
}

function setSortBy(sortBy) {
    gSortBy = sortBy;
    renderUsers();
}