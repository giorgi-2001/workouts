import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext"

export const useLogout = () => {

    const { dispatch } =  useAuthContext()
    const { WORKOUT_ACTIONS, dispatch: workoutDispatch } = useWorkoutContext()

    const logout = () => {

        dispatch({type: 'LOGOUT'})
        localStorage.removeItem('user')

        workoutDispatch({ type: WORKOUT_ACTIONS.SET_WORKOUTS, payload: null})

    }

    return { logout }
}