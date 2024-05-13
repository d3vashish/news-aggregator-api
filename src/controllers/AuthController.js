var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const User = require("../model/User")

// Function to generate JWT
function generateAccessToken(user) {
    return jwt.sign({
        id: user.id
    }, "this is secret key", {
        expiresIn: 86400
    });
}

var signup = (req, res) => {
    // Validation
    if (!req.body.fullName || !req.body.email || !req.body.password) {
        return res.status(400).send({ message: "All fields are required." });
    }

    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save()
        .then(data => {
            res.status(200).send({ message: "User Registered successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: "Error registering user." });
        });
};

var signin = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Email and password are required." });
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }
            var token = generateAccessToken(user);
       
            res.status(200).send({
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                },
                message: "Login successful",
                accessToken: token,
            });
        })
        .catch(err => {
            res.status(500).send({ message: "Error signing in." });
        });
};

module.exports = { signin, signup };
