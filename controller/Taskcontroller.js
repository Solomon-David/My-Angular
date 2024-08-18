const Taskes = require('../Model/Tasks')

const getAllTask = async (req, res) => {
    try {
        const task = await Taskes.find({})
        res.status(200).json(task)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
    }
}
const addTask = async (req, res) => {
    try {
        const newTask = await Taskes.create(req.body)

        res.status(201).json(newTask)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
    }
}
const getTask = async (req, res) => {
    try {
        const { id: TaskID } = req.params
        const task = await Taskes.findOne({ _id: TaskID })
        if (!task) {
            return res.status(404).json({ msg: ` no id with the ${TaskID}` })
        }
        res.status(200).json({ task })
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}
const UpdateTask = async (req, res) => {
    try {
        const { id: TaskID } = req.params;
        const updatedTask = await Taskes.findOneAndUpdate({ _id: TaskID }, req.body, { new: true, runValidators: true })
        res.status(200).json({ updatedTask })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
    }
}
const deleteTask = async (req, res) => {
    const { id: taskID } = req.params
    const task = await Taskes.findOneAndDelete({ _id: taskID })
    if (!task) {
        return res.status(404).send(`no Task with ${taskID}`)
    }
    res.status(200).json({ task })
}

module.exports = {
    getAllTask,
    addTask,
    getTask,
    UpdateTask,
    deleteTask
}