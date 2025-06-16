import {Platform} from 'react-native';

var baseUrl = "https://localhost:7272/Trends";

const trendsApi = {
    createTrend: async (trend) => {
        try {
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
                baseUrl = "https://192.168.2.11:7272/Trends"
            }
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(trend)
              });
            console.log("Response status:", response.status);
            if (!response.ok) {
              const errorData = await response.json();
              console.error("API Error:", errorData);
              throw new Error(`API request failed with status ${response.status}`);
            }
            const data = await response.json();
            console.log("New trend:", data);
            return data;
        } catch (error) {
            console.error("Error creating trend:", error);
            throw error;
        }
    }
}

export default trendsApi;