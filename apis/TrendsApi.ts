import {Platform} from 'react-native';

var baseUrl = "https://localhost:7272/Trends";

const trendsApi = {
    getAllTrends: async () => {
        try {
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
                baseUrl = "https://192.168.2.11:7272/Trends"
            }
            const response = await fetch(baseUrl);
            console.log("Response status:", response.status);
            if (!response.ok) {
              const errorData = await response.json();
              console.error("API Error:", errorData);
              throw new Error(`API request failed with status ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched trends:", data);
            return data;
        } catch (error) {
            console.error("Error fetching trends:", error);
            throw error;
        }
    }
}

export default trendsApi;