const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized as admin' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}; 