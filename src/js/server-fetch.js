import axios from "axios";

const handlePromiseError = error => console.log(`Error: ${error}`);

const processApiResponse = ({response, successCode, errorMessage}) => ({
    data: response.data.photos.photo,
    error: response.status === successCode ? null : errorMessage,
});

export const getDataFromServer = (url) => {
    console.log(`Fetching URL: ${url}`);
    return axios
        .get(url)
        .then(response =>
            processApiResponse({
                response,
                successCode: 200,
                errorMessage: 'Error while fetching',
            }),
        )
        .catch(handlePromiseError);
};