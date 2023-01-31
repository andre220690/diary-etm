export const useToJson = () => {

    const toJSON = (list)=>{
        console.log(list)
        var result = [];
        list.forEach((item)=>{
            result.push(JSON.parse(item));
        })
        return result;
    }
    return [toJSON]
}