var React = require('react');
var range = require('lodash.range');

var allColors = [
  '#456990', '#EF767A',  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
];

var names = [
	'dark blue', 'red', 'dark green', 'light green', 'yellow', 'red', 'dark blue', 'dark green', 'green', 'yellow', 'red'
];

var count = 11;
var width = 70;
var height = 90;

var layout = range(count).map(function (n) {
	 var row = Math.floor(n / 3);
	 var col = n % 3;
	 return [width * col, height * row]
});
var reinsert = function (oldOrder, value) {
	var grids = oldOrder.filter(function (_, key) {
		if (value === '') {
			return true;
		} else {
			return names[key].indexOf(value) >= 0;
		}
	}.bind(this));
	return grids;
};

var App = React.createClass({
	getInitialState: function() {
		return {
			order: range(count),
			filteredOrder: range(count),
			value: ''
		};
	},
	handleChange: function (e) {
		 var value = e.target.value;
		 var newOrder = reinsert(this.state.order, value);
		 this.setState({
		 	value: value,
		 	filteredOrder: newOrder
		 });
	},
	render: function () {
		console.log(this.state.filteredOrder);
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
				{this.state.order.map(function (index, key) {
					var style = {};			
			 		if (this.state.filteredOrder.indexOf(index) < 0) {
			 			style.visibility = 'hidden';
			 		} else {
						var scale = 1;
						var visualPosition = this.state.filteredOrder.indexOf(index);
						var translateX = layout[visualPosition][0];
						var translateY = layout[visualPosition][1];
						var style = {
				 			backgroundColor: allColors[index],
				 			transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`
				 		};			 
			 		}
					 return (
					 	<div
					 		className="ball"
						 	key={key}
					 		style={style}
					 	>
					 	<span className="number" style={{visibility: 'hidden'}}>{names[key]}</span>
					 	</div>
				);}.bind(this))}
				</div>
			</div>
		) 
	}
});

module.exports = App;