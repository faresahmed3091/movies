const jwt = require("jsonwebtoken");
const userModel = require("../DB/model/User");
const auth = () => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers['authorization']
            console.log(headerToken);
            if (!headerToken || headerToken == null ||
                headerToken == undefined || !headerToken.startsWith('Bearer ')) {
                res.json({ message: "in-valid header token" })
            } else {
                const token = headerToken.split(" ")[1]
                console.log(token);
                if (!token || token == null || token == undefined || token.length == 0) {
                    res.json({ message: "In-valid token" })
                } else {
                    const decoded = jwt.verify(token, 'shhhh')
                    console.log(decoded);

                    if (decoded && decoded.isLoggedIn == true) {
                        const findUser = await userModel.findById(decoded.id).select('email name _id')
                        console.log(findUser);
                        if (findUser) {
                            req.user = findUser
                            next()
                        } else {
                            res.json({ message: "in-valid loggin user" })
                        }
                    } else {
                        res.json({ message: "in-valid token signature" })
                    }

                }
            }
        } catch (error) {
            res.json({ message: "catch error", error })

        }


    }
}

module.exports = {
    auth
}