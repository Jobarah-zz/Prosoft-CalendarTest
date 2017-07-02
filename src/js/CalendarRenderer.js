import React from 'react';
import Calendar from './Calendar';
import moment from 'moment';

const { Component, PropTypes } = React;

export default class CalendarRenderer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			countryCode: 'US',
			startDate: '2017-06-15',
			daysToSpan: '60',
			calendars: ''
		};

		this.handleChange =  this.handleChange.bind(this);
		this.getMonthHolidays = this.getMonthHolidays.bind(this);
	}

	getMonthHolidays() {
		return fetch(`https://holidayapi.com/v1/holidays?key=8782889c-7fc1-47bf-8d3f-eccd67972bd0&country=${this.state.countryCode}&year=${this.state.year}&month=${this.state.month}`)
		.then(function(response) {
		  return response.json().then(res => res.holidays);
		});
	}

	handleChange(event) {
		const target = event.target;

		if (target.className === 'cc') {
			this.setState({ countryCode: target.value });
		} else if (target.className === 'start-date') {
			this.setState({ startDate: target.value });
		}
		else if (target.className === 'days') {
			this.setState({ daysToSpan: target.value });
		}
  	}


	render() {
		return (
			<div className = { 'calendarRenderer' }>
				Country Code:
				<input type="text" className={'cc'}value={this.state.countryCode} onChange={this.handleChange} />
				Start Date:
				<input type="text" className={'start-date'} value={this.state.startDate} onChange={this.handleChange} />
				Days to Span:
				<input type="text" className={'days'}value={this.state.daysToSpan} onChange={this.handleChange} />
				{ this.state.calendars }
			</div>
		)
	}
}