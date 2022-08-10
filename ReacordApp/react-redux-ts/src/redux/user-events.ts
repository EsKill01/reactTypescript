import { Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { selectDateStart } from "./recorder";
import { RootState } from "./store";

const api_url = `http://localhost:3001/events`;

export interface UserEvent {
    id: number,
    tittle: string,
    dateStart: string,
    dateEnd: string
}

interface UserEventsReducer {
    byIds: Record<UserEvent['id'], UserEvent>
    allIds: UserEvent['id'][];
}

const selectUserEventsState = (rootState: RootState) => rootState.userEvents;

export const selecUserEventsArray = (rootState: RootState) => {
    const state = selectUserEventsState(rootState);

    if(state){
    return state.allIds.map(id => state.byIds[id]);
    }
    else{
        return;
    }
};

const initialState: UserEventsReducer = {
    byIds: {},
    allIds: []
}

//#region Load
const LOAD_REQUEST = 'userEvents/load_request';
interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {};

const LOAD_SUCCESS = 'userEvents/load_success';
interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS>{
    payload: {
        events: UserEvent[];
    }
}

const LOAD_FAILURE = 'userEvents/load_failure';
interface LoadFailureAction extends Action<typeof LOAD_FAILURE>{
    error: string;
}

//#endregion

//#region POST

//#region Delete

const DELETE_REQUEST = 'userEvent/delete_request';

interface DeleteRequestAction extends Action<typeof DELETE_REQUEST> {};

const DELETE_SUCCESS_REQUEST = 'userEvent/delete_success_request';

interface DeleteSuccessRequestAction extends Action<typeof DELETE_SUCCESS_REQUEST> {
    payload: {id: UserEvent['id']}
};

const DELETE_ERROR_REQUEST = 'userEvent/delete_error_request';

interface DeleteErrorRequestAction extends Action<typeof DELETE_ERROR_REQUEST> {
    message: string;
};


export const deleteUserEvent = (id: UserEvent['id']): ThunkAction<
Promise<void>,
RootState,
undefined,
DeleteRequestAction | DeleteSuccessRequestAction | DeleteErrorRequestAction> => async dispatch => {
    dispatch({
        type: DELETE_REQUEST
    });
    
    try{
        const response = await fetch(api_url+`/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok){
            dispatch({
                type: DELETE_SUCCESS_REQUEST,
                payload: {id}
            });
        }
    }catch (e){
        dispatch({
            type: DELETE_ERROR_REQUEST,
            message: 'Error traying to delete event'
        });
    }
}

//#region 

const CREATE_REQUEST = 'userEvents/create_request';

interface CreateRequestAction extends Action<typeof CREATE_REQUEST> {};

const CREATE_SUCCESS = 'userEvents/create_success';

interface SuccessRequestAction extends Action<typeof CREATE_SUCCESS> {
    payload: {
        event: UserEvent;
    }
};

const CREATE_ERROR = 'userEvents/create_error';

interface ErrorRequestAction extends Action<typeof CREATE_ERROR> {
    message: string;
}

export const createUserEvent = (): ThunkAction<
Promise<void>,
RootState,
unknown,
CreateRequestAction | SuccessRequestAction | ErrorRequestAction> => async (dispatch, getState) => {
   
    dispatch({
        type: CREATE_REQUEST
    });

    try {
        const dateStart = selectDateStart(getState());
        const event: Omit<UserEvent, 'id'> = {
            tittle: 'No name',
            dateStart,
            dateEnd: new Date().toISOString()
        }

        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });

        const createdEvent: UserEvent = await response.json();

        dispatch({
            type: CREATE_SUCCESS,
            payload: { event: createdEvent}
        });

    }
    catch (e){
        dispatch({
            type: CREATE_ERROR,
            message: "Error trying to create event"
        });
    }
}

//#endregion


const userEvenetsReducer = (state: UserEventsReducer = initialState, action: LoadSuccessAction | SuccessRequestAction | ErrorRequestAction | DeleteSuccessRequestAction) => {
    switch (action.type){
        case LOAD_SUCCESS:
            const {events} = action.payload;
            return {...state, allIds: events.map(({id}) => id),
                byIds: events.reduce<UserEventsReducer['byIds']>((byIds, event) => {
                    byIds[event.id] = event;
                    return byIds;
                }, {})
            }

        case CREATE_SUCCESS:
            const { event } = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, event.id],
                byIds: {...state.byIds, [event.id]: event} 
            };

        case DELETE_SUCCESS_REQUEST:
            const { id } = action.payload;
            const newState = {
                ...state, byIds: {...state.byIds},
                allIds: state.allIds.filter(storeId => storeId !== id)
            };
            delete newState.byIds[id];
            return newState;

            
        default:
            return state;
    }
}

export const loadUserEvents = (): ThunkAction<void, RootState, undefined, LoadRequestAction | LoadSuccessAction | LoadFailureAction> => async (dispatch, getState) =>
{
 dispatch({
     type: LOAD_REQUEST
 });

 try{
     const response = await fetch('http://localhost:3001/events');
     const events: UserEvent[] = await response.json();

     dispatch({
         type: LOAD_SUCCESS,
         payload: {events}
     })
 }catch (e){
    dispatch({
        type: LOAD_FAILURE,
        error: "Ha ocurrido un error"
    })
 }
};

export default userEvenetsReducer;