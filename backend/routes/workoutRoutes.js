const express = require('express')

const { 
    getWorkouts,
    createWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers')


const { requireAuth } = require('../middleware/requireAuth')

const router = express.Router()


router.use(requireAuth)

router.get('/', getWorkouts)

router.get('/:id', getSingleWorkout)

router.post('/', createWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)




module.exports = router