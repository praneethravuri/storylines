import axios from "axios";
import { ThemeRoom } from "../types/ThemeRoom";

const API_URL = '/api/v1';

export const getAllThemeRooms = async(): Promise<ThemeRoom[]> => {
    const response = await axios.get<ThemeRoom[]>(`${API_URL}/theme-rooms`);
    return response.data;
}

export const getSingleThemeRoom = async(id: string): Promise<ThemeRoom> => {
    const response = await axios.get<ThemeRoom>(`${API_URL}/theme-rooms/${id}`);
    return response.data;
}