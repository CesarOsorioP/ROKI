// middlewares/checkRole.js
const checkRole = (role) => (req, res, next) => {
    if (!role || (req.user && req.user.tipo === role)) {
        return next();
    }
    return res.status(403).json({ msg: 'Acceso denegado' });
};

module.exports = checkRole;
