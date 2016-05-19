var React = require('react');
var ExpandableDiv = require('./ExpandableDiv.js');
var range = require('lodash.range');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;

var allColors = [
  '#456990', '#EF767A',  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
];

var springSetting1 = {stiffness: 180, damping: 10};
var springSetting2 = {stiffness: 120, damping: 17};


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
						var visualPosition = this.state.order.indexOf(index);
						var x = layout[visualPosition][0];
						var y = layout[visualPosition][1];
			 			style = {
			 				scale: spring(0, springSetting2),
			 				translateX: x,
			 				translateY: y
			 			};
			 		} else {
						var visualPosition = this.state.filteredOrder.indexOf(index);
						var x = layout[visualPosition][0];
						var y = layout[visualPosition][1];
			 			style = {
			 				scale: spring(1, springSetting2),
			 				translateX: spring(x, springSetting2),
			 				translateY: spring(y, springSetting2)
			 			};
	 
			 		}
					 return (
					 	<Motion key={key} style={style}>
					 		{function (style) {
					 			var scale = style.scale;
					 			var translateX = style.translateX; 
					 			var translateY = style.translateY; 
					 			return (
								 	<ExpandableDiv
								 		key={key}
								 		names={names}
								 		style={{
								 			backgroundColor: allColors[index],
	                    WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
	                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,								 			
								 		}}
								 	>
								 	</ExpandableDiv>
								 );
					 		}}
						</Motion>
				);}.bind(this))}
				</div>
			</div>
		) 
	}
});

module.exports = App;