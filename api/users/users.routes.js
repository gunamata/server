var Users = require('./users.controller');

module.exports = function(router) {
    router.post('/users/', Users.createUser);
    router.get('/users/', Users.getUsers);
    router.get('/users/:id', Users.getUser);
    router.get('/users/getUUID/:email', Users.getUUID);
    router.put('/users/:id', Users.updateUser);
    router.delete('/users/:id', Users.removeUser);
}