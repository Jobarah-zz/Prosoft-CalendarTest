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
			countryCode: props.countryCode,
			month: moment(props.initialDate).format('MM'),
			year: moment(props.initialDate).format('YYYY'),
			weeks: ''
		};

		this.initCalendar = this.initCalendar.bind(this);
		this.isDateHoliday = this.isDateHoliday.bind(this);
		this.isInRange = this.isInRange.bind(this);
		this.generateWeeks = this.generateWeeks.bind(this);
		this.generateWeek = this.generateWeek.bind(this);
		this.generateEmptyWeek = this.generateEmptyWeek.bind(this);
	}

	componentWillReceiveProps(props) {
		const { countryCode, initialDate, daysToSpan } = props;

		let test = new Date(initialDate);

		if (countryCode !== '' && initialDate !== '' && daysToSpan !== '') {

			if (!isNaN(test.getMonth())) {
	       		this.setState({countryCode, initialDate: moment(initialDate), daysToSpan }, this.generateWeeks);
	    	}
		}
	}

	componentWillMount() {
		this.initCalendar();
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

	initCalendar() {
		this.generateWeeks();
	}

	generateWeeks() {
		const { daysCount, initialDate } = this.state;
		const weeks = new Array();
		let tmpDate = moment(initialDate);

		console.log("generateWeeks", initialDate.toString())

		for (let i = 0; i < 4; i++) {

			const retValue = this.generateWeek(tmpDate, this.props.holidays);
			weeks.push(<div className = { 'week' } key={i} >{retValue.week}</div>);
			tmpDate = moment(retValue.lastDate);
		}
		this.setState({weeks});
		return weeks;
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
		const { initialDate, year } = this.state;
		const header = `${initialDate.format('MMMM')} ${year}`;

		return (
			<div className = { 'calendar' }>
				<div className = { 'header' }>{header}</div>
				{ this.state.weeks }
			</div>
		);
	}
}
