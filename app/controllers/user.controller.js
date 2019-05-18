const User = require('../models/user.model.js');

 
exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }
    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }
    if(!req.body.phone) {
        return res.status(400).send({
            message: "User phone can not be empty"
        });
    }

    const user = new User({
        name: req.body.name, 
        email: req.body.email,
        phone: req.body.phone
    });

    
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};


exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }
    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }
    if(!req.body.phone) {
        return res.status(400).send({
            message: "User phone can not be empty"
        });
    }


    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};