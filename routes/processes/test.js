
const timeOut = async () => {
    return await new Promise(resolve => {
        setTimeout(() => {
            resolve(1)
        }, 5000);
    })
}
module.exports = async (job, done) => {
    console.log('file job start ');
    await timeOut();
    console.log('file job done')
    done();
}
