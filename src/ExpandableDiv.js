var React = require('react');

var ExpandableDiv = React.createClass({
	render: function () {
		return (
		 	<div
		 		className="ball"
		 		style={this.props.style}
		 		onClick={this.props.handleRemove}
		 	>
			 	<span className="number" style={{visibility: 'hidden'}}>{this.props.name}</span>
		 	</div>	
		);	  
	}
});

module.exports = ExpandableDiv;