export default class UsersServices {
    static getReturnObject(data) {
        return ({
            id: data?.id,
            uid: data?.firebase_uid,
            email: data?.email,
            type: data?.type,
            isActivate: data?.is_activate
        })
    }

    static getQueryObject(data) {
        return ({
            id: data?.id,
            firebase_uid: data?.uid,
            email: data?.email,
            type: data?.type,
            is_activate: data?.isActivate
        })
    }
}
