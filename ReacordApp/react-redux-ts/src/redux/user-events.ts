import { AnyAction } from "redux";

interface UserEvent {
    id: number,
    tittle: string,
    dateStart: string,
    dateEnd: string
}

interface UserEventsReducer {
    byIds: Record<UserEvent['id'], UserEvent>
    allIds: UserEvent['id'][];
}

const initialState: UserEventsReducer = {
    byIds: {},
    allIds: []
}


const userEvenetsReducer = (state: UserEventsReducer = initialState, action: AnyAction) => {
    switch (action.type){
        default:
            return state;
    }
}

export default userEvenetsReducer;