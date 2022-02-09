import {getRandomInt, getRandomItemList} from "./helper";

export const createUserAPI = ({userFirstName, userLastName, email, password}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isNewUser = localStorage.getItem(email)
            if (!isNewUser) {
                localStorage.setItem(email, JSON.stringify({userFirstName, userLastName, password}))
                resolve(isNewUser)
            } else {
                resolve(isNewUser)
            }
        }, 1000)
    })
}

export const singInUserAPI = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isUser = localStorage.getItem(email)
            if (isUser) {
                const userData = JSON.parse(localStorage.getItem(email))
                if (password === userData.password) {
                    const {userFirstName, userLastName} = userData
                    resolve({isAuth: true, userFirstName, userLastName})
                } else {
                    resolve({isAuth: false})
                }
            } else {
                resolve({isAuth: false})
            }
        }, 1000)
    });
}


export const generateAnalyticsData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let listData = []
            let graphicData = []

            for (let i = 0; i < 1000; i++) {
                const randomItem = getRandomItemList()
                listData.push({id: i, item: randomItem})
            }

            for (let i = 0; i <= 50; i++) {
                const randomNumber = getRandomInt(0, 51)
                graphicData.push({id: i, amount: randomNumber})
            }

            resolve({listData,graphicData})
        }, 1000)
    });

}

