import React, {useEffect} from "react";
import './Calendar.css';
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store";
import { selecUserEventsArray, loadUserEvents, UserEvent } from "../../redux/user-events";
import { addZero } from '../../lib/utils';

const mapState = (state: RootState) => ({
    events: selecUserEventsArray(state)
});

const mapDispatch = {
    loadUserEvents
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const createDateKey = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDay();
    return `${addZero(year)}-${addZero(month)}-${addZero(day)}`;
}



const groupEventsByDay = (events: UserEvent[]) =>{
    const groups: Record<string, UserEvent[]> = {};

    const addToGroup = (dateKey: string, event: UserEvent) => {
     
    if (groups[dateKey] === undefined){
            groups[dateKey] = [];
        }

        groups[dateKey].push(event);
    }

    events.forEach((event) => {

        const dateStartKey = createDateKey(new Date(event.dateStart));
        const dateEndKey = createDateKey(new Date(event.dateEnd));

        addToGroup(dateStartKey, event);

        if (dateEndKey !== dateStartKey){
            addToGroup(dateEndKey, event);
        }
    });

    return groups;
}

const Calendar: React.FC<Props> = ({events, loadUserEvents}) =>{

    useEffect(()=>{
        loadUserEvents();
    }, []);

    let groupedEvents: ReturnType<typeof groupEventsByDay> | undefined;
    let sortedGroupsKeys: string[] | undefined;

    if (events.length) {
        groupedEvents = groupEventsByDay(events);
        sortedGroupsKeys = Object.keys(groupedEvents).sort(
            (date1, date2) => + new Date(date2) - +new Date(date1)
        );
    }

    return groupedEvents && sortedGroupsKeys ?  ( 
    <div className="calendar">{sortedGroupsKeys.map(dayKey => {
        const events = groupedEvents ? groupedEvents[dayKey] : [];
        const groupDate = new Date(dayKey);
        const day = groupDate.getDate();
        const month = groupDate.toLocaleString(undefined, {month: 'long'});

        return (
              <div className="calendar-day">
            <div className="calendar-day-label">
                <span>{day} {month}</span>
            </div>
            <div className="calendar-events">

                {events.map(event => {
                    return(
                        <div className="calendar-event">
                            <div className="calendar-event-info">
                                <div className="calendar-event-time">
                                 1:00 - 2:00
                                </div>
                            <div className="calendar-event-title">
                                 {event.tittle}
                            </div>
                        </div>
                    <div className="calendar-event-delete-button">
                        &times;
                    </div>
                </div>
                    );
                })}


              
            </div>
        </div>
        )
    
    } 

    )
    }
    </div>
    )
    :
    
    (<p>Loading...</p>)
      
    
}

export default connector(Calendar);

