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

export const deleteReview = async (reviewId) => {
    //const navigation = useNavigation();
    const packageData = {
        ReviewID: reviewId
        
    }
    
    try {
        console.log("package",packageData);
        console.log("in api call deleteReview");
        console.log(reviewId,typeof(reviewId));
        const {data} = await client.delete('../podcast/deleteReview', {data:packageData});
        console.log("data for delete api",data);
        return data;
    } catch (error) {
        return error;
    }
}

export const getUserInfo = async (userId) => {

    try {
        //console.log("in getuser info api, userId:",userId);
        const {data} = await client.post('/getUserInfo', {"UserID" : userId});
        return data;
    } catch (error) {
        return catchError(error);
    }
}

export const searchUser = async (username, targetUser) => {

    try {
        //console.log("in search user api, userId:",username);
        const {data} = await client.post('/SearchUser', {"MyUser" : username, "Username": targetUser});
        return data;
    } catch (error) {
        return error;
    }
}

export const followUserCall = async (userId, targetUserId) => {

    try {
        //console.log("in follow user api, userId:",username);
        const {data} = await client.post('/followUnfollowToggle', {"UserID" : userId, "targetUserID": targetUserId});
        return data;
    } catch (error) {
        return error;
    }
}

export const sendEmail = async (email) => {

    try {
        //console.log("in send email api, userId:",username);
        const {data} = await client.post('/forgotPassword', {"Email" : email});
        return data;
    } catch (error) {
        console.log(error);
        return "error";
    }
}