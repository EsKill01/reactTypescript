import React from "react";
import './Calendar.css';

const Calendar: React.FC = () =>{
    return( 
    <div className="calendar">
        <div className="calendar-day">
            <div className="calendar-day-label">
                <span>1 Febrero</span>
            </div>
            <div className="calendar-events">
                <div className="calendar-event">
                    <div className="calendar-event-info">
                        <div className="calendar-event-time">
                            1:00 - 2:00
                        </div>
                        <div className="calendar-event-title">
                            Learning typescript
                        </div>
                    </div>
                    <div className="calendar-event-delete-button">
                        &times;
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Calendar;