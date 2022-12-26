import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");    // frontend will send token in Authorization hearder with Bearer set

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        
        next(); // next function will be executed

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}