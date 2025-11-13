import toast from "react-hot-toast";

const notify = (type,msg) =>{
    toast[type](msg,{
        duration:4000,
        position:'bottom-center'
    })
}

export default notify