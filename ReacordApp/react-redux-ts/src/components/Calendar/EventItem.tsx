import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserEvent, UserEvent } from "../../redux/user-events";

interface Props {
    event: UserEvent;
}

const EventItem: React.FC<Props> = ({event}) =>{
    const dispatch = useDispatch();
     const handleDeleteClick = () => {
                        // @ts-ignore
                        dispatch(deleteUserEvent(event.id));
                    };
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
                    <div className="calendar-event-delete-button" onClick={handleDeleteClick}>
                        &times;
                    </div>
                </div>
                    );
}

export default EventItem;