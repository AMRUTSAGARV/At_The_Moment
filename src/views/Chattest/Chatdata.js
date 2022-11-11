import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import $ from 'jquery'


$(document).ready(function(){
     
    var arr = []; // List of users 
   
   $(document).on('click', '.msg_head', function() { 
    var chatbox = $(this).parents().attr("rel") ;
    $('[rel="'+chatbox+'"] .msg_wrap').slideToggle('slow');
    return false;
   });
   
   
   $(document).on('click', '.close', function() { 
    var chatbox = $(this).parents().parents().attr("rel") ;
    $('[rel="'+chatbox+'"]').hide();
    arr.splice($.inArray(chatbox, arr), 1);
    displayChatBox();
    return false;
   });
   
   $(document).on('click', '#sidebar-user-box', function() {
   
    var userID = $(this).attr("class");
    var username = $(this).children().text() ;
    
    if ($.inArray(userID, arr) != -1)
    {
        arr.splice($.inArray(userID, arr), 1);
       }
    
    arr.unshift(userID);
    chatPopup =  '<div class="msg_box" style="right:270px" rel="'+ userID+'">'+
       '<div class="msg_head">'+username +
       '<div class="close">x</div> </div>'+
       '<div class="msg_wrap"> <div class="msg_body"> <div class="msg_push"></div> </div>'+
       '<div class="msg_footer"><textarea class="msg_input" rows="4"></textarea></div>  </div>  </div>' ;     
      
       $("body").append(  chatPopup  );
    displayChatBox();
   });
   
   
   $(document).on('keypress', 'textarea' , function(e) {       
          if (e.keyCode == 13 ) {   
              var msg = $(this).val();  
     $(this).val('');
     if(msg.trim().length != 0){    
     var chatbox = $(this).parents().parents().parents().attr("rel") ;
     $('<div class="msg-right">'+msg+'</div>').insertBefore('[rel="'+chatbox+'"] .msg_push');
     $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
     }
          }
      });
   
    
      
   function displayChatBox(){ 
       i = 270 ; // start position
    j = 260;  //next position
    
    $.each( arr, function( index, value ) {  
       if(index < 4){
            $('[rel="'+value+'"]').css("right",i);
      $('[rel="'+value+'"]').show();
         i = i+j;    
       }
       else{
      $('[rel="'+value+'"]').hide();
       }
          });  
   }  
   
  });


class Chatdata extends Component {

    
  render() {
 
    return (
        <div id="chat-sidebar">

        <div id="sidebar-user-box" class="100" >
        <img src="user.png" />
        <span id="slider-username">Sumit Kumar Pradhan </span>
        </div> 
        
        <div id="sidebar-user-box" class="101" >
        <img src="user.png" />
        <span id="slider-username">Skptricks </span>
        </div> 
        
        <div id="sidebar-user-box" class="102" >
        <img src="user.png" />
        <span id="slider-username">Amit Singh </span>
        </div> 
        
        <div id="sidebar-user-box" class="103" >
        <img src="user.png" />
        <span id="slider-username">Neeraj Tiwari </span>
        </div> 
        
        <div id="sidebar-user-box" class="104"  >
        <img src="user.png" />
        <span id="slider-username">Sorav Singh </span>
        </div> 
        
        <div id="sidebar-user-box" class="105" >
        <img src="user.png" />
        <span id="slider-username">Lokesh Singh </span>
        </div> 
        
        <div id="sidebar-user-box" class="106" >
        <img src="user.png" />
        <span id="slider-username">Tony </span>
        </div> 
        
        <div id="sidebar-user-box" class="107" >
        <img src="user.png" />
        <span id="slider-username">Alex Robby </span>
        </div> 
        
        <div id="sidebar-user-box" class="108" >
        <img src="user.png" />
        <span id="slider-username">Pragaya Mishra </span>
        </div> 
        
        <div id="sidebar-user-box" class="109" >
        <img src="user.png" />
        <span id="slider-username">Abhishek Mishra </span>
        </div> 
         
        </div> 
   
   
   
   );
  }
}

export default Chatdata;
