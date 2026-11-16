/* SSC EDGE — live test helper. Used by practice.html, test.html, admin-live.html.
   On analysis.html / solutions.html add:  <script src="live-guard.js" data-guard></script>  */
(function(){
"use strict";
var offset=0,synced=false;
var S={
  sync:async function(db){
    if(synced)return;synced=true;
    try{var t0=Date.now();var r=await db.rpc("server_now");
      if(!r.error&&r.data){offset=new Date(r.data).getTime()-(t0+Date.now())/2}}catch(e){}
  },
  nowMs:function(){return Date.now()+offset},
  state:function(t){
    if(!t||!t.is_live||!t.live_start||!t.live_end)return "none";
    var n=S.nowMs(),s=+new Date(t.live_start),e=+new Date(t.live_end);
    return n<s?"upcoming":(n<e?"live":"ended");
  },
  locked:function(t){var s=S.state(t);return s==="upcoming"||s==="live"},
  fmt:function(iso){
    try{return new Date(iso).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"2-digit",hour12:true})+" IST"}catch(e){return iso}
  },
  left:function(ms){
    ms=Math.max(0,ms);var m=Math.floor(ms/60000),d=Math.floor(m/1440),h=Math.floor((m%1440)/60);m=m%60;
    return (d?d+"d ":"")+(h?h+"h ":"")+m+"m";
  }
};
window.SSCLive=S;

var sc=document.currentScript;
if(!sc||!sc.hasAttribute("data-guard"))return;
/* ---- auto guard for analysis / solutions ---- */
var st=document.createElement("style");st.textContent="body{visibility:hidden}";document.head.appendChild(st);
function open_(){st.remove()}
function block(t){
  var d=document.createElement("div");
  d.style.cssText="visibility:visible;position:fixed;inset:0;z-index:99999;background:#08050e;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:24px;font:16px Arial,sans-serif";
  d.innerHTML='<div style="font-size:44px">🔴</div><div style="font-size:20px;font-weight:800">Live test in progress</div><div style="color:#aaa2b9;max-width:420px;line-height:1.6">Analysis and solutions for this test will be available after the live window ends on<br><b style="color:#fff">'+S.fmt(t.live_end)+'</b></div><a href="/practice" style="background:#7c3aed;color:#fff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:bold">Back to Practice</a>';
  document.body.appendChild(d);document.body.style.visibility="visible";
}
function wait(cb,n){if(window.supabase&&window.supabase.createClient)return cb();if((n||0)>100)return open_();setTimeout(function(){wait(cb,(n||0)+1)},50)}
function run(){wait(async function(){
  try{
    var db=window.supabase.createClient("https://dvvyoygahzzbnpqrfhen.supabase.co","sb_publishable_2uiQtIIUylApCJSCpnaDkg_Ihh09v8s");
    var p=new URLSearchParams(location.search),tid=p.get("test_id")||p.get("id"),aid=p.get("attempt_id");
    if(!tid&&aid){var a=await db.from("test_attempts").select("mock_test_id").eq("id",aid).maybeSingle();tid=a.data&&a.data.mock_test_id}
    if(!tid)return open_();
    await S.sync(db);
    var r=await db.from("mock_tests").select("is_live,live_start,live_end").eq("id",tid).maybeSingle();
    if(r.error||!r.data)return open_();
    if(S.locked(r.data)){block(r.data)}else open_();
  }catch(e){open_()}
})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();
})();
