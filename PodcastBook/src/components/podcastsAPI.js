import client from "./client";


export const getReviews = async (title) => {
    //const navigation = useNavigation();
    try {
        const {data} = await client.post('../podcast/podcastReviews', {"Podcast":title, "limit": 100});
        //console.log("GetREviewsAPI",data);
        return data;
    } catch (error) {
        //console.log(error.response);
        return error;
    }
}

export const getUserReviews = async (userId) => {
    try {
        const {data} = await client.post('../podcast/userReviews', {"UserID":userId, "limit": 100});
        //console.log("getuserreviewsAPI",data);
        return data;
    } catch (error) {
        //console.log(error.response);
        return error;
    }
}

export const getFeed = async (userId) => {
    try {
        const {data} = await client.post('../podcast/feed', {"UserID":userId, "limit": 100});
        //console.log("getfeedAPI",data);
        return data;
    } catch (error) {
        //console.log(error.response);
        return error;
    }
}

export const changePassword = async (userId, password) => {
    try {
        const packageData = {
            "id": userId,
            "Password": password

        }
        console.log(packageData);
        const {data} = await client.put('/updatePassword', packageData);
        console.log("changePasswordAPI",data);
        return data;
    } catch (error) {
        return error;
    }
}    
       


//fetching reviews error
 const catchErrorFR = (error) => {
     console.error('Error fetching reviews:', error);
     return { error: 'Error fetching reviews' };
}