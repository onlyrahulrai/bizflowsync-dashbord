import axiosInstance from "api/base";

// authenticate function
export const authenticate = async (username) => {
    try {
        return await axiosInstance.post("/auth/authenticate/", { username });
    } catch (error) {
        return { error: "Username doesn't exist" };
    }
};

export const captalizeString = (str = "") => {
    return str.charAt(0).toUpperCase() + str.substring(1);
}