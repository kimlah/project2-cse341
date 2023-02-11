const validator = require('../helpers/validate');
const user = async (req, res, next) => {
    const userRule = {
        "username": "required|string",
        "password": "required|string|min:6",
        "email": "required|string|email",
        "firstName": "required|string",
        "lastName": "required|string",
        "birthday": "string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const recipe = async (req, res, next) => {
    const recipeRule = {
        "recipeName": "required|string",
        "source": "required|string",
        "servings": "string",
        "timeNeeded": "string",
        "cuisine": "string",
        "recipeType": "string",
        "notes": "string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

module.exports = {
    user,
    recipe
}