export default class TrainerProfilesServices {
    static getReturnObject(data) {
        return ({
            id: data?.id,
            avatarUrl: data?.avatar_url,
            firstName: data?.first_name,
            lastName: data?.last_name,
            phone: data?.phone,
            userId: data?.user_id,
            adminId: data?.admin_id,
            firebaseUid: data?.firebase_uid,
            email: data?.email,
            type: data?.type,
            isActivate: data?.is_activate
        })
    }

    static getQueryObject(data) {
        return ({
            avatar_url: data?.avatarUrl,
            first_name: data?.firstName,
            last_name: data?.lastName,
            phone: data?.phone,
            user_id: data?.userId,
            admin_id: data?.adminId
        })
    }
}
