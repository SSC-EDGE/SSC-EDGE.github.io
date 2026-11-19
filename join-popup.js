/* SSC EDGE — "Join our Telegram channel" pop-up.
   Add to any page:  <script src="join-popup.js" defer></script>
   Shows once every time the website is opened. Skip only closes it for that visit. */
(function(){
"use strict";
var LINK="https://t.me/+aoW_8O6eMOc1NGU1";
var POINTS=[
  ["📚","FREE STUDY MATERIAL"],
  ["📄","FREE EXAM RELATED PDFs"],
  ["🚀","ALL EXAMS MOCKS"],
  ["🔔","EXAM UPDATES"],
  ["📊","ANSWER KEYS & ANALYSIS"],
  ["⌨️","TYPING & PRACTICE TESTS"]
];
var SHOWN_KEY="ssc-edge-join-shown";
/* Shown every time the website is opened (once per visit, not on every page change). */
try{if(sessionStorage.getItem(SHOWN_KEY))return;sessionStorage.setItem(SHOWN_KEY,"1")}catch(e){}

var css=document.createElement("style");
css.textContent=
"#sj-ov{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(8,5,14,.72);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);animation:sjf .25s ease}"+
"@keyframes sjf{from{opacity:0}to{opacity:1}}@keyframes sjp{from{transform:translateY(14px) scale(.97);opacity:0}to{transform:none;opacity:1}}"+
"#sj-box{width:min(400px,100%);max-height:96vh;overflow:auto;border:2px solid #a66bff;border-radius:26px;padding:24px 18px 16px;text-align:center;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:linear-gradient(170deg,#1c0f33 0%,#2a1650 100%);box-shadow:0 22px 70px rgba(0,0,0,.6);animation:sjp .3s ease}"+
"#sj-logo{width:116px;height:116px;border-radius:50%;border:4px solid #fff;box-shadow:0 0 0 7px rgba(166,107,255,.28);object-fit:cover;background:#000}"+
"#sj-name{margin:14px 0 2px;font-size:27px;font-weight:900;letter-spacing:1.5px}#sj-name span{color:#c79bff}"+
"#sj-sub{margin:0 0 14px;font-size:14px;color:#cdbbea}"+
".sj-pt{display:flex;align-items:center;gap:10px;text-align:left;padding:11px 14px;margin-bottom:8px;border:1px solid rgba(166,107,255,.35);border-radius:14px;background:rgba(124,58,237,.16);font-size:14px;font-weight:900;letter-spacing:.3px}"+
"#sj-join{display:block;width:100%;margin-top:14px;padding:14px;border:0;border-radius:14px;background:linear-gradient(135deg,#a66bff,#7c3aed);color:#fff;font-size:16px;font-weight:900;cursor:pointer;text-decoration:none}"+
"#sj-skip{margin-top:12px;padding:8px 20px;border:0;background:transparent;color:#b9a5d9;font-size:15px;font-weight:800;cursor:pointer}";
document.head.appendChild(css);

function show(){
  var ov=document.createElement("div");ov.id="sj-ov";
  ov.innerHTML='<div id="sj-box" role="dialog" aria-modal="true" aria-label="Join our Telegram channel">'+
    '<img id="sj-logo" src="/ssc-edge-logo.jpg" alt="SSC EDGE logo">'+
    '<div id="sj-name">SSC <span>EDGE</span> ®</div>'+
    '<p id="sj-sub">Join our Telegram channel for</p>'+
    POINTS.map(function(p){return '<div class="sj-pt"><span>'+p[0]+'</span><span>'+p[1]+'</span></div>'}).join("")+
    '<a id="sj-join" href="'+LINK+'" target="_blank" rel="noopener">🔔 Join Telegram Channel</a>'+
    '<button id="sj-skip" type="button">Skip</button></div>';
  document.body.appendChild(ov);
  function close(){ov.remove()}
  /* only the buttons close it — tapping anywhere else does nothing */
  document.getElementById("sj-join").onclick=function(){setTimeout(close,300)};
  document.getElementById("sj-skip").onclick=close;
}
function start(){setTimeout(show,500)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
