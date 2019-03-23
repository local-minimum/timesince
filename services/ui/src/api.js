import $ from 'jquery';

function getUser() {
  return $.getJSON('/api/user');
}

function getVisitationTimer() {
  return $.getJSON('/api');
}

function login(user, password) {
  return $.ajax({
    type: "POST",
    url: "/api/login",
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
    url: "/api/logout",
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
    url: "/api/users",
    data: JSON.stringify({ user, password, email }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  }).then(
    response => Promise.resolve(response),
    err => Promise.reject(err.responseJSON),
  );
}

export default {
  getUser, getVisitationTimer, registerUser, login, logout,
};
