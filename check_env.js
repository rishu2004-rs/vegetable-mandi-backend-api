
require('dotenv').config();

const keys = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missing = keys.filter(key => !process.env[key] || process.env[key].startsWith('your_'));

if (missing.length > 0) {
    console.log('MISSING_KEYS:', missing.join(', '));
} else {
    console.log('ENV_CHECK_PASSED');
}
