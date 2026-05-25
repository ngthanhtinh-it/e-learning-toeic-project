import mongoose from 'mongoose';

// ==========================================
// 1. TẦNG THẤP NHẤT: TÀI LIỆU BÀI HỌC (Lesson Resources)
// ==========================================
const resourceSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    file_url: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    file_type: {
        type: String,
        enum: ['pdf', 'docx', 'pptx', 'xlsx', 'zip', 'image', 'other'],
        default: 'other'
    },
    file_size: {
        type: Number, // Đơn vị tính bằng Byte (Thay thế cho BIGINT trong SQL)
        default: null
    },
    uploaded_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liên kết tới giảng viên upload file
        required: true
    }
}, { 
    // Giữ nguyên logic gốc: chỉ cần created_at (không cần updated_at)
    timestamps: { createdAt: 'created_at', updatedAt: false } 
});

// ==========================================
// 2. TẦNG THỨ 2: BÀI HỌC (Lessons)
// ==========================================
const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    description: {
        type: String,
        default: null
    },
    video_url: {
        type: String,
        trim: true,
        maxlength: 500,
        default: null
    },
    video_duration_seconds: {
        type: Number,
        default: 0
    },
    order_index: {
        type: Number,
        required: true,
        default: 0
    },
    is_preview: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    // NHÚNG MẢNG TÀI LIỆU VÀO TRONG BÀI HỌC
    resources: [resourceSchema]
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

// ==========================================
// 3. TẦNG THỨ 3: CHƯƠNG/CHỦ ĐỀ (Course Topics)
// ==========================================
const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    description: {
        type: String,
        default: null
    },
    order_index: {
        type: Number,
        required: true,
        default: 0
    },
    // NHÚNG MẢNG BÀI HỌC VÀO TRONG CHƯƠNG
    lessons: [lessonSchema]
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

// ==========================================
// 4. TẦNG CAO NHẤT: KHÓA HỌC (Courses)
// ==========================================
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 255
    },
    description: {
        type: String,
        default: null
    },
    thumbnail_url: {
        type: String,
        trim: true,
        maxlength: 500,
        default: null
    },
    price: {
        type: Number, // Khuyên dùng số nguyên (ví dụ: 100000 thay vì 1000.00) để tránh sai số dấu phẩy động
        required: true,
        default: 0
    },
    duration_days: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Khóa ngoại liên kết tới người tạo khóa học
        required: true
    },
    // NHÚNG MẢNG CHƯƠNG VÀO TRONG KHÓA HỌC
    topics: [topicSchema]
}, { 
    // Tự động quản lý created_at và updated_at cho Khóa học bằng kiểu snake_case giống SQL của bạn
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

// Xuất model Course để sử dụng trong project
const Course = mongoose.model('Course', courseSchema);
export default Course;