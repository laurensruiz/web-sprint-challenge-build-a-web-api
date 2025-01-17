// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const { validateProjectId, validatePost } = require('./projects-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get(req.params.id)
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
  });

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.p)
});

router.post('/', validatePost, (req, res, next) => {
    Project.insert(req.body)
    .then(newProj => {
        res.status(201).json(newProj)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validatePost, (req, res, next) => {
    Project.update(req.params.id, req.body)
    .then(() => {
        return Project.get(req.params.id)
    })
    .then(updatedProj => {
        res.json(updatedProj)
    })
    .catch(next) 
})

router.delete('/:id', validateProjectId, (req, res, next) =>{
    Project.remove(req.params.id)
    .then( deletedUser=> {
        res.status(200).json(deletedUser)
    })
   .catch(next)
})

router.get('/:id/actions', validateProjectId, (req, res, next)=> {
    Project.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
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
