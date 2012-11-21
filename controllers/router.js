// router.js
// by vampirefan
// call requestHandlers.js for different pathname.
// -----------------------------------------------------

function route(handle, pathname, response, postData, hostAddress, port) {
    console.log('About to route a request for ' + pathname);
    if(typeof handle[pathname] === 'function') {
        handle[pathname](response, postData, hostAddress, port);
    } else {
        console.log('No request handler found for ' + pathname);
        response.writeHead(404, {
            "Content-Type": "text/plain"
        });
        response.write('404 Not found');
        response.end();
    }
}

exports.route = route;