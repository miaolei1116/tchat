

export function getRedirectPath(type, avatar) {
    // 根据用户名信息，返回跳转的地址
    // user.type    /boss   /genius
    // console.log(type)
    // user.avatar(头像)   /boosInfo     /geniusInfo
    let url = (type == "BOSS") ? '/boss' : '/genius'
    // console.log(url,123)
    // console.log(avatar,321)
    if ( !avatar ) {
        url += 'info'
    }
    return url
}