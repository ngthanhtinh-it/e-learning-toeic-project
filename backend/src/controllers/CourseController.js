import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

// Hàm tạo khóa học mới
const createCourse = async (req, res) => {
    const { title, description, thumbnail_url, price, duration_days, level } = req.body;
    const userId = req.body.userId; // Lấy userId từ middleware auth
    try {
        // Truy vấn DB lấy thông tin user xác thực quyền (role) thay vì nhận từ req.body
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        }
        
        // kiểm tra user có phải là giảng viên hoặc admin hay không
        if (user.role !== 'instructor' && user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Chỉ giảng viên hoặc admin mới có quyền tạo khóa học' });
        }

        // Tạo khóa học mới 
        // Tạo slug từ title (ví dụ: "Khóa học JavaScript cơ bản" -> "khoa-hoc-javascript-co-ban")
        const slug = title.toLowerCase().replace(/ /g, '-');

        const newCourse = new Course({
            title,
            description,
            thumbnail_url,
            price,
            duration_days,
            level,
            slug : slug,
            created_by : userId // Lưu thông tin giảng viên tạo khóa học
        });
        await newCourse.save();
        res.status(201).json({ success: true, message: 'Khóa học đã được tạo thành công', course: newCourse });
    } catch (error) {
        console.error('Lỗi khi tạo khóa học:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tạo khóa học' });
    }
};

export { createCourse };  