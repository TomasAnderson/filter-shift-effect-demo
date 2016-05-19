var React = require('react');

var ExpandableDiv = React.createClass({
	render: function () {
		return (
		 	<div
		 		className="ball"
			 	key={this.props.key}
		 		style={this.props.style}
		 	>
			 	<span className="number" style={{visibility: 'hidden'}}>{this.props.names[this.props.key]}</span>
		 	</div>	
		);	  
	}
});

module.exports = ExpandableDiv;