import $ from 'jquery';
const URLROOT = '/timesince';

function getUser() {
  return $.getJSON(`${URLROOT}/api/user`);
}

function getVisitationTimer() {
  return $.getJSON(`${URLROOT}/api`);
}

function getMyFeed() {
  return $.getJSON(`${URLROOT}/api/timers`);
}

function login(user, password) {
  return $.ajax({
    type: "POST",
    url: `${URLROOT}/api/login`,
    data: JSON.stringify({ user, password}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  }).then(
    usr => Promise.resolve(usr),
    err => Promise.reject(err.responseJSON),
  );

}

function logout() {
  return $.ajax({
    type: "POST",
    url: `${URLROOT}/api/logout`,
    data: JSON.stringify({}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  }).then(
    () => Promise.resolve(),
    err => Promise.reject(err.responseJSON),
  );
}

function registerUser(user, password, email) {
  return $.ajax({
    type: "PUT",
    url: `${URLROOT}/api/users`,
    data: JSON.stringify({ user, password, email }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  }).then(
    response => Promise.resolve(response),
    err => Promise.reject(err.responseJSON),
  );
}

function createTimer(title) {
  return $.ajax({
    type: "PUT",
    url: `${URLROOT}/api/timers`,
    data: JSON.stringify({ title }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  }).then(
    response => Promise.resolve(response),
    err => Promise.reject(err.responseJSON),
  );
}

function addTimerEvent(timerId) {
  return $.ajax({
    type: "PUT",
    url: `${URLROOT}/api/timers/${timerId}`,
    data: JSON.stringify({}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  }).then(
    response => Promise.resolve(response),
    err => Promise.reject(err.responseJSON),
  );
}

export default {
  getUser, getVisitationTimer, registerUser, login, logout,
  createTimer, getMyFeed, addTimerEvent,
};
