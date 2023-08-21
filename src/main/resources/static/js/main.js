$(document).ready(function (){




    // events ---------------------------------------------
    $("#startTestsBtn").click(async function (){
        await startDownloadSpeedTest();
        await startUploadSpeedTest();
        await pingURL();
    });




    // functions --------------------------------------------------------------

    function startDownloadSpeedTest(){

        const imgAddr = "http://localhost:8080/speedTest/file/test-file.jpg";
        let startTime = 0;
        let endTime = 0;
        const download_size = 3765995;
        const img = new Image();

        img.onload = function () {
            endTime = (new Date()).getTime();
            ShowData();
        }

        startTime = (new Date()).getTime();
        img.src = imgAddr;

        function ShowData()
        {
            let duration = 0;
            duration = (endTime - startTime) / 1000;
            let bitsLoaded = 0;
            bitsLoaded = download_size * 8;
            let speedMbps;
            speedMbps = ((bitsLoaded / duration) / 1024 / 1024).toFixed(2);
            $("#downloadSpeed").empty().text(speedMbps + " Mbps");
        }

    }

    function startUploadSpeedTest(){

        const http = new XMLHttpRequest();
        let startTime, endTime;
        const url = "http://localhost:8080/speedTest/upload";
        let myData = "d="; // the raw data you will send

        //if you want to send 1 kb (2 + 1022 bytes = 1024b = 1kb). change it the way you want
        for(let i = 0 ; i < 1022 ; i++)
        {
            myData += "k"; // add one byte of data;
        }

        http.open("POST", url, true);

        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Content-length", myData.length.toString());
        http.setRequestHeader("Connection", "close");

        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                endTime = (new Date()).getTime();

                const duration = (endTime - startTime) / 1000;
                const bitsLoaded = myData.length * 8;
                const speedMbps = ((bitsLoaded / duration) / 1024 / 1024).toFixed(2);

                $("#uploadSpeed").empty().text(speedMbps + " MBps");
            }
        }
        startTime = (new Date()).getTime();
        http.send(myData);

    }

    function pingURL() {

        const url = "http://localhost:8080/speedTest/ping";
        const start = (new Date()).getTime();
        $.ajax({
            type: "GET",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            success: function (response) {
                console.log(response)
                $("#pintSpeed").empty().text(((new Date()).getTime() - start) + " ms");
            },
            error: function (message) {
                console.log(message);
            }

        });


    }




})