const countries = require('../modules/countriesmodule');

exports.getallcountries = async (req, res) => {
    try{
        const Countries = await countries.find();

        res.status(200).json({
            status: 200,
            data: {
                Countries
            }
        })
    }catch{
        res.status(404).json({
            status: 404
        })
    }
}