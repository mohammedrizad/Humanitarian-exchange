const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
};

const comparePassword = async (password, hashed) => {
    try {
        return await bcrypt.compare(password, hashed);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    hashPassword,
    comparePassword
};
