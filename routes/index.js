var express = require('express');
var router = express.Router();
const Task = require('./local-queue');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/add', async (req, res, next) => {
    try {
        const job = await Task.add('job', {data: 1}, {
            removeOnComplete: true
        });
        const job2 = await Task.add('asyncJob', {data: 1}, {
            removeOnComplete: true,
        });
        const job3 = await Task.add('fileJob', {data: 1}, {
            removeOnComplete: true,
        });
        const job4 = await Task.add('childJob', {data: 1}, {
            removeOnComplete: true
        })
        res.json({
            list: await Task.getJobs(['delayed', 'active', 'waiting', 'paused', 'stuck']),
            job,
            job2,
            job3
        })
    } catch (e) {
        res.json({
            message: e.message
        })
    }
})

module.exports = router;
