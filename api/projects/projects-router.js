// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const { validateProjectId, validatePost } = require('./projects-middleware')

const router = express.Router()
//
router.get('/', (req, res, next) => {
    // RETURN AN ARRAY WITH ALL THE PROJECTS
    Project.get(req.params.id)
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
  });

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.p)
})

router.post('/', validatePost, (req, res, next) => {
    Project.insert({
        name: req.name, 
        description: req.description, 
        completed: req.completed})
    .then(newProj => {
        res.status(201).json(newProj)
    })
    .catch(next)
})


//error handling middleware

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: 'something really bad happened in the router',
      message: err.message,
      stack: err.stack,
    })
  })


module.exports = router
