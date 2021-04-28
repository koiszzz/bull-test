const {Worker, FlowProducer} = require('bullmq')

const worker1 = new Worker('test1', async job => {
    console.log('1');
    return 1;
});
const worker2 = new Worker('test2', async job => {
    console.log('2');
    return 2;
});
const flowPro = new FlowProducer();

(async () => {
    await flowPro.add({
        name: 'parent-task', data: {}, queueName: 'test1', opts: {removeOnComplete: true},
        children: [{name: 'children-task', data: {}, queueName: 'test2', opts: {removeOnComplete: true}}]
    });
})();
