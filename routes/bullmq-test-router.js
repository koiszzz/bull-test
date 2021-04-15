var express = require('express');
var router = express.Router();
const Task = require('./local-queue-mq')
const {Flow} = require('bullmq');

const flow = new Flow();

router.get('/add', async (req, res) => {
    await flow.add({
        name: 'parent',
        queueName: 'parent',
        children: [
            { name: 'child', data: { place: 'ceiling' }, queueName: 'child' },
            { name: 'child', data: { place: 'walls' }, queueName: 'child' },
            { name: 'child', data: { place: 'call' }, queueName: 'child' },
        ],
    })
    res.json({
        list: await Task.getJobs(['delayed', 'active', 'waiting', 'paused', 'stuck']),
        // job,
        // job2,
        // job3
    })
})

module.exports = router;
