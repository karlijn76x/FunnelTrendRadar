const baseUrl = "https://localhost:7272/Trends";

const trendsApi = {
    getAllTrends: async () => {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
              const errorData = await response.json();
              console.error("API Error:", errorData);
              throw new Error(`API request failed with status ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching trends:", error);
            throw error;
        }
    },
    getTrend: async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`);
            if (!response.ok) {
              const errorData = await response.json();
              console.error("API Error:", errorData);
              throw new Error(`API request failed with status ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching trend:", error);
            throw error;
        }
    },
    createTrend: async (trend) => {
        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(trend)
              });
            if (!response.ok) {
              const errorData = await response.json();
              console.error("API Error:", errorData);
              throw new Error(`API request failed with status ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error creating trend:", error);
            throw error;
        }
    },
    deleteTrend: async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
              method: "DELETE"
            });
            if (!response.ok) {
              const errorData = await response.json();
              console.error("API Error:", errorData);
              throw new Error(`API request failed with status ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting trend:", error);
            throw error;
        }
    },
    updateTrend: async (trend, id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
              method: "PUT",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(trend)
            });
            if (!response.ok) {
              const errorData = await response.json();
              console.error("API Error:", errorData);
              throw new Error(`API request failed with status ${response.status}`);
            }
        } catch (error) {
            console.error("Error updating trend:", error);
            throw error;
        }
    },
}

export default trendsApi;