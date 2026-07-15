import axios from "axios";

export const getDashboardData = async () => {

    const response =
        await axios.get(
            "http://127.0.0.1:5000/dashboard"
        );

    return response.data;

};