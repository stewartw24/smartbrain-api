const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '9cbe88867cec4d3487425e2b02a5c38e'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data => {
            res.json(data);
        }).catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }).catch(err => res.status(400).json('unable to get entries'))
    // let found = false;  //don't need this if connecting to a database
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         user.entries++
    //         return res.json(user.entries);
    //     }
    // })
    // if (!found) {
    //     res.status(400).json('not found');
    // }
}

module.exports = {
    handleImage,
    handleApiCall
}