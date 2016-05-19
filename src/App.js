var React = require('react');
var ExpandableDiv = require('./ExpandableDiv.js');
var range = require('lodash.range');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;


var springSetting1 = {stiffness: 180, damping: 10};
var springSetting2 = {stiffness: 120, damping: 17};


var App = React.createClass({
	getInitialState: function() {
		return {
			order: range(this.props.grids.length),
			filteredOrder: range(this.props.grids.length),
			value: '',
			grids: this.props.grids
		};
	},
	_reinsert: function (oldOrder, value) {
		return oldOrder.filter(function (_, key) {
			if (value === '') {
				return true;
			} else {
				return this.state.grids[key].name.indexOf(value) >= 0;
			}
		}.bind(this));
	},

	handleChange: function (e) {
		 var value = e.target.value;
		 var newOrder = this._reinsert(this.state.order, value);
		 this.setState({
		 	value: value,
		 	filteredOrder: newOrder
		 });
	},

	handleRemove: function(key) {
		return function () {
			var newGirds = key === 0? this.state.grids.slice(1): 
											key === this.state.grids.length - 1? this.state.grids.slice(0, key + 1) :
												this.state.grids.slice(0, key).concat(this.state.grids.slice(key+1));
			this.setState({
				grids: newGirds, 
				order: range(newGirds.length - 1)
			});
		}.bind(this);
	},

	_getStyles: function(index) {
		var style = {};	
		var count = this.state.grids.length;
		var width = 70;
		var height = 90;
		var column = 3;
		var layout = range(this.state.grids.length).map(function (n) {
			 var row = Math.floor(n / column);
			 var col = n % column;
			 return [width * col, height * row]
		});
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
 		return style;
	},

	render: function () {
		return (
			<div className="demo">
	      <form className="filter">
	        <input
	          className="filter-input"
	          autoFocus={false}
	          placeholder="Type a color!"
	          onChange={this.handleChange}
	        />
	      </form>
	      <div className="grids">
				{this.state.order.map(function (index, key) {
					 return (
					 	<Motion key={key} style={this._getStyles(index)}>
					 		{function (style) {
					 			var scale = style.scale;
					 			var translateX = style.translateX; 
					 			var translateY = style.translateY; 
					 			return (
								 	<ExpandableDiv
								 		key={key}
								 		name={this.state.grids[key].name}
								 		style={{
								 			backgroundColor: this.state.grids[index].color,
	                    WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
	                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,								 			
								 		}}
								 		handleRemove={this.handleRemove(key)}
								 	>
								 	</ExpandableDiv>
								 );
					 		}.bind(this)}
						</Motion>
					);}.bind(this))}
				</div>
			</div>
		) 
	}
});

module.exports = App;