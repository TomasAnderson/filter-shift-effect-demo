var React = require('react');
var range = require('lodash.range');

var allColors = [
  '#456990', '#EF767A',  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
];

var names = [
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'
];

var count = 11;
var width = 70;
var height = 90;

var layout = range(count).map(function (n) {
	 var row = Math.floor(n / 3);
	 var col = n % 3;
	 return [width * col, height * row]
});

var App = React.createClass({
	getInitialState: function() {
		return {
			order: range(count),
			value: ''
		};
	},
	handleChange: function (e) {
		 this.setState({
		 	value: e.target.value
		 });
	},
	render: function () {
		var grids = this.state.order.filter(function (_, key) {
					if (this.state.value === '') {
						return true;
					} else {
						return names[key] === this.state.value;
					}
				}.bind(this));
		return (
			<div className="demo">
	      <form className="filter">
	        <input
	          className="filter-input"
	          autoFocus={false}
	          placeholder="filter out cards"
	          onChange={this.handleChange}
	        />
	      </form>
	      <div className="grids">
				{grids.map(function (index, key) {
					var scale = 1;
					var visualPosition = this.state.order.indexOf(index);
					var translateX = layout[visualPosition][0];
					var translateY = layout[visualPosition][1];
					 return (
					 	<div
					 		className="ball"
						 	key={key}
					 		style={{
					 			backgroundColor: allColors[index],
					 			transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`
					 		}}
					 	>
					 	<span className="number" style={{visibility: 'hidden'}}>{names[key]}</span>
					 	</div>
				)}.bind(this))}
				</div>
			</div>
		) 
	}
});

module.exports = App;