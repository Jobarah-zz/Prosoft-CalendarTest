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
		};
	}

	render() {

		return (
			<div className = { 'calendar' }>
				Calendar goes here
			</div>
		);
	}
}
