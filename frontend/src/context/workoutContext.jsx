import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

const WORKOUT_ACTIONS = {
    SET_WORKOUTS: 'SET_WORKOUTS',
    ADD_WORKOUT: 'ADD_WORKOUT',
    SET_WORKOUT: 'SET_WORKOUT',
    DELETE_WORKOUT: 'DELETE_WORKOUT',
    UPDATE_WORKOUT: 'UPDATE_WORKOUT',
}
 

const workoutReducer = (state, action) => {

    switch (action.type) {

        case WORKOUT_ACTIONS.SET_WORKOUTS:
            return {
                workouts: action.payload
            }
        
        case WORKOUT_ACTIONS.ADD_WORKOUT:
            return {
                workouts: [action.payload, ...state.workouts]
            }
        
        case WORKOUT_ACTIONS.DELETE_WORKOUT: 
            return {
                workouts: state.workouts.filter( (w) => w._id !== action.payload._id )
            }
        default:
            return state
    }
}



export const WorkoutContextProvider = ({ children }) => {

    const [state, dispatch] =  useReducer(workoutReducer, {
        workouts: null
    })

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch, WORKOUT_ACTIONS }} >
            {children}
        </WorkoutContext.Provider>
    )
}