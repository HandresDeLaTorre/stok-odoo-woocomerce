'use strict'

const imageToBase64 = require('image-to-base64');
const FileType = require('file-type');
const got = require('got');

const convertImage = async (urlImg) => {
   try {
        const response = await imageToBase64(urlImg) // Image URL
            ;
        console.log(response); // "iVBORw0KGgoAAAANSwCAIA..."
        return response 
    } catch (error) {
        console.error(error); // Logs an error if there was one
    }
}

// convertImage('https://imageneschyk.s3.us-west-1.amazonaws.com/imageproducts/300245.jpeg')

const url = 'https://imageneschyk.s3.us-west-1.amazonaws.com/imageproducts/300245.jpeg';

(async () => {
	const stream = got.stream(url);

	console.log(await FileType.fromStream(stream));
	//=> {ext: 'jpg', mime: 'image/jpeg'}
})();

module.exports = {
    convertImage
}