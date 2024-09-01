import axios from 'axios';
import {User} from "../types/User"

const API_URL = '/api/v1';

export const createUser = async (user:Partial<User>) : Promise<User> => {
    console.log("Here to create user");
    const response = await axios.post<User>(`${API_URL}/users`, user);
    return response.data;
  }