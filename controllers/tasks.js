const Task = require('../models/Task')

const getAllTasks = async (req, res)=>{

    try{
        const tasks = await Task.find({})
        res.status(200).json(tasks.filter(task => String(task.user) === String(req.user._id)))
    }catch(error){
        res.status(500).json({msg:error})

    }
    
}
const createTask = async (req, res)=>{
    try{
        console.log("req.user:", req.user);
        const task = await Task.create({
            message: req.body.message,
            user: req.user._id,
            completed: false
        })
        res.status(201).json({task}) 
    }catch(error){
        res.status(500).json({msg:error})
    }
    
}
const getTask = async (req, res)=>{
    try{
        const {itemId: taskID} = req.params
        const task = await Task.findOne({ _id: taskID, user: req.user._id })
        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }


        res.status(200).json(task)

    }catch(error){
        res.status(500).json({msg:error})

    }
    res.send('all items from the file')
}
const updateTask = async (req, res) => {
  try {
    const { itemId: taskID } = req.params;
    console.log(req.user._id);
    

    const task = await Task.findOne({ _id: taskID, user: req.user._id });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    task.completed = true;
    await task.save();

    res.status(200).json({ msg: "Successfully updated task", task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { itemId: taskID } = req.params;

    const deletedTask = await Task.findOneAndDelete({
      _id: taskID,
      user: req.user._id
    });
    

    if (!deletedTask) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ msg: "Successfully deleted task" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports={
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}