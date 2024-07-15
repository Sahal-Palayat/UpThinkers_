import { axiosApiTutor, axiosApiUser } from "../Services/axios";

export const getPersonDetailsChat = async (data, user) => {
    if (data.length < 1) { return [] }
    console.log("going to filter",data)
    const personDetails = []
    for (let val of data) {
        val.personId = val.userId.filter((item) => item !== user)
        const person = await axiosApiTutor('/gettutorbyid?tutorId=' + val.personId[0])
        if (person.data) {
            val.personDetails = person.data
            personDetails.push(val)
        }
    }
    return personDetails
}

export const getPersonDetailsChatUser = async (data, user) => {
    if (data.length < 1) { return [] }
    console.log("going to filter",data)
    const personDetails = []
    for (let val of data) {
        val.personId = val.userId.filter((item) => item !== user)
        const person = await axiosApiTutor('/getuserbyid?userId=' + val.personId[0])
        if (person.data) {
            val.personDetails = person.data.user
            personDetails.push(val)
        }
    }
    return personDetails
}

export const getPersonIds = (existChat, userId) => {
    if (existChat.length < 1) { return [] }
    const existingChat = existChat.map((item) => {
        return item.userId.find((id) => id !== userId)
    })
    return existingChat
}

export const removeNewChatFromExist = (newChat, personId) => {
    newChat = newChat.filter((item) => !personId.includes(item._id))
    return newChat
}



export const getChats=async (userId,personId)=>{
    try {
        const { data } = await axiosApiUser.get('/getchats?userId=' + userId + '&personId=' + personId)
        return data
    } catch (error) {
        console.log(error);
        return data
    }
}


export const saveAudio = async (audioBlob, message) => {
    try {
        const form = new FormData()
        form.append('audioBuffer', audioBlob)
        form.append('message', JSON.stringify(message))
        const { data } = await axiosApiUser.post('/saveAudio', form, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return data
    } catch (error) {
        console.log(error);
        return { data: "" }
    }
}


export const setAllMessageSeen = async (userId, personId) => {
    try {
        const { data } = await axiosApiUser.get('/setAllMessageSeen?userId=' + userId + '&personId=' + personId)
        return data
    } catch (error) {
        console.log(error);
    }
}









export const getPersonDetailsChatTutor = async (data, user) => {

    console.log(data, 'dddddddddddddddddddddaaaaaaaaaaaaaaaaaaaaa');
    const personDetails = []
    for (let val of data) {
        val.personId = val.userId.filter((item) => item !== user)

        val.personDetails = await axiosApiUser('/getuserbyid?userId=' + val.personId[0])
        personDetails.push(val)
    }
    return personDetails
}

export function getTimeDifference(targetDate) {
    const currentDate = new Date();
    const targetDateTime = new Date(targetDate).getTime();
    const currentTime = currentDate.getTime();

    const timeDifference = Math.abs(targetDateTime - currentTime);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor((timeDifference / (1000 * 60 * 60 * 24)) % 365);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let timeString = '';

    if (years > 0) { timeString += years + (years === 1 ? ' year ' : ' years '); }
    if (months > 0) { timeString += months + (months === 1 ? ' month ' : ' months '); }
    if (days > 0) { timeString += days + (days === 1 ? ' day ' : ' days '); }
    if (hours > 0) { timeString += hours + (hours === 1 ? ' hour ' : ' hours '); }
    if (minutes > 0) { timeString += minutes + (minutes === 1 ? ' minute ' : ' minutes '); }

    return timeString.trim();
}
