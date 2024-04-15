import client from "./client";


export const getReviews = async (title) => {
    //const navigation = useNavigation();
    try {
        const {data} = await client.post('../podcast/podcastReviews', {"Podcast":title});
        console.log("API",data);
        return data;
    } catch (error) {
        //console.log(error.response);
        return error;
    }
}
//fetching reviews error
 const catchErrorFR = (error) => {
     console.error('Error fetching reviews:', error);
     return { error: 'Error fetching reviews' };
}