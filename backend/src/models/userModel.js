import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // Trong MongoDB, trường 'id' tự động được tạo dưới dạng '_id' với kiểu ObjectId.
    // Nó vừa là Khóa chính (Primary Key) vừa tự động tăng/sinh chuỗi duy nhất.

    full_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },
    email: {
        type: String,
        required: true,
        unique: true, // Tạo chỉ mục unique giống SQL
        trim: true,
        lowercase: true, // Tự động chuyển về chữ thường để tránh trùng lặp
        maxlength: 150
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        maxlength: 20,
        default: null,
        required: true
    },
    avatar_url: {
        type: String,
        trim: true,
        maxlength: 500,
        default: null
    },
    role: {
        type: String,
        enum: ['admin', 'instructor', 'learner'],
        default: 'learner',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'blocked', 'inactive'],
        default: 'active',
        required: true
    }
}, {
    // Tự động thêm và quản lý 2 trường: createdAt và updatedAt (thay thế cho created_at và updated_at)
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

export default User;