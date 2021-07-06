// middleware for doing role-based permissions
  module.exports = permit; 
    
  function permit (rolesPermitidos) {
    // return a middleware
    return (request, response, next) => {
      const { user } = request;

      if (user && rolesPermitidos.includes(user.rol)) {
        next(); // role is allowed, so continue on the next middleware
      } else {
        return response.render('error', {message: "Usuario no autorizado", error:{}}); // user is forbidden
      }
    }
  }
