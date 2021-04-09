
const timeOut = async () => {
    return await new Promise(resolve => {
        setTimeout(() => {
            resolve(1)
        }, 5000);
    })
}
module.exports = async (job, done) => {
    console.log(job.id + 'file job start ');
    await timeOut();
    console.log(job.id + 'file job done')
    done();
}
