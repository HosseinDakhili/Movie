const fetchData = async(url,option={})=>{
    try {
        const res = await fetch(import.meta.env.VITE_BASE_API+url,option)
        const text = await res.text()
        const data = text?JSON.parse(text):{};
        return data
    } catch (error) {
        console.log(error)
    }
}

export default fetchData