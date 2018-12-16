$(function($) {

    var curSequence = 0;

    var socket = io();

    var connected = false;

    var tracking = false;

    // oscSend('getCurSeq', 1);
    setTimeout(function(){
        oscSend('getCurSeq', 1);
    }, 1000);

    setTimeout(function(){
        oscSend('getSettings', 1);
    }, 2000);
    


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

    $('#homeBtn').click(function(e){
        console.log('home');
        oscSend('homePos', 1);
    }); 

    $("#systemShutdownDiv").hide();  
    $('#systemShutdownBtn').click(function(e){
        $("#systemShutdownDiv").slideDown();
    });

    $('#systemShutdownConfBtn').click(function(e){
        oscSend('systemShutdown', 1);
    });

    $('#systemShutdownCancBtn').click(function(e){
        
        $("#systemShutdownDiv").slideUp();
    });

    var recording = false;
    $('#recordBtn').click(function(e){
        if(!recording){
            recording = true;
            // $('#recordBtn').html('STOP');
            timerInterval = setInterval(recCounter, 1000);
            console.log('recStart');
            oscSend('recStart', 1);
        }else{
            recording = false;
            $('#recordBtn').html('RECORD');
            clearInterval(timerInterval);
            totalSeconds = 0;
            console.log('recStop');
            oscSend('recStop', 1);
        }
         
    });

    var playing = false;
    $('#playBtn').click(function(e){
        if(!playing){
            playing = true;
            $('#playBtn').html('PAUSE');
            // timerInterval = setInterval(recCounter, 1000);
            console.log('PAUSE');
            oscSend('seqStart', 1);
        }else{
            seqStop();
            oscSend('seqStop', 1);
        }
         
    });

    function seqStop(){
        playing = false;
        $('#playBtn').html('PLAY');
        clearInterval(timerInterval);
        console.log('seqStop');
    }

    $('#seqSelect').change(function(){
        var seqNum = parseInt($('#seqSelect').val());
        oscSend('seqNum', seqNum);
    });

    $('#nextSeqBtn').click(function(){
        oscSend('nextSeq', 1);
    });

    $('#prevSeqBtn').click(function(){
        oscSend('prevSeq', 1);
    });

    $('#saveSeqBtn').click(function(e){
        console.log('saveSeq');
        oscSend('saveSeq', 1);
    });
    $('#saveSeqCancBtn').click(function(e){
        console.log('saveSeq');
        oscSend('seqNum', curSequence);
    });

    $('#autoEnabledSelect').change(function(){
        var val = parseInt($('#autoEnabledSelect').val());
        oscSend('autoEnabled', val);
    });

    $('#autoStartTimeSelect').change(function(){
        var val = parseInt($('#autoStartTimeSelect').val());
        oscSend('autoStartTime', val);
    });

    $('#autoEndTimeSelect').change(function(){
        var val = parseInt($('#autoEndTimeSelect').val());
        oscSend('autoEndTime', val);
    });

    $('#autoEndTimeSelect').change(function(){
        var val = parseInt($('#autoEndTimeSelect').val());
        oscSend('autoEndTime', val);
    });

    $('#autoIntervalSelect').change(function(){
        var val = parseInt($('#autoIntervalSelect').val());
        oscSend('autoInterval', val);
    });


    $('#autoStartSeqSelect').change(function(){
        var val = parseInt($('#autoStartSeqSelect').val());
        oscSend('autoStartSeq', val);
    });

    $('#autoEndSeqSelect').change(function(){
        var val = parseInt($('#autoEndSeqSelect').val());
        oscSend('autoEndSeq', val);
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

                // console.log('x '+ data[1]);

                var x = data[1] * 200;

                // console.log(x);
                if(!tracking)
                        $('#xInput').val(x).trigger('change');

                break;

            case '/yPos':

                // console.log('y '+ data[1]);

                var y = data[1] * 200;
                
                if(!tracking)
                    $('#yInput').val(y).trigger('change');

                break;

            case '/seqNum':

                curSequence = data[1];
                
                $('#seqSelect').val(curSequence);

                break;

            case '/seqComplete':

                seqStop();

                

                break;

            case '/seqSaved':

                if( data[1] == 1){
                    $('#saveSeqDiv').hide();
                }else{
                    $('#saveSeqDiv').show();
                }

                

                break;

            case '/autoEnabled':

                var val = data[1];
                
                $('#autoEnabledSelect').val(val);

                break;

            case '/autoStartTime':

                var val = data[1];
                
                $('#autoStartTimeSelect').val(val);

                break;

            case '/autoEndTime':

                var val = data[1];
                
                $('#autoEndTimeSelect').val(val);

                break;

            case '/autoInterval':

                var val = data[1];
                
                $('#autoIntervalSelect').val(val);

                break;

            case '/autoStartSeq':

                var val = data[1];
                
                $('#autoStartSeqSelect').val(val);

                break;

            case '/autoEndSeq':

                var val = data[1];
                
                $('#autoEndSeqSelect').val(val);

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




    // rec timer ------------------------------------------

    var totalSeconds = 0;
    var timerInterval;
    

    function recCounter() {
      ++totalSeconds;
      var sec = pad(totalSeconds % 60);
      var min = pad(parseInt(totalSeconds / 60));

      $('#recordBtn').html(min+':'+sec);


    }

    function pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }
	



});

