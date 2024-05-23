import express from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../../frameworks/database/models/user';
import { genAccessToken } from '../../application/functions/CommonFunctions';

const authRouter = express.Router();

authRouter.post('/refresh-token', async (req, res) => {
    console.log('REFRESH TOKEN ENDPOINT CALLED');
    
    const refreshToken = req.body.refreshToken;
    
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, 'thadavil__aanu') as jwt.JwtPayload;

        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        const accessToken = genAccessToken(user,'user');

        res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token.' });
    }
});


export default authRouter