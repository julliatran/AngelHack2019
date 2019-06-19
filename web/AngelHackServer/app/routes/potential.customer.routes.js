module.exports = (app) => {
    const potentialCustomer = require('../controllers/potential.customer.controller.js');

    // Get User used FECredit
    app.get('/potentialcustomer/getuserused', potentialCustomer.getuserused);

    // Get User most match with the user who used FECredit
    app.get('/potentialcustomer/getusermostmatch', potentialCustomer.getusermostmatch);

    // Update user to used FECredit
    app.put('/potentialcustomer/updatetousedfe', potentialCustomer.updatetousedfe);
}