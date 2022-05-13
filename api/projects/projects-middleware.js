// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
  try{
    const project = await Project.get(req.params.id)
    if(!project){
      res.status(404).json({
        message: "project not found"
      })
    } else{
      req.p = project
      next()
    }
  } catch (err) {
    res.status(500).json({
        message: "problem finding project"
      })
  }
}

function validatePost(req, res, next) {
    const {name, description, completed } = req.body
    if(!name || !description || typeof completed !== 'boolean'){
        res.status(400).json({
            message: "Please provide all details"
        })
    } else {
        next()
    }
}


module.exports = {validateProjectId, validatePost}
