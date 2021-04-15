const {Queue, Worker} = require('bullmq');
// const path = require('path');

const Task = new Queue('child', {
    connection: {
        host: 'localhost'
    },
    defaultJobOptions: {
        removeOnComplete: true
    }
});

new Queue('parent', {
    connection: {
        host: 'localhost'
    },
    defaultJobOptions: {
        removeOnComplete: true
    }
});

const timeOut = async () => {
    return await new Promise(resolve => {
        setTimeout(() => {
            resolve(1)
        }, Math.round(Math.random() * 1000));
    })
}

new Worker('parent', async (job) => {
    console.log(`parent job#${job.id} running `);
    await timeOut();
    console.log(`parent job#${job.id} done `);
});

new Worker('child', async (job) => {
    console.log(`child job#${job.id} running`)
    await timeOut();
    console.log(`child job#${job.id} done`)
}, {concurrency: 2});

console.log('------load task mq--------');

module.exports = Task;
