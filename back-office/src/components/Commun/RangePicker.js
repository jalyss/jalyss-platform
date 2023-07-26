import React from 'react';
import {LinkedCalendar} from 'rb-datepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

export default function RangedPicker ({onChange,value}) {
    const onDatesChange = ({ startDate, endDate }) => {
        console.log(({ startDate, endDate }));
    }
    
        return (
            <LinkedCalendar onDatesChange={onChange} 
            // showDropdowns={false}  
            
            />
        );
    
}