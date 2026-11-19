/* SSC EDGE Admin — shared menu + admin check. Add to every admin page: <script src="admin-nav.js"></script> */
(function(){
"use strict";
var TOOLS=[
 {g:"Home Screen",i:"🏡",items:[
  ["admin-daily-schedule.html","📅","Daily Schedule","Day 1–60 preparation plans"],
  ["admin-daily-task.html","🎯","Daily Tasks","Daily tasks, links and mocks"],
  ["admin-updates.html","🔔","Updates","Announcements for students"]]},
 {g:"Study Material",i:"📚",items:[
  ["admin-video.html","🎬","Videos","Upload / link videos, video folders"],
  ["admin-ebook.html","📖","E-Books","Upload / link e-books"],
  ["admin-pdf.html","📄","PDFs","Subject-wise PDFs"]]},
 {g:"Questions",i:"❓",items:[
  ["questions.html","🗂️","Question Bank","Browse, search, edit, delete questions"],
  ["create-questions.html","✍️","Create Question","Add one question (English + Hindi)"],
  ["bulk-import.html","📥","Bulk Import","Excel/CSV import: shift-wise or chapter-wise"],
  ["admin-chapters.html","📑","Chapters","Subject-wise chapters"],
  ["question-manager.html","🧹","Mock Question Manager","Edit/remove questions inside a mock"]]},
 {g:"Mocks & Practice",i:"📝",items:[
  ["admin-live.html","🔴","Live Tests","Schedule live mocks (locked analysis until end)"],
  ["admin-practice.html","🏗️","Practice Admin","Exams, folders, full & sectional mocks"],
  ["mock-manager.html","📋","Mock Manager","List of all mocks, jump to edit"],
  ["admin-mock.html","🧩","Mock Questions","Assign questions to mock sections"],
  ["question-shift-manager.html","🕐","Date & Shift Folders","Subject → Date → Shift question folders"]]},
 {g:"Typing",i:"⌨️",items:[
  ["admin-typing.html","⌨️","Typing Tests","Typing exams, mocks and passages"]]},
 {g:"Insights",i:"📊",items:[
  ["admin-stats.html","📊","Users & Activity","Registered, active and mock-attempt numbers"]]},
 {g:"Practice Drill",i:"🎯",items:[
  ["admin-practice-drill.html","📁","Drill Folders & Tests","Folders and tests in Practice Drill"],
  ["chapter-mock-generator.html","⚡","Chapter Mock Generator","Auto-make sets of 25 from chapter questions"],
  ["chapter-mock-manager.html","🛠️","Chapter-wise Mocks (manual)","Build chapter mocks by hand"]]}
];
window.ADMIN_TOOLS=TOOLS;
var script=document.currentScript;
if(script&&script.hasAttribute("data-home"))return;

var URL_="https://dvvyoygahzzbnpqrfhen.supabase.co",KEY="sb_publishable_2uiQtIIUylApCJSCpnaDkg_Ihh09v8s";
var page=(location.pathname.split("/").pop()||"").toLowerCase();

var st=document.createElement("style");
st.id="adm-style";
st.textContent="body{visibility:hidden}"+
".tool-top{display:none!important}"+
"#adm-bar{visibility:visible;position:relative;z-index:900;display:flex;align-items:center;gap:10px;padding:9px 14px;background:#120b1f;border-bottom:1px solid #302044;font:13px Arial,sans-serif;color:#fff}"+
"#adm-bar a,#adm-bar button{color:#fff;text-decoration:none;background:#251344;border:1px solid #302044;border-radius:8px;padding:7px 11px;font:bold 12px Arial,sans-serif;cursor:pointer}"+
"#adm-bar .adm-t{margin-left:auto;color:#aaa2b9;font-size:11px}"+
"#adm-panel{visibility:visible;display:none;position:absolute;top:100%;left:0;right:0;max-height:75vh;overflow:auto;background:#171025;border-bottom:1px solid #302044;padding:12px 14px;box-shadow:0 12px 30px #0008}"+
"#adm-panel.open{display:block}"+
"#adm-panel h4{margin:12px 0 6px;font:bold 11px Arial;color:#a66bff;text-transform:uppercase;letter-spacing:.5px}"+
"#adm-panel .row{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:6px}"+
"#adm-panel a{display:block;padding:9px 10px;border:1px solid #302044;border-radius:8px;background:#251344;color:#fff;text-decoration:none;font:12px Arial}"+
"#adm-panel a.cur{border-color:#7c3aed;background:#7c3aed55}"+
"#adm-gate{visibility:visible;position:fixed;inset:0;z-index:2000;background:#08050e;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;font:15px Arial,sans-serif;text-align:center;padding:20px}"+
"#adm-gate a{background:#7c3aed;color:#fff;padding:11px 18px;border-radius:10px;text-decoration:none;font-weight:bold}";
document.head.appendChild(st);

function ready(fn){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fn):fn()}
function gate(msg,showLogin){
  var g=document.getElementById("adm-gate");
  if(!g){g=document.createElement("div");g.id="adm-gate";document.body.appendChild(g)}
  g.innerHTML="<div>"+msg+"</div>"+(showLogin?'<a href="admin.html">Go to Admin Login</a>':"");
}
function waitSupabase(cb,n){
  if(window.supabase&&window.supabase.createClient)return cb(true);
  if((n||0)>100)return cb(false);
  setTimeout(function(){waitSupabase(cb,(n||0)+1)},50);
}
function buildBar(client){
  var bar=document.createElement("div");bar.id="adm-bar";
  var cur="";TOOLS.forEach(function(g){g.items.forEach(function(t){if(t[0]===page)cur=t[2]})});
  bar.innerHTML='<a href="admin.html">🏠 Admin Home</a><button type="button" id="adm-menu">☰ All Tools</button><span class="adm-t">'+(cur||"Admin")+'</span><button type="button" id="adm-out">Logout</button>';
  var panel=document.createElement("div");panel.id="adm-panel";
  panel.innerHTML=TOOLS.map(function(g){return "<h4>"+g.i+" "+g.g+"</h4><div class=row>"+g.items.map(function(t){return '<a href="'+t[0]+'" class="'+(t[0]===page?"cur":"")+'">'+t[1]+" "+t[2]+"</a>"}).join("")+"</div>"}).join("");
  bar.appendChild(panel);
  document.body.insertBefore(bar,document.body.firstChild);
  document.getElementById("adm-menu").onclick=function(){panel.classList.toggle("open")};
  document.getElementById("adm-out").onclick=async function(){try{await client.auth.signOut()}catch(e){}location.href="admin.html"};
}
ready(function(){
  gate("Checking admin access…",false);
  waitSupabase(async function(ok){
    if(!ok)return gate("Could not load. Check your internet and refresh.",false);
    try{
      var client=window.supabase.createClient(URL_,KEY);
      var u=(await client.auth.getUser()).data.user;
      if(!u)return gate("Please log in as admin.",true);
      var r=await client.from("admin_users").select("user_id").eq("user_id",u.id).maybeSingle();
      if(r.error)return gate("Unable to verify admin access: "+r.error.message,true);
      if(!r.data)return gate("Access denied. Admin account required.",true);
      var g=document.getElementById("adm-gate");if(g)g.remove();
      st.textContent=st.textContent.replace("body{visibility:hidden}","");
      buildBar(client);
    }catch(e){gate("Error: "+(e.message||e),true)}
  });
});
})();
