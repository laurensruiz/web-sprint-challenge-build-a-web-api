// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')
const {validateActionId, validateAction } = require('./actions-middlware')

const router = express.Router()
//
router.get('/', (req, res, next) => {
    Action.get(req.params.id)
    .then(actions => {
      res.json(actions)
    })
    .catch(next)
  });

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
});

router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
    .then(() => {
        return Action.get(req.params.id)
    })
    .then(updatedAction => {
        res.json(updatedAction)
    })
    .catch(next) 
})

router.delete('/:id', validateActionId, (req, res, next) =>{
    Action.remove(req.params.id)
    .then( deletedUser=> {
        res.status(200).json(deletedUser)
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
