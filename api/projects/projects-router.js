// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')

const router = express.Router()
//
router.get('/', (req, res, next) => {
    // RETURN AN ARRAY WITH ALL THE USERS
    Project.get(req.params.id)
    .then(users => {
      res.json(users)
    })
    .catch(next)
  });

//error handling middleware

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).jsson({
      customMessage: 'something really bad happened in the router',
      message: err.message,
      stack: err.stack,
    })
  })


module.exports = router
