import client from "./client";


export const submitReview = async (values,userId, title, username) => {
    //const navigation = useNavigation();

    const packageData = {
        "Podcast": title,
        "Rating": values.Rating,
        "Comment": values.Comment,
        "Username": username,
        "UserID": userId,
    }
    try {
        console.log("in api call submitReview");
        //console.log(packageData);
        const {data} = await client.post('../podcast/writeReview', packageData);

        return data;
    } catch (error) {
        return catchError(error);
    }
}

export const editReview = async (packageData) => {
    //const navigation = useNavigation();

    
    try {
        console.log("in api call editReview");
        //console.log(packageData);
        const {data} = await client.put('../podcast/editReview', packageData);
        return data;
    } catch (error) {
        return error;
    }
}

export const getUserInfo = async (userId) => {

    try {
        console.log("in getuser info api, userId:",userId);
        const {data} = await client.post('/getUserInfo', {"UserID" : userId});
        return data;
    } catch (error) {
        return catchError(error);
    }
}