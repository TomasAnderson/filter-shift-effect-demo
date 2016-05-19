var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./App');

var grids = [
	{color: '#456990', name: 'dark blue'},
	{color: '#EF767A', name: 'red'},
	{color: '#49BEAA', name: 'dark green'},
	{color: '#49DCB1', name: 'light green'},
	{color: '#EEB868', name: 'yellow'},
	{color: '#EF767A', name: 'red'},
	{color: '#456990', name: 'dark blue'},
	{color: '#49BEAA', name: 'dark green'},
	{color: '#49DCB1', name: 'green'},
	{color: '#EEB868', name: 'yellow'},
	{color: '#EF767A', name: 'red'}
];


ReactDOM.render(<App grids={grids}/>, document.querySelector('#app'));