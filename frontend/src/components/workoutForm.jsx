import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {

    const { dispatch, WORKOUT_ACTIONS } = useWorkoutContext()
    const { user } = useAuthContext()

    const [formValues, setFormValues] = useState({
        title: '',
        load: '',
        reps: ''
    })

    const [error, setError] = useState(null)

    const handleChange = e => {
        e.preventDefault()
        const { name, value} = e.target
        setFormValues ( prev => {
            return {
                ...prev, [name]: value
            }
        })
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!simpleValidation()) return
        if (!user) return
        const res = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(formValues)
        })

        const json = await res.json()

        if (res.ok) {
            setError(null)
            dispatch({type: WORKOUT_ACTIONS.ADD_WORKOUT, payload: json})
            setFormValues({
                title: '',
                load: '',
                reps: ''
            })
        }
    }

    const simpleValidation = () => {
        setError('All fields must be filled')
        if ( formValues.title === "") return false
        if ( formValues.reps === "") return false
        if ( formValues.load === "") return false

        setError(null)
        return true
    }


    return ( 
        <form className="workout-form" onSubmit={handleSubmit}>
            <label>Workout title</label>
            <input 
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleChange}
            />
            <label>Workout load</label>
            <input 
                type="number"
                name="load"
                value={formValues.load}
                onChange={handleChange}
            />
            <label>Workout reps</label>
            <input 
                type="number"
                name="reps"
                value={formValues.reps}
                onChange={handleChange}
            />
            
            {error && <p className="error-message">{error}</p>}

            <button className="button">Add workout</button>
        </form>

     );
}
 
export default WorkoutForm;