const User = require('../model/User')


async function getPeference(req, res) {
    console.log(req.user)
    if (!req.user) {
        return res.status(401).json({ message: req.message });
    }

    return res.status(200).json({ preferences: req.user.preferences });
}
async function putPeference(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: req.message });
    }

    const { preference } = req.body;

    // Ensure preferences is an array
    if (!Array.isArray(preference)) {
        return res.status(400).json({ message: "Preferences should be an array" });
    }

    User.findOneAndUpdate(
        { email: req.user.email },
        { preference: preference }, // Update preferences with the new array
        { new: true }
    )
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res
                .status(200)
                .json({ message: "Preferences updated successfully" });
        })
        .catch((err) => {
            return res.status(500).json({ error: err.message });
        });
}

module.exports = { putPeference, getPeference };