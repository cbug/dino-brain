$(function($) {
	
   //socket = io.connect('192.168.8.50', { port: 8081, rememberTransport: false});
   //console.log('oi');
   
   /*
    */
    
	
    

	/*var $pad = $(".pad")
        .xy({
                displayPrevious:false
                , min : -100
                , max : 100
                , fgColor:"#222222"
                , bgColor:"#EEEEEE"
                , change : function (value) {
                    // console.log("change : ", value);

                    socket.emit('message', '/foobar');
                }
            })
        .css({'border':'5px solid #BBB'});*/



});

/*socket = io.connect('192.168.8.50', { port: 8081, rememberTransport: false});
   console.log('oi');
   socket.on('connect', function() {
        // sends to socket.io server the host/port of oscServer
        // and oscClient
        socket.emit('config',
            {
                server: {
                    port: 3333,
                    host: '192.168.8.50'
                },
                client: {
                    port: 3334,
                    host: '192.168.8.50'
                }
            }
        );
    });

    socket.on('message', function(obj) {
        var status = document.getElementById("status");
        status.innerHTML = obj[0];
        console.log(obj);
    });*/

/*    var $pad = $(".pad")
        .xy({
                displayPrevious:false
                , min : -100
                , max : 100
                , fgColor:"#222222"
                , bgColor:"#EEEEEE"
                , change : function (value) {
                    console.log("change : ", value);

                    socket.emit('message', '/foobar');
                }
            })
        .css({'border':'5px solid #BBB'});*/
