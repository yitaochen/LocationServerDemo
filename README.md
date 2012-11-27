Location Server/Client Demo 3.0.2
-----------------------------
by vampirefan

NOTE: Using mongodb to store and frame fingers.

# The Server:
1. install nodejs.
2. install and setup mongodb.
3. into the dictory: `cd $(locationServerDemo)`
4. start the server: `node app.js`

## The finger DataBase (JSON)

        fingerPrints:
        # locationId: 

        # bearing:
        (罗盘显示的)方位

        # wapInfo
        各个wap的信号强度值
        ## bssid
        wap的bssid值
        ## rssid
        wap的信号强度值

        # options:可选数据
        ## wapNumScan:
        扫描到wap的个数

        example:
            [{
                "locationId": "X62 1 1 1 1",
                "bearing": 0,
                "wapInfo": [{
                    "bssid": "00:60:2f:3a:07:35",
                    "rssid": -58
                }, {
                    "bssid": "00:60:2f:3a:07:65",
                    "rssid": -69
                }, {
                    "bssid": "00:60:2f:3a:07:15",
                    "rssid": -64
                }, {
                    "bssid": "00:60:2f:3a:07:f5",
                    "rssid": -25
                }, {
                    "bssid": "00:60:2f:3a:07:b5",
                    "rssid": -67
                }]
            }, {
                "locationId": "X62 1 1 1 2",
                "bearing": 0,
                "wapInfo": [{
                    "bssid": "00:60:2f:3a:07:35",
                    "rssid": -45
                }, {
                    "bssid": "00:60:2f:3a:07:65",
                    "rssid": -56
                }, {
                    "bssid": "00:60:2f:3a:07:15",
                    "rssid": -67
                }, {
                    "bssid": "00:60:2f:3a:07:f5",
                    "rssid": -78
                }, {
                    "bssid": "00:60:2f:3a:07:b5",
                    "rssid": -89
                }]
            }]

# The Client:
1. start the Client.
2. Set the Server's host IP Address and port.

NOTE: check the example fingerFrame and locateFrame in `./db/`

## the postData fingerfraem (JSON)

        {
            "locationId": "X62 1 1 1 3",
            "bearing": 0,
            "wapInfo": [{
                "bssid": "00:60:2f:3a:07:35",
                "rssid": 45
            }, {
                "bssid": "00:60:2f:3a:07:65",
                "rssid": 56
            }, {
                "bssid": "00:60:2f:3a:07:15",
                "rssid": 67
            }, {
                "bssid": "00:60:2f:3a:07:f5",
                "rssid": 78
            }, {
                "bssid": "00:60:2f:3a:07:b5",
                "rssid": 89
            }]
        }

## the postData locateframe (JSON)

        # bearing:
        (罗盘显示的)方位

        # wapInfo
        各个wap的信号强度值
        ## bssid
        wap的bssid值
        ## rssid
        wap的信号强度值
        example: 
            {
                "bearing": 0,
                "wapInfo": [{
                    "bssid": "00:60:2f:3a:07:35",
                    "rssid": 45
                }, {
                    "bssid": "00:60:2f:3a:07:65",
                    "rssid": 56
                }, {
                    "bssid": "00:60:2f:3a:07:15",
                    "rssid": 67
                }, {
                    "bssid": "00:60:2f:3a:07:f5",
                    "rssid": 78
                }, {
                    "bssid": "00:60:2f:3a:07:b5",
                    "rssid": 89
                }]
            }


# Function:
use url parse and http post to get the system work    

example:

    + `/start`, `/`: test connection;
    + `/login`: get the instruction;
    + `/finger`: post current locationId and wap_rssids;
    + `/locate`: post current wap_rssids and get current locationId;
    + `/dbshow`: get a instance glance of the fingerprints database;
    + `/LocationServerTest.fingerprints.remove()`: remove all fingerprints data;
