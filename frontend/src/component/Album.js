import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

function Album() {

    const { partycode } = useParams();
    const [matchImg, setMatchImg] = useState([]);
    const [images, setImages] = useState([]);


    const BUCKET_NAME = process.env.REACT_APP_PARTY_BUCKET_NAME
    const REGION = process.env.REACT_APP_REGION
    const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
    const SECRET_KEY = process.env.REACT_APP_SECRET_KEY

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataResponse = await axios.get("http://localhost:8081/getUserData");
                const { id, name } = userDataResponse.data;

                const imagesResponse = await axios.post('http://localhost:8081/getImageList', { partycode: partycode });
                const fetchedImages = imagesResponse.data.images;
                
                setMatchImg(fetchedImages);
            } catch (error) {
                console.error('Error:', error.response ? error.response.data.error : error.message);
            }

            try {
                const s3 = new AWS.S3({
                    accessKeyId: ACCESS_KEY,
                    secretAccessKey: SECRET_KEY,
                    bucketName: BUCKET_NAME,
                    dirName: partycode,
                    region: REGION
                })
                s3.listFiles()
                .then(data => {
                    setImages(data.data.COntents);
                    console.log(data.data)
                })
                .catch(err => console.log(err))
            }
        };

        fetchData();
    }, [partycode]);

    return (
        <div>
            <h1>{partycode}</h1>
            <div>
                {matchImg.map((image, index) => (
                    <p>{image}</p>
                ))}
            </div>
        </div>
    )
}

export default Album
