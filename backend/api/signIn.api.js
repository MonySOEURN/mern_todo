// const todoRoutes = express.Router();
const User = require('./../models/user.model');

module.exports = (app) => {
    /***
     * Sign Up
     */
    app.post('/api/account/signUp', function( req, res, next) {
        const { body } = req;
        const {
            firstName,
            lastName,
            email,
            password,
            isDeleted
        } = body;
        if(!firstName){
            return res.end({
                success: false,
                message: 'Error: first name can not be blank.'
            });
        }
        if(!lastName){
            return res.end({
                success: false,
                message: 'Error: last name can not be blank.'
            });
        }
        if(!email){
            return res.end({
                success: false,
                message: 'Error: email name can not be blank.'
            });
        }
        if(!password){
            return res.end({
                success: false,
                message: 'Error: password name can not be blank.'
            });
        }

        email = email.toLowerCase();

        // steps:
        // 1. Verify email doesn't exist
        // 2. save
        User.find({
            email: email
        }, (err, previousUsers) => {
            if(err){
                return res.end({
                    success: false,
                    message: 'Error: Server Error!'
                });
            } else if(previousUsers.length > 0){
                return res.end({
                    success: false,
                    message: 'Error: Account Already Exist.'
                });
            } 
            const newUser = new User();
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            newUser.save( (err, user) => {
                if (err) {
                    return res.end({
                        success: false,
                        message: 'Error: Server Error.'
                    });
                }
                return res.end({
                    success: true,
                    message: 'Sign Up'
                });
            });
        })
    })
}