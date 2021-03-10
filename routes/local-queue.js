const Queue = require('bull');

const Task = new Queue('common', {
    redis: {
        password: process.env.REDIS_PASS,
        options: {
            maxRetriesPerRequest: 5,
            reconnectOnError(err) {
                console.log(err);
                return true
            }
        }
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
    console.log('job done');
});

Task.on('error', (err) => {
    console.log(err);
});

module.exports = Task;
