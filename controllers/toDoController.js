const ToDoItem = require('../models/toDoItem')
const { Op } = require('sequelize')

exports.getTodos = async (req, res) => {
    try {
        const toDos = await ToDoItem.findAll({
            order: [
                ['title', 'ASC'],
            ],
        })
        res.status(200).json({
            status: 'success',
            data: toDos
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail'
        })
    }
}

exports.getTodoByTitle = async (req, res) => {
    try {
        // const title = req.params.title
        const { title } = req.params
        const toDo = await ToDoItem.findOne({ 
            where: {
                title
            },
            order : [
                ['title', 'ASC'],
            ],
        })
        res.status(200).json({
            status: 'success',
            data: toDo
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail'
        })
    }
}

exports.getTodosByDeadlineDateRange = async (req, res) => {
    try {
        const { startDay, startMonth, startYear, endDay, endMonth, endYear } = req.params
        const startDate = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 0)
        const endDate = new Date(endYear, endMonth - 1, endDay, 0, 0, 0, 0)
        console.log('Date 1', { startDate, endDate, startDay, startMonth, startYear })
        const toDosRes = await ToDoItem.findAll({ 
            where: {
                deadlineDate: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                }
              },
              order : [
                ['deadlineDate', 'DESC'],
                ['title','ASC']
            ],
         })
        res.status(200).json({
            status: 'success',
            data: toDosRes
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail'
        })
    }
}

exports.getTodosByPriorityRange = async (req, res) => {
    try {
        const toDosRes = await ToDoItem.findAll({ 
            where: {
                priority: {
                  [Op.gte]: req.params.startPriority,
                  [Op.lte]: req.params.endPriority
                }
              },
              order: [
                ['priority', 'DESC'],
                ['title','ASC']
            ],
         })
        res.status(200).json({
            status: 'success',
            data: toDosRes
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail'
        })
    }
}

exports.getIncompleteTodos = async (req, res) => {
    try {
        const toDosRes = await ToDoItem.findAll({ 
            where: {
                isCompleted: false
            },
            order: [
                ['deadlineDate', 'ASC'],
                ['title','ASC']
            ],
         })
        res.status(200).json({
            status: 'success',
            data: toDosRes
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail'
        })
    }
}

exports.getCompleteTodos = async (req, res) => {
    try {
        const toDosRes = await ToDoItem.findAll({ 
            where: {
                isCompleted: true
            },
            order: [
                ['title','ASC']
            ],
         })
        res.status(200).json({
            status: 'success',
            data: toDosRes
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail'
        })
    }
}


exports.deleteTodosbytitle = async (req, res) => {
    try {
        // const title = req.params.title
        const { title } = req.params
        const toDo = await ToDoItem.destroy({ 
            where: {
                title
            }
        })
        res.status(200).json({
            status: 'success',
            data: toDo
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail'
        })
    }
}

exports.getTodosByPriority = async (req, res) => {
    try {
        const { limit } = req.params
        const toDosRes = await ToDoItem.findAll({ 
            order: [
                ['priority', 'DESC'],
                ['isCompleted', 'ASC'],
                ['deadlineDate', 'DESC'],
            ],
            limit
         })
        res.status(200).json({
            status: 'success',
            data: toDosRes
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail'
        })
    }
}

exports.markTodoAsComplete = async (req, res) => {
    try {
        const { title } = req.params
        const toDo = await ToDoItem.update({ 
            isCompleted: true
        }, {
            where: {
                title
            }
        })
        res.status(200).json({
            status: 'success',
            data: toDo
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail'
        })
    }
}

exports.createTodo = async (req, res) => {
    try {
        const { 
            title,
            description,
            deadlineDay,
            deadlineMonth,
            deadlineYear,
            priority
        } = req.body
        console.log('Req body is', req.body)
        const deadlineDate = new Date(deadlineYear, deadlineMonth - 1, deadlineDay, 0, 0, 0, 0)
        console.log('here 1', deadlineDate)
        const toDo = await ToDoItem.create({ 
            title,
            description,
            deadlineDate,
            priority
        })
        console.log('here 2', toDo)
        // const toDo = await ToDoItem.create(req.body)
        res.status(200).json({
            status: 'success',
            data: toDo
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail',
            check1:'Title Must Be Unique'
        })
    }
}