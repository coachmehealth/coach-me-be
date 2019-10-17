const jwt = require('jsonwebtoken');

module.exports = {
    generateToken,
    authenticateToken
};

function generateToken(client) {
    const payload = {
        clientId: client.fields['Coaching master table'][0],
        clientName: client.fields['Client Name'],
        clientPhone: client.fields.Phone
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    console.log(token);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(401).json({ error: 'that token does not work' });
            } else {
                req.clientInfo = decodedToken;
                console.log('decoded token', req.clientInfo);
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'NO TOKEN' });
    }
}
