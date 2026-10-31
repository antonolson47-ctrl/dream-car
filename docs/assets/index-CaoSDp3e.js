(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const Yt=66,Ee=60/Yt,je=[[74,1.5],[76,.5],[77,1],[74,1],[72,1],[74,1],[69,2],[70,1],[72,1],[74,1],[77,1],[76,1.5],[74,.5],[72,2],[74,1],[77,1],[81,2],[79,1],[77,1],[74,1],[70,1],[70,1.5],[72,.5],[74,2],[69,3],[74,1]],Dt=[[50,53,57],[50,53,57],[46,50,53],[53,57,60],[50,53,57],[55,58,62],[46,50,53],[50,53,57]],Gt=[38,38,34,41,38,43,34,38];function Ve(t){return 440*2**((t-69)/12)}class jt{constructor(){this.ctx=null,this.master=null,this.on=!1,this.timer=null,this.cursor=0,this.nextTime=0,this.barBeat=0,this.sfx=null,this.noise=null,this.lastChing=0,this.lastMoan=0}async ensure(){const e=window.AudioContext||window.webkitAudioContext;return e?(this.ctx||(this.ctx=new e,this.buildGraph()),this.ctx.state==="suspended"&&await this.ctx.resume(),this.ctx.state==="running"):!1}async start(){if(this.on)return;const e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx||(this.ctx=new e,this.buildGraph()),await this.ctx.resume(),this.on=!0,this.nextTime=this.ctx.currentTime+.08,this.cursor=0,this.barBeat=0,this.schedule())}buildGraph(){const e=this.ctx;this.master=e.createGain(),this.master.gain.value=.42;const n=e.createBiquadFilter();n.type="lowpass",n.frequency.value=4200,n.Q.value=.4;const a=e.createDynamicsCompressor();a.threshold.value=-18,a.knee.value=18,a.ratio.value=2.2,a.attack.value=.02,a.release.value=.25;const o=e.createGain();o.gain.value=.28;const i=e.createGain();i.gain.value=.82;const r=e.createDelay(1);r.delayTime.value=.29;const s=e.createDelay(1);s.delayTime.value=.47;const l=e.createGain();l.gain.value=.28;const h=e.createBiquadFilter();h.type="lowpass",h.frequency.value=2200,this.bus=e.createGain(),this.bus.gain.value=1,this.bus.connect(i),this.bus.connect(r),r.connect(h),h.connect(s),s.connect(l),l.connect(r),h.connect(o),i.connect(n),o.connect(n),n.connect(a),a.connect(this.master),this.master.connect(e.destination),this.sfx=e.createGain(),this.sfx.gain.value=.36,this.sfx.connect(e.destination)}stop(){this.on=!1,this.timer&&(clearTimeout(this.timer),this.timer=null)}async toggle(){return this.on?(this.stop(),!1):(await this.start(),this.on)}schedule(){if(!this.on||!this.ctx)return;const e=this.ctx.currentTime+1.4;let n=0;for(;this.nextTime<e&&n<32;){n+=1;const[a,o]=je[this.cursor],i=o*Ee;this.violin(this.nextTime,a,i*.94);const r=Nt(this.cursor);if(r%4===0){const s=r/4%8;this.pad(this.nextTime,Dt[s],Ee*4*.98),this.bass(this.nextTime,Gt[s],Ee*3.2)}this.nextTime+=i,this.cursor=(this.cursor+1)%je.length}this.timer=setTimeout(()=>this.schedule(),400)}violin(e,n,a){const o=this.ctx,i=Ve(n),r=o.createOscillator(),s=o.createOscillator(),l=o.createBiquadFilter(),h=o.createGain(),p=o.createGain(),f=o.createOscillator(),g=o.createGain();r.type="sawtooth",r.frequency.setValueAtTime(i,e),s.type="triangle",s.frequency.setValueAtTime(i*2,e),p.gain.value=.07,f.type="sine",f.frequency.value=5.3,g.gain.setValueAtTime(0,e),g.gain.linearRampToValueAtTime(i*.0045,e+.28),f.connect(g),g.connect(r.frequency),l.type="lowpass",l.Q.value=.65,l.frequency.setValueAtTime(780,e),l.frequency.linearRampToValueAtTime(1680,e+.14),l.frequency.linearRampToValueAtTime(1240,e+a);const m=.075;h.gain.setValueAtTime(1e-4,e),h.gain.exponentialRampToValueAtTime(m,e+.09),h.gain.exponentialRampToValueAtTime(m*.72,e+.24);const x=Math.max(e+.26,e+a-.16);h.gain.setValueAtTime(m*.72,x),h.gain.exponentialRampToValueAtTime(1e-4,e+a+.05),r.connect(l),s.connect(p),p.connect(l),l.connect(h),h.connect(this.bus),r.start(e),s.start(e),f.start(e);const w=e+a+.08;r.stop(w),s.stop(w),f.stop(w),r.onended=()=>{r.disconnect(),s.disconnect(),l.disconnect(),h.disconnect(),f.disconnect(),g.disconnect(),p.disconnect()}}pad(e,n,a){const o=this.ctx;for(const i of n){const r=o.createOscillator(),s=o.createGain();r.type="triangle",r.frequency.value=Ve(i),r.detune.value=i%2===0?-6:6,s.gain.setValueAtTime(1e-4,e),s.gain.exponentialRampToValueAtTime(.018,e+.4),s.gain.exponentialRampToValueAtTime(1e-4,e+a),r.connect(s),s.connect(this.bus),r.start(e),r.stop(e+a+.05),r.onended=()=>{r.disconnect(),s.disconnect()}}}bass(e,n,a){const o=this.ctx,i=o.createOscillator(),r=o.createGain();i.type="sine",i.frequency.value=Ve(n),r.gain.setValueAtTime(1e-4,e),r.gain.exponentialRampToValueAtTime(.045,e+.05),r.gain.exponentialRampToValueAtTime(1e-4,e+a),i.connect(r),r.connect(this.bus),i.start(e),i.stop(e+a+.02),i.onended=()=>{i.disconnect(),r.disconnect()}}tick(){if(!this.on||!this.ctx)return;const e=this.ctx,n=e.createOscillator(),a=e.createGain();n.type="triangle",n.frequency.value=880;const o=e.currentTime;a.gain.setValueAtTime(.03,o),a.gain.exponentialRampToValueAtTime(1e-4,o+.05),n.connect(a),a.connect(this.master),n.start(o),n.stop(o+.06)}land(){if(!this.on||!this.ctx)return;const e=this.ctx,n=e.createOscillator(),a=e.createGain();n.type="sine",n.frequency.value=392;const o=e.currentTime;a.gain.setValueAtTime(.04,o),a.gain.exponentialRampToValueAtTime(1e-4,o+.18),n.connect(a),a.connect(this.master),n.start(o),n.stop(o+.2)}chaChing(){if(!this.ctx||!this.sfx)return;const e=this.ctx.currentTime;e-this.lastChing<.32||(this.lastChing=e,this.bell(e,1568,.2,.34),this.bell(e+.07,2093,.24,.28),this.bell(e+.14,3136,.16,.14),this.drawer(e+.015))}moan(e=2){if(!this.ctx||!this.sfx)return;const n=this.ctx.currentTime;if(n-this.lastMoan<.82)return;this.lastMoan=n;const a=(Math.max(1,e)+Math.floor(n*8))%3;a===0?this.wail(n,420-e*16,150,.42+e*.04):a===1?(this.wail(n,460,280,.14),this.wail(n+.16,260,120,.38)):this.wail(n,240,80,.55)}fanfare(e=1){if(!this.ctx||!this.sfx)return;const n=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((o,i)=>this.bell(n+i*.09,o,.28,.2*e)),this.whistle(n,.22),this.crackle(n+.3,.45*e),this.bell(n+.42,1318.5,.3,.12*e)}cheer(){if(!this.ctx||!this.sfx)return;const e=this.ctx.currentTime;[523.25,659.25,783.99].forEach((n,a)=>this.bell(e+a*.08,n,.22,.16))}spark(){!this.ctx||!this.sfx||this.bell(this.ctx.currentTime,880,.18,.12)}wah(e=2){if(!this.ctx||!this.sfx)return;const n=this.ctx.currentTime,a=e>=2?[[329.63,.16],[261.63,.16],[220,.18],[174.61,.62]]:[[329.63,.15],[220,.48]];let o=n;for(const[i,r]of a)this.brass(o,i,r),o+=r*.92}bell(e,n,a,o){const i=this.ctx,r=i.createOscillator(),s=i.createOscillator(),l=i.createGain(),h=i.createGain();r.type="sine",s.type="triangle",r.frequency.setValueAtTime(n,e),s.frequency.setValueAtTime(n*2.76,e),h.gain.value=.16,l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),e+.008),l.gain.exponentialRampToValueAtTime(1e-4,e+a),r.connect(l),s.connect(h),h.connect(l),l.connect(this.sfx),r.start(e),s.start(e);const p=e+a+.02;r.stop(p),s.stop(p),r.onended=()=>{r.disconnect(),s.disconnect(),l.disconnect(),h.disconnect()}}drawer(e){const n=this.ctx,a=n.createBufferSource();a.buffer=this.noiseBuffer();const o=n.createBiquadFilter();o.type="bandpass",o.frequency.setValueAtTime(1900,e),o.frequency.exponentialRampToValueAtTime(380,e+.14),o.Q.value=.6;const i=n.createGain();i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(.28,e+.012),i.gain.exponentialRampToValueAtTime(1e-4,e+.16),a.connect(o),o.connect(i),i.connect(this.sfx),a.start(e),a.stop(e+.18),a.onended=()=>{a.disconnect(),o.disconnect(),i.disconnect()}}wail(e,n,a,o){const i=this.ctx,r=i.createOscillator(),s=i.createOscillator(),l=i.createBiquadFilter(),h=i.createGain(),p=i.createGain(),f=i.createOscillator(),g=i.createGain();r.type="sawtooth",s.type="triangle";const m=Math.max(48,a);r.frequency.setValueAtTime(Math.max(50,n),e),r.frequency.exponentialRampToValueAtTime(m,e+o),s.frequency.setValueAtTime(Math.max(40,n*.5),e),s.frequency.exponentialRampToValueAtTime(Math.max(40,m*.5),e+o),p.gain.value=.4,f.frequency.value=6.5+Math.random(),g.gain.value=14,f.connect(g),g.connect(r.frequency),l.type="bandpass",l.Q.value=7,l.frequency.setValueAtTime(980,e),l.frequency.exponentialRampToValueAtTime(380,e+o*.55),l.frequency.exponentialRampToValueAtTime(1200,e+o),h.gain.setValueAtTime(1e-4,e),h.gain.exponentialRampToValueAtTime(.3,e+.045),h.gain.exponentialRampToValueAtTime(1e-4,e+o),r.connect(l),s.connect(p),p.connect(l),l.connect(h),h.connect(this.sfx),r.start(e),s.start(e),f.start(e);const x=e+o+.04;r.stop(x),s.stop(x),f.stop(x),r.onended=()=>{r.disconnect(),s.disconnect(),l.disconnect(),h.disconnect(),p.disconnect(),f.disconnect(),g.disconnect()}}brass(e,n,a){const o=this.ctx,i=o.createOscillator(),r=o.createBiquadFilter(),s=o.createGain();i.type="sawtooth",i.frequency.setValueAtTime(n,e),r.type="bandpass",r.Q.value=8,r.frequency.setValueAtTime(260,e),r.frequency.linearRampToValueAtTime(1480,e+a*.32),r.frequency.linearRampToValueAtTime(320,e+a),s.gain.setValueAtTime(1e-4,e),s.gain.exponentialRampToValueAtTime(.2,e+.03),s.gain.exponentialRampToValueAtTime(1e-4,e+a),i.connect(r),r.connect(s),s.connect(this.sfx),i.start(e),i.stop(e+a+.02),i.onended=()=>{i.disconnect(),r.disconnect(),s.disconnect()}}whistle(e,n){const a=this.ctx,o=a.createOscillator(),i=a.createGain();o.type="sine",o.frequency.setValueAtTime(620,e),o.frequency.exponentialRampToValueAtTime(1680,e+n),i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(.08,e+.04),i.gain.exponentialRampToValueAtTime(1e-4,e+n),o.connect(i),i.connect(this.sfx),o.start(e),o.stop(e+n+.02),o.onended=()=>{o.disconnect(),i.disconnect()}}crackle(e,n){const a=this.ctx,o=a.createBufferSource();o.buffer=this.noiseBuffer();const i=a.createBiquadFilter();i.type="highpass",i.frequency.value=900;const r=a.createGain();r.gain.setValueAtTime(1e-4,e),r.gain.exponentialRampToValueAtTime(.32*n,e+.012),r.gain.exponentialRampToValueAtTime(1e-4,e+.22);const s=a.createOscillator(),l=a.createGain();s.type="sine",s.frequency.setValueAtTime(180,e),s.frequency.exponentialRampToValueAtTime(50,e+.18),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(.28*n,e+.012),l.gain.exponentialRampToValueAtTime(1e-4,e+.2),o.connect(i),i.connect(r),r.connect(this.sfx),s.connect(l),l.connect(this.sfx),o.start(e),s.start(e),o.stop(e+.24),s.stop(e+.22),o.onended=()=>{o.disconnect(),i.disconnect(),r.disconnect(),s.disconnect(),l.disconnect()}}noiseBuffer(){if(this.noise)return this.noise;const e=this.ctx,n=Math.floor(e.sampleRate*.5),a=e.createBuffer(1,n,e.sampleRate),o=a.getChannelData(0);for(let i=0;i<n;i+=1)o[i]=Math.random()*2-1;return this.noise=a,a}}function Nt(t){let e=0;for(let n=0;n<t;n+=1)e+=je[n][1];return e}const b=new jt;function y(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function d(t,e=!1){return(Number.isFinite(t)?t:0).toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:e?2:0,minimumFractionDigits:e?2:0})}function _(t){const e=Number.isFinite(t)?t:0,n=Math.abs(e-Math.round(e))<.001;return d(e,!n)}function me(t,e=1){return`${(t*100).toFixed(e)}%`}function lt(t,e){return Math.round(t/e)*e}function V(t,e,n){return Math.min(n,Math.max(e,t))}function Ae(t){const e=t.replace("#",""),n=parseInt(e.length===3?e.split("").map(a=>a+a).join(""):e,16);return[n>>16&255,n>>8&255,n&255]}function qt(t,e,n){const a=o=>Math.max(0,Math.min(255,Math.round(o))).toString(16).padStart(2,"0");return`#${a(t)}${a(e)}${a(n)}`}function Oe(t,e,n){const a=Ae(t),o=Ae(e);return qt(a[0]+(o[0]-a[0])*n,a[1]+(o[1]-a[1])*n,a[2]+(o[2]-a[2])*n)}function Wt(t){const[e,n,a]=Ae(t).map(o=>{const i=o/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}const k={checking:8e3,savings:15e3,salary:7e4,weeklyTakeHome:1010},ct=[{id:"housing",label:"Housing",amount:1450},{id:"food",label:"Food",amount:380},{id:"phone",label:"Phone",amount:85},{id:"utilities",label:"Utilities",amount:160},{id:"misc",label:"Misc",amount:120}],Ce=ct.reduce((t,e)=>t+e.amount,0),P=Ce*2,Ye={doc:599,title:385,taxRate:.06625},C={baseline:4500,open:3600,min:3200,max:5600},xe={name:"Cumberland Shadow",year:1998,trade:4500,line:"The paint is a suggestion. The heater is a rumor. It runs."},Ie=[{id:"stallion",name:"Stallion GT",maker:"Vittorio",vibe:"Sports coupe",line:"A low red problem. Fast, loud, and allergic to budgets.",msrp:72e3,markup:.05,room:.04,insurance:310,running:340,hot:!0,colors:[{id:"rosso",name:"Rosso Notte",hex:"#8f1d2c",price:0},{id:"nero",name:"Nero Assoluto",hex:"#141414",price:0},{id:"bianco",name:"Bianco Perla",hex:"#f3f0e8",price:595,pearl:!0},{id:"argento",name:"Argento",hex:"#c5c8ce",price:0},{id:"verde",name:"Verde Bosco",hex:"#1c3d2e",price:0},{id:"blu",name:"Blu Notte",hex:"#152743",price:0},{id:"giallo",name:"Giallo Modena",hex:"#e2b31f",price:0},{id:"arancio",name:"Arancio",hex:"#e06a1f",price:395},{id:"matte",name:"Matte Grafite",hex:"#3c3f44",price:2400,matte:!0},{id:"flake",name:"Nonna Gold Flake",hex:"#e0b03a",price:7500,joke:!0,pearl:!0}]},{id:"harbor",name:"Harbor Hybrid",maker:"Northline",vibe:"Daily hybrid",line:"Gets you there and home without introducing itself to the whole block.",msrp:29e3,markup:.02,room:.1,insurance:128,running:115,colors:[{id:"glacier",name:"Glacier White",hex:"#f4f7f8",price:0},{id:"silver",name:"Silver Mist",hex:"#cfd3d6",price:0},{id:"harbor",name:"Harbor Blue",hex:"#3e6f8c",price:0},{id:"graphite",name:"Graphite",hex:"#3a3d40",price:0},{id:"signal",name:"Signal Red",hex:"#b4232c",price:0},{id:"sage",name:"Sage",hex:"#6d7f62",price:0},{id:"midnight",name:"Midnight",hex:"#16181c",price:0},{id:"sand",name:"Sand",hex:"#cbb99a",price:0},{id:"teal",name:"Deep Teal",hex:"#1f4f4a",price:395},{id:"fog",name:"Pearl Fog",hex:"#e7e4dc",price:595,pearl:!0}]},{id:"ironhorn",name:"Ironhorn 1500",maker:"Cinder",vibe:"Full-size truck",line:"A truck with opinions. The wheels can cost as much as a vacation.",msrp:52e3,markup:.035,room:.07,insurance:195,running:275,colors:[{id:"summit",name:"Summit White",hex:"#f2f3f4",price:0},{id:"black",name:"Black",hex:"#1a1a1a",price:0},{id:"silver",name:"Billet Silver",hex:"#b7bcc2",price:0},{id:"redrock",name:"Red Rock",hex:"#8e2a24",price:0},{id:"patriot",name:"Work Blue",hex:"#243e66",price:0},{id:"olive",name:"Olive Duty",hex:"#4d5538",price:0},{id:"bronze",name:"Bronze",hex:"#7a5a3a",price:450},{id:"concrete",name:"Concrete",hex:"#8d9094",price:0},{id:"orange",name:"Safety Orange",hex:"#e4571b",price:650},{id:"tactical",name:"Matte Tactical",hex:"#2e3230",price:2200,matte:!0}]},{id:"breeze",name:"Breeze Convertible",maker:"Marlow",vibe:"Drop-top",line:"Sun on your arms, math in the glovebox. The top is free. The payment is not.",msrp:38e3,markup:.025,room:.09,insurance:172,running:175,colors:[{id:"cloud",name:"Cloud White",hex:"#f7f4ef",price:0},{id:"black",name:"Black",hex:"#1c1c1c",price:0},{id:"aqua",name:"Aqua",hex:"#3aa8b5",price:0},{id:"coral",name:"Coral",hex:"#e07a62",price:0},{id:"lemon",name:"Lemon",hex:"#e6c84a",price:0},{id:"navy",name:"Navy",hex:"#1c2a4a",price:0},{id:"silver",name:"Silver",hex:"#d5d8dc",price:0},{id:"burgundy",name:"Burgundy",hex:"#6e2434",price:0},{id:"mint",name:"Mint",hex:"#b7d9c6",price:350},{id:"skypearl",name:"Sky Pearl",hex:"#d5e4f2",price:595,pearl:!0}]}],E="all";function u(t){return{cars:E,tag:"fluff",tip:"",...t}}const dt=[{id:"sound",category:"sound",label:"Sound",mode:"single",cars:E,options:[u({id:"base",name:"Lot radio",price:0,tag:"included",blurb:"Four speakers and the road. Already in the car.",tip:"Leave it. You can hear the engine. That was the idea."}),u({id:"premium",name:"Premium 8-speaker",price:890,tag:"smart",blurb:"A real amp and clearer highs. You will actually notice this one.",tip:"Eight hundred and ninety. If you listen to music every day, this is the one I allow."}),u({id:"bass",name:"Booming bass package",price:1450,tag:"fluff",blurb:"A sealed sub behind the seat. The block will know your chorus.",tip:"Bass is fun for a week. Then it is a rattle you financed."}),u({id:"thumper",name:'Trunk-thumper 12"',price:2200,tag:"fluff",blurb:"One big sub, zero trunk. Groceries ride in the back seat.",tip:"Twenty-two hundred so the trunk can thump. Where do the groceries go, genius?"}),u({id:"hall",name:"Concert hall",price:3800,tag:"fluff",blurb:"Fourteen speakers and a tuning session. Priced like a used motorcycle.",tip:"Concert hall money on a daily driver. The orchestra is not coming. You are going to work."}),u({id:"scala",name:"La Scala in the trunk",price:9500,tag:"joke",blurb:"Opera horns, a velvet grille, and a tenor who does not exist.",tip:"Nine and a half grand so the trunk can sing. Your neighbors will call the cops and the bank."})]},{id:"mats",category:"interior",label:"Floor mats",mode:"single",cars:E,options:[u({id:"paper",name:"Dealer paper mats",price:0,tag:"included",blurb:"Thin, slippery, and in the trash by November.",tip:"Paper mats are a suggestion. Spend the two hundred."}),u({id:"weather",name:"All-weather mats",price:220,tag:"smart",blurb:"Rubber trays that catch the slush, the coffee, the whole winter.",tip:"Two hundred bucks. You will use them every time it rains. This is the good kind of spending."}),u({id:"carpet",name:"Carpet logo mats",price:185,tag:"fluff",blurb:"Plush, embroidered, and afraid of a puddle.",tip:"Carpet mats look nice in the brochure. One rainstorm and they look like a crime scene."}),u({id:"luxury",name:"Luxury leather mats",price:640,tag:"fluff",blurb:"Stitched hides for the floor. The floor does not appreciate art.",tip:"Six hundred dollars of leather where your boots go. I love you, but no."})]},{id:"leather",category:"interior",label:"Seats",mode:"single",cars:E,options:[u({id:"std",name:"Standard seats",price:0,tag:"included",blurb:"What the car comes with. Cloth on the daily drivers, leather on the Stallion.",tip:"Standard seats hold you up. That is the job."}),u({id:"leather",name:"Leather seating",price:1900,tag:"fluff",cars:["harbor","breeze","ironhorn"],blurb:"Hides instead of cloth. Smells like a new wallet for a month.",tip:"Nineteen hundred to change the upholstery. Nice. Not necessary. Do not pretend it is necessary."}),u({id:"quilt",name:"Diamond-stitch leather",price:2400,tag:"fluff",cars:["stallion"],blurb:"The GT is already leather. This is the quilted, show-off version.",tip:"The car already has leather. You are paying for diamonds in the stitch. Ricky loves this one."}),u({id:"quilt2",name:"Quilted leather upgrade",price:2800,tag:"fluff",cars:["harbor","breeze"],blurb:"Diamond stitching on a car that also hauls groceries.",tip:"Quilted leather on a commuter. You are dressing the car for a party it does not attend."})]},{id:"comfort",category:"interior",label:"Cabin",mode:"multi",cars:E,options:[u({id:"heat",name:"Seat heaters",price:480,tag:"smart",blurb:"Warm seats on a cold morning. They earn their keep in January.",tip:"Seat heaters in this climate are not a toy. Four eighty. I will allow it."}),u({id:"vent",name:"Ventilated seats",price:1150,tag:"fluff",blurb:"A little air through the leather when the summer sits on you.",tip:"Ventilated seats are lovely. They are also a thousand dollars of fan."}),u({id:"wheel",name:"Heated steering wheel",price:275,tag:"smart",blurb:"Your hands stop suffering at red lights.",tip:"Two seventy-five so your hands work in February. Small money, real life. Fine."}),u({id:"ambient",name:"Ambient lighting",price:395,tag:"fluff",blurb:"A glow in the footwells. Sixty-four colors. None of them pay the note.",tip:"Mood lighting. The bank does not have a mood. It has a due date."}),u({id:"memory",name:"Memory seats",price:820,tag:"fluff",blurb:"The seat remembers you. Useful if two people share the car.",tip:"Memory seats matter if somebody else drives. If it is just you, the seat already remembers."})]},{id:"roof",category:"roof",label:"Roof",mode:"single",cars:["stallion","harbor","ironhorn"],options:[u({id:"none",name:"Solid roof",price:0,tag:"included",blurb:"Metal, quiet, and it does not leak. A roof’s original job.",tip:"A solid roof is not a compromise. It is a roof."}),u({id:"moon",name:"Power moonroof",price:1250,tag:"fluff",blurb:"A slice of sky over the front seats. Nice in October.",tip:"A moonroof is a nice thing you use in October. It is not an investment. It is a sunroof."}),u({id:"pano",name:"Panoramic sunroof",price:1950,tag:"fluff",blurb:"Glass over almost the whole cabin. Brighter, hotter, more expensive.",tip:"Panoramic glass is gorgeous until July, when you are financing a greenhouse."}),u({id:"carbon",name:"Carbon roof panel",price:4200,tag:"joke",cars:["stallion"],blurb:"A lighter roof, mostly so you can tell people the roof is lighter.",tip:"Four grand so the roof can be a conversation. The car is already light enough to get you in trouble."})]},{id:"top",category:"roof",label:"Soft top",mode:"single",cars:["breeze"],options:[u({id:"black",name:"Black canvas top",price:0,tag:"included",blurb:"The classic lid. Goes up, goes down, costs nothing extra.",tip:"Black top, no charge. The joy is included. Remember that."}),u({id:"tan",name:"Tan canvas top",price:420,tag:"fluff",blurb:"A lighter lid. Looks like a weekend even on a Tuesday.",tip:"Tan top is a look. Four twenty. If it makes you happy every time you walk up, fine. Once."}),u({id:"burgundy",name:"Burgundy canvas top",price:480,tag:"fluff",blurb:"Wine-colored canvas. Dramatic in a good parking lot.",tip:"Burgundy lid. Pretty. Do not let a pretty lid talk you into a ugly loan."}),u({id:"navy",name:"Navy canvas top",price:450,tag:"fluff",blurb:"Deep blue canvas. Quiet, and it hides the dust a little.",tip:"Navy top. Respectable. Still just a color."})]},{id:"wheels",category:"wheels",label:"Wheels & tires",mode:"single",cars:E,options:[u({id:"stock",name:"Stock wheels",price:0,tag:"included",blurb:"The ones the car was designed around. They work.",tip:"Stock wheels are not sad. They are engineered. Leave them if you are watching the payment."}),u({id:"sport",name:'19" sport alloys',price:1650,tag:"fluff",cars:["stallion","harbor","breeze"],blurb:"Lighter look, thinner tire, a little more road in the cabin.",tip:"Sport alloys look sharp and ride firmer. Sixteen fifty. Know why you want them."}),u({id:"chrome",name:"Chrome 22s",price:2450,tag:"fluff",cars:["stallion","breeze","harbor"],blurb:"Mirror-bright and impossible to keep clean.",tip:"Chrome is a part-time job. You will wash them more than you drive them."}),u({id:"forged",name:"Forged black 20s",price:3350,tag:"fluff",cars:["stallion","breeze"],blurb:"Dark, expensive, and lighter than they look.",tip:"Forged wheels are real hardware. They are also three grand of jewelry."}),u({id:"runflat",name:"Run-flat all-seasons",price:1150,tag:"smart",cars:["stallion","harbor","breeze"],blurb:"Keep rolling after a puncture. No spare to sit on.",tip:"Run-flats are the rare wheel upgrade that solves a problem. I can live with it."}),u({id:"aero",name:"Aero efficiency wheels",price:380,tag:"smart",cars:["harbor"],blurb:"Smoother covers, a little less drag, a calmer look.",tip:"Three eighty for wheels that help the hybrid be a hybrid. That is a coherent sentence."}),u({id:"carbonw",name:"Carbon-barrel track wheels",price:5600,tag:"joke",cars:["stallion"],blurb:"Race-day hardware for a road that has a speed limit.",tip:"Fifty-six hundred in carbon barrels. The track is not on your commute."}),u({id:"wire",name:"Wire-look chromes",price:2100,tag:"fluff",cars:["breeze"],blurb:"Old-glamour spokes. They sparkle when the top is down.",tip:"Wire wheels are a mood. They are also a car wash’s villain origin story."}),u({id:"chrome20",name:'20" factory chrome',price:1800,tag:"fluff",cars:["ironhorn"],blurb:"Bright truck wheels. They shine until the first job site.",tip:"Chrome on a truck is a choice. Mud is also a choice. They will meet."}),u({id:"offroad",name:'35" all-terrains',price:4750,tag:"fluff",cars:["ironhorn"],blurb:"Tall, loud, and thirsty. They change the whole truck.",tip:"Those tires do not just cost forty-seven fifty. They cost you gas, bearings, and a car wash that cries."}),u({id:"mud",name:'37" Swamp Royalty',price:8900,tag:"joke",cars:["ironhorn"],blurb:"Bog-sized mud tires with a name that should have been a warning.",tip:"Swamp Royalty. Eighty-nine hundred. You are financing a parade float that hates parking garages."})]},{id:"stance",category:"packs",label:"Stance",mode:"single",cars:["ironhorn"],options:[u({id:"stock",name:"Stock height",price:0,tag:"included",blurb:"The truck sits where the engineers put it.",tip:"Stock height gets into parking garages. I am a fan of parking garages."}),u({id:"level",name:'2" leveling kit',price:1480,tag:"fluff",blurb:"Lifts the nose so the truck looks level, not eager.",tip:"A leveling kit is the modest version of this mistake. Still fourteen eighty."}),u({id:"lift",name:'6" lift kit',price:6650,tag:"joke",blurb:"The truck stands up and announces itself to aircraft.",tip:"Six inches and sixty-six fifty. You will need a step stool and a new budget."})]},{id:"liner",category:"packs",label:"Bed liner",mode:"single",cars:["ironhorn"],options:[u({id:"none",name:"Bare bed",price:0,tag:"included",blurb:"Painted steel. The first fridge you haul will sign it.",tip:"A bare bed is how a new truck starts looking old. Liner is the grown-up move."}),u({id:"spray",name:"Spray-in bed liner",price:695,tag:"smart",blurb:"A thick coat locked to the metal. The right answer for a working bed.",tip:"Spray-in liner, six ninety-five. Protects the thing you bought. This is how you spend."}),u({id:"dropin",name:"Drop-in bed liner",price:349,tag:"smart",blurb:"A plastic shell you can pull out. Cheaper, a little rattly.",tip:"Drop-in is the budget liner. It works. It also drums when it is empty."})]},{id:"cover",category:"packs",label:"Tonneau cover",mode:"single",cars:["ironhorn"],options:[u({id:"none",name:"Open bed",price:0,tag:"included",blurb:"Nothing over the bed. Easy to load, easy to soak.",tip:"Open bed is honest. Just do not leave tools in the rain and then act surprised."}),u({id:"soft",name:"Soft roll-up tonneau",price:545,tag:"smart",blurb:"Vinyl cover, rolls up when you need the whole bed.",tip:"Soft cover keeps the rakes dry. Five forty-five. Reasonable."}),u({id:"hard",name:"Hard folding tonneau",price:1375,tag:"fluff",blurb:"A rigid lid that locks. Looks finished. Costs more than the liner.",tip:"Hard cover is nice if you actually lock gear back there. Otherwise it is a very expensive hat."})]},{id:"truckt",category:"packs",label:"Truck kit",mode:"multi",cars:["ironhorn"],options:[u({id:"lights",name:"Bed LED rails",price:295,tag:"smart",blurb:"Light in the bed so you are not loading by phone flashlight.",tip:"Bed lights are cheap and you will use them. I like cheap and useful."}),u({id:"winch",name:"12,000 lb winch",price:1920,tag:"fluff",blurb:"A hook and a motor on the nose. Heroic, until you never need it.",tip:"A winch is for people who get stuck on purpose. Do you?"}),u({id:"exhaust",name:"Dual exhaust",price:1560,tag:"fluff",blurb:"Two tips, more noise, the same truck underneath.",tip:"Dual exhaust so a truck can be louder. The neighbors already know it is a truck."}),u({id:"box",name:"Bed toolbox",price:780,tag:"smart",blurb:"A locking chest at the cab. Tools stay put.",tip:"A toolbox is for a person who works. If that is you, buy it. If it is a costume, skip it."}),u({id:"flaps",name:"Heavy mud flaps",price:210,tag:"smart",blurb:"They keep the rocks off the car behind you. Manners, basically.",tip:"Mud flaps are manners. Two ten. Your mother would approve, and she is not even on the loan."}),u({id:"lightbar",name:"Parade light bar",price:2240,tag:"joke",blurb:"A roof full of lamps. Visible from the next county, and from space.",tip:"A light bar for the suburbs. Twenty-two forty so you can see a deer that is not there."})]},{id:"sport",category:"packs",label:"Stallion pack",mode:"multi",cars:["stallion"],options:[u({id:"launch",name:"Launch control",price:2200,tag:"fluff",blurb:"A computer that helps you leave a light like a poster.",tip:"Launch control is a story you tell once. The price you pay every month."}),u({id:"spoiler",name:"Carbon spoiler",price:3400,tag:"fluff",blurb:"A wing on the tail. It looks fast even when you are not.",tip:"Carbon spoiler. Three thousand four hundred dollars of wind costume."}),u({id:"track",name:"Track tire set",price:2800,tag:"fluff",blurb:"Sticky rubber that hates cold mornings and long highway slogs.",tip:"Track tires on a street car wear out like gossip. Fast, and then they are gone."}),u({id:"exhaust",name:"Roaring exhaust",price:2650,tag:"fluff",blurb:"Opens the pipes. The Stallion already had a voice. This is a shout.",tip:"A roaring exhaust is how you introduce yourself to people who did not ask."}),u({id:"brakes",name:"Carbon-ceramic brakes",price:8900,tag:"joke",blurb:"Race brakes. Astonishing, and allergic to short cold trips.",tip:"Eighty-nine hundred in brakes. Unless you are late to a racetrack, this is jewelry that gets hot."}),u({id:"stripes",name:"Racing stripes",price:750,tag:"fluff",blurb:"A painted stripe down the spine. Loud in the quietest way.",tip:"Stripes are seven fifty. Cheap trouble. I will not lose sleep. Do not add three more kinds of trouble."}),u({id:"turbo",name:"Nonna's Prayer turbo",price:14500,tag:"joke",blurb:"A fantastical booster named like a blessing. It is not a blessing. It is $14,500.",tip:"Nonna’s Prayer. Fourteen thousand five hundred. Your grandmother would tell you to put it back."})]},{id:"hybrid",category:"packs",label:"Harbor pack",mode:"multi",cars:["harbor"],options:[u({id:"cargo",name:"Cargo organizer",price:240,tag:"smart",blurb:"Dividers in the hatch so the groceries stop auditioning for a chase scene.",tip:"Cargo organizer. Two forty. Your oranges stay put. This is a yes."}),u({id:"rack",name:"Roof rack",price:680,tag:"smart",blurb:"Crossbars for a bike, a box, a life that does not fit in the hatch.",tip:"A rack is worth it the first time you would have otherwise rented a truck. Six eighty."}),u({id:"ppf",name:"Paint protection film",price:1950,tag:"smart",blurb:"A clear skin on the nose and the hood. Rocks are free. Paint is not.",tip:"Paint protection on a daily driver is one of the few add-ons I do not heckle. Rocks are free. Paint is not."}),u({id:"eff",name:"Efficiency display pack",price:420,tag:"smart",blurb:"A clearer picture of what the hybrid is actually doing.",tip:"You bought a hybrid to watch the numbers. Four twenty to see them better. Coherent."}),u({id:"filter",name:"Deluxe cabin filter",price:180,tag:"smart",blurb:"Better air on the parkway. Small, boring, useful.",tip:"A cabin filter is the most adult thing on this menu. Buy it and do not tell anyone. It is not glamorous enough."})]},{id:"breezepack",category:"packs",label:"Breeze pack",mode:"multi",cars:["breeze"],options:[u({id:"deflector",name:"Wind deflector",price:320,tag:"smart",blurb:"A little screen so the top-down air does not slap you at 50.",tip:"Wind deflector makes the top-down actually usable. Three twenty. Buy the joy, then make it comfortable."}),u({id:"latch",name:"Premium top package",price:890,tag:"fluff",blurb:"Softer latches, a tighter fit, one less thing to fight at a red light.",tip:"The top already goes down. Eight ninety for a fancier way is optional. The down part is free."}),u({id:"underglow",name:"Underglow",price:680,tag:"fluff",blurb:"A cool light under the rockers. The pavement gets a costume.",tip:"Underglow. The road does not need a nightlight. You do not need this payment."}),u({id:"glow",name:"San Gennaro glow",price:4400,tag:"joke",blurb:"Festival lights, sparkler tips, and a glow that can be seen from the rectory.",tip:"The Feast of San Gennaro, but it is your car, and it is four thousand four hundred dollars. I am lighting a candle for your budget."})]},{id:"tint",category:"extras",label:"Window tint",mode:"single",cars:E,options:[u({id:"none",name:"No tint",price:0,tag:"included",blurb:"Clear glass. Honest, bright, a little hot.",tip:"Clear glass is free. In August you may wish it was not."}),u({id:"regular",name:"Window tint",price:450,tag:"smart",blurb:"A normal shade. Cooler cabin, less of your life on display.",tip:"Tint for four fifty is comfort and a little privacy. I do not fight this."}),u({id:"ceramic",name:"Ceramic tint",price:890,tag:"smart",blurb:"Rejects more heat, less mirror-look, costs more than regular dye.",tip:"Ceramic tint actually knocks the heat back. Eight ninety. If you park in the sun, it is a tool."})]},{id:"extras",category:"extras",label:"Everyday kit",mode:"multi",cars:E,options:[u({id:"mud",name:"Mud guards",price:160,tag:"smart",blurb:"Small shields behind the wheels. They save the rockers.",tip:"Mud guards. One sixty. Boring and correct."}),u({id:"net",name:"Cargo net",price:75,tag:"smart",blurb:"A net so the trunk stops rearranging itself.",tip:"Seventy-five dollars. If this is the wildest thing you add, I am proud of you."}),u({id:"keyless",name:"Keyless entry upgrade",price:350,tag:"fluff",blurb:"Walk up, get in. The key can stay in your pocket.",tip:"Keyless is convenience. Three fifty. Fine if the rest of the build is calm."}),u({id:"remote",name:"Remote start",price:495,tag:"smart",blurb:"Start it from the kitchen. The cabin is human by the time you sit down.",tip:"Jersey in January. Remote start earns its keep. I will not fight you."}),u({id:"dash",name:"Dash cam",price:320,tag:"smart",blurb:"A witness on the windshield. Cheap insurance for arguments.",tip:"Dash cam. Three twenty. The one gadget that can save you money. Buy it."}),u({id:"seal",name:"Paint sealant",price:799,tag:"fluff",blurb:"A shiny coat and a speech about beads of water.",tip:"Sealant is a car-wash sermon. Seven ninety-nine. Wash the car yourself and buy a better lunch."}),u({id:"edge",name:"Door edge guards",price:140,tag:"smart",blurb:"Little strips so parking-lot doors do not chip the paint.",tip:"Edge guards are a small kindness to the paint. One forty. Yes."}),u({id:"trunk",name:"Trunk liner",price:180,tag:"smart",cars:["stallion","harbor","breeze"],blurb:"A tray for the wet, the sandy, the leaking.",tip:"Trunk liner. One eighty. Your future self, holding a spilled plant, thanks you."})]},{id:"warranty",category:"warranty",label:"Warranty",mode:"single",cars:E,options:[u({id:"none",name:"Factory coverage only",price:0,tag:"value",blurb:"The maker’s promise, already on a new car. A big reason you buy new.",tip:"You are buying new. The factory already covers the bumper and the powertrain. That is the point. Do not pay for the same promise twice."}),u({id:"tech",name:"Electronics, 4 years",price:650,tag:"smart",blurb:"Screens, cameras, infotainment. The stuff that fails and costs real money to fix.",tip:"Electronics. Screens, cameras, the big display. That stuff dies and the bill is ugly. A few hundred, I understand. The engine and the bumper, the factory already has."}),u({id:"basic",name:"Powertrain, 5 years",price:2e3,tag:"fluff",blurb:"Engine and transmission past the factory window. On a new car you already bought that window.",tip:"Two thousand for a powertrain warranty on a car that just came with one. Buying new was that coverage. I would not pay for it twice."}),u({id:"bumper",name:"Bumper-to-bumper, 6 years",price:3500,tag:"fluff",blurb:"A full wrap for six years. On a new car it mostly repeats the factory promise.",tip:"Bumper-to-bumper, thirty-five hundred, on a new car. You already bought that when you bought new. If you add one thing, make it the electronics. Not this."}),u({id:"platinum",name:"Platinum concierge, 8 years",price:5e3,tag:"joke",blurb:"The long hug. Loaner cars, a binder, and a lot of adjectives.",tip:"Five thousand for the platinum hug. The car is new. Factory coverage is the hug you already paid for. This binder buys Ricky a boat."})]}],Zt=[{id:"sound",label:"Sound"},{id:"interior",label:"Interior"},{id:"roof",label:"Roof"},{id:"wheels",label:"Wheels"},{id:"packs",label:"Packs"},{id:"extras",label:"Extras"},{id:"warranty",label:"Warranty"}],Ut={black:"#1a1c1f",tan:"#c2a57a",burgundy:"#6e2434",navy:"#1c2a4a"};function Kt(t){return Ie.find(e=>e.id===t)||null}function nt(t,e){return t===E||Array.isArray(t)&&t.includes(e)}function ee(t,e){return dt.filter(n=>nt(n.cars,t)&&(!e||n.category===e)).map(n=>({...n,options:n.options.filter(a=>nt(a.cars,t))})).filter(n=>n.options.length>0)}function Qt(t){const e={},n={};for(const a of ee(t.id))a.mode==="single"?e[a.id]=a.options[0].id:n[a.id]=[];return{paint:t.colors[0].id,topDown:!1,single:e,multi:n}}function ae(t,e){return t.colors.find(n=>n.id===e.paint)||t.colors[0]}function Jt(t,e){const n=[],a=ae(t,e);a.price&&n.push({id:a.id,name:a.name,price:a.price,tag:a.joke?"joke":"fluff",group:"paint",tip:a.joke?"Gold flake. Seventy-five hundred so the car can glitter like a bakery tray. I am begging you.":`${a.name} is a special paint. Pretty. It does not make the car worth more when you sell it.`});for(const o of ee(t.id))if(o.mode==="single"){const i=o.options.find(r=>r.id===e.single[o.id]);i&&n.push({...i,group:o.id})}else for(const i of e.multi[o.id]||[]){const r=o.options.find(s=>s.id===i);r&&n.push({...r,group:o.id})}return n}function Be(t){var n;const e=dt.find(a=>a.id==="warranty");return((n=e==null?void 0:e.options.find(a=>a.id===t))==null?void 0:n.price)||0}function be(t,e){const n=Jt(t,e),a=n.find(r=>r.group==="warranty"),o=(a==null?void 0:a.price)||0,i=n.filter(r=>r.group!=="warranty").reduce((r,s)=>r+s.price,0);return{msrp:t.msrp,options:i,warranty:o,warrantyId:(a==null?void 0:a.id)||"none",total:t.msrp+i+o,lines:n}}function ht(t,e){let n=t.insurance;const a=e.multi.sport||[],o=e.multi.truckt||[],i=e.multi.breezepack||[];return a.includes("turbo")&&(n+=65),a.includes("brakes")&&(n+=22),e.single.wheels==="mud"&&(n+=48),e.single.wheels==="offroad"&&(n+=30),e.single.stance==="lift"&&(n+=24),o.includes("lightbar")&&(n+=12),i.includes("glow")&&(n+=18),n}const _t={credit:{title:"Credit score",body:"Your credit score is a three-digit rumor the bank believes about you. Higher means cheaper money. This is not a moral score. It is a price tag on a loan. We rolled it. Now we live with the number, or we ask your mother."},cosigner:{title:"Co-signer",body:"A co-signer tells the bank they will pay if you do not. Your mother, in this case. It can knock the rate down. It also puts Ma on the hook for the whole note. You only ask her if the rate is ugly, and you never miss a payment. That is family."},apr:{title:"APR",body:"APR is the yearly price of borrowing, written like a percent. A six instead of an eight does not look like much on a sticker. On a long loan it is thousands. You are not just buying the car. You are renting the money."},principal:{title:"Principal",body:"Principal is the chunk you still owe, before the bank’s cut. Every payment takes a bite of principal and a bite of interest. Early on, the bank eats first. That is the game. Borrow less and the bites get smaller."},interest:{title:"Interest",body:"Interest is the bank’s fee for fronting you the money. It is not a one-time tip. It gets calculated on what is left, every month. That is why the rate and the term matter as much as the sticker."},term:{title:"Term",body:"Term is how many months you are married to this payment. Sixty is five years. Eighty-four is seven. The longer one looks cheaper every month and pays the bank a longer tip. Do not stretch a note so the car dies before it does."},amortization:{title:"Amortization",body:"Amortizing means the payment stays the same while the mix changes. The first years you are mostly paying interest. Later you finally hit principal. Longer terms keep you in the interest years. That is why they feel affordable."},payment:{title:"Payment",body:"The payment is principal and interest chopped into months. A pretty payment can hide an ugly loan: long term, fat rate, extra junk. We look at the payment and at what it costs you to have it. Both. Always both."},down:{title:"Down payment",body:"A down payment is cash you put in up front so you borrow less. Less principal, less interest, and you are not upside down the second the tires hit the street. With about fifteen thousand in savings, a chunk of that pile is often for exactly this. Leave roughly two months of bills as backup, and it is fine to use some of the rest. Better real money down than zero down and a loan that is already underwater. Do not empty checking to impress a man at a desk. Rent is still due."},trade:{title:"Trade equity",body:"Trade equity is what your old car is worth minus whatever you still owe on it. Your jalopy is paid off, so every dollar we squeeze out of Ricky comes straight off the new loan. That is found money. Treat it like it."},negative:{title:"Negative equity",body:"Negative equity is when you owe more on a car than it is worth. Upside down. Roll that into a new loan and you are paying for a ghost. Your beater is clear, so we are not starting in a hole. Do not dig one with a long term."},otd:{title:"Out the door",body:"Out the door is the real number: price, plus tax, title, doc fees, and warranty, minus the trade. Salesmen love talking monthly so you forget it. I do not. Ask for the out-the-door out loud, then decide."},warranty:{title:"Warranty",body:"A warranty is a paid promise to fix certain things for a while. You are buying new, so factory bumper-to-bumper and powertrain coverage is already a big reason the car costs what it costs. Paying again for that full wrap is often money you do not need. Electronics are the exception. Screens, cameras, the infotainment. That stuff fails, and it is expensive. A small policy for the tech can be the smart one. Read what is actually covered. The brochure is not the contract."},tco:{title:"Total cost of ownership",body:"Total cost of ownership is what the car costs to live with, not the number on the windshield. It rolls up the payments, the interest hiding inside them, insurance, a straight guess at gas and maintenance, and the warranty you actually picked. The sticker is the invitation. Ownership is the whole night. One number, so it does not turn into homework."},msrp:{title:"MSRP",body:"MSRP is the manufacturer’s suggested price. A suggestion, like when your aunt says have more lasagna. On a hot car they pretend it is sacred. It is not. We negotiate off it, and we do not pay a markup for the privilege."},docfee:{title:"Doc fee",body:"The doc fee is the charge for paperwork they were going to do anyway. Some states cap it. Some lots pad it. I will not die on a few hundred if the price of the car is right. I will always see it on the sheet."},tax:{title:"Sales tax",body:"Tax is the state’s cut. On this lot we tax the selling price plus warranty, after the trade comes off, the way a lot of states do it. It is not negotiable. A lower selling price saves you twice: on the car, and on the tax."},takehome:{title:"Take-home pay",body:"Take-home is what actually lands after a plain tax estimate, not the salary in the job offer. Yours is about $1,010 a week on a $70,000 year. The car payment has to live inside that week, next to rent and food. The salary is a rumor. The week is the truth."},financed:{title:"Amount financed",body:"Amount financed is what the bank actually lends after the trade and your cash come off. This is the principal. Not the sticker, not the monthly. Every point of interest applies to this number. Make it smaller and the whole loan gets quieter."},insurance:{title:"Insurance estimate",body:"Insurance is what you pay so a bad afternoon does not own you. It is not in the car payment, which is how people fool themselves. I put an estimate in the week so the Stallion cannot pretend it costs the same to own as the Harbor."}},W=[{id:"side",label:"Side"},{id:"front",label:"Front"},{id:"rear",label:"Rear"}];function Ze(t,e){const n=ae(t,e),a=e.multi.breezepack||[],o=e.multi.sport||[],i=e.multi.truckt||[];let r=null;return a.includes("glow")?r="#ffb15a":a.includes("underglow")&&(r="#67e7ff"),{paint:n.hex,pearl:!!n.pearl,matte:!!n.matte,wheel:e.single.wheels||"stock",roof:e.single.roof||"none",tint:e.single.tint==="ceramic"?2:e.single.tint==="regular"?1:0,spoiler:o.includes("spoiler"),stripes:o.includes("stripes"),exhaust:o.includes("exhaust")||i.includes("exhaust"),lift:e.single.stance==="lift"?2:e.single.stance==="level"?1:0,liner:e.single.liner||"none",cover:e.single.cover||"none",underglow:r,topDown:!!e.topDown,topColor:Ut[e.single.top]||"#1a1c1f",deflector:a.includes("deflector"),lightbar:i.includes("lightbar"),winch:i.includes("winch"),brakes:o.includes("brakes"),dark:Wt(n.hex)<.4}}function Ue(t,e,n,a="car"){const o=e==="front"?sn(t,n,a):e==="rear"?ln(t,n,a):rn(t,n,a);return`<svg class="car${n.topDown?" is-down":""}" viewBox="0 0 840 480" role="img">
    <title>${en(t)} , ${e} view</title>
    <defs>${ut(a,n)}</defs>
    ${n.underglow?`<ellipse cx="420" cy="400" rx="250" ry="36" fill="url(#${a}-glow)"/>`:""}
    <ellipse cx="420" cy="424" rx="270" ry="18" fill="rgba(0,0,0,.38)"/>
    <ellipse cx="420" cy="426" rx="160" ry="7" fill="rgba(255,255,255,.06)"/>
    ${o}
  </svg>`}function Xt(){const t="jalopy";return`<svg class="car jalopy" viewBox="0 0 840 480" role="img">
    <title>1998 Cumberland Shadow</title>
    <defs>${ut(t,{paint:"#6d7278",pearl:!1,matte:!0,wheel:"steel",tint:0,underglow:null})}</defs>
    <ellipse cx="420" cy="424" rx="250" ry="16" fill="rgba(0,0,0,.38)"/>
    <g>
      ${we(t,tn(),[[268,360,50],[590,360,50]],"body")}
      <path d="M430 168 C470 128 540 124 600 140 L640 188 L560 196 C500 188 450 186 430 196 Z" fill="url(#${t}-glass)" stroke="rgba(180,190,198,.4)" stroke-width="2"/>
      ${I("M 470 150 L 530 168")}
      <path d="M250 250 L400 242 L408 330 L246 338 Z" fill="#8c8a80" opacity=".92"/>
      <path d="M400 246 L408 332" stroke="rgba(0,0,0,.45)" stroke-width="2"/>
      <path d="M250 256 L246 336" stroke="rgba(0,0,0,.35)" stroke-width="1.6"/>
      <path d="M300 268 C330 290 328 310 300 324" fill="none" stroke="#4a4e52" stroke-width="3"/>
      ${Z(346,300,t)}
      <g transform="translate(412 186)">
        <rect x="0" y="8" width="7" height="12" rx="2" fill="#2a2c30"/>
        <rect x="5" y="0" width="24" height="13" rx="2" fill="#1a1c20" stroke="rgba(255,255,255,.4)"/>
        <rect x="8" y="2" width="16" height="8" rx="1" fill="rgba(190,210,224,.55)"/>
      </g>
      <ellipse cx="220" cy="308" rx="16" ry="7" fill="#7a4a32" opacity=".55"/>
      <ellipse cx="640" cy="300" rx="20" ry="8" fill="#6b3e28" opacity=".45"/>
      <ellipse cx="560" cy="250" rx="9" ry="5" fill="#8a5a3c" opacity=".4"/>
      ${I("M 490 156 L 540 176")}
      ${Fe(148,268,36,28,t)}
      <path d="M150 300 h44 v16 h-40 z" fill="#14120e" stroke="rgba(255,255,255,.2)"/>
      <path d="M154 304 h28 v8 h-26 z" fill="#f2e2b8" opacity=".75"/>
      <path d="M160 304 L176 312 M168 304 L184 312" stroke="rgba(40,40,40,.55)" stroke-width="1"/>
      <rect x="168" y="284" width="22" height="10" rx="2" fill="#c4552a"/>
      <rect x="730" y="250" width="22" height="16" rx="2" fill="#3a1214" stroke="rgba(255,160,150,.25)"/>
      <rect x="734" y="254" width="14" height="8" fill="#8a3030"/>
      ${Y(268,360,46)}
      ${Y(590,360,46)}
      ${$(268,360,42,"steel",t,!1)}
      ${$(590,360,42,"stock",t,!1)}
      <g transform="translate(250,392) rotate(-18)">
        <ellipse cx="0" cy="0" rx="16" ry="7" fill="#cfc8bc" stroke="#888" stroke-width="1"/>
      </g>
      ${Q(455,318,"AS-IS",!0)}
    </g>
  </svg>`}function en(t){return{stallion:"Stallion GT",harbor:"Harbor Hybrid",ironhorn:"Ironhorn 1500",breeze:"Breeze Convertible"}[t]||"Car"}function ut(t,e){const n=e.matte?Oe(e.paint,"#ffffff",.1):Oe(e.paint,"#ffffff",e.pearl?.62:.4),a=Oe(e.paint,"#000000",e.matte?.22:.48),o=e.tint>1?.35:e.tint===1?.55:.82,i=e.wheel==="forged"||e.wheel==="carbonw",r=i?"#3a3a3a":"#f5f5f3",s=i?"#111":e.wheel==="chrome"||e.wheel==="chrome20"||e.wheel==="wire"?"#aeb4ba":"#7b8086",l=e.underglow||"#ffffff";return`
    <linearGradient id="${t}-paint" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="${n}"/>
      <stop offset="40%" stop-color="${e.paint}"/>
      <stop offset="100%" stop-color="${a}"/>
    </linearGradient>
    <linearGradient id="${t}-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e7f1f8" stop-opacity="${o}"/>
      <stop offset="48%" stop-color="#1a2836" stop-opacity="${.5+e.tint*.18}"/>
      <stop offset="100%" stop-color="#0d141c" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="${t}-rim" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${r}"/>
      <stop offset="50%" stop-color="${s}"/>
      <stop offset="100%" stop-color="${r}"/>
    </linearGradient>
    <linearGradient id="${t}-metal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbfbfa"/>
      <stop offset="48%" stop-color="#8e949b"/>
      <stop offset="100%" stop-color="#deded8"/>
    </linearGradient>
    <radialGradient id="${t}-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${l}" stop-opacity="0.75"/>
      <stop offset="70%" stop-color="${l}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${l}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${t}-tire" cx="42%" cy="38%" r="68%">
      <stop offset="0%" stop-color="#3a3e44"/>
      <stop offset="58%" stop-color="#17191c"/>
      <stop offset="100%" stop-color="#07080a"/>
    </radialGradient>
    <linearGradient id="${t}-lampglass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/>
      <stop offset="42%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <pattern id="${t}-mesh" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#12151a"/>
      <path d="M0 8 L8 0 M-2 2 L2 -2 M6 10 L10 6" stroke="#6a7380" stroke-width="0.7"/>
    </pattern>`}function we(t,e,n,a){const o=`${t}-${a}`,i=n.map(([r,s,l])=>`<circle cx="${r}" cy="${s}" r="${l}" fill="#000"/>`).join("");return`<mask id="${o}" maskUnits="userSpaceOnUse" x="0" y="0" width="840" height="480">
      <path d="${e}" fill="#fff"/>${i}
    </mask>
    <path d="${e}" fill="url(#${t}-paint)" mask="url(#${o})"/>`}function tn(){return`M 150 338
    C 146 292 176 250 250 232
    L 360 220
    C 410 210 440 162 510 146
    L 620 140
    C 690 140 730 168 748 206
    L 770 250
    C 786 286 784 330 752 348
    L 190 352
    C 160 352 148 346 150 338 Z`}function $(t,e,n,a,o,i){const s=n*(a==="offroad"||a==="mud"||a==="steel"?.5:a==="aero"?.74:.62),l=a==="runflat"?`<circle cx="${t}" cy="${e}" r="${n-3}" fill="none" stroke="#d6b15e" stroke-width="2.4"/>`:"",h=Math.max(4,n*.16);return`
    <g class="wheel">
      <circle cx="${t}" cy="${e}" r="${n}" fill="url(#${o}-tire)"/>
      <circle cx="${t}" cy="${e}" r="${n-1.2}" fill="none" stroke="#0a0a0c" stroke-width="2"/>
      ${nn(t,e,n)}
      <circle cx="${t}" cy="${e}" r="${n-h*.55}" fill="none" stroke="#4e545c" stroke-width="${h.toFixed(1)}"/>
      <circle cx="${t}" cy="${e}" r="${n-h}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.2"/>
      ${l}
      <circle cx="${t}" cy="${e}" r="${s+3.5}" fill="#0c0d10" stroke="rgba(255,255,255,.38)" stroke-width="2"/>
      <circle cx="${t}" cy="${e}" r="${s}" fill="url(#${o}-rim)"/>
      <circle cx="${t}" cy="${e}" r="${s*.9}" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>
      <circle cx="${t}" cy="${e}" r="${s*.72}" fill="#1c1e22"/>
      ${i?`<circle cx="${t}" cy="${e}" r="${s*.7}" fill="none" stroke="#d23b32" stroke-width="5"/>`:`<circle cx="${t}" cy="${e}" r="${s*.66}" fill="none" stroke="#3a3e44" stroke-width="3"/>`}
      ${an(t,e,s*.86,a)}
      <circle cx="${t}" cy="${e}" r="${Math.max(5,s*.2)}" fill="url(#${o}-metal)" stroke="#1a120c" stroke-width="1"/>
      <circle cx="${t}" cy="${e}" r="${Math.max(2,s*.07)}" fill="#1a1a1a"/>
      <ellipse cx="${t-n*.12}" cy="${e-n*.46}" rx="${n*.34}" ry="${n*.1}" fill="#fff" opacity=".22"/>
    </g>`}function nn(t,e,n){let a="";for(let i=0;i<16;i+=1){const r=Math.PI*2*i/16,s=t+Math.cos(r)*(n*.9),l=e+Math.sin(r)*(n*.9),h=r*180/Math.PI;a+=`<rect x="${(s-2.4).toFixed(1)}" y="${(l-n*.07).toFixed(1)}" width="4.8" height="${(n*.15).toFixed(1)}" rx="1" fill="#050506" transform="rotate(${h.toFixed(1)} ${s.toFixed(1)} ${l.toFixed(1)})"/>`}return a}function an(t,e,n,a){if(a==="aero")return`<circle cx="${t}" cy="${e}" r="${n*.86}" fill="#dfe3e6"/>
      <circle cx="${t}" cy="${e}" r="${n*.22}" fill="#222"/>
      <circle cx="${t-n*.28}" cy="${e}" r="${n*.08}" fill="#222"/>
      <circle cx="${t+n*.28}" cy="${e}" r="${n*.08}" fill="#222"/>`;if(a==="steel")return`<circle cx="${t}" cy="${e}" r="${n*.9}" fill="#5c6166"/>
      ${[0,60,120,180,240,300].map(p=>{const f=p*Math.PI/180,g=t+Math.cos(f)*n*.48,m=e+Math.sin(f)*n*.48;return`<circle cx="${g.toFixed(1)}" cy="${m.toFixed(1)}" r="${n*.16}" fill="#2a2c2e"/>`}).join("")}`;const o={stock:5,sport:12,chrome:8,forged:5,runflat:5,carbonw:8,wire:18,offroad:6,mud:6,chrome20:8}[a]||5,s=a==="forged"||a==="carbonw"?"#141414":a==="chrome"||a==="chrome20"||a==="wire"?"#f7f7f5":"#c5c8cc",l=a==="sport"||a==="wire"||a==="carbonw"?1.5:a==="forged"?5:3.4;let h="";for(let p=0;p<o;p+=1){const f=Math.PI*2*p/o-Math.PI/2,g=t+Math.cos(f)*n*.9,m=e+Math.sin(f)*n*.9;h+=`<line x1="${t}" y1="${e}" x2="${g.toFixed(1)}" y2="${m.toFixed(1)}" stroke="${s}" stroke-width="${l}" stroke-linecap="round"/>`}return a==="carbonw"&&(h+=`<circle cx="${t}" cy="${e}" r="${n*.92}" fill="none" stroke="#8f1d2c" stroke-width="2"/>`),h}function Q(t,e,n,a=!1){const o=a?78:92;return`<g transform="translate(${t} ${e})">
    <rect width="${o}" height="${a?32:40}" rx="3" fill="#123a78" stroke="#d7c27a" stroke-width="1.5"/>
    <text x="${o/2}" y="${a?21:26}" text-anchor="middle" fill="#f4efe2" font-family="Outfit, sans-serif" font-size="${a?13:16}" font-weight="700" letter-spacing="1">${n}</text>
  </g>`}function S(t,e,n,a,o,i=3){const r=on(o),s=r?"#2a090c":"#14120e",l=r?"#ffd2cc":"#fff6dd",h=1.6,p=Math.max(2,n-h*2),f=Math.max(2,a-h*2),g=Math.max(1.6,Math.min(n,a)*.22),m=t+n*(r?.7:.66),x=e+a*.52;return`<rect x="${t}" y="${e}" width="${n}" height="${a}" rx="${i}" fill="${s}" stroke="rgba(255,255,255,.32)" stroke-width="1.1"/>
    <rect x="${(t+h).toFixed(1)}" y="${(e+h).toFixed(1)}" width="${p.toFixed(1)}" height="${f.toFixed(1)}" rx="${Math.max(1,i-1)}" fill="${o}"/>
    <rect x="${(t+h).toFixed(1)}" y="${(e+h).toFixed(1)}" width="${(p*.46).toFixed(1)}" height="${f.toFixed(1)}" rx="${Math.max(1,i-1)}" fill="${l}" opacity=".38"/>
    <circle cx="${m.toFixed(1)}" cy="${x.toFixed(1)}" r="${g.toFixed(1)}" fill="${l}" opacity=".82"/>
    <circle cx="${(m-g*.2).toFixed(1)}" cy="${(x-g*.25).toFixed(1)}" r="${(g*.35).toFixed(1)}" fill="#fff" opacity=".8"/>`}function on(t){if(!t||t[0]!=="#")return!1;const[e,n,a]=Ae(t);return e>150&&e>n+30&&e>a+30}function I(t){return`<path d="${t}" fill="none" stroke="rgba(255,255,255,.62)" stroke-width="2.2" stroke-linecap="round"/>`}function R(t,e,n,a=1){return`<g transform="translate(${t} ${e}) scale(${a} 1)">
    <path d="M0 4 h16 c8 0 14 -2 18 -10 h-8 c-6 3 -12 6 -20 7 z" fill="#16181c" stroke="rgba(255,255,255,.38)" stroke-width="1"/>
    <path d="M2 3 h12 c4 0 8 -1 10 -5 h-6 z" fill="rgba(214,228,238,.6)"/>
  </g>`}function Z(t,e,n){return`<g transform="translate(${t} ${e})">
    <rect width="22" height="7" rx="2" fill="rgba(0,0,0,.5)"/>
    <rect x="1.2" y="1.3" width="15" height="3" rx="1.2" fill="url(#${n}-metal)"/>
  </g>`}function z(t,e,n){return`<g transform="translate(${t} ${e})">
    <circle r="11" fill="url(#${n}-metal)" stroke="#1a120c" stroke-width="1.2"/>
    <circle r="6.2" fill="none" stroke="#1a120c" stroke-width="1.15"/>
    <path d="M -3.2 3.2 L 0 -4 L 3.2 3.2" fill="none" stroke="#1a120c" stroke-width="1.3" stroke-linejoin="round"/>
  </g>`}function Fe(t,e,n,a,o){const i=Math.max(4,n-8),r=Math.max(4,a-8);return`<rect x="${t}" y="${e}" width="${n}" height="${a}" rx="4" fill="#0c0e12" stroke="url(#${o}-metal)" stroke-width="3"/>
    <rect x="${t+4}" y="${e+4}" width="${i}" height="${r}" fill="url(#${o}-mesh)"/>
    <path d="M ${t+8} ${e+a*.32} H ${t+n-8} M ${t+8} ${e+a*.54} H ${t+n-8} M ${t+8} ${e+a*.76} H ${t+n-8}" stroke="rgba(232,236,242,.32)" stroke-width="1.5"/>`}function rn(t,e,n){return t==="harbor"?dn(e,n):t==="ironhorn"?hn(e,n):t==="breeze"?un(e,n):cn(e,n)}function sn(t,e,n){return t==="harbor"?fn(e,n):t==="ironhorn"?mn(e,n):t==="breeze"?yn(e,n):pn(e,n)}function ln(t,e,n){return t==="harbor"?bn(e,n):t==="ironhorn"?wn(e,n):t==="breeze"?kn(e,n):gn(e,n)}function oe(t,e){if(!e.stripes)return"";const n=e.dark?"rgba(244,239,230,.88)":"rgba(18,18,18,.82)";return`<path d="${t}" fill="none" stroke="${n}" stroke-width="10" stroke-linecap="round"/>`}function Ke(t,e,n,a,o,i){if(i==="none")return"";const r=i==="pano"?n:n*.55,s=i==="carbon"?"#1a1c1f":`url(#${o}-glass)`;return`<rect x="${t}" y="${e}" width="${r}" height="${a}" rx="6" fill="${s}" stroke="rgba(255,255,255,.25)" stroke-width="1"/>`}function cn(t,e){return`
    ${we(e,`M 46 312
    C 40 268 78 228 150 208
    L 330 192
    C 392 186 418 148 478 128
    L 590 114
    C 680 104 748 128 792 168
    L 824 214
    C 840 252 836 308 798 332
    L 748 346
    L 150 352
    C 86 352 50 338 46 312 Z`,[[214,340,70],[648,342,72]],"body")}
    <path d="M 455 186 C 492 140 548 118 630 114 L 760 152 L 742 176 C 660 164 520 172 468 198 Z" fill="url(#${e}-glass)" stroke="rgba(186,206,220,.55)" stroke-width="2.4"/>
    ${I("M 500 154 C 560 136 640 132 730 150")}
    ${R(470,162)}
    <path d="M 150 214 C 250 198 340 194 420 202" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3"/>
    <path d="M 168 252 C 250 236 340 232 430 244" fill="none" stroke="rgba(0,0,0,.32)" stroke-width="8" stroke-linecap="round"/>
    <path d="M 168 248 C 250 232 340 228 430 240" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="3" stroke-linecap="round"/>
    <path d="M 500 198 L 496 338" stroke="rgba(0,0,0,.45)" stroke-width="2"/>
    <path d="M 636 164 L 630 332" stroke="rgba(0,0,0,.32)" stroke-width="1.7"/>
    ${Z(430,246,e)}
    ${Z(560,232,e)}
    ${z(188,270,e)}
    <path d="M 78 286 h46 l10 16 h-48 z" fill="#14120e" stroke="rgba(255,255,255,.35)"/>
    <path d="M 84 290 h32 l6 8 h-34 z" fill="#f4f1e2"/>
    <path d="M 84 290 h12 l2 8 h-13 z" fill="#fff" opacity=".55"/>
    <path d="M 86 274 h18 v7 h-14 z" fill="#2a140c" stroke="#f08a3a"/>
    <path d="M 88 276 h10 v3 h-9 z" fill="#ffb15a"/>
    <path d="M 786 228 h32 v16 h-24 z" fill="#2a090c" stroke="rgba(255,180,160,.4)"/>
    <path d="M 790 231 h18 v10 h-16 z" fill="#e23b3b"/>
    <path d="M 790 231 h6 v10 h-6 z" fill="#fff" opacity=".4"/>
    <path d="M 120 328 C 280 338 560 336 760 324" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="8" stroke-linecap="round"/>
    ${Y(214,340,66)}
    ${Y(648,342,68)}
    ${Ke(560,108,160,20,e,t.roof==="none"?"none":t.roof)}
    ${oe("M 130 286 C 320 270 540 274 790 236",t)}
    ${t.spoiler?'<path d="M690 132 h110 l8 12 h-100 z" fill="#141414"/><path d="M734 144 v26 M790 138 v22" stroke="#141414" stroke-width="4"/>':""}
    ${t.exhaust?`<circle cx="786" cy="338" r="7" fill="url(#${e}-metal)"/><circle cx="806" cy="338" r="7" fill="url(#${e}-metal)"/>`:'<circle cx="800" cy="336" r="5" fill="#9a9a9a"/>'}
    ${$(214,340,60,t.wheel,e,t.brakes)}
    ${$(648,342,62,t.wheel,e,t.brakes)}`}function Y(t,e,n){return`<path d="M ${t-n-2} ${e+8} A ${n+5} ${n+3} 0 0 1 ${t+n+2} ${e+8}" fill="none" stroke="rgba(0,0,0,.62)" stroke-width="12" stroke-linecap="butt"/>
    <path d="M ${t-n+1} ${e+4} A ${n} ${n*.9} 0 0 1 ${t+n-1} ${e+4}" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="2"/>`}function dn(t,e){return`
    ${we(e,`M 118 330
    C 112 286 150 246 230 230
    L 330 218
    C 378 208 402 156 470 132
    L 590 124
    L 668 124
    L 700 168
    L 724 230
    C 742 280 734 332 690 344
    L 168 350
    C 132 350 116 342 118 330 Z`,[[250,348,52],[600,348,52]],"body")}
    <path d="M 400 214 C 430 156 478 132 548 126 L 640 126 L 688 168 L 676 196 L 520 204 C 460 202 420 210 400 226 Z" fill="url(#${e}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2.4"/>
    ${I("M 450 168 C 520 146 600 142 660 156")}
    ${R(430,176)}
    <path d="M 668 126 L 724 230" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="3"/>
    <path d="M 220 236 C 300 222 350 220 400 230" fill="none" stroke="rgba(255,255,255,.38)" stroke-width="3"/>
    <path d="M 230 258 C 310 246 360 246 410 256" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="7" stroke-linecap="round"/>
    <path d="M 500 198 L 494 332" stroke="rgba(0,0,0,.4)" stroke-width="2"/>
    <path d="M 600 168 L 594 328" stroke="rgba(0,0,0,.28)" stroke-width="1.6"/>
    ${Z(455,250,e)}
    ${Z(545,246,e)}
    ${z(196,258,e)}
    ${Y(250,348,48)}
    ${Y(600,348,48)}
    <rect x="150" y="274" width="42" height="18" rx="3" fill="#14120e" stroke="rgba(255,255,255,.3)"/>
    <rect x="154" y="278" width="28" height="10" rx="2" fill="#f4f0e4"/>
    <rect x="154" y="278" width="10" height="10" rx="2" fill="#fff" opacity=".5"/>
    <rect x="156" y="260" width="18" height="10" rx="2" fill="#123044" stroke="#7ec8ff"/>
    <rect x="158" y="262" width="6" height="6" rx="1" fill="#dff6ff"/>
    <rect x="688" y="244" width="22" height="32" rx="3" fill="#2a090c" stroke="rgba(255,180,160,.35)"/>
    <rect x="692" y="248" width="14" height="24" rx="2" fill="#d23b32"/>
    <rect x="692" y="248" width="5" height="24" fill="#fff" opacity=".28"/>
    <rect x="646" y="284" width="26" height="16" rx="4" fill="#0e3b34" stroke="#9be7c4"/>
    <path d="M 160 332 C 320 340 520 340 690 328" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="7" stroke-linecap="round"/>
    ${Ke(500,112,150,16,e,t.roof)}
    ${oe("M 190 292 C 360 284 540 292 690 276",t)}
    ${$(250,348,44,t.wheel,e,!1)}
    ${$(600,348,44,t.wheel,e,!1)}`}function hn(t,e){const n=t.wheel==="mud"?14:t.wheel==="offroad"?8:0,a=t.lift===2?28:t.lift===1?14:0,o=60+n+(t.lift===2?8:t.lift===1?4:0),i=346-a*.2,r=`M 40 292
    L 70 230
    L 150 196
    L 300 186
    L 340 150
    L 390 112
    L 520 104
    L 560 150
    L 560 186
    L 800 174
    L 828 210
    L 828 330
    L 70 342
    L 40 318 Z`,s=t.liner==="spray"?"#2a2c2e":t.liner==="dropin"?"#4a5560":"rgba(0,0,0,.18)";let l="";return t.cover==="soft"&&(l='<path d="M570 196 L800 184 L802 214 L572 220 Z" fill="#1b1d20"/>'),t.cover==="hard"&&(l='<path d="M568 188 L806 174 L808 208 L570 216 Z" fill="#2c3136" stroke="rgba(255,255,255,.2)"/>'),`
    <g transform="translate(0 ${(-a).toFixed(1)})">
      ${we(e,r,[[230,i+a,o+10],[650,i+a,o+12]],"body")}
      <path d="M 360 176 C 386 132 424 114 470 112 L 530 112 L 548 150 L 430 168 Z" fill="url(#${e}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2.2"/>
      ${I("M 400 150 C 450 128 500 124 530 132")}
      ${R(400,150)}
      <path d="M 572 192 L 800 180 L 806 268 L 574 276 Z" fill="${s}"/>
      <path d="M 580 206 L 792 196" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
      <path d="M 580 248 L 796 236" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
      <rect x="760" y="214" width="16" height="8" rx="1" fill="url(#${e}-metal)"/>
      <path d="M 560 150 L 560 330" stroke="rgba(0,0,0,.45)" stroke-width="4"/>
      ${l}
      <path d="M 210 186 C 280 176 330 176 360 184" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="3"/>
      <path d="M 200 210 C 280 200 340 200 380 210" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="7" stroke-linecap="round"/>
      <path d="M 430 168 L 426 300" stroke="rgba(0,0,0,.4)" stroke-width="2"/>
      ${Z(390,220,e)}
      ${z(250,230,e)}
      <rect x="90" y="226" width="52" height="22" rx="3" fill="#14120e" stroke="rgba(255,255,255,.3)"/>
      <rect x="94" y="230" width="36" height="14" rx="2" fill="#f6f3ea"/>
      <rect x="94" y="230" width="12" height="14" fill="#fff" opacity=".45"/>
      <rect x="148" y="234" width="26" height="14" rx="2" fill="#14120e" stroke="rgba(255,255,255,.25)"/>
      <rect x="152" y="237" width="16" height="8" rx="1" fill="#f6f3ea"/>
      <rect x="780" y="208" width="24" height="34" rx="3" fill="#2a090c" stroke="rgba(255,180,160,.35)"/>
      <rect x="784" y="212" width="16" height="26" rx="2" fill="#c42828"/>
      <rect x="784" y="212" width="5" height="26" fill="#fff" opacity=".3"/>
      ${t.lightbar?'<rect x="430" y="86" width="120" height="14" rx="3" fill="#222"/><rect x="438" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="466" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="494" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="522" y="89" width="22" height="8" fill="#f4f1c8"/>':""}
      ${t.winch?`<rect x="70" y="300" width="54" height="16" rx="2" fill="url(#${e}-metal)"/>`:""}
      ${t.exhaust?`<circle cx="40" cy="300" r="8" fill="url(#${e}-metal)"/><circle cx="40" cy="278" r="8" fill="url(#${e}-metal)"/>`:""}
      <path d="M 120 286 h80 v8 h-80z" fill="url(#${e}-metal)"/>
    </g>
    ${Y(230,i,o+2)}
    ${Y(650,i,o+4)}
    ${$(230,i,o,t.wheel,e,!1)}
    ${$(650,i,o+2,t.wheel,e,!1)}`}function un(t,e){const n=`M 120 328
    C 114 286 150 250 220 234
    L 360 220
    L 470 216
    L 620 228
    C 700 240 748 270 760 304
    C 770 330 750 348 710 350
    L 180 354
    C 140 354 118 344 120 328 Z`,a=`<path class="top-canvas" d="M 468 214
      C 510 168 590 158 660 176
      C 710 190 734 220 742 252
      L 700 258
      C 680 220 580 210 500 236 Z" fill="${t.topColor}" stroke="rgba(255,255,255,.2)"/>
    <path class="top-canvas" d="M 520 196 C 580 180 650 184 710 208" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="2"/>`,o=`<path d="M 400 220 C 430 168 490 150 560 156 L 590 214 C 520 206 450 210 408 232 Z" fill="url(#${e}-glass)"/>`,i=`<g class="cockpit">
      <path d="M 470 236 C 520 214 620 214 680 240 L 690 280 L 470 286 Z" fill="#2a221c"/>
      <path d="M 530 236 C 560 220 610 220 640 240 L 636 268 L 524 270 Z" fill="#4a3b32"/>
      <rect x="600" y="228" width="28" height="14" rx="5" fill="#241c18"/>
      ${t.deflector?'<path d="M 455 196 h10 l18 78 h-10 z" fill="rgba(190,220,235,.4)" stroke="rgba(255,255,255,.45)"/>':""}
    </g>`;return`
    ${we(e,n,[[268,346,54],[590,346,54]],"body")}
    ${i}
    ${a}
    ${o.replace('fill="url(#','stroke="rgba(186,206,220,.55)" stroke-width="2.2" fill="url(#')}
    ${I("M 430 190 C 480 168 540 164 580 176")}
    ${R(455,188)}
    <path d="M 210 240 C 300 224 380 220 460 228" fill="none" stroke="rgba(255,255,255,.36)" stroke-width="3"/>
    <path d="M 220 262 C 310 248 390 246 460 254" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="7" stroke-linecap="round"/>
    <path d="M 470 228 L 466 336" stroke="rgba(0,0,0,.4)" stroke-width="2"/>
    ${Z(400,268,e)}
    ${Z(530,276,e)}
    ${z(210,268,e)}
    ${Y(268,346,50)}
    ${Y(590,346,50)}
    <rect x="160" y="282" width="42" height="16" rx="6" fill="#14120e" stroke="rgba(255,255,255,.3)"/>
    <rect x="164" y="285" width="28" height="10" rx="4" fill="#f7f3ea"/>
    <rect x="164" y="285" width="10" height="10" rx="4" fill="#fff" opacity=".5"/>
    <rect x="718" y="280" width="24" height="28" rx="6" fill="#2a090c" stroke="rgba(255,180,160,.35)"/>
    <rect x="722" y="284" width="16" height="20" rx="4" fill="#d23b32"/>
    <rect x="722" y="284" width="6" height="20" rx="2" fill="#fff" opacity=".3"/>
    <path d="M 180 334 C 340 342 520 342 700 332" fill="none" stroke="rgba(0,0,0,.32)" stroke-width="7" stroke-linecap="round"/>
    ${oe("M 190 300 C 360 290 540 300 720 292",t)}
    ${$(268,346,46,t.wheel,e,!1)}
    ${$(590,346,46,t.wheel,e,!1)}`}function pn(t,e){return`
    <path d="M250 150 L590 150 L640 210 L670 300 L640 360 L200 360 L170 300 L200 210 Z" fill="url(#${e}-paint)"/>
    <path d="M280 158 L560 158 L600 206 L240 206 Z" fill="url(#${e}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
    ${I("M 310 170 H 430")}
    ${R(196,168)}
    ${R(644,168,e,-1)}
    <path d="M300 210 C 360 236 480 236 540 210" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
    <path d="M250 228 H 590" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
    ${S(214,250,78,22,"#f4f1e2",3)}
    ${S(548,250,78,22,"#f4f1e2",3)}
    ${Fe(348,246,144,78,e)}
    ${z(420,284,e)}
    <path d="M200 322 h78 v22 h-78 z" fill="#111" stroke="rgba(255,255,255,.12)"/>
    <path d="M562 322 h78 v22 h-78 z" fill="#111" stroke="rgba(255,255,255,.12)"/>
    ${t.spoiler?'<path d="M230 118 h380 v16 h-380 z" fill="#161616"/>':""}
    ${oe("M 420 210 V 340",t)}
    ${$(188,332,52,t.wheel,e,t.brakes)}
    ${$(652,332,52,t.wheel,e,t.brakes)}
    ${Q(376,326,"VITT",!0)}`}function fn(t,e){return`
    <path d="M250 120 L590 120 L650 190 L670 250 L650 360 L190 360 L170 250 L190 190 Z" fill="url(#${e}-paint)"/>
    <path d="M290 128 L550 128 L590 186 L250 186 Z" fill="url(#${e}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
    ${I("M 320 146 H 460")}
    ${R(210,150)}
    ${R(630,150,e,-1)}
    <path d="M280 196 C 350 220 490 220 560 196" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
    ${S(210,228,70,30,"#f7f4ea",8)}
    ${S(560,228,70,30,"#f7f4ea",8)}
    ${Fe(360,232,120,54,e)}
    <rect x="384" y="246" width="72" height="22" rx="4" fill="#9be7c4"/>
    <text x="420" y="261" text-anchor="middle" font-size="11" font-family="Outfit, sans-serif" fill="#0e3b34" font-weight="700">HYBRID</text>
    <path d="M300 304 h240 v8 h-240 z" fill="#143044" stroke="#67c7ff" stroke-width="2"/>
    ${Ke(360,112,120,16,e,t.roof)}
    ${$(200,338,46,t.wheel,e,!1)}
    ${$(640,338,46,t.wheel,e,!1)}
    ${Q(374,318,"HRBR",!0)}`}function mn(t,e){const n=t.lift===2?28:t.lift===1?12:0,a=58+(t.wheel==="mud"?12:t.wheel==="offroad"?8:0)+(t.lift===2?8:0);return`
    <g transform="translate(0 ${-n})">
      <path d="M200 70 L640 70 L690 150 L710 250 L680 360 L160 360 L130 250 L150 150 Z" fill="url(#${e}-paint)"/>
      <path d="M250 78 L590 78 L630 146 L210 146 Z" fill="url(#${e}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
      ${I("M 280 100 H 480")}
      ${R(188,96)}
      ${R(652,96,e,-1)}
      <path d="M240 156 C 330 178 510 178 600 156" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
      ${S(188,176,90,38,"#f4f1e4",4)}
      ${S(562,176,90,38,"#f4f1e4",4)}
      <rect x="300" y="186" width="240" height="112" rx="4" fill="url(#${e}-metal)" stroke="#5c656e" stroke-width="3"/>
      <rect x="308" y="194" width="224" height="96" fill="url(#${e}-mesh)"/>
      <path d="M316 210 h208 M316 232 h208 M316 254 h208 M316 276 h208" stroke="rgba(255,255,255,.35)" stroke-width="5"/>
      ${z(420,242,e)}
      ${t.winch?`<rect x="360" y="308" width="120" height="28" rx="4" fill="url(#${e}-metal)"/><circle cx="420" cy="322" r="10" fill="#222"/>`:""}
      ${t.lightbar?'<rect x="300" y="46" width="240" height="18" rx="3" fill="#1a1a1a"/><rect x="312" y="50" width="36" height="10" fill="#fff6c8"/><rect x="356" y="50" width="36" height="10" fill="#fff6c8"/><rect x="400" y="50" width="36" height="10" fill="#fff6c8"/><rect x="444" y="50" width="36" height="10" fill="#fff6c8"/><rect x="488" y="50" width="36" height="10" fill="#fff6c8"/>':""}
      <path d="M160 330 h120 v16 h-120 z" fill="url(#${e}-metal)"/>
      <path d="M560 330 h120 v16 h-120 z" fill="url(#${e}-metal)"/>
    </g>
    ${$(176,340,a*.92,t.wheel,e,!1)}
    ${$(664,340,a*.92,t.wheel,e,!1)}`}function yn(t,e){return`
    <path d="M230 190 L610 190 L660 250 L670 340 L620 370 L220 370 L170 340 L180 250 Z" fill="url(#${e}-paint)"/>
    <path class="top-canvas" d="M300 120 L540 120 L590 190 L250 190 Z" fill="${t.topColor}" stroke="rgba(255,255,255,.2)"/>
    <path d="M270 150 L570 150 L600 196 L240 196 Z" fill="url(#${e}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
    ${I("M 310 164 H 470")}
    ${R(214,168)}
    ${R(626,168,e,-1)}
    <path d="M260 210 C 340 228 500 228 580 210" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
    ${S(210,258,64,38,"#f7f4ea",16)}
    ${S(566,258,64,38,"#f7f4ea",16)}
    ${Fe(372,262,96,52,e)}
    ${z(420,288,e)}
    ${oe("M 420 200 V 340",t)}
    ${$(196,340,50,t.wheel,e,!1)}
    ${$(644,340,50,t.wheel,e,!1)}
    ${Q(374,322,"BRZ",!0)}`}function gn(t,e){return`
    <path d="M230 150 L610 150 L660 230 L680 340 L640 372 L200 372 L160 340 L180 230 Z" fill="url(#${e}-paint)"/>
    <path d="M280 158 L560 158 L520 210 L320 210 Z" fill="url(#${e}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
    ${I("M 340 176 H 470")}
    <path d="M250 214 H 590" stroke="rgba(0,0,0,.35)" stroke-width="2"/>
    <path d="M240 228 H 600" stroke="rgba(255,255,255,.12)" stroke-width="2"/>
    ${S(196,248,92,26,"#e23b3b",3)}
    ${S(552,248,92,26,"#e23b3b",3)}
    ${z(420,236,e)}
    <path d="M220 332 h400 v18 h-400 z" fill="rgba(0,0,0,.35)" stroke="rgba(255,255,255,.08)"/>
    ${t.spoiler?'<path d="M180 112 h480 v18 h-480 z" fill="#141414"/><path d="M230 130 v24 M610 130 v24" stroke="#141414" stroke-width="6"/>':""}
    ${t.exhaust?`<circle cx="250" cy="348" r="10" fill="url(#${e}-metal)"/><circle cx="590" cy="348" r="10" fill="url(#${e}-metal)"/>`:'<circle cx="270" cy="346" r="7" fill="#777"/>'}
    ${oe("M 420 210 V 330",t)}
    ${$(190,366,48,t.wheel,e,t.brakes)}
    ${$(650,366,48,t.wheel,e,t.brakes)}
    ${Q(374,296,"VITT",!0)}`}function bn(t,e){return`
    <path d="M230 130 L610 130 L660 200 L670 360 L180 360 L170 200 Z" fill="url(#${e}-paint)"/>
    <path d="M300 140 L540 140 L500 200 L340 200 Z" fill="url(#${e}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
    ${I("M 350 158 H 490")}
    <path d="M250 206 H 590" stroke="rgba(0,0,0,.32)" stroke-width="2"/>
    ${S(200,226,84,38,"#d23b32",4)}
    ${S(556,226,84,38,"#d23b32",4)}
    ${z(420,218,e)}
    <path d="M360 250 h120 v70 h-120 z" fill="rgba(0,0,0,.25)" stroke="rgba(255,255,255,.2)"/>
    <path d="M372 262 h96 M360 286 h120 M372 308 h96" stroke="rgba(255,255,255,.16)" stroke-width="1.5"/>
    <rect x="404" y="274" width="32" height="10" rx="2" fill="url(#${e}-metal)"/>
    ${$(200,364,42,t.wheel,e,!1)}
    ${$(640,364,42,t.wheel,e,!1)}
    ${Q(374,292,"HRBR")}`}function wn(t,e){const n=t.lift===2?26:t.lift===1?12:0,a=58+(t.wheel==="mud"?10:0),o=t.cover==="hard"?"#2c3136":t.cover==="soft"?"#1b1d20":`url(#${e}-paint)`;return`
    <g transform="translate(0 ${-n})">
      <path d="M170 90 L670 90 L710 170 L720 250 L690 360 L150 360 L120 250 L130 170 Z" fill="url(#${e}-paint)"/>
      <path d="M250 100 L590 100 L560 160 L280 160 Z" fill="url(#${e}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
      ${I("M 310 118 H 520")}
      <path d="M230 168 H 610" stroke="rgba(0,0,0,.32)" stroke-width="2"/>
      ${S(175,196,104,36,"#d23b32",3)}
      ${S(561,196,104,36,"#d23b32",3)}
      ${z(420,178,e)}
      <rect x="300" y="210" width="240" height="120" fill="${o}" stroke="rgba(255,255,255,.2)"/>
      <path d="M312 232 h216 M300 268 h240 M312 304 h216" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
      <rect x="404" y="252" width="32" height="12" rx="2" fill="url(#${e}-metal)"/>
      ${t.exhaust?`<circle cx="150" cy="340" r="9" fill="url(#${e}-metal)"/><circle cx="690" cy="340" r="9" fill="url(#${e}-metal)"/>`:""}
    </g>
    ${$(160,370,a,t.wheel,e,!1)}
    ${$(680,370,a,t.wheel,e,!1)}
    ${Q(374,276,"1500",!0)}`}function kn(t,e){return`
    <path d="M230 180 L610 180 L660 250 L670 360 L170 360 L180 250 Z" fill="url(#${e}-paint)"/>
    <path class="top-canvas" d="M300 120 L540 120 L590 180 L250 180 Z" fill="${t.topColor}" stroke="rgba(255,255,255,.18)"/>
    <path d="M320 150 L520 150 L490 196 L350 196 Z" fill="url(#${e}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
    ${I("M 360 164 H 480")}
    <path d="M250 206 H 590" stroke="rgba(0,0,0,.3)" stroke-width="2"/>
    ${S(200,246,74,32,"#d23b32",8)}
    ${S(566,246,74,32,"#d23b32",8)}
    ${z(420,228,e)}
    <path d="M230 332 h380 v16 h-380 z" fill="rgba(0,0,0,.32)"/>
    ${$(196,366,46,t.wheel,e,!1)}
    ${$(644,366,46,t.wheel,e,!1)}
    ${Q(374,292,"BRZ")}`}function pt(t,e,n){if(e==="paint"){const o=t.colors.find(i=>i.id===n);return o?{id:o.id,name:o.name,price:o.price||0,tip:o.joke?"Gold flake. Seventy-five hundred so the car can glitter. Your nonna would take the spatula away from you.":""}:null}const a=ee(t.id).find(o=>o.id===e);return(a==null?void 0:a.options.find(o=>o.id===n))||null}function $n(t,e,n){const a=Array.isArray(t.multi[e])?t.multi[e].slice():[];return a.includes(n)?!1:(a.push(n),t.multi[e]=a,!0)}function vn(t,e,n){return t.single[e]===n?!1:(t.single[e]=n,!0)}function xn(t,e,n,a){var s;if(n==="paint"){const l=ae(t,e),h=t.colors.find(p=>!p.price)||t.colors[0];return e.paint===h.id?null:(e.paint=h.id,{name:l.name,price:l.price||0,tip:""})}const o=ee(t.id).find(l=>l.id===n);if(!o)return null;const i=o.options.find(l=>l.id===a);if(!i)return null;if(o.mode==="multi"){const l=e.multi[n]||[];return l.includes(a)?(e.multi[n]=l.filter(h=>h!==a),i):null}const r=(s=o.options[0])==null?void 0:s.id;return!r||e.single[n]===r?null:(e.single[n]=r,i)}function Tn(t,e,n){const a=Math.max(0,t),o=Math.max(1,n);if(a===0)return 0;const i=e/100/12;if(i===0)return B(a/o);const r=(1+i)**o;return B(a*i*r/(r-1))}function B(t){return Math.round(t*100)/100}function D(t){const n=(820-V(t,675,820))/145;return B(6+n*2)}function ye(t){return V(B(t+.7),t,8)}function U(t){return lt(t.msrp*(1+t.markup),50)}function N(t){return lt(t.msrp*(1-t.room),50)}function Te(t){return t*12/52}function ft(){return k.weeklyTakeHome*52/12}function mt({price:t,options:e=0,warranty:n=0,trade:a=0,down:o=0,apr:i=6,term:r=72,insurance:s=0}){const l=t+e,h=Math.max(0,l+n-a),p=B(h*Ye.taxRate),f=Ye.doc,g=Ye.title,m=B(l+n+f+g+p),x=B(m-a),w=Math.max(0,o),T=B(Math.max(0,x-w)),H=Tn(T,i,r),G=B(H*r),te=B(Math.max(0,G-T)),q=ft(),J=Te(Ce),$e=Te(s),ve=Te(H),He=k.weeklyTakeHome-J-$e-ve,se=q>0?H/q:0;return{selling:l,options:e,warranty:n,taxable:h,tax:p,doc:f,title:g,subtotal:m,trade:a,otd:x,down:w,financed:T,apr:i,term:r,payment:H,totalOfPayments:G,interest:te,insurance:s,monthlyTake:q,weeklyBills:J,weeklyIns:$e,weeklyPay:ve,weeklyLeft:He,paymentShare:se}}function Mn(t,e){const n=e.term,a=t.running??160,o=e.totalOfPayments,i=B((e.insurance||0)*n),r=B(a*n),s=e.down||0,l=B(o+s+i+r);return{months:n,note:o,interest:e.interest,insurance:i,upkeep:r,runningMonthly:a,down:s,warranty:e.warranty||0,total:l}}function Pe(t){return t>.2||!Number.isFinite(t)?"bad":t>.15?"warn":"ok"}const at=["#ffb25a","#f6f1e7","#ff8f88","#9ddec0","#f0d7a2","#8eb6ff","#ffe07a"];let Me=0,he=[],ue=[],Ne=0,pe=!1;function yt(){if(document.getElementById("fx"))return;const t=document.createElement("div");t.id="fx",t.innerHTML=`
    <canvas id="fx-canvas" aria-hidden="true"></canvas>
    <div id="fx-flash" hidden></div>
    <div id="fx-duo" hidden></div>`,document.body.appendChild(t)}function Ln(){Me&&cancelAnimationFrame(Me),Me=0,pe=!1,he=[],ue=[],clearTimeout(Ne);const t=document.getElementById("fx-canvas"),e=t==null?void 0:t.getContext("2d");t&&e&&e.clearRect(0,0,t.width,t.height);const n=document.getElementById("fx-duo");n&&(n.hidden=!0,n.innerHTML="");const a=document.getElementById("fx-flash");a&&(a.hidden=!0)}function gt(){const t=document.getElementById("fx-canvas");if(!t)return null;const e=Math.min(2,window.devicePixelRatio||1),n=window.innerWidth,a=window.innerHeight;t.width=Math.max(1,Math.floor(n*e)),t.height=Math.max(1,Math.floor(a*e));const o=t.getContext("2d");return o.setTransform(e,0,0,e,0,0),{ctx:o,width:n,height:a}}function Sn(t){const e=document.getElementById("fx-duo");if(e){if(clearTimeout(Ne),!t){e.hidden=!0,e.innerHTML="";return}e.hidden=!1,e.innerHTML=In(),Ne=setTimeout(()=>{e.hidden=!0,e.innerHTML=""},3600)}}function An(){const t=document.getElementById("fx-flash");t&&(t.hidden=!1,t.classList.remove("is-on"),t.offsetWidth,t.classList.add("is-on"),setTimeout(()=>{t.hidden=!0,t.classList.remove("is-on")},700))}function bt({intensity:t=1,duo:e=!1}={}){yt();const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(Sn(e),n){An();return}const a=gt();if(!a)return;const o=t>=3?8:t>=2?5:3;for(let i=0;i<o;i+=1)he.push({x:a.width*(.12+Math.random()*.76),y:a.height+8,vx:(Math.random()-.5)*1.4,vy:-(7.2+Math.random()*3.4),color:at[i%at.length],wait:i*90,age:0});pe||wt()}function Cn(t,e,n){const a=22+Math.floor(Math.random()*14);for(let o=0;o<a;o+=1){const i=Math.PI*2*o/a+Math.random()*.2,r=1.4+Math.random()*3.2;ue.push({x:t,y:e,vx:Math.cos(i)*r,vy:Math.sin(i)*r,life:1,decay:.012+Math.random()*.018,color:Math.random()<.25?"#fff6e4":n,r:1.4+Math.random()*2.1})}}function wt(){pe=!0;const t=gt();if(!t){pe=!1;return}const{ctx:e,width:n,height:a}=t;e.clearRect(0,0,n,a);const o=performance.now();if(he=he.filter(i=>{if(o<(i.born||(i.born=o+i.wait)))return!0;i.age+=1,i.vy+=.08,i.x+=i.vx,i.y+=i.vy,e.fillStyle=i.color,e.globalAlpha=.9,e.fillRect(i.x,i.y,3,8);const r=i.vy>=-1.2||i.age>70;return r&&Cn(i.x,i.y,i.color),!r}),ue=ue.filter(i=>(i.vy+=.045,i.x+=i.vx,i.y+=i.vy,i.life-=i.decay,i.life<=0?!1:(e.globalAlpha=Math.max(0,i.life),e.fillStyle=i.color,e.beginPath(),e.arc(i.x,i.y,i.r,0,Math.PI*2),e.fill(),i.y<a+20))),e.globalAlpha=1,he.length||ue.length){Me=requestAnimationFrame(wt);return}pe=!1,e.clearRect(0,0,n,a)}function In(){return`<div class="duo-card">
    <p class="duo-kicker">Skree &amp; Dumpling</p>
    ${Bn()}
    <p class="duo-yell">He folded!</p>
  </div>`}function Bn(){return`<svg class="duo-art" viewBox="0 0 360 148" aria-hidden="true">
    <g class="duo-skree">
      <path d="M48 118c8-28 10-46 14-58" fill="none" stroke="#1a120c" stroke-width="4" stroke-linecap="round"/>
      <path d="M92 116c-6-30-4-48-2-60" fill="none" stroke="#1a120c" stroke-width="4" stroke-linecap="round"/>
      <path d="M40 78c-16 8-22 2-18-10" fill="none" stroke="#1a120c" stroke-width="4" stroke-linecap="round"/>
      <path d="M98 76c18 6 24-2 16-14" fill="none" stroke="#1a120c" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="70" cy="58" rx="36" ry="34" fill="#d6ef7a" stroke="#1a120c" stroke-width="3"/>
      <path d="M52 28c6-14 18-16 20-4" fill="none" stroke="#1a120c" stroke-width="3" stroke-linecap="round"/>
      <circle cx="58" cy="16" r="4" fill="#1a120c"/>
      <ellipse cx="56" cy="56" rx="14" ry="16" fill="#fffdf6" stroke="#1a120c" stroke-width="2.4"/>
      <ellipse cx="86" cy="58" rx="8" ry="11" fill="#fffdf6" stroke="#1a120c" stroke-width="2.4"/>
      <rect x="52" y="58" width="5" height="7" fill="#1a120c"/>
      <rect x="84" y="60" width="4" height="5" fill="#1a120c"/>
      <path d="M50 76c8 10 22 12 34 2" fill="none" stroke="#1a120c" stroke-width="2.4" stroke-linecap="round"/>
      <rect x="60" y="74" width="7" height="9" rx="1" fill="#fffdf6" stroke="#1a120c" stroke-width="1.6"/>
      <rect x="70" y="75" width="6" height="8" rx="1" fill="#fffdf6" stroke="#1a120c" stroke-width="1.6"/>
      <path d="M58 96l12 8 12-8-6 16H64z" fill="#ff8a3d" stroke="#1a120c" stroke-width="2"/>
    </g>
    <g class="duo-dump">
      <polygon points="248,18 262,58 234,58" fill="#7d5cff" stroke="#1a120c" stroke-width="3"/>
      <circle cx="248" cy="16" r="4" fill="#ffe07a" stroke="#1a120c" stroke-width="2"/>
      <ellipse cx="230" cy="118" rx="10" ry="6" fill="#f2c14d" stroke="#1a120c" stroke-width="2.4"/>
      <ellipse cx="274" cy="118" rx="10" ry="6" fill="#f2c14d" stroke="#1a120c" stroke-width="2.4"/>
      <circle cx="252" cy="84" r="46" fill="#f2c14d" stroke="#1a120c" stroke-width="3"/>
      <path d="M214 70l10 8-10 6z" fill="#1a120c"/>
      <path d="M292 74l-12 6 10 8z" fill="#1a120c"/>
      <polygon points="230,78 238,70 246,80 238,88" fill="#fffdf6" stroke="#1a120c" stroke-width="2"/>
      <polygon points="268,76 278,70 284,80 274,88" fill="#fffdf6" stroke="#1a120c" stroke-width="2"/>
      <circle cx="238" cy="78" r="2.2" fill="#1a120c"/>
      <circle cx="276" cy="78" r="2.2" fill="#1a120c"/>
      <path d="M228 98c10 16 36 16 48 0" fill="#fffdf6" stroke="#1a120c" stroke-width="2.4"/>
      <rect x="246" y="100" width="8" height="8" fill="#fffdf6" stroke="#1a120c" stroke-width="1.5"/>
      <path d="M210 96c-6 8-2 14 6 12" fill="#ff8f88" stroke="#1a120c" stroke-width="2"/>
      <path d="M294 98c6 8 2 12-6 10" fill="#ff8f88" stroke="#1a120c" stroke-width="2"/>
    </g>
  </svg>`}function le(t){return Number.isFinite(t)?Math.min(1,Math.max(0,t)):0}function Rn(t){t.bank||(t.bank={price:0,trade:0,apr:0}),Number.isFinite(t.pushes)||(t.pushes=0),t.celebrated==null&&(t.celebrated=!1)}function Fn(t,e,n){var T;const a=U(t),o=N(t),i=le((a-e.price)/Math.max(1,a-o)),r=le((e.trade-C.open)/Math.max(1,C.max-C.open)),s=D(e.effectiveScore||700),l=ye(s),h=le((l-e.apr)/Math.max(.01,l-s)),p=e.term<72?le((72-e.term)/12):0,f=((T=n==null?void 0:n.single)==null?void 0:T.warranty)||e.warrantySync||"none",g=e.warrantyOpened||f,m=le((Be(g)-Be(f))/5e3),x=i*.4+r*.28+h*.24+p*.05+m*.03,w=[i>=.55,r>=.5,h>=.55,p>=.8,m>=.4].filter(Boolean).length;return{price:i,trade:r,apr:h,term:p,warranty:m,heat:x,stacks:w}}function Pn(t,e,n){const a=Math.min(1.2,(e||0)/5),o=Math.min(1,(n||0)/3),i=t*.9+a*.7+o*.45;return i>=1.65?4:i>=1.15?3:i>=.7?2:i>=.3?1:0}function ie(t,e,n){const a=Fn(t,e,n);return{...a,level:Pn(a.heat,e.pushes||0,a.stacks)}}function zn(t,e){const n=N(t),a=D(e.effectiveScore||700);return e.price<=n+50&&e.trade>=5e3&&e.apr<=a+.05}function ge(t,e){var n;return{price:t.price,trade:t.trade,apr:t.apr,term:t.term,warranty:((n=e==null?void 0:e.single)==null?void 0:n.warranty)||t.warrantySync||"none"}}function Hn(t,e){const n=[];return e.price<t.price-.01&&n.push("price"),e.trade>t.trade+.01&&n.push("trade"),e.apr<t.apr-1e-4&&n.push("apr"),e.term<t.term&&n.push("term"),Be(e.warranty)<Be(t.warranty)-.01&&n.push("warranty"),n}const ne={price:250,trade:200,apr:.12};function En(t){let e=0;for(;t.bank.price>=ne.price&&e<6;)t.bank.price-=ne.price,e+=1;for(;t.bank.trade>=ne.trade&&e<8;)t.bank.trade-=ne.trade,e+=1;for(;t.bank.apr>=ne.apr&&e<8;)t.bank.apr-=ne.apr,e+=1;return e}function Vn(t,e,n,a,o,i){Rn(n),i==="slider"&&(o.price>a.price&&(n.bank.price=Math.max(0,n.bank.price-(o.price-a.price))),o.trade<a.trade&&(n.bank.trade=Math.max(0,n.bank.trade-(a.trade-o.trade))),o.apr>a.apr&&(n.bank.apr=Math.max(0,n.bank.apr-(o.apr-a.apr))));const r=Hn(a,o);let s=!1;if(r.length&&i==="slider"){r.includes("price")&&(n.bank.price+=a.price-o.price),r.includes("trade")&&(n.bank.trade+=o.trade-a.trade),r.includes("apr")&&(n.bank.apr+=a.apr-o.apr);const f=En(n);(r.includes("term")||r.includes("warranty"))&&(n.pushes+=1,s=!0),f&&(n.pushes+=f,s=!0)}else r.length&&(n.pushes+=1,s=!0);const l=ie(t,n,e),h=zn(t,n);let p=!1;return h&&!n.celebrated?(n.celebrated=!0,p=!0):h||(n.celebrated=!1),{axes:r,ching:r.length>0,moan:s&&!p&&l.level>=2,fireworks:p,mood:l}}function Qe(){return`
    <svg class="face" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="40" fill="#2a1218"/>
      <circle cx="40" cy="44" r="24" fill="#e2b48f"/>
      <path d="M18 38c2-16 12-24 22-24s20 8 22 24c-6-6-14-8-22-8s-16 2-22 8z" fill="#2c2624"/>
      <path d="M22 34c4-2 8-1 10 2" fill="none" stroke="#d7a784" stroke-width="1"/>
      <path d="M18 36c6-8 14-10 22-8" fill="none" stroke="#8d8680" stroke-width="2" stroke-linecap="round"/>
      <path d="M46 28c6-1 12 2 16 8" fill="none" stroke="#8d8680" stroke-width="2" stroke-linecap="round"/>
      <path d="M26 44c2-3 6-4 8-2" fill="none" stroke="#3a2a24" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M46 42c2-2 6-1 8 2" fill="none" stroke="#3a2a24" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M39 46c2 4 1 8-1 10" fill="none" stroke="#c48a6a" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M30 60c4 4 16 5 22 0" fill="none" stroke="#8d3b3b" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M24 70c6 8 26 8 34-2v12H22z" fill="#5c1e2c"/>
      <path d="M34 66c4 6 8 6 12 0" fill="none" stroke="#e6c98a" stroke-width="1.4"/>
    </svg>`}function On(){return`
    <svg class="face" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="40" fill="#102033"/>
      <circle cx="40" cy="46" r="23" fill="#f0c39a"/>
      <path d="M16 42c4-18 14-26 24-26s20 8 24 24c-8-10-16-12-24-12s-16 3-24 14z" fill="#1b1a17"/>
      <path d="M28 44c1-2 4-3 6-1" fill="none" stroke="#2a211c" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M46 43c2-2 5-1 6 2" fill="none" stroke="#2a211c" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M32 58c4 5 12 5 16 0" fill="none" stroke="#9a3d3d" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M34 56c2 2 4 2 6 1" fill="#fff" opacity=".85"/>
      <ellipse cx="33" cy="36" rx="6" ry="3" fill="#fff" opacity=".35"/>
      <path d="M22 72c8 6 28 6 36-2v10H20z" fill="#d7e4f2"/>
    </svg>`}const c={screen:"intro",credit:{score:null,cosign:!1,boost:0,rolling:!1},carId:"stallion",builds:{},deals:{},category:"sound",view:0,spinning:!1,hintSeen:!1,moneyOpen:!1,sheet:null,advice:"",grade:null,lastGrade:null,studioNote:"",gradeCue:!1};function re(){const{score:t,boost:e,cosign:n}=c.credit;return t?Math.min(820,t+(n?e:0)):null}function M(){return Kt(c.carId)||Ie[0]}function v(t=M()){return c.builds[t.id]||(c.builds[t.id]=Qt(t)),c.builds[t.id]}function K(t=M()){const e=v(t),n=re()||700;if(!c.deals[t.id]){const r=D(n);c.deals[t.id]={carId:t.id,price:U(t),trade:C.open,apr:ye(r),term:72,downChecking:0,downSavings:0,effectiveScore:n,pushes:0,celebrated:!1,warrantyOpened:e.single.warranty,bank:{price:0,trade:0,apr:0}}}const a=c.deals[t.id];a.effectiveScore=n;const o=D(n),i=ye(o);return a.apr=V(a.apr,o,i),a.price=V(a.price,N(t),U(t)),a.trade=V(a.trade,C.min,C.max),a.downChecking=V(a.downChecking,0,k.checking),a.downSavings=V(a.downSavings,0,k.savings),a.warrantySync=e.single.warranty,a}function Yn(){c.credit={score:null,cosign:!1,boost:0,rolling:!1},c.carId="stallion",c.builds={},c.deals={},c.category="sound",c.view=0,c.spinning=!1,c.hintSeen=!1,c.moneyOpen=!1,c.sheet=null,c.advice="",c.grade=null,c.studioNote="",c.gradeCue=!1}function Dn(){try{const t=localStorage.getItem("dreamcar-last");c.lastGrade=t?JSON.parse(t):null}catch{c.lastGrade=null}}function Gn(t,e){const n={letter:t.letter,title:t.title,car:e.name,payment:t.quote.payment};c.lastGrade=n;try{localStorage.setItem("dreamcar-last",JSON.stringify(n))}catch{}}function jn(){const t=Math.random();let e,n;return t<.06?(e=675,n=699):t<.68?(e=700,n=780):t<.94?(e=781,n=809):(e=810,n=820),e+Math.floor(Math.random()*(n-e+1))}function kt(t){return t>=800?{id:"excellent",label:"Excellent",line:"Cheap money. Do not waste it on a stupid car."}:t>=740?{id:"verygood",label:"Very good",line:"The bank will talk nice. Not charity-nice. Nice."}:t>=700?{id:"good",label:"Good",line:"Respectable. Ricky will still try to fatten the rate. Do not let him."}:{id:"fair",label:"Fair",line:"The rate is going to sting. This is the moment you think about your mother. Carefully."}}function Nn(){return"I am Vinny Caputo. They call me Numbers. Ricky is going to smile. I am here so you do not smile back too fast. First we see what the bank thinks you are worth."}function qn(t){const e=kt(t);return t>=800?`${t}. ${e.line} An 800 is rare. Do not celebrate by buying the ceiling of the menu.`:t<700?`${t}. ${e.line} Most people land in the 700s. You caught a thin one. We can still shop. We just will not pretend the money is free.`:`${t}. ${e.line}`}function Wn(t,e,n){return n>=760?`Ma co-signed anyway. +${t}, so the bank sees ${e}. You did not need her. Now you owe her more than money. Do not miss a payment. Ever.`:`You called Ma. She sighed the sigh. She said yes. +${t} on the score the bank will use, which puts you at ${e}. That is a gift. Treat it like one.`}function ze(t,e){const n=be(t,e),a=n.lines.filter(h=>h.price>0&&h.group!=="warranty"),o=a.filter(h=>h.tag==="joke"),i=a.filter(h=>h.tag==="smart"),r=a.filter(h=>h.tag==="fluff"||h.tag==="joke").reduce((h,p)=>h+p.price,0),s=n.lines.find(h=>h.group==="warranty"),l=ae(t,e);if(o.length){const h=o[o.length-1];return h.tip||`${h.name} is a bit. The payment will not get the joke.`}return l.joke?"Gold flake. Seventy-five hundred so the car can glitter. Your nonna would take the spatula away from you.":(s==null?void 0:s.price)>0&&s.tip?s.tip:r>t.msrp*.12?`You have ${d(r)} in extras that mostly wave at people. The car was already a car. The payment is where it gets heavy.`:n.options===0&&((s==null?void 0:s.id)==="none"||!s)?"Bone stock, factory coverage. On a new car that is a real position. The one warranty I would still hear is the electronics. Screens and cameras. Not a second powertrain.":i.length>=2&&r<800?"Look at you. Mats, a camera, stuff you will actually use. This is how a grown-up builds a car.":t.id==="breeze"&&e.topDown?"Top down is free. Say it again when they try to charge you for joy. The canvas color is the only part with a price.":t.id==="stallion"&&n.options<2500?"I love a Stallion. Your paycheck is less romantic. Build it, sit at the desk, and be ready to walk. A sharp deal on the wrong car is still the wrong car.":t.id==="harbor"&&r>2500?"You took the sensible car and dressed it like the silly one. Pick a lane. The Harbor wins when the build stays quiet.":t.id==="ironhorn"&&(e.single.stance==="lift"||e.single.wheels==="mud")?"The truck was already a truck. The lift and the carnival tires are how a work vehicle becomes a hobby you finance.":"Every option has a price because every option lands in the payment. If you will not notice it on a Tuesday, leave it in the rack."}const Zn={1:["A little off the top. My manager is going to look at me like I lost a shoe.","You want more for the jalopy. I have to call a man who already sighs when he sees my number.","The rate too? The bank and I had a quiet arrangement. Now it is loud.","I can move. I am moving. Please notice that I am moving and be a person about it."],2:["Price and the trade. You are doing a thing. I can feel the thing. I do not like the thing.","Every slide takes a bite out of my commission. I had plans. Small plans. Lunch plans.","You keep asking. I am smiling with my mouth only. The rest of me filed a complaint.","Shorter term, lower rate, nicer trade. Pick a hobby that is not my paycheck."],3:["I am wheezing in a professional way. That sound was my margin leaving the building.","Uncle. Not the family kind. The kind where I stare at a ceiling tile and give up.","I am going to make a small tragic noise. Please pretend it was the chair.","You touched every lever. I am one salesman and I already ate."],4:["I am a puddle in a clean shirt. Take the number before I start charging you for tissues.","This is a very polite robbery. I am the one saying please. The please is crying.","Ask for one more nickel and I will honk. Not the car. Me. A honk of grief.","My manager sent a skull. I do not know what it means and I am afraid to ask."]};function Un(t,e){const n=Zn[Math.max(1,Math.min(4,t))],a=(e.pushes||0)+Math.round((e.trade||0)/100);return n[Math.abs(a)%n.length]}function $t(t,e,n){const a=ie(t,e,n);if(a.level>=1)return Un(a.level,e);const o=U(t),i=N(t),r=Math.max(1,o-i),s=(o-e.price)/r,l=(e.trade-3600)/2e3;return s>.85&&l>.7?"Alright. Alright. You win on the car. I still have a family. Probably.":s>.55?"You are killing me. Let me pretend to call my manager.":l>.65?"I have to wholesale that jalopy. My guy is going to laugh at me.":e.apr<=D(e.effectiveScore)+.05?"Rates come from the bank, not from me. Today the bank is feeling generous. Apparently.":s<.15&&l<.25?"This one has been waiting for someone with taste. I can probably come down a little. Probably.":"I can move a little. Do not make me get emotional. I just had lunch."}function De(t,e,n){const a=ie(t,e);if(a.level<2)return n;const o=a.level>=4?"Ignore the tragic noises. They are not a counteroffer.":"He is whining because the number is getting fair. Whining is theater.";return`${n} ${o}`}function vt(t,e,n){const a=N(t),o=U(t),i=D(e.effectiveScore),r=Pe(n.paymentShare),s=ie(t,e);if(e.downChecking+e.downSavings>n.otd+1&&n.financed===0)return"You brought more cash than the car costs. Put the extra back. A cash deal can still be a bad price.";if(n.weeklyLeft<0)return"This payment eats the week alive. You would be choosing between the car and groceries. That is not a deal. That is a trap with a steering wheel.";if(r==="bad")return`The payment is ${me(n.paymentShare)} of take-home. I start sweating at fifteen. We are past sweating. Stretch the term and it only hides the problem.`;if(r==="warn")return`You are over that 15% line, at ${me(n.paymentShare)} of take-home. It works until the first surprise bill. Then it does not. Knock the price or the fluff.`;const l=k.savings-e.downSavings,h=e.downChecking+e.downSavings;return l<P-1?`You left ${d(l)} in savings. Two months of bills is about ${d(P)}. That backup stays. A chunk of the fifteen thousand can be the down payment. The part under two months of bills cannot.`:e.downChecking>7e3?"You are about to hand Ricky the checking account. Rent does not care how the car smells. Leave yourself a month of life.":e.price<=a+50&&e.trade>=5e3&&e.apr<=i+.05&&r==="ok"&&h>=2e3?De(t,e,"Now we are talking. Price is at the bone, the jalopy got respect, the rate matches your score, and you put real money down. Shake before he changes his mind."):e.price<=a+50&&e.trade>=5e3&&e.apr<=i+.05&&r==="ok"?De(t,e,"Price, trade, and rate are clean. You are still light on the down payment. A chunk of that savings is for this. Leave about two months of bills, and put some of the rest on the hood before depreciation eats you in the street."):e.price>=o-50?"You are still sitting on his opening number. That number has a markup in it. Slide it toward you. He expects you to.":e.trade<=3800?"He lowballed the Cumberland. It is ugly. It is not worthless. Four thousand five hundred is fair. Make him climb.":e.apr>i+.25?`The rate is ${e.apr.toFixed(2)}%. Your score earned about ${i.toFixed(2)}%. The gap is Ricky’s quiet little tip. Take it back.`:e.term===84&&n.paymentShare<.1?"You can afford a shorter term and you are still stretching to eighty-four. That is extra interest for a payment you do not need. Look at sixty.":e.term===84?"Eighty-four months is seven years with this car. The payment looks kind. The interest is the unkind part. Only stay here if sixty genuinely breaks the week.":n.weeklyLeft<140?`You can swing it. You just cannot sneeze. About ${d(n.weeklyLeft)} left in the week after bills, insurance, and the car. Tight.`:h<1e3?"Zero down feels clever until the tires hit the street. The car is worth less immediately, and the loan is still the whole thing. Fifteen thousand in savings is partly for this. Keep about two months of bills. Use some of the rest.":e.downSavings>=1500&&l>=P?De(t,e,`${d(e.downSavings)} from savings onto the down payment, about ${d(l)} still sitting there. Two months of bills is roughly ${d(P)}. That is what a piece of the pile is for. Better than rolling out with nothing down.`):s.level>=2?s.level>=4?"He is making sounds. That is not a discount and it is not a threat. If the week still works, hold the bone. If the week does not, a pretty surrender is still the wrong car.":"Hear him shrink. That is margin, not a reason to give one back. Ask for the next number you came in for, then read the week.":`The week still has air in it, about ${d(n.weeklyLeft)} after the life you already live. That is how you stay a person, not a payment.`}function Je(t,e,n){const a=be(t,e);return{priced:a,quote:mt({price:n.price,options:a.options,warranty:a.warranty,trade:n.trade,down:n.downChecking+n.downSavings,apr:n.apr,term:n.term,insurance:ht(t,e)})}}const Ge=[{min:93,letter:"A+",title:"He never saw you coming"},{min:86,letter:"A",title:"That is a grown-up deal"},{min:78,letter:"B",title:"You held your own"},{min:70,letter:"C",title:"You left money on the desk"},{min:60,letter:"D",title:"Ricky is buying dinner tonight"},{min:0,letter:"F",title:"They ate you alive"}];function ot(t,e,n,a,o){if(n===e)return o;const i=Math.min(1,Math.max(0,(t-e)/(n-e)));return a+(o-a)*i}function Kn(t,e,n){const{priced:a,quote:o}=Je(t,e,n),i=D(n.effectiveScore),r=N(t),s=U(t),l=[];let h=0;const p=ot(n.price,s,r,0,22);h+=p,n.price>=t.msrp*1.02?l.push({tone:"bad",text:`You paid ${d(n.price)} on a ${d(t.msrp)} car. That is a markup, and you thanked him for it.`}):n.price<=r+80?l.push({tone:"good",text:`You walked the ${t.name} down to ${d(n.price)}. That is the bone. Ricky felt that.`}):n.price<t.msrp?l.push({tone:"mid",text:`Under sticker, at ${d(n.price)}. Respectable. There was still a little meat on it.`}):l.push({tone:"bad",text:`You paid sticker, ${d(n.price)}. On this lot, sticker is where the conversation starts, not where it ends.`});const f=ot(n.trade,3400,5300,1,14);h+=Math.max(0,Math.min(14,f)),n.trade<4e3?l.push({tone:"bad",text:`The trade came in at ${d(n.trade)}. The jalopy is ugly. It is still a ${d(4500)} car. You let him steal it.`}):n.trade>=5e3?l.push({tone:"good",text:`He paid ${d(n.trade)} for a car he does not want to look at. That is found money off the loan.`}):l.push({tone:"mid",text:`Trade at ${d(n.trade)}. Fair lives around $4,500. You are in the neighborhood.`});const g=n.apr-i,m=g<=.05?16:g<=.2?12:g<=.4?7:2;h+=m,g<=.05?l.push({tone:"good",text:`The rate is ${n.apr.toFixed(2)}%. That matches a ${n.effectiveScore} score. This is the whole ballgame.`}):l.push({tone:"bad",text:`You are paying ${g.toFixed(2)} points more than your score earned. On this loan that tip goes to the bank, quietly, for years.`});let x=n.term===60?10:n.term===72?6:2;n.term===84&&o.paymentShare>.12&&mt({...o,term:60,price:n.price,options:a.options,warranty:a.warranty,trade:n.trade,down:o.down,apr:n.apr,insurance:o.insurance}).paymentShare>.18&&(x=5),h+=x,n.term===84?l.push({tone:"bad",text:`Eighty-four months. You will pay ${d(o.interest)} in interest. A shorter term costs more a month and a lot less of your life.`}):n.term===60?l.push({tone:"good",text:"Five years, not seven. You refused the long, pretty payment. I respect that."}):l.push({tone:"mid",text:"Six years is the middle chair. Not a crime. Not a victory."});const w=a.warrantyId;let T=4;w==="tech"?T=8:w==="none"?T=7:w==="basic"?T=4:w==="bumper"?T=3:w==="platinum"&&(T=2),h+=T,w==="tech"?l.push({tone:"good",text:"Electronics coverage, a few hundred. Screens, cameras, the infotainment. That is the warranty that earns its keep. The factory already has the rest, because the car is new."}):w==="platinum"?l.push({tone:"bad",text:"Platinum, five thousand, on a new car. Factory coverage is a big reason you buy new. That binder is a second promise with a boat payment inside it."}):w==="bumper"?l.push({tone:"bad",text:"Full bumper-to-bumper on a new car. You already bought that coverage when you bought new. You just paid for it twice."}):w==="basic"?l.push({tone:"mid",text:"Powertrain coverage, two thousand, on a car that just came with powertrain coverage. Buying new was that warranty."}):w==="none"&&l.push({tone:"good",text:"Factory coverage only. On a new car that is the right starting point. If you add one thing, make it the electronics, not a second bumper-to-bumper."});let H=22;o.paymentShare<=.1?H=22:o.paymentShare<=.15?H=16:o.paymentShare<=.2?H=7:H=0,h+=H;let G=100;o.weeklyLeft<0?(l.push({tone:"bad",text:`After bills, insurance, and this payment, the week is ${d(o.weeklyLeft)}. Negative. You cannot live in a negative week.`}),G=36):o.paymentShare>.15?l.push({tone:"bad",text:`The payment is ${me(o.paymentShare)} of take-home, past the 15% line, at ${d(o.payment,!0)} a month.`}):o.weeklyLeft<120?(l.push({tone:"mid",text:`About ${d(o.weeklyLeft)} left in the week. You can swing it. You cannot sneeze.`}),G=Math.min(G,74)):l.push({tone:"good",text:`The week still breathes. About ${d(o.weeklyLeft)} left after housing, food, the phone, insurance, and the car.`});const te=k.savings-n.downSavings,q=n.downChecking+n.downSavings;n.downChecking>=7e3&&(l.push({tone:"bad",text:"You drained checking to look like a hero at the desk. The car is pretty. The rent is prettier, because it always shows up."}),h-=8),te<P-1?(l.push({tone:"bad",text:`You left ${d(te)} in savings. Two months of bills is about ${d(P)}. That backup stays. A down payment can use what sits above it.`}),h-=8):q<500?(l.push({tone:"bad",text:"You rolled out with almost nothing down. The car is worth less the second it hits the street. A chunk of that savings exists so the loan is not already underwater in the parking lot."}),h-=6):n.downSavings>=2e3?(l.push({tone:"good",text:`You put ${d(n.downSavings)} of savings on the hood and left about ${d(te)}. That pile was partly for this. Two months of bills are still sitting there.`}),h+=3):q>=2e3&&(l.push({tone:"good",text:`You put ${d(q)} down. Real money, so depreciation does not eat you before the first light. Some of the savings can still join it, as long as two months of bills stay put.`}),h+=2);const J=a.lines.filter(j=>j.tag==="joke").reduce((j,Ot)=>j+Ot.price,0),$e=a.options/t.msrp;J>0?(l.push({tone:"bad",text:`${d(J)} of this build is a bit with a price tag. The bank does not have a sense of humor.`}),h-=Math.min(10,4+J/4e3)):$e>.15?(l.push({tone:"mid",text:`Options added ${d(a.options)}, more than 15% of the car. Some of that you will touch. Some of it you will only see on the statement.`}),h-=5):a.options>0&&a.options<1800&&(l.push({tone:"good",text:`The build stayed modest, ${d(a.options)} in options. You bought a car, not a catalog.`}),h+=3),o.interest>8e3&&l.push({tone:"mid",text:`Interest alone is ${d(o.interest)}. That is another used car sitting on the curb, except you do not get to drive it.`});const ve=n.price<=r+250&&n.trade>=4700&&g<=.11&&J===0&&te>=P-1&&q>=1500&&n.downChecking<=5500,He=o.paymentShare>.15||o.weeklyLeft<120;ve&&He&&(l.unshift({tone:"good",text:`You worked the desk. Price, trade, and rate are clean. A ${t.name} still does not fit a $1,010 week. The smart move is a different car, not a longer marriage to the bank.`}),h=Math.max(h,76),G=Math.max(G,84)),h=Math.max(0,Math.min(G,Math.round(h)));const se=Ge.find(j=>h>=j.min)||Ge[Ge.length-1],Ht=l.filter(j=>j.tone==="good"),Et=l.filter(j=>j.tone==="bad"),Vt=Qn(se.letter,Ht,Et,t,o);return{score:h,letter:se.letter,title:se.title,notes:l,narrative:Vt,quote:o,priced:a,earnedApr:i}}function Qn(t,e,n,a,o){var l,h;const i=(l=e[0])==null?void 0:l.text,r=(h=n[0])==null?void 0:h.text,s={"A+":"I am proud of you. You walked in with a beater and you did not leave married to a bad note. Ricky is going to tell his wife the wifi was down. That is how you know.",A:"That is a deal you can say out loud at Sunday dinner. Not perfect. Honest. Take the keys and do not add a single thing in the finance office.",B:"You held your own. He did not rob you, and you did not rob him, which is fine, because robbing him was never the job. Living with the payment is the job.",C:"You survived. Survival is not the same as a good deal. There is money still sitting on his side of the desk, and it answers to your name.",D:"Ricky eats tonight. You will be eating around this payment for years. We can run it again. I am not mad. I am annoyed. There is a difference.",F:"They saw you coming from the parking lot. The week cannot carry this car. I do not care how it looks under the lights. We are not signing this. We are learning it, and then we are doing it over."};return t==="A+"||t==="A"?`${i||`The ${a.name} fits the week.`} ${r||"I do not have a real complaint. Do not make me find one."} ${s[t]}`:t==="F"||t==="D"?`${r||`The payment is ${d(o.payment,!0)}, and the week felt that.`} ${i||"You showed up. That is step one, not the whole walk."} ${s[t]}`:`${i||"There is something in here I can defend."} ${r||"And there is something I would still push."} ${s[t]}`}function Jn(t){const e=N(t);return`Here is the whole sermon, short. Knock the ${t.name} toward ${d(e)}, not his opening number. Get the jalopy to at least $4,500. Take the rate your score earned, not the one with his fingerprint on it. Keep the payment under 15% of take-home. Put real money down. Checking, and some of the savings, as long as about two months of bills stay put. Zero down and depreciation eats you in the parking lot. Warranty: the car is new, so the factory already covers the bumper and the powertrain. A few hundred for the screens and cameras is the smart add. Not two grand of powertrain, and not five of platinum. Then look at what it costs to own, not the sticker, and shake his hand like you mean to leave.`}function _n(t,e){const n=e.months/12,a=n===1?"year":"years",o=e.warranty>0?`The ${d(e.warranty)} warranty is already inside those payments.`:"No extra warranty on top of the factory promise.",i=e.down>0?`${d(e.down)} down is in the total, not in the monthly.`:"Zero down, so the loan is the whole car.";return`The sticker is just the hello. Over ${n} ${a} the payments come to ${d(e.note)}, and ${d(e.interest)} of that is interest. ${i} Insurance, about ${d(e.insurance)}. Gas and upkeep on a ${t.name}, roughly ${d(e.upkeep)}. ${o} Near ${d(e.total)} to own it.`}const xt=["","","getting misty","openly suffering","tragic little noises"],it=[{id:"credit",label:"Credit"},{id:"lot",label:"Cars"},{id:"studio",label:"Studio"},{id:"negotiate",label:"Desk"},{id:"grade",label:"Deal"}];function ke(){const t=document.getElementById("app"),e=c.screen==="studio"||c.screen==="negotiate";t.classList.toggle("is-lock",e);const n=document.getElementById("hud");n.hidden=c.screen==="intro",c.screen!=="intro"?Tt():document.getElementById("drawer").hidden=!0;const a=document.getElementById("screen"),o={intro:rt,credit:da,lot:ua,studio:ma,negotiate:ga,grade:ba};a.innerHTML=(o[c.screen]||rt)()}function Tt(){const t=re(),n=c.screen==="negotiate"||c.screen==="grade"?c.deals[c.carId]:null,a=k.checking-((n==null?void 0:n.downChecking)||0),o=k.savings-((n==null?void 0:n.downSavings)||0),i=it.findIndex(r=>r.id===c.screen);document.getElementById("hud").innerHTML=`
    <div class="hud-row">
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">Checking</span>
        <span class="v">${d(a)}</span>
      </button>
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">Savings</span>
        <span class="v">${d(o)}</span>
      </button>
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">${t?c.credit.cosign?"With Ma":"Credit":"Pay"}</span>
        <span class="v">${t||"$1,010"}</span>
      </button>
      <button type="button" class="icon-btn ${b.on?"is-on":""}" data-action="audio" aria-label="${b.on?"Mute sounds":"Play sounds"}" aria-pressed="${b.on}">
        ${la()}
      </button>
    </div>
    <ol class="steps">
      ${it.map((r,s)=>`<li class="${s===i?"is-on":s<i?"is-done":""}">${r.label}</li>`).join("")}
    </ol>`,document.getElementById("drawer").innerHTML=ca()}function Xn(){const t=document.querySelector('[data-action="audio"]');t&&(t.classList.toggle("is-on",b.on),t.setAttribute("aria-pressed",String(b.on)),t.setAttribute("aria-label",b.on?"Mute sounds":"Play sounds"))}function ea(){const t=document.getElementById("drawer");c.moneyOpen=!c.moneyOpen,t.hidden=!c.moneyOpen}function ta(t){var a;const e=_t[t];if(!e)return;const n=document.getElementById("overlay");n.hidden=!1,n.innerHTML=`
    <div class="sheet-back">
      <div class="scrim" data-action="close-sheet"></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <header class="sheet-head">
          <p class="eyebrow">What is this?</p>
          <h2 id="sheet-title">${y(e.title)}</h2>
          <button type="button" class="icon-btn sheet-x" data-action="close-sheet" aria-label="Close">×</button>
        </header>
        ${et(e.body)}
      </div>
    </div>`,(a=n.querySelector(".sheet-x"))==null||a.focus()}function _e(){const t=document.getElementById("overlay");t.hidden=!0,t.innerHTML=""}function Mt(){c.moneyOpen=!1;const t=document.getElementById("drawer");t&&(t.hidden=!0)}function O({options:t=!1}={}){const e=M(),n=v(e),a=be(e,n),o=ae(e,n),i=document.getElementById("hero-art");if(i){const p=Ze(e,n);i.innerHTML=Ue(e.id,W[c.view].id,p,`hero${c.view}`)}if(document.querySelectorAll(".swatch").forEach(p=>{const f=p.dataset.paint===n.paint;p.classList.toggle("is-on",f),p.setAttribute("aria-pressed",String(f))}),A("paint-label",o.price?`${o.name} · +${d(o.price)}`:o.name),sa(),A("dock-price",d(a.total)),A("dock-sub",At(a)),A("vinny-tip-text",c.studioNote||ze(e,n)),t){const p=document.getElementById("options");p&&(p.innerHTML=tt(e,n));const f=document.getElementById("build-cart");f&&(f.innerHTML=Ct(e,n))}const r=document.getElementById("hero");r==null||r.classList.toggle("is-spinning",c.spinning);const s=document.querySelector('[data-action="spin"]');s&&(s.textContent=c.spinning?"Stop":"Spin");const l=document.getElementById("swipe-hint");l&&(l.hidden=c.hintSeen);const h=document.querySelector('[data-action="top"]');h&&(h.textContent=n.topDown?"Raise the top":"Drop the top")}function na(){var n;const t=M(),e=document.getElementById("options");e&&(e.innerHTML=tt(t,v(t))),document.querySelectorAll(".cat").forEach(a=>{a.classList.toggle("is-on",a.dataset.cat===c.category)}),(n=document.getElementById("studio-scroll"))==null||n.scrollTo(0,0),A("vinny-tip-text",c.studioNote||ze(t,v(t)))}function aa(){const t=v(),e=document.querySelector("#hero-art .car");e==null||e.classList.toggle("is-down",t.topDown);const n=document.querySelector('[data-action="top"]');n&&(n.textContent=t.topDown?"Raise the top":"Drop the top"),A("vinny-tip-text",c.studioNote||ze(M(),t))}function fe({sliders:t=!1}={}){var m,x;const e=M(),n=v(e),a=K(e),{quote:o,priced:i}=Je(e,n,a);A("price-readout",d(a.price)),A("trade-readout",d(a.trade)),A("apr-readout",`${a.apr.toFixed(2)}%`),A("check-readout",`${d(a.downChecking)} down · ${d(k.checking-a.downChecking)} left`),A("save-readout",Lt(a.downSavings)),A("ricky-line",$t(e,a,n)),ia(e,n,a),A("vinny-desk-text",c.advice||vt(e,a,o)),A("dock-pay",d(o.payment,!0));const r=Pe(o.paymentShare),s=o.weeklyLeft;A("dock-sub",`${a.term} mo · ${a.apr.toFixed(2)}% · ${d(s)} left this week`);const l=document.getElementById("dock-pay");l==null||l.classList.remove("zone-ok","zone-warn","zone-bad"),l==null||l.classList.add(`zone-${s<0?"bad":r}`);const h=document.getElementById("pressure");h&&(h.innerHTML=Bt(o));const p=document.getElementById("budget-mount");p&&(p.innerHTML=Rt(o));const f=document.getElementById("tco-mount");f&&(f.innerHTML=Xe(e,o)),(x=(m=document.querySelector('[data-lever="savings"]'))==null?void 0:m.closest(".lever"))==null||x.classList.toggle("warn",St(a.downSavings));const g=document.getElementById("sheet-mount");g&&(g.innerHTML=Ft(e,a,i,o)),document.querySelectorAll("[data-term]").forEach(w=>{const T=Number(w.dataset.term)===a.term;w.classList.toggle("is-on",T),w.setAttribute("aria-pressed",String(T))}),document.querySelectorAll("[data-warranty]").forEach(w=>{const T=w.dataset.warranty===n.single.warranty;w.classList.toggle("is-on",T),w.setAttribute("aria-pressed",String(T))}),t&&(ce("price",a.price),ce("trade",a.trade),ce("apr",a.apr),ce("checking",a.downChecking),ce("savings",a.downSavings)),Tt()}function oa(t){String(t).padStart(3,"0").split("").forEach((n,a)=>{const o=document.getElementById(`d${a}`);o&&(o.textContent=n)})}function ce(t,e){const n=document.querySelector(`[data-lever="${t}"]`);n&&(n.value=String(e))}function Lt(t){const e=k.savings-t;return t<=0?"None down yet":e<P?`${d(t)} · backup thin`:`${d(t)} down · ${d(e)} left`}function St(t){return t>0&&k.savings-t<P}function Xe(t,e){const n=Mn(t,e);return`<section class="tco">
    <div class="tco-top">
      <span>Total cost of ownership ${L("tco")}</span>
      <strong>${d(n.total)}</strong>
    </div>
    <p>${y(_n(t,n))}</p>
  </section>`}function A(t,e){const n=document.getElementById(t);!n||n.textContent===e||(n.textContent=e,n.classList.remove("pop"),n.offsetWidth,n.classList.add("pop"))}function ia(t,e,n){const a=ie(t,n,e),o=document.getElementById("ricky");o&&(o.dataset.stress=String(a.level));const i=document.getElementById("margin-fill");i&&(i.style.width=`${Math.max(8,Math.round((1-Math.min(1,a.heat))*100))}%`);const r=document.getElementById("ricky-whine");if(r){const s=xt[a.level]||"";r.textContent=s,r.hidden=!s}}function qe(t){const e=document.getElementById("ricky");if(!e)return;e.classList.remove("is-wailing"),e.offsetWidth,e.classList.add("is-wailing");const n=document.getElementById("ricky-yelp");if(!n)return;const a=["nnngh","augh","my margin","wahhh","nooo"];n.textContent=a[Math.min(a.length-1,Math.max(0,(t||2)-1))],clearTimeout(qe.timer),qe.timer=setTimeout(()=>{n.textContent="",e.classList.remove("is-wailing")},900)}function ra(t){for(const e of t){const n=e==="term"?document.querySelector('[data-action="term"]'):e==="warranty"?document.querySelector("[data-warranty]"):document.querySelector(`[data-lever="${e}"]`),a=n==null?void 0:n.closest(".lever");a&&(a.classList.remove("is-win"),a.offsetWidth,a.classList.add("is-win"))}}function sa(){document.querySelectorAll(".view-dot").forEach(t=>{t.classList.toggle("is-on",Number(t.dataset.view)===c.view)})}function L(t,e=!1){return e?`<button type="button" class="what mini" data-action="glossary" data-term="${t}" aria-label="What is this?">?</button>`:`<button type="button" class="what" data-action="glossary" data-term="${t}">What is this?</button>`}function et(t,e="Vinny “Numbers” Caputo"){return`<div class="vinny">
    ${Qe()}
    <div class="bubble">
      <span class="who">${e}</span>
      <p>${y(t)}</p>
    </div>
  </div>`}function la(){return'<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M9 18a3 3 0 1 1-2-2.83V5.7l10-2v8.47A3 3 0 1 1 15 14V6.1l-6 1.2V18z"/></svg>'}function ca(){const t=c.credit.score,e=re(),n=Te(Ce);return`<div class="drawer-card">
    <div class="drawer-head">
      <h2>The week you actually have</h2>
      <button type="button" class="icon-btn" data-action="money" aria-label="Close money">×</button>
    </div>
    <p class="lead">Salary ${d(k.salary)} a year. Take-home about <strong>${d(k.weeklyTakeHome)} a week</strong> after a plain tax estimate. ${L("takehome")}</p>
    <p class="fine">That is about ${d(ft())} a month. The salary is the rumor. The week is the truth.</p>
    <ul class="bills">
      ${ct.map(a=>`<li><span>${y(a.label)}</span><b>${d(a.amount)}</b></li>`).join("")}
      <li class="total"><span>Locked bills</span><b>${d(Ce)} / mo</b></li>
    </ul>
    <p class="fine">About ${d(n)} of every paycheck is already spoken for. The car has to live in what’s left, next to gas, insurance, and a life.</p>
    <ul class="bills">
      <li><span>Checking</span><b>${d(k.checking)}</b></li>
      <li><span>Savings</span><b>${d(k.savings)}</b></li>
      ${t?`<li><span>Credit ${L("credit")}</span><b>${t}${c.credit.cosign?` → ${e} with Ma`:""}</b></li>`:""}
    </ul>
    <p class="fine">About ${d(k.savings)} in savings. A chunk of it can be the down payment. Leave roughly ${d(P)} — two months of bills — and do not blow the pile on a spoiler.</p>
  </div>`}function rt(){const t=c.lastGrade;return`<section class="intro">
    <div class="sky">
      <p class="eyebrow">Route 17 · after the rain</p>
      <div class="neon" aria-hidden="true"><span>Dream</span> <span>Car</span></div>
    </div>
    <div class="stage">
      <div class="asphalt"></div>
      <div class="jalopy-drive">${Xt()}</div>
      <div class="hangtag"><span>Your trade</span><strong>${d(xe.trade)}</strong><em>${xe.year} ${y(xe.name)}</em></div>
    </div>
    <div class="intro-copy">
      <h1>Let's go car shopping!</h1>
      <p>${y(xe.line)} Checking ${d(k.checking)}. Savings ${d(k.savings)}. A ${d(k.salary)} salary that shows up as about ${d(k.weeklyTakeHome)} a week.</p>
      ${t?`<p class="last-deal">Last time Vinny called it a ${y(t.letter)} on the ${y(t.car)}.</p>`:""}
      <button type="button" class="btn primary xl" data-action="start">Step onto the lot</button>
      <button type="button" class="btn text" data-action="audio">${b.on?"Violin’s on":"A little violin, if you want it"}</button>
    </div>
  </section>`}function da(){const{score:t,cosign:e,boost:n,rolling:a}=c.credit,o=re(),i=e?o:t,r=t?kt(o):null,s=t?D(o):null;return`<section class="credit">
    <p class="eyebrow">Before the shiny things</p>
    <h1>${t?r.label:"Roll your credit."}</h1>
    <div class="odo ${a?"is-rolling":""}" aria-hidden="true">
      <span id="d0">${i?String(i)[0]:"–"}</span>
      <span id="d1">${i?String(i)[1]:"–"}</span>
      <span id="d2">${i?String(i)[2]:"–"}</span>
    </div>
    ${t&&e?`<p class="cosign-note">Your roll was ${t}. With Ma, the bank sees <strong>${o}</strong>.</p>`:""}
    <div class="what-row">${L("credit")}</div>
    ${et(t?e?Wn(n,o,t):qn(t):Nn())}
    ${t?`<p class="rate-preview">Money like yours starts near <strong>${s.toFixed(2)}% APR</strong> before anybody marks it up. ${L("apr")}</p>`:'<p class="fine center">The reel is weighted like life. Most people land in the 700s. A 675 and an 820 are both rare.</p>'}
    ${t?ha():""}
    <div class="stack">
      ${t?"":`<button type="button" class="btn primary xl" data-action="roll" ${a?"disabled":""}>Roll the dice</button>`}
      <button type="button" class="btn ${t?"primary xl":"ghost"}" data-action="to-lot" ${t?"":"disabled"}>See the cars</button>
    </div>
  </section>`}function ha(){if(c.credit.cosign)return`<article class="card cosign done">
      <h2>Ma’s on the note.</h2>
      <p>The rate moves. So does the family obligation. ${L("cosigner")}</p>
    </article>`;const t=c.credit.score<720;return`<article class="card cosign ${t?"hot":""}">
    <h2>${t?"The rate is going to bite.":"You can leave Ma out of this."}</h2>
    <p>${t?"Ask her to co-sign and the bank will pretend you are 50 to 75 points prettier. She is on the hook if you are not.":"A co-signer helps a thin score. Yours is not thin. Asking anyway puts her name on a car she does not drive."}</p>
    <button type="button" class="btn ${t?"primary":"ghost"}" data-action="cosign">Ask Mom to co-sign</button>
    <div class="what-row">${L("cosigner")}</div>
  </article>`}function ua(){const t=re(),e=c.credit.score<720&&!c.credit.cosign;return`<section class="lot">
    <header class="lot-head">
      <p class="eyebrow">Falco Motors · the row</p>
      <h1>Four cars. One paycheck.</h1>
      <p>Don’t fall in love before the number. Credit the bank will use: <strong>${t}</strong>.</p>
      ${e?'<button type="button" class="btn tiny" data-action="back-credit">Still time to ask Ma</button>':""}
    </header>
    <div class="lot-scroller" id="lot-scroller">
      ${Ie.map(n=>pa(n)).join("")}
    </div>
    <div class="lot-nav">
      <button type="button" class="icon-btn" data-action="lot-prev" aria-label="Previous car">‹</button>
      <div class="lot-dots" id="lot-dots">
        ${Ie.map((n,a)=>`<span class="lot-dot ${a===0?"is-on":""}" data-dot="${n.id}"></span>`).join("")}
      </div>
      <button type="button" class="icon-btn" data-action="lot-next" aria-label="Next car">›</button>
    </div>
  </section>`}function pa(t){const e=c.builds[t.id]||{paint:t.colors[0].id,topDown:!1,single:{wheels:"stock",roof:"none",tint:"none",top:"black",liner:"none",cover:"none",stance:"stock"},multi:{}},n=Ze(t,fa(e));return`<article class="lot-slide">
    <div class="lot-art">${Ue(t.id,"side",n,`lot${t.id}`)}</div>
    <p class="eyebrow">${y(t.maker)} · ${y(t.vibe)}</p>
    <h2>${y(t.name)}</h2>
    <p class="msrp">${d(t.msrp)} <span>MSRP</span> ${L("msrp")}</p>
    <p class="lot-line">${y(t.line)}</p>
    <p class="insure">Vinny’s insurance guess: ${d(t.insurance)}/mo. ${L("insurance")}</p>
    <button type="button" class="btn primary" data-action="pick" data-car="${t.id}">Build this one</button>
  </article>`}function fa(t){return{paint:t.paint,topDown:!!t.topDown,single:{wheels:"stock",roof:"none",tint:"none",top:"black",liner:"none",cover:"none",stance:"stock",...t.single},multi:{sport:[],truckt:[],breezepack:[],...t.multi}}}function ma(){const t=M(),e=v(t),n=be(t,e),a=ae(t,e),o=Ze(t,e);return`<section class="studio">
    <div class="studio-fixed">
      <div class="studio-title">
        <button type="button" class="btn tiny" data-action="back-lot">Lot</button>
        <div>
          <p class="eyebrow">${y(t.maker)}</p>
          <h1>${y(t.name)}</h1>
        </div>
      </div>
      <div class="hero" id="hero">
        <div class="plinth"></div>
        <div class="spotlight"></div>
        <div class="hero-art" id="hero-art">${Ue(t.id,W[c.view].id,o,"hero0")}</div>
        <div class="hero-tools">
          <button type="button" class="btn tiny" data-action="spin">Spin</button>
          ${t.id==="breeze"?`<button type="button" class="btn tiny" data-action="top">${e.topDown?"Raise the top":"Drop the top"}</button>`:""}
        </div>
        <p class="swipe-hint" id="swipe-hint" ${c.hintSeen?"hidden":""}>Swipe to turn it</p>
      </div>
      <div class="swatches" role="listbox" aria-label="Paint">
        ${t.colors.map(i=>`<button type="button" class="swatch ${e.paint===i.id?"is-on":""}" style="--c:${i.hex}" data-action="paint" data-paint="${i.id}" role="option" aria-label="${y(i.name)}" aria-pressed="${e.paint===i.id}"></button>`).join("")}
      </div>
      <p class="paint-label" id="paint-label">${y(a.name)}${a.price?` · +${d(a.price)}`:""}</p>
      <div class="view-dots">
        ${W.map((i,r)=>`<button type="button" class="view-dot ${r===c.view?"is-on":""}" data-action="view" data-view="${r}" aria-label="${i.label}"></button>`).join("")}
      </div>
      <div class="cats">
        ${Zt.filter(i=>ee(t.id,i.id).length).map(i=>`<button type="button" class="cat ${c.category===i.id?"is-on":""}" data-action="cat" data-cat="${i.id}">${y(i.label)}</button>`).join("")}
      </div>
    </div>
    <div class="studio-scroll" id="studio-scroll">
      <section class="cart" id="build-cart">${Ct(t,e)}</section>
      <div id="options">${tt(t,e)}</div>
      <div class="vinny studio-vinny">
        ${Qe()}
        <div class="bubble">
          <span class="who">Vinny, in your ear</span>
          <p id="vinny-tip-text">${y(ze(t,e))}</p>
        </div>
      </div>
    </div>
    <div class="dock">
      <div>
        <span class="k">Build price</span>
        <strong id="dock-price">${d(n.total)}</strong>
        <small id="dock-sub">${At(n)}</small>
      </div>
      <button type="button" class="btn primary" data-action="to-desk">See Ricky</button>
    </div>
  </section>`}function tt(t,e){const n=ee(t.id,c.category);return n.length?n.map(a=>`
    <section class="group">
      <h3>${y(a.label)}</h3>
      <p class="fine">${a.mode==="multi"?"Add more than one. They stack, and every one lands in the price.":"Pick one. This part of the car only wears a single choice."}</p>
      <div class="opts">
        ${a.options.map(o=>ya(a,o,e)).join("")}
      </div>
    </section>`).join(""):`<p class="empty">Nothing in this rack for the ${y(t.name)}.</p>`}function At(t){const e=t.lines.filter(a=>a.price>0).length,n=e?` · ${e} in the cart`:"";return`${d(t.msrp)} car · ${d(t.options)} options · ${d(t.warranty)} warranty${n}`}function Ct(t,e){const n=be(t,e),a=n.lines.filter(i=>i.price>0),o=a.reduce((i,r)=>i+r.price,0);return a.length?`<header class="cart-top">
      <h3>On the car</h3>
      <strong id="cart-total">${d(o)}</strong>
    </header>
    <ul class="cart-list">
      ${a.map(i=>`<li>
        <span>${y(i.name)}</span>
        <b>${d(i.price)}</b>
        <button type="button" class="trash" data-action="cart-remove" data-group="${y(i.group)}" data-id="${y(i.id)}" aria-label="Remove ${y(i.name)} from cart" title="Remove from cart">${It()}</button>
      </li>`).join("")}
    </ul>
    <p class="fine">Options ${d(n.options)} · warranty ${d(n.warranty)}. Same numbers as the dock.</p>`:'<p class="cart-empty">Nothing extra on the car yet. Some racks stack. A roof, a set of wheels, a warranty: one each.</p>'}function ya(t,e,n){const a=t.mode==="single"?n.single[t.id]===e.id:(n.multi[t.id]||[]).includes(e.id),o=t.mode==="single"&&e.id===t.options[0].id,i=e.price===0?"Included":`+${d(e.price)}`;let r="";return t.mode==="multi"?r=a?`${st(t.id,e)}<span class="on-car">In the cart</span>`:`<button type="button" class="btn tiny cart" data-action="cart-add" data-group="${t.id}" data-id="${e.id}">Add to cart</button>`:a&&o?r='<span class="on-car">On the car</span>':a?r=`${st(t.id,e)}<span class="on-car">On the car</span>`:r=`<button type="button" class="btn tiny" data-action="choose" data-group="${t.id}" data-id="${e.id}">Choose</button>`,`<article class="opt ${t.mode} ${a?"is-on":""}">
    <div class="opt-copy">
      <span class="opt-name">${y(e.name)}</span>
      <span class="opt-blurb">${y(e.blurb)}</span>
    </div>
    <span class="opt-price">${i}</span>
    <div class="opt-actions">${r}</div>
  </article>`}function st(t,e){return`<button type="button" class="trash" data-action="cart-remove" data-group="${t}" data-id="${e.id}" aria-label="Remove ${y(e.name)} from cart" title="Remove from cart">${It()}</button>`}function It(){return'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M9 3h6l1 2h5v2H3V5h5l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z"/><path fill="currentColor" d="M6 7h12l-1 13H7L6 7z" opacity=".35"/></svg>'}function ga(){const t=M(),e=v(t),n=K(t),{quote:a,priced:o}=Je(t,e,n),i=N(t),r=U(t),s=D(n.effectiveScore),l=ye(s),h=ee(t.id).find(m=>m.id==="warranty"),p=ie(t,n,e),f=Math.max(8,Math.round((1-Math.min(1,p.heat))*100)),g=xt[p.level]||"";return`<section class="desk">
    <div class="desk-scroll">
      <div class="ricky" id="ricky" data-stress="${p.level}">
        <div class="ricky-face">
          ${On()}
          <span class="sweat" aria-hidden="true"></span>
          <span class="sweat b" aria-hidden="true"></span>
        </div>
        <div>
          <span class="who">Ricky Falco · Falco Motors</span>
          <p id="ricky-line" aria-live="polite">${y($t(t,n,e))}</p>
          <p id="ricky-whine" class="whine" ${g?"":"hidden"}>${y(g)}</p>
          <p id="ricky-yelp" class="yelp" aria-hidden="true"></p>
        </div>
        <div class="margin-meter">
          <span>His margin</span>
          <div class="margin-track"><i id="margin-fill" style="width:${f}%"></i></div>
        </div>
      </div>
      <p class="desk-car">${y(t.name)} · build ${d(o.total)} before tax</p>
      <div id="pressure">${Bt(a)}</div>
      <div id="budget-mount">${Rt(a)}</div>
      <div id="tco-mount">${Xe(t,a)}</div>

      ${de({label:"Car price",term:"msrp",readoutId:"price-readout",readout:d(n.price),name:"price",min:i,max:r,step:50,value:n.price,left:`Strong ${d(i)}`,right:`His open ${d(r)}`,nudge:"Knock it down"})}
      ${de({label:"Trade for the jalopy",term:"trade",readoutId:"trade-readout",readout:d(n.trade),name:"trade",min:C.min,max:C.max,step:100,value:n.trade,left:`Lowball ${d(C.min)}`,right:`Heroic ${d(C.max)}`,nudge:"Make him pay",note:`Fair lives around ${d(C.baseline)}. He opened at ${d(C.open)}.`})}
      ${de({label:"APR",term:"apr",readoutId:"apr-readout",readout:`${n.apr.toFixed(2)}%`,name:"apr",min:s,max:l,step:.01,value:n.apr,left:`You earned ${s.toFixed(2)}%`,right:`His quote ${l.toFixed(2)}%`,nudge:"Take your rate",note:s===l?"You are already at the top of the 6–8% band. That is the score talking.":"The gap between these two numbers is the quiet tip."})}

      <div class="lever">
        <div class="lever-top">
          <span>Term ${L("term")}</span>
        </div>
        <div class="seg">
          ${[60,72,84].map(m=>`<button type="button" class="${n.term===m?"is-on":""}" data-action="term" data-term="${m}" aria-pressed="${n.term===m}">${m/12} yr<span>${m} mo</span></button>`).join("")}
        </div>
        <p class="fine">Shorter costs more each month and less interest in total. ${L("amortization")}</p>
      </div>

      <div class="lever">
        <div class="lever-top">
          <span>Warranty ${L("warranty")}</span>
        </div>
        <div class="seg wrap">
          ${h.options.map(m=>`<button type="button" class="${e.single.warranty===m.id?"is-on":""}" data-action="warranty" data-warranty="${m.id}" aria-pressed="${e.single.warranty===m.id}">${y(m.name.replace(", "," · "))}<span>${m.price?d(m.price):"Included"}</span></button>`).join("")}
        </div>
      </div>

      ${de({label:"Down from checking",term:"down",readoutId:"check-readout",readout:`${d(n.downChecking)} down · ${d(k.checking-n.downChecking)} left`,name:"checking",min:0,max:k.checking,step:500,value:n.downChecking,left:"$0",right:d(k.checking),nudge:""})}
      ${de({label:"Down from savings",term:"down",readoutId:"save-readout",readout:Lt(n.downSavings),name:"savings",min:0,max:k.savings,step:500,value:n.downSavings,left:"None yet",right:d(k.savings),nudge:"",warn:St(n.downSavings),note:`Leave about ${d(P)}, two months of bills. The rest can go on the hood.`})}

      <div id="sheet-mount">${Ft(t,n,o,a)}</div>
      <div class="vinny">
        ${Qe()}
        <div class="bubble">
          <span class="who">Vinny “Numbers” Caputo</span>
          <p id="vinny-desk-text">${y(c.advice||vt(t,n,a))}</p>
        </div>
      </div>
      <button type="button" class="btn ghost wide" data-action="ask">Ask Vinny what he’d do</button>
      <button type="button" class="btn text" data-action="back-studio">Back to the studio</button>
    </div>
    <div class="dock">
      <div>
        <span class="k">Monthly ${L("payment")}</span>
        <strong id="dock-pay" class="zone-${a.weeklyLeft<0?"bad":Pe(a.paymentShare)}">${d(a.payment,!0)}</strong>
        <small id="dock-sub">${n.term} mo · ${n.apr.toFixed(2)}% · ${d(a.weeklyLeft)} left this week</small>
      </div>
      <button type="button" class="btn primary" data-action="shake">Shake on it</button>
    </div>
  </section>`}function de(t){return`<div class="lever ${t.warn?"warn":""}">
    <div class="lever-top">
      <span>${t.label} ${L(t.term)}</span>
      <strong id="${t.readoutId}">${t.readout}</strong>
    </div>
    <input type="range" data-lever="${t.name}" min="${t.min}" max="${t.max}" step="${t.step}" value="${t.value}" aria-label="${y(t.label)}">
    <div class="lever-scale"><span>${t.left}</span><span>${t.right}</span></div>
    ${t.note?`<p class="fine">${t.note}</p>`:""}
    ${t.nudge?`<button type="button" class="btn tiny" data-action="nudge" data-nudge="${t.name}">${t.nudge}</button>`:""}
  </div>`}function Bt(t){return t.weeklyLeft<0?'<p class="banner bad">This wrecks the week. Vinny will not clap.</p>':t.paymentShare>.15?'<p class="banner warn">Over the 15% line. Pretty payment, heavy life.</p>':'<p class="banner ok">Under the line. The week still has air in it.</p>'}function Rt(t){const e=t.weeklyLeft<0?"bad":Pe(t.paymentShare),n=.4,a=Math.max(0,Math.min(100,t.paymentShare/n*100)),o=.15/n*100;return`<div class="budget">
    <div class="budget-top">
      <span>Payment vs take-home</span>
      <strong class="zone-${e}">${me(t.paymentShare)} of ${d(t.monthlyTake)}/mo</strong>
    </div>
    <div class="meter" data-zone="${e}" style="--p:${a.toFixed(1)}%; --mark:${o}%"><span></span></div>
    <p class="fine">White mark is 15% of take-home. Stay left of it. Insurance is not inside that mark — it is in the week, below.</p>
    <ul class="week">
      <li><span>This week’s pay</span><b>${d(k.weeklyTakeHome)}</b></li>
      <li><span>Bills, already locked</span><b>−${d(t.weeklyBills)}</b></li>
      <li><span>Insurance, estimated</span><b>−${d(t.weeklyIns)}</b></li>
      <li><span>This car, per week</span><b>−${d(t.weeklyPay)}</b></li>
      <li class="left zone-${t.weeklyLeft<80?"bad":t.weeklyLeft<160?"warn":"ok"}"><span>Left for everything else</span><b>${d(t.weeklyLeft)}</b></li>
    </ul>
  </div>`}function Ft(t,e,n,a){const o=n.lines.filter(r=>r.price>0),i=[["MSRP",d(t.msrp),"msrp"],["Your price",d(e.price),"msrp"],["Options",d(n.options),null],["Warranty",d(n.warranty),"warranty"],["Doc fee",d(a.doc),"docfee"],["Title & plates",d(a.title),null],["Sales tax",_(a.tax),"tax"],["Trade equity",`−${d(a.trade)}`,"trade"],["Out the door",_(a.otd),"otd"],["Down payment",`−${d(a.down)}`,"down"],["Amount financed",_(a.financed),"financed",!0],["Interest, whole term",_(a.interest),"interest"]];return`<section class="sheet-card">
    <header>
      <h3>The real sheet</h3>
      ${L("otd")}
    </header>
    <p class="fine">Tax here is ${me(.06625,3)} of the price plus warranty, after the trade comes off. ${L("negative")}</p>
    <ul class="rows">
      ${i.map(([r,s,l,h])=>`<li class="${h?"strong":""}"><span>${y(r)}${l?` ${L(l,!0)}`:""}</span><b>${s}</b></li>`).join("")}
    </ul>
    ${o.length?`<details>
      <summary>${o.length} priced ${o.length===1?"choice":"choices"}</summary>
      <ul class="rows slim">
        ${o.map(r=>`<li><span>${y(r.name)}</span><b>${d(r.price)}</b></li>`).join("")}
      </ul>
    </details>`:'<p class="fine">No priced options. Bone stock is a position.</p>'}
    <p class="fine">Insurance estimate ${d(ht(t,v(t)))}/mo is in the week, not in the loan. ${L("principal")}</p>
  </section>`}function ba(){const t=c.grade,e=M();if(!t)return'<section class="grade"><p>No deal on the table.</p><button type="button" class="btn primary" data-action="another">Back to the lot</button></section>';const n=t.quote,a=t.score<80,o=t.letter.startsWith("A")||t.letter==="B"?"good":t.letter==="C"?"mid":"bad",i=t.letter==="A+"?"win-max":t.letter==="A"?"win-high":t.letter==="B"?"win-mid":t.letter==="C"?"win-low":t.letter==="D"?"fail-low":"fail-max",r=t.letter==="A+"?26:t.letter==="A"?18:t.letter==="B"?12:t.letter==="C"?5:0,s=r?`<div class="confetti" aria-hidden="true">${Array.from({length:r},(h,p)=>`<i style="--i:${p}"></i>`).join("")}</div>`:"",l=t.letter==="A+"||t.letter==="A"?'<p class="cameo-note">Skree &amp; Dumpling heard.</p>':t.letter==="B"?'<p class="grade-note">A modest cheer.</p>':t.letter==="C"?'<p class="grade-note">A small clap.</p>':t.letter==="F"?'<p class="wah-label">Wah-wah-wah.</p>':t.letter==="D"?'<p class="wah-label">Wah-wah.</p>':"";return`<section class="grade ${i}">
    ${s}
    <p class="eyebrow">${y(e.name)} · Falco Motors</p>
    <div class="letter tone-${o}">${y(t.letter)}</div>
    <h1>${y(t.title)}</h1>
    ${l}
    <p class="score-num">${t.score} out of 100</p>
    ${et(t.narrative)}
    ${Xe(e,n)}
    <ul class="recap">
      <li><span>Payment</span><b>${d(n.payment,!0)}/mo</b></li>
      <li><span>Out the door</span><b>${_(n.otd)}</b></li>
      <li><span>Financed</span><b>${_(n.financed)}</b></li>
      <li><span>Interest</span><b>${_(n.interest)}</b></li>
      <li><span>Term</span><b>${n.term} mo @ ${n.apr.toFixed(2)}%</b></li>
      <li><span>Left this week</span><b class="zone-${n.weeklyLeft<80?"bad":"ok"}">${d(n.weeklyLeft)}</b></li>
    </ul>
    <ul class="notes">
      ${t.notes.map(h=>`<li class="${h.tone}">${y(h.text)}</li>`).join("")}
    </ul>
    <div class="stack">
      <button type="button" class="btn ${a?"primary":"ghost"}" data-action="tweak">Tweak this deal</button>
      <button type="button" class="btn ${a?"ghost":"primary"}" data-action="another">Shop another car</button>
      <button type="button" class="btn text" data-action="restart">Start over</button>
    </div>
  </section>`}function wa(){return Jn(M())}let Le=null,Se=null;function X(){c.spinning=!1,Le&&(clearInterval(Le),Le=null)}function F(t){c.screen==="studio"&&t!=="studio"&&X(),c.screen=t,c.advice=t==="negotiate"?c.advice:"",_e(),Mt(),t!=="grade"&&Ln(),t==="negotiate"&&K(),ke();const e=document.getElementById("screen");e&&(e.scrollTop=0),t==="lot"&&Pa(),t==="grade"&&c.grade&&c.gradeCue&&(c.gradeCue=!1,ka(c.grade.letter))}function Pt(t){if(c.soundPref==="off")return;const e=()=>{b.ctx&&b.sfx&&t()};b.ctx&&b.ctx.state==="running"?e():b.ensure().then(e).catch(()=>{})}function Re(t,e,n,a,o){const i=ge(n,e),r=Vn(t,e,n,a,i,o);r.ching&&ra(r.axes),r.moan&&qe(r.mood.level),r.fireworks&&bt({intensity:3,duo:!0}),Pt(()=>{if(r.fireworks){b.fanfare(1),b.chaChing();return}r.ching&&b.chaChing(),r.moan&&b.moan(r.mood.level)})}function ka(t){const e=t==="A+"||t==="A",n=t==="A+"?3:t==="A"?2:t==="B"?1:0;n&&bt({intensity:n,duo:e}),Pt(()=>{t==="A+"||t==="A"?b.fanfare(t==="A+"?1:.75):t==="B"?b.cheer():t==="C"?b.spark():t==="D"?b.wah(1):b.wah(2)})}async function $a(){try{b.on?b.stop():await b.start()}catch{b.stop()}c.soundPref=b.on?"on":"off",c.screen==="intro"?ke():Xn()}async function va(){if(c.soundPref!=="off")try{await b.start()}catch{}F("credit")}function xa(){var r;if(c.credit.score||c.credit.rolling)return;c.credit.rolling=!0;const t=jn(),e=window.matchMedia("(prefers-reduced-motion: reduce)").matches,n=document.querySelector('[data-action="roll"]');n&&(n.disabled=!0),(r=document.querySelector(".odo"))==null||r.classList.add("is-rolling");const a=performance.now(),o=e?0:1650,i=s=>{(o===0?1:(s-a)/o)<1?(oa(675+Math.floor(Math.random()*146)),b.on&&Math.random()<.4&&b.tick(),requestAnimationFrame(i)):(c.credit.score=t,c.credit.rolling=!1,b.on&&b.land(),ke())};requestAnimationFrame(i)}function Ta(){!c.credit.score||c.credit.cosign||(c.credit.cosign=!0,c.credit.boost=50+Math.floor(Math.random()*26),c.deals={},ke())}function Ma(t){c.carId=t,c.category="sound",c.view=0,c.hintSeen=!1,c.studioNote="",X(),v(),F("studio")}function La(){if(c.spinning){X(),O();return}c.spinning=!0,c.hintSeen=!0,O(),Le=setInterval(()=>{c.view=(c.view+1)%W.length,O()},980)}function Sa(t){const e=M(),n=v(e),a=K(e),o=ge(a,n);if(t==="price"&&(a.price=V(a.price-500,N(e),U(e))),t==="trade"&&(a.trade=V(a.trade+200,C.min,C.max)),t==="apr"){const i=D(re()||a.effectiveScore);a.apr=V(Math.round((a.apr-.1)*100)/100,i,ye(i))}c.advice="",Re(e,n,a,o,"nudge"),fe({sliders:!0})}function Aa(t){const e=M(),n=v(e),a=K(e),o=ge(a,n),i=Number(t.value),r=t.dataset.lever;r==="price"&&(a.price=i),r==="trade"&&(a.trade=i),r==="apr"&&(a.apr=i),r==="checking"&&(a.downChecking=i),r==="savings"&&(a.downSavings=i),c.advice="",Re(e,n,a,o,"slider"),fe()}function zt(t){t&&(c.studioNote=t.tip||`${t.name} is on the car. It shows up in the build price.`)}function Ca(t){if(!t)return;const e=t.price?` ${d(t.price)} comes off the build.`:"";c.studioNote=`${t.name} is off the car.${e}`}function Ia(t){const e=M(),n=v(e);$n(n,t.dataset.group,t.dataset.id)&&(zt(pt(e,t.dataset.group,t.dataset.id)),O({options:!0}))}function Ba(t){const e=M(),n=v(e),a=xn(e,n,t.dataset.group,t.dataset.id);a&&(Ca(a),O({options:!0}))}function Ra(t){const e=M(),n=v(e);vn(n,t.dataset.group,t.dataset.id)&&(zt(pt(e,t.dataset.group,t.dataset.id)),O({options:!0}))}function Fa(){const t=M(),e=Kn(t,v(t),K(t));c.grade=e,c.gradeCue=!0,Gn(e,t),F("grade")}function Pa(){const t=document.getElementById("lot-scroller");!t||t.dataset.bound||(t.dataset.bound="1",t.addEventListener("scroll",()=>{const e=Math.round(t.scrollLeft/Math.max(1,t.clientWidth));document.querySelectorAll(".lot-dot").forEach((n,a)=>n.classList.toggle("is-on",a===e))},{passive:!0}))}function We(t){const e=document.getElementById("lot-scroller");e&&e.scrollBy({left:t*e.clientWidth,behavior:"smooth"})}function za(t){const e=t.target.closest("[data-action]");if(!e||e.disabled)return;const n=e.dataset.action;if(n==="glossary"){t.preventDefault(),ta(e.dataset.term);return}const a={"close-sheet":()=>_e(),money:()=>ea(),audio:()=>$a(),start:()=>va(),roll:()=>xa(),cosign:()=>Ta(),"to-lot":()=>{c.credit.score&&F("lot")},"back-credit":()=>F("credit"),pick:()=>Ma(e.dataset.car),"lot-prev":()=>We(-1),"lot-next":()=>We(1),"back-lot":()=>F("lot"),cat:()=>{c.category=e.dataset.cat,c.studioNote="",na()},"cart-add":()=>Ia(e),"cart-remove":()=>Ba(e),choose:()=>Ra(e),paint:()=>{const o=M(),i=v(o);i.paint=e.dataset.paint;const r=o.colors.find(s=>s.id===i.paint);r!=null&&r.joke?c.studioNote="Gold flake. Seventy-five hundred so the car can glitter. Your nonna would take the spatula away from you.":r!=null&&r.price?c.studioNote=`${r.name} is a special paint. Pretty. It does not make the car worth more when you sell it.`:r&&(c.studioNote=`${r.name} is included. The payment did not even look up.`),O({options:!0})},view:()=>{X(),c.hintSeen=!0,c.view=Number(e.dataset.view),O()},spin:()=>La(),top:()=>{const o=v();o.topDown=!o.topDown,c.studioNote="",aa()},"to-desk":()=>F("negotiate"),"back-studio":()=>F("studio"),nudge:()=>Sa(e.dataset.nudge),term:()=>{const o=M(),i=v(o),r=K(o),s=ge(r,i);r.term=Number(e.dataset.term),c.advice="",Re(o,i,r,s,"term"),fe()},warranty:()=>{const o=M(),i=v(o),r=K(o),s=ge(r,i);i.single.warranty=e.dataset.warranty,r.warrantySync=e.dataset.warranty,c.advice="",Re(o,i,r,s,"warranty"),fe()},ask:()=>{c.advice=wa(),fe()},shake:()=>Fa(),tweak:()=>F("negotiate"),another:()=>{c.grade=null,F("lot")},restart:()=>{X();const o=c.lastGrade;Yn(),c.lastGrade=o,F("intro")}};a[n]&&a[n]()}function Ha(t){if(t.key==="Escape"){_e(),Mt();return}c.screen==="studio"&&(t.key==="ArrowRight"||t.key==="ArrowLeft")&&(X(),c.hintSeen=!0,c.view=(c.view+(t.key==="ArrowRight"?1:-1)+W.length)%W.length,O()),c.screen==="lot"&&(t.key==="ArrowRight"||t.key==="ArrowLeft")&&We(t.key==="ArrowRight"?1:-1)}function Ea(t){t.target.closest("#hero")&&(Se=t.clientX)}function Va(t){if(Se==null)return;const e=t.clientX-Se;Se=null,!(c.screen!=="studio"||Math.abs(e)<36)&&(X(),c.hintSeen=!0,c.view=(c.view+(e<0?1:-1)+W.length)%W.length,O())}document.addEventListener("click",za);document.addEventListener("input",t=>{const e=t.target.closest("[data-lever]");!e||c.screen!=="negotiate"||Aa(e)});document.addEventListener("keydown",Ha);document.addEventListener("pointerdown",Ea);document.addEventListener("pointerup",Va);Dn();yt();ke();
