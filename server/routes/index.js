const usercontroller = require('../controllers').user_details;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Fitness Tracker API!',
  })); 
  app.get('/api/user_details/:userid', usercontroller.retrieve);
  app.post('/api/userregistration', usercontroller.create);
  app.post('/api/userregistration/:userid/update', usercontroller.update);

};