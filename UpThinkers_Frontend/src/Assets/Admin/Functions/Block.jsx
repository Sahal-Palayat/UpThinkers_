import axios from 'axios'
import { config } from '../../../config';



export const block = async (userId, token) => {
    try {
        const response = await axios.patch(`${config.ADMIN_BASE_URL}/studentslist/blockUser/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('User blocked successfully', response.data);
    } catch (error) {
        console.error('Error blocking user', error);
    }
};


export const blockTutor = async (tutorId, token) => {
    try {
        const response = await axios.patch(`${config.ADMIN_BASE_URL}/tutorslist/blockTutor/${tutorId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('User blocked successfully', response.data);
    } catch (error) {
        console.error('Error blocking user', error);
    }
};