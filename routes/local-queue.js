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

Task.process('job', () => {
    console.log('normal job done');
});

Task.process('fileJob', 5, path.resolve(__dirname, 'processes/test'));

const timeOut = async () => {
    return await Promise(resolve => {
        setTimeout(() => {
            console.log('timeout');
            resolve(1)
        }, 5000);
    })
}
Task.process('asyncJob', async () => {
    console.log('async job start')
    await timeOut()
    console.log('async job done');
});

Task.on('error', (err) => {
    console.log(err);
});

module.exports = Task;
