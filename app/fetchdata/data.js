'use server'
const fetchDataFromApi = async () =>{
    try {
        const response = await fetch("http://localhost:3000/api/stock" , {cache: 'no-store'});
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


