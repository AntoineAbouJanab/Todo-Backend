const express = require('express')
const authenticateToken = require('../controllers/auth')


const router = express.Router();
router.use(authenticateToken)
const {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks')


router.get('/', getAllTasks)
router.get('/:itemId', getTask)
router.post('/create',createTask )
router.delete('/:itemId',deleteTask )
router.put('/:itemId', updateTask)


module.exports = router