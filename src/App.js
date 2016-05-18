var React = require('react');
var range = require('lodash.range');

var allColors = [
  '#456990', '#EF767A',  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
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
			order: range(count)
		};
	},
	render: function () {
		return (
			<div className="demo">
				{this.state.order.map(function (_, key) {
					var scale = 1;
					var visualPosition = this.state.order.indexOf(key);
					var translateX = layout[visualPosition][0];
					var translateY = layout[visualPosition][1];
					 return (
					 	<div
					 		className="ball"
						 	key={key}
					 		style={{
					 			backgroundColor: allColors[key],
					 			transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`
					 		}}
					 	>
					 	<span className="number" style={{visibility: 'hidden'}}>{key}</span>
					 	</div>
				)}.bind(this))}
			</div>
		) 
	}
});

module.exports = App;