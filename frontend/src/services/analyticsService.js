import axios from "axios";

const API = "http://127.0.0.1:5000";

export async function getAnalytics() {

    const response = await axios.get(

        `${API}/analytics`

    );

    return response.data;

}