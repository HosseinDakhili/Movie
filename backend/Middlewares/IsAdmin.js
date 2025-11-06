export const isAdmin = (req, res, next) => {
    if (req?.role !== 'admin' && req?.role !== "superAdmin") {
        return res.status(403).json({
            success: false,
            message: "شما دسترسی لازم برای انجام این عملیات را ندارید"
        });
    }
    next();
}

export default isAdmin;
