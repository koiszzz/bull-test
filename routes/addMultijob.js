module.exports = async () => {
    const task = require('./local-queue');
    await Promise.all([1, 2, 3, 5].map(async r => {
        await task.add('childJob', {data: 1}, {removeOnComplete: true});
    }));
}
