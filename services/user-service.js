const User = require("../models/user-model")

exports.getAllGenreSubscribers = async (genre) => {
    return await User.find({ subscribeGenre: genre })
}

exports.checkAllUserIdsExistInSockets = (users, userSockets) => {
    return users.map(user => userSockets[user.id]);
}