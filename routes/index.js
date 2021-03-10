var express = require('express');
var router = express.Router();
const Task = require('./local-queue');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', async (req, res, next) => {
  await Task.add('job', {data: 1});
  res.json({
    list: await Task.getJobs(['completed', 'failed', 'delayed', 'active', 'waiting', 'paused', 'stuck'])
  })
})

module.exports = router;
