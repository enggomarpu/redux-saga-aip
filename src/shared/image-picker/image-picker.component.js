import React, { useEffect, useState } from 'react'
import { client } from 'filestack-react';
import { environment } from '../constants';

const ImagePicker = (props) => {
    const [options, setOptions] = useState({
        accept: 'image/*',
        fromSources: ['local_file_system'],
        onUploadDone: (res) => {
            onUploadDone(res.filesUploaded);
        },
        maxFiles: 500
    });
    const apiKey = environment.filePickerApi.key;

    const [isUploaded, setIsUploaded] = useState();
    const [images, setImages] = useState([]);
    let filestack = client.init(apiKey, options);


    useEffect(() => {
        setImages(props.data ? props.data : []);
    }, [props]);

    const open = () => {
        const picker = filestack.picker(options);
        picker.open();
    }

    const onUploadDone = (files) => {
        let newImages = [...images];
        files.map(function (image) {
            var imageAdded = newImages.find(x => x.FileHandler == image.handle);
            if (!imageAdded) {
                newImages.push({
                    FileHandler: image.handle,
                    FileName: image.filename,
                    FileSize: image.size,
                    FileType: image.mimetype,
                    FilePath: image.url,
                });
            }

        });
        setImages(newImages);
        setIsUploaded(true);
        props.afterUpload(newImages);
    }

    const remove = (key) => {
        // setIsUploaded(false);
        // images[name].splice(key, 1);
        // that.notify.emit(that.images[name]);
    }


    const download = () => {

    }

    const geturl = (FileHandler) => {
        return ("https://cdn.filestackcontent.com/resize=height:200,width:200/" + FileHandler)
    }



    return (
        <>
            <button className="btn btn-primary btn-addon" type="button" >
                <i className="fa fa-upload"></i> Add a Photo
            </button>
            {
                images &&
                images.map((image, index) => {
                    return (
                        <>
                            <br/><img src={"https://cdn.filestackcontent.com/resize=height:200,width:200/" + image.FileHandler} alt="Place image title" />
                            <i className="fa fa-times"  onClick={() => remove(index)}></i><br/>
                        </>
                    );
                })
            }

        </>
    );
}

export default ImagePicker;