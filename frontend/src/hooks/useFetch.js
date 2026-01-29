import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (url) => {

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const fetchData = async() => {
            setLoading(true)

            try {
                const res = await axios.get(url)
                setData(res.data.data)
                setLoading(false)               

            } catch(err) {
                setError(err.response?.data?.message || err.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [url])
    return {
        data, error, loading,
    }   

}

export default useFetch