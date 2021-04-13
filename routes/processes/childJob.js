const Task = require('../local-queue');

module.exports = async (job, done) => {
    console.log(job.id + ' child job start ');
    await Task.add('fileJob', {job: 1}, {removeOnComplete: true});
    console.log(job.id + ' child job done')
    done();
}
