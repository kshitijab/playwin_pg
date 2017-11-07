AppNamespace.about=function(){
    var b={
        message:ko.observable("About"),
        tbItems:[{
            text:"About",
            align:"center"
        },{
            align:"left",
            widget:"button",
            options:{
             icon:"back",
             clickAction:"#_back"
         }
     }]
 };
 return b;
};

AppNamespace.tellAFriend=function(){
    // window.plugins.socialsharing.shareViaSMS('Check out the PLAYWIN App for Android, Iphone and Java Phone. Download it today from www.myplaywin.com/mobileapp. Khelo India Khelo', null, function(msg) {console.log('ok: ' + msg)}, function(msg) {console.log('error: ' + msg);});
    // window.location.href="sms: ?body='Check out the PLAYWIN App for Android, Iphone and Java Phone. Download it today from www.myplaywin.com/mobileapp. Khelo India Khelo'"
    // window.location.reload(true);
};

AppNamespace.order_a_card=function(){
    // window.location.reload(true);
    // return (window.open('https://www.myplaywin.com/ordermycard.aspx', '_blank', 'location=no', 'toolbar=yes'));
};

AppNamespace.ourValues=function(){
    var b={
        message:ko.observable("Our Values"),
        tbItems:[{
            text:"Our Values",
            align:"center"
        },{
            align:"left",
            widget:"button",
            options:{
                icon:"back",
                clickAction:"#_back"
            }
        }]
    };
    return b;
};

AppNamespace.settings=function(){
    var b={
        message:ko.observable("settings"),
        tbItems:[{
            align:"left",
            template:"nav-button"
        },{
            text:"Settings",
            align:"center"
        },{
            align:"right",
            widget:"button",
            options:{
                icon:"home",
                clickAction:"#Home"
            }
        }],
        items:[{
            key:"",
            items:[
              {
                name:"Contact Us",
                url:"",
                value:"Contact Us",
              },{
                name:"Our Values",
                url:"ourValues",
                value:"Our Values",
              },{
                name:"FAQ's",
                url:"faq",
                value:"FAQ",
              },{
                name:"Notifications ",
                value:"Notifications",
                url:"Home"
              }]
        }],
        callAction:function(a){
            if(a.value=="Tell A Friend"){
                window.location.href="sms: ?body='Check out the PLAYWIN App for Android, Iphone and Java Phone. Download it today from www.myplaywin.com/app. Khelo India Khelo'";
            }else if(a.value=="Notifications"){
                //console.log(window.localStorage.getItem('notifications'));
                if(window.localStorage.getItem('notifications') == null || window.localStorage.getItem('notifications') == "true"){
                    window.localStorage.setItem('notifications','false');
                    window.plugins.OneSignal.setSubscription(false);
                    AppNamespace.app.navigate(a.url);
                }else{
                    window.localStorage.setItem('notifications','true');
                    window.plugins.OneSignal.setSubscription(true);
                    AppNamespace.app.navigate(a.url);
                }
                //window.location.href="sms: ?body='Check out the PLAYWIN App for Android, Iphone and Java Phone. Download it today from www.myplaywin.com/mobileapp. Khelo India Khelo'"
            }else if (a.value=="My Account") {
              window.open('http://card.myplaywin.com/myplaywin/jsp/Login.jsp?displaymode=PLY', '_blank', 'location=no', 'toolbar=yes');
              return false;
            }else if(a.value == "Contact Us"){
              // this is the complete list of currently supported params you can pass to the plugin (all optional)
              /*var options = {
                message: '', // not supported on some apps (Facebook, Instagram)
                subject: 'the subject', // fi. for email
                files: ['', ''], // an array of filenames either locally or remotely
                url: 'https://www.website.com/foo/#bar?a=b',
                chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
              }

              var onSuccess = function(result) {
                console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
              }

              var onError = function(msg) {
                console.log("Sharing failed with message: " + msg);
              }

              window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);*/
                // function onSuccess(data){
                //   console.log(JSON.stringify(data));
                // }
                // function onError(err){
                //   console.log("error "+JSON.stringify(err));
                // }

            //   window.plugins.socialsharing.shareViaEmail(
            //       '', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
            //       'App Query',
            //       ['help@playwin.esselgroup.com'], // TO: must be null or an array
            //       null, // CC: must be null or an array
            //       null, // BCC: must be null or an array
            //       onSuccess, // called when sharing worked, but also when the user cancelled sharing via email. On iOS, the callbacks' boolean result parameter is true when sharing worked, false if cancelled. On Android, this parameter is always true so it can't be used). See section "Notes about the successCallback" below.
            //       onError // called when sh*t hits the fan
            //     );
            try {
                cordova.plugins.email.open({
                    to:      'help@playwin.esselgroup.com', 
                    subject: 'App Query',
                    body:    null
                });
            } catch (e) {
                window.plugins.email.open({
                    to:      'help@playwin.esselgroup.com',
                    subject: 'App Query',
                    body:    null
                });
            } 
           
            }else{
                AppNamespace.app.navigate(a.url);
            }
        }
    };

    return b;
};

AppNamespace.dial=function(){
    var b={
        message:ko.observable("dial"),
        tbItems:[{
            text:"Dial A Card",
            align:"center"
        },{
            align:"left",
            widget:"button",
            options:{
                icon:"back",
                clickAction:"#_back"
            }
        }]
    };

    return b;
};
/*
AppNamespace.myAccount=function(){
    return (window.open('http://card.myplaywin.com/myplaywin/jsp/Login.jsp?displaymode=PLY', '_blank', 'location=no', 'toolbar=yes'));
};*/

AppNamespace.gameInfo=function(params){
    viewPlayGameModel=null;
    var gameInfoViewModel={
        id:ko.observable(params.id),
        imageUrl:"content/images/"+params.id+".png",
        gameDetails:eval("Playwin.config.gameDetails.g"+params.id),
        title:"",
        isGame1:params.id==1?true:false,
        isGame2:params.id==2?true:false,
        isGame3:params.id==3?true:false,
        isGame4:params.id==4?true:false,
        isGame5:params.id==5?true:false,
        isGame9:params.id==9?true:false,
        isGame11:params.id==11?true:false,
        tbItems:[{
            text:eval("Playwin.config.gameDetails.g"+params.id+".name"),
            align:"center"
        },{
            align:"left",
            widget:"button",
            options:{
                icon:"back",
                clickAction:"#_back"
            }
        },{
            align:"right",
            widget:"button",
            icon:"home",
            options:{
                text:"Play Game",
                clickAction:function(){
                    AppNamespace.app.navigate("playGame/"+params.id);
                }
            }
        }],
        tabs:[{
            text:"Game Info"
        },{
            text:"Prize Structure"
        }],
        tabClicked:function(e){
            if(e.itemData.text=="Game Info"){
                $(".aboutGame").show();
                $(".prizeStructure").hide();
            }else{
                if(e.itemData.text=="Prize Structure"){
                    $(".aboutGame").hide();
                    $(".prizeStructure").show();
                }
            }
        },
        selectedTab:ko.observable(0),
        message:ko.observable("About")
    };

    return gameInfoViewModel;
};

AppNamespace.faq=function(){
    var vobj={
        message:ko.observable("FAQ"),
        showAns:function(a){
            $(".answer").hide();
            $("#ans_"+a.id).show();
        },
        tbItems:[
          {
              text:"FAQ's",
              align:"center"
          },{
              align:"left",
              widget:"button",
              options:{
               icon:"back",
               clickAction:"#_back"
           }
       }
          /*{
            align:"left",
            template:"nav-button"
        },{
            text:"Question & Answers",
            align:"center"
        },{
            align:"right",
            widget:"button",
            options:{
                icon:"home",
                clickAction:"#Home"
            }
        }*/

        ],
    // loadPanelMsg:ko.observable("Loading..."),
    // loadPanelVisible:ko.observable(false),

//     dataSource:ko.observable(DevExpress.data.createDataSource({
//         load:function(a){
//             if(a.refresh){
//                 var f=[];
//                 var b=new $.Deferred();
//                 vobj.loadPanelMsg("Loading...");
//                 vobj.loadPanelVisible(true);
//                 //console.error("get > "+Playwin.config.urls.faqList);
//
//                 // static faq listings
//                 var h = [
//                 {
//                     "id": 1,
//                     "question": "<span>What is Playwin? Who is the Promoter of this company?</span>",
//                     "answer": "<span>Playwin is the lottery &amp; gaming brand of Pan India Network Ltd., part of the &nbsp;Essel Group. Pan India Network Ltd. is into the business of providing infrastructure, data communication, marketing support and service to facilitate a secure online lottery network.</span>"
//                 },
//                 {
//                     "id": 2,
//                     "question": "<span>What is online Lottery and how is it different from paper lottery?</span>",
//                     "answer": "<span>The games are played on computerized Playwin terminals that offer you the power to choose your own lucky numbers unlike paper lotteries wherein the tickets are pre-printed. <br/>You can even choose your numbers OR let the terminal select the numbers for you through a LUCKY PICK.&nbsp; <br/>The draws for the games are shown live on television unlike paper lottery wherein the draws are not conducted or shown live. <br/>Playwin is the FIRST to introduce the world's most popular gaming format- Lotto to India.</span>"
//                 },
//                 {
//                     "id": 3,
//                     "question": "<span>How is the Lottery/Draw conducted?</span>",
//                     "answer": "<span><u> It's clean, it's clear, it's transparent. It's played right before your eyes.</u><br>Playwin Games of Fortune are very high tech and completely transparent. The entire hardware and software for these games has been provided by International Lottery and Totalizator Systems (ILTS), USA.<br>The draw is done through a special draw machine. This draw machine is completely automatic. Patented by Smart play International, Inc., USA, this machine has been imported into India specifically for Playwin Games of Fortune.</span>"
//                 },
//                 {
//                     "id": 4,
//                     "question": "<span>How is transparency of the Draw established? / How do I know that the games and the numbers are not rigged?</span>",
//                     "answer": "<span>The draws are shown live on television (Zee 24 Taas &amp; ETC Music). Playwin has also appointed an independent Auditing firm; Ernst &amp; Young to validate each draw result. Moreover, these draws are conducted in the presence of Government Officials of the respective states. The machines and the related equipments utilized are properly checked and validated before each draw to ensure that there is no tampering. This again is done in the presence of the respective government officials.</span>"
//                 },
//                 {
//                     "id": 5,
//                     "question": "<span>Who can play/buy lottery ticket?</span>",
//                     "answer": "<span>Every one aged 18 years and above can play with certain exceptions such as employees of Playwin and its associate companies.</span>"
//                 },
//                 {
//                     "id": 6,
//                     "question": "<span>Which are the games that are offered by Playwin? How do I play these games?</span>",
//                     "answer": "<span>PLAYWIN LOTTO GAMES&nbsp;</p><p><b>Thunderball Draw every Tuesday</b></p><p>Starting Jackpot Rs. 1 crore.<br>Select 5 nos. from 1-42 and 1 ThunderBall no. from 1-15, match all 5 numbers+ ThunderBall and win the Jackpot.<br>Attractive cash prizes on matching 3 or 4 or 5 numbers also</p><p><b><span style='font-size:10.5pt; font-family: arial,sans-serif;'></span></b><b><span style='font-size:10.5pt; font-family: arial, sans-serif;'>Jaldi 5 Double</span></b><span><span style='font-size: 10.5pt; font-family:arial, sans-serif;'>&nbsp;</span></span><b><span style='font-size: 10.5pt; font-family: arial, sans-serif;'>Draw every Wednesday</span></b></p><p style='margin-top: 0in;'><span style='font-size: 10.5pt; font-family: arial, sans-serif;'>Jackpot Rs. 10 lacs.<u1:p></u1:p><o:p></o:p></span></p><p style='margin-top: 0in;'><span style='font-size: 10.5pt; font-family:arial,sans-serif;'>Select 5 nos. from 1-36, match all 5 numbers and win the Jackpot.<u1:p></u1:p><o:p></o:p></span></p><p style='margin-top: 0in;'><span style='font-size: 10.5pt; font-family: arial, sans-serif;'>Attractive cash prizes on matching 2, 3 &amp; 4 numbers also<u1:p></u1:p><o:p></o:p></span></p><p><br><b>Thursday Super Lotto &nbsp;Draw every Thursday</b><br>Starting Jackpot Rs. 2 crores.<br>Select 6 nos out of 49, match all and win the Jackpot.<br>Attractive cash prizes on matching 3 or 4 or 5 numbers</p><p><b><span style='font-size:10.5pt; font-family: arial, sans-serif;&quot;'>Jaldi 5 Double</span></b><span><span style='font-size: 10.5pt; font-family: arial, sans-serif;'>&nbsp;</span></span><b><span style='font-size: 10.5pt; font-family: arial, sans-serif;'>Draw every Friday</span><u1:p></u1:p></b><span style='font-size: 10.5pt; font-family: arial, sans-serif;'><o:p></o:p></span></p><p style='margin-top: 0in;'><span style='font-size: 10.5pt; font-family: arial, sans-serif;'>Jackpot Rs. 5 lacs.<u1:p></u1:p><o:p></o:p></span></p><p style='margin-top: 0in;'><span style='font-size: 10.5pt; font-family: arial, sans-serif;'>Select 5 nos. from 1-36, match all 5 numbers and win the Jackpot.<u1:p></u1:p><o:p></o:p></span></p><p>&nbsp;</p><p style='margin-top: 0in;'><span style='font-size: 10.5pt; font-family: arial, sans-serif;'>Attractive cash prizes on matching 2, 3 &amp; 4 numbers also<u1:p></u1:p><o:p></o:p></span></p><p><br><b>Saturday Super Lotto Draw every Saturday</b><br>Starting Jackpot Rs. 2 crores<br>Select 6 nos out of 49, match all and win the Jackpot<br>Attractive cash prizes on matching 3 or 4 or 5 numbers also</p><p>&nbsp;</p><p >* Number of games / schedule are subject to change without Prior Notice.</span>"
//                 },
//                 {
//                     "id": 7,
//                     "question": "<span>Where can I play the games?</span>",
//                     "answer": "<span>PLAYWIN offers you multiple Channels to Play the Games<br>On-Ground: At a PLAYWIN RETAIL OUTLET near you. You can also send the following SMS (PRO POSTCODE) to 57575 to locate your nearest PLAYWIN outlet.<br>Internet:  at www.myplaywin.com</p><p>Mobile - Playwin apps are available for Android, Windows &amp; Apple Phones. Users can simply log on to www.myplaywin.com/app to get the FREE App</p><p>SMS:&nbsp;Register once on 57575 and play by just sending a SMS.<br>You simply need to register your cash card 'Account Number' and 'PIN' on 57575.<br>HOW TO REGISTER<br>Type 'MYMPC <account number='&quot;&quot;'><pin>' with spaces in between and send it to 57575. You will receive a confirmation message.<br>Eg. MYMPC 123456789011 1234<br>To play on the Internet and SMS Network you need a MyPlaywin.Com card</pin></account></span>"
//                 },
//                 {
//                     "id": 8,
//                     "question": "<span>What is MyPlaywin.Com card?</span>",
//                     "answer": "<span>MyPlaywin.Com card is a tool which allows you to participate (play) in PLAYWIN Games from anywhere*, be it your Home, Office, etc?.<br>Through a MyPlaywin.Com card you can play on the Internet / SMS<br>Myplaywin.com cards are available in denominations of 200, 50, 1000, 3000 &amp; 5,000<br>These cards are valid for 12 months from 1st usage<br>On the Back of each and every card, there is:<br>A scratch unit, under this scratch unit is a 12 digit Account Number and 4 digit password.<br>12 digit Serial Number</span>"
//                 },
//                 {
//                     "id": 9,
//                     "question": "<span>How can I get a MyPlaywin.Com card?</span>",
//                     "answer": "<span><b>3 EASY ways to get your MyPlaywin.Com Cards</b><br><b>RETAIL OUTLETS</b><br>MyPlaywin.Com cards are available at all PLAYWIN retail Outlets<br><space>You can also use the MyPlaywin.Com shop locator to find your nearest outlet.<br><b>SMS</b><br>Just Sms MPHOME to 57575, a representative will get in touch with you at the earliest.<br><b>EMAIL</b><br>Your Myplaywin.Com card is just an email away, email us at help@playwin.esselgroup.com card, provide us with your detailed address &amp; telephone number.</space></span>"
//                 },
//                 {
//                     "id": 10,
//                     "question": "<span>How do I PLAY with a MyPlaywin.Com card?</span>",
//                     "answer": "<span><strong>Internet: </strong></p><ul type='disc'>    <li>log on to <a href='http://www.myplaywin.com/'>http://www.myplaywin.com</a>,</li>    <li>Select the Game       you want to play</li>    <li>Enter your Choice       of Numbers OR Choose the Lucky Pick Option</li>    <li>Enter the 12       digit Account number and 4 digit password displayed at the back of your       card.</li>    <li>Once you&nbsp; have entered the above, you can:    <ul type='circle'>        <li>Click on Submit        to PLAY</li>        <li>Check your        MyPlaywin.Com card balance</li>        <li>View the transactions        on YOUR Card</li>    </ul>    </li></ul><p>You can also sign on to <a href='http://card.myplaywin.com/myplaywin/jsp/Login.jsp?displaymode=PLY'>MY Account</a> Page to see your Card details.</p><p><strong>Mobile</strong></p><p>Users need to download the app and follow the instructions</p><p>&nbsp;</p><p><strong>SMS:  57575 Network</strong><br>You  simply need to register your cash card 'Account Number' and  'PIN' on 57575.<br><strong><u>HOW TO REGISTER</u></strong><br>Type  'MYMPC &lt;account number&gt; &lt;pin&gt;' with spaces in between and  send it to 57575. You will receive a confirmation message.<br>Eg. MYMPC 123456789011 1234<br></span>"
//                 },
//                 {
//                     "id": 11,
//                     "question": "<span>How do I know if I have WON?</span>",
//                     "answer": "<span><strong><u>On Ground</u></strong>: You need to take  your ticket to ANY PLAYWIN Outlet; the retailer will check and confirm the  Winning</p><p>&nbsp;</p><p><strong><u>Internet, Mobile &amp; Sms</u></strong>: <br>Your WINNINGS are  automatically credited to your MyPlaywin.Com card account<br>Log in to the MY  Account page, if you have WON, the amount will be displayed either in the LOW  Tier / HIGH Tier column</span>"
//                 },
//                 {
//                     "id": 12,
//                     "question": "<span>Incase I have won, how do I claim the prizes? Can I go to any Playwin office to claim my prize?<br>Do you pay prize(s) in cash or cheque?</span>",
//                     "answer": "<span>All winnings BELOW Rs.10,000 on a SINGLE TICKET is  redeemed and encashed immediately*</strong><br><strong>All winnings above Rs.10,000 on a SINGLE TICKET have to  be claimed&nbsp; and are paid via cheque (TAX  Deducted)</strong></p><p><strong>On Ground; </strong>If you bought a PLAYWIN  ticket from a Retail outlet and you have WON, You can go to your nearest  PLAYWIN outlet and redeem your winnings<strong>. </strong></p><p><strong>Internet / Sms: </strong>if you played on  the Internet / via SMS and have won, your winnings are credited back to your  MyPlaywin.Com card. You can go to your nearest Playwin outlet / MyPlaywin.Com  Card agent to redeem your Winnings.</p><p>For all prizes  above Rs. 10000/- (on a single ticket) you need to fill a claim form, along  with all relevant details as mentioned below. The claim form can be submitted  to the claims department at any of our Playwin offices or through our regional  distributors.</p><p>Kindly download the <a href='http://www.myplaywin.com/images/ClaimPDF/claim_form_SK.pdf'>Sikkim  Claim Form</a> to claim winnings for:-<br>Thunderball, Thursday  Super Lotto, Saturday Super Lotto, Fast Lotto</p><p>&nbsp;</p><p>REQUIRED DOCUMENTS  FOR PROCESSING YOUR CLAIM:</p><p>If you have played  On Ground: &nbsp;Completed Claim Form with Original  Ticket &amp; <br>  If you have played  On Internet / Sms: Completed Claim Form with MyPlaywin.Com used to play the  game.<br>  Notarized Affidavit  on Stamp Paper (Mandatory) &amp; (IN English Only)<br>  3 Photographs  attested by Bank / Any Gazette Officer/ Notary. (Photos must be stamped)<br>  Pan Card Copy  (compulsory)<br>  Proof of Identity  (Copy of any1 of the Following)<br>  <strong>Passport Copy</strong><br>  <strong>Voters ID card Copy</strong><br>  <strong>Driving License Copy</strong><br>  <strong>Proof of Residence (Ration Card Copy/ Electricity or  Telephone Bill)</span>"
//                 },
//                 {
//                     "id": 13,
//                     "question": "<span>Where can I get the <strong>Claim Form</strong>, if I win?</span>",
//                     "answer": "<span>All licensed Playwin retailers will normally provide 'Claim Form' or you can visit or write to any of the Playwin offices. Alternately you could click on the link below to avail the form.Sikkim Claim Form</span>"
//                 },
//                 {
//                     "id": 14,
//                     "question": "<span>With in how much time of the draw do I need to claim the prize?</span>",
//                     "answer": "<span>As per the government rules you need to submit your claim to the claims department at Playwin, within 90 days form the date of draw</span>"
//                 },
//                 {
//                     "id": 15,
//                     "question": "<span>In how much time will I receive the prize won?</span>",
//                     "answer": "<span>It would take 90 working days* from the date of the claim submission to process the prizes above Rs. 10,000. The cheques are issued directly by the respective state governments for which the winning claim has been submitted.</span>"
//                 },
//                 {
//                     "id": 16,
//                     "question": "<span>Is the money from prize legal?</span>",
//                     "answer": "<span>All the money won from the prizes, is 100% legal and is accounted as Income from other sources as per the Income Tax act and is subject to requisite tax deductions by the respective state governments.</span>"
//                 },
//                 {
//                     "id": 17,
//                     "question": "<span>Can I encash entire balance of myplaywin.com card?</span>",
//                     "answer": "<span>You can encash the low tier winning from the cards not the principal amount.</span>"
//                 },
//                 {
//                     "id": 18,
//                     "question": "<span>How do I help the community cause? / How does the state benefit in the process</span>",
//                     "answer": "<span>You play and dreams of the less fortunate come true.<br>A substantial portion of the money collected from ticket sales is spent by various State Government on social causes, like primary education and infrastructure projects. These games have helped in improving the quality of life around the world.Playwin itself has contributed more than Rs 240 crores to the different state governments, which has been utilized for sponsoring schemes like the mid-day meal scheme for children in Karnataka, eye check-up &amp; blood donation camps in West Bengal, ambulance service in Maharashtra and many more....</span>"
//                 },
//                 {
//                     "id": 19,
//                     "question": "<span>Can we play on myplaywin.com at any time of the day?</span>",
//                     "answer": "<span>Gameplay on the website is allowed between 7am - 10pm. However, you can check your results at any time, and access information on games, winners, etc.....</span>"
//                 },
//                 {
//                     "id": 20,
//                     "question": "<span>I am NRI residing in Abu Dhabi currently. Can I play online lotto in India (Playwin) from here? Or do you have to be physically present in India to play?</span>",
//                     "answer": "<span>All Indian citizens can play the game, but you have to be in India* to buy a ticket and all the prizes are paid in Indian Rupees.*Gaming only allowed from the states of Maharashtra and Goa. . All prizes can be claimed from Maharashtra &amp; Goa.</span>"
//                 },
//                 {
//                     "id": 21,
//                     "question": "<span>I am having difficulty viewing www.myplaywin.com in my current browser?</span>",
//                     "answer": "<span>The website is compatible with all the popular browsers, however if you are facing a difficulty, do email us on help@playwin.esselgroup.com</span>"
//                 },
//                 {
//                     "id": 22,
//                     "question": "<span>Does Playwin have any other associate / partner websites?</span>",
//                     "answer": "<span>NO. the only official website is www.myplaywin.com</span>"
//                 },
//                 {
//                     "id": 23,
//                     "question": "<span>I forgot to save the record for the game played on my compuer/laptop.</span>",
//                     "answer": "<span>The transactions are recorded in your MyPlaywin.com Card account<br> You need to login to the MY Account Page to view the same.</span>"
//                 },
//                 {
//                     "id": 24,
//                     "question": "<span>Can I make payment for myplaywin.com cards through my debit/credit card?</span>",
//                     "answer": "<span>Debit/Credit cards are not allowed to make any payment on our website</span>"
//                 },
//                 {
//                     "id": 25,
//                     "question": "<span>Can I transfer ITZCash/DISHTV card amount to myplaywin.com card?</span>",
//                     "answer": "<span>Transfer from any other cash card is currently not possible on myplaywin.com cards, however you can transfer balance between myplaywin.com cards</span>"
//                 },
//                 {
//                     "id": 26,
//                     "question": "<span>Any Email to reach you all ?</span>",
//                     "answer": "<span>help@playwin.esselgroup.com</span>"
//                 },
//                 {
//                     "id": 27,
//                     "question": "<span></span>",
//                     "answer": "<span></span>"
//                 }
//                 ];
//
//
//                 f = [];
//                 $.each(h,function(h,g){
//                     f.push(g);
//                 });
//                 b.resolve(f);
//                 // close static faq list
//
               /* $.get(Playwin.config.urls.faqList).done(function(h){
                // $.get("http://m.myplaywin.com/pages/Faq.php").done(function(h){
                // alert(done)
                    vobj.loadPanelVisible(false);
                    vobj.loadPanelMsg("Loading...");
                    var e=h;
                    if(!h){
                        DevExpress.ui.dialog.alert("Faq List Load Error .","Error!");
                        return false
                    }
                    f = [];
                    $.each(h,function(n,g){
                        console.log(g);
                        f.push(g);
                    });
                    b.resolve(f)

                }).fail(function(){
                    vobj.loadPanelVisible(false);
                    vobj.loadPanelMsg("Loading...");
                    DevExpress.ui.dialog.alert("Error : Unable get faq info.","Error!")
                });*/
//
//                 return b
//             }
//         }
//     }))
};


return vobj;
};

AppNamespace.shopLocator=function(){
    var c={
        tbItems:[{
            text:"Shop Locator",
            align:"center"
        },{
            align:"left",
            widget:"button",
            options:{
                icon:"back",
                clickAction:"#_back"
            }
        }],
        states:ko.observable([]),
        cities:ko.observable([]),
        shopDetails:function(a){
            var g=Playwin.core.parseStr($("#cities").val());
            var b=Playwin.core.parseStr($("#states").val());
            $.each(c.cities,function(e,f){
                if(f.name==b){
                    c.cities(f.cities);
                }
            });
            var h="";
            if(g==""&&b==""){
                DevExpress.ui.dialog.alert("Please select a state or city .","Warning!");
                return false;
            }else{
                if(g!=""){
                    h="."+g;
                }
            }
            $(".shops").hide();
            $("."+b+h).show();
        },
        changeState:function(b,f){
            var a=$("#states").val();
            $.each(c.states,function(e,h){
                if(h.name==a){
                    c.cities(h.cities);
                }
            });
        },
        changeCity:function(b,a){},
        shopData:[{
            ShopName:"Lucky Lottery",
            Address:"31/32 Old Cloth Market",
            City:"Ahmednagar",
            State:"Maharashtra",
            Postcode:414001,
            ContactName:"Mr.Kamleshkumar",
            ContactNumber:"9423792145",
            Xcoord:74.74959,
            Ycoord:19.09521,
            uuid:1
        },{
            ShopName:"Star Lottery Centre",
            Address:"Opp. Bank Of India  Padhye Wadi  Dist - Raigad",
            City:"Alibag",
            State:"Maharashtra",
            Postcode:402201,
            ContactName:"Mr.Prakash",
            ContactNumber:"9422094112",
            Xcoord:72.86792,
            Ycoord:18.65549,
            uuid:2
        },{
            ShopName:"Choice Point",
            Address:"Shop No.6  Aayushi Building  B- Wing  J.B.Nagar  Next to  Canara Bank",
            City:"Andheri(E)",
            State:"Maharashtra",
            Postcode:400059,
            ContactName:"Mr.Ramnikbhai /Mr.Bipinbhai",
            ContactNumber:"9820434422",
            Xcoord:72.87813,
            Ycoord:19.11099,
            uuid:3
        },{
            ShopName:"Ameena Lottery Centre",
            Address:"M.A.Road  Opp.Bus Depot  Near Railway Station",
            City:"Andheri(W)",
            State:"Maharashtra",
            Postcode:400058,
            ContactName:"Mr.Riyaz",
            ContactNumber:"9920040222",
            Xcoord:72.82916,
            Ycoord:19.12974,
            uuid:4
        },{
            ShopName:"Guruprasad Medical & General Stores",
            Address:"Shop No.17  Twin Towers  Lokhandwala Complex",
            City:"Andheri(W)",
            State:"Maharashtra",
            Postcode:400053,
            ContactName:"Mr.Amit",
            ContactNumber:"9892456199",
            Xcoord:72.82348,
            Ycoord:19.14457,
            uuid:5
        },{
            ShopName:"Rukhmini Lottery Agency",
            Address:"17,Gomtesh Market  New Gulmandi Road",
            City:"Aurangabad",
            State:"Maharashtra",
            Postcode:431001,
            ContactName:"Mr.Om Khandelwal",
            ContactNumber:"9822899520",
            Xcoord:75.32811,
            Ycoord:19.88558,
            uuid:6
        },{
            ShopName:"Satish Stores",
            Address:"Linking Road  Opp. Amarsons  Near Petrol Pump",
            City:"Bandra (W)",
            State:"Maharashtra",
            Postcode:400050,
            ContactName:"Mr.Satish Shetty",
            ContactNumber:"(022)26406612",
            Xcoord:72.83083,
            Ycoord:19.05523,
            uuid:7
        },{
            ShopName:"Bipin Online Plaza",
            Address:"C/99  Station Plaza  Near ICICI Bank  Station Road",
            City:"Bhandup(W)",
            State:"Maharashtra",
            Postcode:400078,
            ContactName:"Mr.Tarachandbhai",
            ContactNumber:"9920334142",
            Xcoord:72.93652,
            Ycoord:19.14483,
            uuid:8
        },{
            ShopName:"R.H.Chheda Online",
            Address:"46  Indira Market  Station Road",
            City:"Bhayandar(W)",
            State:"Maharashtra",
            Postcode:401101,
            ContactName:"Mr.Rajesh.H.Chheda",
            ContactNumber:"9867997399",
            Xcoord:72.84982,
            Ycoord:19.30632,
            uuid:9
        },{
            ShopName:"Dharmendra Agency",
            Address:"44,Bazar Peth Road  Tinbatti  Navi Chawl  Opp.Bharat Gas Centre",
            City:"Bhiwandi",
            State:"Maharashtra",
            Postcode:421302,
            ContactName:"Mr.Dharmendra Dhirajlal Shah",
            ContactNumber:"9975233887",
            Xcoord:73.04829,
            Ycoord:19.28125,
            uuid:10
        },{
            ShopName:"Chheda Lottery ",
            Address:"R.M.Rabari Chawl  Carter Road No.8",
            City:"Borivali(E)",
            State:"Maharashtra",
            Postcode:400066,
            ContactName:"Mr.Khimji Gangji Chheda",
            ContactNumber:"9220815305",
            Xcoord:72.91062,
            Ycoord:19.21471,
            uuid:11
        },{
            ShopName:"Goraksha Online",
            Address:"Room No.4  Kunj Vihar Housing Society  Chandavarkar Lane  Opp.Gora Gandhi Appartment",
            City:"Borivali(W)",
            State:"Maharashtra",
            Postcode:400092,
            ContactName:"Mr.Jignesh A Parekh ",
            ContactNumber:"9892335555",
            Xcoord:72.84564,
            Ycoord:19.23723,
            uuid:12
        },{
            ShopName:"Pramod A.Parekh",
            Address:"C/o.Century Cards Shop No.1 Jaya Cinema Compound S.V.Road",
            City:"Borivali(W)",
            State:"Maharashtra",
            Postcode:400092,
            ContactName:"Mr.Pramod A Parekh ",
            ContactNumber:"9892936856",
            Xcoord:72.84564,
            Ycoord:19.23723,
            uuid:13
        },{
            ShopName:"Sri Ganesh Travels",
            Address:"Shop No.3 Himmat Mension Opp Shimpoli Corner Next to Chirag Collection S.V.Road",
            City:"Borivali(W)",
            State:"Maharashtra",
            Postcode:400092,
            ContactName:"Mrs.Prakash Furia",
            ContactNumber:"9969946310",
            Xcoord:72.84564,
            Ycoord:19.23723,
            uuid:14
        },{
            ShopName:"Navneet Lottery Centre",
            Address:"Shop No.33 C.S.T Subway (V.T.)",
            City:"C.S.T.",
            State:"Maharashtra",
            Postcode:400001,
            ContactName:"Mr.Tulsi ",
            ContactNumber:"8451068369",
            Xcoord:72.83604,
            Ycoord:18.94393,
            uuid:15
        },{
            ShopName:"Hiren Jayantilal Gada",
            Address:"2/21 White House T.B.Kadam Marg Cross Road",
            City:"Chinchpokli",
            State:"Maharashtra",
            Postcode:400027,
            ContactName:"Mr.Hiren Jayantilal Gada",
            ContactNumber:"9920510960",
            Xcoord:72.83333,
            Ycoord:18.98333,
            uuid:16
        },{
            ShopName:"Nityanand Lottery Centre ",
            Address:"196-A Sainath Estate Near Chunabhatti Rly. Station",
            City:"Chunabhatti(E)",
            State:"Maharashtra",
            Postcode:400022,
            ContactName:"Mr.Raghu S. Shetty",
            ContactNumber:"9892002217",
            Xcoord:72.86632,
            Ycoord:19.04089,
            uuid:17
        },{
            ShopName:"Sai Agency",
            Address:"Shop No.18 & 19 Churchgate Subway",
            City:"Churchgate",
            State:"Maharashtra",
            Postcode:400020,
            ContactName:"Mr.Kantilal Dedhia/Mr.Nilesh Dedhia",
            ContactNumber:"9821526557",
            Xcoord:72.82644,
            Ycoord:18.93512,
            uuid:18
        },{
            ShopName:"Meeting Point",
            Address:"Ground Floor Modhvanik Vidyarthi Bhavan Plot No.15 Opp.Fedral Bank S.G.J. Road",
            City:"Dadar(E)",
            State:"Maharashtra",
            Postcode:400014,
            ContactName:"Mr.Kishor Nenshi Shah",
            ContactNumber:"9892562870",
            Xcoord:72.84269,
            Ycoord:19.00991,
            uuid:19
        },{
            ShopName:"Lucky Star Online",
            Address:"Shop No.7 Ahmed Umer Building Opp.Dadar Railway Station S.B.Marg",
            City:"Dadar(W)",
            State:"Maharashtra",
            Postcode:400028,
            ContactName:"Mr.Upendra",
            ContactNumber:"9320767129",
            Xcoord:72.83825,
            Ycoord:19.01955,
            uuid:20
        },{
            ShopName:"Parasmani Online",
            Address:"Shop No.2 Gananath C.H.S.Ltd Dr.D'Silva Road",
            City:"Dadar(W)",
            State:"Maharashtra",
            Postcode:400028,
            ContactName:"Mr.Sachin Warange",
            ContactNumber:"9892108877",
            Xcoord:72.84182,
            Ycoord:19.01904,
            uuid:21
        },{
            ShopName:"Status Cover",
            Address:"1 Mayekar Sadan Near Shakti Nagar & Shagun Hotel Behind Anand Nagar",
            City:"Dahisar(E)",
            State:"Maharashtra",
            Postcode:400068,
            ContactName:"Mr.Hitesh",
            ContactNumber:"9821217114",
            Xcoord:72.86558,
            Ycoord:19.25568,
            uuid:22
        },{
            ShopName:"Laxmi Lottery",
            Address:"76 Nagindas Master Road Modi & Modi Bldg. No.2 Mendows Street",
            City:"Fort",
            State:"Maharashtra",
            Postcode:400001,
            ContactName:"Mr.Babu Kannan Mudliyar",
            ContactNumber:"9967926798",
            Xcoord:72.83678,
            Ycoord:18.93466,
            uuid:23
        },{
            ShopName:"Sai Ratna Online",
            Address:"Shop No.9/A Seth Building Gunboe Street Opp.Swagat Hotel",
            City:"Fort",
            State:"Maharashtra",
            Postcode:400001,
            ContactName:"Mr.Jitendra / Mr.Sunil",
            ContactNumber:"9892221046",
            Xcoord:72.83678,
            Ycoord:18.93466,
            uuid:24
        },{
            ShopName:"Sai Baba Lottery Centre",
            Address:"J.P.Road Opp.Neo Welcome Hotel",
            City:"Ghatkopar(W)",
            State:"Maharashtra",
            Postcode:400086,
            ContactName:"Mr.Mitesh/Mr.Shankarbhai",
            ContactNumber:"9819953569",
            Xcoord:72.90767,
            Ycoord:19.09081,
            uuid:25
        },{
            ShopName:"Narayan Lottery Centre",
            Address:"Shop No.12 New Market Margao",
            City:"Goa",
            State:"Goa",
            Postcode:403601,
            ContactName:"Mr.Vishwanath.N.Borkar",
            ContactNumber:"9822125932",
            Xcoord:73.95968,
            Ycoord:15.27159,
            uuid:26
        },{
            ShopName:"Maharaja Agency",
            Address:"Ward No.5 House No.139 Lyikar Galli Near Nutan Bank Main Road",
            City:"Ichalkaranji",
            State:"Maharashtra",
            Postcode:416115,
            ContactName:"Mr.Nurmohamad Abbas Bagwan",
            ContactNumber:"9822068633",
            Xcoord:74.4667,
            Ycoord:16.7,
            uuid:27
        },{
            ShopName:"Baheti Lottery",
            Address:"Opp.Old Bus Stand",
            City:"Jalgaon",
            State:"Maharashtra",
            Postcode:425001,
            ContactName:"Mr.Vinod",
            ContactNumber:"9420389239",
            Xcoord:75.56765,
            Ycoord:21.01351,
            uuid:28
        },{
            ShopName:"Vyas Agency",
            Address:"180 Polan Peth Old Cloth Market",
            City:"Jalgaon",
            State:"Maharashtra",
            Postcode:425001,
            ContactName:"Mr.Ritesh Vyas",
            ContactNumber:"9890056854",
            Xcoord:75.56397,
            Ycoord:21.01332,
            uuid:29
        },{
            ShopName:"Narayan Lottery Agency",
            Address:"Kapad Bazar",
            City:"Jalna",
            State:"Maharashtra",
            Postcode:431203,
            ContactName:"Mr.Ramesh /Mr.Ritesh",
            ContactNumber:"9403011455",
            Xcoord:75.88718,
            Ycoord:19.83895,
            uuid:30
        },{
            ShopName:"Maru Online",
            Address:"Shop No. 2 New Sai Darshan Society Nr.National Restaurant Bombay-Pune Road",
            City:"Kalwa(W)",
            State:"Maharashtra",
            Postcode:400605,
            ContactName:"Mr.Paresh Mavji Maru",
            ContactNumber:"9920100229",
            Xcoord:72.9992,
            Ycoord:19.19439,
            uuid:31
        },{
            ShopName:"Kiran Online",
            Address:"Shop No.23 Grd Flr Borgaonkar Wadi Shopping Complex St.Road Near Suyesh Plaza",
            City:"Kalyan(W)",
            State:"Maharashtra",
            Postcode:421301,
            ContactName:"Mr.Pandarinath Ramdas Deshmukh",
            ContactNumber:"(95251) 2431746",
            Xcoord:73.12242,
            Ycoord:19.24561,
            uuid:32
        },{
            ShopName:"Prince Lottery Center",
            Address:"Mohamd Ali Chowk Station Road",
            City:"Kalyan(W)",
            State:"Maharashtra",
            Postcode:421301,
            ContactName:"Mr.Mahendra/Mr.Amar",
            ContactNumber:"9819574813",
            Xcoord:73.12242,
            Ycoord:19.24561,
            uuid:33
        },{
            ShopName:"Shah Nanji Morarji & Co.",
            Address:"Shop No.2 & 3 Amar Villa Building S.V.Road Near Saibaba Temple",
            City:"Kandivali(W)",
            State:"Maharashtra",
            Postcode:400067,
            ContactName:"Mr.Manoj Vasanji Gala.",
            ContactNumber:"9920484660",
            Xcoord:72.83087,
            Ycoord:19.20994,
            uuid:34
        },{
            ShopName:"Pariwar Tea Center",
            Address:"E/5 Nutan Nagar Kanjur Village Road",
            City:"Kanjurmarg(E)",
            State:"Maharashtra",
            Postcode:400042,
            ContactName:"Mr.Ramesh Murji Gala",
            ContactNumber:"9322223587",
            Xcoord:72.9323,
            Ycoord:19.12949,
            uuid:35
        },{
            ShopName:"Om Lottery",
            Address:"Main Road",
            City:"Khamgaon",
            State:"Maharashtra",
            Postcode:444303,
            ContactName:"Mr.Manish Omprakash Khetan",
            ContactNumber:"9422184523",
            Xcoord:76.19111,
            Ycoord:20.52383,
            uuid:36
        },{
            ShopName:"Ritswet Agencies",
            Address:"Rajsarovar Niketan.315 - A Linking Road Next to Punjab and Sind Bank",
            City:"Khar(W)",
            State:"Maharashtra",
            Postcode:400052,
            ContactName:"Mr.Vinodbhai",
            ContactNumber:"9773161642",
            Xcoord:72.83613,
            Ycoord:19.07073,
            uuid:37
        },{
            ShopName:"Maharaja Enterprises",
            Address:"Gala No.B- 19 Royal Plaza Dabholkar Corner Opp.S.T.Stand Opp.Tej Courier",
            City:"Kolhapur ",
            State:"Maharashtra",
            Postcode:416001,
            ContactName:"Mr.Firoj Abbas Bagwan",
            ContactNumber:"9623181920",
            Xcoord:74.24487,
            Ycoord:16.69131,
            uuid:38
        },{
            ShopName:"Parvati Lottery Centre ",
            Address:"Mitra Nagar Shivaji Chowk",
            City:"Latur",
            State:"Maharashtra",
            Postcode:413512,
            ContactName:"Mr.Mallinath Manmthappa",
            ContactNumber:"9421090091",
            Xcoord:76.58097,
            Ycoord:18.39768,
            uuid:39
        },{
            ShopName:"Pooja Lottery Center",
            Address:"Shah & Sanghi Compound Room No.56 Patra Shed Sitaram Jadhav Marg",
            City:"Lower Parel",
            State:"Maharashtra",
            Postcode:400013,
            ContactName:"Mr.Sachin Narayan Warang",
            ContactNumber:"9869138864",
            Xcoord:72.82911,
            Ycoord:18.99658,
            uuid:40
        },{
            ShopName:"Dhiren Mavji Gala",
            Address:"C/o.Jivandhara Chemist 7 Navjivan Colony Mori Road",
            City:"Mahim(W)",
            State:"Maharashtra",
            Postcode:400017,
            ContactName:"Mr.Dhiren Mavji Gala",
            ContactNumber:"9820050234",
            Xcoord:72.84041,
            Ycoord:19.04288,
            uuid:41
        },{
            ShopName:"Jai Santoshi Maa Lottery Centre",
            Address:"Shop No.1  Jain Mansion  Near Ashok Samrat Bldg.Daftari Road",
            City:"Malad(E)",
            State:"Maharashtra",
            Postcode:400097,
            ContactName:"Mr.Bhupesh/Mr.Paresh",
            ContactNumber:"9987331841",
            Xcoord:72.85541,
            Ycoord:19.18024,
            uuid:42
        },{
            ShopName:"Classic Online",
            Address:"613 Sethna Building J.S.S.Road  Princess Street",
            City:"Marine Lines",
            State:"Maharashtra",
            Postcode:400002,
            ContactName:"Mr.Bipin Shah",
            ContactNumber:"9821313901",
            Xcoord:72.82787,
            Ycoord:18.9456,
            uuid:43
        },{
            ShopName:"Chheda Lottery Centre",
            Address:"106  Majid Bunder Road",
            City:"Masjid Bunder",
            State:"Maharashtra",
            Postcode:400003,
            ContactName:"Mr.Kantibhai Chheda/ Mr.Kailash",
            ContactNumber:"9820536853",
            Xcoord:72.83973,
            Ycoord:18.96186,
            uuid:44
        },{
            ShopName:"Bhagyodaya Lottery Agency",
            Address:"Shop No.7  harmeshwar Building  T.H.Kataria Marg",
            City:"Matunga(W)",
            State:"Maharashtra",
            Postcode:400016,
            ContactName:"Mr.Amrut/Sanjeev Miskin",
            ContactNumber:"9892278094",
            Xcoord:72.84545,
            Ycoord:19.0308,
            uuid:45
        },{
            ShopName:"Champion Lottery Centre",
            Address:"73/77  Sheth Moti Shah Road  Opp Maruti Mandir  Love Lane",
            City:"Mazagaon",
            State:"Maharashtra",
            Postcode:400010,
            ContactName:"Mr.Nitin Mulji Gala",
            ContactNumber:"9821402666",
            Xcoord:72.83693,
            Ycoord:18.97226,
            uuid:46
        },{
            ShopName:"Jai Mata Di Online",
            Address:"Shop No.2  B -30,Dreamland Hsg.Society  Sector -11  Next to Kotak Mahindra ATM  Shanti Nagar  Behind TMT Bus Stop",
            City:"Mira Road[E]",
            State:"Maharashtra",
            Postcode:401107,
            ContactName:"Mr.Bishwajyoti Ray",
            ContactNumber:"9820043121",
            Xcoord:72.86927,
            Ycoord:19.2855,
            uuid:47
        },{
            ShopName:"Adarsh Ice Cream Centre",
            Address:"Shop No.7  Jalaram Estate  M.G.Road  Opp.Shiv Sena Shakha",
            City:"Mulund(W)",
            State:"Maharashtra",
            Postcode:400080,
            ContactName:"Mr.Dilip Tappubhai Barot",
            ContactNumber:"9930005102",
            Xcoord:72.9431,
            Ycoord:19.17467,
            uuid:48
        },{
            ShopName:"Bhavesh M.Ruparel (H.U.F)",
            Address:"Shop No.4  Babu Niwas  S.V.P.Road  Nr Rly Station",
            City:"Mulund(W)",
            State:"Maharashtra",
            Postcode:400080,
            ContactName:"Mr.Bhavesh M.Ruparel (H.U.F)",
            ContactNumber:"9987642616",
            Xcoord:72.9431,
            Ycoord:19.17467,
            uuid:49
        },{
            ShopName:"Jai Santoshi Maa Lottery Bhandar",
            Address:"Shop No.14  Bodke Bldg.S.V.P. Road  Near Railway Station",
            City:"Mulund(W)",
            State:"Maharashtra",
            Postcode:400080,
            ContactName:"Mr.Mohanlal/Sohanlal",
            ContactNumber:"9819161758",
            Xcoord:72.9431,
            Ycoord:19.17467,
            uuid:50
        },{
            ShopName:"Shree Gajanan Lottery Centre",
            Address:"Shop No.11  S.V.P. Road  Station Road  Nr.Railway Station",
            City:"Mulund(W)",
            State:"Maharashtra",
            Postcode:400080,
            ContactName:"Mr.Manoj Kanhaiyalal Jaiswal",
            ContactNumber:"9867971124",
            Xcoord:72.9431,
            Ycoord:19.17467,
            uuid:51
        },{
            ShopName:"Mrs.Jigna Mehul Maroo",
            Address:"287,Padmakunj  2nd Floor  Khapripura  Near K.B..Complex  Opp.M.G.Sales  Itwari",
            City:"Nagpur",
            State:"Maharashtra",
            Postcode:440002,
            ContactName:"Mr.Mehul Dhiraj Maroo",
            ContactNumber:"9373103249",
            Xcoord:79.10186,
            Ycoord:21.15873,
            uuid:52
        },{
            ShopName:"Raval Online",
            Address:"Shop No.22  Gagan Marvel   I - Wing  Gagan Dream  Near Rashmi Resi. Complex  Vasant Link Road  Achole",
            City:"Nalasopara(E)",
            State:"Maharashtra",
            Postcode:401209,
            ContactName:"Mr.Ashish Khimji Chheda",
            ContactNumber:"9892630535",
            Xcoord:72.84564,
            Ycoord:19.43276,
            uuid:53
        },{
            ShopName:"Shree Mahalaxmi Lottery Bhandar",
            Address:"Lottery House Building  Shubhas Chowk  Near Mangal Gate Police Chowki",
            City:"Nandurbar",
            State:"Maharashtra",
            Postcode:425412,
            ContactName:"Mr.Mahesh Laxmandas Jagyasi",
            ContactNumber:"9822962206",
            Xcoord:74.24202,
            Ycoord:21.36607,
            uuid:54
        },{
            ShopName:"Chirag Enterprises",
            Address:"158 1st Floor  Sarda Sankul  Vakil Wadi  M.G.Road  Near Panchwati Hotel",
            City:"Nasik",
            State:"Maharashtra",
            Postcode:422101,
            ContactName:"Mr.Sashikant/Mr.Bablu",
            ContactNumber:"9665034532",
            Xcoord:73.7898,
            Ycoord:19.99745,
            uuid:55
        },{
            ShopName:"Shree Ganeshkrupa Agency",
            Address:"Shop No.1  Janta Market  Sector - 3  Near Nerul Bus Depot",
            City:"Nerul (E)",
            State:"Maharashtra",
            Postcode:400706,
            ContactName:"Mr.Sunil/Mr.Mahadev",
            ContactNumber:"9833213447",
            Xcoord:73.02228,
            Ycoord:19.03497,
            uuid:56
        },{
            ShopName:"Mangalmurti Lottery Center",
            Address:"29 Bhaji Market",
            City:"Panvel",
            State:"Maharashtra",
            Postcode:410206,
            ContactName:"Mr.Hemant Rameshchandra Agrawal",
            ContactNumber:"9322839323",
            Xcoord:73.11752,
            Ycoord:18.9894,
            uuid:57
        },{
            ShopName:"R.M.Gundecha",
            Address:"Shree Gurudev Datta Lottery Bank 686  Shukrawar Peth  Opp.Shreenath Talkies  Shivaji Road",
            City:"Pune",
            State:"Maharashtra",
            Postcode:411002,
            ContactName:"Mr.Dilipbhai/Mr.Mamaji",
            ContactNumber:"9689400843",
            Xcoord:73.85801,
            Ycoord:18.50878,
            uuid:58
        },{
            ShopName:"Bhagyoday Lottery",
            Address:"Ratandeep Appartment  Behind Hotel Prabha  Near Vitthal Mandir",
            City:"Ratnagiri",
            State:"Maharashtra",
            Postcode:415612,
            ContactName:"Mr.Pavankumar/Vijaykumar/Mr.Parasmal",
            ContactNumber:"9420525544",
            Xcoord:73.31202,
            Ycoord:16.99022,
            uuid:59
        },{
            ShopName:"Bhagyoday Lottery Centre",
            Address:"Bhagyoday Group  Rajwada Chowk",
            City:"Sangli",
            State:"Maharashtra",
            Postcode:416416,
            ContactName:"Mr.Prakash /Mr.Omkar",
            ContactNumber:"9511555171",
            Xcoord:74.56417,
            Ycoord:16.85438,
            uuid:60
        },{
            ShopName:"Yash Online",
            Address:"C/o.Mangal Zerox  M.G.Road  Opp.Vishal Jewellers  Near Railway Station",
            City:"Santacruz(W)",
            State:"Maharashtra",
            Postcode:400054,
            ContactName:"Mr.Lenish Chunilal Vira",
            ContactNumber:"9821242884",
            Xcoord:72.83768,
            Ycoord:19.08151,
            uuid:61
        },{
            ShopName:"Avishkar Restaurant",
            Address:"Shop No.9  Basant Court Building  Opp.Railway Station",
            City:"Sion(E)",
            State:"Maharashtra",
            Postcode:400022,
            ContactName:"Mr.Padmanabh Poonja",
            ContactNumber:"9867768494",
            Xcoord:72.87222,
            Ycoord:19.04145,
            uuid:62
        },{
            ShopName:"Hitesh Stores",
            Address:"Shop No.9/10  Sion Fish Market",
            City:"Sion(E)",
            State:"Maharashtra",
            Postcode:400022,
            ContactName:"Mr.Hitesh Mulchand Gala",
            ContactNumber:"9820597653",
            Xcoord:72.87222,
            Ycoord:19.04145,
            uuid:63
        },{
            ShopName:"Neelam Collection",
            Address:"275/1  Gope Nivas  Near I.O.B.Bank",
            City:"Sion(E)",
            State:"Maharashtra",
            Postcode:400022,
            ContactName:"Mr.Vinod/Mr.Bharat",
            ContactNumber:"9870481297",
            Xcoord:72.87222,
            Ycoord:19.04145,
            uuid:64
        },{
            ShopName:"Gavdevi Lottery Centre",
            Address:"Near Gavdevi Temple  Gokhale Road  Naupada",
            City:"Thane(W)",
            State:"Maharashtra",
            Postcode:400601,
            ContactName:"Mr.Bhupat Valjibhai Gantra",
            ContactNumber:"9892584415",
            Xcoord:72.97442,
            Ycoord:19.18805,
            uuid:65
        },{
            ShopName:"Hotel Veggies",
            Address:"Shop No.2  Sumer Castle  Castle Mill Compound  Near Vikas Complex  L.B.S.Marg",
            City:"Thane(W)",
            State:"Maharashtra",
            Postcode:400601,
            ContactName:"Mr.Bhupat /Mr.Kapil/Mr.Vinit/Mr.Bablu",
            ContactNumber:"9892584415",
            Xcoord:72.97726,
            Ycoord:19.22513,
            uuid:66
        },{
            ShopName:"Jai Ganesh Online",
            Address:"Gala No.3  Devdaya Nagar Road  Sahakar Nagar",
            City:"Thane(W)",
            State:"Maharashtra",
            Postcode:400606,
            ContactName:"Mr.Satish Gangaram Rathod",
            ContactNumber:"9821137020",
            Xcoord:72.95491,
            Ycoord:19.22756,
            uuid:67
        },{
            ShopName:"Momaima Lottery Center",
            Address:"Near Ashok Talkies  Station Road",
            City:"Thane(W)",
            State:"Maharashtra",
            Postcode:400601,
            ContactName:"Mr.Mahesh Madhavji Thakker",
            ContactNumber:"9930633350",
            Xcoord:72.97547,
            Ycoord:19.18782,
            uuid:68
        },{
            ShopName:"Divya Global X",
            Address:"Plot No. 7 Shop No.12  Sector-19D  Opp. APMC Market-II  Dana Bunder Gate No.- 1",
            City:"Vashi",
            State:"Maharashtra",
            Postcode:400705,
            ContactName:"Mr.Nilesh/Mr.Ashok",
            ContactNumber:"9867626336",
            Xcoord:73.00003,
            Ycoord:19.07936,
            uuid:69
        },{
            ShopName:"Family Online Lottery ",
            Address:"Shop No.3  Baba Godekar Chawl  Station Road",
            City:"Vikhroli[E]",
            State:"Maharashtra",
            Postcode:400083,
            ContactName:"Mr.Jayesh Mahendra Dedhia",
            ContactNumber:"8080651913",
            Xcoord:72.93098,
            Ycoord:19.11293,
            uuid:70
        },{
            ShopName:"Dwarka Lottery ",
            Address:"Below Canara Bank  Station Road",
            City:"Vikhroli[W]",
            State:"Maharashtra",
            Postcode:400083,
            ContactName:"Mr.Babli/Parsuhram",
            ContactNumber:"9768312282",
            Xcoord:72.92672,
            Ycoord:19.11105,
            uuid:71
        },{
            ShopName:"Siddharth Lottery Centre",
            Address:"Beside West End Store  Near Vikhroli level Crossing",
            City:"Vikhroli[W]",
            State:"Maharashtra",
            Postcode:400083,
            ContactName:"Mr.Shankar /Mr.Babli/Parsuhram",
            ContactNumber:"9768312282",
            Xcoord:72.91948,
            Ycoord:19.10918,
            uuid:72
        },{
            ShopName:"Lucky Playland",
            Address:"Shop No.5  Zaveri Building  D.J.Road  Near Railway Station",
            City:"Vileparle[W]",
            State:"Maharashtra",
            Postcode:400056,
            ContactName:"Miss.Lata",
            ContactNumber:"9819923616",
            Xcoord:72.83678,
            Ycoord:19.10704,
            uuid:73
        },{
            ShopName:"Plus Point",
            Address:"Shop No-956  Katrak Road  Opp.Pickup Wine Shop  Near Bank of India",
            City:"Wadala[W]",
            State:"Maharashtra",
            Postcode:400031,
            ContactName:"Mr.Kapil /Mr.Kiran",
            ContactNumber:"9820654767",
            Xcoord:72.85819,
            Ycoord:19.01211,
            uuid:74
        },{
            ShopName:"Abhinandan Lottery",
            Address:"Shop No.7  Transit Camp  Belani Nagar  Worli Village  Near Bus No.44/162 Last Stop",
            City:"Worli",
            State:"Maharashtra",
            Postcode:400030,
            ContactName:"Mr.Gopal Khamitkar",
            ContactNumber:"9819995764",
            Xcoord:72.82053,
            Ycoord:19.01211,
            uuid:75
        },{
            ShopName:"Rushabh Collection",
            Address:"Shop No.10  258  Manjrekar Sada  Near Century Bazaar  Opp. Kharude Market",
            City:"Worli",
            State:"Maharashtra",
            Postcode:400030,
            ContactName:"Mr.Nitin /Mr.Parin",
            ContactNumber:"9819656580",
            Xcoord:72.82053,
            Ycoord:19.01211,
            uuid:76
        },{
            ShopName:"OM SAIRAM",
            Address:"H NO M-83 HOUSING BOARD COLONY PENHA DE FRANCA BARDEZ TALUK ALTO ",
            City:"Porvorim",
            State:"Goa",
            Postcode:403521,
            ContactName:"Ms. Roopa",
            ContactNumber:"9960997657",
            Xcoord:73.83455,
            Ycoord:15.5209,
            uuid:76
        }]
    };

    var d=[];
    $.each(c.shopData,function(b,g){
        var h=false;
        var a=0;
        $.each(d,function(f,e){
            if(e.name==g.State){
                h=true;
                if(jQuery.inArray(g.City,e.cities)==-1){
                    d[a].cities.push(g.City);
                }
            }
            a++;
        });
        if(!h){
            d.push({
                name:g.State,
                cities:[g.City]
            });
        }
    });
    c.states=d;
    d=null;
    $(".shops").hide();
    return c;
};

AppNamespace.winners=function(c){
    var d={
        tbItems:[{
            text:"Winner List",
            align:"center"
        },{
            align:"left",
            widget:"button",
            options:{
                icon:"back",
                clickAction:"#_back"
            }
        }],
        year:c.year,
        gameName:ko.observable(""),
        overlayVisible:ko.observable(false),
        galleryVisible:ko.observable(false),
        loadPanelMsg:ko.observable("Loading..."),
        loadPanelVisible:ko.observable(false),
        notAnyWinner:ko.observable(true),
        dataSource:ko.observable(DevExpress.data.createDataSource({
            load:function(a){
                if(a.refresh){
                    var f=[];
                    var b=new $.Deferred();
                    d.loadPanelMsg("Loading...");
                    d.loadPanelVisible(true);
                    $.get(Playwin.config.urls.winnersList).done(function(h){
                        d.loadPanelVisible(false);
                        d.loadPanelMsg("Loading...");
                        var e=$.xml2json(h);
                        if(!e.Winner){
                            DevExpress.ui.dialog.alert("Game Results Load Error .","Error!");
                            return false;
                        }
                        $.each(e.Winner,function(n,g){
                            var i=g.WinnerDate.split("-");
                            if(i[2]==d.year){
                                var m={
                                    year:g.year,
                                    src:"https://images.myplaywin.com/"+g.ImageName,
                                    name:g.Name,
                                    GameName:g.GameName,
                                    Winner:i[2],
                                    Date:g.WinnerDate,
                                    Prize:g.WinnerPrize,
                                    WinningNo:g.WinnerNumber,
                                    City:g.City
                                };

                                d.notAnyWinner(false);
                                f.push(m);
                            }
                        });
                        b.resolve(f);
                    }).fail(function(){
                        d.loadPanelVisible(false);
                        d.loadPanelMsg("Loading...");
                        DevExpress.ui.dialog.alert("Error : Unable get winners info.","Error!");
                    });
                    return b;
                }
            }
        })),
        galleryTitle:ko.observable("Winners"),
        showGallery:function(){
            d.galleryVisible(true);
        },
        hideGallery:function(){
            d.galleryVisible(false);
        },
        getHeight:function(){
            return(window.innerHeight+56)-(((window.innerHeight+56)*10)/100)+"px";
        }
    };
    return d;
};

AppNamespace.winnersYearList=function(){
    var b={
        tbItems:[{
            text:"Winner's Club",
            align:"center"
        },{
            align:"left",
            widget:"button",
            options:{
                icon:"back",
                clickAction:"#Home"
            }
        }],
        yearList:function(){
            var d=[];
            for(var a=(new Date()).getFullYear();a>=2002;a--){
                d.push(a);
            }
            return d;
        },
        getYearList:function(){
            var a=Playwin.config.winnersList();
            b.yearList=[];
            $.each(a,function(e,f){
                if(f.year==data.year&&$.inArray(f.year,b.yearList)==-1){
                    b.yearList.push(f.year);
                }
            });
            return b.yearList;
        },
        yearWinnersList:function(a){
            AppNamespace.app.navigate("winners/"+a);
        }
    };
    return b;
};

AppNamespace.ifYouWin=function(c){
    var d={
        tbItems:[{
            text:"What Happens If You Win",
            align:"center"
        },{
            align:"left",
            widget:"button",
            options:{
                icon:"back",
                clickAction:"#Home"
            }
        }]
    };
    return d;
};

AppNamespace.disclaimer=function(){
    var b={
        message:ko.observable("Disclaimer"),
        tbItems:[{
            text:"Disclaimer",
            align:"center"
        },{
            align:"left",
            widget:"button",
            options:{
                icon:"back",
                clickAction:"#_back"
            }
        },{
            align:"right",
            widget:"button",
            options:{
                type:"home",
                icon:"home",
                clickAction:"#Home"
            }
        }]
    };
    return b;
};

AppNamespace.terms=function(){
    var b={
        message:ko.observable("Tems And Conditions"),
        tbItems:[{
            text:"Tems And Conditions",
            align:"center"
        },{
            align:"left",
            widget:"button",
            options:{
                icon:"back",
                clickAction:"#Home"
            }
        },{
            align:"right",
            widget:"button",
            options:{
                type:"home",
                icon:"home",
                clickAction:"#Home"
            }
        }]
    };
    return b;
};
