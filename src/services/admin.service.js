const config = require('../config')
const { setEnvDataSync } = require('../utils/env.util')
const { hashPasswordSync, comparePassword } = require('../utils/password.util')

const createAdminUser = (username, password) => {
    const adminUser = {
        APP_USERNAME: username,
        APP_PASSWORD: hashPasswordSync(password)
    }
    setEnvDataSync(config.APP_DIR, adminUser)
}

const createReadUser = (username, password) => {
    const adminUser = {
        APP_READ_USERNAME: username,
        APP_READ_PASSWORD: hashPasswordSync(password)
    }
    setEnvDataSync(config.APP_DIR, adminUser)
}

const validateAdminUser = async (username, password) => {
    if(username !== config.APP_USERNAME && username !== config.APP_READ_USERNAME){
        throw new Error('User does not exist')
    }
    let isPasswordCorrect = false;
    if(username === config.APP_USERNAME) {
        isPasswordCorrect = await comparePassword(password, config.APP_PASSWORD)
    } else if (username === config.APP_READ_USERNAME) {
        isPasswordCorrect = await comparePassword(password, config.APP_READ_PASSWORD)
    }
    if(!isPasswordCorrect){
        throw new Error('Password is incorrect')
    }
    return true
}

module.exports = {
    createAdminUser,
    createReadUser,
    validateAdminUser
}
