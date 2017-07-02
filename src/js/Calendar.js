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

		this.isDateHoliday = this.isDateHoliday.bind(this);
		this.isInRange = this.isInRange.bind(this);
		this.generateWeek = this.generateWeek.bind(this);
		this.generateEmptyWeek = this.generateEmptyWeek.bind(this);
	}

	isInRange(date) {
		const isValid = moment(date).isBetween(moment(this.state.initialDate).subtract(1, 'day') , this.state.endDate);

		if (isValid)
			return true;
		return false;
	}

	isDateHoliday(holidays, date) {
		if (holidays.length === 0)
			return false;
		for(const holiday of holidays) {

			if (moment(holiday.date).isSame(date, 'day'))
				return true;
		}

		return false;
	}

	generateEmptyWeek() {
		const days = new Array();

		for (let i = 0; i < 7; i++) {
			days.push(<Day key={ i } dayNumber={ moment().format('DD') } isHoliday = { false } weekDay = { -1 } isValid = { false }/>);
		}

		return days;
	}

	generateWeek(initialDate, holidays) {
		const days = new Array();
		let tmpDate = moment(initialDate);
		let emptyWeek = this.generateEmptyWeek();
		let lastDate = initialDate;

		console.log("Week", initialDate.toString())
		let index = initialDate.day();
		for (let i = index; i < 7; i++) {
			const isDateHoliday = this.isDateHoliday(holidays, tmpDate);
			const isValid = this.isInRange(tmpDate);

			emptyWeek[i] = (<Day key={ i } dayNumber={ tmpDate.format('DD') } isHoliday = { isDateHoliday } weekDay = { tmpDate.day() } isValid = { isValid }/>);
			tmpDate = (moment(tmpDate)).add(1, 'day')
			lastDate = tmpDate;
		}

		return { lastDate: lastDate, week: emptyWeek };
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
