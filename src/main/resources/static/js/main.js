$(document).ready(function (){




    // events ---------------------------------------------
    $("#testDownloadSpeedBtn").click(function (){

        $("#bits").empty();
        $("#kbs").empty();
        $("#mbs").empty();

        let startTime, endTime;
        let imageSize = "";
        let image = new Image();
        let bitOutput = document.getElementById("bits");
        let kboutput = document.getElementById("kbs");
        let mboutput = document.getElementById("mbs");

        //Gets random image from unsplash.com
        let imageLink = "https://s6.uupload.ir/files/headebf_1hl.jpg";


        //When image loads
        image.onload = async function () {
            endTime = new Date().getTime();

            //Get image size
            await fetch(imageLink).then((response) => {
                imageSize = response.headers.get("content-length");
                console.log("siza = " + imageSize);
                calculateSpeed();
            });
        };

        //Initial
        const init = async () => {
            startTime = new Date().getTime();
            image.src = imageLink;
        };

        init();

        //Function to calculate speed
        function calculateSpeed() {
            //Time taken in seconds
            let timeDuration = (endTime - startTime) / 1000;
            //total bots
            let loadedBits = imageSize * 8;
            let speedInBps = (loadedBits / timeDuration).toFixed(2);
            let speedInKbps = (speedInBps / 1024).toFixed(2);
            let speedInMbps = (speedInKbps / 1024).toFixed(2);

            bitOutput.innerHTML += 'Speed In Bits:' + " " + `${speedInBps}`;
            kboutput.innerHTML += 'Speed In Kbs:' + " " + `${speedInKbps}`;
            mboutput.innerHTML += 'Speed In Mbs:' + " " +`${speedInMbps}`;
        }













        //const url = 'http://localhost:8080/download/file/test-file.txt';


        /*
        get_filesize('https://s6.uupload.ir/files/headebf_1hl.jpg', function(size) {
            console.log("The size of foo.exe is: " + size + " bytes.");
        });
         */

        //downloadFile(url, 'my-file.mp4');

        /*
        $('#outPut')._speedTest({

            //size of the file in bytes
            fileSize:7522,

            //type of the file to be downloaded
            fileType:"image",

            //url of the file location
            fileUrl: 'https://s6.uupload.ir/files/headebf_1hl.jpg'

        });
         */


    })





    async function downloadFile(url, filename) {
        try {
            // Fetch the file
            const response = await fetch(url);

            // Check if the request was successful
            if (response.status !== 200) {
                throw new Error(`Unable to download file. HTTP status: ${response.status}`);
            }

            // Get the Blob data
            const blob = await response.blob();

            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = filename;

            // Trigger the download
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Clean up
            setTimeout(() => {
                URL.revokeObjectURL(downloadLink.href);
                document.body.removeChild(downloadLink);
            }, 100);
        } catch (error) {
            console.error('Error downloading the file:', error.message);
        }

    }

    function get_filesize(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, true); // Notice "HEAD" instead of "GET",
        //  to get only the header
        xhr.onreadystatechange = function() {
            if (this.readyState == this.DONE) {
                callback(parseInt(xhr.getResponseHeader("Content-Length")));
            }
        };
        xhr.send();
    }






})