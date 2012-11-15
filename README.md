Location Client Demo 2.5
-----------------------------
by vampirefan

NOTE: Using txt/json to store and frame fingers. Default using json.

# The Server:
1. install nodejs.
2. into the dictory: `cd $(locationServerDemo)`
3. start the server: `node app.js`

## The finger DataBase (TXT)

		"locationId":楼编号：___;层编号：__;室编号___;X坐标:__;Y坐标__
        "locationId":"X62010010101"
			"buildingId":"X62"
			"floorId":"01"
			"roomId":"001"
			"locationX":"01"
			"locationY":"01"

		locationId,wap1_rssid,wap2_rssid,wap3_rssid,wap4_rssid,wap5_rssid
		example:X62010010101,58,69,64,25,67

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
				"locationId": "X62010010101",
				"bearing": "0",
				"wapInfo": [{
					"bssid": "00602F3A07BC",
					"rssid": "58"
				}, {
					"bssid": "00602F3A07BD",
					"rssid": "69"
				}, {
					"bssid": "00602F3A07BE",
					"rssid": "64"
				}, {
					"bssid": "00602F3A07BF",
					"rssid": "25"
				}, {
					"bssid": "00602F3A07BG",
					"rssid": "67"
				}]
			}, {
				"locationId": "X62010010102",
				"bearing": "0",
				"wapInfo": [{
					"bssid": "00602F3A07BC",
					"rssid": "45"
				}, {
					"bssid": "00602F3A07BD",
					"rssid": "56"
				}, {
					"bssid": "00602F3A07BE",
					"rssid": "67"
				}, {
					"bssid": "00602F3A07BF",
					"rssid": "78"
				}, {
					"bssid": "00602F3A07BG",
					"rssid": "89"
				}]
			}]

# The Client:
1. start the Client.
2. Set the Server's host IP Address and port.

NOTE: check the example fingerFrame and locateFrame in `./db/`

## the postData locateframe (TXT)

		wap1_rssid,wap2_rssid,wap3_rssid,wap4_rssid,wap5_rssid
		example:58,69,64,25,67


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
				"bearing": "0",
				"wapInfo": [{
					"bssid": "00602F3A07BC",
					"rssid": "58"
				}, {
					"bssid": "00602F3A07BD",
					"rssid": "69"
				}, {
					"bssid": "00602F3A07BE",
					"rssid": "64"
				}, {
					"bssid": "00602F3A07BF",
					"rssid": "25"
				}, {
					"bssid": "00602F3A07BG",
					"rssid": "67"
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

