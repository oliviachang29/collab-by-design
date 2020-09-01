const nav = require('./navigation.json')

const nav_halfway = nav.length / 2;
const nav_left = nav.slice(0, nav_halfway);
const nav_right = nav.slice(nav_halfway, nav.length);

module.exports = {nav_left, nav_right};