const Queue = require('bull');
const path = require('path');

const Task = new Queue('common', {
    redis: {
        host: 'localhost',
    },
    limiter: {
        max: 30,
        duration: 1000
    },
    settings: {
        backoffStrategies: {
            jitter: function (attemptsMade, err) {
                return 5 * 60000 * attemptsMade + Math.random() * 500;
            }
        }
    }
});

Task.process('job', 1,(job) => {
    console.log(job.id + 'normal job done');

});

// Task.process('fileJob', 1, path.resolve(__dirname, 'processes/test'));
Task.process('childJob', 1, async () => {
    console.log('childJob start');
    await timeOut();
    await Task.add('job', {job: 1}, {removeOnComplete: true});
    console.log('childJob done');
});

const timeOut = async () => {
    return await new Promise(resolve => {
        setTimeout(() => {
            resolve(1)
        }, 5000);
    })
}
// Task.process('asyncJob', 1, async (job) => {
//     console.log(job.id + 'async job start')
//     await timeOut()
//     console.log(job.id + 'async job done');
// });

Task.on('error', (err) => {
    console.log(err);
});

console.log('****** load bull task ******')

module.exports = Task;
