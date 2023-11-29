const express = require('express');
const router = express.Router();



let ideas = new Array(
  {
    id: 1,
    text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
);



// get all ideas
router.get('/', function(request, response) {
  response.json({success: true, data: ideas});
});

// get a single idea
router.get('/:id', function(request, response) {
  const idea = ideas.find(function(item) {
    return item.id === Number(request.params.id);
  });

  if (!idea) {
    return response.status(404).json({success: false, error: 'Resourse not found'});
  }

  return response.json({success: true, data: idea});
});



// Add an idea
router.post('/', function(request, response) {
  const idea = {
    id: ideas.length + 1,
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username,
    date: new Date().toISOString().slice(0, 10),
  };

  ideas.push(idea);

  response.json({success: true, data: idea});
});



// update an idea
router.put('/:id', function(request, response) {
  const targetID = Number(request.params.id);
  const idea = ideas.find((item) => item.id === targetID);

  if (!idea) {
    return response.status('400').json({success: false, error: 'Resourse with specified ID not found'});
  }

  idea.text = request.body.text || idea.text;
  idea.tag = request.body.tag || idea.tag;
  idea.date = new Date().toISOString().slice(0, 10);

  return response.json({success: true, data: idea});
});



// delete an idea
router.delete('/:id', function(request, response) {
  const targetID = Number(request.params.id);
  const idea = ideas.find((item) => item.id === targetID);

  if (!idea) {
    return response.status('400').json({success: false, error: 'Resourse with specified ID not found'});
  }

  const index = ideas.indexOf(idea);
  ideas.splice(index, 1);

  return response.json({success: true});
});



module.exports = router;