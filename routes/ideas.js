const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea.js');



// common error handler
function errorHandler(response, error) {
  console.log(error);
  return response.status(500).json({success: false, error: 'Something went wrong'});
}



// get all ideas
router.get('/', async function(request, response) {
  try {
    const ideas = await Idea.find();
    response.json({success: true, data: ideas});
  } catch (error) {
    return errorHandler(response, error);
  }
});

// get a single idea
router.get('/:id', async function(request, response) {
  try {
    const idea = await Idea.findById(request.params.id);
    if (!idea) {
      return response.status(404).json({success: false, error: 'Resourse not found'});
    }
    return response.json({success: true, data: idea});
  } catch (error) {
    return errorHandler(response, error);
  }
});



// Add an idea
router.post('/', async function(request, response) {
  const idea = new Idea({
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username,
  });

  try {
    const savedIdea = await idea.save();
    return response.json({success: true, data: idea});
  } catch (error) {
    return errorHandler(response, error);
  }
});



// update an idea
router.put('/:id', async function(request, response) {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(request.params.id, {
        $set: {
          text: request.body.text,
          tag: request.body.tag,
        }
      },
      {new: true}
    );
    return response.json({success: true, data: updatedIdea});
  } catch (error) {
    return errorHandler(response, error);
  }
});



// delete an idea
router.delete('/:id', async function(request, response) {
  try {
    await Idea.findByIdAndDelete(request.params.id);
    return response.json({success: true});
  } catch (error) {
    return errorHandler(response, error);
  }
});



module.exports = router;