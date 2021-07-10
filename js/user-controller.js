'use strict';

var gLoggedInUser;
var gToggleTableOrNot = true;

function onCheckIfLoggedIn() {
    checkIfLoggedIn();
}

function onSubmitLogin(ev) {
    var inputUser = document.querySelector('input[name="uname"]').value;
    var inputPassword = document.querySelector('input[name="pswrd"]').value;

    doLogin(inputUser, inputPassword);
    ev.preventDefault();
    inputUser = '';
    inputPassword = '';
}

function onLogOut() {
    doLogOut();
}

function onToAdminPage() {
    checkIfNotAdmin();
    renderUsers();
}

function onClickBack(gLoggedInUser) {
    getLoggedInPage(gLoggedInUser);
}

function onSortChange(sortBy) {
    setSortBy(sortBy);
}

function renderUsers() {
    // loadUsersFromStorage(KEY);
    var users = getUsersToShow();
    if (gToggleTableOrNot) {
        onClickShowTable();
    } else onClickShowCards();
}

function getUserHTML(user) {
    // console.log(user.lastLoginDate);
    const formattedDate = (!user.lastLoginDate) ? '' : new Date(user.lastLoginDate);
    const shortDateNTime = (!formattedDate) ? '' : (formattedDate.toLocaleString());
    return `<tr><td>${user.userName}</td><td>${shortDateNTime}</td></tr>`;
}

function onClickShowTable() {
    var users = getUsersToShow();
    document.querySelector('.cards').style.display = 'none';
    var elTable = document.querySelector('table');
    elTable.innerHTML = '<tr><th>Name</th><th>Last Login</th></tr>'
    var strHTMLs = users.map(getUserHTML);
    // console.log(strHTMLs);
    elTable.innerHTML += strHTMLs.join('');
    elTable.style.display = 'block';
    gToggleTableOrNot = true;
    getTableHTML();
}

function getTableHTML() {
    if (gToggleTableOrNot && document.querySelector('.fa-th').classList.contains('fas-active')) {
        document.querySelector('.fa-th').classList.replace('fas-active', 'inactive');
        document.querySelector('.btn-sortby-active').classList.replace('btn-sortby-active', 'btn-sortby-cards');
        document.querySelector('.fa-bars').classList.replace('inactive', 'fas-active');
        document.querySelector('.btn-sortby-table').classList.replace('btn-sortby-table', 'btn-sortby-active');
    } else if (gToggleTableOrNot && document.querySelector('.fa-th').classList.contains('inactive')) {
        document.querySelector('.fa-bars').classList.replace('inactive', 'fas-active');
        if (document.querySelector('.table-show').classList.contains("btn-sortby-active")) {
            return;
        } else document.querySelector('.btn-sortby-table').classList.replace('btn-sortby-table', 'btn-sortby-active');
    }
}

function onClickShowCards() {
    var users = getUsersToShow();
    document.querySelector('table').style.display = 'none';
    var elCards = document.querySelector('.cards');
    var strHTMLs = users.map(user => {
        const className = (user.userName.length <= 3) ? 'green' :
            (user.userName.length === 4) ? 'red' :
                (user.userName.length === 7) ? 'purple' :
                    'white';
        return `<div class="card-details"><p>${user.userName}</p><div class="card-img ${className}"><i class="fas fa-user-tie fa-2x"></i></div></div>`;
    });
    elCards.innerHTML = strHTMLs.join('');
    elCards.style.display = 'flex';
    gToggleTableOrNot = false;
    getCardsHTML();
}

function getCardsHTML() {
    if (!gToggleTableOrNot && document.querySelector('.fa-bars').classList.contains('fas-active')) {
        document.querySelector('.fa-bars').classList.replace('fas-active', 'inactive');
        document.querySelector('.btn-sortby-active').classList.replace('btn-sortby-active', 'btn-sortby-table');
        document.querySelector('.fa-th').classList.replace('inactive', 'fas-active');
        document.querySelector('.btn-sortby-cards').classList.replace('btn-sortby-cards', 'btn-sortby-active');
    }
}