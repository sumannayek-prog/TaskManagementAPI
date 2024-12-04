// const express = require("express");
// const Task = require("../Model/schema");
// const { body, param, query, validationResult } = require("express-validator");

// const router = express.Router();

// const handleValidationErrors = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// router.post(
//   "/",
//   [
//     body("title")
//       .notEmpty()
//       .withMessage("Title is required")
//       .isLength({ max: 100 })
//       .withMessage("Title must be under 100 characters"),
//     body("priority")
//       .isIn(["LOW", "MEDIUM", "HIGH"])
//       .withMessage("Invalid priority value"),
//   ],
//   handleValidationErrors,
//   async (req, res, next) => {
//     try {
//       const task = await Task.create(req.body);
//       res.status(201).json(task);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.get("/", async (req, res, next) => {
//   try {
//     const {
//       status,
//       priority,
//       sort = "createdAt",
//       order = "asc",
//       limit = 10,
//       skip = 0,
//     } = req.query;
//     const filter = {};
//     if (status) filter.status = status;
//     if (priority) filter.priority = priority;

//     const tasks = await Task.find(filter)
//       .sort({ [sort]: order === "asc" ? 1 : -1 })
//       .limit(Number(limit))
//       .skip(Number(skip));
//     res.json(tasks);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get(
//   "/:id",
//   param("id").isMongoId().withMessage("Invalid task ID"),
//   handleValidationErrors,
//   async (req, res, next) => {
//     try {
//       const task = await Task.findById(req.params.id);
//       if (!task) return res.status(404).json({ message: "Task not found" });
//       res.json(task);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.put(
//   "/:id",
//   [
//     param("id").isMongoId().withMessage("Invalid task ID"),
//     body("priority")
//       .optional()
//       .isIn(["LOW", "MEDIUM", "HIGH"])
//       .withMessage("Invalid priority value"),
//   ],
//   handleValidationErrors,
//   async (req, res, next) => {
//     try {
//       const task = await Task.findByIdAndUpdate(
//         req.params.id,
//         { ...req.body, updatedAt: Date.now() },
//         { new: true }
//       );
//       if (!task) return res.status(404).json({ message: "Task not found" });
//       res.json(task);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.delete(
//   "/:id",
//   param("id").isMongoId().withMessage("Invalid task ID"),
//   handleValidationErrors,
//   async (req, res, next) => {
//     try {
//       const task = await Task.findByIdAndDelete(req.params.id);
//       if (!task) return res.status(404).json({ message: "Task not found" });
//       res.status(204).end();
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// module.exports = router;



// const express = require('express');
// const Task = require('../Model/schema');
// const validateTask = require('../validation/taskValidation');
// const router = express.Router();

// router.post('/tasks', async (req, res) => {
//     const { error } = validateTask(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const task = new Task({
//         title: req.body.title,
//         description: req.body.description,
//         status: req.body.status,
//         priority: req.body.priority,
//         dueDate: req.body.dueDate,
//         createdAt: Date.now(),
//         updatedAt: Date.now()
//     });

//     try {
//         const savedTask = await task.save();
//         res.status(201).json(savedTask);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// router.get('/tasks', async (req, res) => {
//     const { status, priority, sort, limit = 10, skip = 0 } = req.query;

//     const filter = {};
//     if (status) filter.status = status;
//     if (priority) filter.priority = priority;

//     const sortOptions = {};
//     if (sort) {
//         const [field, order] = sort.split(':');
//         sortOptions[field] = order === 'desc' ? -1 : 1;
//     }

//     try {
//         const tasks = await Task.find(filter).sort(sortOptions).limit(Number(limit)).skip(Number(skip));
//         res.json(tasks);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// router.get('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.id);
//         if (!task) return res.status(404).send('Task not found');
//         res.json(task);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// router.put('/tasks/:id', async (req, res) => {
//     const { error } = validateTask(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, {
//             ...req.body,
//             updatedAt: Date.now()
//         }, { new: true });

//         if (!task) return res.status(404).send('Task not found');
//         res.json(task);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// router.delete('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id);
//         if (!task) return res.status(404).send('Task not found');
//         res.status(204).send();
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const taskController = require('../Controller/taskController');

router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.get('/tasks', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;