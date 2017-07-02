import React from 'react';
import ReactDOM from 'react-dom';
import CalendarRenderer from './CalendarRenderer';

ReactDOM.render(
	<CalendarRenderer startDate={'2008-06-17'} holidays={[]} countryCode={'US'}/>
	, document.getElementById('app'));
