const { v2: cloudinary } = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'dtjorfekn', 
    api_key: '919759581623415', 
    api_secret: '7A1xgLBwN-0uu2tPzbKa3M-293Q'
});
module.exports = cloudinary;