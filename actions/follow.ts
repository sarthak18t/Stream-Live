"use server"
export const onFollow = (id:string)=>{
    try {
        console.log("onFollow", id)
    } catch (error) {
        throw new Error("Internal error")
    }
}