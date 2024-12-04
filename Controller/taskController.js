const Task = require('../Model/schema');
const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED').optional(),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').optional(),
    dueDate: Joi.date().optional()
});


exports.createTask = async (req, res) => {
    try {
        const { error } = taskSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getTasks = async (req, res) => {
    try {
        const { status, priority, sort, limit = 10, skip = 0 } = req.query;
        const query = {};
        if (status) query.status = status;
        if (priority) query.priority = priority;

        const tasks = await Task.find(query)
            .sort(sort ? { [sort]: 1 } : {})
            .limit(Number(limit))
            .skip(Number(skip));
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const { error } = taskSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const task = await Task.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};