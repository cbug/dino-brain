$(function($) {

    var socket = io();

    var connected = false;

    var tracking = false;


    var $pad = $(".pad")
    .xy({
        displayPrevious:false
        , min : -100
        , max : 100
        // , fgColor:"#222222"
        , fgColor:"#ffffff"
        , bgColor:"#EEEEEE"
        , change : function (value) {

            oscSend('xy send', value);

        }
    }).css({'border':'3px solid #BBB'});

    $('#systemOnBtn').click(function(e){
        console.log('motorsOn');
        oscSend('motorsOnOff', 1);
    });

    $('#systemOffBtn').click(function(e){
        console.log('motorsOff');
        oscSend('motorsOnOff', 0);
    });

    $('#centerBtn').click(function(e){
        console.log('center');
        oscSend('center', 1);
    });

    $('#topBtn').click(function(e){
        console.log('top');
        oscSend('top', 1);
    });

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
        }, 500);
    });
	



});

