const { getUserByID } = require('./user.flows')

exports.getUser = async (req, res) => {
    try {
        const { id } = req.query
        const response = await getUserByID(id);
        return res.json(response)    
    } catch (error) {
        return res.status(500).json(error)
    }
    
}