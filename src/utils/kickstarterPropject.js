export const fetchProjectsData = async () => {
    const apiUrl =
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    
    const data = await response.json();
    return data;
  };
  