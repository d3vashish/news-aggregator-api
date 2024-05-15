var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const User = require("../model/User")



var signup = (req, res) => {
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role,
        preference: req.body.preference,
    });
    user
        .save()
        .then((data) => {
            return res.status(200).json({ message: "User registered successfully" });
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
};

var signin = (req, res) => {
    let emailPassed = req.body.email;
    let passwordPassed = req.body.password;
    User.findOne({
        email: emailPassed,
    })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            var isPasswordValid = bcrypt.compareSync(passwordPassed, user.password);
            if (!isPasswordValid) {
                return res.status(401).send({
                    message: "Invalid Password",
                });
            } else {
                var token = jwt.sign(
                    {
                        id: user.id,
                    },
                    "this is secret",
                    {
                        expiresIn: 86400,
                    }
                );
                console.log("here");
                return res.status(200).send({
                    user: {
                        id: user.id,
                    },
                    message: "Login successful",
                    accessToken: token,
                });
            }
        }).catch((err) => {
            return res.status(500).json("error", err);
        });
};

module.exports = { signin, signup };
