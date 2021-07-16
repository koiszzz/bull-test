const {Worker, FlowProducer, Queue, QueueScheduler } = require('bullmq')

const worker1 = new Worker('test1', async job => {
    console.log(job.name + job.id + ' log 1');
    return 1;
});
const worker2 = new Worker('test2', async job => {
    console.log(job.name + job.id + ' log 2');
    return 2;
});
const worker3 = new Worker('test3', async job => {
    console.log(`${job.name} # ${job.id} running`);
    console.log(`attemptMade: ${job.attemptsMade}`)
    throw new Error('some thing wrong');
}, {
    settings: {
        backoffStrategies: {
            jitter(attempts) {
                console.log('attempt:' + attempts);
                return 3000
            }
        }
    }
});
const queueScheduler  = new QueueScheduler('test3');
worker3.on('failed', (job, error) => {
    console.log(`${job.name} # ${job.id} failed`);
});
worker3.on('drained', async () => {
    console.log('worker 3 drained');
    const delayed = await queue3.getJobs(['delayed']);
    console.log('delayed jobs: ' + delayed.map(j => j.id).join(','));
});
const flowPro = new FlowProducer();
const queue3 = new Queue('test3', {});

(async () => {
    // await flowPro.add({
    //     name: 'parent-task', data: {}, queueName: 'test1', opts: {removeOnComplete: true},
    //     children: [{name: 'children-task', data: {}, queueName: 'test2', opts: {removeOnComplete: true}}]
    // });
    await queue3.add('local-test-de', {
        data: 1,
    }, {
        attempts: 3,
        backoff: {type: 'jitter'}
    });
    await queue3.add('local-test-ex', {
        data: 1
    }, {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 2
        }
    });
})();
