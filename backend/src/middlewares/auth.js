import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // Lấy token từ header Authorization (Bearer <token>) hoặc từ header 'token'
    const token = req.headers.authorization?.split(" ")[1] || req.headers.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Không tìm thấy token' });
    }
    // Xác thực token
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!req.body) req.body = {};
        req.body.userId = token_decoded.id; // Lưu userId vào req để sử dụng trong các route tiếp theo
        next(); // Cho phép tiếp tục đến route tiếp theo
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token không hợp lệ' });
    }
}
export default authMiddleware;