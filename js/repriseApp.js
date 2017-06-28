var app = angular.module("reprise", []);

app.service('status', function() {
    
    var statusMsg = {};
    var status = {
    	httpReq: false,
    	complete: false,
    	error: false
    };

    statusMsg.show = function() {
  	   status.httpReq = true;	
       return status;
    };
    statusMsg.complete = function() {
       status.complete = true;	
       return status;
    };
    statusMsg.hide = function() {
       status.httpReq = false;
       status.complete = false;	
       status.error = false;	
       return status;
    };

    return statusMsg;

});