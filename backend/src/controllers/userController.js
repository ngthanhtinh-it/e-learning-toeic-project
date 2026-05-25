import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validate from 'validator';

// Tạo chữ ký JWT cho người dùng
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Hàm đăng ký cho người dùng

const registerUser = async (req, res) => {
    const {email, password, phone} = req.body;

    try{
        
        // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
        const exist = await userModel.findOne({email: email.toLowerCase()});
        if (exist) {
            return res.json({success: false, message: 'Email đã tồn tại'});
        }
        // Kiểm tra định dạng email
        if (!validate.isEmail(email)) {
            return res.json({success: false, message: 'Định dạng email không hợp lệ'});
        }
        // kiểm tra độ mạnh của mật khẩu
        if (password.length < 8) {
            return res.json({success: false, message: 'Mật khẩu phải có ít nhất 8 ký tự'});
        }
        // Kiểm tra định dạng số điện thoại (ví dụ: chỉ cho phép số và có độ dài từ 10-12 ký tự)
        const phoneRegex = /^\d{10,12}$/;
        if (!phoneRegex.test(phone)) {
            return res.json({success: false, message: 'Định dạng số điện thoại không hợp lệ'});
        } 
        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        
        // Tạo người dùng mới
        const newUser = new userModel({
            email: email.toLowerCase(),
            password: password_hash,
            full_name: req.body.fullname || req.body.full_name || 'Người dùng mới',
            role: req.body.role || 'learner',
            phone: phone,
        });

        const savedUser = await newUser.save();
        const token = createToken(savedUser._id);
        res.json({success: true, token});

    }
    catch(error){
        console.error('Lỗi đăng ký người dùng:', error);
        res.json({success: false, message: 'Error đăng ký'});
    }
}

// Hàm đăng nhập người dùng mới
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Kiểm tra xem người dùng có tồn tại không
        const user = await userModel.findOne({email: email.toLowerCase()});
        if (!user) {
            return res.json({success: false, message: 'Email hoặc mật khẩu không đúng'});
        }
        // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success: false, message: 'Email hoặc mật khẩu không đúng'});
        }
        // Tạo token JWT và trả về cho người dùng
        const token = createToken(user._id);
        res.json({success: true, token});
    }
    catch(error){
        console.error('Lỗi đăng nhập người dùng:', error);
        res.json({success: false, message: 'Error đăng nhập'});
    }
}

// Hàm lấy thông tin người dùng (có thể sử dụng middleware để xác thực token trước khi gọi hàm này)
const getUserInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select('-password'); // Loại bỏ trường mật khẩu khỏi kết quả trả về
        if (!user) {
            return res.json({success: false, message: 'Không tìm thấy người dùng'});
        }
        res.json({success: true, user});
    }
    catch(error){
        console.error('Lỗi lấy thông tin người dùng:', error);
        res.json({success: false, message: 'Error lấy thông tin'});
    }
}

export {loginUser, registerUser, getUserInfo};