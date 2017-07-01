import React from 'react';

const { Component, PropTypes } = React;

export default class Day extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dayNumber: props.dayNumber,
			weekDay: props.weekDay,
			isValid: props.isValid,
			isHoliday: props.isHoliday
		};

		this.getClassName = this.getClassName.bind(this);
	}

	getClassName() {
		const { isValid, dayNumber, weekDay, isHoliday } = this.state;
		const isWeekend = weekDay === 0 || weekDay === 6;

		if (!isValid)
			return 'inactive';
		if (isHoliday)
			return 'holiday';

		return isWeekend ? 'weekend' : 'active';
	}

	render() {
		
		const className = `day ${this.getClassName()}`;
		return (
			<div className = { className }>{ this.state.dayNumber }</div>
		);
	}
}