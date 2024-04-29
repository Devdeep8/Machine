'use server'
const fetchDataFromApi = async () =>{
    try {
        const response = await fetch("https://machine-six.vercel.app/api/stock" );
        const data = await response.json();
        // console.log(data.sales)
       return data.sales
    } catch (error) {
        console.error("Error fetching sales:", error);
    } finally {
       // Set loading to false once data fetching is complete
    }
}

export default fetchDataFromApi;


