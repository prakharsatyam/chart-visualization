/* eslint-disable react/prop-types */
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useDataStore } from "./store"
function Query(props) {
  const setData= useDataStore((state)=>state.setData)
  var {data,isLoading,error} =useQuery({queryKey:[props.querykey],queryFn: async ()=>{ 
    var res = await axios.get(`http://localhost:4000/api/v1/${props.v1url}`)
    return res.data
}
  })
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <div className="text-xl font-medium text-blue-600 animate-pulse">Loading...</div>
    </div>
  </div>;
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }
  setData(data)
  
    return (
  <div>
    
  </div>
    )
}

export default Query




// /* eslint-disable react/prop-types */
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import PropTypes from "prop-types";

// function withQuery(Component) {
//   return function QueryWrapper(props) {
//     const { data, isLoading, error } = useQuery({
//       queryKey: [props.queryKey],
//       queryFn: async () => {
//         const res = await axios.get(`http://localhost:4000/api/v1/${props.v1url}`);
//         return res.data;
//       }
//     });

//     if (isLoading) {
//       return <div>Loading...</div>;
//     }
//     if (error) {
//       return <div>An error occurred: {error.message}</div>;
//     }

//     return <Component {...props} data={data} />;
//   };
// }

// withQuery.propTypes = {
//   queryKey: PropTypes.string.isRequired,
//   v1url: PropTypes.string.isRequired,
// };

// export default withQuery;

// import React from 'react';

// function MyComponent({ data, title }) {
//   return (
//     <div>
//       <h1>{title}</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }

// export default MyComponent;
