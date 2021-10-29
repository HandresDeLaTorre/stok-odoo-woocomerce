'use strict'

const imageToBase64 = require('image-to-base64');

const convertImage = async (urlImg) => {
   try {
        const response = await imageToBase64(urlImg) // Image URL
            ;
        //console.log(response); // "iVBORw0KGgoAAAANSwCAIA..."
        //https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.pngtree.com%2Ffreepng%2Fno-photo-taking-photo-illustration_4698291.html&psig=AOvVaw30mHDBWXUBC63iq94qcl-7&ust=1634751605162000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOD-nLiC1_MCFQAAAAAdAAAAABAD

        return response 
    } catch (error) {
        console.error(error); // Logs an error if there was one
    }
}

module.exports = {
    convertImage
}