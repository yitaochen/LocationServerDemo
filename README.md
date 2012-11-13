Location Server Demo 1.2
-------------------

# The Server:
1. install nodejs.
2. into the dictory: `cd $(TheServer)`
3. start the server: `node app.js`

# The Client:
1. start the Client.
2. Set the Server's host IP Address and port.


# Function:
1. Use finger.txt store the finger database
example:
    locationId,wap1_rssid,wap2_rssid,wap3_rssid,wap4_rssid,wap5_rssid
    X62010010101,58,69,64,25,67

2. use url parse and http post to get work
example:
/start, /: test connection;
/login: get the instruction;
/finger: post current locationId and wap_rssids;
/locate: post current wap_rssids and get current locationId;

3. Only a client simulator and a server.
