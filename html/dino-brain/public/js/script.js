$(function($) {

    var socket = io();

    var connected = false;

    var tracking = false;

    socket.on('xy2', (data) => {
        
        console.log(data);
        // log(message, {
        //   prepend: true
        // });
        // addParticipantsMessage(data);
    });

    socket.on('new message', (data) => {
        
        console.log(data);
        // log(message, {
        //   prepend: true
        // });
        // addParticipantsMessage(data);
    });

    socket.on('osc message', (data) => {
        
        // console.log(data);

        var addr = data[0];

        switch(addr){
            case '/xPos':

                console.log('x '+ data[1]);

                var x = data[1] * 200;

                // console.log(x);
                if(!tracking)
                        $('#xInput').val(x).trigger('change');

                break;

            case '/yPos':

                console.log('y '+ data[1]);

                var y = data[1] * 200;
                
                if(!tracking)
                    $('#yInput').val(y).trigger('change');

                break;
        }



        


 
    });

    socket.on('login', (data) => {
        connected = true;
        // Display the welcome message
        var message = "Welcome to Socket.IO Chat – ";
        console.log(data);

        // socket.emit('add user', 'chas');
        // log(message, {
        //   prepend: true
        // });
        // addParticipantsMessage(data);
    });

    socket.emit('add user', 'chas');



    function oscSend(key, value){
            // console.log("change : ", value);
            socket.emit(key, value);
        };

    var $pad = $(".pad")
    .xy({
        displayPrevious:false
        , min : -100
        , max : 100
        , fgColor:"#222222"
        , bgColor:"#EEEEEE"
        , change : function (value) {
            // console.log("change : ", value);

            oscSend('xy send', value);

            // tracking = true;


            // socket.emit('new message', 'test');
        }
        })
    .css({'border':'5px solid #BBB'});

    $("#xyPad").on("mousedown touchstart", function(e){
        clearTimeout(trackingTimeout);
        tracking = true;
        console.log('tracking');
    });

    var trackingTimeout;

    $("#xyPad").on("mouseup touchend", function(){
        trackingTimeout = setTimeout(function(){
             tracking = false;
             console.log('tracking done');   
        }, 3000);
    });
	
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
