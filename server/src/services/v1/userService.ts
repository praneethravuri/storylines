import User, { IUser } from "../../models/User";

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User(userData);
    return user.save();
}