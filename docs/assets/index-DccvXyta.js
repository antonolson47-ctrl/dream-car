(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const nt=66,we=60/nt,Te=[[74,1.5],[76,.5],[77,1],[74,1],[72,1],[74,1],[69,2],[70,1],[72,1],[74,1],[77,1],[76,1.5],[74,.5],[72,2],[74,1],[77,1],[81,2],[79,1],[77,1],[74,1],[70,1],[70,1.5],[72,.5],[74,2],[69,3],[74,1]],at=[[50,53,57],[50,53,57],[46,50,53],[53,57,60],[50,53,57],[55,58,62],[46,50,53],[50,53,57]],ot=[38,38,34,41,38,43,34,38];function ke(e){return 440*2**((e-69)/12)}class it{constructor(){this.ctx=null,this.master=null,this.on=!1,this.timer=null,this.cursor=0,this.nextTime=0,this.barBeat=0}async start(){if(this.on)return;const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx||(this.ctx=new t,this.buildGraph()),await this.ctx.resume(),this.on=!0,this.nextTime=this.ctx.currentTime+.08,this.cursor=0,this.barBeat=0,this.schedule())}buildGraph(){const t=this.ctx;this.master=t.createGain(),this.master.gain.value=.42;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=4200,n.Q.value=.4;const a=t.createDynamicsCompressor();a.threshold.value=-18,a.knee.value=18,a.ratio.value=2.2,a.attack.value=.02,a.release.value=.25;const o=t.createGain();o.gain.value=.28;const i=t.createGain();i.gain.value=.82;const r=t.createDelay(1);r.delayTime.value=.29;const h=t.createDelay(1);h.delayTime.value=.47;const c=t.createGain();c.gain.value=.28;const u=t.createBiquadFilter();u.type="lowpass",u.frequency.value=2200,this.bus=t.createGain(),this.bus.gain.value=1,this.bus.connect(i),this.bus.connect(r),r.connect(u),u.connect(h),h.connect(c),c.connect(r),u.connect(o),i.connect(n),o.connect(n),n.connect(a),a.connect(this.master),this.master.connect(t.destination)}stop(){this.on=!1,this.timer&&(clearTimeout(this.timer),this.timer=null)}async toggle(){return this.on?(this.stop(),!1):(await this.start(),this.on)}schedule(){if(!this.on||!this.ctx)return;const t=this.ctx.currentTime+1.4;let n=0;for(;this.nextTime<t&&n<32;){n+=1;const[a,o]=Te[this.cursor],i=o*we;this.violin(this.nextTime,a,i*.94);const r=rt(this.cursor);if(r%4===0){const h=r/4%8;this.pad(this.nextTime,at[h],we*4*.98),this.bass(this.nextTime,ot[h],we*3.2)}this.nextTime+=i,this.cursor=(this.cursor+1)%Te.length}this.timer=setTimeout(()=>this.schedule(),400)}violin(t,n,a){const o=this.ctx,i=ke(n),r=o.createOscillator(),h=o.createOscillator(),c=o.createBiquadFilter(),u=o.createGain(),p=o.createGain(),b=o.createOscillator(),m=o.createGain();r.type="sawtooth",r.frequency.setValueAtTime(i,t),h.type="triangle",h.frequency.setValueAtTime(i*2,t),p.gain.value=.07,b.type="sine",b.frequency.value=5.3,m.gain.setValueAtTime(0,t),m.gain.linearRampToValueAtTime(i*.0045,t+.28),b.connect(m),m.connect(r.frequency),c.type="lowpass",c.Q.value=.65,c.frequency.setValueAtTime(780,t),c.frequency.linearRampToValueAtTime(1680,t+.14),c.frequency.linearRampToValueAtTime(1240,t+a);const w=.075;u.gain.setValueAtTime(1e-4,t),u.gain.exponentialRampToValueAtTime(w,t+.09),u.gain.exponentialRampToValueAtTime(w*.72,t+.24);const E=Math.max(t+.26,t+a-.16);u.gain.setValueAtTime(w*.72,E),u.gain.exponentialRampToValueAtTime(1e-4,t+a+.05),r.connect(c),h.connect(p),p.connect(c),c.connect(u),u.connect(this.bus),r.start(t),h.start(t),b.start(t);const L=t+a+.08;r.stop(L),h.stop(L),b.stop(L),r.onended=()=>{r.disconnect(),h.disconnect(),c.disconnect(),u.disconnect(),b.disconnect(),m.disconnect(),p.disconnect()}}pad(t,n,a){const o=this.ctx;for(const i of n){const r=o.createOscillator(),h=o.createGain();r.type="triangle",r.frequency.value=ke(i),r.detune.value=i%2===0?-6:6,h.gain.setValueAtTime(1e-4,t),h.gain.exponentialRampToValueAtTime(.018,t+.4),h.gain.exponentialRampToValueAtTime(1e-4,t+a),r.connect(h),h.connect(this.bus),r.start(t),r.stop(t+a+.05),r.onended=()=>{r.disconnect(),h.disconnect()}}}bass(t,n,a){const o=this.ctx,i=o.createOscillator(),r=o.createGain();i.type="sine",i.frequency.value=ke(n),r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.045,t+.05),r.gain.exponentialRampToValueAtTime(1e-4,t+a),i.connect(r),r.connect(this.bus),i.start(t),i.stop(t+a+.02),i.onended=()=>{i.disconnect(),r.disconnect()}}tick(){if(!this.on||!this.ctx)return;const t=this.ctx,n=t.createOscillator(),a=t.createGain();n.type="triangle",n.frequency.value=880;const o=t.currentTime;a.gain.setValueAtTime(.03,o),a.gain.exponentialRampToValueAtTime(1e-4,o+.05),n.connect(a),a.connect(this.master),n.start(o),n.stop(o+.06)}land(){if(!this.on||!this.ctx)return;const t=this.ctx,n=t.createOscillator(),a=t.createGain();n.type="sine",n.frequency.value=392;const o=t.currentTime;a.gain.setValueAtTime(.04,o),a.gain.exponentialRampToValueAtTime(1e-4,o+.18),n.connect(a),a.connect(this.master),n.start(o),n.stop(o+.2)}}function rt(e){let t=0;for(let n=0;n<e;n+=1)t+=Te[n][1];return t}const k=new it;function f(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function l(e,t=!1){return(Number.isFinite(e)?e:0).toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:t?2:0,minimumFractionDigits:t?2:0})}function G(e){const t=Number.isFinite(e)?e:0,n=Math.abs(t-Math.round(t))<.001;return l(t,!n)}function te(e,t=1){return`${(e*100).toFixed(t)}%`}function je(e,t){return Math.round(e/t)*t}function R(e,t,n){return Math.min(n,Math.max(t,e))}function Le(e){const t=e.replace("#",""),n=parseInt(t.length===3?t.split("").map(a=>a+a).join(""):t,16);return[n>>16&255,n>>8&255,n&255]}function st(e,t,n){const a=o=>Math.max(0,Math.min(255,Math.round(o))).toString(16).padStart(2,"0");return`#${a(e)}${a(t)}${a(n)}`}function $e(e,t,n){const a=Le(e),o=Le(t);return st(a[0]+(o[0]-a[0])*n,a[1]+(o[1]-a[1])*n,a[2]+(o[2]-a[2])*n)}function lt(e){const[t,n,a]=Le(e).map(o=>{const i=o/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}const g={checking:8e3,savings:15e3,salary:7e4,weeklyTakeHome:1010},Ee=[{id:"housing",label:"Housing",amount:1450},{id:"food",label:"Food",amount:380},{id:"phone",label:"Phone",amount:85},{id:"utilities",label:"Utilities",amount:160},{id:"misc",label:"Misc",amount:120}],Se=Ee.reduce((e,t)=>e+t.amount,0),ve={doc:599,title:385,taxRate:.06625},A={baseline:4500,open:3600,min:3200,max:5600},le={name:"Cumberland Shadow",year:1998,trade:4500,line:"The paint is a suggestion. The heater is a rumor. It runs."},ue=[{id:"stallion",name:"Stallion GT",maker:"Vittorio",vibe:"Sports coupe",line:"A low red problem. Fast, loud, and allergic to budgets.",msrp:72e3,markup:.05,room:.04,insurance:310,hot:!0,colors:[{id:"rosso",name:"Rosso Notte",hex:"#8f1d2c",price:0},{id:"nero",name:"Nero Assoluto",hex:"#141414",price:0},{id:"bianco",name:"Bianco Perla",hex:"#f3f0e8",price:595,pearl:!0},{id:"argento",name:"Argento",hex:"#c5c8ce",price:0},{id:"verde",name:"Verde Bosco",hex:"#1c3d2e",price:0},{id:"blu",name:"Blu Notte",hex:"#152743",price:0},{id:"giallo",name:"Giallo Modena",hex:"#e2b31f",price:0},{id:"arancio",name:"Arancio",hex:"#e06a1f",price:395},{id:"matte",name:"Matte Grafite",hex:"#3c3f44",price:2400,matte:!0},{id:"flake",name:"Nonna Gold Flake",hex:"#e0b03a",price:7500,joke:!0,pearl:!0}]},{id:"harbor",name:"Harbor Hybrid",maker:"Northline",vibe:"Daily hybrid",line:"Gets you there and home without introducing itself to the whole block.",msrp:29e3,markup:.02,room:.1,insurance:128,colors:[{id:"glacier",name:"Glacier White",hex:"#f4f7f8",price:0},{id:"silver",name:"Silver Mist",hex:"#cfd3d6",price:0},{id:"harbor",name:"Harbor Blue",hex:"#3e6f8c",price:0},{id:"graphite",name:"Graphite",hex:"#3a3d40",price:0},{id:"signal",name:"Signal Red",hex:"#b4232c",price:0},{id:"sage",name:"Sage",hex:"#6d7f62",price:0},{id:"midnight",name:"Midnight",hex:"#16181c",price:0},{id:"sand",name:"Sand",hex:"#cbb99a",price:0},{id:"teal",name:"Deep Teal",hex:"#1f4f4a",price:395},{id:"fog",name:"Pearl Fog",hex:"#e7e4dc",price:595,pearl:!0}]},{id:"ironhorn",name:"Ironhorn 1500",maker:"Cinder",vibe:"Full-size truck",line:"A truck with opinions. The wheels can cost as much as a vacation.",msrp:52e3,markup:.035,room:.07,insurance:195,colors:[{id:"summit",name:"Summit White",hex:"#f2f3f4",price:0},{id:"black",name:"Black",hex:"#1a1a1a",price:0},{id:"silver",name:"Billet Silver",hex:"#b7bcc2",price:0},{id:"redrock",name:"Red Rock",hex:"#8e2a24",price:0},{id:"patriot",name:"Work Blue",hex:"#243e66",price:0},{id:"olive",name:"Olive Duty",hex:"#4d5538",price:0},{id:"bronze",name:"Bronze",hex:"#7a5a3a",price:450},{id:"concrete",name:"Concrete",hex:"#8d9094",price:0},{id:"orange",name:"Safety Orange",hex:"#e4571b",price:650},{id:"tactical",name:"Matte Tactical",hex:"#2e3230",price:2200,matte:!0}]},{id:"breeze",name:"Breeze Convertible",maker:"Marlow",vibe:"Drop-top",line:"Sun on your arms, math in the glovebox. The top is free. The payment is not.",msrp:38e3,markup:.025,room:.09,insurance:172,colors:[{id:"cloud",name:"Cloud White",hex:"#f7f4ef",price:0},{id:"black",name:"Black",hex:"#1c1c1c",price:0},{id:"aqua",name:"Aqua",hex:"#3aa8b5",price:0},{id:"coral",name:"Coral",hex:"#e07a62",price:0},{id:"lemon",name:"Lemon",hex:"#e6c84a",price:0},{id:"navy",name:"Navy",hex:"#1c2a4a",price:0},{id:"silver",name:"Silver",hex:"#d5d8dc",price:0},{id:"burgundy",name:"Burgundy",hex:"#6e2434",price:0},{id:"mint",name:"Mint",hex:"#b7d9c6",price:350},{id:"skypearl",name:"Sky Pearl",hex:"#d5e4f2",price:595,pearl:!0}]}],C="all";function d(e){return{cars:C,tag:"fluff",tip:"",...e}}const ct=[{id:"sound",category:"sound",label:"Sound",mode:"single",cars:C,options:[d({id:"base",name:"Lot radio",price:0,tag:"included",blurb:"Four speakers and the road. Already in the car.",tip:"Leave it. You can hear the engine. That was the idea."}),d({id:"premium",name:"Premium 8-speaker",price:890,tag:"smart",blurb:"A real amp and clearer highs. You will actually notice this one.",tip:"Eight hundred and ninety. If you listen to music every day, this is the one I allow."}),d({id:"bass",name:"Booming bass package",price:1450,tag:"fluff",blurb:"A sealed sub behind the seat. The block will know your chorus.",tip:"Bass is fun for a week. Then it is a rattle you financed."}),d({id:"thumper",name:'Trunk-thumper 12"',price:2200,tag:"fluff",blurb:"One big sub, zero trunk. Groceries ride in the back seat.",tip:"Twenty-two hundred so the trunk can thump. Where do the groceries go, genius?"}),d({id:"hall",name:"Concert hall",price:3800,tag:"fluff",blurb:"Fourteen speakers and a tuning session. Priced like a used motorcycle.",tip:"Concert hall money on a daily driver. The orchestra is not coming. You are going to work."}),d({id:"scala",name:"La Scala in the trunk",price:9500,tag:"joke",blurb:"Opera horns, a velvet grille, and a tenor who does not exist.",tip:"Nine and a half grand so the trunk can sing. Your neighbors will call the cops and the bank."})]},{id:"mats",category:"interior",label:"Floor mats",mode:"single",cars:C,options:[d({id:"paper",name:"Dealer paper mats",price:0,tag:"included",blurb:"Thin, slippery, and in the trash by November.",tip:"Paper mats are a suggestion. Spend the two hundred."}),d({id:"weather",name:"All-weather mats",price:220,tag:"smart",blurb:"Rubber trays that catch the slush, the coffee, the whole winter.",tip:"Two hundred bucks. You will use them every time it rains. This is the good kind of spending."}),d({id:"carpet",name:"Carpet logo mats",price:185,tag:"fluff",blurb:"Plush, embroidered, and afraid of a puddle.",tip:"Carpet mats look nice in the brochure. One rainstorm and they look like a crime scene."}),d({id:"luxury",name:"Luxury leather mats",price:640,tag:"fluff",blurb:"Stitched hides for the floor. The floor does not appreciate art.",tip:"Six hundred dollars of leather where your boots go. I love you, but no."})]},{id:"leather",category:"interior",label:"Seats",mode:"single",cars:C,options:[d({id:"std",name:"Standard seats",price:0,tag:"included",blurb:"What the car comes with. Cloth on the daily drivers, leather on the Stallion.",tip:"Standard seats hold you up. That is the job."}),d({id:"leather",name:"Leather seating",price:1900,tag:"fluff",cars:["harbor","breeze","ironhorn"],blurb:"Hides instead of cloth. Smells like a new wallet for a month.",tip:"Nineteen hundred to change the upholstery. Nice. Not necessary. Do not pretend it is necessary."}),d({id:"quilt",name:"Diamond-stitch leather",price:2400,tag:"fluff",cars:["stallion"],blurb:"The GT is already leather. This is the quilted, show-off version.",tip:"The car already has leather. You are paying for diamonds in the stitch. Ricky loves this one."}),d({id:"quilt2",name:"Quilted leather upgrade",price:2800,tag:"fluff",cars:["harbor","breeze"],blurb:"Diamond stitching on a car that also hauls groceries.",tip:"Quilted leather on a commuter. You are dressing the car for a party it does not attend."})]},{id:"comfort",category:"interior",label:"Cabin",mode:"multi",cars:C,options:[d({id:"heat",name:"Seat heaters",price:480,tag:"smart",blurb:"Warm seats on a cold morning. They earn their keep in January.",tip:"Seat heaters in this climate are not a toy. Four eighty. I will allow it."}),d({id:"vent",name:"Ventilated seats",price:1150,tag:"fluff",blurb:"A little air through the leather when the summer sits on you.",tip:"Ventilated seats are lovely. They are also a thousand dollars of fan."}),d({id:"wheel",name:"Heated steering wheel",price:275,tag:"smart",blurb:"Your hands stop suffering at red lights.",tip:"Two seventy-five so your hands work in February. Small money, real life. Fine."}),d({id:"ambient",name:"Ambient lighting",price:395,tag:"fluff",blurb:"A glow in the footwells. Sixty-four colors. None of them pay the note.",tip:"Mood lighting. The bank does not have a mood. It has a due date."}),d({id:"memory",name:"Memory seats",price:820,tag:"fluff",blurb:"The seat remembers you. Useful if two people share the car.",tip:"Memory seats matter if somebody else drives. If it is just you, the seat already remembers."})]},{id:"roof",category:"roof",label:"Roof",mode:"single",cars:["stallion","harbor","ironhorn"],options:[d({id:"none",name:"Solid roof",price:0,tag:"included",blurb:"Metal, quiet, and it does not leak. A roof’s original job.",tip:"A solid roof is not a compromise. It is a roof."}),d({id:"moon",name:"Power moonroof",price:1250,tag:"fluff",blurb:"A slice of sky over the front seats. Nice in October.",tip:"A moonroof is a nice thing you use in October. It is not an investment. It is a sunroof."}),d({id:"pano",name:"Panoramic sunroof",price:1950,tag:"fluff",blurb:"Glass over almost the whole cabin. Brighter, hotter, more expensive.",tip:"Panoramic glass is gorgeous until July, when you are financing a greenhouse."}),d({id:"carbon",name:"Carbon roof panel",price:4200,tag:"joke",cars:["stallion"],blurb:"A lighter roof, mostly so you can tell people the roof is lighter.",tip:"Four grand so the roof can be a conversation. The car is already light enough to get you in trouble."})]},{id:"top",category:"roof",label:"Soft top",mode:"single",cars:["breeze"],options:[d({id:"black",name:"Black canvas top",price:0,tag:"included",blurb:"The classic lid. Goes up, goes down, costs nothing extra.",tip:"Black top, no charge. The joy is included. Remember that."}),d({id:"tan",name:"Tan canvas top",price:420,tag:"fluff",blurb:"A lighter lid. Looks like a weekend even on a Tuesday.",tip:"Tan top is a look. Four twenty. If it makes you happy every time you walk up, fine. Once."}),d({id:"burgundy",name:"Burgundy canvas top",price:480,tag:"fluff",blurb:"Wine-colored canvas. Dramatic in a good parking lot.",tip:"Burgundy lid. Pretty. Do not let a pretty lid talk you into a ugly loan."}),d({id:"navy",name:"Navy canvas top",price:450,tag:"fluff",blurb:"Deep blue canvas. Quiet, and it hides the dust a little.",tip:"Navy top. Respectable. Still just a color."})]},{id:"wheels",category:"wheels",label:"Wheels & tires",mode:"single",cars:C,options:[d({id:"stock",name:"Stock wheels",price:0,tag:"included",blurb:"The ones the car was designed around. They work.",tip:"Stock wheels are not sad. They are engineered. Leave them if you are watching the payment."}),d({id:"sport",name:'19" sport alloys',price:1650,tag:"fluff",cars:["stallion","harbor","breeze"],blurb:"Lighter look, thinner tire, a little more road in the cabin.",tip:"Sport alloys look sharp and ride firmer. Sixteen fifty. Know why you want them."}),d({id:"chrome",name:"Chrome 22s",price:2450,tag:"fluff",cars:["stallion","breeze","harbor"],blurb:"Mirror-bright and impossible to keep clean.",tip:"Chrome is a part-time job. You will wash them more than you drive them."}),d({id:"forged",name:"Forged black 20s",price:3350,tag:"fluff",cars:["stallion","breeze"],blurb:"Dark, expensive, and lighter than they look.",tip:"Forged wheels are real hardware. They are also three grand of jewelry."}),d({id:"runflat",name:"Run-flat all-seasons",price:1150,tag:"smart",cars:["stallion","harbor","breeze"],blurb:"Keep rolling after a puncture. No spare to sit on.",tip:"Run-flats are the rare wheel upgrade that solves a problem. I can live with it."}),d({id:"aero",name:"Aero efficiency wheels",price:380,tag:"smart",cars:["harbor"],blurb:"Smoother covers, a little less drag, a calmer look.",tip:"Three eighty for wheels that help the hybrid be a hybrid. That is a coherent sentence."}),d({id:"carbonw",name:"Carbon-barrel track wheels",price:5600,tag:"joke",cars:["stallion"],blurb:"Race-day hardware for a road that has a speed limit.",tip:"Fifty-six hundred in carbon barrels. The track is not on your commute."}),d({id:"wire",name:"Wire-look chromes",price:2100,tag:"fluff",cars:["breeze"],blurb:"Old-glamour spokes. They sparkle when the top is down.",tip:"Wire wheels are a mood. They are also a car wash’s villain origin story."}),d({id:"chrome20",name:'20" factory chrome',price:1800,tag:"fluff",cars:["ironhorn"],blurb:"Bright truck wheels. They shine until the first job site.",tip:"Chrome on a truck is a choice. Mud is also a choice. They will meet."}),d({id:"offroad",name:'35" all-terrains',price:4750,tag:"fluff",cars:["ironhorn"],blurb:"Tall, loud, and thirsty. They change the whole truck.",tip:"Those tires do not just cost forty-seven fifty. They cost you gas, bearings, and a car wash that cries."}),d({id:"mud",name:'37" Swamp Royalty',price:8900,tag:"joke",cars:["ironhorn"],blurb:"Bog-sized mud tires with a name that should have been a warning.",tip:"Swamp Royalty. Eighty-nine hundred. You are financing a parade float that hates parking garages."})]},{id:"stance",category:"packs",label:"Stance",mode:"single",cars:["ironhorn"],options:[d({id:"stock",name:"Stock height",price:0,tag:"included",blurb:"The truck sits where the engineers put it.",tip:"Stock height gets into parking garages. I am a fan of parking garages."}),d({id:"level",name:'2" leveling kit',price:1480,tag:"fluff",blurb:"Lifts the nose so the truck looks level, not eager.",tip:"A leveling kit is the modest version of this mistake. Still fourteen eighty."}),d({id:"lift",name:'6" lift kit',price:6650,tag:"joke",blurb:"The truck stands up and announces itself to aircraft.",tip:"Six inches and sixty-six fifty. You will need a step stool and a new budget."})]},{id:"liner",category:"packs",label:"Bed liner",mode:"single",cars:["ironhorn"],options:[d({id:"none",name:"Bare bed",price:0,tag:"included",blurb:"Painted steel. The first fridge you haul will sign it.",tip:"A bare bed is how a new truck starts looking old. Liner is the grown-up move."}),d({id:"spray",name:"Spray-in bed liner",price:695,tag:"smart",blurb:"A thick coat locked to the metal. The right answer for a working bed.",tip:"Spray-in liner, six ninety-five. Protects the thing you bought. This is how you spend."}),d({id:"dropin",name:"Drop-in bed liner",price:349,tag:"smart",blurb:"A plastic shell you can pull out. Cheaper, a little rattly.",tip:"Drop-in is the budget liner. It works. It also drums when it is empty."})]},{id:"cover",category:"packs",label:"Tonneau cover",mode:"single",cars:["ironhorn"],options:[d({id:"none",name:"Open bed",price:0,tag:"included",blurb:"Nothing over the bed. Easy to load, easy to soak.",tip:"Open bed is honest. Just do not leave tools in the rain and then act surprised."}),d({id:"soft",name:"Soft roll-up tonneau",price:545,tag:"smart",blurb:"Vinyl cover, rolls up when you need the whole bed.",tip:"Soft cover keeps the rakes dry. Five forty-five. Reasonable."}),d({id:"hard",name:"Hard folding tonneau",price:1375,tag:"fluff",blurb:"A rigid lid that locks. Looks finished. Costs more than the liner.",tip:"Hard cover is nice if you actually lock gear back there. Otherwise it is a very expensive hat."})]},{id:"truckt",category:"packs",label:"Truck kit",mode:"multi",cars:["ironhorn"],options:[d({id:"lights",name:"Bed LED rails",price:295,tag:"smart",blurb:"Light in the bed so you are not loading by phone flashlight.",tip:"Bed lights are cheap and you will use them. I like cheap and useful."}),d({id:"winch",name:"12,000 lb winch",price:1920,tag:"fluff",blurb:"A hook and a motor on the nose. Heroic, until you never need it.",tip:"A winch is for people who get stuck on purpose. Do you?"}),d({id:"exhaust",name:"Dual exhaust",price:1560,tag:"fluff",blurb:"Two tips, more noise, the same truck underneath.",tip:"Dual exhaust so a truck can be louder. The neighbors already know it is a truck."}),d({id:"box",name:"Bed toolbox",price:780,tag:"smart",blurb:"A locking chest at the cab. Tools stay put.",tip:"A toolbox is for a person who works. If that is you, buy it. If it is a costume, skip it."}),d({id:"flaps",name:"Heavy mud flaps",price:210,tag:"smart",blurb:"They keep the rocks off the car behind you. Manners, basically.",tip:"Mud flaps are manners. Two ten. Your mother would approve, and she is not even on the loan."}),d({id:"lightbar",name:"Parade light bar",price:2240,tag:"joke",blurb:"A roof full of lamps. Visible from the next county, and from space.",tip:"A light bar for the suburbs. Twenty-two forty so you can see a deer that is not there."})]},{id:"sport",category:"packs",label:"Stallion pack",mode:"multi",cars:["stallion"],options:[d({id:"launch",name:"Launch control",price:2200,tag:"fluff",blurb:"A computer that helps you leave a light like a poster.",tip:"Launch control is a story you tell once. The price you pay every month."}),d({id:"spoiler",name:"Carbon spoiler",price:3400,tag:"fluff",blurb:"A wing on the tail. It looks fast even when you are not.",tip:"Carbon spoiler. Three thousand four hundred dollars of wind costume."}),d({id:"track",name:"Track tire set",price:2800,tag:"fluff",blurb:"Sticky rubber that hates cold mornings and long highway slogs.",tip:"Track tires on a street car wear out like gossip. Fast, and then they are gone."}),d({id:"exhaust",name:"Roaring exhaust",price:2650,tag:"fluff",blurb:"Opens the pipes. The Stallion already had a voice. This is a shout.",tip:"A roaring exhaust is how you introduce yourself to people who did not ask."}),d({id:"brakes",name:"Carbon-ceramic brakes",price:8900,tag:"joke",blurb:"Race brakes. Astonishing, and allergic to short cold trips.",tip:"Eighty-nine hundred in brakes. Unless you are late to a racetrack, this is jewelry that gets hot."}),d({id:"stripes",name:"Racing stripes",price:750,tag:"fluff",blurb:"A painted stripe down the spine. Loud in the quietest way.",tip:"Stripes are seven fifty. Cheap trouble. I will not lose sleep. Do not add three more kinds of trouble."}),d({id:"turbo",name:"Nonna's Prayer turbo",price:14500,tag:"joke",blurb:"A fantastical booster named like a blessing. It is not a blessing. It is $14,500.",tip:"Nonna’s Prayer. Fourteen thousand five hundred. Your grandmother would tell you to put it back."})]},{id:"hybrid",category:"packs",label:"Harbor pack",mode:"multi",cars:["harbor"],options:[d({id:"cargo",name:"Cargo organizer",price:240,tag:"smart",blurb:"Dividers in the hatch so the groceries stop auditioning for a chase scene.",tip:"Cargo organizer. Two forty. Your oranges stay put. This is a yes."}),d({id:"rack",name:"Roof rack",price:680,tag:"smart",blurb:"Crossbars for a bike, a box, a life that does not fit in the hatch.",tip:"A rack is worth it the first time you would have otherwise rented a truck. Six eighty."}),d({id:"ppf",name:"Paint protection film",price:1950,tag:"smart",blurb:"A clear skin on the nose and the hood. Rocks are free. Paint is not.",tip:"Paint protection on a daily driver is one of the few add-ons I do not heckle. Rocks are free. Paint is not."}),d({id:"eff",name:"Efficiency display pack",price:420,tag:"smart",blurb:"A clearer picture of what the hybrid is actually doing.",tip:"You bought a hybrid to watch the numbers. Four twenty to see them better. Coherent."}),d({id:"filter",name:"Deluxe cabin filter",price:180,tag:"smart",blurb:"Better air on the parkway. Small, boring, useful.",tip:"A cabin filter is the most adult thing on this menu. Buy it and do not tell anyone. It is not glamorous enough."})]},{id:"breezepack",category:"packs",label:"Breeze pack",mode:"multi",cars:["breeze"],options:[d({id:"deflector",name:"Wind deflector",price:320,tag:"smart",blurb:"A little screen so the top-down air does not slap you at 50.",tip:"Wind deflector makes the top-down actually usable. Three twenty. Buy the joy, then make it comfortable."}),d({id:"latch",name:"Premium top package",price:890,tag:"fluff",blurb:"Softer latches, a tighter fit, one less thing to fight at a red light.",tip:"The top already goes down. Eight ninety for a fancier way is optional. The down part is free."}),d({id:"underglow",name:"Underglow",price:680,tag:"fluff",blurb:"A cool light under the rockers. The pavement gets a costume.",tip:"Underglow. The road does not need a nightlight. You do not need this payment."}),d({id:"glow",name:"San Gennaro glow",price:4400,tag:"joke",blurb:"Festival lights, sparkler tips, and a glow that can be seen from the rectory.",tip:"The Feast of San Gennaro, but it is your car, and it is four thousand four hundred dollars. I am lighting a candle for your budget."})]},{id:"tint",category:"extras",label:"Window tint",mode:"single",cars:C,options:[d({id:"none",name:"No tint",price:0,tag:"included",blurb:"Clear glass. Honest, bright, a little hot.",tip:"Clear glass is free. In August you may wish it was not."}),d({id:"regular",name:"Window tint",price:450,tag:"smart",blurb:"A normal shade. Cooler cabin, less of your life on display.",tip:"Tint for four fifty is comfort and a little privacy. I do not fight this."}),d({id:"ceramic",name:"Ceramic tint",price:890,tag:"smart",blurb:"Rejects more heat, less mirror-look, costs more than regular dye.",tip:"Ceramic tint actually knocks the heat back. Eight ninety. If you park in the sun, it is a tool."})]},{id:"extras",category:"extras",label:"Everyday kit",mode:"multi",cars:C,options:[d({id:"mud",name:"Mud guards",price:160,tag:"smart",blurb:"Small shields behind the wheels. They save the rockers.",tip:"Mud guards. One sixty. Boring and correct."}),d({id:"net",name:"Cargo net",price:75,tag:"smart",blurb:"A net so the trunk stops rearranging itself.",tip:"Seventy-five dollars. If this is the wildest thing you add, I am proud of you."}),d({id:"keyless",name:"Keyless entry upgrade",price:350,tag:"fluff",blurb:"Walk up, get in. The key can stay in your pocket.",tip:"Keyless is convenience. Three fifty. Fine if the rest of the build is calm."}),d({id:"remote",name:"Remote start",price:495,tag:"smart",blurb:"Start it from the kitchen. The cabin is human by the time you sit down.",tip:"Jersey in January. Remote start earns its keep. I will not fight you."}),d({id:"dash",name:"Dash cam",price:320,tag:"smart",blurb:"A witness on the windshield. Cheap insurance for arguments.",tip:"Dash cam. Three twenty. The one gadget that can save you money. Buy it."}),d({id:"seal",name:"Paint sealant",price:799,tag:"fluff",blurb:"A shiny coat and a speech about beads of water.",tip:"Sealant is a car-wash sermon. Seven ninety-nine. Wash the car yourself and buy a better lunch."}),d({id:"edge",name:"Door edge guards",price:140,tag:"smart",blurb:"Little strips so parking-lot doors do not chip the paint.",tip:"Edge guards are a small kindness to the paint. One forty. Yes."}),d({id:"trunk",name:"Trunk liner",price:180,tag:"smart",cars:["stallion","harbor","breeze"],blurb:"A tray for the wet, the sandy, the leaking.",tip:"Trunk liner. One eighty. Your future self, holding a spilled plant, thanks you."})]},{id:"warranty",category:"warranty",label:"Warranty",mode:"single",cars:C,options:[d({id:"none",name:"Factory coverage only",price:0,tag:"value",blurb:"Whatever the maker already promised. Read it. It is not nothing.",tip:"Factory coverage is already on the car. Do not buy a second promise until you know what the first one says."}),d({id:"basic",name:"Powertrain, 5 years",price:2e3,tag:"smart",blurb:"Engine, transmission, the expensive organs. Two thousand.",tip:"Two grand for the powertrain. On a car you are keeping, that is the warranty I understand."}),d({id:"bumper",name:"Bumper-to-bumper, 6 years",price:3500,tag:"fluff",blurb:"A wider net for six years. Read the exclusions before you fall in love.",tip:"Thirty-five hundred, bumper to bumper. Ask what is excluded. The answer is the part that breaks."}),d({id:"platinum",name:"Platinum concierge, 8 years",price:5e3,tag:"joke",blurb:"The long hug. Loaner cars, a binder, and a lot of adjectives.",tip:"Five thousand for the platinum hug. On a seventy-grand car I will listen. On a daily driver, you are buying Ricky a boat."})]}],dt=[{id:"sound",label:"Sound"},{id:"interior",label:"Interior"},{id:"roof",label:"Roof"},{id:"wheels",label:"Wheels"},{id:"packs",label:"Packs"},{id:"extras",label:"Extras"},{id:"warranty",label:"Warranty"}],ht={black:"#1a1c1f",tan:"#c2a57a",burgundy:"#6e2434",navy:"#1c2a4a"};function ut(e){return ue.find(t=>t.id===e)||null}function Fe(e,t){return e===C||Array.isArray(e)&&e.includes(t)}function ne(e,t){return ct.filter(n=>Fe(n.cars,e)&&(!t||n.category===t)).map(n=>({...n,options:n.options.filter(a=>Fe(a.cars,e))})).filter(n=>n.options.length>0)}function pt(e){const t={},n={};for(const a of ne(e.id))a.mode==="single"?t[a.id]=a.options[0].id:n[a.id]=[];return{paint:e.colors[0].id,topDown:!1,single:t,multi:n}}function ae(e,t){return e.colors.find(n=>n.id===t.paint)||e.colors[0]}function ft(e,t){const n=[],a=ae(e,t);a.price&&n.push({id:a.id,name:a.name,price:a.price,tag:a.joke?"joke":"fluff",group:"paint",tip:a.joke?"Gold flake. Seventy-five hundred so the car can glitter like a bakery tray. I am begging you.":`${a.name} is a special paint. Pretty. It does not make the car worth more when you sell it.`});for(const o of ne(e.id))if(o.mode==="single"){const i=o.options.find(r=>r.id===t.single[o.id]);i&&n.push({...i,group:o.id})}else for(const i of t.multi[o.id]||[]){const r=o.options.find(h=>h.id===i);r&&n.push({...r,group:o.id})}return n}function fe(e,t){const n=ft(e,t),a=n.find(r=>r.group==="warranty"),o=(a==null?void 0:a.price)||0,i=n.filter(r=>r.group!=="warranty").reduce((r,h)=>r+h.price,0);return{msrp:e.msrp,options:i,warranty:o,warrantyId:(a==null?void 0:a.id)||"none",total:e.msrp+i+o,lines:n}}function Ge(e,t){let n=e.insurance;const a=t.multi.sport||[],o=t.multi.truckt||[],i=t.multi.breezepack||[];return a.includes("turbo")&&(n+=65),a.includes("brakes")&&(n+=22),t.single.wheels==="mud"&&(n+=48),t.single.wheels==="offroad"&&(n+=30),t.single.stance==="lift"&&(n+=24),o.includes("lightbar")&&(n+=12),i.includes("glow")&&(n+=18),n}const mt={credit:{title:"Credit score",body:"Your credit score is a three-digit rumor the bank believes about you. Higher means cheaper money. This is not a moral score. It is a price tag on a loan. We rolled it. Now we live with the number, or we ask your mother."},cosigner:{title:"Co-signer",body:"A co-signer tells the bank they will pay if you do not. Your mother, in this case. It can knock the rate down. It also puts Ma on the hook for the whole note. You only ask her if the rate is ugly, and you never miss a payment. That is family."},apr:{title:"APR",body:"APR is the yearly price of borrowing, written like a percent. A six instead of an eight does not look like much on a sticker. On a long loan it is thousands. You are not just buying the car. You are renting the money."},principal:{title:"Principal",body:"Principal is the chunk you still owe, before the bank’s cut. Every payment takes a bite of principal and a bite of interest. Early on, the bank eats first. That is the game. Borrow less and the bites get smaller."},interest:{title:"Interest",body:"Interest is the bank’s fee for fronting you the money. It is not a one-time tip. It gets calculated on what is left, every month. That is why the rate and the term matter as much as the sticker."},term:{title:"Term",body:"Term is how many months you are married to this payment. Sixty is five years. Eighty-four is seven. The longer one looks cheaper every month and pays the bank a longer tip. Do not stretch a note so the car dies before it does."},amortization:{title:"Amortization",body:"Amortizing means the payment stays the same while the mix changes. The first years you are mostly paying interest. Later you finally hit principal. Longer terms keep you in the interest years. That is why they feel affordable."},payment:{title:"Payment",body:"The payment is principal and interest chopped into months. A pretty payment can hide an ugly loan: long term, fat rate, extra junk. We look at the payment and at what it costs you to have it. Both. Always both."},down:{title:"Down payment",body:"A down payment is cash you put in up front so you borrow less. Less principal, less interest, smaller payment. Beautiful. Just do not empty the checking account to impress a man at a desk. Rent is still due."},trade:{title:"Trade equity",body:"Trade equity is what your old car is worth minus whatever you still owe on it. Your jalopy is paid off, so every dollar we squeeze out of Ricky comes straight off the new loan. That is found money. Treat it like it."},negative:{title:"Negative equity",body:"Negative equity is when you owe more on a car than it is worth. Upside down. Roll that into a new loan and you are paying for a ghost. Your beater is clear, so we are not starting in a hole. Do not dig one with a long term."},otd:{title:"Out the door",body:"Out the door is the real number: price, plus tax, title, doc fees, and warranty, minus the trade. Salesmen love talking monthly so you forget it. I do not. Ask for the out-the-door out loud, then decide."},warranty:{title:"Warranty",body:"A warranty is a paid promise to fix certain things for a while. Two grand for the powertrain can be peace of mind. Five grand “platinum” is often a brochure with holes in it. Buy the promise that matches the car, not the one that matches a bonus."},msrp:{title:"MSRP",body:"MSRP is the manufacturer’s suggested price. A suggestion, like when your aunt says have more lasagna. On a hot car they pretend it is sacred. It is not. We negotiate off it, and we do not pay a markup for the privilege."},docfee:{title:"Doc fee",body:"The doc fee is the charge for paperwork they were going to do anyway. Some states cap it. Some lots pad it. I will not die on a few hundred if the price of the car is right. I will always see it on the sheet."},tax:{title:"Sales tax",body:"Tax is the state’s cut. On this lot we tax the selling price plus warranty, after the trade comes off, the way a lot of states do it. It is not negotiable. A lower selling price saves you twice: on the car, and on the tax."},takehome:{title:"Take-home pay",body:"Take-home is what actually lands after a plain tax estimate, not the salary in the job offer. Yours is about $1,010 a week on a $70,000 year. The car payment has to live inside that week, next to rent and food. The salary is a rumor. The week is the truth."},financed:{title:"Amount financed",body:"Amount financed is what the bank actually lends after the trade and your cash come off. This is the principal. Not the sticker, not the monthly. Every point of interest applies to this number. Make it smaller and the whole loan gets quieter."},insurance:{title:"Insurance estimate",body:"Insurance is what you pay so a bad afternoon does not own you. It is not in the car payment, which is how people fool themselves. I put an estimate in the week so the Stallion cannot pretend it costs the same to own as the Harbor."}},Y=[{id:"side",label:"Side"},{id:"front",label:"Front"},{id:"rear",label:"Rear"}];function Ae(e,t){const n=ae(e,t),a=t.multi.breezepack||[],o=t.multi.sport||[],i=t.multi.truckt||[];let r=null;return a.includes("glow")?r="#ffb15a":a.includes("underglow")&&(r="#67e7ff"),{paint:n.hex,pearl:!!n.pearl,matte:!!n.matte,wheel:t.single.wheels||"stock",roof:t.single.roof||"none",tint:t.single.tint==="ceramic"?2:t.single.tint==="regular"?1:0,spoiler:o.includes("spoiler"),stripes:o.includes("stripes"),exhaust:o.includes("exhaust")||i.includes("exhaust"),lift:t.single.stance==="lift"?2:t.single.stance==="level"?1:0,liner:t.single.liner||"none",cover:t.single.cover||"none",underglow:r,topDown:!!t.topDown,topColor:ht[t.single.top]||"#1a1c1f",deflector:a.includes("deflector"),lightbar:i.includes("lightbar"),winch:i.includes("winch"),brakes:o.includes("brakes"),dark:lt(n.hex)<.4}}function Ie(e,t,n,a="car"){const o=t==="front"?$t(e,n,a):t==="rear"?vt(e,n,a):kt(e,n,a);return`<svg class="car${n.topDown?" is-down":""}" viewBox="0 0 840 480" role="img">
    <title>${gt(e)} , ${t} view</title>
    <defs>${He(a,n)}</defs>
    ${n.underglow?`<ellipse cx="420" cy="400" rx="250" ry="36" fill="url(#${a}-glow)"/>`:""}
    <ellipse cx="420" cy="424" rx="270" ry="18" fill="rgba(0,0,0,.38)"/>
    <ellipse cx="420" cy="426" rx="160" ry="7" fill="rgba(255,255,255,.06)"/>
    ${o}
  </svg>`}function yt(){const e="jalopy";return`<svg class="car jalopy" viewBox="0 0 840 480" role="img">
    <title>1998 Cumberland Shadow</title>
    <defs>${He(e,{paint:"#6d7278",pearl:!1,matte:!0,wheel:"steel",tint:0,underglow:null})}</defs>
    <ellipse cx="420" cy="424" rx="250" ry="16" fill="rgba(0,0,0,.38)"/>
    <g>
      ${oe(e,bt(),[[268,360,50],[590,360,50]],"body")}
      <path d="M430 168 C470 128 540 124 600 140 L640 188 L560 196 C500 188 450 186 430 196 Z" fill="url(#${e}-glass)"/>
      <path d="M250 250 L400 242 L408 330 L246 338 Z" fill="#8c8a80" opacity=".92"/>
      <path d="M300 268 C330 290 328 310 300 324" fill="none" stroke="#4a4e52" stroke-width="3"/>
      <path d="M470 150 L520 176" stroke="rgba(255,255,255,.7)" stroke-width="2"/>
      <path d="M500 158 L530 196" stroke="rgba(255,255,255,.45)" stroke-width="1.5"/>
      <path d="M150 300 h40 v18 h-40z" fill="#f2e2b8"/>
      <rect x="168" y="286" width="22" height="10" rx="2" fill="#c4552a"/>
      ${y(268,360,42,"steel",e,!1)}
      ${y(590,360,42,"stock",e,!1)}
      <g transform="translate(250,392) rotate(-18)">
        <ellipse cx="0" cy="0" rx="16" ry="7" fill="#cfc8bc" stroke="#888" stroke-width="1"/>
      </g>
      ${j(455,318,"AS-IS",!0)}
    </g>
  </svg>`}function gt(e){return{stallion:"Stallion GT",harbor:"Harbor Hybrid",ironhorn:"Ironhorn 1500",breeze:"Breeze Convertible"}[e]||"Car"}function He(e,t){const n=t.matte?$e(t.paint,"#ffffff",.1):$e(t.paint,"#ffffff",t.pearl?.62:.4),a=$e(t.paint,"#000000",t.matte?.22:.48),o=t.tint>1?.35:t.tint===1?.55:.82,i=t.wheel==="forged"||t.wheel==="carbonw",r=i?"#3a3a3a":"#f5f5f3",h=i?"#111":t.wheel==="chrome"||t.wheel==="chrome20"||t.wheel==="wire"?"#aeb4ba":"#7b8086",c=t.underglow||"#ffffff";return`
    <linearGradient id="${e}-paint" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="${n}"/>
      <stop offset="40%" stop-color="${t.paint}"/>
      <stop offset="100%" stop-color="${a}"/>
    </linearGradient>
    <linearGradient id="${e}-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e7f1f8" stop-opacity="${o}"/>
      <stop offset="48%" stop-color="#1a2836" stop-opacity="${.5+t.tint*.18}"/>
      <stop offset="100%" stop-color="#0d141c" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="${e}-rim" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${r}"/>
      <stop offset="50%" stop-color="${h}"/>
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
    </radialGradient>`}function oe(e,t,n,a){const o=`${e}-${a}`,i=n.map(([r,h,c])=>`<circle cx="${r}" cy="${h}" r="${c}" fill="#000"/>`).join("");return`<mask id="${o}" maskUnits="userSpaceOnUse" x="0" y="0" width="840" height="480">
      <path d="${t}" fill="#fff"/>${i}
    </mask>
    <path d="${t}" fill="url(#${e}-paint)" mask="url(#${o})"/>`}function bt(){return`M 150 338
    C 146 292 176 250 250 232
    L 360 220
    C 410 210 440 162 510 146
    L 620 140
    C 690 140 730 168 748 206
    L 770 250
    C 786 286 784 330 752 348
    L 190 352
    C 160 352 148 346 150 338 Z`}function y(e,t,n,a,o,i){const h=n*(a==="offroad"||a==="mud"||a==="steel"?.5:a==="aero"?.78:.66),c=a==="runflat"?`<circle cx="${e}" cy="${t}" r="${n-2}" fill="none" stroke="#d6b15e" stroke-width="2"/>`:"";return`
    <g class="wheel">
      <circle cx="${e}" cy="${t}" r="${n}" fill="#161616"/>
      <circle cx="${e}" cy="${t}" r="${n-4}" fill="#242424"/>
      ${c}
      <circle cx="${e}" cy="${t}" r="${h}" fill="url(#${o}-rim)"/>
      ${i?`<circle cx="${e}" cy="${t}" r="${h*.78}" fill="none" stroke="#d23b32" stroke-width="5"/>`:""}
      ${wt(e,t,h,a)}
      <circle cx="${e}" cy="${t}" r="${Math.max(4,h*.16)}" fill="#ece7df"/>
      <circle cx="${e}" cy="${t}" r="${Math.max(2,h*.07)}" fill="#222"/>
      <ellipse cx="${e-n*.08}" cy="${t-n*.42}" rx="${n*.32}" ry="${n*.1}" fill="#fff" opacity=".2"/>
    </g>`}function wt(e,t,n,a){if(a==="aero")return`<circle cx="${e}" cy="${t}" r="${n*.86}" fill="#dfe3e6"/>
      <circle cx="${e}" cy="${t}" r="${n*.22}" fill="#222"/>
      <circle cx="${e-n*.28}" cy="${t}" r="${n*.08}" fill="#222"/>
      <circle cx="${e+n*.28}" cy="${t}" r="${n*.08}" fill="#222"/>`;if(a==="steel")return`<circle cx="${e}" cy="${t}" r="${n*.9}" fill="#5c6166"/>
      ${[0,60,120,180,240,300].map(p=>{const b=p*Math.PI/180,m=e+Math.cos(b)*n*.48,w=t+Math.sin(b)*n*.48;return`<circle cx="${m.toFixed(1)}" cy="${w.toFixed(1)}" r="${n*.16}" fill="#2a2c2e"/>`}).join("")}`;const o={stock:5,sport:12,chrome:8,forged:5,runflat:5,carbonw:8,wire:18,offroad:6,mud:6,chrome20:8}[a]||5,h=a==="forged"||a==="carbonw"?"#141414":a==="chrome"||a==="chrome20"||a==="wire"?"#f7f7f5":"#c5c8cc",c=a==="sport"||a==="wire"||a==="carbonw"?1.5:a==="forged"?5:3.4;let u="";for(let p=0;p<o;p+=1){const b=Math.PI*2*p/o-Math.PI/2,m=e+Math.cos(b)*n*.9,w=t+Math.sin(b)*n*.9;u+=`<line x1="${e}" y1="${t}" x2="${m.toFixed(1)}" y2="${w.toFixed(1)}" stroke="${h}" stroke-width="${c}" stroke-linecap="round"/>`}return a==="carbonw"&&(u+=`<circle cx="${e}" cy="${t}" r="${n*.92}" fill="none" stroke="#8f1d2c" stroke-width="2"/>`),u}function j(e,t,n,a=!1){const o=a?78:92;return`<g transform="translate(${e} ${t})">
    <rect width="${o}" height="${a?32:40}" rx="3" fill="#123a78" stroke="#d7c27a" stroke-width="1.5"/>
    <text x="${o/2}" y="${a?21:26}" text-anchor="middle" fill="#f4efe2" font-family="Outfit, sans-serif" font-size="${a?13:16}" font-weight="700" letter-spacing="1">${n}</text>
  </g>`}function v(e,t,n,a,o,i=3){return`<rect x="${e}" y="${t}" width="${n}" height="${a}" rx="${i}" fill="${o}"/>
    <rect x="${e}" y="${t}" width="${n*.45}" height="${a}" rx="${i}" fill="#fff" opacity=".35"/>`}function kt(e,t,n){return e==="harbor"?Tt(t,n):e==="ironhorn"?Lt(t,n):e==="breeze"?St(t,n):xt(t,n)}function $t(e,t,n){return e==="harbor"?At(t,n):e==="ironhorn"?It(t,n):e==="breeze"?Ct(t,n):Mt(t,n)}function vt(e,t,n){return e==="harbor"?Rt(t,n):e==="ironhorn"?Pt(t,n):e==="breeze"?zt(t,n):Bt(t,n)}function J(e,t){if(!t.stripes)return"";const n=t.dark?"rgba(244,239,230,.88)":"rgba(18,18,18,.82)";return`<path d="${e}" fill="none" stroke="${n}" stroke-width="10" stroke-linecap="round"/>`}function Ce(e,t,n,a,o,i){if(i==="none")return"";const r=i==="pano"?n:n*.55,h=i==="carbon"?"#1a1c1f":`url(#${o}-glass)`;return`<rect x="${e}" y="${t}" width="${r}" height="${a}" rx="6" fill="${h}" stroke="rgba(255,255,255,.25)" stroke-width="1"/>`}function xt(e,t){return`
    ${oe(t,`M 46 312
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
    <path d="M 455 186 C 492 140 548 118 630 114 L 760 152 L 742 176 C 660 164 520 172 468 198 Z" fill="url(#${t}-glass)"/>
    <path d="M 150 214 C 250 198 340 194 420 202" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3"/>
    <path d="M 500 200 L 496 338" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
    <path d="M 168 248 C 250 232 340 228 430 240" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="7" stroke-linecap="round"/>
    <path d="M 92 292 h34 l8 12 h-34 z" fill="#f7f1df"/>
    <path d="M 86 276 h16 v8 h-12 z" fill="#f08a3a"/>
    <path d="M 792 236 h26 v12 h-18 z" fill="#c42828"/>
    <path d="M 120 324 h90 v8 h-90 z" fill="rgba(0,0,0,.4)"/>
    ${U(214,340,66)}
    ${U(648,342,68)}
    ${Ce(560,108,160,20,t,e.roof==="none"?"none":e.roof)}
    ${J("M 130 286 C 320 270 540 274 790 236",e)}
    ${e.spoiler?'<path d="M690 132 h110 l8 12 h-100 z" fill="#141414"/><path d="M734 144 v26 M790 138 v22" stroke="#141414" stroke-width="4"/>':""}
    ${e.exhaust?`<circle cx="786" cy="338" r="7" fill="url(#${t}-metal)"/><circle cx="806" cy="338" r="7" fill="url(#${t}-metal)"/>`:'<circle cx="800" cy="336" r="5" fill="#9a9a9a"/>'}
    ${y(214,340,60,e.wheel,t,e.brakes)}
    ${y(648,342,62,e.wheel,t,e.brakes)}`}function U(e,t,n){return`<path d="M ${e-n} ${t+6} A ${n} ${n} 0 0 1 ${e+n} ${t+6}" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="7"/>`}function Tt(e,t){return`
    ${oe(t,`M 118 330
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
    <path d="M 400 214 C 430 156 478 132 548 126 L 640 126 L 688 168 L 676 196 L 520 204 C 460 202 420 210 400 226 Z" fill="url(#${t}-glass)"/>
    <path d="M 668 126 L 724 230" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="3"/>
    <path d="M 220 236 C 300 222 350 220 400 230" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="3"/>
    <path d="M 500 200 L 494 332" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
    ${U(250,348,48)}
    ${U(600,348,48)}
    <rect x="156" y="276" width="36" height="14" rx="2" fill="#f4f0e4"/>
    <rect x="156" y="262" width="16" height="8" rx="2" fill="#7ec8ff"/>
    <rect x="692" y="248" width="18" height="28" rx="2" fill="#d23b32"/>
    <rect x="648" y="286" width="22" height="14" rx="4" fill="#9be7c4"/>
    ${Ce(500,112,150,16,t,e.roof)}
    ${J("M 190 292 C 360 284 540 292 690 276",e)}
    ${y(250,348,44,e.wheel,t,!1)}
    ${y(600,348,44,e.wheel,t,!1)}`}function Lt(e,t){const n=e.wheel==="mud"?14:e.wheel==="offroad"?8:0,a=e.lift===2?28:e.lift===1?14:0,o=60+n+(e.lift===2?8:e.lift===1?4:0),i=346-a*.2,r=`M 40 292
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
    L 40 318 Z`,h=e.liner==="spray"?"#2a2c2e":e.liner==="dropin"?"#4a5560":"rgba(0,0,0,.18)";let c="";return e.cover==="soft"&&(c='<path d="M570 196 L800 184 L802 214 L572 220 Z" fill="#1b1d20"/>'),e.cover==="hard"&&(c='<path d="M568 188 L806 174 L808 208 L570 216 Z" fill="#2c3136" stroke="rgba(255,255,255,.2)"/>'),`
    <g transform="translate(0 ${(-a).toFixed(1)})">
      ${oe(t,r,[[230,i+a,o+10],[650,i+a,o+12]],"body")}
      <path d="M 360 176 C 386 132 424 114 470 112 L 530 112 L 548 150 L 430 168 Z" fill="url(#${t}-glass)"/>
      <path d="M 572 192 L 800 180 L 806 268 L 574 276 Z" fill="${h}"/>
      <path d="M 560 150 L 560 330" stroke="rgba(0,0,0,.35)" stroke-width="4"/>
      ${c}
      <path d="M 210 186 C 280 176 330 176 360 184" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="3"/>
      <path d="M 430 170 L 426 300" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
      <rect x="96" y="230" width="46" height="18" rx="2" fill="#f6f3ea"/>
      <rect x="150" y="236" width="22" height="12" rx="2" fill="#f6f3ea"/>
      <rect x="786" y="214" width="18" height="28" rx="2" fill="#c42828"/>
      ${e.lightbar?'<rect x="430" y="86" width="120" height="14" rx="3" fill="#222"/><rect x="438" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="466" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="494" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="522" y="89" width="22" height="8" fill="#f4f1c8"/>':""}
      ${e.winch?`<rect x="70" y="300" width="54" height="16" rx="2" fill="url(#${t}-metal)"/>`:""}
      ${e.exhaust?`<circle cx="40" cy="300" r="8" fill="url(#${t}-metal)"/><circle cx="40" cy="278" r="8" fill="url(#${t}-metal)"/>`:""}
      <path d="M 120 286 h80 v8 h-80z" fill="url(#${t}-metal)"/>
    </g>
    ${y(230,i,o,e.wheel,t,!1)}
    ${y(650,i,o+2,e.wheel,t,!1)}`}function St(e,t){const n=`M 120 328
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
      C 680 220 580 210 500 236 Z" fill="${e.topColor}" stroke="rgba(255,255,255,.2)"/>
    <path class="top-canvas" d="M 520 196 C 580 180 650 184 710 208" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="2"/>`,o=`<path d="M 400 220 C 430 168 490 150 560 156 L 590 214 C 520 206 450 210 408 232 Z" fill="url(#${t}-glass)"/>`,i=`<g class="cockpit">
      <path d="M 470 236 C 520 214 620 214 680 240 L 690 280 L 470 286 Z" fill="#2a221c"/>
      <path d="M 530 236 C 560 220 610 220 640 240 L 636 268 L 524 270 Z" fill="#4a3b32"/>
      <rect x="600" y="228" width="28" height="14" rx="5" fill="#241c18"/>
      ${e.deflector?'<path d="M 455 196 h10 l18 78 h-10 z" fill="rgba(190,220,235,.4)" stroke="rgba(255,255,255,.45)"/>':""}
    </g>`;return`
    ${oe(t,n,[[268,346,54],[590,346,54]],"body")}
    ${i}
    ${a}
    ${o}
    <path d="M 210 240 C 300 224 380 220 460 228" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="3"/>
    <path d="M 470 230 L 466 336" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
    ${U(268,346,50)}
    ${U(590,346,50)}
    <rect x="168" y="286" width="34" height="12" rx="2" fill="#f7f3ea"/>
    <rect x="724" y="286" width="18" height="22" rx="2" fill="#d23b32"/>
    ${J("M 190 300 C 360 290 540 300 720 292",e)}
    ${y(268,346,46,e.wheel,t,!1)}
    ${y(590,346,46,e.wheel,t,!1)}`}function Mt(e,t){return`
    <path d="M250 150 L590 150 L640 210 L670 300 L640 360 L200 360 L170 300 L200 210 Z" fill="url(#${t}-paint)"/>
    <path d="M280 158 L560 158 L600 206 L240 206 Z" fill="url(#${t}-glass)"/>
    <path d="M300 168 h70" stroke="#fff" stroke-width="3" opacity=".35"/>
    ${v(214,250,78,18,"#f4f1e2",2)}
    ${v(548,250,78,18,"#f4f1e2",2)}
    <path d="M360 248 h120 v70 h-120 z" fill="#141414"/>
    <path d="M372 258 h96 M372 274 h96 M372 290 h96" stroke="#5c6168" stroke-width="3"/>
    <path d="M404 276 h32 v22 h-32 z" fill="${e.paint}" stroke="rgba(255,255,255,.3)"/>
    <path d="M200 318 h70 v24 h-70 z" fill="#111"/>
    <path d="M570 318 h70 v24 h-70 z" fill="#111"/>
    ${e.spoiler?'<path d="M230 118 h380 v16 h-380 z" fill="#161616"/>':""}
    ${J("M 420 210 V 340",e)}
    ${y(188,332,52,e.wheel,t,e.brakes)}
    ${y(652,332,52,e.wheel,t,e.brakes)}
    ${j(374,292,"VITT")}`}function At(e,t){return`
    <path d="M250 120 L590 120 L650 190 L670 250 L650 360 L190 360 L170 250 L190 190 Z" fill="url(#${t}-paint)"/>
    <path d="M290 128 L550 128 L590 186 L250 186 Z" fill="url(#${t}-glass)"/>
    ${v(210,230,70,28,"#f7f4ea",6)}
    ${v(560,230,70,28,"#f7f4ea",6)}
    <path d="M370 236 h100 v46 h-100 z" fill="#1b1e22" rx="6"/>
    <path d="M392 250 h56 v20 h-56 z" fill="#9be7c4"/>
    <text x="420" y="264" text-anchor="middle" font-size="11" font-family="Outfit, sans-serif" fill="#0e3b34" font-weight="700">HYBRID</text>
    <path d="M300 300 h240 v10 h-240 z" fill="#67c7ff" opacity=".8"/>
    ${Ce(360,112,120,16,t,e.roof)}
    ${y(200,338,46,e.wheel,t,!1)}
    ${y(640,338,46,e.wheel,t,!1)}
    ${j(374,300,"HRBR")}`}function It(e,t){const n=e.lift===2?28:e.lift===1?12:0,a=58+(e.wheel==="mud"?12:e.wheel==="offroad"?8:0)+(e.lift===2?8:0);return`
    <g transform="translate(0 ${-n})">
      <path d="M200 70 L640 70 L690 150 L710 250 L680 360 L160 360 L130 250 L150 150 Z" fill="url(#${t}-paint)"/>
      <path d="M250 78 L590 78 L630 146 L210 146 Z" fill="url(#${t}-glass)"/>
      ${v(188,180,90,36,"#f4f1e4",4)}
      ${v(562,180,90,36,"#f4f1e4",4)}
      <rect x="300" y="188" width="240" height="110" rx="4" fill="#c5ccd2" stroke="#888"/>
      <path d="M312 200 h216 M312 222 h216 M312 244 h216 M312 266 h216" stroke="#6a727a" stroke-width="6"/>
      <rect x="392" y="230" width="56" height="28" fill="${e.paint}"/>
      ${e.winch?`<rect x="360" y="308" width="120" height="28" rx="4" fill="url(#${t}-metal)"/><circle cx="420" cy="322" r="10" fill="#222"/>`:""}
      ${e.lightbar?'<rect x="300" y="46" width="240" height="18" rx="3" fill="#1a1a1a"/><rect x="312" y="50" width="36" height="10" fill="#fff6c8"/><rect x="356" y="50" width="36" height="10" fill="#fff6c8"/><rect x="400" y="50" width="36" height="10" fill="#fff6c8"/><rect x="444" y="50" width="36" height="10" fill="#fff6c8"/><rect x="488" y="50" width="36" height="10" fill="#fff6c8"/>':""}
      <path d="M160 330 h120 v16 h-120 z" fill="url(#${t}-metal)"/>
      <path d="M560 330 h120 v16 h-120 z" fill="url(#${t}-metal)"/>
    </g>
    ${y(176,340,a*.92,e.wheel,t,!1)}
    ${y(664,340,a*.92,e.wheel,t,!1)}`}function Ct(e,t){return`
    <path d="M230 190 L610 190 L660 250 L670 340 L620 370 L220 370 L170 340 L180 250 Z" fill="url(#${t}-paint)"/>
    <path class="top-canvas" d="M300 120 L540 120 L590 190 L250 190 Z" fill="${e.topColor}"/>
    <path d="M270 150 L570 150 L600 196 L240 196 Z" fill="url(#${t}-glass)"/>
    ${v(210,260,64,36,"#f7f4ea",16)}
    ${v(566,260,64,36,"#f7f4ea",16)}
    <ellipse cx="420" cy="286" rx="46" ry="28" fill="#202226"/>
    ${J("M 420 200 V 340",e)}
    ${y(196,340,50,e.wheel,t,!1)}
    ${y(644,340,50,e.wheel,t,!1)}
    ${j(374,300,"BRZ")}`}function Bt(e,t){return`
    <path d="M230 150 L610 150 L660 230 L680 340 L640 372 L200 372 L160 340 L180 230 Z" fill="url(#${t}-paint)"/>
    <path d="M280 158 L560 158 L520 210 L320 210 Z" fill="url(#${t}-glass)"/>
    ${v(196,250,90,22,"#e23b3b",2)}
    ${v(554,250,90,22,"#e23b3b",2)}
    ${e.spoiler?'<path d="M180 112 h480 v18 h-480 z" fill="#141414"/><path d="M230 130 v24 M610 130 v24" stroke="#141414" stroke-width="6"/>':""}
    ${e.exhaust?`<circle cx="250" cy="348" r="10" fill="url(#${t}-metal)"/><circle cx="590" cy="348" r="10" fill="url(#${t}-metal)"/>`:'<circle cx="270" cy="346" r="7" fill="#777"/>'}
    ${J("M 420 210 V 330",e)}
    ${y(190,366,48,e.wheel,t,e.brakes)}
    ${y(650,366,48,e.wheel,t,e.brakes)}
    ${j(374,268,"VITT")}`}function Rt(e,t){return`
    <path d="M230 130 L610 130 L660 200 L670 360 L180 360 L170 200 Z" fill="url(#${t}-paint)"/>
    <path d="M300 140 L540 140 L500 200 L340 200 Z" fill="url(#${t}-glass)"/>
    ${v(200,230,80,36,"#d23b32",4)}
    ${v(560,230,80,36,"#d23b32",4)}
    <path d="M360 250 h120 v70 h-120 z" fill="rgba(0,0,0,.25)" stroke="rgba(255,255,255,.15)"/>
    ${y(200,364,42,e.wheel,t,!1)}
    ${y(640,364,42,e.wheel,t,!1)}
    ${j(374,292,"HRBR")}`}function Pt(e,t){const n=e.lift===2?26:e.lift===1?12:0,a=58+(e.wheel==="mud"?10:0),o=e.cover==="hard"?"#2c3136":e.cover==="soft"?"#1b1d20":`url(#${t}-paint)`;return`
    <g transform="translate(0 ${-n})">
      <path d="M170 90 L670 90 L710 170 L720 250 L690 360 L150 360 L120 250 L130 170 Z" fill="url(#${t}-paint)"/>
      <path d="M250 100 L590 100 L560 160 L280 160 Z" fill="url(#${t}-glass)"/>
      ${v(175,200,100,34,"#d23b32",3)}
      ${v(565,200,100,34,"#d23b32",3)}
      <rect x="300" y="210" width="240" height="120" fill="${o}" stroke="rgba(255,255,255,.15)"/>
      <path d="M300 268 h240" stroke="rgba(255,255,255,.2)" stroke-width="3"/>
      ${e.exhaust?`<circle cx="150" cy="340" r="9" fill="url(#${t}-metal)"/><circle cx="690" cy="340" r="9" fill="url(#${t}-metal)"/>`:""}
    </g>
    ${y(160,370,a,e.wheel,t,!1)}
    ${y(680,370,a,e.wheel,t,!1)}
    ${j(374,250,"1500")}`}function zt(e,t){return`
    <path d="M230 180 L610 180 L660 250 L670 360 L170 360 L180 250 Z" fill="url(#${t}-paint)"/>
    <path class="top-canvas" d="M300 120 L540 120 L590 180 L250 180 Z" fill="${e.topColor}"/>
    <path d="M320 150 L520 150 L490 196 L350 196 Z" fill="url(#${t}-glass)"/>
    ${v(200,250,70,28,"#d23b32",8)}
    ${v(570,250,70,28,"#d23b32",8)}
    ${y(196,366,46,e.wheel,t,!1)}
    ${y(644,366,46,e.wheel,t,!1)}
    ${j(374,292,"BRZ")}`}function Ft(e,t,n){const a=Math.max(0,e),o=Math.max(1,n);if(a===0)return 0;const i=t/100/12;if(i===0)return B(a/o);const r=(1+i)**o;return B(a*i*r/(r-1))}function B(e){return Math.round(e*100)/100}function O(e){const n=(820-R(e,675,820))/145;return B(6+n*2)}function pe(e){return R(B(e+.7),e,8)}function H(e){return je(e.msrp*(1+e.markup),50)}function V(e){return je(e.msrp*(1-e.room),50)}function ce(e){return e*12/52}function Ne(){return g.weeklyTakeHome*52/12}function Ve({price:e,options:t=0,warranty:n=0,trade:a=0,down:o=0,apr:i=6,term:r=72,insurance:h=0}){const c=e+t,u=Math.max(0,c+n-a),p=B(u*ve.taxRate),b=ve.doc,m=ve.title,w=B(c+n+b+m+p),E=B(w-a),L=Math.max(0,o),P=B(Math.max(0,E-L)),I=Ft(P,i,r),z=B(I*r),q=B(Math.max(0,z-P)),Q=Ne(),re=ce(Se),se=ce(h),Z=ce(I),ge=g.weeklyTakeHome-re-se-Z,be=Q>0?I/Q:0;return{selling:c,options:t,warranty:n,taxable:u,tax:p,doc:b,title:m,subtotal:w,trade:a,otd:E,down:L,financed:P,apr:i,term:r,payment:I,totalOfPayments:z,interest:q,insurance:h,monthlyTake:Q,weeklyBills:re,weeklyIns:se,weeklyPay:Z,weeklyLeft:ge,paymentShare:be}}function me(e){return e>.2||!Number.isFinite(e)?"bad":e>.15?"warn":"ok"}function Be(){return`
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
    </svg>`}function Dt(){return`
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
    </svg>`}const s={screen:"intro",credit:{score:null,cosign:!1,boost:0,rolling:!1},carId:"stallion",builds:{},deals:{},category:"sound",view:0,spinning:!1,hintSeen:!1,moneyOpen:!1,sheet:null,advice:"",grade:null,lastGrade:null};function K(){const{score:e,boost:t,cosign:n}=s.credit;return e?Math.min(820,e+(n?t:0)):null}function S(){return ut(s.carId)||ue[0]}function T(e=S()){return s.builds[e.id]||(s.builds[e.id]=pt(e)),s.builds[e.id]}function W(e=S()){const t=T(e),n=K()||700;if(!s.deals[e.id]){const r=O(n);s.deals[e.id]={carId:e.id,price:H(e),trade:A.open,apr:pe(r),term:72,downChecking:0,downSavings:0,effectiveScore:n}}const a=s.deals[e.id];a.effectiveScore=n;const o=O(n),i=pe(o);return a.apr=R(a.apr,o,i),a.price=R(a.price,V(e),H(e)),a.trade=R(a.trade,A.min,A.max),a.downChecking=R(a.downChecking,0,g.checking),a.downSavings=R(a.downSavings,0,g.savings),a.warrantySync=t.single.warranty,a}function Yt(){s.credit={score:null,cosign:!1,boost:0,rolling:!1},s.carId="stallion",s.builds={},s.deals={},s.category="sound",s.view=0,s.spinning=!1,s.hintSeen=!1,s.moneyOpen=!1,s.sheet=null,s.advice="",s.grade=null}function Ot(){try{const e=localStorage.getItem("dreamcar-last");s.lastGrade=e?JSON.parse(e):null}catch{s.lastGrade=null}}function jt(e,t){const n={letter:e.letter,title:e.title,car:t.name,payment:e.quote.payment};s.lastGrade=n;try{localStorage.setItem("dreamcar-last",JSON.stringify(n))}catch{}}function Et(){const e=Math.random();let t,n;return e<.06?(t=675,n=699):e<.68?(t=700,n=780):e<.94?(t=781,n=809):(t=810,n=820),t+Math.floor(Math.random()*(n-t+1))}function We(e){return e>=800?{id:"excellent",label:"Excellent",line:"Cheap money. Do not waste it on a stupid car."}:e>=740?{id:"verygood",label:"Very good",line:"The bank will talk nice. Not charity-nice. Nice."}:e>=700?{id:"good",label:"Good",line:"Respectable. Ricky will still try to fatten the rate. Do not let him."}:{id:"fair",label:"Fair",line:"The rate is going to sting. This is the moment you think about your mother. Carefully."}}function Gt(){return"I am Vinny Caputo. They call me Numbers. Ricky is going to smile. I am here so you do not smile back too fast. First we see what the bank thinks you are worth."}function Ht(e){const t=We(e);return e>=800?`${e}. ${t.line} An 800 is rare. Do not celebrate by buying the ceiling of the menu.`:e<700?`${e}. ${t.line} Most people land in the 700s. You caught a thin one. We can still shop. We just will not pretend the money is free.`:`${e}. ${t.line}`}function Nt(e,t,n){return n>=760?`Ma co-signed anyway. +${e}, so the bank sees ${t}. You did not need her. Now you owe her more than money. Do not miss a payment. Ever.`:`You called Ma. She sighed the sigh. She said yes. +${e} on the score the bank will use, which puts you at ${t}. That is a gift. Treat it like one.`}function ye(e,t){const n=fe(e,t),a=n.lines.filter(u=>u.price>0&&u.group!=="warranty"),o=a.filter(u=>u.tag==="joke"),i=a.filter(u=>u.tag==="smart"),r=a.filter(u=>u.tag==="fluff"||u.tag==="joke").reduce((u,p)=>u+p.price,0),h=n.lines.find(u=>u.group==="warranty"),c=ae(e,t);if(o.length){const u=o[o.length-1];return u.tip||`${u.name} is a bit. The payment will not get the joke.`}return c.joke?"Gold flake. Seventy-five hundred so the car can glitter. Your nonna would take the spatula away from you.":(h==null?void 0:h.id)==="platinum"&&e.msrp<45e3?"Five grand of platinum on a car this price is how Ricky pays for his weekend. Two grand covers the organs. Start there.":(h==null?void 0:h.id)==="platinum"&&e.msrp>=7e4?"Platinum on a Stallion I will at least hear out. Just do not stack it on top of a wing, a turbo, and a concert.":r>e.msrp*.12?`You have ${l(r)} in extras that mostly wave at people. The car was already a car. The payment is where it gets heavy.`:n.options===0&&((h==null?void 0:h.id)==="none"||!h)?"Bone stock is a negotiating position. I respect it. Add one thing you will touch every week, then stop.":i.length>=2&&r<800?"Look at you. Mats, a camera, stuff you will actually use. This is how a grown-up builds a car.":e.id==="breeze"&&t.topDown?"Top down is free. Say it again when they try to charge you for joy. The canvas color is the only part with a price.":e.id==="stallion"&&n.options<2500?"I love a Stallion. Your paycheck is less romantic. Build it, sit at the desk, and be ready to walk. A sharp deal on the wrong car is still the wrong car.":e.id==="harbor"&&r>2500?"You took the sensible car and dressed it like the silly one. Pick a lane. The Harbor wins when the build stays quiet.":e.id==="ironhorn"&&(t.single.stance==="lift"||t.single.wheels==="mud")?"The truck was already a truck. The lift and the carnival tires are how a work vehicle becomes a hobby you finance.":(h==null?void 0:h.id)==="basic"?"Powertrain warranty, two thousand. Covers the expensive stuff. You are not buying the dealership a boat. I like this.":"Every option has a price because every option lands in the payment. If you will not notice it on a Tuesday, leave it in the rack."}function qe(e,t){const n=H(e),a=V(e),o=Math.max(1,n-a),i=(n-t.price)/o,r=(t.trade-3600)/2e3;return i>.85&&r>.7?"Alright. Alright. You win on the car. I still have a family. Probably.":i>.55?"You are killing me. Let me pretend to call my manager.":r>.65?"I have to wholesale that jalopy. My guy is going to laugh at me.":t.apr<=O(t.effectiveScore)+.05?"Rates come from the bank, not from me. Today the bank is feeling generous. Apparently.":i<.15&&r<.25?"This one has been waiting for someone with taste. I can probably come down a little. Probably.":"I can move a little. Do not make me get emotional. I just had lunch."}function Ze(e,t,n){const a=V(e),o=H(e),i=O(t.effectiveScore),r=me(n.paymentShare);return t.downChecking+t.downSavings>n.otd+1&&n.financed===0?"You brought more cash than the car costs. Put the extra back. A cash deal can still be a bad price.":n.weeklyLeft<0?"This payment eats the week alive. You would be choosing between the car and groceries. That is not a deal. That is a trap with a steering wheel.":r==="bad"?`The payment is ${te(n.paymentShare)} of take-home. I start sweating at fifteen. We are past sweating. Stretch the term and it only hides the problem.`:r==="warn"?`You are over that 15% line, at ${te(n.paymentShare)} of take-home. It works until the first surprise bill. Then it does not. Knock the price or the fluff.`:t.downSavings>0?"That savings account is the emergency fund. A car is not an emergency. It is a want with cupholders. Put Ma’s rainy day back.":t.downChecking>7e3?"You are about to hand Ricky the checking account. Rent does not care how the car smells. Leave yourself a month of life.":t.price<=a+50&&t.trade>=5e3&&t.apr<=i+.05&&r==="ok"?"Now we are talking. Price is at the bone, the jalopy got respect, and the rate matches your score. Shake before he changes his mind.":t.price>=o-50?"You are still sitting on his opening number. That number has a markup in it. Slide it toward you. He expects you to.":t.trade<=3800?"He lowballed the Cumberland. It is ugly. It is not worthless. Four thousand five hundred is fair. Make him climb.":t.apr>i+.25?`The rate is ${t.apr.toFixed(2)}%. Your score earned about ${i.toFixed(2)}%. The gap is Ricky’s quiet little tip. Take it back.`:t.term===84&&n.paymentShare<.1?"You can afford a shorter term and you are still stretching to eighty-four. That is extra interest for a payment you do not need. Look at sixty.":t.term===84?"Eighty-four months is seven years with this car. The payment looks kind. The interest is the unkind part. Only stay here if sixty genuinely breaks the week.":n.weeklyLeft<140?`You can swing it. You just cannot sneeze. About ${l(n.weeklyLeft)} left in the week after bills, insurance, and the car. Tight.`:`The week still has air in it, about ${l(n.weeklyLeft)} after the life you already live. That is how you stay a person, not a payment.`}function Re(e,t,n){const a=fe(e,t);return{priced:a,quote:Ve({price:n.price,options:a.options,warranty:a.warranty,trade:n.trade,down:n.downChecking+n.downSavings,apr:n.apr,term:n.term,insurance:Ge(e,t)})}}const xe=[{min:93,letter:"A+",title:"He never saw you coming"},{min:86,letter:"A",title:"That is a grown-up deal"},{min:78,letter:"B",title:"You held your own"},{min:70,letter:"C",title:"You left money on the desk"},{min:60,letter:"D",title:"Ricky is buying dinner tonight"},{min:0,letter:"F",title:"They ate you alive"}];function De(e,t,n,a,o){if(n===t)return o;const i=Math.min(1,Math.max(0,(e-t)/(n-t)));return a+(o-a)*i}function Vt(e,t,n){const{priced:a,quote:o}=Re(e,t,n),i=O(n.effectiveScore),r=V(e),h=H(e),c=[];let u=0;const p=De(n.price,h,r,0,22);u+=p,n.price>=e.msrp*1.02?c.push({tone:"bad",text:`You paid ${l(n.price)} on a ${l(e.msrp)} car. That is a markup, and you thanked him for it.`}):n.price<=r+80?c.push({tone:"good",text:`You walked the ${e.name} down to ${l(n.price)}. That is the bone. Ricky felt that.`}):n.price<e.msrp?c.push({tone:"mid",text:`Under sticker, at ${l(n.price)}. Respectable. There was still a little meat on it.`}):c.push({tone:"bad",text:`You paid sticker, ${l(n.price)}. On this lot, sticker is where the conversation starts, not where it ends.`});const b=De(n.trade,3400,5300,1,14);u+=Math.max(0,Math.min(14,b)),n.trade<4e3?c.push({tone:"bad",text:`The trade came in at ${l(n.trade)}. The jalopy is ugly. It is still a ${l(4500)} car. You let him steal it.`}):n.trade>=5e3?c.push({tone:"good",text:`He paid ${l(n.trade)} for a car he does not want to look at. That is found money off the loan.`}):c.push({tone:"mid",text:`Trade at ${l(n.trade)}. Fair lives around $4,500. You are in the neighborhood.`});const m=n.apr-i,w=m<=.05?16:m<=.2?12:m<=.4?7:2;u+=w,m<=.05?c.push({tone:"good",text:`The rate is ${n.apr.toFixed(2)}%. That matches a ${n.effectiveScore} score. This is the whole ballgame.`}):c.push({tone:"bad",text:`You are paying ${m.toFixed(2)} points more than your score earned. On this loan that tip goes to the bank, quietly, for years.`});let E=n.term===60?10:n.term===72?6:2;n.term===84&&o.paymentShare>.12&&Ve({...o,term:60,price:n.price,options:a.options,warranty:a.warranty,trade:n.trade,down:o.down,apr:n.apr,insurance:o.insurance}).paymentShare>.18&&(E=5),u+=E,n.term===84?c.push({tone:"bad",text:`Eighty-four months. You will pay ${l(o.interest)} in interest. A shorter term costs more a month and a lot less of your life.`}):n.term===60?c.push({tone:"good",text:"Five years, not seven. You refused the long, pretty payment. I respect that."}):c.push({tone:"mid",text:"Six years is the middle chair. Not a crime. Not a victory."});const L=a.warrantyId;let P=4;L==="basic"?P=e.msrp>=6e4?7:8:L==="bumper"?P=6:L==="platinum"?P=e.msrp>=6e4?5:2:L==="none"&&(P=e.msrp>=6e4?3:5),u+=P,L==="platinum"&&e.msrp<5e4?c.push({tone:"bad",text:"Platinum warranty, five thousand, on a car that did not need a concierge. Read the exclusions before you frame the brochure."}):L==="basic"?c.push({tone:"good",text:"Powertrain coverage for two thousand. The expensive organs, not the spa package."}):L==="none"&&c.push({tone:"mid",text:"No extra warranty. Brave if you have cash for a surprise. Reckless if you do not."});let I=22;o.paymentShare<=.1?I=22:o.paymentShare<=.15?I=16:o.paymentShare<=.2?I=7:I=0,u+=I;let z=100;o.weeklyLeft<0?(c.push({tone:"bad",text:`After bills, insurance, and this payment, the week is ${l(o.weeklyLeft)}. Negative. You cannot live in a negative week.`}),z=36):o.paymentShare>.15?c.push({tone:"bad",text:`The payment is ${te(o.paymentShare)} of take-home, past the 15% line, at ${l(o.payment,!0)} a month.`}):o.weeklyLeft<120?(c.push({tone:"mid",text:`About ${l(o.weeklyLeft)} left in the week. You can swing it. You cannot sneeze.`}),z=Math.min(z,74)):c.push({tone:"good",text:`The week still breathes. About ${l(o.weeklyLeft)} left after housing, food, the phone, insurance, and the car.`}),n.downChecking>=7e3&&(c.push({tone:"bad",text:"You drained checking to look like a hero at the desk. The car is pretty. The rent is prettier, because it always shows up."}),u-=8),n.downSavings>0&&(c.push({tone:"bad",text:`You pulled ${l(n.downSavings)} out of savings. That pile was the emergency. A stallion is not an emergency.`}),u-=10);const q=a.lines.filter(F=>F.tag==="joke").reduce((F,tt)=>F+tt.price,0),Q=a.options/e.msrp;q>0?(c.push({tone:"bad",text:`${l(q)} of this build is a bit with a price tag. The bank does not have a sense of humor.`}),u-=Math.min(10,4+q/4e3)):Q>.15?(c.push({tone:"mid",text:`Options added ${l(a.options)}, more than 15% of the car. Some of that you will touch. Some of it you will only see on the statement.`}),u-=5):a.options>0&&a.options<1800&&(c.push({tone:"good",text:`The build stayed modest, ${l(a.options)} in options. You bought a car, not a catalog.`}),u+=3),o.interest>8e3&&c.push({tone:"mid",text:`Interest alone is ${l(o.interest)}. That is another used car sitting on the curb, except you do not get to drive it.`});const re=n.price<=r+250&&n.trade>=4700&&m<=.11&&q===0&&n.downSavings===0&&n.downChecking<=4e3,se=o.paymentShare>.15||o.weeklyLeft<120;re&&se&&(c.unshift({tone:"good",text:`You worked the desk. Price, trade, and rate are clean. A ${e.name} still does not fit a $1,010 week. The smart move is a different car, not a longer marriage to the bank.`}),u=Math.max(u,76),z=Math.max(z,84)),u=Math.max(0,Math.min(z,Math.round(u)));const Z=xe.find(F=>u>=F.min)||xe[xe.length-1],ge=c.filter(F=>F.tone==="good"),be=c.filter(F=>F.tone==="bad"),et=Wt(Z.letter,ge,be,e,o);return{score:u,letter:Z.letter,title:Z.title,notes:c,narrative:et,quote:o,priced:a,earnedApr:i}}function Wt(e,t,n,a,o){var c,u;const i=(c=t[0])==null?void 0:c.text,r=(u=n[0])==null?void 0:u.text,h={"A+":"I am proud of you. You walked in with a beater and you did not leave married to a bad note. Ricky is going to tell his wife the wifi was down. That is how you know.",A:"That is a deal you can say out loud at Sunday dinner. Not perfect. Honest. Take the keys and do not add a single thing in the finance office.",B:"You held your own. He did not rob you, and you did not rob him, which is fine, because robbing him was never the job. Living with the payment is the job.",C:"You survived. Survival is not the same as a good deal. There is money still sitting on his side of the desk, and it answers to your name.",D:"Ricky eats tonight. You will be eating around this payment for years. We can run it again. I am not mad. I am annoyed. There is a difference.",F:"They saw you coming from the parking lot. The week cannot carry this car. I do not care how it looks under the lights. We are not signing this. We are learning it, and then we are doing it over."};return e==="A+"||e==="A"?`${i||`The ${a.name} fits the week.`} ${r||"I do not have a real complaint. Do not make me find one."} ${h[e]}`:e==="F"||e==="D"?`${r||`The payment is ${l(o.payment,!0)}, and the week felt that.`} ${i||"You showed up. That is step one, not the whole walk."} ${h[e]}`:`${i||"There is something in here I can defend."} ${r||"And there is something I would still push."} ${h[e]}`}function qt(e){const t=V(e);return`Here is the whole sermon, short. Knock the ${e.name} toward ${l(t)}, not his opening number. Get the jalopy to at least $4,500. Take the rate your score earned, not the one with his fingerprint on it. Keep the payment under 15% of take-home, and leave the savings alone. Warranty: two thousand if you want to sleep. Not five. Then shake his hand like you mean to leave.`}const Ye=[{id:"credit",label:"Credit"},{id:"lot",label:"Cars"},{id:"studio",label:"Studio"},{id:"negotiate",label:"Desk"},{id:"grade",label:"Deal"}];function ie(){const e=document.getElementById("app"),t=s.screen==="studio"||s.screen==="negotiate";e.classList.toggle("is-lock",t);const n=document.getElementById("hud");n.hidden=s.screen==="intro",s.screen!=="intro"?Ue():document.getElementById("drawer").hidden=!0;const a=document.getElementById("screen"),o={intro:Oe,credit:an,lot:rn,studio:cn,negotiate:hn,grade:un};a.innerHTML=(o[s.screen]||Oe)()}function Ue(){const e=K(),n=s.screen==="negotiate"||s.screen==="grade"?s.deals[s.carId]:null,a=g.checking-((n==null?void 0:n.downChecking)||0),o=g.savings-((n==null?void 0:n.downSavings)||0),i=Ye.findIndex(r=>r.id===s.screen);document.getElementById("hud").innerHTML=`
    <div class="hud-row">
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">Checking</span>
        <span class="v">${l(a)}</span>
      </button>
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">Savings</span>
        <span class="v">${l(o)}</span>
      </button>
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">${e?s.credit.cosign?"With Ma":"Credit":"Pay"}</span>
        <span class="v">${e||"$1,010"}</span>
      </button>
      <button type="button" class="icon-btn ${k.on?"is-on":""}" data-action="audio" aria-label="${k.on?"Mute the violin":"Play the violin"}" aria-pressed="${k.on}">
        ${tn()}
      </button>
    </div>
    <ol class="steps">
      ${Ye.map((r,h)=>`<li class="${h===i?"is-on":h<i?"is-done":""}">${r.label}</li>`).join("")}
    </ol>`,document.getElementById("drawer").innerHTML=nn()}function Zt(){const e=document.querySelector('[data-action="audio"]');e&&(e.classList.toggle("is-on",k.on),e.setAttribute("aria-pressed",String(k.on)),e.setAttribute("aria-label",k.on?"Mute the violin":"Play the violin"))}function Ut(){const e=document.getElementById("drawer");s.moneyOpen=!s.moneyOpen,e.hidden=!s.moneyOpen}function Jt(e){var a;const t=mt[e];if(!t)return;const n=document.getElementById("overlay");n.hidden=!1,n.innerHTML=`
    <div class="sheet-back">
      <div class="scrim" data-action="close-sheet"></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <header class="sheet-head">
          <p class="eyebrow">What is this?</p>
          <h2 id="sheet-title">${f(t.title)}</h2>
          <button type="button" class="icon-btn sheet-x" data-action="close-sheet" aria-label="Close">×</button>
        </header>
        ${ze(t.body)}
      </div>
    </div>`,(a=n.querySelector(".sheet-x"))==null||a.focus()}function Pe(){const e=document.getElementById("overlay");e.hidden=!0,e.innerHTML=""}function Je(){s.moneyOpen=!1;const e=document.getElementById("drawer");e&&(e.hidden=!0)}function D(){const e=S(),t=T(e),n=fe(e,t),a=ae(e,t),o=document.getElementById("hero-art");if(o){const u=Ae(e,t);o.innerHTML=Ie(e.id,Y[s.view].id,u,`hero${s.view}`)}document.querySelectorAll(".swatch").forEach(u=>{const p=u.dataset.paint===t.paint;u.classList.toggle("is-on",p),u.setAttribute("aria-pressed",String(p))}),x("paint-label",a.price?`${a.name} · +${l(a.price)}`:a.name),_t(t),en(),x("dock-price",l(n.total)),x("dock-sub",`${l(n.msrp)} car · ${l(n.options)} options · ${l(n.warranty)} warranty`),x("vinny-tip-text",ye(e,t));const i=document.getElementById("hero");i==null||i.classList.toggle("is-spinning",s.spinning);const r=document.querySelector('[data-action="spin"]');r&&(r.textContent=s.spinning?"Stop":"Spin");const h=document.getElementById("swipe-hint");h&&(h.hidden=s.hintSeen);const c=document.querySelector('[data-action="top"]');c&&(c.textContent=t.topDown?"Raise the top":"Drop the top")}function Kt(){var n;const e=S(),t=document.getElementById("options");t&&(t.innerHTML=Ke(e,T(e))),document.querySelectorAll(".cat").forEach(a=>{a.classList.toggle("is-on",a.dataset.cat===s.category)}),(n=document.getElementById("studio-scroll"))==null||n.scrollTo(0,0),x("vinny-tip-text",ye(e,T(e)))}function Qt(){const e=T(),t=document.querySelector("#hero-art .car");t==null||t.classList.toggle("is-down",e.topDown);const n=document.querySelector('[data-action="top"]');n&&(n.textContent=e.topDown?"Raise the top":"Drop the top"),x("vinny-tip-text",ye(S(),e))}function ee({sliders:e=!1}={}){const t=S(),n=T(t),a=W(t),{quote:o,priced:i}=Re(t,n,a);x("price-readout",l(a.price)),x("trade-readout",l(a.trade)),x("apr-readout",`${a.apr.toFixed(2)}%`),x("check-readout",`${l(a.downChecking)} down · ${l(g.checking-a.downChecking)} left`),x("save-readout",a.downSavings>0?`${l(a.downSavings)} out of the emergency fund`:"Leave it alone"),x("ricky-line",qe(t,a)),x("vinny-desk-text",s.advice||Ze(t,a,o)),x("dock-pay",l(o.payment,!0));const r=me(o.paymentShare),h=o.weeklyLeft;x("dock-sub",`${a.term} mo · ${a.apr.toFixed(2)}% · ${l(h)} left this week`);const c=document.getElementById("dock-pay");c==null||c.classList.remove("zone-ok","zone-warn","zone-bad"),c==null||c.classList.add(`zone-${h<0?"bad":r}`);const u=document.getElementById("pressure");u&&(u.innerHTML=Qe(o));const p=document.getElementById("budget-mount");p&&(p.innerHTML=Xe(o));const b=document.getElementById("sheet-mount");b&&(b.innerHTML=_e(t,a,i,o)),document.querySelectorAll("[data-term]").forEach(m=>{const w=Number(m.dataset.term)===a.term;m.classList.toggle("is-on",w),m.setAttribute("aria-pressed",String(w))}),document.querySelectorAll("[data-warranty]").forEach(m=>{const w=m.dataset.warranty===n.single.warranty;m.classList.toggle("is-on",w),m.setAttribute("aria-pressed",String(w))}),e&&(X("price",a.price),X("trade",a.trade),X("apr",a.apr),X("checking",a.downChecking),X("savings",a.downSavings)),Ue()}function Xt(e){String(e).padStart(3,"0").split("").forEach((n,a)=>{const o=document.getElementById(`d${a}`);o&&(o.textContent=n)})}function X(e,t){const n=document.querySelector(`[data-lever="${e}"]`);n&&(n.value=String(t))}function x(e,t){const n=document.getElementById(e);!n||n.textContent===t||(n.textContent=t,n.classList.remove("pop"),n.offsetWidth,n.classList.add("pop"))}function _t(e){document.querySelectorAll(".opt").forEach(t=>{const n=t.dataset.mode==="single"?e.single[t.dataset.group]===t.dataset.id:(e.multi[t.dataset.group]||[]).includes(t.dataset.id);t.classList.toggle("is-on",n),t.setAttribute("aria-pressed",String(n))})}function en(){document.querySelectorAll(".view-dot").forEach(e=>{e.classList.toggle("is-on",Number(e.dataset.view)===s.view)})}function $(e,t=!1){return t?`<button type="button" class="what mini" data-action="glossary" data-term="${e}" aria-label="What is this?">?</button>`:`<button type="button" class="what" data-action="glossary" data-term="${e}">What is this?</button>`}function ze(e,t="Vinny “Numbers” Caputo"){return`<div class="vinny">
    ${Be()}
    <div class="bubble">
      <span class="who">${t}</span>
      <p>${f(e)}</p>
    </div>
  </div>`}function tn(){return'<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M9 18a3 3 0 1 1-2-2.83V5.7l10-2v8.47A3 3 0 1 1 15 14V6.1l-6 1.2V18z"/></svg>'}function nn(){const e=s.credit.score,t=K(),n=ce(Se);return`<div class="drawer-card">
    <div class="drawer-head">
      <h2>The week you actually have</h2>
      <button type="button" class="icon-btn" data-action="money" aria-label="Close money">×</button>
    </div>
    <p class="lead">Salary ${l(g.salary)} a year. Take-home about <strong>${l(g.weeklyTakeHome)} a week</strong> after a plain tax estimate. ${$("takehome")}</p>
    <p class="fine">That is about ${l(Ne())} a month. The salary is the rumor. The week is the truth.</p>
    <ul class="bills">
      ${Ee.map(a=>`<li><span>${f(a.label)}</span><b>${l(a.amount)}</b></li>`).join("")}
      <li class="total"><span>Locked bills</span><b>${l(Se)} / mo</b></li>
    </ul>
    <p class="fine">About ${l(n)} of every paycheck is already spoken for. The car has to live in what’s left, next to gas, insurance, and a life.</p>
    <ul class="bills">
      <li><span>Checking</span><b>${l(g.checking)}</b></li>
      <li><span>Savings</span><b>${l(g.savings)}</b></li>
      ${e?`<li><span>Credit ${$("credit")}</span><b>${e}${s.credit.cosign?` → ${t} with Ma`:""}</b></li>`:""}
    </ul>
    <p class="fine">Savings is the emergency fund. Vinny gets loud if you spend it on a spoiler.</p>
  </div>`}function Oe(){const e=s.lastGrade;return`<section class="intro">
    <div class="sky">
      <p class="eyebrow">Route 17 · after the rain</p>
      <div class="neon" aria-hidden="true"><span>Dream</span> <span>Car</span></div>
    </div>
    <div class="stage">
      <div class="asphalt"></div>
      <div class="jalopy-drive">${yt()}</div>
      <div class="hangtag"><span>Your trade</span><strong>${l(le.trade)}</strong><em>${le.year} ${f(le.name)}</em></div>
    </div>
    <div class="intro-copy">
      <h1>Let's go car shopping!</h1>
      <p>${f(le.line)} Checking ${l(g.checking)}. Savings ${l(g.savings)}. A ${l(g.salary)} salary that shows up as about ${l(g.weeklyTakeHome)} a week.</p>
      ${e?`<p class="last-deal">Last time Vinny called it a ${f(e.letter)} on the ${f(e.car)}.</p>`:""}
      <button type="button" class="btn primary xl" data-action="start">Step onto the lot</button>
      <button type="button" class="btn text" data-action="audio">${k.on?"Violin’s on":"A little violin, if you want it"}</button>
    </div>
  </section>`}function an(){const{score:e,cosign:t,boost:n,rolling:a}=s.credit,o=K(),i=t?o:e,r=e?We(o):null,h=e?O(o):null;return`<section class="credit">
    <p class="eyebrow">Before the shiny things</p>
    <h1>${e?r.label:"Roll your credit."}</h1>
    <div class="odo ${a?"is-rolling":""}" aria-hidden="true">
      <span id="d0">${i?String(i)[0]:"–"}</span>
      <span id="d1">${i?String(i)[1]:"–"}</span>
      <span id="d2">${i?String(i)[2]:"–"}</span>
    </div>
    ${e&&t?`<p class="cosign-note">Your roll was ${e}. With Ma, the bank sees <strong>${o}</strong>.</p>`:""}
    <div class="what-row">${$("credit")}</div>
    ${ze(e?t?Nt(n,o,e):Ht(e):Gt())}
    ${e?`<p class="rate-preview">Money like yours starts near <strong>${h.toFixed(2)}% APR</strong> before anybody marks it up. ${$("apr")}</p>`:'<p class="fine center">The reel is weighted like life. Most people land in the 700s. A 675 and an 820 are both rare.</p>'}
    ${e?on():""}
    <div class="stack">
      ${e?"":`<button type="button" class="btn primary xl" data-action="roll" ${a?"disabled":""}>Roll the dice</button>`}
      <button type="button" class="btn ${e?"primary xl":"ghost"}" data-action="to-lot" ${e?"":"disabled"}>See the cars</button>
    </div>
  </section>`}function on(){if(s.credit.cosign)return`<article class="card cosign done">
      <h2>Ma’s on the note.</h2>
      <p>The rate moves. So does the family obligation. ${$("cosigner")}</p>
    </article>`;const e=s.credit.score<720;return`<article class="card cosign ${e?"hot":""}">
    <h2>${e?"The rate is going to bite.":"You can leave Ma out of this."}</h2>
    <p>${e?"Ask her to co-sign and the bank will pretend you are 50 to 75 points prettier. She is on the hook if you are not.":"A co-signer helps a thin score. Yours is not thin. Asking anyway puts her name on a car she does not drive."}</p>
    <button type="button" class="btn ${e?"primary":"ghost"}" data-action="cosign">Ask Mom to co-sign</button>
    <div class="what-row">${$("cosigner")}</div>
  </article>`}function rn(){const e=K(),t=s.credit.score<720&&!s.credit.cosign;return`<section class="lot">
    <header class="lot-head">
      <p class="eyebrow">Falco Motors · the row</p>
      <h1>Four cars. One paycheck.</h1>
      <p>Don’t fall in love before the number. Credit the bank will use: <strong>${e}</strong>.</p>
      ${t?'<button type="button" class="btn tiny" data-action="back-credit">Still time to ask Ma</button>':""}
    </header>
    <div class="lot-scroller" id="lot-scroller">
      ${ue.map(n=>sn(n)).join("")}
    </div>
    <div class="lot-nav">
      <button type="button" class="icon-btn" data-action="lot-prev" aria-label="Previous car">‹</button>
      <div class="lot-dots" id="lot-dots">
        ${ue.map((n,a)=>`<span class="lot-dot ${a===0?"is-on":""}" data-dot="${n.id}"></span>`).join("")}
      </div>
      <button type="button" class="icon-btn" data-action="lot-next" aria-label="Next car">›</button>
    </div>
  </section>`}function sn(e){const t=s.builds[e.id]||{paint:e.colors[0].id,topDown:!1,single:{wheels:"stock",roof:"none",tint:"none",top:"black",liner:"none",cover:"none",stance:"stock"},multi:{}},n=Ae(e,ln(t));return`<article class="lot-slide">
    <div class="lot-art">${Ie(e.id,"side",n,`lot${e.id}`)}</div>
    <p class="eyebrow">${f(e.maker)} · ${f(e.vibe)}</p>
    <h2>${f(e.name)}</h2>
    <p class="msrp">${l(e.msrp)} <span>MSRP</span> ${$("msrp")}</p>
    <p class="lot-line">${f(e.line)}</p>
    <p class="insure">Vinny’s insurance guess: ${l(e.insurance)}/mo. ${$("insurance")}</p>
    <button type="button" class="btn primary" data-action="pick" data-car="${e.id}">Build this one</button>
  </article>`}function ln(e){return{paint:e.paint,topDown:!!e.topDown,single:{wheels:"stock",roof:"none",tint:"none",top:"black",liner:"none",cover:"none",stance:"stock",...e.single},multi:{sport:[],truckt:[],breezepack:[],...e.multi}}}function cn(){const e=S(),t=T(e),n=fe(e,t),a=ae(e,t),o=Ae(e,t);return`<section class="studio">
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
        <div class="hero-art" id="hero-art">${Ie(e.id,Y[s.view].id,o,"hero0")}</div>
        <div class="hero-tools">
          <button type="button" class="btn tiny" data-action="spin">Spin</button>
          ${e.id==="breeze"?`<button type="button" class="btn tiny" data-action="top">${t.topDown?"Raise the top":"Drop the top"}</button>`:""}
        </div>
        <p class="swipe-hint" id="swipe-hint" ${s.hintSeen?"hidden":""}>Swipe to turn it</p>
      </div>
      <div class="swatches" role="listbox" aria-label="Paint">
        ${e.colors.map(i=>`<button type="button" class="swatch ${t.paint===i.id?"is-on":""}" style="--c:${i.hex}" data-action="paint" data-paint="${i.id}" role="option" aria-label="${f(i.name)}" aria-pressed="${t.paint===i.id}"></button>`).join("")}
      </div>
      <p class="paint-label" id="paint-label">${f(a.name)}${a.price?` · +${l(a.price)}`:""}</p>
      <div class="view-dots">
        ${Y.map((i,r)=>`<button type="button" class="view-dot ${r===s.view?"is-on":""}" data-action="view" data-view="${r}" aria-label="${i.label}"></button>`).join("")}
      </div>
      <div class="cats">
        ${dt.filter(i=>ne(e.id,i.id).length).map(i=>`<button type="button" class="cat ${s.category===i.id?"is-on":""}" data-action="cat" data-cat="${i.id}">${f(i.label)}</button>`).join("")}
      </div>
    </div>
    <div class="studio-scroll" id="studio-scroll">
      <div id="options">${Ke(e,t)}</div>
      <div class="vinny studio-vinny">
        ${Be()}
        <div class="bubble">
          <span class="who">Vinny, in your ear</span>
          <p id="vinny-tip-text">${f(ye(e,t))}</p>
        </div>
      </div>
    </div>
    <div class="dock">
      <div>
        <span class="k">Build price</span>
        <strong id="dock-price">${l(n.total)}</strong>
        <small id="dock-sub">${l(n.msrp)} car · ${l(n.options)} options · ${l(n.warranty)} warranty</small>
      </div>
      <button type="button" class="btn primary" data-action="to-desk">See Ricky</button>
    </div>
  </section>`}function Ke(e,t){const n=ne(e.id,s.category);return n.length?n.map(a=>`
    <section class="group">
      <h3>${f(a.label)}</h3>
      <div class="opts">
        ${a.options.map(o=>dn(a,o,t)).join("")}
      </div>
    </section>`).join(""):`<p class="empty">Nothing in this rack for the ${f(e.name)}.</p>`}function dn(e,t,n){const a=e.mode==="single"?n.single[e.id]===t.id:(n.multi[e.id]||[]).includes(t.id),o=t.price===0?"Included":`+${l(t.price)}`;return`<button type="button" class="opt ${a?"is-on":""}" data-action="opt" data-group="${e.id}" data-id="${t.id}" data-mode="${e.mode}" aria-pressed="${a}">
    <span class="opt-mark" aria-hidden="true"></span>
    <span class="opt-copy">
      <span class="opt-name">${f(t.name)}</span>
      <span class="opt-blurb">${f(t.blurb)}</span>
    </span>
    <span class="opt-price">${o}</span>
  </button>`}function hn(){const e=S(),t=T(e),n=W(e),{quote:a,priced:o}=Re(e,t,n),i=V(e),r=H(e),h=O(n.effectiveScore),c=pe(h),u=ne(e.id).find(p=>p.id==="warranty");return`<section class="desk">
    <div class="desk-scroll">
      <div class="ricky">
        ${Dt()}
        <div>
          <span class="who">Ricky Falco · Falco Motors</span>
          <p id="ricky-line">${f(qe(e,n))}</p>
        </div>
      </div>
      <p class="desk-car">${f(e.name)} · build ${l(o.total)} before tax</p>
      <div id="pressure">${Qe(a)}</div>
      <div id="budget-mount">${Xe(a)}</div>

      ${_({label:"Car price",term:"msrp",readoutId:"price-readout",readout:l(n.price),name:"price",min:i,max:r,step:50,value:n.price,left:`Strong ${l(i)}`,right:`His open ${l(r)}`,nudge:"Knock it down"})}
      ${_({label:"Trade for the jalopy",term:"trade",readoutId:"trade-readout",readout:l(n.trade),name:"trade",min:A.min,max:A.max,step:100,value:n.trade,left:`Lowball ${l(A.min)}`,right:`Heroic ${l(A.max)}`,nudge:"Make him pay",note:`Fair lives around ${l(A.baseline)}. He opened at ${l(A.open)}.`})}
      ${_({label:"APR",term:"apr",readoutId:"apr-readout",readout:`${n.apr.toFixed(2)}%`,name:"apr",min:h,max:c,step:.01,value:n.apr,left:`You earned ${h.toFixed(2)}%`,right:`His quote ${c.toFixed(2)}%`,nudge:"Take your rate",note:h===c?"You are already at the top of the 6–8% band. That is the score talking.":"The gap between these two numbers is the quiet tip."})}

      <div class="lever">
        <div class="lever-top">
          <span>Term ${$("term")}</span>
        </div>
        <div class="seg">
          ${[60,72,84].map(p=>`<button type="button" class="${n.term===p?"is-on":""}" data-action="term" data-term="${p}" aria-pressed="${n.term===p}">${p/12} yr<span>${p} mo</span></button>`).join("")}
        </div>
        <p class="fine">Shorter costs more each month and less interest in total. ${$("amortization")}</p>
      </div>

      <div class="lever">
        <div class="lever-top">
          <span>Warranty ${$("warranty")}</span>
        </div>
        <div class="seg wrap">
          ${u.options.map(p=>`<button type="button" class="${t.single.warranty===p.id?"is-on":""}" data-action="warranty" data-warranty="${p.id}" aria-pressed="${t.single.warranty===p.id}">${f(p.name.replace(", "," · "))}<span>${p.price?l(p.price):"Included"}</span></button>`).join("")}
        </div>
      </div>

      ${_({label:"Down from checking",term:"down",readoutId:"check-readout",readout:`${l(n.downChecking)} down · ${l(g.checking-n.downChecking)} left`,name:"checking",min:0,max:g.checking,step:500,value:n.downChecking,left:"$0",right:l(g.checking),nudge:""})}
      ${_({label:"Dip into savings",term:"down",readoutId:"save-readout",readout:n.downSavings>0?`${l(n.downSavings)} out of the emergency fund`:"Leave it alone",name:"savings",min:0,max:g.savings,step:500,value:n.downSavings,left:"Untouched",right:l(g.savings),nudge:"",warn:!0})}

      <div id="sheet-mount">${_e(e,n,o,a)}</div>
      <div class="vinny">
        ${Be()}
        <div class="bubble">
          <span class="who">Vinny “Numbers” Caputo</span>
          <p id="vinny-desk-text">${f(s.advice||Ze(e,n,a))}</p>
        </div>
      </div>
      <button type="button" class="btn ghost wide" data-action="ask">Ask Vinny what he’d do</button>
      <button type="button" class="btn text" data-action="back-studio">Back to the studio</button>
    </div>
    <div class="dock">
      <div>
        <span class="k">Monthly ${$("payment")}</span>
        <strong id="dock-pay" class="zone-${a.weeklyLeft<0?"bad":me(a.paymentShare)}">${l(a.payment,!0)}</strong>
        <small id="dock-sub">${n.term} mo · ${n.apr.toFixed(2)}% · ${l(a.weeklyLeft)} left this week</small>
      </div>
      <button type="button" class="btn primary" data-action="shake">Shake on it</button>
    </div>
  </section>`}function _(e){return`<div class="lever ${e.warn?"warn":""}">
    <div class="lever-top">
      <span>${e.label} ${$(e.term)}</span>
      <strong id="${e.readoutId}">${e.readout}</strong>
    </div>
    <input type="range" data-lever="${e.name}" min="${e.min}" max="${e.max}" step="${e.step}" value="${e.value}" aria-label="${f(e.label)}">
    <div class="lever-scale"><span>${e.left}</span><span>${e.right}</span></div>
    ${e.note?`<p class="fine">${e.note}</p>`:""}
    ${e.nudge?`<button type="button" class="btn tiny" data-action="nudge" data-nudge="${e.name}">${e.nudge}</button>`:""}
  </div>`}function Qe(e){return e.weeklyLeft<0?'<p class="banner bad">This wrecks the week. Vinny will not clap.</p>':e.paymentShare>.15?'<p class="banner warn">Over the 15% line. Pretty payment, heavy life.</p>':'<p class="banner ok">Under the line. The week still has air in it.</p>'}function Xe(e){const t=e.weeklyLeft<0?"bad":me(e.paymentShare),n=.4,a=Math.max(0,Math.min(100,e.paymentShare/n*100)),o=.15/n*100;return`<div class="budget">
    <div class="budget-top">
      <span>Payment vs take-home</span>
      <strong class="zone-${t}">${te(e.paymentShare)} of ${l(e.monthlyTake)}/mo</strong>
    </div>
    <div class="meter" data-zone="${t}" style="--p:${a.toFixed(1)}%; --mark:${o}%"><span></span></div>
    <p class="fine">White mark is 15% of take-home. Stay left of it. Insurance is not inside that mark — it is in the week, below.</p>
    <ul class="week">
      <li><span>This week’s pay</span><b>${l(g.weeklyTakeHome)}</b></li>
      <li><span>Bills, already locked</span><b>−${l(e.weeklyBills)}</b></li>
      <li><span>Insurance, estimated</span><b>−${l(e.weeklyIns)}</b></li>
      <li><span>This car, per week</span><b>−${l(e.weeklyPay)}</b></li>
      <li class="left zone-${e.weeklyLeft<80?"bad":e.weeklyLeft<160?"warn":"ok"}"><span>Left for everything else</span><b>${l(e.weeklyLeft)}</b></li>
    </ul>
  </div>`}function _e(e,t,n,a){const o=n.lines.filter(r=>r.price>0),i=[["MSRP",l(e.msrp),"msrp"],["Your price",l(t.price),"msrp"],["Options",l(n.options),null],["Warranty",l(n.warranty),"warranty"],["Doc fee",l(a.doc),"docfee"],["Title & plates",l(a.title),null],["Sales tax",G(a.tax),"tax"],["Trade equity",`−${l(a.trade)}`,"trade"],["Out the door",G(a.otd),"otd"],["Down payment",`−${l(a.down)}`,"down"],["Amount financed",G(a.financed),"financed",!0],["Interest, whole term",G(a.interest),"interest"]];return`<section class="sheet-card">
    <header>
      <h3>The real sheet</h3>
      ${$("otd")}
    </header>
    <p class="fine">Tax here is ${te(.06625,3)} of the price plus warranty, after the trade comes off. ${$("negative")}</p>
    <ul class="rows">
      ${i.map(([r,h,c,u])=>`<li class="${u?"strong":""}"><span>${f(r)}${c?` ${$(c,!0)}`:""}</span><b>${h}</b></li>`).join("")}
    </ul>
    ${o.length?`<details>
      <summary>${o.length} priced ${o.length===1?"choice":"choices"}</summary>
      <ul class="rows slim">
        ${o.map(r=>`<li><span>${f(r.name)}</span><b>${l(r.price)}</b></li>`).join("")}
      </ul>
    </details>`:'<p class="fine">No priced options. Bone stock is a position.</p>'}
    <p class="fine">Insurance estimate ${l(Ge(e,T(e)))}/mo is in the week, not in the loan. ${$("principal")}</p>
  </section>`}function un(){const e=s.grade,t=S();if(!e)return'<section class="grade"><p>No deal on the table.</p><button type="button" class="btn primary" data-action="another">Back to the lot</button></section>';const n=e.quote,a=e.score<80,o=e.letter.startsWith("A")||e.letter==="B"?"good":e.letter==="C"?"mid":"bad";return`<section class="grade">
    <p class="eyebrow">${f(t.name)} · Falco Motors</p>
    <div class="letter tone-${o}">${f(e.letter)}</div>
    <h1>${f(e.title)}</h1>
    <p class="score-num">${e.score} out of 100</p>
    ${ze(e.narrative)}
    <ul class="recap">
      <li><span>Payment</span><b>${l(n.payment,!0)}/mo</b></li>
      <li><span>Out the door</span><b>${G(n.otd)}</b></li>
      <li><span>Financed</span><b>${G(n.financed)}</b></li>
      <li><span>Interest</span><b>${G(n.interest)}</b></li>
      <li><span>Term</span><b>${n.term} mo @ ${n.apr.toFixed(2)}%</b></li>
      <li><span>Left this week</span><b class="zone-${n.weeklyLeft<80?"bad":"ok"}">${l(n.weeklyLeft)}</b></li>
    </ul>
    <ul class="notes">
      ${e.notes.map(i=>`<li class="${i.tone}">${f(i.text)}</li>`).join("")}
    </ul>
    <div class="stack">
      <button type="button" class="btn ${a?"primary":"ghost"}" data-action="tweak">Tweak this deal</button>
      <button type="button" class="btn ${a?"ghost":"primary"}" data-action="another">Shop another car</button>
      <button type="button" class="btn text" data-action="restart">Start over</button>
    </div>
  </section>`}function pn(){return qt(S())}let de=null,he=null;function N(){s.spinning=!1,de&&(clearInterval(de),de=null)}function M(e){s.screen==="studio"&&e!=="studio"&&N(),s.screen=e,s.advice=e==="negotiate"?s.advice:"",Pe(),Je(),e==="negotiate"&&W(),ie();const t=document.getElementById("screen");t&&(t.scrollTop=0),e==="lot"&&Tn()}async function fn(){try{k.on?k.stop():await k.start()}catch{k.stop()}s.soundPref=k.on?"on":"off",s.screen==="intro"?ie():Zt()}async function mn(){if(s.soundPref!=="off")try{await k.start()}catch{}M("credit")}function yn(){var r;if(s.credit.score||s.credit.rolling)return;s.credit.rolling=!0;const e=Et(),t=window.matchMedia("(prefers-reduced-motion: reduce)").matches,n=document.querySelector('[data-action="roll"]');n&&(n.disabled=!0),(r=document.querySelector(".odo"))==null||r.classList.add("is-rolling");const a=performance.now(),o=t?0:1650,i=h=>{(o===0?1:(h-a)/o)<1?(Xt(675+Math.floor(Math.random()*146)),k.on&&Math.random()<.4&&k.tick(),requestAnimationFrame(i)):(s.credit.score=e,s.credit.rolling=!1,k.on&&k.land(),ie())};requestAnimationFrame(i)}function gn(){!s.credit.score||s.credit.cosign||(s.credit.cosign=!0,s.credit.boost=50+Math.floor(Math.random()*26),s.deals={},ie())}function bn(e){s.carId=e,s.category="sound",s.view=0,s.hintSeen=!1,N(),T(),M("studio")}function wn(){if(s.spinning){N(),D();return}s.spinning=!0,s.hintSeen=!0,D(),de=setInterval(()=>{s.view=(s.view+1)%Y.length,D()},980)}function kn(e){const t=S(),n=W(t);if(e==="price"&&(n.price=R(n.price-500,V(t),H(t))),e==="trade"&&(n.trade=R(n.trade+200,A.min,A.max)),e==="apr"){const a=O(K()||n.effectiveScore);n.apr=R(Math.round((n.apr-.1)*100)/100,a,pe(a))}s.advice="",ee({sliders:!0})}function $n(e){const t=W(),n=Number(e.value),a=e.dataset.lever;a==="price"&&(t.price=n),a==="trade"&&(t.trade=n),a==="apr"&&(t.apr=n),a==="checking"&&(t.downChecking=n),a==="savings"&&(t.downSavings=n),s.advice="",ee()}function vn(e){const t=T(),{group:n,id:a,mode:o}=e.dataset;if(o==="single")t.single[n]=a;else{const i=t.multi[n]||[],r=i.indexOf(a);r>=0?i.splice(r,1):i.push(a),t.multi[n]=i}D()}function xn(){const e=S(),t=Vt(e,T(e),W(e));s.grade=t,jt(t,e),M("grade")}function Tn(){const e=document.getElementById("lot-scroller");!e||e.dataset.bound||(e.dataset.bound="1",e.addEventListener("scroll",()=>{const t=Math.round(e.scrollLeft/Math.max(1,e.clientWidth));document.querySelectorAll(".lot-dot").forEach((n,a)=>n.classList.toggle("is-on",a===t))},{passive:!0}))}function Me(e){const t=document.getElementById("lot-scroller");t&&t.scrollBy({left:e*t.clientWidth,behavior:"smooth"})}function Ln(e){const t=e.target.closest("[data-action]");if(!t||t.disabled)return;const n=t.dataset.action;if(n==="glossary"){e.preventDefault(),Jt(t.dataset.term);return}const a={"close-sheet":()=>Pe(),money:()=>Ut(),audio:()=>fn(),start:()=>mn(),roll:()=>yn(),cosign:()=>gn(),"to-lot":()=>{s.credit.score&&M("lot")},"back-credit":()=>M("credit"),pick:()=>bn(t.dataset.car),"lot-prev":()=>Me(-1),"lot-next":()=>Me(1),"back-lot":()=>M("lot"),cat:()=>{s.category=t.dataset.cat,Kt()},opt:()=>vn(t),paint:()=>{T().paint=t.dataset.paint,D()},view:()=>{N(),s.hintSeen=!0,s.view=Number(t.dataset.view),D()},spin:()=>wn(),top:()=>{const o=T();o.topDown=!o.topDown,Qt()},"to-desk":()=>M("negotiate"),"back-studio":()=>M("studio"),nudge:()=>kn(t.dataset.nudge),term:()=>{W().term=Number(t.dataset.term),s.advice="",ee()},warranty:()=>{T().single.warranty=t.dataset.warranty,s.advice="",ee()},ask:()=>{s.advice=pn(),ee()},shake:()=>xn(),tweak:()=>M("negotiate"),another:()=>{s.grade=null,M("lot")},restart:()=>{N();const o=s.lastGrade;Yt(),s.lastGrade=o,M("intro")}};a[n]&&a[n]()}function Sn(e){if(e.key==="Escape"){Pe(),Je();return}s.screen==="studio"&&(e.key==="ArrowRight"||e.key==="ArrowLeft")&&(N(),s.hintSeen=!0,s.view=(s.view+(e.key==="ArrowRight"?1:-1)+Y.length)%Y.length,D()),s.screen==="lot"&&(e.key==="ArrowRight"||e.key==="ArrowLeft")&&Me(e.key==="ArrowRight"?1:-1)}function Mn(e){e.target.closest("#hero")&&(he=e.clientX)}function An(e){if(he==null)return;const t=e.clientX-he;he=null,!(s.screen!=="studio"||Math.abs(t)<36)&&(N(),s.hintSeen=!0,s.view=(s.view+(t<0?1:-1)+Y.length)%Y.length,D())}document.addEventListener("click",Ln);document.addEventListener("input",e=>{const t=e.target.closest("[data-lever]");!t||s.screen!=="negotiate"||$n(t)});document.addEventListener("keydown",Sn);document.addEventListener("pointerdown",Mn);document.addEventListener("pointerup",An);Ot();ie();
