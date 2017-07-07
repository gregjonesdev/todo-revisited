const express = require ('express')
const app = express()

const models = require('./models')
const mustacheExpress = require ('mustache-express')

const path = require('path')

const bodyParser = require('body-parser')

app.engine('mustache', mustacheExpress())

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.set('views', './views')
app.set('view engine', 'mustache')

// Add a task
// const task = models.task.build({
//   title: "mow the lawn",
//
// })


//fetch all tasks: returns an ARRAY of tasks
//models.task.findAll().then(function(task){
//console.log(task)
//})

//find by ID
//models.task.findById(3).then(function(task){
//console.log(task)
//})

//saving a new task
// task.save().then(function(newTask){
//   console.log(newTask)
// })

//find a particular task
// models.task.findOne({
//   where: {
//     title: "mow the lawn"
//   }
// }).then(function(task) {
//   console.log(task)
// })

// plain find one task
// models.task.findOne().then(function(task){
//   console.log(task)
// })

//Delete a task
//models.task.destroy({
//where: {title: 'feed the fish'}
//}).then(function(){})


app.get('/', function (req, res) {
  models.task.findAll().then(function(task){
    res.render('index', {tasks: task})
  })
  //only have access to tasks inside here
})

app.post('/complete', function(req, res){
  models.task.findById(req.body.task).then(function(task){
    task.update({
      iscompleted: true})
      .then(function(task){
        task.save()
      })
  })
res.redirect('/')
})


app.post('/add', function(req, res){


   const task = models.task.build({
      title: req.body.newTask
    })
    console.log("ok?")
    // .then(function(task){
    task.save()
    // })

  res.redirect('/')

})

app.post('/clear', function(req, res){

  models.task.destroy({where: {iscompleted: true}})

  res.redirect('/')
})


app.listen(3000, function(){
  console.log("3000")
})
