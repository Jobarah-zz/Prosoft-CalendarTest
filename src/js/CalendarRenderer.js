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
	}


	render() {
		return (
			<div className = { 'calendarRenderer' }>

			</div>
		)
	}
}