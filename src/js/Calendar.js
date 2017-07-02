import React from 'react';
import Day from './Day';
import moment from 'moment';

const { Component, PropTypes } = React;

export default class Calendar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			initialDate: moment(props.initialDate),
			daysToSpan: props.daysToSpan,
			endDate: moment(props.initialDate).add(props.daysToSpan, 'day'),
			countryCode: 'US',
			month: moment(props.initialDate).format('MM'),
			year: moment(props.initialDate).format('YYYY'),
			weeks: ''
		};

		this.generateEmptyWeek = this.generateEmptyWeek.bind(this);
	}

	isInRange(date) {
		const isValid = moment(date).isBetween(moment(this.state.initialDate).subtract(1, 'day') , this.state.endDate);

		if (isValid)
			return true;
		return false;
	}


	generateEmptyWeek() {
		const days = new Array();

		for (let i = 0; i < 7; i++) {
			days.push(<Day key={ i } dayNumber={ moment().format('DD') } isHoliday = { false } weekDay = { -1 } isValid = { false }/>);
		}

		return days;
	}


	render() {

		return (
			<div className = { 'calendar' }>
				<div className = { 'header' }>{header}</div>
				{ this.state.weeks }
			</div>
		);
	}
}
