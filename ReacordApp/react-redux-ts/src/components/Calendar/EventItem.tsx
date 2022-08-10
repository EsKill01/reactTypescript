import React, {useState, useRef, useEffect} from "react";
import { useDispatch } from "react-redux";
import { deleteUserEvent, updateUserEvent, UserEvent } from "../../redux/user-events";

interface Props {
    event: UserEvent;
}

const EventItem: React.FC<Props> = ({event}) =>{
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(false);
    const [title, setTitle] = useState(event.title);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value);
    };
    const handleBlur = () =>{
        debugger
        if (title !== event.title){
            // @ts-ignore
            dispatch(updateUserEvent({
                ...event, title
            }));
        }

        setEditable(false);
    }
     const handleDeleteClick = () => {
                        // @ts-ignore
                        dispatch(deleteUserEvent(event.id));
      };
      const handleTitleClick = () =>{
          setEditable(true);
      }
      useEffect (() =>{
          if (editable){
              inputRef.current?.focus();
          }
      }, [editable]);


                    return(
                        <div className="calendar-event">
                            <div className="calendar-event-info">
                                <div className="calendar-event-time">
                                 1:00 - 2:00
                                </div>
                            <div className="calendar-event-title"> 
                            {editable ? (
                                <input ref={inputRef} type="text" value={title} onChange={handleChange} onBlur={handleBlur}/>
                            )
                            :
                                 <span onClick={handleTitleClick}> {event.title} </span>
                            }
                            </div>
                        </div>
                    <div className="calendar-event-delete-button" onClick={handleDeleteClick}>
                        &times;
                    </div>
                </div>
                    );
}

export default EventItem;