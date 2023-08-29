import WorkoutElement from "../components/workout-element";
import WorkoutForm from "../components/workoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
    
    const { workouts, dispatch, WORKOUT_ACTIONS } = useWorkoutContext()
    const { user } = useAuthContext()

    const [error, setError] = useState(null)

    useEffect (() => {

        const fetchWorkouts = async () => {

            const res = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (!res.ok) {
                setError ('could not fetch')
                return
            }

            const json = await res.json()

            if (res.ok) {
                setError(null)
                dispatch({type: WORKOUT_ACTIONS.SET_WORKOUTS, payload: json})
            } 
        }
        if(user) {
            fetchWorkouts()
        }

    }, [dispatch, user])


    return ( 
        <div className="home">
            <div className="workout-container">
                {error && <p>{error}</p>}
                {!workouts || workouts.length < 1 && <h2>No Workouts</h2>}
                {workouts && workouts.map(workout => (
                    <WorkoutElement key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
    
        </div>
     );
}
 
export default Home;