import $ from 'jquery';

function getUser() {
  return $.get('/api/user');
}

function getVisitationTimer() {
  return $.get('/api');
}

export default {
  getUser, getVisitationTimer,
};
