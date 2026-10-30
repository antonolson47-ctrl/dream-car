(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const pt=66,Se=60/pt,Fe=[[74,1.5],[76,.5],[77,1],[74,1],[72,1],[74,1],[69,2],[70,1],[72,1],[74,1],[77,1],[76,1.5],[74,.5],[72,2],[74,1],[77,1],[81,2],[79,1],[77,1],[74,1],[70,1],[70,1.5],[72,.5],[74,2],[69,3],[74,1]],ft=[[50,53,57],[50,53,57],[46,50,53],[53,57,60],[50,53,57],[55,58,62],[46,50,53],[50,53,57]],mt=[38,38,34,41,38,43,34,38];function Ae(e){return 440*2**((e-69)/12)}class yt{constructor(){this.ctx=null,this.master=null,this.on=!1,this.timer=null,this.cursor=0,this.nextTime=0,this.barBeat=0}async start(){if(this.on)return;const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx||(this.ctx=new t,this.buildGraph()),await this.ctx.resume(),this.on=!0,this.nextTime=this.ctx.currentTime+.08,this.cursor=0,this.barBeat=0,this.schedule())}buildGraph(){const t=this.ctx;this.master=t.createGain(),this.master.gain.value=.42;const a=t.createBiquadFilter();a.type="lowpass",a.frequency.value=4200,a.Q.value=.4;const o=t.createDynamicsCompressor();o.threshold.value=-18,o.knee.value=18,o.ratio.value=2.2,o.attack.value=.02,o.release.value=.25;const n=t.createGain();n.gain.value=.28;const i=t.createGain();i.gain.value=.82;const r=t.createDelay(1);r.delayTime.value=.29;const d=t.createDelay(1);d.delayTime.value=.47;const c=t.createGain();c.gain.value=.28;const h=t.createBiquadFilter();h.type="lowpass",h.frequency.value=2200,this.bus=t.createGain(),this.bus.gain.value=1,this.bus.connect(i),this.bus.connect(r),r.connect(h),h.connect(d),d.connect(c),c.connect(r),h.connect(n),i.connect(a),n.connect(a),a.connect(o),o.connect(this.master),this.master.connect(t.destination)}stop(){this.on=!1,this.timer&&(clearTimeout(this.timer),this.timer=null)}async toggle(){return this.on?(this.stop(),!1):(await this.start(),this.on)}schedule(){if(!this.on||!this.ctx)return;const t=this.ctx.currentTime+1.4;let a=0;for(;this.nextTime<t&&a<32;){a+=1;const[o,n]=Fe[this.cursor],i=n*Se;this.violin(this.nextTime,o,i*.94);const r=gt(this.cursor);if(r%4===0){const d=r/4%8;this.pad(this.nextTime,ft[d],Se*4*.98),this.bass(this.nextTime,mt[d],Se*3.2)}this.nextTime+=i,this.cursor=(this.cursor+1)%Fe.length}this.timer=setTimeout(()=>this.schedule(),400)}violin(t,a,o){const n=this.ctx,i=Ae(a),r=n.createOscillator(),d=n.createOscillator(),c=n.createBiquadFilter(),h=n.createGain(),p=n.createGain(),w=n.createOscillator(),m=n.createGain();r.type="sawtooth",r.frequency.setValueAtTime(i,t),d.type="triangle",d.frequency.setValueAtTime(i*2,t),p.gain.value=.07,w.type="sine",w.frequency.value=5.3,m.gain.setValueAtTime(0,t),m.gain.linearRampToValueAtTime(i*.0045,t+.28),w.connect(m),m.connect(r.frequency),c.type="lowpass",c.Q.value=.65,c.frequency.setValueAtTime(780,t),c.frequency.linearRampToValueAtTime(1680,t+.14),c.frequency.linearRampToValueAtTime(1240,t+o);const k=.075;h.gain.setValueAtTime(1e-4,t),h.gain.exponentialRampToValueAtTime(k,t+.09),h.gain.exponentialRampToValueAtTime(k*.72,t+.24);const A=Math.max(t+.26,t+o-.16);h.gain.setValueAtTime(k*.72,A),h.gain.exponentialRampToValueAtTime(1e-4,t+o+.05),r.connect(c),d.connect(p),p.connect(c),c.connect(h),h.connect(this.bus),r.start(t),d.start(t),w.start(t);const b=t+o+.08;r.stop(b),d.stop(b),w.stop(b),r.onended=()=>{r.disconnect(),d.disconnect(),c.disconnect(),h.disconnect(),w.disconnect(),m.disconnect(),p.disconnect()}}pad(t,a,o){const n=this.ctx;for(const i of a){const r=n.createOscillator(),d=n.createGain();r.type="triangle",r.frequency.value=Ae(i),r.detune.value=i%2===0?-6:6,d.gain.setValueAtTime(1e-4,t),d.gain.exponentialRampToValueAtTime(.018,t+.4),d.gain.exponentialRampToValueAtTime(1e-4,t+o),r.connect(d),d.connect(this.bus),r.start(t),r.stop(t+o+.05),r.onended=()=>{r.disconnect(),d.disconnect()}}}bass(t,a,o){const n=this.ctx,i=n.createOscillator(),r=n.createGain();i.type="sine",i.frequency.value=Ae(a),r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.045,t+.05),r.gain.exponentialRampToValueAtTime(1e-4,t+o),i.connect(r),r.connect(this.bus),i.start(t),i.stop(t+o+.02),i.onended=()=>{i.disconnect(),r.disconnect()}}tick(){if(!this.on||!this.ctx)return;const t=this.ctx,a=t.createOscillator(),o=t.createGain();a.type="triangle",a.frequency.value=880;const n=t.currentTime;o.gain.setValueAtTime(.03,n),o.gain.exponentialRampToValueAtTime(1e-4,n+.05),a.connect(o),o.connect(this.master),a.start(n),a.stop(n+.06)}land(){if(!this.on||!this.ctx)return;const t=this.ctx,a=t.createOscillator(),o=t.createGain();a.type="sine",a.frequency.value=392;const n=t.currentTime;o.gain.setValueAtTime(.04,n),o.gain.exponentialRampToValueAtTime(1e-4,n+.18),a.connect(o),o.connect(this.master),a.start(n),a.stop(n+.2)}}function gt(e){let t=0;for(let a=0;a<e;a+=1)t+=Fe[a][1];return t}const v=new yt;function f(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function s(e,t=!1){return(Number.isFinite(e)?e:0).toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:t?2:0,minimumFractionDigits:t?2:0})}function K(e){const t=Number.isFinite(e)?e:0,a=Math.abs(t-Math.round(t))<.001;return s(t,!a)}function se(e,t=1){return`${(e*100).toFixed(t)}%`}function Ze(e,t){return Math.round(e/t)*t}function O(e,t,a){return Math.min(a,Math.max(t,e))}function be(e){const t=e.replace("#",""),a=parseInt(t.length===3?t.split("").map(o=>o+o).join(""):t,16);return[a>>16&255,a>>8&255,a&255]}function bt(e,t,a){const o=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${o(e)}${o(t)}${o(a)}`}function Ce(e,t,a){const o=be(e),n=be(t);return bt(o[0]+(n[0]-o[0])*a,o[1]+(n[1]-o[1])*a,o[2]+(n[2]-o[2])*a)}function wt(e){const[t,a,o]=be(e).map(n=>{const i=n/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*a+.0722*o}const y={checking:8e3,savings:15e3,salary:7e4,weeklyTakeHome:1010},qe=[{id:"housing",label:"Housing",amount:1450},{id:"food",label:"Food",amount:380},{id:"phone",label:"Phone",amount:85},{id:"utilities",label:"Utilities",amount:160},{id:"misc",label:"Misc",amount:120}],we=qe.reduce((e,t)=>e+t.amount,0),P=we*2,Ie={doc:599,title:385,taxRate:.06625},R={baseline:4500,open:3600,min:3200,max:5600},fe={name:"Cumberland Shadow",year:1998,trade:4500,line:"The paint is a suggestion. The heater is a rumor. It runs."},ke=[{id:"stallion",name:"Stallion GT",maker:"Vittorio",vibe:"Sports coupe",line:"A low red problem. Fast, loud, and allergic to budgets.",msrp:72e3,markup:.05,room:.04,insurance:310,running:340,hot:!0,colors:[{id:"rosso",name:"Rosso Notte",hex:"#8f1d2c",price:0},{id:"nero",name:"Nero Assoluto",hex:"#141414",price:0},{id:"bianco",name:"Bianco Perla",hex:"#f3f0e8",price:595,pearl:!0},{id:"argento",name:"Argento",hex:"#c5c8ce",price:0},{id:"verde",name:"Verde Bosco",hex:"#1c3d2e",price:0},{id:"blu",name:"Blu Notte",hex:"#152743",price:0},{id:"giallo",name:"Giallo Modena",hex:"#e2b31f",price:0},{id:"arancio",name:"Arancio",hex:"#e06a1f",price:395},{id:"matte",name:"Matte Grafite",hex:"#3c3f44",price:2400,matte:!0},{id:"flake",name:"Nonna Gold Flake",hex:"#e0b03a",price:7500,joke:!0,pearl:!0}]},{id:"harbor",name:"Harbor Hybrid",maker:"Northline",vibe:"Daily hybrid",line:"Gets you there and home without introducing itself to the whole block.",msrp:29e3,markup:.02,room:.1,insurance:128,running:115,colors:[{id:"glacier",name:"Glacier White",hex:"#f4f7f8",price:0},{id:"silver",name:"Silver Mist",hex:"#cfd3d6",price:0},{id:"harbor",name:"Harbor Blue",hex:"#3e6f8c",price:0},{id:"graphite",name:"Graphite",hex:"#3a3d40",price:0},{id:"signal",name:"Signal Red",hex:"#b4232c",price:0},{id:"sage",name:"Sage",hex:"#6d7f62",price:0},{id:"midnight",name:"Midnight",hex:"#16181c",price:0},{id:"sand",name:"Sand",hex:"#cbb99a",price:0},{id:"teal",name:"Deep Teal",hex:"#1f4f4a",price:395},{id:"fog",name:"Pearl Fog",hex:"#e7e4dc",price:595,pearl:!0}]},{id:"ironhorn",name:"Ironhorn 1500",maker:"Cinder",vibe:"Full-size truck",line:"A truck with opinions. The wheels can cost as much as a vacation.",msrp:52e3,markup:.035,room:.07,insurance:195,running:275,colors:[{id:"summit",name:"Summit White",hex:"#f2f3f4",price:0},{id:"black",name:"Black",hex:"#1a1a1a",price:0},{id:"silver",name:"Billet Silver",hex:"#b7bcc2",price:0},{id:"redrock",name:"Red Rock",hex:"#8e2a24",price:0},{id:"patriot",name:"Work Blue",hex:"#243e66",price:0},{id:"olive",name:"Olive Duty",hex:"#4d5538",price:0},{id:"bronze",name:"Bronze",hex:"#7a5a3a",price:450},{id:"concrete",name:"Concrete",hex:"#8d9094",price:0},{id:"orange",name:"Safety Orange",hex:"#e4571b",price:650},{id:"tactical",name:"Matte Tactical",hex:"#2e3230",price:2200,matte:!0}]},{id:"breeze",name:"Breeze Convertible",maker:"Marlow",vibe:"Drop-top",line:"Sun on your arms, math in the glovebox. The top is free. The payment is not.",msrp:38e3,markup:.025,room:.09,insurance:172,running:175,colors:[{id:"cloud",name:"Cloud White",hex:"#f7f4ef",price:0},{id:"black",name:"Black",hex:"#1c1c1c",price:0},{id:"aqua",name:"Aqua",hex:"#3aa8b5",price:0},{id:"coral",name:"Coral",hex:"#e07a62",price:0},{id:"lemon",name:"Lemon",hex:"#e6c84a",price:0},{id:"navy",name:"Navy",hex:"#1c2a4a",price:0},{id:"silver",name:"Silver",hex:"#d5d8dc",price:0},{id:"burgundy",name:"Burgundy",hex:"#6e2434",price:0},{id:"mint",name:"Mint",hex:"#b7d9c6",price:350},{id:"skypearl",name:"Sky Pearl",hex:"#d5e4f2",price:595,pearl:!0}]}],D="all";function u(e){return{cars:D,tag:"fluff",tip:"",...e}}const kt=[{id:"sound",category:"sound",label:"Sound",mode:"single",cars:D,options:[u({id:"base",name:"Lot radio",price:0,tag:"included",blurb:"Four speakers and the road. Already in the car.",tip:"Leave it. You can hear the engine. That was the idea."}),u({id:"premium",name:"Premium 8-speaker",price:890,tag:"smart",blurb:"A real amp and clearer highs. You will actually notice this one.",tip:"Eight hundred and ninety. If you listen to music every day, this is the one I allow."}),u({id:"bass",name:"Booming bass package",price:1450,tag:"fluff",blurb:"A sealed sub behind the seat. The block will know your chorus.",tip:"Bass is fun for a week. Then it is a rattle you financed."}),u({id:"thumper",name:'Trunk-thumper 12"',price:2200,tag:"fluff",blurb:"One big sub, zero trunk. Groceries ride in the back seat.",tip:"Twenty-two hundred so the trunk can thump. Where do the groceries go, genius?"}),u({id:"hall",name:"Concert hall",price:3800,tag:"fluff",blurb:"Fourteen speakers and a tuning session. Priced like a used motorcycle.",tip:"Concert hall money on a daily driver. The orchestra is not coming. You are going to work."}),u({id:"scala",name:"La Scala in the trunk",price:9500,tag:"joke",blurb:"Opera horns, a velvet grille, and a tenor who does not exist.",tip:"Nine and a half grand so the trunk can sing. Your neighbors will call the cops and the bank."})]},{id:"mats",category:"interior",label:"Floor mats",mode:"single",cars:D,options:[u({id:"paper",name:"Dealer paper mats",price:0,tag:"included",blurb:"Thin, slippery, and in the trash by November.",tip:"Paper mats are a suggestion. Spend the two hundred."}),u({id:"weather",name:"All-weather mats",price:220,tag:"smart",blurb:"Rubber trays that catch the slush, the coffee, the whole winter.",tip:"Two hundred bucks. You will use them every time it rains. This is the good kind of spending."}),u({id:"carpet",name:"Carpet logo mats",price:185,tag:"fluff",blurb:"Plush, embroidered, and afraid of a puddle.",tip:"Carpet mats look nice in the brochure. One rainstorm and they look like a crime scene."}),u({id:"luxury",name:"Luxury leather mats",price:640,tag:"fluff",blurb:"Stitched hides for the floor. The floor does not appreciate art.",tip:"Six hundred dollars of leather where your boots go. I love you, but no."})]},{id:"leather",category:"interior",label:"Seats",mode:"single",cars:D,options:[u({id:"std",name:"Standard seats",price:0,tag:"included",blurb:"What the car comes with. Cloth on the daily drivers, leather on the Stallion.",tip:"Standard seats hold you up. That is the job."}),u({id:"leather",name:"Leather seating",price:1900,tag:"fluff",cars:["harbor","breeze","ironhorn"],blurb:"Hides instead of cloth. Smells like a new wallet for a month.",tip:"Nineteen hundred to change the upholstery. Nice. Not necessary. Do not pretend it is necessary."}),u({id:"quilt",name:"Diamond-stitch leather",price:2400,tag:"fluff",cars:["stallion"],blurb:"The GT is already leather. This is the quilted, show-off version.",tip:"The car already has leather. You are paying for diamonds in the stitch. Ricky loves this one."}),u({id:"quilt2",name:"Quilted leather upgrade",price:2800,tag:"fluff",cars:["harbor","breeze"],blurb:"Diamond stitching on a car that also hauls groceries.",tip:"Quilted leather on a commuter. You are dressing the car for a party it does not attend."})]},{id:"comfort",category:"interior",label:"Cabin",mode:"multi",cars:D,options:[u({id:"heat",name:"Seat heaters",price:480,tag:"smart",blurb:"Warm seats on a cold morning. They earn their keep in January.",tip:"Seat heaters in this climate are not a toy. Four eighty. I will allow it."}),u({id:"vent",name:"Ventilated seats",price:1150,tag:"fluff",blurb:"A little air through the leather when the summer sits on you.",tip:"Ventilated seats are lovely. They are also a thousand dollars of fan."}),u({id:"wheel",name:"Heated steering wheel",price:275,tag:"smart",blurb:"Your hands stop suffering at red lights.",tip:"Two seventy-five so your hands work in February. Small money, real life. Fine."}),u({id:"ambient",name:"Ambient lighting",price:395,tag:"fluff",blurb:"A glow in the footwells. Sixty-four colors. None of them pay the note.",tip:"Mood lighting. The bank does not have a mood. It has a due date."}),u({id:"memory",name:"Memory seats",price:820,tag:"fluff",blurb:"The seat remembers you. Useful if two people share the car.",tip:"Memory seats matter if somebody else drives. If it is just you, the seat already remembers."})]},{id:"roof",category:"roof",label:"Roof",mode:"single",cars:["stallion","harbor","ironhorn"],options:[u({id:"none",name:"Solid roof",price:0,tag:"included",blurb:"Metal, quiet, and it does not leak. A roof’s original job.",tip:"A solid roof is not a compromise. It is a roof."}),u({id:"moon",name:"Power moonroof",price:1250,tag:"fluff",blurb:"A slice of sky over the front seats. Nice in October.",tip:"A moonroof is a nice thing you use in October. It is not an investment. It is a sunroof."}),u({id:"pano",name:"Panoramic sunroof",price:1950,tag:"fluff",blurb:"Glass over almost the whole cabin. Brighter, hotter, more expensive.",tip:"Panoramic glass is gorgeous until July, when you are financing a greenhouse."}),u({id:"carbon",name:"Carbon roof panel",price:4200,tag:"joke",cars:["stallion"],blurb:"A lighter roof, mostly so you can tell people the roof is lighter.",tip:"Four grand so the roof can be a conversation. The car is already light enough to get you in trouble."})]},{id:"top",category:"roof",label:"Soft top",mode:"single",cars:["breeze"],options:[u({id:"black",name:"Black canvas top",price:0,tag:"included",blurb:"The classic lid. Goes up, goes down, costs nothing extra.",tip:"Black top, no charge. The joy is included. Remember that."}),u({id:"tan",name:"Tan canvas top",price:420,tag:"fluff",blurb:"A lighter lid. Looks like a weekend even on a Tuesday.",tip:"Tan top is a look. Four twenty. If it makes you happy every time you walk up, fine. Once."}),u({id:"burgundy",name:"Burgundy canvas top",price:480,tag:"fluff",blurb:"Wine-colored canvas. Dramatic in a good parking lot.",tip:"Burgundy lid. Pretty. Do not let a pretty lid talk you into a ugly loan."}),u({id:"navy",name:"Navy canvas top",price:450,tag:"fluff",blurb:"Deep blue canvas. Quiet, and it hides the dust a little.",tip:"Navy top. Respectable. Still just a color."})]},{id:"wheels",category:"wheels",label:"Wheels & tires",mode:"single",cars:D,options:[u({id:"stock",name:"Stock wheels",price:0,tag:"included",blurb:"The ones the car was designed around. They work.",tip:"Stock wheels are not sad. They are engineered. Leave them if you are watching the payment."}),u({id:"sport",name:'19" sport alloys',price:1650,tag:"fluff",cars:["stallion","harbor","breeze"],blurb:"Lighter look, thinner tire, a little more road in the cabin.",tip:"Sport alloys look sharp and ride firmer. Sixteen fifty. Know why you want them."}),u({id:"chrome",name:"Chrome 22s",price:2450,tag:"fluff",cars:["stallion","breeze","harbor"],blurb:"Mirror-bright and impossible to keep clean.",tip:"Chrome is a part-time job. You will wash them more than you drive them."}),u({id:"forged",name:"Forged black 20s",price:3350,tag:"fluff",cars:["stallion","breeze"],blurb:"Dark, expensive, and lighter than they look.",tip:"Forged wheels are real hardware. They are also three grand of jewelry."}),u({id:"runflat",name:"Run-flat all-seasons",price:1150,tag:"smart",cars:["stallion","harbor","breeze"],blurb:"Keep rolling after a puncture. No spare to sit on.",tip:"Run-flats are the rare wheel upgrade that solves a problem. I can live with it."}),u({id:"aero",name:"Aero efficiency wheels",price:380,tag:"smart",cars:["harbor"],blurb:"Smoother covers, a little less drag, a calmer look.",tip:"Three eighty for wheels that help the hybrid be a hybrid. That is a coherent sentence."}),u({id:"carbonw",name:"Carbon-barrel track wheels",price:5600,tag:"joke",cars:["stallion"],blurb:"Race-day hardware for a road that has a speed limit.",tip:"Fifty-six hundred in carbon barrels. The track is not on your commute."}),u({id:"wire",name:"Wire-look chromes",price:2100,tag:"fluff",cars:["breeze"],blurb:"Old-glamour spokes. They sparkle when the top is down.",tip:"Wire wheels are a mood. They are also a car wash’s villain origin story."}),u({id:"chrome20",name:'20" factory chrome',price:1800,tag:"fluff",cars:["ironhorn"],blurb:"Bright truck wheels. They shine until the first job site.",tip:"Chrome on a truck is a choice. Mud is also a choice. They will meet."}),u({id:"offroad",name:'35" all-terrains',price:4750,tag:"fluff",cars:["ironhorn"],blurb:"Tall, loud, and thirsty. They change the whole truck.",tip:"Those tires do not just cost forty-seven fifty. They cost you gas, bearings, and a car wash that cries."}),u({id:"mud",name:'37" Swamp Royalty',price:8900,tag:"joke",cars:["ironhorn"],blurb:"Bog-sized mud tires with a name that should have been a warning.",tip:"Swamp Royalty. Eighty-nine hundred. You are financing a parade float that hates parking garages."})]},{id:"stance",category:"packs",label:"Stance",mode:"single",cars:["ironhorn"],options:[u({id:"stock",name:"Stock height",price:0,tag:"included",blurb:"The truck sits where the engineers put it.",tip:"Stock height gets into parking garages. I am a fan of parking garages."}),u({id:"level",name:'2" leveling kit',price:1480,tag:"fluff",blurb:"Lifts the nose so the truck looks level, not eager.",tip:"A leveling kit is the modest version of this mistake. Still fourteen eighty."}),u({id:"lift",name:'6" lift kit',price:6650,tag:"joke",blurb:"The truck stands up and announces itself to aircraft.",tip:"Six inches and sixty-six fifty. You will need a step stool and a new budget."})]},{id:"liner",category:"packs",label:"Bed liner",mode:"single",cars:["ironhorn"],options:[u({id:"none",name:"Bare bed",price:0,tag:"included",blurb:"Painted steel. The first fridge you haul will sign it.",tip:"A bare bed is how a new truck starts looking old. Liner is the grown-up move."}),u({id:"spray",name:"Spray-in bed liner",price:695,tag:"smart",blurb:"A thick coat locked to the metal. The right answer for a working bed.",tip:"Spray-in liner, six ninety-five. Protects the thing you bought. This is how you spend."}),u({id:"dropin",name:"Drop-in bed liner",price:349,tag:"smart",blurb:"A plastic shell you can pull out. Cheaper, a little rattly.",tip:"Drop-in is the budget liner. It works. It also drums when it is empty."})]},{id:"cover",category:"packs",label:"Tonneau cover",mode:"single",cars:["ironhorn"],options:[u({id:"none",name:"Open bed",price:0,tag:"included",blurb:"Nothing over the bed. Easy to load, easy to soak.",tip:"Open bed is honest. Just do not leave tools in the rain and then act surprised."}),u({id:"soft",name:"Soft roll-up tonneau",price:545,tag:"smart",blurb:"Vinyl cover, rolls up when you need the whole bed.",tip:"Soft cover keeps the rakes dry. Five forty-five. Reasonable."}),u({id:"hard",name:"Hard folding tonneau",price:1375,tag:"fluff",blurb:"A rigid lid that locks. Looks finished. Costs more than the liner.",tip:"Hard cover is nice if you actually lock gear back there. Otherwise it is a very expensive hat."})]},{id:"truckt",category:"packs",label:"Truck kit",mode:"multi",cars:["ironhorn"],options:[u({id:"lights",name:"Bed LED rails",price:295,tag:"smart",blurb:"Light in the bed so you are not loading by phone flashlight.",tip:"Bed lights are cheap and you will use them. I like cheap and useful."}),u({id:"winch",name:"12,000 lb winch",price:1920,tag:"fluff",blurb:"A hook and a motor on the nose. Heroic, until you never need it.",tip:"A winch is for people who get stuck on purpose. Do you?"}),u({id:"exhaust",name:"Dual exhaust",price:1560,tag:"fluff",blurb:"Two tips, more noise, the same truck underneath.",tip:"Dual exhaust so a truck can be louder. The neighbors already know it is a truck."}),u({id:"box",name:"Bed toolbox",price:780,tag:"smart",blurb:"A locking chest at the cab. Tools stay put.",tip:"A toolbox is for a person who works. If that is you, buy it. If it is a costume, skip it."}),u({id:"flaps",name:"Heavy mud flaps",price:210,tag:"smart",blurb:"They keep the rocks off the car behind you. Manners, basically.",tip:"Mud flaps are manners. Two ten. Your mother would approve, and she is not even on the loan."}),u({id:"lightbar",name:"Parade light bar",price:2240,tag:"joke",blurb:"A roof full of lamps. Visible from the next county, and from space.",tip:"A light bar for the suburbs. Twenty-two forty so you can see a deer that is not there."})]},{id:"sport",category:"packs",label:"Stallion pack",mode:"multi",cars:["stallion"],options:[u({id:"launch",name:"Launch control",price:2200,tag:"fluff",blurb:"A computer that helps you leave a light like a poster.",tip:"Launch control is a story you tell once. The price you pay every month."}),u({id:"spoiler",name:"Carbon spoiler",price:3400,tag:"fluff",blurb:"A wing on the tail. It looks fast even when you are not.",tip:"Carbon spoiler. Three thousand four hundred dollars of wind costume."}),u({id:"track",name:"Track tire set",price:2800,tag:"fluff",blurb:"Sticky rubber that hates cold mornings and long highway slogs.",tip:"Track tires on a street car wear out like gossip. Fast, and then they are gone."}),u({id:"exhaust",name:"Roaring exhaust",price:2650,tag:"fluff",blurb:"Opens the pipes. The Stallion already had a voice. This is a shout.",tip:"A roaring exhaust is how you introduce yourself to people who did not ask."}),u({id:"brakes",name:"Carbon-ceramic brakes",price:8900,tag:"joke",blurb:"Race brakes. Astonishing, and allergic to short cold trips.",tip:"Eighty-nine hundred in brakes. Unless you are late to a racetrack, this is jewelry that gets hot."}),u({id:"stripes",name:"Racing stripes",price:750,tag:"fluff",blurb:"A painted stripe down the spine. Loud in the quietest way.",tip:"Stripes are seven fifty. Cheap trouble. I will not lose sleep. Do not add three more kinds of trouble."}),u({id:"turbo",name:"Nonna's Prayer turbo",price:14500,tag:"joke",blurb:"A fantastical booster named like a blessing. It is not a blessing. It is $14,500.",tip:"Nonna’s Prayer. Fourteen thousand five hundred. Your grandmother would tell you to put it back."})]},{id:"hybrid",category:"packs",label:"Harbor pack",mode:"multi",cars:["harbor"],options:[u({id:"cargo",name:"Cargo organizer",price:240,tag:"smart",blurb:"Dividers in the hatch so the groceries stop auditioning for a chase scene.",tip:"Cargo organizer. Two forty. Your oranges stay put. This is a yes."}),u({id:"rack",name:"Roof rack",price:680,tag:"smart",blurb:"Crossbars for a bike, a box, a life that does not fit in the hatch.",tip:"A rack is worth it the first time you would have otherwise rented a truck. Six eighty."}),u({id:"ppf",name:"Paint protection film",price:1950,tag:"smart",blurb:"A clear skin on the nose and the hood. Rocks are free. Paint is not.",tip:"Paint protection on a daily driver is one of the few add-ons I do not heckle. Rocks are free. Paint is not."}),u({id:"eff",name:"Efficiency display pack",price:420,tag:"smart",blurb:"A clearer picture of what the hybrid is actually doing.",tip:"You bought a hybrid to watch the numbers. Four twenty to see them better. Coherent."}),u({id:"filter",name:"Deluxe cabin filter",price:180,tag:"smart",blurb:"Better air on the parkway. Small, boring, useful.",tip:"A cabin filter is the most adult thing on this menu. Buy it and do not tell anyone. It is not glamorous enough."})]},{id:"breezepack",category:"packs",label:"Breeze pack",mode:"multi",cars:["breeze"],options:[u({id:"deflector",name:"Wind deflector",price:320,tag:"smart",blurb:"A little screen so the top-down air does not slap you at 50.",tip:"Wind deflector makes the top-down actually usable. Three twenty. Buy the joy, then make it comfortable."}),u({id:"latch",name:"Premium top package",price:890,tag:"fluff",blurb:"Softer latches, a tighter fit, one less thing to fight at a red light.",tip:"The top already goes down. Eight ninety for a fancier way is optional. The down part is free."}),u({id:"underglow",name:"Underglow",price:680,tag:"fluff",blurb:"A cool light under the rockers. The pavement gets a costume.",tip:"Underglow. The road does not need a nightlight. You do not need this payment."}),u({id:"glow",name:"San Gennaro glow",price:4400,tag:"joke",blurb:"Festival lights, sparkler tips, and a glow that can be seen from the rectory.",tip:"The Feast of San Gennaro, but it is your car, and it is four thousand four hundred dollars. I am lighting a candle for your budget."})]},{id:"tint",category:"extras",label:"Window tint",mode:"single",cars:D,options:[u({id:"none",name:"No tint",price:0,tag:"included",blurb:"Clear glass. Honest, bright, a little hot.",tip:"Clear glass is free. In August you may wish it was not."}),u({id:"regular",name:"Window tint",price:450,tag:"smart",blurb:"A normal shade. Cooler cabin, less of your life on display.",tip:"Tint for four fifty is comfort and a little privacy. I do not fight this."}),u({id:"ceramic",name:"Ceramic tint",price:890,tag:"smart",blurb:"Rejects more heat, less mirror-look, costs more than regular dye.",tip:"Ceramic tint actually knocks the heat back. Eight ninety. If you park in the sun, it is a tool."})]},{id:"extras",category:"extras",label:"Everyday kit",mode:"multi",cars:D,options:[u({id:"mud",name:"Mud guards",price:160,tag:"smart",blurb:"Small shields behind the wheels. They save the rockers.",tip:"Mud guards. One sixty. Boring and correct."}),u({id:"net",name:"Cargo net",price:75,tag:"smart",blurb:"A net so the trunk stops rearranging itself.",tip:"Seventy-five dollars. If this is the wildest thing you add, I am proud of you."}),u({id:"keyless",name:"Keyless entry upgrade",price:350,tag:"fluff",blurb:"Walk up, get in. The key can stay in your pocket.",tip:"Keyless is convenience. Three fifty. Fine if the rest of the build is calm."}),u({id:"remote",name:"Remote start",price:495,tag:"smart",blurb:"Start it from the kitchen. The cabin is human by the time you sit down.",tip:"Jersey in January. Remote start earns its keep. I will not fight you."}),u({id:"dash",name:"Dash cam",price:320,tag:"smart",blurb:"A witness on the windshield. Cheap insurance for arguments.",tip:"Dash cam. Three twenty. The one gadget that can save you money. Buy it."}),u({id:"seal",name:"Paint sealant",price:799,tag:"fluff",blurb:"A shiny coat and a speech about beads of water.",tip:"Sealant is a car-wash sermon. Seven ninety-nine. Wash the car yourself and buy a better lunch."}),u({id:"edge",name:"Door edge guards",price:140,tag:"smart",blurb:"Little strips so parking-lot doors do not chip the paint.",tip:"Edge guards are a small kindness to the paint. One forty. Yes."}),u({id:"trunk",name:"Trunk liner",price:180,tag:"smart",cars:["stallion","harbor","breeze"],blurb:"A tray for the wet, the sandy, the leaking.",tip:"Trunk liner. One eighty. Your future self, holding a spilled plant, thanks you."})]},{id:"warranty",category:"warranty",label:"Warranty",mode:"single",cars:D,options:[u({id:"none",name:"Factory coverage only",price:0,tag:"value",blurb:"The maker’s promise, already on a new car. A big reason you buy new.",tip:"You are buying new. The factory already covers the bumper and the powertrain. That is the point. Do not pay for the same promise twice."}),u({id:"tech",name:"Electronics, 4 years",price:650,tag:"smart",blurb:"Screens, cameras, infotainment. The stuff that fails and costs real money to fix.",tip:"Electronics. Screens, cameras, the big display. That stuff dies and the bill is ugly. A few hundred, I understand. The engine and the bumper, the factory already has."}),u({id:"basic",name:"Powertrain, 5 years",price:2e3,tag:"fluff",blurb:"Engine and transmission past the factory window. On a new car you already bought that window.",tip:"Two thousand for a powertrain warranty on a car that just came with one. Buying new was that coverage. I would not pay for it twice."}),u({id:"bumper",name:"Bumper-to-bumper, 6 years",price:3500,tag:"fluff",blurb:"A full wrap for six years. On a new car it mostly repeats the factory promise.",tip:"Bumper-to-bumper, thirty-five hundred, on a new car. You already bought that when you bought new. If you add one thing, make it the electronics. Not this."}),u({id:"platinum",name:"Platinum concierge, 8 years",price:5e3,tag:"joke",blurb:"The long hug. Loaner cars, a binder, and a lot of adjectives.",tip:"Five thousand for the platinum hug. The car is new. Factory coverage is the hug you already paid for. This binder buys Ricky a boat."})]}],$t=[{id:"sound",label:"Sound"},{id:"interior",label:"Interior"},{id:"roof",label:"Roof"},{id:"wheels",label:"Wheels"},{id:"packs",label:"Packs"},{id:"extras",label:"Extras"},{id:"warranty",label:"Warranty"}],vt={black:"#1a1c1f",tan:"#c2a57a",burgundy:"#6e2434",navy:"#1c2a4a"};function xt(e){return ke.find(t=>t.id===e)||null}function Ge(e,t){return e===D||Array.isArray(e)&&e.includes(t)}function le(e,t){return kt.filter(a=>Ge(a.cars,e)&&(!t||a.category===t)).map(a=>({...a,options:a.options.filter(o=>Ge(o.cars,e))})).filter(a=>a.options.length>0)}function Tt(e){const t={},a={};for(const o of le(e.id))o.mode==="single"?t[o.id]=o.options[0].id:a[o.id]=[];return{paint:e.colors[0].id,topDown:!1,single:t,multi:a}}function ce(e,t){return e.colors.find(a=>a.id===t.paint)||e.colors[0]}function Mt(e,t){const a=[],o=ce(e,t);o.price&&a.push({id:o.id,name:o.name,price:o.price,tag:o.joke?"joke":"fluff",group:"paint",tip:o.joke?"Gold flake. Seventy-five hundred so the car can glitter like a bakery tray. I am begging you.":`${o.name} is a special paint. Pretty. It does not make the car worth more when you sell it.`});for(const n of le(e.id))if(n.mode==="single"){const i=n.options.find(r=>r.id===t.single[n.id]);i&&a.push({...i,group:n.id})}else for(const i of t.multi[n.id]||[]){const r=n.options.find(d=>d.id===i);r&&a.push({...r,group:n.id})}return a}function ve(e,t){const a=Mt(e,t),o=a.find(r=>r.group==="warranty"),n=(o==null?void 0:o.price)||0,i=a.filter(r=>r.group!=="warranty").reduce((r,d)=>r+d.price,0);return{msrp:e.msrp,options:i,warranty:n,warrantyId:(o==null?void 0:o.id)||"none",total:e.msrp+i+n,lines:a}}function Ue(e,t){let a=e.insurance;const o=t.multi.sport||[],n=t.multi.truckt||[],i=t.multi.breezepack||[];return o.includes("turbo")&&(a+=65),o.includes("brakes")&&(a+=22),t.single.wheels==="mud"&&(a+=48),t.single.wheels==="offroad"&&(a+=30),t.single.stance==="lift"&&(a+=24),n.includes("lightbar")&&(a+=12),i.includes("glow")&&(a+=18),a}const Lt={credit:{title:"Credit score",body:"Your credit score is a three-digit rumor the bank believes about you. Higher means cheaper money. This is not a moral score. It is a price tag on a loan. We rolled it. Now we live with the number, or we ask your mother."},cosigner:{title:"Co-signer",body:"A co-signer tells the bank they will pay if you do not. Your mother, in this case. It can knock the rate down. It also puts Ma on the hook for the whole note. You only ask her if the rate is ugly, and you never miss a payment. That is family."},apr:{title:"APR",body:"APR is the yearly price of borrowing, written like a percent. A six instead of an eight does not look like much on a sticker. On a long loan it is thousands. You are not just buying the car. You are renting the money."},principal:{title:"Principal",body:"Principal is the chunk you still owe, before the bank’s cut. Every payment takes a bite of principal and a bite of interest. Early on, the bank eats first. That is the game. Borrow less and the bites get smaller."},interest:{title:"Interest",body:"Interest is the bank’s fee for fronting you the money. It is not a one-time tip. It gets calculated on what is left, every month. That is why the rate and the term matter as much as the sticker."},term:{title:"Term",body:"Term is how many months you are married to this payment. Sixty is five years. Eighty-four is seven. The longer one looks cheaper every month and pays the bank a longer tip. Do not stretch a note so the car dies before it does."},amortization:{title:"Amortization",body:"Amortizing means the payment stays the same while the mix changes. The first years you are mostly paying interest. Later you finally hit principal. Longer terms keep you in the interest years. That is why they feel affordable."},payment:{title:"Payment",body:"The payment is principal and interest chopped into months. A pretty payment can hide an ugly loan: long term, fat rate, extra junk. We look at the payment and at what it costs you to have it. Both. Always both."},down:{title:"Down payment",body:"A down payment is cash you put in up front so you borrow less. Less principal, less interest, and you are not upside down the second the tires hit the street. With about fifteen thousand in savings, a chunk of that pile is often for exactly this. Leave roughly two months of bills as backup, and it is fine to use some of the rest. Better real money down than zero down and a loan that is already underwater. Do not empty checking to impress a man at a desk. Rent is still due."},trade:{title:"Trade equity",body:"Trade equity is what your old car is worth minus whatever you still owe on it. Your jalopy is paid off, so every dollar we squeeze out of Ricky comes straight off the new loan. That is found money. Treat it like it."},negative:{title:"Negative equity",body:"Negative equity is when you owe more on a car than it is worth. Upside down. Roll that into a new loan and you are paying for a ghost. Your beater is clear, so we are not starting in a hole. Do not dig one with a long term."},otd:{title:"Out the door",body:"Out the door is the real number: price, plus tax, title, doc fees, and warranty, minus the trade. Salesmen love talking monthly so you forget it. I do not. Ask for the out-the-door out loud, then decide."},warranty:{title:"Warranty",body:"A warranty is a paid promise to fix certain things for a while. You are buying new, so factory bumper-to-bumper and powertrain coverage is already a big reason the car costs what it costs. Paying again for that full wrap is often money you do not need. Electronics are the exception. Screens, cameras, the infotainment. That stuff fails, and it is expensive. A small policy for the tech can be the smart one. Read what is actually covered. The brochure is not the contract."},tco:{title:"Total cost of ownership",body:"Total cost of ownership is what the car costs to live with, not the number on the windshield. It rolls up the payments, the interest hiding inside them, insurance, a straight guess at gas and maintenance, and the warranty you actually picked. The sticker is the invitation. Ownership is the whole night. One number, so it does not turn into homework."},msrp:{title:"MSRP",body:"MSRP is the manufacturer’s suggested price. A suggestion, like when your aunt says have more lasagna. On a hot car they pretend it is sacred. It is not. We negotiate off it, and we do not pay a markup for the privilege."},docfee:{title:"Doc fee",body:"The doc fee is the charge for paperwork they were going to do anyway. Some states cap it. Some lots pad it. I will not die on a few hundred if the price of the car is right. I will always see it on the sheet."},tax:{title:"Sales tax",body:"Tax is the state’s cut. On this lot we tax the selling price plus warranty, after the trade comes off, the way a lot of states do it. It is not negotiable. A lower selling price saves you twice: on the car, and on the tax."},takehome:{title:"Take-home pay",body:"Take-home is what actually lands after a plain tax estimate, not the salary in the job offer. Yours is about $1,010 a week on a $70,000 year. The car payment has to live inside that week, next to rent and food. The salary is a rumor. The week is the truth."},financed:{title:"Amount financed",body:"Amount financed is what the bank actually lends after the trade and your cash come off. This is the principal. Not the sticker, not the monthly. Every point of interest applies to this number. Make it smaller and the whole loan gets quieter."},insurance:{title:"Insurance estimate",body:"Insurance is what you pay so a bad afternoon does not own you. It is not in the car payment, which is how people fool themselves. I put an estimate in the week so the Stallion cannot pretend it costs the same to own as the Harbor."}},V=[{id:"side",label:"Side"},{id:"front",label:"Front"},{id:"rear",label:"Rear"}];function Pe(e,t){const a=ce(e,t),o=t.multi.breezepack||[],n=t.multi.sport||[],i=t.multi.truckt||[];let r=null;return o.includes("glow")?r="#ffb15a":o.includes("underglow")&&(r="#67e7ff"),{paint:a.hex,pearl:!!a.pearl,matte:!!a.matte,wheel:t.single.wheels||"stock",roof:t.single.roof||"none",tint:t.single.tint==="ceramic"?2:t.single.tint==="regular"?1:0,spoiler:n.includes("spoiler"),stripes:n.includes("stripes"),exhaust:n.includes("exhaust")||i.includes("exhaust"),lift:t.single.stance==="lift"?2:t.single.stance==="level"?1:0,liner:t.single.liner||"none",cover:t.single.cover||"none",underglow:r,topDown:!!t.topDown,topColor:vt[t.single.top]||"#1a1c1f",deflector:o.includes("deflector"),lightbar:i.includes("lightbar"),winch:i.includes("winch"),brakes:n.includes("brakes"),dark:wt(a.hex)<.4}}function ze(e,t,a,o="car"){const n=t==="front"?Pt(e,a,o):t==="rear"?zt(e,a,o):Rt(e,a,o);return`<svg class="car${a.topDown?" is-down":""}" viewBox="0 0 840 480" role="img">
    <title>${At(e)} , ${t} view</title>
    <defs>${Ke(o,a)}</defs>
    ${a.underglow?`<ellipse cx="420" cy="400" rx="250" ry="36" fill="url(#${o}-glow)"/>`:""}
    <ellipse cx="420" cy="424" rx="270" ry="18" fill="rgba(0,0,0,.38)"/>
    <ellipse cx="420" cy="426" rx="160" ry="7" fill="rgba(255,255,255,.06)"/>
    ${n}
  </svg>`}function St(){const e="jalopy";return`<svg class="car jalopy" viewBox="0 0 840 480" role="img">
    <title>1998 Cumberland Shadow</title>
    <defs>${Ke(e,{paint:"#6d7278",pearl:!1,matte:!0,wheel:"steel",tint:0,underglow:null})}</defs>
    <ellipse cx="420" cy="424" rx="250" ry="16" fill="rgba(0,0,0,.38)"/>
    <g>
      ${de(e,Ct(),[[268,360,50],[590,360,50]],"body")}
      <path d="M430 168 C470 128 540 124 600 140 L640 188 L560 196 C500 188 450 186 430 196 Z" fill="url(#${e}-glass)" stroke="rgba(180,190,198,.4)" stroke-width="2"/>
      ${S("M 470 150 L 530 168")}
      <path d="M250 250 L400 242 L408 330 L246 338 Z" fill="#8c8a80" opacity=".92"/>
      <path d="M400 246 L408 332" stroke="rgba(0,0,0,.45)" stroke-width="2"/>
      <path d="M250 256 L246 336" stroke="rgba(0,0,0,.35)" stroke-width="1.6"/>
      <path d="M300 268 C330 290 328 310 300 324" fill="none" stroke="#4a4e52" stroke-width="3"/>
      ${W(346,300,e)}
      <g transform="translate(412 186)">
        <rect x="0" y="8" width="7" height="12" rx="2" fill="#2a2c30"/>
        <rect x="5" y="0" width="24" height="13" rx="2" fill="#1a1c20" stroke="rgba(255,255,255,.4)"/>
        <rect x="8" y="2" width="16" height="8" rx="1" fill="rgba(190,210,224,.55)"/>
      </g>
      <ellipse cx="220" cy="308" rx="16" ry="7" fill="#7a4a32" opacity=".55"/>
      <ellipse cx="640" cy="300" rx="20" ry="8" fill="#6b3e28" opacity=".45"/>
      <ellipse cx="560" cy="250" rx="9" ry="5" fill="#8a5a3c" opacity=".4"/>
      ${S("M 490 156 L 540 176")}
      ${xe(148,268,36,28,e)}
      <path d="M150 300 h44 v16 h-40 z" fill="#14120e" stroke="rgba(255,255,255,.2)"/>
      <path d="M154 304 h28 v8 h-26 z" fill="#f2e2b8" opacity=".75"/>
      <path d="M160 304 L176 312 M168 304 L184 312" stroke="rgba(40,40,40,.55)" stroke-width="1"/>
      <rect x="168" y="284" width="22" height="10" rx="2" fill="#c4552a"/>
      <rect x="730" y="250" width="22" height="16" rx="2" fill="#3a1214" stroke="rgba(255,160,150,.25)"/>
      <rect x="734" y="254" width="14" height="8" fill="#8a3030"/>
      ${H(268,360,46)}
      ${H(590,360,46)}
      ${g(268,360,42,"steel",e,!1)}
      ${g(590,360,42,"stock",e,!1)}
      <g transform="translate(250,392) rotate(-18)">
        <ellipse cx="0" cy="0" rx="16" ry="7" fill="#cfc8bc" stroke="#888" stroke-width="1"/>
      </g>
      ${q(455,318,"AS-IS",!0)}
    </g>
  </svg>`}function At(e){return{stallion:"Stallion GT",harbor:"Harbor Hybrid",ironhorn:"Ironhorn 1500",breeze:"Breeze Convertible"}[e]||"Car"}function Ke(e,t){const a=t.matte?Ce(t.paint,"#ffffff",.1):Ce(t.paint,"#ffffff",t.pearl?.62:.4),o=Ce(t.paint,"#000000",t.matte?.22:.48),n=t.tint>1?.35:t.tint===1?.55:.82,i=t.wheel==="forged"||t.wheel==="carbonw",r=i?"#3a3a3a":"#f5f5f3",d=i?"#111":t.wheel==="chrome"||t.wheel==="chrome20"||t.wheel==="wire"?"#aeb4ba":"#7b8086",c=t.underglow||"#ffffff";return`
    <linearGradient id="${e}-paint" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="40%" stop-color="${t.paint}"/>
      <stop offset="100%" stop-color="${o}"/>
    </linearGradient>
    <linearGradient id="${e}-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e7f1f8" stop-opacity="${n}"/>
      <stop offset="48%" stop-color="#1a2836" stop-opacity="${.5+t.tint*.18}"/>
      <stop offset="100%" stop-color="#0d141c" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="${e}-rim" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${r}"/>
      <stop offset="50%" stop-color="${d}"/>
      <stop offset="100%" stop-color="${r}"/>
    </linearGradient>
    <linearGradient id="${e}-metal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbfbfa"/>
      <stop offset="48%" stop-color="#8e949b"/>
      <stop offset="100%" stop-color="#deded8"/>
    </linearGradient>
    <radialGradient id="${e}-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${c}" stop-opacity="0.75"/>
      <stop offset="70%" stop-color="${c}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${c}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${e}-tire" cx="42%" cy="38%" r="68%">
      <stop offset="0%" stop-color="#3a3e44"/>
      <stop offset="58%" stop-color="#17191c"/>
      <stop offset="100%" stop-color="#07080a"/>
    </radialGradient>
    <linearGradient id="${e}-lampglass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/>
      <stop offset="42%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <pattern id="${e}-mesh" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#12151a"/>
      <path d="M0 8 L8 0 M-2 2 L2 -2 M6 10 L10 6" stroke="#6a7380" stroke-width="0.7"/>
    </pattern>`}function de(e,t,a,o){const n=`${e}-${o}`,i=a.map(([r,d,c])=>`<circle cx="${r}" cy="${d}" r="${c}" fill="#000"/>`).join("");return`<mask id="${n}" maskUnits="userSpaceOnUse" x="0" y="0" width="840" height="480">
      <path d="${t}" fill="#fff"/>${i}
    </mask>
    <path d="${t}" fill="url(#${e}-paint)" mask="url(#${n})"/>`}function Ct(){return`M 150 338
    C 146 292 176 250 250 232
    L 360 220
    C 410 210 440 162 510 146
    L 620 140
    C 690 140 730 168 748 206
    L 770 250
    C 786 286 784 330 752 348
    L 190 352
    C 160 352 148 346 150 338 Z`}function g(e,t,a,o,n,i){const d=a*(o==="offroad"||o==="mud"||o==="steel"?.5:o==="aero"?.74:.62),c=o==="runflat"?`<circle cx="${e}" cy="${t}" r="${a-3}" fill="none" stroke="#d6b15e" stroke-width="2.4"/>`:"",h=Math.max(4,a*.16);return`
    <g class="wheel">
      <circle cx="${e}" cy="${t}" r="${a}" fill="url(#${n}-tire)"/>
      <circle cx="${e}" cy="${t}" r="${a-1.2}" fill="none" stroke="#0a0a0c" stroke-width="2"/>
      ${It(e,t,a)}
      <circle cx="${e}" cy="${t}" r="${a-h*.55}" fill="none" stroke="#4e545c" stroke-width="${h.toFixed(1)}"/>
      <circle cx="${e}" cy="${t}" r="${a-h}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.2"/>
      ${c}
      <circle cx="${e}" cy="${t}" r="${d+3.5}" fill="#0c0d10" stroke="rgba(255,255,255,.38)" stroke-width="2"/>
      <circle cx="${e}" cy="${t}" r="${d}" fill="url(#${n}-rim)"/>
      <circle cx="${e}" cy="${t}" r="${d*.9}" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>
      <circle cx="${e}" cy="${t}" r="${d*.72}" fill="#1c1e22"/>
      ${i?`<circle cx="${e}" cy="${t}" r="${d*.7}" fill="none" stroke="#d23b32" stroke-width="5"/>`:`<circle cx="${e}" cy="${t}" r="${d*.66}" fill="none" stroke="#3a3e44" stroke-width="3"/>`}
      ${Bt(e,t,d*.86,o)}
      <circle cx="${e}" cy="${t}" r="${Math.max(5,d*.2)}" fill="url(#${n}-metal)" stroke="#1a120c" stroke-width="1"/>
      <circle cx="${e}" cy="${t}" r="${Math.max(2,d*.07)}" fill="#1a1a1a"/>
      <ellipse cx="${e-a*.12}" cy="${t-a*.46}" rx="${a*.34}" ry="${a*.1}" fill="#fff" opacity=".22"/>
    </g>`}function It(e,t,a){let o="";for(let i=0;i<16;i+=1){const r=Math.PI*2*i/16,d=e+Math.cos(r)*(a*.9),c=t+Math.sin(r)*(a*.9),h=r*180/Math.PI;o+=`<rect x="${(d-2.4).toFixed(1)}" y="${(c-a*.07).toFixed(1)}" width="4.8" height="${(a*.15).toFixed(1)}" rx="1" fill="#050506" transform="rotate(${h.toFixed(1)} ${d.toFixed(1)} ${c.toFixed(1)})"/>`}return o}function Bt(e,t,a,o){if(o==="aero")return`<circle cx="${e}" cy="${t}" r="${a*.86}" fill="#dfe3e6"/>
      <circle cx="${e}" cy="${t}" r="${a*.22}" fill="#222"/>
      <circle cx="${e-a*.28}" cy="${t}" r="${a*.08}" fill="#222"/>
      <circle cx="${e+a*.28}" cy="${t}" r="${a*.08}" fill="#222"/>`;if(o==="steel")return`<circle cx="${e}" cy="${t}" r="${a*.9}" fill="#5c6166"/>
      ${[0,60,120,180,240,300].map(p=>{const w=p*Math.PI/180,m=e+Math.cos(w)*a*.48,k=t+Math.sin(w)*a*.48;return`<circle cx="${m.toFixed(1)}" cy="${k.toFixed(1)}" r="${a*.16}" fill="#2a2c2e"/>`}).join("")}`;const n={stock:5,sport:12,chrome:8,forged:5,runflat:5,carbonw:8,wire:18,offroad:6,mud:6,chrome20:8}[o]||5,d=o==="forged"||o==="carbonw"?"#141414":o==="chrome"||o==="chrome20"||o==="wire"?"#f7f7f5":"#c5c8cc",c=o==="sport"||o==="wire"||o==="carbonw"?1.5:o==="forged"?5:3.4;let h="";for(let p=0;p<n;p+=1){const w=Math.PI*2*p/n-Math.PI/2,m=e+Math.cos(w)*a*.9,k=t+Math.sin(w)*a*.9;h+=`<line x1="${e}" y1="${t}" x2="${m.toFixed(1)}" y2="${k.toFixed(1)}" stroke="${d}" stroke-width="${c}" stroke-linecap="round"/>`}return o==="carbonw"&&(h+=`<circle cx="${e}" cy="${t}" r="${a*.92}" fill="none" stroke="#8f1d2c" stroke-width="2"/>`),h}function q(e,t,a,o=!1){const n=o?78:92;return`<g transform="translate(${e} ${t})">
    <rect width="${n}" height="${o?32:40}" rx="3" fill="#123a78" stroke="#d7c27a" stroke-width="1.5"/>
    <text x="${n/2}" y="${o?21:26}" text-anchor="middle" fill="#f4efe2" font-family="Outfit, sans-serif" font-size="${o?13:16}" font-weight="700" letter-spacing="1">${a}</text>
  </g>`}function T(e,t,a,o,n,i=3){const r=Ft(n),d=r?"#2a090c":"#14120e",c=r?"#ffd2cc":"#fff6dd",h=1.6,p=Math.max(2,a-h*2),w=Math.max(2,o-h*2),m=Math.max(1.6,Math.min(a,o)*.22),k=e+a*(r?.7:.66),A=t+o*.52;return`<rect x="${e}" y="${t}" width="${a}" height="${o}" rx="${i}" fill="${d}" stroke="rgba(255,255,255,.32)" stroke-width="1.1"/>
    <rect x="${(e+h).toFixed(1)}" y="${(t+h).toFixed(1)}" width="${p.toFixed(1)}" height="${w.toFixed(1)}" rx="${Math.max(1,i-1)}" fill="${n}"/>
    <rect x="${(e+h).toFixed(1)}" y="${(t+h).toFixed(1)}" width="${(p*.46).toFixed(1)}" height="${w.toFixed(1)}" rx="${Math.max(1,i-1)}" fill="${c}" opacity=".38"/>
    <circle cx="${k.toFixed(1)}" cy="${A.toFixed(1)}" r="${m.toFixed(1)}" fill="${c}" opacity=".82"/>
    <circle cx="${(k-m*.2).toFixed(1)}" cy="${(A-m*.25).toFixed(1)}" r="${(m*.35).toFixed(1)}" fill="#fff" opacity=".8"/>`}function Ft(e){if(!e||e[0]!=="#")return!1;const[t,a,o]=be(e);return t>150&&t>a+30&&t>o+30}function S(e){return`<path d="${e}" fill="none" stroke="rgba(255,255,255,.62)" stroke-width="2.2" stroke-linecap="round"/>`}function I(e,t,a,o=1){return`<g transform="translate(${e} ${t}) scale(${o} 1)">
    <path d="M0 4 h16 c8 0 14 -2 18 -10 h-8 c-6 3 -12 6 -20 7 z" fill="#16181c" stroke="rgba(255,255,255,.38)" stroke-width="1"/>
    <path d="M2 3 h12 c4 0 8 -1 10 -5 h-6 z" fill="rgba(214,228,238,.6)"/>
  </g>`}function W(e,t,a){return`<g transform="translate(${e} ${t})">
    <rect width="22" height="7" rx="2" fill="rgba(0,0,0,.5)"/>
    <rect x="1.2" y="1.3" width="15" height="3" rx="1.2" fill="url(#${a}-metal)"/>
  </g>`}function z(e,t,a){return`<g transform="translate(${e} ${t})">
    <circle r="11" fill="url(#${a}-metal)" stroke="#1a120c" stroke-width="1.2"/>
    <circle r="6.2" fill="none" stroke="#1a120c" stroke-width="1.15"/>
    <path d="M -3.2 3.2 L 0 -4 L 3.2 3.2" fill="none" stroke="#1a120c" stroke-width="1.3" stroke-linejoin="round"/>
  </g>`}function xe(e,t,a,o,n){const i=Math.max(4,a-8),r=Math.max(4,o-8);return`<rect x="${e}" y="${t}" width="${a}" height="${o}" rx="4" fill="#0c0e12" stroke="url(#${n}-metal)" stroke-width="3"/>
    <rect x="${e+4}" y="${t+4}" width="${i}" height="${r}" fill="url(#${n}-mesh)"/>
    <path d="M ${e+8} ${t+o*.32} H ${e+a-8} M ${e+8} ${t+o*.54} H ${e+a-8} M ${e+8} ${t+o*.76} H ${e+a-8}" stroke="rgba(232,236,242,.32)" stroke-width="1.5"/>`}function Rt(e,t,a){return e==="harbor"?Dt(t,a):e==="ironhorn"?Ot(t,a):e==="breeze"?Ht(t,a):Yt(t,a)}function Pt(e,t,a){return e==="harbor"?jt(t,a):e==="ironhorn"?Gt(t,a):e==="breeze"?Nt(t,a):Et(t,a)}function zt(e,t,a){return e==="harbor"?Wt(t,a):e==="ironhorn"?Zt(t,a):e==="breeze"?qt(t,a):Vt(t,a)}function te(e,t){if(!t.stripes)return"";const a=t.dark?"rgba(244,239,230,.88)":"rgba(18,18,18,.82)";return`<path d="${e}" fill="none" stroke="${a}" stroke-width="10" stroke-linecap="round"/>`}function Ye(e,t,a,o,n,i){if(i==="none")return"";const r=i==="pano"?a:a*.55,d=i==="carbon"?"#1a1c1f":`url(#${n}-glass)`;return`<rect x="${e}" y="${t}" width="${r}" height="${o}" rx="6" fill="${d}" stroke="rgba(255,255,255,.25)" stroke-width="1"/>`}function Yt(e,t){return`
    ${de(t,`M 46 312
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
    <path d="M 455 186 C 492 140 548 118 630 114 L 760 152 L 742 176 C 660 164 520 172 468 198 Z" fill="url(#${t}-glass)" stroke="rgba(186,206,220,.55)" stroke-width="2.4"/>
    ${S("M 500 154 C 560 136 640 132 730 150")}
    ${I(470,162)}
    <path d="M 150 214 C 250 198 340 194 420 202" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3"/>
    <path d="M 168 252 C 250 236 340 232 430 244" fill="none" stroke="rgba(0,0,0,.32)" stroke-width="8" stroke-linecap="round"/>
    <path d="M 168 248 C 250 232 340 228 430 240" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="3" stroke-linecap="round"/>
    <path d="M 500 198 L 496 338" stroke="rgba(0,0,0,.45)" stroke-width="2"/>
    <path d="M 636 164 L 630 332" stroke="rgba(0,0,0,.32)" stroke-width="1.7"/>
    ${W(430,246,t)}
    ${W(560,232,t)}
    ${z(188,270,t)}
    <path d="M 78 286 h46 l10 16 h-48 z" fill="#14120e" stroke="rgba(255,255,255,.35)"/>
    <path d="M 84 290 h32 l6 8 h-34 z" fill="#f4f1e2"/>
    <path d="M 84 290 h12 l2 8 h-13 z" fill="#fff" opacity=".55"/>
    <path d="M 86 274 h18 v7 h-14 z" fill="#2a140c" stroke="#f08a3a"/>
    <path d="M 88 276 h10 v3 h-9 z" fill="#ffb15a"/>
    <path d="M 786 228 h32 v16 h-24 z" fill="#2a090c" stroke="rgba(255,180,160,.4)"/>
    <path d="M 790 231 h18 v10 h-16 z" fill="#e23b3b"/>
    <path d="M 790 231 h6 v10 h-6 z" fill="#fff" opacity=".4"/>
    <path d="M 120 328 C 280 338 560 336 760 324" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="8" stroke-linecap="round"/>
    ${H(214,340,66)}
    ${H(648,342,68)}
    ${Ye(560,108,160,20,t,e.roof==="none"?"none":e.roof)}
    ${te("M 130 286 C 320 270 540 274 790 236",e)}
    ${e.spoiler?'<path d="M690 132 h110 l8 12 h-100 z" fill="#141414"/><path d="M734 144 v26 M790 138 v22" stroke="#141414" stroke-width="4"/>':""}
    ${e.exhaust?`<circle cx="786" cy="338" r="7" fill="url(#${t}-metal)"/><circle cx="806" cy="338" r="7" fill="url(#${t}-metal)"/>`:'<circle cx="800" cy="336" r="5" fill="#9a9a9a"/>'}
    ${g(214,340,60,e.wheel,t,e.brakes)}
    ${g(648,342,62,e.wheel,t,e.brakes)}`}function H(e,t,a){return`<path d="M ${e-a-2} ${t+8} A ${a+5} ${a+3} 0 0 1 ${e+a+2} ${t+8}" fill="none" stroke="rgba(0,0,0,.62)" stroke-width="12" stroke-linecap="butt"/>
    <path d="M ${e-a+1} ${t+4} A ${a} ${a*.9} 0 0 1 ${e+a-1} ${t+4}" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="2"/>`}function Dt(e,t){return`
    ${de(t,`M 118 330
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
    <path d="M 400 214 C 430 156 478 132 548 126 L 640 126 L 688 168 L 676 196 L 520 204 C 460 202 420 210 400 226 Z" fill="url(#${t}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2.4"/>
    ${S("M 450 168 C 520 146 600 142 660 156")}
    ${I(430,176)}
    <path d="M 668 126 L 724 230" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="3"/>
    <path d="M 220 236 C 300 222 350 220 400 230" fill="none" stroke="rgba(255,255,255,.38)" stroke-width="3"/>
    <path d="M 230 258 C 310 246 360 246 410 256" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="7" stroke-linecap="round"/>
    <path d="M 500 198 L 494 332" stroke="rgba(0,0,0,.4)" stroke-width="2"/>
    <path d="M 600 168 L 594 328" stroke="rgba(0,0,0,.28)" stroke-width="1.6"/>
    ${W(455,250,t)}
    ${W(545,246,t)}
    ${z(196,258,t)}
    ${H(250,348,48)}
    ${H(600,348,48)}
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
    ${Ye(500,112,150,16,t,e.roof)}
    ${te("M 190 292 C 360 284 540 292 690 276",e)}
    ${g(250,348,44,e.wheel,t,!1)}
    ${g(600,348,44,e.wheel,t,!1)}`}function Ot(e,t){const a=e.wheel==="mud"?14:e.wheel==="offroad"?8:0,o=e.lift===2?28:e.lift===1?14:0,n=60+a+(e.lift===2?8:e.lift===1?4:0),i=346-o*.2,r=`M 40 292
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
    L 40 318 Z`,d=e.liner==="spray"?"#2a2c2e":e.liner==="dropin"?"#4a5560":"rgba(0,0,0,.18)";let c="";return e.cover==="soft"&&(c='<path d="M570 196 L800 184 L802 214 L572 220 Z" fill="#1b1d20"/>'),e.cover==="hard"&&(c='<path d="M568 188 L806 174 L808 208 L570 216 Z" fill="#2c3136" stroke="rgba(255,255,255,.2)"/>'),`
    <g transform="translate(0 ${(-o).toFixed(1)})">
      ${de(t,r,[[230,i+o,n+10],[650,i+o,n+12]],"body")}
      <path d="M 360 176 C 386 132 424 114 470 112 L 530 112 L 548 150 L 430 168 Z" fill="url(#${t}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2.2"/>
      ${S("M 400 150 C 450 128 500 124 530 132")}
      ${I(400,150)}
      <path d="M 572 192 L 800 180 L 806 268 L 574 276 Z" fill="${d}"/>
      <path d="M 580 206 L 792 196" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
      <path d="M 580 248 L 796 236" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
      <rect x="760" y="214" width="16" height="8" rx="1" fill="url(#${t}-metal)"/>
      <path d="M 560 150 L 560 330" stroke="rgba(0,0,0,.45)" stroke-width="4"/>
      ${c}
      <path d="M 210 186 C 280 176 330 176 360 184" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="3"/>
      <path d="M 200 210 C 280 200 340 200 380 210" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="7" stroke-linecap="round"/>
      <path d="M 430 168 L 426 300" stroke="rgba(0,0,0,.4)" stroke-width="2"/>
      ${W(390,220,t)}
      ${z(250,230,t)}
      <rect x="90" y="226" width="52" height="22" rx="3" fill="#14120e" stroke="rgba(255,255,255,.3)"/>
      <rect x="94" y="230" width="36" height="14" rx="2" fill="#f6f3ea"/>
      <rect x="94" y="230" width="12" height="14" fill="#fff" opacity=".45"/>
      <rect x="148" y="234" width="26" height="14" rx="2" fill="#14120e" stroke="rgba(255,255,255,.25)"/>
      <rect x="152" y="237" width="16" height="8" rx="1" fill="#f6f3ea"/>
      <rect x="780" y="208" width="24" height="34" rx="3" fill="#2a090c" stroke="rgba(255,180,160,.35)"/>
      <rect x="784" y="212" width="16" height="26" rx="2" fill="#c42828"/>
      <rect x="784" y="212" width="5" height="26" fill="#fff" opacity=".3"/>
      ${e.lightbar?'<rect x="430" y="86" width="120" height="14" rx="3" fill="#222"/><rect x="438" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="466" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="494" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="522" y="89" width="22" height="8" fill="#f4f1c8"/>':""}
      ${e.winch?`<rect x="70" y="300" width="54" height="16" rx="2" fill="url(#${t}-metal)"/>`:""}
      ${e.exhaust?`<circle cx="40" cy="300" r="8" fill="url(#${t}-metal)"/><circle cx="40" cy="278" r="8" fill="url(#${t}-metal)"/>`:""}
      <path d="M 120 286 h80 v8 h-80z" fill="url(#${t}-metal)"/>
    </g>
    ${H(230,i,n+2)}
    ${H(650,i,n+4)}
    ${g(230,i,n,e.wheel,t,!1)}
    ${g(650,i,n+2,e.wheel,t,!1)}`}function Ht(e,t){const a=`M 120 328
    C 114 286 150 250 220 234
    L 360 220
    L 470 216
    L 620 228
    C 700 240 748 270 760 304
    C 770 330 750 348 710 350
    L 180 354
    C 140 354 118 344 120 328 Z`,o=`<path class="top-canvas" d="M 468 214
      C 510 168 590 158 660 176
      C 710 190 734 220 742 252
      L 700 258
      C 680 220 580 210 500 236 Z" fill="${e.topColor}" stroke="rgba(255,255,255,.2)"/>
    <path class="top-canvas" d="M 520 196 C 580 180 650 184 710 208" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="2"/>`,n=`<path d="M 400 220 C 430 168 490 150 560 156 L 590 214 C 520 206 450 210 408 232 Z" fill="url(#${t}-glass)"/>`,i=`<g class="cockpit">
      <path d="M 470 236 C 520 214 620 214 680 240 L 690 280 L 470 286 Z" fill="#2a221c"/>
      <path d="M 530 236 C 560 220 610 220 640 240 L 636 268 L 524 270 Z" fill="#4a3b32"/>
      <rect x="600" y="228" width="28" height="14" rx="5" fill="#241c18"/>
      ${e.deflector?'<path d="M 455 196 h10 l18 78 h-10 z" fill="rgba(190,220,235,.4)" stroke="rgba(255,255,255,.45)"/>':""}
    </g>`;return`
    ${de(t,a,[[268,346,54],[590,346,54]],"body")}
    ${i}
    ${o}
    ${n.replace('fill="url(#','stroke="rgba(186,206,220,.55)" stroke-width="2.2" fill="url(#')}
    ${S("M 430 190 C 480 168 540 164 580 176")}
    ${I(455,188)}
    <path d="M 210 240 C 300 224 380 220 460 228" fill="none" stroke="rgba(255,255,255,.36)" stroke-width="3"/>
    <path d="M 220 262 C 310 248 390 246 460 254" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="7" stroke-linecap="round"/>
    <path d="M 470 228 L 466 336" stroke="rgba(0,0,0,.4)" stroke-width="2"/>
    ${W(400,268,t)}
    ${W(530,276,t)}
    ${z(210,268,t)}
    ${H(268,346,50)}
    ${H(590,346,50)}
    <rect x="160" y="282" width="42" height="16" rx="6" fill="#14120e" stroke="rgba(255,255,255,.3)"/>
    <rect x="164" y="285" width="28" height="10" rx="4" fill="#f7f3ea"/>
    <rect x="164" y="285" width="10" height="10" rx="4" fill="#fff" opacity=".5"/>
    <rect x="718" y="280" width="24" height="28" rx="6" fill="#2a090c" stroke="rgba(255,180,160,.35)"/>
    <rect x="722" y="284" width="16" height="20" rx="4" fill="#d23b32"/>
    <rect x="722" y="284" width="6" height="20" rx="2" fill="#fff" opacity=".3"/>
    <path d="M 180 334 C 340 342 520 342 700 332" fill="none" stroke="rgba(0,0,0,.32)" stroke-width="7" stroke-linecap="round"/>
    ${te("M 190 300 C 360 290 540 300 720 292",e)}
    ${g(268,346,46,e.wheel,t,!1)}
    ${g(590,346,46,e.wheel,t,!1)}`}function Et(e,t){return`
    <path d="M250 150 L590 150 L640 210 L670 300 L640 360 L200 360 L170 300 L200 210 Z" fill="url(#${t}-paint)"/>
    <path d="M280 158 L560 158 L600 206 L240 206 Z" fill="url(#${t}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
    ${S("M 310 170 H 430")}
    ${I(196,168)}
    ${I(644,168,t,-1)}
    <path d="M300 210 C 360 236 480 236 540 210" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
    <path d="M250 228 H 590" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
    ${T(214,250,78,22,"#f4f1e2",3)}
    ${T(548,250,78,22,"#f4f1e2",3)}
    ${xe(348,246,144,78,t)}
    ${z(420,284,t)}
    <path d="M200 322 h78 v22 h-78 z" fill="#111" stroke="rgba(255,255,255,.12)"/>
    <path d="M562 322 h78 v22 h-78 z" fill="#111" stroke="rgba(255,255,255,.12)"/>
    ${e.spoiler?'<path d="M230 118 h380 v16 h-380 z" fill="#161616"/>':""}
    ${te("M 420 210 V 340",e)}
    ${g(188,332,52,e.wheel,t,e.brakes)}
    ${g(652,332,52,e.wheel,t,e.brakes)}
    ${q(376,326,"VITT",!0)}`}function jt(e,t){return`
    <path d="M250 120 L590 120 L650 190 L670 250 L650 360 L190 360 L170 250 L190 190 Z" fill="url(#${t}-paint)"/>
    <path d="M290 128 L550 128 L590 186 L250 186 Z" fill="url(#${t}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
    ${S("M 320 146 H 460")}
    ${I(210,150)}
    ${I(630,150,t,-1)}
    <path d="M280 196 C 350 220 490 220 560 196" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
    ${T(210,228,70,30,"#f7f4ea",8)}
    ${T(560,228,70,30,"#f7f4ea",8)}
    ${xe(360,232,120,54,t)}
    <rect x="384" y="246" width="72" height="22" rx="4" fill="#9be7c4"/>
    <text x="420" y="261" text-anchor="middle" font-size="11" font-family="Outfit, sans-serif" fill="#0e3b34" font-weight="700">HYBRID</text>
    <path d="M300 304 h240 v8 h-240 z" fill="#143044" stroke="#67c7ff" stroke-width="2"/>
    ${Ye(360,112,120,16,t,e.roof)}
    ${g(200,338,46,e.wheel,t,!1)}
    ${g(640,338,46,e.wheel,t,!1)}
    ${q(374,318,"HRBR",!0)}`}function Gt(e,t){const a=e.lift===2?28:e.lift===1?12:0,o=58+(e.wheel==="mud"?12:e.wheel==="offroad"?8:0)+(e.lift===2?8:0);return`
    <g transform="translate(0 ${-a})">
      <path d="M200 70 L640 70 L690 150 L710 250 L680 360 L160 360 L130 250 L150 150 Z" fill="url(#${t}-paint)"/>
      <path d="M250 78 L590 78 L630 146 L210 146 Z" fill="url(#${t}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
      ${S("M 280 100 H 480")}
      ${I(188,96)}
      ${I(652,96,t,-1)}
      <path d="M240 156 C 330 178 510 178 600 156" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
      ${T(188,176,90,38,"#f4f1e4",4)}
      ${T(562,176,90,38,"#f4f1e4",4)}
      <rect x="300" y="186" width="240" height="112" rx="4" fill="url(#${t}-metal)" stroke="#5c656e" stroke-width="3"/>
      <rect x="308" y="194" width="224" height="96" fill="url(#${t}-mesh)"/>
      <path d="M316 210 h208 M316 232 h208 M316 254 h208 M316 276 h208" stroke="rgba(255,255,255,.35)" stroke-width="5"/>
      ${z(420,242,t)}
      ${e.winch?`<rect x="360" y="308" width="120" height="28" rx="4" fill="url(#${t}-metal)"/><circle cx="420" cy="322" r="10" fill="#222"/>`:""}
      ${e.lightbar?'<rect x="300" y="46" width="240" height="18" rx="3" fill="#1a1a1a"/><rect x="312" y="50" width="36" height="10" fill="#fff6c8"/><rect x="356" y="50" width="36" height="10" fill="#fff6c8"/><rect x="400" y="50" width="36" height="10" fill="#fff6c8"/><rect x="444" y="50" width="36" height="10" fill="#fff6c8"/><rect x="488" y="50" width="36" height="10" fill="#fff6c8"/>':""}
      <path d="M160 330 h120 v16 h-120 z" fill="url(#${t}-metal)"/>
      <path d="M560 330 h120 v16 h-120 z" fill="url(#${t}-metal)"/>
    </g>
    ${g(176,340,o*.92,e.wheel,t,!1)}
    ${g(664,340,o*.92,e.wheel,t,!1)}`}function Nt(e,t){return`
    <path d="M230 190 L610 190 L660 250 L670 340 L620 370 L220 370 L170 340 L180 250 Z" fill="url(#${t}-paint)"/>
    <path class="top-canvas" d="M300 120 L540 120 L590 190 L250 190 Z" fill="${e.topColor}" stroke="rgba(255,255,255,.2)"/>
    <path d="M270 150 L570 150 L600 196 L240 196 Z" fill="url(#${t}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
    ${S("M 310 164 H 470")}
    ${I(214,168)}
    ${I(626,168,t,-1)}
    <path d="M260 210 C 340 228 500 228 580 210" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
    ${T(210,258,64,38,"#f7f4ea",16)}
    ${T(566,258,64,38,"#f7f4ea",16)}
    ${xe(372,262,96,52,t)}
    ${z(420,288,t)}
    ${te("M 420 200 V 340",e)}
    ${g(196,340,50,e.wheel,t,!1)}
    ${g(644,340,50,e.wheel,t,!1)}
    ${q(374,322,"BRZ",!0)}`}function Vt(e,t){return`
    <path d="M230 150 L610 150 L660 230 L680 340 L640 372 L200 372 L160 340 L180 230 Z" fill="url(#${t}-paint)"/>
    <path d="M280 158 L560 158 L520 210 L320 210 Z" fill="url(#${t}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
    ${S("M 340 176 H 470")}
    <path d="M250 214 H 590" stroke="rgba(0,0,0,.35)" stroke-width="2"/>
    <path d="M240 228 H 600" stroke="rgba(255,255,255,.12)" stroke-width="2"/>
    ${T(196,248,92,26,"#e23b3b",3)}
    ${T(552,248,92,26,"#e23b3b",3)}
    ${z(420,236,t)}
    <path d="M220 332 h400 v18 h-400 z" fill="rgba(0,0,0,.35)" stroke="rgba(255,255,255,.08)"/>
    ${e.spoiler?'<path d="M180 112 h480 v18 h-480 z" fill="#141414"/><path d="M230 130 v24 M610 130 v24" stroke="#141414" stroke-width="6"/>':""}
    ${e.exhaust?`<circle cx="250" cy="348" r="10" fill="url(#${t}-metal)"/><circle cx="590" cy="348" r="10" fill="url(#${t}-metal)"/>`:'<circle cx="270" cy="346" r="7" fill="#777"/>'}
    ${te("M 420 210 V 330",e)}
    ${g(190,366,48,e.wheel,t,e.brakes)}
    ${g(650,366,48,e.wheel,t,e.brakes)}
    ${q(374,296,"VITT",!0)}`}function Wt(e,t){return`
    <path d="M230 130 L610 130 L660 200 L670 360 L180 360 L170 200 Z" fill="url(#${t}-paint)"/>
    <path d="M300 140 L540 140 L500 200 L340 200 Z" fill="url(#${t}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
    ${S("M 350 158 H 490")}
    <path d="M250 206 H 590" stroke="rgba(0,0,0,.32)" stroke-width="2"/>
    ${T(200,226,84,38,"#d23b32",4)}
    ${T(556,226,84,38,"#d23b32",4)}
    ${z(420,218,t)}
    <path d="M360 250 h120 v70 h-120 z" fill="rgba(0,0,0,.25)" stroke="rgba(255,255,255,.2)"/>
    <path d="M372 262 h96 M360 286 h120 M372 308 h96" stroke="rgba(255,255,255,.16)" stroke-width="1.5"/>
    <rect x="404" y="274" width="32" height="10" rx="2" fill="url(#${t}-metal)"/>
    ${g(200,364,42,e.wheel,t,!1)}
    ${g(640,364,42,e.wheel,t,!1)}
    ${q(374,292,"HRBR")}`}function Zt(e,t){const a=e.lift===2?26:e.lift===1?12:0,o=58+(e.wheel==="mud"?10:0),n=e.cover==="hard"?"#2c3136":e.cover==="soft"?"#1b1d20":`url(#${t}-paint)`;return`
    <g transform="translate(0 ${-a})">
      <path d="M170 90 L670 90 L710 170 L720 250 L690 360 L150 360 L120 250 L130 170 Z" fill="url(#${t}-paint)"/>
      <path d="M250 100 L590 100 L560 160 L280 160 Z" fill="url(#${t}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
      ${S("M 310 118 H 520")}
      <path d="M230 168 H 610" stroke="rgba(0,0,0,.32)" stroke-width="2"/>
      ${T(175,196,104,36,"#d23b32",3)}
      ${T(561,196,104,36,"#d23b32",3)}
      ${z(420,178,t)}
      <rect x="300" y="210" width="240" height="120" fill="${n}" stroke="rgba(255,255,255,.2)"/>
      <path d="M312 232 h216 M300 268 h240 M312 304 h216" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
      <rect x="404" y="252" width="32" height="12" rx="2" fill="url(#${t}-metal)"/>
      ${e.exhaust?`<circle cx="150" cy="340" r="9" fill="url(#${t}-metal)"/><circle cx="690" cy="340" r="9" fill="url(#${t}-metal)"/>`:""}
    </g>
    ${g(160,370,o,e.wheel,t,!1)}
    ${g(680,370,o,e.wheel,t,!1)}
    ${q(374,276,"1500",!0)}`}function qt(e,t){return`
    <path d="M230 180 L610 180 L660 250 L670 360 L170 360 L180 250 Z" fill="url(#${t}-paint)"/>
    <path class="top-canvas" d="M300 120 L540 120 L590 180 L250 180 Z" fill="${e.topColor}" stroke="rgba(255,255,255,.18)"/>
    <path d="M320 150 L520 150 L490 196 L350 196 Z" fill="url(#${t}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
    ${S("M 360 164 H 480")}
    <path d="M250 206 H 590" stroke="rgba(0,0,0,.3)" stroke-width="2"/>
    ${T(200,246,74,32,"#d23b32",8)}
    ${T(566,246,74,32,"#d23b32",8)}
    ${z(420,228,t)}
    <path d="M230 332 h380 v16 h-380 z" fill="rgba(0,0,0,.32)"/>
    ${g(196,366,46,e.wheel,t,!1)}
    ${g(644,366,46,e.wheel,t,!1)}
    ${q(374,292,"BRZ")}`}function Ut(e,t,a){const o=Math.max(0,e),n=Math.max(1,a);if(o===0)return 0;const i=t/100/12;if(i===0)return C(o/n);const r=(1+i)**n;return C(o*i*r/(r-1))}function C(e){return Math.round(e*100)/100}function Z(e){const a=(820-O(e,675,820))/145;return C(6+a*2)}function $e(e){return O(C(e+.7),e,8)}function J(e){return Ze(e.msrp*(1+e.markup),50)}function X(e){return Ze(e.msrp*(1-e.room),50)}function me(e){return e*12/52}function Je(){return y.weeklyTakeHome*52/12}function Qe({price:e,options:t=0,warranty:a=0,trade:o=0,down:n=0,apr:i=6,term:r=72,insurance:d=0}){const c=e+t,h=Math.max(0,c+a-o),p=C(h*Ie.taxRate),w=Ie.doc,m=Ie.title,k=C(c+a+w+m+p),A=C(k-o),b=Math.max(0,n),x=C(Math.max(0,A-b)),Y=Ut(x,i,r),E=C(Y*r),ee=C(Math.max(0,E-x)),G=Je(),U=me(we),ue=me(d),pe=me(Y),Le=y.weeklyTakeHome-U-ue-pe,oe=G>0?Y/G:0;return{selling:c,options:t,warranty:a,taxable:h,tax:p,doc:w,title:m,subtotal:k,trade:o,otd:A,down:b,financed:x,apr:i,term:r,payment:Y,totalOfPayments:E,interest:ee,insurance:d,monthlyTake:G,weeklyBills:U,weeklyIns:ue,weeklyPay:pe,weeklyLeft:Le,paymentShare:oe}}function Kt(e,t){const a=t.term,o=e.running??160,n=t.totalOfPayments,i=C((t.insurance||0)*a),r=C(o*a),d=t.down||0,c=C(n+d+i+r);return{months:a,note:n,interest:t.interest,insurance:i,upkeep:r,runningMonthly:o,down:d,warranty:t.warranty||0,total:c}}function Te(e){return e>.2||!Number.isFinite(e)?"bad":e>.15?"warn":"ok"}function De(){return`
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
    </svg>`}function Jt(){return`
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
    </svg>`}const l={screen:"intro",credit:{score:null,cosign:!1,boost:0,rolling:!1},carId:"stallion",builds:{},deals:{},category:"sound",view:0,spinning:!1,hintSeen:!1,moneyOpen:!1,sheet:null,advice:"",grade:null,lastGrade:null};function ae(){const{score:e,boost:t,cosign:a}=l.credit;return e?Math.min(820,e+(a?t:0)):null}function B(){return xt(l.carId)||ke[0]}function L(e=B()){return l.builds[e.id]||(l.builds[e.id]=Tt(e)),l.builds[e.id]}function _(e=B()){const t=L(e),a=ae()||700;if(!l.deals[e.id]){const r=Z(a);l.deals[e.id]={carId:e.id,price:J(e),trade:R.open,apr:$e(r),term:72,downChecking:0,downSavings:0,effectiveScore:a}}const o=l.deals[e.id];o.effectiveScore=a;const n=Z(a),i=$e(n);return o.apr=O(o.apr,n,i),o.price=O(o.price,X(e),J(e)),o.trade=O(o.trade,R.min,R.max),o.downChecking=O(o.downChecking,0,y.checking),o.downSavings=O(o.downSavings,0,y.savings),o.warrantySync=t.single.warranty,o}function Qt(){l.credit={score:null,cosign:!1,boost:0,rolling:!1},l.carId="stallion",l.builds={},l.deals={},l.category="sound",l.view=0,l.spinning=!1,l.hintSeen=!1,l.moneyOpen=!1,l.sheet=null,l.advice="",l.grade=null}function Xt(){try{const e=localStorage.getItem("dreamcar-last");l.lastGrade=e?JSON.parse(e):null}catch{l.lastGrade=null}}function _t(e,t){const a={letter:e.letter,title:e.title,car:t.name,payment:e.quote.payment};l.lastGrade=a;try{localStorage.setItem("dreamcar-last",JSON.stringify(a))}catch{}}function ea(){const e=Math.random();let t,a;return e<.06?(t=675,a=699):e<.68?(t=700,a=780):e<.94?(t=781,a=809):(t=810,a=820),t+Math.floor(Math.random()*(a-t+1))}function Xe(e){return e>=800?{id:"excellent",label:"Excellent",line:"Cheap money. Do not waste it on a stupid car."}:e>=740?{id:"verygood",label:"Very good",line:"The bank will talk nice. Not charity-nice. Nice."}:e>=700?{id:"good",label:"Good",line:"Respectable. Ricky will still try to fatten the rate. Do not let him."}:{id:"fair",label:"Fair",line:"The rate is going to sting. This is the moment you think about your mother. Carefully."}}function ta(){return"I am Vinny Caputo. They call me Numbers. Ricky is going to smile. I am here so you do not smile back too fast. First we see what the bank thinks you are worth."}function aa(e){const t=Xe(e);return e>=800?`${e}. ${t.line} An 800 is rare. Do not celebrate by buying the ceiling of the menu.`:e<700?`${e}. ${t.line} Most people land in the 700s. You caught a thin one. We can still shop. We just will not pretend the money is free.`:`${e}. ${t.line}`}function oa(e,t,a){return a>=760?`Ma co-signed anyway. +${e}, so the bank sees ${t}. You did not need her. Now you owe her more than money. Do not miss a payment. Ever.`:`You called Ma. She sighed the sigh. She said yes. +${e} on the score the bank will use, which puts you at ${t}. That is a gift. Treat it like one.`}function Me(e,t){const a=ve(e,t),o=a.lines.filter(h=>h.price>0&&h.group!=="warranty"),n=o.filter(h=>h.tag==="joke"),i=o.filter(h=>h.tag==="smart"),r=o.filter(h=>h.tag==="fluff"||h.tag==="joke").reduce((h,p)=>h+p.price,0),d=a.lines.find(h=>h.group==="warranty"),c=ce(e,t);if(n.length){const h=n[n.length-1];return h.tip||`${h.name} is a bit. The payment will not get the joke.`}return c.joke?"Gold flake. Seventy-five hundred so the car can glitter. Your nonna would take the spatula away from you.":(d==null?void 0:d.price)>0&&d.tip?d.tip:r>e.msrp*.12?`You have ${s(r)} in extras that mostly wave at people. The car was already a car. The payment is where it gets heavy.`:a.options===0&&((d==null?void 0:d.id)==="none"||!d)?"Bone stock, factory coverage. On a new car that is a real position. The one warranty I would still hear is the electronics. Screens and cameras. Not a second powertrain.":i.length>=2&&r<800?"Look at you. Mats, a camera, stuff you will actually use. This is how a grown-up builds a car.":e.id==="breeze"&&t.topDown?"Top down is free. Say it again when they try to charge you for joy. The canvas color is the only part with a price.":e.id==="stallion"&&a.options<2500?"I love a Stallion. Your paycheck is less romantic. Build it, sit at the desk, and be ready to walk. A sharp deal on the wrong car is still the wrong car.":e.id==="harbor"&&r>2500?"You took the sensible car and dressed it like the silly one. Pick a lane. The Harbor wins when the build stays quiet.":e.id==="ironhorn"&&(t.single.stance==="lift"||t.single.wheels==="mud")?"The truck was already a truck. The lift and the carnival tires are how a work vehicle becomes a hobby you finance.":"Every option has a price because every option lands in the payment. If you will not notice it on a Tuesday, leave it in the rack."}function _e(e,t){const a=J(e),o=X(e),n=Math.max(1,a-o),i=(a-t.price)/n,r=(t.trade-3600)/2e3;return i>.85&&r>.7?"Alright. Alright. You win on the car. I still have a family. Probably.":i>.55?"You are killing me. Let me pretend to call my manager.":r>.65?"I have to wholesale that jalopy. My guy is going to laugh at me.":t.apr<=Z(t.effectiveScore)+.05?"Rates come from the bank, not from me. Today the bank is feeling generous. Apparently.":i<.15&&r<.25?"This one has been waiting for someone with taste. I can probably come down a little. Probably.":"I can move a little. Do not make me get emotional. I just had lunch."}function et(e,t,a){const o=X(e),n=J(e),i=Z(t.effectiveScore),r=Te(a.paymentShare);if(t.downChecking+t.downSavings>a.otd+1&&a.financed===0)return"You brought more cash than the car costs. Put the extra back. A cash deal can still be a bad price.";if(a.weeklyLeft<0)return"This payment eats the week alive. You would be choosing between the car and groceries. That is not a deal. That is a trap with a steering wheel.";if(r==="bad")return`The payment is ${se(a.paymentShare)} of take-home. I start sweating at fifteen. We are past sweating. Stretch the term and it only hides the problem.`;if(r==="warn")return`You are over that 15% line, at ${se(a.paymentShare)} of take-home. It works until the first surprise bill. Then it does not. Knock the price or the fluff.`;const d=y.savings-t.downSavings,c=t.downChecking+t.downSavings;return d<P-1?`You left ${s(d)} in savings. Two months of bills is about ${s(P)}. That backup stays. A chunk of the fifteen thousand can be the down payment. The part under two months of bills cannot.`:t.downChecking>7e3?"You are about to hand Ricky the checking account. Rent does not care how the car smells. Leave yourself a month of life.":t.price<=o+50&&t.trade>=5e3&&t.apr<=i+.05&&r==="ok"&&c>=2e3?"Now we are talking. Price is at the bone, the jalopy got respect, the rate matches your score, and you put real money down. Shake before he changes his mind.":t.price<=o+50&&t.trade>=5e3&&t.apr<=i+.05&&r==="ok"?"Price, trade, and rate are clean. You are still light on the down payment. A chunk of that savings is for this. Leave about two months of bills, and put some of the rest on the hood before depreciation eats you in the street.":t.price>=n-50?"You are still sitting on his opening number. That number has a markup in it. Slide it toward you. He expects you to.":t.trade<=3800?"He lowballed the Cumberland. It is ugly. It is not worthless. Four thousand five hundred is fair. Make him climb.":t.apr>i+.25?`The rate is ${t.apr.toFixed(2)}%. Your score earned about ${i.toFixed(2)}%. The gap is Ricky’s quiet little tip. Take it back.`:t.term===84&&a.paymentShare<.1?"You can afford a shorter term and you are still stretching to eighty-four. That is extra interest for a payment you do not need. Look at sixty.":t.term===84?"Eighty-four months is seven years with this car. The payment looks kind. The interest is the unkind part. Only stay here if sixty genuinely breaks the week.":a.weeklyLeft<140?`You can swing it. You just cannot sneeze. About ${s(a.weeklyLeft)} left in the week after bills, insurance, and the car. Tight.`:c<1e3?"Zero down feels clever until the tires hit the street. The car is worth less immediately, and the loan is still the whole thing. Fifteen thousand in savings is partly for this. Keep about two months of bills. Use some of the rest.":t.downSavings>=1500&&d>=P?`${s(t.downSavings)} from savings onto the down payment, about ${s(d)} still sitting there. Two months of bills is roughly ${s(P)}. That is what a piece of the pile is for. Better than rolling out with nothing down.`:`The week still has air in it, about ${s(a.weeklyLeft)} after the life you already live. That is how you stay a person, not a payment.`}function Oe(e,t,a){const o=ve(e,t);return{priced:o,quote:Qe({price:a.price,options:o.options,warranty:o.warranty,trade:a.trade,down:a.downChecking+a.downSavings,apr:a.apr,term:a.term,insurance:Ue(e,t)})}}const Be=[{min:93,letter:"A+",title:"He never saw you coming"},{min:86,letter:"A",title:"That is a grown-up deal"},{min:78,letter:"B",title:"You held your own"},{min:70,letter:"C",title:"You left money on the desk"},{min:60,letter:"D",title:"Ricky is buying dinner tonight"},{min:0,letter:"F",title:"They ate you alive"}];function Ne(e,t,a,o,n){if(a===t)return n;const i=Math.min(1,Math.max(0,(e-t)/(a-t)));return o+(n-o)*i}function na(e,t,a){const{priced:o,quote:n}=Oe(e,t,a),i=Z(a.effectiveScore),r=X(e),d=J(e),c=[];let h=0;const p=Ne(a.price,d,r,0,22);h+=p,a.price>=e.msrp*1.02?c.push({tone:"bad",text:`You paid ${s(a.price)} on a ${s(e.msrp)} car. That is a markup, and you thanked him for it.`}):a.price<=r+80?c.push({tone:"good",text:`You walked the ${e.name} down to ${s(a.price)}. That is the bone. Ricky felt that.`}):a.price<e.msrp?c.push({tone:"mid",text:`Under sticker, at ${s(a.price)}. Respectable. There was still a little meat on it.`}):c.push({tone:"bad",text:`You paid sticker, ${s(a.price)}. On this lot, sticker is where the conversation starts, not where it ends.`});const w=Ne(a.trade,3400,5300,1,14);h+=Math.max(0,Math.min(14,w)),a.trade<4e3?c.push({tone:"bad",text:`The trade came in at ${s(a.trade)}. The jalopy is ugly. It is still a ${s(4500)} car. You let him steal it.`}):a.trade>=5e3?c.push({tone:"good",text:`He paid ${s(a.trade)} for a car he does not want to look at. That is found money off the loan.`}):c.push({tone:"mid",text:`Trade at ${s(a.trade)}. Fair lives around $4,500. You are in the neighborhood.`});const m=a.apr-i,k=m<=.05?16:m<=.2?12:m<=.4?7:2;h+=k,m<=.05?c.push({tone:"good",text:`The rate is ${a.apr.toFixed(2)}%. That matches a ${a.effectiveScore} score. This is the whole ballgame.`}):c.push({tone:"bad",text:`You are paying ${m.toFixed(2)} points more than your score earned. On this loan that tip goes to the bank, quietly, for years.`});let A=a.term===60?10:a.term===72?6:2;a.term===84&&n.paymentShare>.12&&Qe({...n,term:60,price:a.price,options:o.options,warranty:o.warranty,trade:a.trade,down:n.down,apr:a.apr,insurance:n.insurance}).paymentShare>.18&&(A=5),h+=A,a.term===84?c.push({tone:"bad",text:`Eighty-four months. You will pay ${s(n.interest)} in interest. A shorter term costs more a month and a lot less of your life.`}):a.term===60?c.push({tone:"good",text:"Five years, not seven. You refused the long, pretty payment. I respect that."}):c.push({tone:"mid",text:"Six years is the middle chair. Not a crime. Not a victory."});const b=o.warrantyId;let x=4;b==="tech"?x=8:b==="none"?x=7:b==="basic"?x=4:b==="bumper"?x=3:b==="platinum"&&(x=2),h+=x,b==="tech"?c.push({tone:"good",text:"Electronics coverage, a few hundred. Screens, cameras, the infotainment. That is the warranty that earns its keep. The factory already has the rest, because the car is new."}):b==="platinum"?c.push({tone:"bad",text:"Platinum, five thousand, on a new car. Factory coverage is a big reason you buy new. That binder is a second promise with a boat payment inside it."}):b==="bumper"?c.push({tone:"bad",text:"Full bumper-to-bumper on a new car. You already bought that coverage when you bought new. You just paid for it twice."}):b==="basic"?c.push({tone:"mid",text:"Powertrain coverage, two thousand, on a car that just came with powertrain coverage. Buying new was that warranty."}):b==="none"&&c.push({tone:"good",text:"Factory coverage only. On a new car that is the right starting point. If you add one thing, make it the electronics, not a second bumper-to-bumper."});let Y=22;n.paymentShare<=.1?Y=22:n.paymentShare<=.15?Y=16:n.paymentShare<=.2?Y=7:Y=0,h+=Y;let E=100;n.weeklyLeft<0?(c.push({tone:"bad",text:`After bills, insurance, and this payment, the week is ${s(n.weeklyLeft)}. Negative. You cannot live in a negative week.`}),E=36):n.paymentShare>.15?c.push({tone:"bad",text:`The payment is ${se(n.paymentShare)} of take-home, past the 15% line, at ${s(n.payment,!0)} a month.`}):n.weeklyLeft<120?(c.push({tone:"mid",text:`About ${s(n.weeklyLeft)} left in the week. You can swing it. You cannot sneeze.`}),E=Math.min(E,74)):c.push({tone:"good",text:`The week still breathes. About ${s(n.weeklyLeft)} left after housing, food, the phone, insurance, and the car.`});const ee=y.savings-a.downSavings,G=a.downChecking+a.downSavings;a.downChecking>=7e3&&(c.push({tone:"bad",text:"You drained checking to look like a hero at the desk. The car is pretty. The rent is prettier, because it always shows up."}),h-=8),ee<P-1?(c.push({tone:"bad",text:`You left ${s(ee)} in savings. Two months of bills is about ${s(P)}. That backup stays. A down payment can use what sits above it.`}),h-=8):G<500?(c.push({tone:"bad",text:"You rolled out with almost nothing down. The car is worth less the second it hits the street. A chunk of that savings exists so the loan is not already underwater in the parking lot."}),h-=6):a.downSavings>=2e3?(c.push({tone:"good",text:`You put ${s(a.downSavings)} of savings on the hood and left about ${s(ee)}. That pile was partly for this. Two months of bills are still sitting there.`}),h+=3):G>=2e3&&(c.push({tone:"good",text:`You put ${s(G)} down. Real money, so depreciation does not eat you before the first light. Some of the savings can still join it, as long as two months of bills stay put.`}),h+=2);const U=o.lines.filter(j=>j.tag==="joke").reduce((j,ut)=>j+ut.price,0),ue=o.options/e.msrp;U>0?(c.push({tone:"bad",text:`${s(U)} of this build is a bit with a price tag. The bank does not have a sense of humor.`}),h-=Math.min(10,4+U/4e3)):ue>.15?(c.push({tone:"mid",text:`Options added ${s(o.options)}, more than 15% of the car. Some of that you will touch. Some of it you will only see on the statement.`}),h-=5):o.options>0&&o.options<1800&&(c.push({tone:"good",text:`The build stayed modest, ${s(o.options)} in options. You bought a car, not a catalog.`}),h+=3),n.interest>8e3&&c.push({tone:"mid",text:`Interest alone is ${s(n.interest)}. That is another used car sitting on the curb, except you do not get to drive it.`});const pe=a.price<=r+250&&a.trade>=4700&&m<=.11&&U===0&&ee>=P-1&&G>=1500&&a.downChecking<=5500,Le=n.paymentShare>.15||n.weeklyLeft<120;pe&&Le&&(c.unshift({tone:"good",text:`You worked the desk. Price, trade, and rate are clean. A ${e.name} still does not fit a $1,010 week. The smart move is a different car, not a longer marriage to the bank.`}),h=Math.max(h,76),E=Math.max(E,84)),h=Math.max(0,Math.min(E,Math.round(h)));const oe=Be.find(j=>h>=j.min)||Be[Be.length-1],ct=c.filter(j=>j.tone==="good"),dt=c.filter(j=>j.tone==="bad"),ht=ia(oe.letter,ct,dt,e,n);return{score:h,letter:oe.letter,title:oe.title,notes:c,narrative:ht,quote:n,priced:o,earnedApr:i}}function ia(e,t,a,o,n){var c,h;const i=(c=t[0])==null?void 0:c.text,r=(h=a[0])==null?void 0:h.text,d={"A+":"I am proud of you. You walked in with a beater and you did not leave married to a bad note. Ricky is going to tell his wife the wifi was down. That is how you know.",A:"That is a deal you can say out loud at Sunday dinner. Not perfect. Honest. Take the keys and do not add a single thing in the finance office.",B:"You held your own. He did not rob you, and you did not rob him, which is fine, because robbing him was never the job. Living with the payment is the job.",C:"You survived. Survival is not the same as a good deal. There is money still sitting on his side of the desk, and it answers to your name.",D:"Ricky eats tonight. You will be eating around this payment for years. We can run it again. I am not mad. I am annoyed. There is a difference.",F:"They saw you coming from the parking lot. The week cannot carry this car. I do not care how it looks under the lights. We are not signing this. We are learning it, and then we are doing it over."};return e==="A+"||e==="A"?`${i||`The ${o.name} fits the week.`} ${r||"I do not have a real complaint. Do not make me find one."} ${d[e]}`:e==="F"||e==="D"?`${r||`The payment is ${s(n.payment,!0)}, and the week felt that.`} ${i||"You showed up. That is step one, not the whole walk."} ${d[e]}`:`${i||"There is something in here I can defend."} ${r||"And there is something I would still push."} ${d[e]}`}function ra(e){const t=X(e);return`Here is the whole sermon, short. Knock the ${e.name} toward ${s(t)}, not his opening number. Get the jalopy to at least $4,500. Take the rate your score earned, not the one with his fingerprint on it. Keep the payment under 15% of take-home. Put real money down. Checking, and some of the savings, as long as about two months of bills stay put. Zero down and depreciation eats you in the parking lot. Warranty: the car is new, so the factory already covers the bumper and the powertrain. A few hundred for the screens and cameras is the smart add. Not two grand of powertrain, and not five of platinum. Then look at what it costs to own, not the sticker, and shake his hand like you mean to leave.`}function sa(e,t){const a=t.months/12,o=a===1?"year":"years",n=t.warranty>0?`The ${s(t.warranty)} warranty is already inside those payments.`:"No extra warranty on top of the factory promise.",i=t.down>0?`${s(t.down)} down is in the total, not in the monthly.`:"Zero down, so the loan is the whole car.";return`The sticker is just the hello. Over ${a} ${o} the payments come to ${s(t.note)}, and ${s(t.interest)} of that is interest. ${i} Insurance, about ${s(t.insurance)}. Gas and upkeep on a ${e.name}, roughly ${s(t.upkeep)}. ${n} Near ${s(t.total)} to own it.`}const Ve=[{id:"credit",label:"Credit"},{id:"lot",label:"Cars"},{id:"studio",label:"Studio"},{id:"negotiate",label:"Desk"},{id:"grade",label:"Deal"}];function he(){const e=document.getElementById("app"),t=l.screen==="studio"||l.screen==="negotiate";e.classList.toggle("is-lock",t);const a=document.getElementById("hud");a.hidden=l.screen==="intro",l.screen!=="intro"?tt():document.getElementById("drawer").hidden=!0;const o=document.getElementById("screen"),n={intro:We,credit:ba,lot:ka,studio:xa,negotiate:Ma,grade:La};o.innerHTML=(n[l.screen]||We)()}function tt(){const e=ae(),a=l.screen==="negotiate"||l.screen==="grade"?l.deals[l.carId]:null,o=y.checking-((a==null?void 0:a.downChecking)||0),n=y.savings-((a==null?void 0:a.downSavings)||0),i=Ve.findIndex(r=>r.id===l.screen);document.getElementById("hud").innerHTML=`
    <div class="hud-row">
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">Checking</span>
        <span class="v">${s(o)}</span>
      </button>
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">Savings</span>
        <span class="v">${s(n)}</span>
      </button>
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">${e?l.credit.cosign?"With Ma":"Credit":"Pay"}</span>
        <span class="v">${e||"$1,010"}</span>
      </button>
      <button type="button" class="icon-btn ${v.on?"is-on":""}" data-action="audio" aria-label="${v.on?"Mute the violin":"Play the violin"}" aria-pressed="${v.on}">
        ${ya()}
      </button>
    </div>
    <ol class="steps">
      ${Ve.map((r,d)=>`<li class="${d===i?"is-on":d<i?"is-done":""}">${r.label}</li>`).join("")}
    </ol>`,document.getElementById("drawer").innerHTML=ga()}function la(){const e=document.querySelector('[data-action="audio"]');e&&(e.classList.toggle("is-on",v.on),e.setAttribute("aria-pressed",String(v.on)),e.setAttribute("aria-label",v.on?"Mute the violin":"Play the violin"))}function ca(){const e=document.getElementById("drawer");l.moneyOpen=!l.moneyOpen,e.hidden=!l.moneyOpen}function da(e){var o;const t=Lt[e];if(!t)return;const a=document.getElementById("overlay");a.hidden=!1,a.innerHTML=`
    <div class="sheet-back">
      <div class="scrim" data-action="close-sheet"></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <header class="sheet-head">
          <p class="eyebrow">What is this?</p>
          <h2 id="sheet-title">${f(t.title)}</h2>
          <button type="button" class="icon-btn sheet-x" data-action="close-sheet" aria-label="Close">×</button>
        </header>
        ${je(t.body)}
      </div>
    </div>`,(o=a.querySelector(".sheet-x"))==null||o.focus()}function He(){const e=document.getElementById("overlay");e.hidden=!0,e.innerHTML=""}function at(){l.moneyOpen=!1;const e=document.getElementById("drawer");e&&(e.hidden=!0)}function N(){const e=B(),t=L(e),a=ve(e,t),o=ce(e,t),n=document.getElementById("hero-art");if(n){const h=Pe(e,t);n.innerHTML=ze(e.id,V[l.view].id,h,`hero${l.view}`)}document.querySelectorAll(".swatch").forEach(h=>{const p=h.dataset.paint===t.paint;h.classList.toggle("is-on",p),h.setAttribute("aria-pressed",String(p))}),M("paint-label",o.price?`${o.name} · +${s(o.price)}`:o.name),fa(t),ma(),M("dock-price",s(a.total)),M("dock-sub",`${s(a.msrp)} car · ${s(a.options)} options · ${s(a.warranty)} warranty`),M("vinny-tip-text",Me(e,t));const i=document.getElementById("hero");i==null||i.classList.toggle("is-spinning",l.spinning);const r=document.querySelector('[data-action="spin"]');r&&(r.textContent=l.spinning?"Stop":"Spin");const d=document.getElementById("swipe-hint");d&&(d.hidden=l.hintSeen);const c=document.querySelector('[data-action="top"]');c&&(c.textContent=t.topDown?"Raise the top":"Drop the top")}function ha(){var a;const e=B(),t=document.getElementById("options");t&&(t.innerHTML=it(e,L(e))),document.querySelectorAll(".cat").forEach(o=>{o.classList.toggle("is-on",o.dataset.cat===l.category)}),(a=document.getElementById("studio-scroll"))==null||a.scrollTo(0,0),M("vinny-tip-text",Me(e,L(e)))}function ua(){const e=L(),t=document.querySelector("#hero-art .car");t==null||t.classList.toggle("is-down",e.topDown);const a=document.querySelector('[data-action="top"]');a&&(a.textContent=e.topDown?"Raise the top":"Drop the top"),M("vinny-tip-text",Me(B(),e))}function re({sliders:e=!1}={}){var k,A;const t=B(),a=L(t),o=_(t),{quote:n,priced:i}=Oe(t,a,o);M("price-readout",s(o.price)),M("trade-readout",s(o.trade)),M("apr-readout",`${o.apr.toFixed(2)}%`),M("check-readout",`${s(o.downChecking)} down · ${s(y.checking-o.downChecking)} left`),M("save-readout",ot(o.downSavings)),M("ricky-line",_e(t,o)),M("vinny-desk-text",l.advice||et(t,o,n)),M("dock-pay",s(n.payment,!0));const r=Te(n.paymentShare),d=n.weeklyLeft;M("dock-sub",`${o.term} mo · ${o.apr.toFixed(2)}% · ${s(d)} left this week`);const c=document.getElementById("dock-pay");c==null||c.classList.remove("zone-ok","zone-warn","zone-bad"),c==null||c.classList.add(`zone-${d<0?"bad":r}`);const h=document.getElementById("pressure");h&&(h.innerHTML=rt(n));const p=document.getElementById("budget-mount");p&&(p.innerHTML=st(n));const w=document.getElementById("tco-mount");w&&(w.innerHTML=Ee(t,n)),(A=(k=document.querySelector('[data-lever="savings"]'))==null?void 0:k.closest(".lever"))==null||A.classList.toggle("warn",nt(o.downSavings));const m=document.getElementById("sheet-mount");m&&(m.innerHTML=lt(t,o,i,n)),document.querySelectorAll("[data-term]").forEach(b=>{const x=Number(b.dataset.term)===o.term;b.classList.toggle("is-on",x),b.setAttribute("aria-pressed",String(x))}),document.querySelectorAll("[data-warranty]").forEach(b=>{const x=b.dataset.warranty===a.single.warranty;b.classList.toggle("is-on",x),b.setAttribute("aria-pressed",String(x))}),e&&(ne("price",o.price),ne("trade",o.trade),ne("apr",o.apr),ne("checking",o.downChecking),ne("savings",o.downSavings)),tt()}function pa(e){String(e).padStart(3,"0").split("").forEach((a,o)=>{const n=document.getElementById(`d${o}`);n&&(n.textContent=a)})}function ne(e,t){const a=document.querySelector(`[data-lever="${e}"]`);a&&(a.value=String(t))}function ot(e){const t=y.savings-e;return e<=0?"None down yet":t<P?`${s(e)} · backup thin`:`${s(e)} down · ${s(t)} left`}function nt(e){return e>0&&y.savings-e<P}function Ee(e,t){const a=Kt(e,t);return`<section class="tco">
    <div class="tco-top">
      <span>Total cost of ownership ${$("tco")}</span>
      <strong>${s(a.total)}</strong>
    </div>
    <p>${f(sa(e,a))}</p>
  </section>`}function M(e,t){const a=document.getElementById(e);!a||a.textContent===t||(a.textContent=t,a.classList.remove("pop"),a.offsetWidth,a.classList.add("pop"))}function fa(e){document.querySelectorAll(".opt").forEach(t=>{const a=t.dataset.mode==="single"?e.single[t.dataset.group]===t.dataset.id:(e.multi[t.dataset.group]||[]).includes(t.dataset.id);t.classList.toggle("is-on",a),t.setAttribute("aria-pressed",String(a))})}function ma(){document.querySelectorAll(".view-dot").forEach(e=>{e.classList.toggle("is-on",Number(e.dataset.view)===l.view)})}function $(e,t=!1){return t?`<button type="button" class="what mini" data-action="glossary" data-term="${e}" aria-label="What is this?">?</button>`:`<button type="button" class="what" data-action="glossary" data-term="${e}">What is this?</button>`}function je(e,t="Vinny “Numbers” Caputo"){return`<div class="vinny">
    ${De()}
    <div class="bubble">
      <span class="who">${t}</span>
      <p>${f(e)}</p>
    </div>
  </div>`}function ya(){return'<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M9 18a3 3 0 1 1-2-2.83V5.7l10-2v8.47A3 3 0 1 1 15 14V6.1l-6 1.2V18z"/></svg>'}function ga(){const e=l.credit.score,t=ae(),a=me(we);return`<div class="drawer-card">
    <div class="drawer-head">
      <h2>The week you actually have</h2>
      <button type="button" class="icon-btn" data-action="money" aria-label="Close money">×</button>
    </div>
    <p class="lead">Salary ${s(y.salary)} a year. Take-home about <strong>${s(y.weeklyTakeHome)} a week</strong> after a plain tax estimate. ${$("takehome")}</p>
    <p class="fine">That is about ${s(Je())} a month. The salary is the rumor. The week is the truth.</p>
    <ul class="bills">
      ${qe.map(o=>`<li><span>${f(o.label)}</span><b>${s(o.amount)}</b></li>`).join("")}
      <li class="total"><span>Locked bills</span><b>${s(we)} / mo</b></li>
    </ul>
    <p class="fine">About ${s(a)} of every paycheck is already spoken for. The car has to live in what’s left, next to gas, insurance, and a life.</p>
    <ul class="bills">
      <li><span>Checking</span><b>${s(y.checking)}</b></li>
      <li><span>Savings</span><b>${s(y.savings)}</b></li>
      ${e?`<li><span>Credit ${$("credit")}</span><b>${e}${l.credit.cosign?` → ${t} with Ma`:""}</b></li>`:""}
    </ul>
    <p class="fine">About ${s(y.savings)} in savings. A chunk of it can be the down payment. Leave roughly ${s(P)} — two months of bills — and do not blow the pile on a spoiler.</p>
  </div>`}function We(){const e=l.lastGrade;return`<section class="intro">
    <div class="sky">
      <p class="eyebrow">Route 17 · after the rain</p>
      <div class="neon" aria-hidden="true"><span>Dream</span> <span>Car</span></div>
    </div>
    <div class="stage">
      <div class="asphalt"></div>
      <div class="jalopy-drive">${St()}</div>
      <div class="hangtag"><span>Your trade</span><strong>${s(fe.trade)}</strong><em>${fe.year} ${f(fe.name)}</em></div>
    </div>
    <div class="intro-copy">
      <h1>Let's go car shopping!</h1>
      <p>${f(fe.line)} Checking ${s(y.checking)}. Savings ${s(y.savings)}. A ${s(y.salary)} salary that shows up as about ${s(y.weeklyTakeHome)} a week.</p>
      ${e?`<p class="last-deal">Last time Vinny called it a ${f(e.letter)} on the ${f(e.car)}.</p>`:""}
      <button type="button" class="btn primary xl" data-action="start">Step onto the lot</button>
      <button type="button" class="btn text" data-action="audio">${v.on?"Violin’s on":"A little violin, if you want it"}</button>
    </div>
  </section>`}function ba(){const{score:e,cosign:t,boost:a,rolling:o}=l.credit,n=ae(),i=t?n:e,r=e?Xe(n):null,d=e?Z(n):null;return`<section class="credit">
    <p class="eyebrow">Before the shiny things</p>
    <h1>${e?r.label:"Roll your credit."}</h1>
    <div class="odo ${o?"is-rolling":""}" aria-hidden="true">
      <span id="d0">${i?String(i)[0]:"–"}</span>
      <span id="d1">${i?String(i)[1]:"–"}</span>
      <span id="d2">${i?String(i)[2]:"–"}</span>
    </div>
    ${e&&t?`<p class="cosign-note">Your roll was ${e}. With Ma, the bank sees <strong>${n}</strong>.</p>`:""}
    <div class="what-row">${$("credit")}</div>
    ${je(e?t?oa(a,n,e):aa(e):ta())}
    ${e?`<p class="rate-preview">Money like yours starts near <strong>${d.toFixed(2)}% APR</strong> before anybody marks it up. ${$("apr")}</p>`:'<p class="fine center">The reel is weighted like life. Most people land in the 700s. A 675 and an 820 are both rare.</p>'}
    ${e?wa():""}
    <div class="stack">
      ${e?"":`<button type="button" class="btn primary xl" data-action="roll" ${o?"disabled":""}>Roll the dice</button>`}
      <button type="button" class="btn ${e?"primary xl":"ghost"}" data-action="to-lot" ${e?"":"disabled"}>See the cars</button>
    </div>
  </section>`}function wa(){if(l.credit.cosign)return`<article class="card cosign done">
      <h2>Ma’s on the note.</h2>
      <p>The rate moves. So does the family obligation. ${$("cosigner")}</p>
    </article>`;const e=l.credit.score<720;return`<article class="card cosign ${e?"hot":""}">
    <h2>${e?"The rate is going to bite.":"You can leave Ma out of this."}</h2>
    <p>${e?"Ask her to co-sign and the bank will pretend you are 50 to 75 points prettier. She is on the hook if you are not.":"A co-signer helps a thin score. Yours is not thin. Asking anyway puts her name on a car she does not drive."}</p>
    <button type="button" class="btn ${e?"primary":"ghost"}" data-action="cosign">Ask Mom to co-sign</button>
    <div class="what-row">${$("cosigner")}</div>
  </article>`}function ka(){const e=ae(),t=l.credit.score<720&&!l.credit.cosign;return`<section class="lot">
    <header class="lot-head">
      <p class="eyebrow">Falco Motors · the row</p>
      <h1>Four cars. One paycheck.</h1>
      <p>Don’t fall in love before the number. Credit the bank will use: <strong>${e}</strong>.</p>
      ${t?'<button type="button" class="btn tiny" data-action="back-credit">Still time to ask Ma</button>':""}
    </header>
    <div class="lot-scroller" id="lot-scroller">
      ${ke.map(a=>$a(a)).join("")}
    </div>
    <div class="lot-nav">
      <button type="button" class="icon-btn" data-action="lot-prev" aria-label="Previous car">‹</button>
      <div class="lot-dots" id="lot-dots">
        ${ke.map((a,o)=>`<span class="lot-dot ${o===0?"is-on":""}" data-dot="${a.id}"></span>`).join("")}
      </div>
      <button type="button" class="icon-btn" data-action="lot-next" aria-label="Next car">›</button>
    </div>
  </section>`}function $a(e){const t=l.builds[e.id]||{paint:e.colors[0].id,topDown:!1,single:{wheels:"stock",roof:"none",tint:"none",top:"black",liner:"none",cover:"none",stance:"stock"},multi:{}},a=Pe(e,va(t));return`<article class="lot-slide">
    <div class="lot-art">${ze(e.id,"side",a,`lot${e.id}`)}</div>
    <p class="eyebrow">${f(e.maker)} · ${f(e.vibe)}</p>
    <h2>${f(e.name)}</h2>
    <p class="msrp">${s(e.msrp)} <span>MSRP</span> ${$("msrp")}</p>
    <p class="lot-line">${f(e.line)}</p>
    <p class="insure">Vinny’s insurance guess: ${s(e.insurance)}/mo. ${$("insurance")}</p>
    <button type="button" class="btn primary" data-action="pick" data-car="${e.id}">Build this one</button>
  </article>`}function va(e){return{paint:e.paint,topDown:!!e.topDown,single:{wheels:"stock",roof:"none",tint:"none",top:"black",liner:"none",cover:"none",stance:"stock",...e.single},multi:{sport:[],truckt:[],breezepack:[],...e.multi}}}function xa(){const e=B(),t=L(e),a=ve(e,t),o=ce(e,t),n=Pe(e,t);return`<section class="studio">
    <div class="studio-fixed">
      <div class="studio-title">
        <button type="button" class="btn tiny" data-action="back-lot">Lot</button>
        <div>
          <p class="eyebrow">${f(e.maker)}</p>
          <h1>${f(e.name)}</h1>
        </div>
      </div>
      <div class="hero" id="hero">
        <div class="plinth"></div>
        <div class="spotlight"></div>
        <div class="hero-art" id="hero-art">${ze(e.id,V[l.view].id,n,"hero0")}</div>
        <div class="hero-tools">
          <button type="button" class="btn tiny" data-action="spin">Spin</button>
          ${e.id==="breeze"?`<button type="button" class="btn tiny" data-action="top">${t.topDown?"Raise the top":"Drop the top"}</button>`:""}
        </div>
        <p class="swipe-hint" id="swipe-hint" ${l.hintSeen?"hidden":""}>Swipe to turn it</p>
      </div>
      <div class="swatches" role="listbox" aria-label="Paint">
        ${e.colors.map(i=>`<button type="button" class="swatch ${t.paint===i.id?"is-on":""}" style="--c:${i.hex}" data-action="paint" data-paint="${i.id}" role="option" aria-label="${f(i.name)}" aria-pressed="${t.paint===i.id}"></button>`).join("")}
      </div>
      <p class="paint-label" id="paint-label">${f(o.name)}${o.price?` · +${s(o.price)}`:""}</p>
      <div class="view-dots">
        ${V.map((i,r)=>`<button type="button" class="view-dot ${r===l.view?"is-on":""}" data-action="view" data-view="${r}" aria-label="${i.label}"></button>`).join("")}
      </div>
      <div class="cats">
        ${$t.filter(i=>le(e.id,i.id).length).map(i=>`<button type="button" class="cat ${l.category===i.id?"is-on":""}" data-action="cat" data-cat="${i.id}">${f(i.label)}</button>`).join("")}
      </div>
    </div>
    <div class="studio-scroll" id="studio-scroll">
      <div id="options">${it(e,t)}</div>
      <div class="vinny studio-vinny">
        ${De()}
        <div class="bubble">
          <span class="who">Vinny, in your ear</span>
          <p id="vinny-tip-text">${f(Me(e,t))}</p>
        </div>
      </div>
    </div>
    <div class="dock">
      <div>
        <span class="k">Build price</span>
        <strong id="dock-price">${s(a.total)}</strong>
        <small id="dock-sub">${s(a.msrp)} car · ${s(a.options)} options · ${s(a.warranty)} warranty</small>
      </div>
      <button type="button" class="btn primary" data-action="to-desk">See Ricky</button>
    </div>
  </section>`}function it(e,t){const a=le(e.id,l.category);return a.length?a.map(o=>`
    <section class="group">
      <h3>${f(o.label)}</h3>
      <div class="opts">
        ${o.options.map(n=>Ta(o,n,t)).join("")}
      </div>
    </section>`).join(""):`<p class="empty">Nothing in this rack for the ${f(e.name)}.</p>`}function Ta(e,t,a){const o=e.mode==="single"?a.single[e.id]===t.id:(a.multi[e.id]||[]).includes(t.id),n=t.price===0?"Included":`+${s(t.price)}`;return`<button type="button" class="opt ${o?"is-on":""}" data-action="opt" data-group="${e.id}" data-id="${t.id}" data-mode="${e.mode}" aria-pressed="${o}">
    <span class="opt-mark" aria-hidden="true"></span>
    <span class="opt-copy">
      <span class="opt-name">${f(t.name)}</span>
      <span class="opt-blurb">${f(t.blurb)}</span>
    </span>
    <span class="opt-price">${n}</span>
  </button>`}function Ma(){const e=B(),t=L(e),a=_(e),{quote:o,priced:n}=Oe(e,t,a),i=X(e),r=J(e),d=Z(a.effectiveScore),c=$e(d),h=le(e.id).find(p=>p.id==="warranty");return`<section class="desk">
    <div class="desk-scroll">
      <div class="ricky">
        ${Jt()}
        <div>
          <span class="who">Ricky Falco · Falco Motors</span>
          <p id="ricky-line">${f(_e(e,a))}</p>
        </div>
      </div>
      <p class="desk-car">${f(e.name)} · build ${s(n.total)} before tax</p>
      <div id="pressure">${rt(o)}</div>
      <div id="budget-mount">${st(o)}</div>
      <div id="tco-mount">${Ee(e,o)}</div>

      ${ie({label:"Car price",term:"msrp",readoutId:"price-readout",readout:s(a.price),name:"price",min:i,max:r,step:50,value:a.price,left:`Strong ${s(i)}`,right:`His open ${s(r)}`,nudge:"Knock it down"})}
      ${ie({label:"Trade for the jalopy",term:"trade",readoutId:"trade-readout",readout:s(a.trade),name:"trade",min:R.min,max:R.max,step:100,value:a.trade,left:`Lowball ${s(R.min)}`,right:`Heroic ${s(R.max)}`,nudge:"Make him pay",note:`Fair lives around ${s(R.baseline)}. He opened at ${s(R.open)}.`})}
      ${ie({label:"APR",term:"apr",readoutId:"apr-readout",readout:`${a.apr.toFixed(2)}%`,name:"apr",min:d,max:c,step:.01,value:a.apr,left:`You earned ${d.toFixed(2)}%`,right:`His quote ${c.toFixed(2)}%`,nudge:"Take your rate",note:d===c?"You are already at the top of the 6–8% band. That is the score talking.":"The gap between these two numbers is the quiet tip."})}

      <div class="lever">
        <div class="lever-top">
          <span>Term ${$("term")}</span>
        </div>
        <div class="seg">
          ${[60,72,84].map(p=>`<button type="button" class="${a.term===p?"is-on":""}" data-action="term" data-term="${p}" aria-pressed="${a.term===p}">${p/12} yr<span>${p} mo</span></button>`).join("")}
        </div>
        <p class="fine">Shorter costs more each month and less interest in total. ${$("amortization")}</p>
      </div>

      <div class="lever">
        <div class="lever-top">
          <span>Warranty ${$("warranty")}</span>
        </div>
        <div class="seg wrap">
          ${h.options.map(p=>`<button type="button" class="${t.single.warranty===p.id?"is-on":""}" data-action="warranty" data-warranty="${p.id}" aria-pressed="${t.single.warranty===p.id}">${f(p.name.replace(", "," · "))}<span>${p.price?s(p.price):"Included"}</span></button>`).join("")}
        </div>
      </div>

      ${ie({label:"Down from checking",term:"down",readoutId:"check-readout",readout:`${s(a.downChecking)} down · ${s(y.checking-a.downChecking)} left`,name:"checking",min:0,max:y.checking,step:500,value:a.downChecking,left:"$0",right:s(y.checking),nudge:""})}
      ${ie({label:"Down from savings",term:"down",readoutId:"save-readout",readout:ot(a.downSavings),name:"savings",min:0,max:y.savings,step:500,value:a.downSavings,left:"None yet",right:s(y.savings),nudge:"",warn:nt(a.downSavings),note:`Leave about ${s(P)}, two months of bills. The rest can go on the hood.`})}

      <div id="sheet-mount">${lt(e,a,n,o)}</div>
      <div class="vinny">
        ${De()}
        <div class="bubble">
          <span class="who">Vinny “Numbers” Caputo</span>
          <p id="vinny-desk-text">${f(l.advice||et(e,a,o))}</p>
        </div>
      </div>
      <button type="button" class="btn ghost wide" data-action="ask">Ask Vinny what he’d do</button>
      <button type="button" class="btn text" data-action="back-studio">Back to the studio</button>
    </div>
    <div class="dock">
      <div>
        <span class="k">Monthly ${$("payment")}</span>
        <strong id="dock-pay" class="zone-${o.weeklyLeft<0?"bad":Te(o.paymentShare)}">${s(o.payment,!0)}</strong>
        <small id="dock-sub">${a.term} mo · ${a.apr.toFixed(2)}% · ${s(o.weeklyLeft)} left this week</small>
      </div>
      <button type="button" class="btn primary" data-action="shake">Shake on it</button>
    </div>
  </section>`}function ie(e){return`<div class="lever ${e.warn?"warn":""}">
    <div class="lever-top">
      <span>${e.label} ${$(e.term)}</span>
      <strong id="${e.readoutId}">${e.readout}</strong>
    </div>
    <input type="range" data-lever="${e.name}" min="${e.min}" max="${e.max}" step="${e.step}" value="${e.value}" aria-label="${f(e.label)}">
    <div class="lever-scale"><span>${e.left}</span><span>${e.right}</span></div>
    ${e.note?`<p class="fine">${e.note}</p>`:""}
    ${e.nudge?`<button type="button" class="btn tiny" data-action="nudge" data-nudge="${e.name}">${e.nudge}</button>`:""}
  </div>`}function rt(e){return e.weeklyLeft<0?'<p class="banner bad">This wrecks the week. Vinny will not clap.</p>':e.paymentShare>.15?'<p class="banner warn">Over the 15% line. Pretty payment, heavy life.</p>':'<p class="banner ok">Under the line. The week still has air in it.</p>'}function st(e){const t=e.weeklyLeft<0?"bad":Te(e.paymentShare),a=.4,o=Math.max(0,Math.min(100,e.paymentShare/a*100)),n=.15/a*100;return`<div class="budget">
    <div class="budget-top">
      <span>Payment vs take-home</span>
      <strong class="zone-${t}">${se(e.paymentShare)} of ${s(e.monthlyTake)}/mo</strong>
    </div>
    <div class="meter" data-zone="${t}" style="--p:${o.toFixed(1)}%; --mark:${n}%"><span></span></div>
    <p class="fine">White mark is 15% of take-home. Stay left of it. Insurance is not inside that mark — it is in the week, below.</p>
    <ul class="week">
      <li><span>This week’s pay</span><b>${s(y.weeklyTakeHome)}</b></li>
      <li><span>Bills, already locked</span><b>−${s(e.weeklyBills)}</b></li>
      <li><span>Insurance, estimated</span><b>−${s(e.weeklyIns)}</b></li>
      <li><span>This car, per week</span><b>−${s(e.weeklyPay)}</b></li>
      <li class="left zone-${e.weeklyLeft<80?"bad":e.weeklyLeft<160?"warn":"ok"}"><span>Left for everything else</span><b>${s(e.weeklyLeft)}</b></li>
    </ul>
  </div>`}function lt(e,t,a,o){const n=a.lines.filter(r=>r.price>0),i=[["MSRP",s(e.msrp),"msrp"],["Your price",s(t.price),"msrp"],["Options",s(a.options),null],["Warranty",s(a.warranty),"warranty"],["Doc fee",s(o.doc),"docfee"],["Title & plates",s(o.title),null],["Sales tax",K(o.tax),"tax"],["Trade equity",`−${s(o.trade)}`,"trade"],["Out the door",K(o.otd),"otd"],["Down payment",`−${s(o.down)}`,"down"],["Amount financed",K(o.financed),"financed",!0],["Interest, whole term",K(o.interest),"interest"]];return`<section class="sheet-card">
    <header>
      <h3>The real sheet</h3>
      ${$("otd")}
    </header>
    <p class="fine">Tax here is ${se(.06625,3)} of the price plus warranty, after the trade comes off. ${$("negative")}</p>
    <ul class="rows">
      ${i.map(([r,d,c,h])=>`<li class="${h?"strong":""}"><span>${f(r)}${c?` ${$(c,!0)}`:""}</span><b>${d}</b></li>`).join("")}
    </ul>
    ${n.length?`<details>
      <summary>${n.length} priced ${n.length===1?"choice":"choices"}</summary>
      <ul class="rows slim">
        ${n.map(r=>`<li><span>${f(r.name)}</span><b>${s(r.price)}</b></li>`).join("")}
      </ul>
    </details>`:'<p class="fine">No priced options. Bone stock is a position.</p>'}
    <p class="fine">Insurance estimate ${s(Ue(e,L(e)))}/mo is in the week, not in the loan. ${$("principal")}</p>
  </section>`}function La(){const e=l.grade,t=B();if(!e)return'<section class="grade"><p>No deal on the table.</p><button type="button" class="btn primary" data-action="another">Back to the lot</button></section>';const a=e.quote,o=e.score<80,n=e.letter.startsWith("A")||e.letter==="B"?"good":e.letter==="C"?"mid":"bad";return`<section class="grade">
    <p class="eyebrow">${f(t.name)} · Falco Motors</p>
    <div class="letter tone-${n}">${f(e.letter)}</div>
    <h1>${f(e.title)}</h1>
    <p class="score-num">${e.score} out of 100</p>
    ${je(e.narrative)}
    ${Ee(t,a)}
    <ul class="recap">
      <li><span>Payment</span><b>${s(a.payment,!0)}/mo</b></li>
      <li><span>Out the door</span><b>${K(a.otd)}</b></li>
      <li><span>Financed</span><b>${K(a.financed)}</b></li>
      <li><span>Interest</span><b>${K(a.interest)}</b></li>
      <li><span>Term</span><b>${a.term} mo @ ${a.apr.toFixed(2)}%</b></li>
      <li><span>Left this week</span><b class="zone-${a.weeklyLeft<80?"bad":"ok"}">${s(a.weeklyLeft)}</b></li>
    </ul>
    <ul class="notes">
      ${e.notes.map(i=>`<li class="${i.tone}">${f(i.text)}</li>`).join("")}
    </ul>
    <div class="stack">
      <button type="button" class="btn ${o?"primary":"ghost"}" data-action="tweak">Tweak this deal</button>
      <button type="button" class="btn ${o?"ghost":"primary"}" data-action="another">Shop another car</button>
      <button type="button" class="btn text" data-action="restart">Start over</button>
    </div>
  </section>`}function Sa(){return ra(B())}let ye=null,ge=null;function Q(){l.spinning=!1,ye&&(clearInterval(ye),ye=null)}function F(e){l.screen==="studio"&&e!=="studio"&&Q(),l.screen=e,l.advice=e==="negotiate"?l.advice:"",He(),at(),e==="negotiate"&&_(),he();const t=document.getElementById("screen");t&&(t.scrollTop=0),e==="lot"&&Oa()}async function Aa(){try{v.on?v.stop():await v.start()}catch{v.stop()}l.soundPref=v.on?"on":"off",l.screen==="intro"?he():la()}async function Ca(){if(l.soundPref!=="off")try{await v.start()}catch{}F("credit")}function Ia(){var r;if(l.credit.score||l.credit.rolling)return;l.credit.rolling=!0;const e=ea(),t=window.matchMedia("(prefers-reduced-motion: reduce)").matches,a=document.querySelector('[data-action="roll"]');a&&(a.disabled=!0),(r=document.querySelector(".odo"))==null||r.classList.add("is-rolling");const o=performance.now(),n=t?0:1650,i=d=>{(n===0?1:(d-o)/n)<1?(pa(675+Math.floor(Math.random()*146)),v.on&&Math.random()<.4&&v.tick(),requestAnimationFrame(i)):(l.credit.score=e,l.credit.rolling=!1,v.on&&v.land(),he())};requestAnimationFrame(i)}function Ba(){!l.credit.score||l.credit.cosign||(l.credit.cosign=!0,l.credit.boost=50+Math.floor(Math.random()*26),l.deals={},he())}function Fa(e){l.carId=e,l.category="sound",l.view=0,l.hintSeen=!1,Q(),L(),F("studio")}function Ra(){if(l.spinning){Q(),N();return}l.spinning=!0,l.hintSeen=!0,N(),ye=setInterval(()=>{l.view=(l.view+1)%V.length,N()},980)}function Pa(e){const t=B(),a=_(t);if(e==="price"&&(a.price=O(a.price-500,X(t),J(t))),e==="trade"&&(a.trade=O(a.trade+200,R.min,R.max)),e==="apr"){const o=Z(ae()||a.effectiveScore);a.apr=O(Math.round((a.apr-.1)*100)/100,o,$e(o))}l.advice="",re({sliders:!0})}function za(e){const t=_(),a=Number(e.value),o=e.dataset.lever;o==="price"&&(t.price=a),o==="trade"&&(t.trade=a),o==="apr"&&(t.apr=a),o==="checking"&&(t.downChecking=a),o==="savings"&&(t.downSavings=a),l.advice="",re()}function Ya(e){const t=L(),{group:a,id:o,mode:n}=e.dataset;if(n==="single")t.single[a]=o;else{const i=t.multi[a]||[],r=i.indexOf(o);r>=0?i.splice(r,1):i.push(o),t.multi[a]=i}N()}function Da(){const e=B(),t=na(e,L(e),_(e));l.grade=t,_t(t,e),F("grade")}function Oa(){const e=document.getElementById("lot-scroller");!e||e.dataset.bound||(e.dataset.bound="1",e.addEventListener("scroll",()=>{const t=Math.round(e.scrollLeft/Math.max(1,e.clientWidth));document.querySelectorAll(".lot-dot").forEach((a,o)=>a.classList.toggle("is-on",o===t))},{passive:!0}))}function Re(e){const t=document.getElementById("lot-scroller");t&&t.scrollBy({left:e*t.clientWidth,behavior:"smooth"})}function Ha(e){const t=e.target.closest("[data-action]");if(!t||t.disabled)return;const a=t.dataset.action;if(a==="glossary"){e.preventDefault(),da(t.dataset.term);return}const o={"close-sheet":()=>He(),money:()=>ca(),audio:()=>Aa(),start:()=>Ca(),roll:()=>Ia(),cosign:()=>Ba(),"to-lot":()=>{l.credit.score&&F("lot")},"back-credit":()=>F("credit"),pick:()=>Fa(t.dataset.car),"lot-prev":()=>Re(-1),"lot-next":()=>Re(1),"back-lot":()=>F("lot"),cat:()=>{l.category=t.dataset.cat,ha()},opt:()=>Ya(t),paint:()=>{L().paint=t.dataset.paint,N()},view:()=>{Q(),l.hintSeen=!0,l.view=Number(t.dataset.view),N()},spin:()=>Ra(),top:()=>{const n=L();n.topDown=!n.topDown,ua()},"to-desk":()=>F("negotiate"),"back-studio":()=>F("studio"),nudge:()=>Pa(t.dataset.nudge),term:()=>{_().term=Number(t.dataset.term),l.advice="",re()},warranty:()=>{L().single.warranty=t.dataset.warranty,l.advice="",re()},ask:()=>{l.advice=Sa(),re()},shake:()=>Da(),tweak:()=>F("negotiate"),another:()=>{l.grade=null,F("lot")},restart:()=>{Q();const n=l.lastGrade;Qt(),l.lastGrade=n,F("intro")}};o[a]&&o[a]()}function Ea(e){if(e.key==="Escape"){He(),at();return}l.screen==="studio"&&(e.key==="ArrowRight"||e.key==="ArrowLeft")&&(Q(),l.hintSeen=!0,l.view=(l.view+(e.key==="ArrowRight"?1:-1)+V.length)%V.length,N()),l.screen==="lot"&&(e.key==="ArrowRight"||e.key==="ArrowLeft")&&Re(e.key==="ArrowRight"?1:-1)}function ja(e){e.target.closest("#hero")&&(ge=e.clientX)}function Ga(e){if(ge==null)return;const t=e.clientX-ge;ge=null,!(l.screen!=="studio"||Math.abs(t)<36)&&(Q(),l.hintSeen=!0,l.view=(l.view+(t<0?1:-1)+V.length)%V.length,N())}document.addEventListener("click",Ha);document.addEventListener("input",e=>{const t=e.target.closest("[data-lever]");!t||l.screen!=="negotiate"||za(t)});document.addEventListener("keydown",Ea);document.addEventListener("pointerdown",ja);document.addEventListener("pointerup",Ga);Xt();he();
