const steps = require('../modules/stepsmodule');

exports.getallsteps = async (req, res) => {
    try{
    const Steps = await steps.find();

    res.status(200).json({
        status: 200,
        data: {
            Steps
        }
    })

}catch{
    res.status(404).json({
        status: 404,
        message: 'not found'
    })
}

} 