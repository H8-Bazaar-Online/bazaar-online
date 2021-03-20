import React, { useEffect, useState } from 'react';
// import { Image } from 'cloudinary-react';

require('dotenv').config();
// const { cloudinary } = require('./utils/cloudinary');

export default function Home() {
    
    const [imageIds, setImageIds] = useState();
    
    const loadImages = async () => {
        try {
            const res = await fetch('/api/images');
            const data = await res.json();
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };

    console.log(imageIds);
    
    useEffect(() => {
        loadImages();
    }, []);
    return (
        <div>
            <h1 className="title">Cloudinary Gallery</h1>
            <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        // <Image
                        //     key={index}
                        //     publicId={imageId}
                        //     width="300"
                        //     crop="scale"
                        // />
                        <img src={imageId} key={index}></img>
                    ))}
            </div>
        </div>
    );
}
