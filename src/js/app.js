import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';

ReactDOM.render(
	<Calendar initialDate={'2008-06-17'} holidays={[]} countryCode={'US'}/>
	, document.getElementById('app'));
