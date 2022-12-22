export default class UsersServices {
    static getReturnObject(data) {
        return ({
            id: data?.id,
            firebaseUid: data?.firebase_uid,
            email: data?.email,
            type: data?.type,
            isActivate: data?.is_activate
        })
    }

    static getQueryObject(data) {
        return ({
            firebase_uid: data?.firebaseUid,
            email: data?.email,
            type: data?.type,
            is_activate: data?.isActivate
        })
    }
}
