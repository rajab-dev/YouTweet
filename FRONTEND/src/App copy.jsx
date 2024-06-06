import { useEffect, useState } from "react"
import axios from 'axios';

function App() {

  const [likes, setlikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const likepost = async () => {
    // setLoading(true); // Ensure loading state is set to true when fetching data
    // setError(null); // Reset error state
    try {
      // Make the GET request
      const response = await axios.get('http://localhost:4000/like');
      // Update the state with the fetched data
      
      setlikes(response.data);

      // console.log(response.data)
    } catch (error) {
      // Handle any errors
      setError(error.message);
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  } 

  const fetchData = async () => {
    setLoading(true); // Ensure loading state is set to true when fetching data
    setError(null); // Reset error state
    try {
      // Make the GET request
      const response = await axios.get('http://localhost:4000/get-total-likes');
      // Update the state with the fetched data
      
      setlikes(response.data);

      // console.log(response.data)
    } catch (error) {
      // Handle any errors
      setError(error.message);
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <> 
     
       <div>
      <h1>total likes = {likes}</h1>
    <button className="w-24 h-14 bg-green-700 rounded-xl" onClick={likepost}>LIKE </button>

      {/* <ul>
        {data.map(item => (
          <li key={item.id}>{item.brand}</li>
        ))}
        {data.map(item => (
          <li key={item.id}>{item.category}</li>
        ))}{data.map(item => (
          <li key={item.id}>{item.price}</li>
        ))}
      </ul> */}
    </div>
    </>
  )
}

export default App
