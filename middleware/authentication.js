// middleware for authentication
module.exports = authorize; 

function authorize (request, _response, next) {
    return (request, response, next) => {
        // set user on-success
        if (request.isAuthenticated()){
            return response.redirect('/profile');
        } else {
            next();
        }
    }
}
