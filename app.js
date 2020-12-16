const express = require('express')
const bodyParser = require('body-parser')
const toDoItem = require('./models/toDoItem')
const toDoController = require('./controllers/toDoController')
const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(bodyParser.json())

// ?, :params ==> GET req.query => ?, req.params => .(url params)
// post ==> body

// For point 2, use query params
//add option to update other attributes
//add error for same title entry
app.get('/todos', toDoController.getTodos)
app.get('/todos/incomplete', toDoController.getIncompleteTodos)
app.get('/todos/complete', toDoController.getCompleteTodos)
app.get('/todos/:title', toDoController.getTodoByTitle)
app.get('/todos/priority-filter/:startPriority/:endPriority', toDoController.getTodosByPriorityRange)
app.get('/todos/deadlinedate-range-filter/:startDay/:startMonth/:startYear/:endDay/:endMonth/:endYear', toDoController.getTodosByDeadlineDateRange)
app.get('/todos/top-priority/:limit', toDoController.getTodosByPriority)
app.patch('/todos/:title/mark-complete', toDoController.markTodoAsComplete)
app.post('/todos', toDoController.createTodo)
app.delete('/todos/:title',toDoController.deleteTodosbytitle)




module.exports = app