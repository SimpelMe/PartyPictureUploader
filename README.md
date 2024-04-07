# PartyPictureUploader

Forked from: [Simple File Uploader](https://github.com/merty/simple-file-uploader).

PartyPictureUploader is a file uploader written using HTML5 and Node.js. It can upload both to a local directory on the server or to an AWS S3 server. It is designed to upload images which then can be shown by a slideshow viewer.

## Preparation

Run uploader on cli with ``npm start``.

## Usage
  
The web application of the uploader is available at ``http://IPADRESSE:8000`` in the same network. Alt-click on the wifi symbol to check the IP of the wifi. The uploaded images are stored in the ``uploads`` folder.

To display the pictures, start ``PartyPictureSlideshow``. This script requires ``Xee`` and the security release for the folder as well as for keyboard operation.

## Full usage on bare installation

1. Clone the repository or download and extract the files.
2. Install Node.js if you haven't already.
3. Go to the project directory.
4. Run the command `npm install` to install the dependencies.
4. Edit `config.js` if you wish to change the upload directory or use AWS S3.
5. Run the application using `npm start`.
6. Go to `http://<IP_ADDRESS>:<PORT>` where `<IP_ADDRESS>` is the IP address of the machine where the application is running and the `<PORT>` is the port number defined in `config.js` which is `8000` by default.
7. Drag and drop files to the marked area or click the text and select files to upload the files.
