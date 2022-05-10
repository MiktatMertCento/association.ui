import Mock from '../mock'
import { db } from '../../config'
import jwt from 'jsonwebtoken'
import sha256 from 'sha256'

const JWT_VALIDITY = '7 days'

Mock.onPost('/api/auth/login').reply(async (config) => {
    try {
        const { username, password } = JSON.parse(config.data)
        const query = await db.collection('admins').where('idNo', '==', username).where('password', '==', sha256(password)).where('userType', '==', "admin").where('status', "==", 1).get();

        if (query.docs.length >= 1) {
            const accessToken = jwt.sign({ userId: query.docs[0].id }, process.env.REACT_APP_JWT_SECRET, {
                expiresIn: JWT_VALIDITY,
            })

            await db.collection("admins").doc(query.docs[0].id).update({
                JWT: accessToken,
            })

            return [
                200,
                {
                    accessToken,
                    user: Object.assign(query.docs[0].data(), { id: query.docs[0].id }),
                },
            ]
        } else {
            return [400, { message: 'Yanlış kullanıcı bilgisi' }]
        }
    } catch (err) {
        return [500, { message: 'Sunucu hatası!' }]
    }
})

Mock.onPost('/api/auth/register').reply((config) => {
    /*try {
        const { email, username } = JSON.parse(config.data)
        const user = userList.find((u) => u.email === email)

        if (user) {
            return [400, { message: 'User already exists!' }]
        }
        const newUser = {
            id: 2,
            role: 'GUEST',
            name: '',
            username: username,
            email: email,
            avatar: '/assets/images/face-6.jpg',
            age: 25,
        }
        userList.push(newUser)

        const accessToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
            expiresIn: JWT_VALIDITY,
        })

        return [
            200,
            {
                accessToken,
                user: {
                    id: newUser.id,
                    avatar: newUser.avatar,
                    email: newUser.email,
                    name: newUser.name,
                    username: newUser.username,
                    role: newUser.role,
                },
            },
        ]
    } catch (err) {
        console.error(err)
        return [500, { message: 'Internal server error' }]
    }*/
    console.log("register :D")
})

Mock.onGet('/api/auth/profile').reply(async (config) => {
    try {
        const { Authorization } = config.headers
        if (!Authorization) {
            return [401, { message: 'Invalid Authorization token' }]
        }

        const accessToken = Authorization.split(' ')[1]
        const { userId } = jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET)
        const user = await db.collection('admins').doc(userId).get();

        if (accessToken === user.data().JWT) {
            return [
                200,
                {
                    user: Object.assign(user.data(), { id: user.id }),
                },
            ]
        } else {
            return [401, { message: 'Invalid authorization token' }]
        }
    } catch (err) {
        console.error(err)
        return [500, { message: 'Internal server error' }]
    }
})
