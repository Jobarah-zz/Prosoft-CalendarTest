import React from 'react';
import Calendar from './Calendar';
import moment from 'moment';

const { Component, PropTypes } = React;

export default class CalendarRenderer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			countryCode: '',
			startDate: '',
			daysToSpan: '',
			calendars: '',
			holidays: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.generateCalendars = this.generateCalendars.bind(this);
		this.getMonthHolidays = this.getMonthHolidays.bind(this);
	}

	getMonthHolidays() {
		return fetch(`https://holidayapi.com/v1/holidays?key=8782889c-7fc1-47bf-8d3f-eccd67972bd0&country=${this.state.countryCode}&year=${this.state.year}&month=${this.state.month}`)
		.then(response => {
			response.json().then(res => {
				this.setState({holidays: res.holidays});
			});
		})
		.catch(error => console.log(error));
	}

	handleChange(event) {
		const target = event.target;

		if (target.className === 'cc') {
			this.setState({ countryCode: target.value }, this.generateCalendars);
		} else if (target.className === 'start-date') {
			this.setState({ startDate: target.value }, this.generateCalendars);
		}
		else if (target.className === 'days') {
			this.setState({ daysToSpan: target.value }, this.generateCalendars);
		}
  	}

  	componentDidMount() {
  		this.generateCalendars();
  	}

  	generateCalendars() {

  		const { countryCode, startDate, daysToSpan } = this.state;
  		const daysInCalendar = (31 - parseInt(moment(startDate).format('DD')));
  		const calendarsCount = Math.ceil(( parseInt(this.state.daysToSpan) - daysInCalendar )/31);
  		const monthEnd = moment(startDate).endOf('month');
  		let calendars = [];

  		if (countryCode !== '' && startDate !== '' && daysToSpan !== '') {
  			this.getMonthHolidays();
  			const spanDays = daysToSpan <= daysInCalendar ? daysToSpan : daysInCalendar;

  			calendars.push(<Calendar key={`calendar0`} initialDate={startDate} daysToSpan={spanDays} countryCode={countryCode} holidays={[]}/>);

  			let tmpStartDate = moment(monthEnd).add(1, 'day');
  			let remainingDays = ( parseInt(this.state.daysToSpan) - daysInCalendar );

  			for (let i = 0; i < calendarsCount; i++) {


  				let DaysInMonth = parseInt((moment(tmpStartDate).endOf('month')).format('DD'));
  				let tmpSpanDays = remainingDays <= DaysInMonth ? remainingDays : DaysInMonth;

  				calendars.push(<Calendar key={`calendar${i+1}`} initialDate={tmpStartDate} daysToSpan={tmpSpanDays} countryCode={countryCode} holidays={[]}/>);
  				tmpStartDate = (moment(tmpStartDate).endOf('month')).add(1, 'day');
  			}

  			this.setState({calendars});
  		} else {
  			this.setState({calendars: []});	
  		}
  	}

	render() {
		return (
			<div className = { 'calendarRenderer' }>
				Country Code:
				<input type="text" className={'cc'} value={this.state.countryCode} onChange={this.handleChange} placeholder={'US'}/>
				Start Date:
				<input type="text" className={'start-date'} value={this.state.startDate} onChange={this.handleChange} placeholder={'2008-06-17'}/>
				Days to Span:
				<input type="text" className={'days'}value={this.state.daysToSpan} onChange={this.handleChange} placeholder={'90'}/>
				{ this.state.calendars }
			</div>
		)
	}
}
