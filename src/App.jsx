import { useEffect, useState } from "react"
import Footer from "./compnents/Footer"
import Main from "./compnents/Main"
import SideBar from "./compnents/SideBar"

function App() {
  const [data, setData] =  useState(null)
  const [loading, setloading] =useState(false)

 const[showModal, setShowModal] = useState(false)
 function handleToggleModal() {
setShowModal(!showModal)
 }
 useEffect(()=>{
async function fetchAPIData() {
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
  console.log('NASA API Key:', NASA_KEY);
  const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
  try {
   const res  = await fetch(url)
   const apiData = await res.json()
   setData(apiData)
   console.log('DATA\n', apiData)

  } catch (err) {
    console.log(err.message)
  }
  
}
fetchAPIData()
 }, []) 
  return (
    <>
  
 {data ? (<Main  data = {data} />) : ( 
  <div className="loadingstate"> 
  <i className="fa-solid fa-gear"></i>
  </div> 

 )}
 { showModal && (
  <SideBar data = {data} handleToggleModal={handleToggleModal}/>
  )}
    
   { data&& 
   (<Footer data = {data} handleToggleModal={handleToggleModal} />)}

   
 </>
  )
}

export default App
