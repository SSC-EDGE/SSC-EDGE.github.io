/* SSC EDGE — records that a logged-in user opened the website (used by the admin stats page).
   Add to your main pages:  <script src="activity.js" defer></script> */
(function(){
"use strict";
var KEY="ssc-edge-last-ping";
try{if(Date.now()-(Number(localStorage.getItem(KEY))||0)<10*60*1000)return}catch(e){}
function run(){
  if(!window.supabase||!window.supabase.createClient)return;
  var db=window.supabase.createClient("https://dvvyoygahzzbnpqrfhen.supabase.co","sb_publishable_2uiQtIIUylApCJSCpnaDkg_Ihh09v8s");
  db.auth.getSession().then(function(r){
    var u=r&&r.data&&r.data.session&&r.data.session.user;
    if(!u)return;
    return db.from("user_activity").upsert({user_id:u.id,last_seen:new Date().toISOString()},{onConflict:"user_id"}).then(function(x){
      if(!x.error){try{localStorage.setItem(KEY,String(Date.now()))}catch(e){}}
    });
  }).catch(function(){});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();
})();
