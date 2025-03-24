const { get } = require("mongoose");

const SessionIdTouserMap = new Map()

const setUser = (id , user) =>{
    SessionIdTouserMap.set(id , user)
}
const GetUser = (id) =>{
    return SessionIdTouserMap.get(id);
}

module.exports = {
    setUser,
    GetUser


}