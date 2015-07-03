var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "174.129.184.45";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen( port, ipaddress, function() {
    console.log((new DATE()) + ' Server is listening on port 8080');
});