export const isLikedByReqUser=(reqUserId, post)=>{
    for(let user of post.likes) {
        if(reqUserId===user.id) {
            return true
        }
    }
    return false;
}

export const isSavedByReqUser=(reqUserId, post)=>{
    for(let user of post.saves) {
        if(reqUserId===user.id) {
            return true
        }
    }
    return false;
}

export const isFollowedByReqUser = (reqUserId, user) => {
    if (user && user.followers) {
        for (let item of user.followers) {
            if (reqUserId === item.id) {
                return true;
            }
        }
    }
    return false;
}
