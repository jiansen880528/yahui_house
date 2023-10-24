import myaxios from "../utils/myaxios";
// const promise1=myaxios({
//     method:'get',
//     url:'data.json'
// })
// promise1.then(resp=>{
//     console.log(resp.data)
// })
export default{
    getList(){
        const promise1=myaxios({
            method:'get',
            url:'data.json'
        })
        return promise1
    }
}