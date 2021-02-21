import React from 'react';
import {Image} from 'react-native';



const  ProfileImage= props => {
    return (
        <Image style={{
            height: 30*props.size,
            width: 30*props.size,
            borderRadius: 50,}} source={props.imageUrl}
        />
    );
}

export default ProfileImage;