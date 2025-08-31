const Task = require('../models/Task')

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const createTask = async (req, res) => {
    const {name, date} = req.body;
    try {
        const task = await Task.create({
            name:name,
            date:date
        }) 
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const updateTask = async (req, res) => {
    const {id} = req.params;
    const {name, date} = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
                {_id:id}, 
                {name:name, date:date},
                {new:true}
        )
        if (!updatedTask) {
            res.status(404).json({msg:"Error, task not found!!"})
        }
        res.status(200).json({ task:updatedTask })  
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const deleteTask = async (req, res) => {
  const {id} = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({msg: "Task not found"});
    res.status(200).json({ task: deletedTask }); // return deleted task
  } catch (error) {
    res.status(500).json({msg:error});
  }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}