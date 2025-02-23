(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const R=void 0,J="https://api.the-odds-api.com/v4",Q="soccer",Z="eu",ee=7,P={"champions-league":"Champions League","europa-league":"Europa League","conference-league":"Conference League",superliga:"Superliga","premier-league":"Premier League","la-liga":"La Liga",bundesliga:"Bundesliga","serie-a":"Serie A","ligue-1":"Ligue 1",eredivisie:"Eredivisie"},te={"Nordic Bet":"NordicBet",Betsson:"Betsson",sport888:"888sport",unibet_eu:"Unibet",tipico_de:"Tipwin",williamhill:"William Hill",marathonbet:"Marathon Bet",betfair_ex_eu:"Betfair",coolbet:"Coolbet",onexbet:"1xBet",betvictor:"Bet Victor",pinnacle:"Pinnacle",matchbook:"Matchbook",nordicbet:"NordicBet",betclic:"Betclic",suprabets:"Suprabets"};{const n="VITE_ODDS_API_KEY er ikke konfigureret i .env filen";throw console.error(n),new Error(n)}async function q(n={}){try{const{daysFromNow:o=ee,league:t}=n;console.log("Henter fodboldkampe fra EU regionen..."),console.log("Søgekriterier:",{daysFromNow:o,league:t}),console.log("API nøgle status:",R?"Konfigureret":"Mangler");const a=new URL(`${J}/sports/${Q}/odds`);if(a.searchParams.append("apiKey",R),a.searchParams.append("regions",Z),a.searchParams.append("markets","h2h"),a.searchParams.append("dateFormat","iso"),a.searchParams.append("oddsFormat","decimal"),o>0){const r=new Date;r.setDate(r.getDate()+o),a.searchParams.append("commenceTimeTo",r.toISOString())}console.log("Request URL:",a.toString().replace(R,"XXXXX"));const e=await fetch(a.toString(),{method:"GET",headers:{Accept:"application/json"}});if(!e.ok){const r=await e.text();throw console.error("API Fejl:",{status:e.status,statusText:e.statusText,errorText:r}),new Error(`API Fejl: ${e.status} - ${r||e.statusText}`)}let s=await e.json();if(console.log("Modtaget kampe:",s.length),!Array.isArray(s))throw console.error("Uventet API svar format:",s),new Error("Uventet API svar - forventede en liste af kampe");if(t){const r=P[t].toLowerCase();s=s.filter(f=>f.sport_title.toLowerCase().includes(r)),console.log(`Filtreret til ${s.length} kampe for ${P[t]}`)}return s.sort((r,f)=>new Date(r.commence_time).getTime()-new Date(f.commence_time).getTime())}catch(o){throw console.error("Detaljeret fejl ved hentning af kampe:",o),o instanceof Error?new Error(`Der kunne ikke hentes kampe: ${o.message}`):new Error("Der kunne ikke hentes kampe. Kontroller din internetforbindelse og prøv igen.")}}function ne(n,o){if(!n||!n.bookmakers||!Array.isArray(n.bookmakers))throw console.error("Ugyldigt match objekt modtaget:",n),new Error("Kunne ikke finde odds for den valgte kamp");if(n.bookmakers.length===0)throw console.warn("Ingen bookmaker odds fundet for kampen"),new Error("Der er ingen odds tilgængelige for denne kamp endnu");console.log("Konverterer odds for kamp:",{homeTeam:n.home_team,awayTeam:n.away_team,bookmakers:n.bookmakers.length});const t=n.bookmakers.map(a=>{var c,y,p;if(!a||!a.markets||!Array.isArray(a.markets))return console.warn("Ugyldig bookmaker data:",a),null;const e=a.markets[0];if(!e||!e.outcomes||!Array.isArray(e.outcomes))return console.warn("Ingen gyldige markeder fundet for bookmaker:",a.title),null;const s=te[a.title]||a.title,r=o.find(m=>m.name.toLowerCase()===s.toLowerCase());if(!r)return console.warn("Bookmaker ikke fundet i vores system:",a.title,"(mapped to:",s,")"),null;const f=((c=e.outcomes.find(m=>m.name===n.home_team))==null?void 0:c.price)||0,u=((y=e.outcomes.find(m=>m.name===n.away_team))==null?void 0:y.price)||0,d=((p=e.outcomes.find(m=>m.name==="Draw"))==null?void 0:p.price)||0;return!f||!u||!d?(console.warn("Manglende odds for bookmaker:",{bookmaker:a.title,homeOdds:f,drawOdds:d,awayOdds:u}),null):{name:r.name,team1:f,draw:d,team2:u,fixedStake:r.fixedStake,actualCost:r.actualCost,minOdds:r.minOdds,preferLoss:r.preferLoss,avoidWin:r.avoidWin,isActive:r.isActive}}).filter(Boolean);if(t.length===0)throw new Error("Ingen brugbare odds fundet for denne kamp");return console.log("Konverterede odds:",t),t}let W=null,G=[];function X(n){W=n}function A(){const n=G.find(o=>o.id===W);if(!n)throw new Error("Ingen aktiv kunde fundet");return n}function N(n){return n.toLowerCase().replace(/\s+/g,"-")}function se(n){G=n}function ae(n){var e;const o=n.target;if(!((e=o.files)!=null&&e.length))return;const t=o.files[0],a=new FileReader;a.onload=s=>{var m;const r=(m=s.target)==null?void 0:m.result;if(!r)return;const f=r.split(`
`).map(w=>w.trim()).filter(Boolean);if(f.length<2){alert("CSV filen er tom eller har ikke nok rækker");return}const u=f[0].split(";");if(u.length!==4||!u.includes("Bookmaker")||!u.includes("Hold 1")||!u.includes("Uafgjort")||!u.includes("Hold 2")){alert("CSV filen har ikke de korrekte kolonner. Brug venligst skabelonen.");return}const d=u.indexOf("Bookmaker"),c=u.indexOf("Hold 1"),y=u.indexOf("Uafgjort"),p=u.indexOf("Hold 2");for(let w=1;w<f.length;w++){const I=f[w].split(";");if(I.length!==4)continue;const S=I[d].trim(),i=parseFloat(I[c].replace(",",".")),l=parseFloat(I[y].replace(",",".")),v=parseFloat(I[p].replace(",",".")),h=S.replace(/[^a-zA-Z0-9]/g,"").toLowerCase(),g=document.getElementById(`${h}-team1`),E=document.getElementById(`${h}-draw`),$=document.getElementById(`${h}-team2`);g&&!isNaN(i)&&(g.value=i.toString()),E&&!isNaN(l)&&(E.value=l.toString()),$&&!isNaN(v)&&($.value=v.toString()),[g,E,$].forEach(T=>{T&&T.dispatchEvent(new Event("input",{bubbles:!0}))})}},a.readAsText(t)}const Y=[{name:"Unibet",fixedStake:2e3,hasBonus:!0,actualCost:1e3,minOdds:1.4,isActive:!0,bonusType:"matchingBonus",bonusAmount:1e3,bonusMinOdds:1.4,qualifyingBetAmount:1e3,usedInBet1:!0},{name:"Bet365",fixedStake:1e3,hasBonus:!1,actualCost:1e3,minOdds:1.2,isActive:!0,bonusType:"freebet",bonusAmount:1e3,bonusMinOdds:1.2,qualifyingBetAmount:1e3,usedInBet1:!0},{name:"LeoVegas",fixedStake:500,hasBonus:!1,actualCost:500,minOdds:1.8,isActive:!0,bonusType:"freebet",bonusAmount:500,bonusMinOdds:1.8,qualifyingBetAmount:500,usedInBet1:!0},{name:"ComeOn",fixedStake:2e3,hasBonus:!0,actualCost:1e3,minOdds:1.8,preferLoss:!0,isActive:!0,bonusType:"matchingBonus",bonusAmount:1e3,bonusMinOdds:1.8,qualifyingBetAmount:1e3,usedInBet1:!0},{name:"NordicBet",fixedStake:500,hasBonus:!1,actualCost:500,minOdds:1.8,isActive:!0,bonusType:"freebet",bonusAmount:500,bonusMinOdds:1.8,qualifyingBetAmount:500,usedInBet1:!0},{name:"888sport",fixedStake:600,hasBonus:!0,actualCost:500,minOdds:1.8,isActive:!0,bonusType:"freebet",bonusAmount:500,bonusMinOdds:1.8,qualifyingBetAmount:500,usedInBet1:!0},{name:"Bet25",fixedStake:250,hasBonus:!1,actualCost:250,minOdds:1.5,isActive:!0,bonusType:"freebet",bonusAmount:250,bonusMinOdds:1.5,qualifyingBetAmount:250,usedInBet1:!0},{name:"Expekt",fixedStake:600,hasBonus:!1,actualCost:600,minOdds:1.8,isActive:!0,bonusType:"freebet",bonusAmount:600,bonusMinOdds:1.8,qualifyingBetAmount:600,usedInBet1:!0},{name:"Cashpoint",fixedStake:500,hasBonus:!1,actualCost:500,minOdds:1.8,isActive:!0,bonusType:"freebet",bonusAmount:500,bonusMinOdds:1.8,qualifyingBetAmount:500,usedInBet1:!0},{name:"Jackpotbet",fixedStake:2e3,hasBonus:!0,actualCost:1e3,minOdds:1.5,isActive:!0,bonusType:"matchingBonus",bonusAmount:1e3,bonusMinOdds:1.5,qualifyingBetAmount:1e3,usedInBet1:!0},{name:"Tipwin",fixedStake:1600,hasBonus:!0,actualCost:800,minOdds:1.5,avoidWin:!0,isActive:!0,bonusType:"matchingBonus",bonusAmount:800,bonusMinOdds:1.5,qualifyingBetAmount:800,usedInBet1:!0},{name:"Betano",fixedStake:2e3,hasBonus:!0,actualCost:1e3,minOdds:1.8,isActive:!0,bonusType:"matchingBonus",bonusAmount:1e3,bonusMinOdds:1.8,qualifyingBetAmount:1e3,usedInBet1:!0},{name:"Mrgreen",fixedStake:400,hasBonus:!0,actualCost:300,minOdds:2,isActive:!0,bonusType:"freebet",bonusAmount:300,bonusMinOdds:2,qualifyingBetAmount:300,usedInBet1:!0},{name:"Mrplay",fixedStake:2e3,hasBonus:!0,actualCost:1e3,minOdds:2,isActive:!0,bonusType:"matchingBonus",bonusAmount:1e3,bonusMinOdds:2,qualifyingBetAmount:1e3,usedInBet1:!0}];let C=[],z=null,j="qualifying";window.handleFileUpload=ae;function V(){console.log("Tilføjer ny kunde...");const n=document.getElementById("customerSelector");if(!n){console.error("Kunne ikke finde customerSelector element");return}n.innerHTML=`
        <div class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-bold mb-4">Ny Beregning</h2>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Kundenavn</label>
                    <input type="text" id="customerNameInput" class="input-field w-full" placeholder="Indtast kundens navn">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Hold 1</label>
                        <input type="text" id="team1NameInput" class="input-field w-full" placeholder="Indtast navn på hold 1">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Hold 2</label>
                        <input type="text" id="team2NameInput" class="input-field w-full" placeholder="Indtast navn på hold 2">
                    </div>
                </div>
                <div class="flex justify-end gap-3 mt-4">
                    <button id="cancelButton" class="btn-secondary">
                        Annuller
                    </button>
                    <button id="continueButton" class="btn-primary">
                        Fortsæt til odds
                    </button>
                </div>
            </div>
        </div>
    `;const o=document.getElementById("cancelButton"),t=document.getElementById("continueButton");o&&o.addEventListener("click",()=>{H()}),t&&t.addEventListener("click",()=>{var f,u,d;const a=(f=document.getElementById("customerNameInput"))==null?void 0:f.value,e=(u=document.getElementById("team1NameInput"))==null?void 0:u.value,s=(d=document.getElementById("team2NameInput"))==null?void 0:d.value;if(!a){alert("Du skal indtaste et kundenavn for at fortsætte");return}if(!e||!s){alert("Du skal indtaste navne på begge hold for at fortsætte");return}console.log("Opretter ny kunde:",a);const r={id:N(a),name:a,bookmakers:Y.map(c=>({...c})),teamNames:{team1:e,team2:s},betType:"qualifying"};C=[r],se(C),z=r.id,X(r.id),j="qualifying",console.log("Kunde oprettet, opdaterer UI"),H(),_()})}function oe(n){const o=A();o.bookmakers=o.bookmakers.map(a=>{const e=N(a.name),s=document.getElementById(`${e}-team1`),r=document.getElementById(`${e}-draw`),f=document.getElementById(`${e}-team2`),u=document.getElementById(`${e}-active`),d={team1:parseFloat((s==null?void 0:s.value)||"0")||0,draw:parseFloat((r==null?void 0:r.value)||"0")||0,team2:parseFloat((f==null?void 0:f.value)||"0")||0};return C.forEach(c=>{if(c.id!==o.id){const y=c.bookmakers.find(p=>p.name===a.name);y&&(y.odds={...d})}}),{...a,isActive:u?u.checked:a.isActive,odds:d}}),X(n),_();const t=document.getElementById("results");t&&t.classList.add("hidden")}function H(){var f,u;console.log("Opretter kunde vælger...");const n=document.getElementById("customerSelector");if(console.log("customerSelector container:",n),!n){console.error("Kunne ikke finde customerSelector element");return}if(console.log("Antal kunder:",C.length),C.length===0){console.log("Ingen kunder fundet, viser start knap"),n.innerHTML=`
            <div class="flex flex-col items-center justify-center py-8">
                <button id="startCalculationButton" class="btn-primary text-lg px-6 py-3 mb-4">
                    Start Ny Beregning
                </button>
                <p class="text-gray-600">Tryk på knappen ovenfor for at starte en ny beregning</p>
            </div>
        `;const d=document.getElementById("startCalculationButton");console.log("Start beregning knap element:",d),d&&(console.log("Tilføjer click event listener til start knap"),d.addEventListener("click",()=>{console.log("Start beregning knap klikket"),V()}));return}const o=A();if(!o){console.error("Ingen aktiv kunde fundet");return}console.log("Opdaterer UI med aktiv kunde:",o.name),n.innerHTML=`
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <select id="customerSelect" class="input-field max-w-xs">
                        ${C.map(d=>`
                            <option value="${d.id}" ${d.id===z?"selected":""}>
                                ${d.name}
                            </option>
                        `).join("")}
                    </select>
                    <button id="addCustomerButton" class="btn-secondary">
                        Tilføj ny kunde
                    </button>
                </div>
                <div class="flex items-center gap-2">
                    <label class="text-sm font-medium text-gray-700">Bet Type:</label>
                    <select id="betTypeSelect" class="input-field">
                        <option value="qualifying" ${j==="qualifying"?"selected":""}>
                            Bet 1 (Kvalificerende)
                        </option>
                        <option value="bonus" ${j==="bonus"?"selected":""}>
                            Bet 2 (Bonus og Freebts)
                        </option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Hold 1</label>
                    <input type="text" 
                           id="team1Name" 
                           class="input-field" 
                           placeholder="Indtast navn på hold 1"
                           value="${((f=o.teamNames)==null?void 0:f.team1)||""}"
                    >
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Hold 2</label>
                    <input type="text" 
                           id="team2Name" 
                           class="input-field" 
                           placeholder="Indtast navn på hold 2"
                           value="${((u=o.teamNames)==null?void 0:u.team2)||""}"
                    >
                </div>
            </div>
        </div>
    `;const t=document.getElementById("customerSelect");t&&t.addEventListener("change",d=>{const c=d.target;console.log("Kunde valgt:",c.value),oe(c.value)});const a=document.getElementById("betTypeSelect");a&&a.addEventListener("change",d=>{const y=d.target.value;console.log("Bet type ændret til:",y),j=y;const p=A();p&&(p.betType=y,_())});const e=document.getElementById("addCustomerButton");e&&e.addEventListener("click",()=>{console.log("Tilføj kunde knap klikket"),V()});const s=document.getElementById("team1Name"),r=document.getElementById("team2Name");s&&s.addEventListener("input",()=>{const d=A();d.teamNames||(d.teamNames={team1:"",team2:""}),d.teamNames.team1=s.value}),r&&r.addEventListener("input",()=>{const d=A();d.teamNames||(d.teamNames={team1:"",team2:""}),d.teamNames.team2=r.value}),console.log("Kunde vælger oprettet succesfuldt")}function ie(n){const o=A(),t=o.betType==="qualifying",a=n.map(i=>{const l=o.bookmakers.find(T=>T.name===i.name),v=(T,K,O)=>O?(T-1)*K:T*K,h=i.team1||1/0,g=i.team2||1/0,E=h<=g?"team1":"team2",$=h<=g?"team2":"team1";return{...i,favoritType:E,underdogType:$,returns:{team1:v(i.team1,i.fixedStake,(l==null?void 0:l.bonusType)==="freebet"),draw:v(i.draw,i.fixedStake,(l==null?void 0:l.bonusType)==="freebet"),team2:v(i.team2,i.fixedStake,(l==null?void 0:l.bonusType)==="freebet")}}}),s=a.reduce((i,l)=>{var v,h,g;return i+(((v=l.returns)==null?void 0:v.team1)||0)+(((h=l.returns)==null?void 0:h.draw)||0)+(((g=l.returns)==null?void 0:g.team2)||0)},0)/3;let r={team1:[],draw:[],deviation:1/0};const f=(i,l,v)=>{const h=(b,x)=>{const L=o.bookmakers.find(D=>D.name===b.name);return!t&&(L==null?void 0:L.bonusType)==="freebet"?(x-1)*b.fixedStake:x*b.fixedStake},g=i.reduce((b,x)=>b+h(x,x.team1),0),E=l.reduce((b,x)=>b+h(x,x.draw),0),$=v.reduce((b,x)=>b+h(x,x.team2),0),T=Math.max(g,E,$),K=Math.min(g,E,$),O=(g+E+$)/3,B=Math.pow(T-K,2)+Math.pow(Math.abs(g-O),2)+Math.pow(Math.abs(E-O),2)+Math.pow(Math.abs($-O),2);let k=0;t&&[...i,...l,...v].forEach(b=>{const x=o.bookmakers.find(L=>L.name===b.name);(!(x!=null&&x.bonusType)||x.bonusType==="none")&&(k+=5e3),x!=null&&x.bonusMinOdds&&(b.betType==="team1"?b.team1:b.betType==="draw"?b.draw:b.team2)<x.bonusMinOdds&&(k+=1e4)}),t||[...i,...l,...v].forEach(b=>{const x=o.bookmakers.find(D=>D.name===b.name);if((x==null?void 0:x.bonusType)==="freebet"){const D=b.betType==="team1"?b.team1:b.betType==="draw"?b.draw:b.team2;k-=(D-x.minOdds)*100}const L=T-K;L>O*.1&&(k+=Math.pow(L,2))});const M=[...i,...l,...v].find(b=>b.name==="ComeOn");if(M){const b=a.find(x=>x.name==="ComeOn");if(b){const x=M.betType===b.favoritType,L=M.betType==="draw";(x||L)&&(k+=5e4)}}const U=[...i,...l,...v].find(b=>b.name==="Tipwin");return U&&U.betType!=="draw"&&(k+=5e4),B+k},u=(i,l,v,h)=>{if(i.length===0){const B=f(l,v,h);B<r.deviation&&(r={team1:l,draw:v,team2:h,deviation:B});return}const[g,...E]=i,$=l.reduce((B,k)=>B+k.team1*k.fixedStake,0),T=v.reduce((B,k)=>B+k.draw*k.fixedStake,0),K=h.reduce((B,k)=>B+k.team2*k.fixedStake,0);if(g.name==="Tipwin"){g.draw>0&&u(E,l,[...v,g],h);return}else if(g.name==="ComeOn"){const B=g.team1||1/0,k=g.team2||1/0,M=B<=k?"team1":"team2";M==="team1"&&g.team2>0?u(E,l,v,[...h,g]):M==="team2"&&g.team1>0&&u(E,[...l,g],v,h);return}let O=[];if(g.preferLoss?O=[{type:"team1",need:-$,odds:g.team1,current:l},{type:"draw",need:-T,odds:g.draw,current:v},{type:"team2",need:-K,odds:g.team2,current:h}].filter(B=>B.odds>0).sort((B,k)=>B.need-k.need):O=[{type:"team1",need:s-$,odds:g.team1,current:l},{type:"draw",need:s-T,odds:g.draw,current:v},{type:"team2",need:s-K,odds:g.team2,current:h}].filter(B=>B.odds>0).sort((B,k)=>k.need-B.need),O.length!==0)for(const B of O)B.type==="team1"?u(E,[...l,g],v,h):B.type==="draw"?u(E,l,[...v,g],h):u(E,l,v,[...h,g])};u(a,[],[],[]);const d=n.map(i=>{let l,v;return r.team1.find(h=>h.name===i.name)?(l="team1",v=i.team1*i.fixedStake):r.draw.find(h=>h.name===i.name)?(l="draw",v=i.draw*i.fixedStake):(l="team2",v=i.team2*i.fixedStake),{name:i.name,team1Odds:i.team1,drawOdds:i.draw,team2Odds:i.team2,fixedStake:i.fixedStake,actualCost:i.actualCost,minOdds:i.minOdds,preferLoss:i.preferLoss,avoidWin:i.avoidWin,betType:l,potentialReturn:v}}),c=d.reduce((i,l)=>i+l.fixedStake,0),y=d.reduce((i,l)=>i+l.actualCost,0),p={team1:d.reduce((i,l)=>i+(l.betType==="team1"?l.potentialReturn:0),0),draw:d.reduce((i,l)=>i+(l.betType==="draw"?l.potentialReturn:0),0),team2:d.reduce((i,l)=>i+(l.betType==="team2"?l.potentialReturn:0),0)},w=Math.min(p.team1,p.draw,p.team2)-y,I=w/y*100,S=w>0;return{allBookmakers:d,totalStake:c,totalActualCost:y,potentialReturns:p,profit:w,profitPercentage:I,isArbitrage:S}}function F(n){const o=document.getElementById("loadingOverlay");o&&(n?o.classList.remove("hidden"):o.classList.add("hidden"))}function re(n){var y,p;if(!n)return;const o=A(),t=((y=o.teamNames)==null?void 0:y.team1)||"Hold 1",a=((p=o.teamNames)==null?void 0:p.team2)||"Hold 2",e=document.getElementById("results"),s=document.getElementById("emptyState"),r=document.getElementById("resultsBody"),f=document.getElementById("profitInfo");e&&s&&(e.classList.remove("hidden"),s.classList.add("hidden"));const u=document.querySelector("thead tr");u&&(u.innerHTML=`
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Bookmaker</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">${t}</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Uafgjort</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">${a}</th>
            <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">Indsats</th>
            <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">Gevinst</th>
        `);let d="";n.allBookmakers.forEach(m=>{const w=m.betType==="team1"?m.team1Odds*m.fixedStake:m.betType==="draw"?m.drawOdds*m.fixedStake:m.team2Odds*m.fixedStake;d+=`
            <tr class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-4 py-3">
                    <div class="font-medium text-gray-900">${m.name}</div>
                    ${m.actualCost!==m.fixedStake?'<div class="text-xs text-green-600">Med bonus</div>':""}
                </td>
                <td class="px-4 py-3">
                    <div class="flex items-center gap-1">
                        ${m.team1Odds.toFixed(2)}
                        ${m.betType==="team1"?`<span class="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Spil på ${t}</span>`:""}
                    </div>
                </td>
                <td class="px-4 py-3">
                    <div class="flex items-center gap-1">
                        ${m.drawOdds.toFixed(2)}
                        ${m.betType==="draw"?'<span class="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Spil på Uafgjort</span>':""}
                    </div>
                </td>
                <td class="px-4 py-3">
                    <div class="flex items-center gap-1">
                        ${m.team2Odds.toFixed(2)}
                        ${m.betType==="team2"?`<span class="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Spil på ${a}</span>`:""}
                    </div>
                </td>
                <td class="px-4 py-3 text-right">
                    <div class="font-medium">${m.fixedStake.toLocaleString("da-DK")} DKK</div>
                    ${m.actualCost!==m.fixedStake?`<div class="text-xs text-green-600">${m.actualCost.toLocaleString("da-DK")} DKK</div>`:""}
                </td>
                <td class="px-4 py-3 text-right">
                    <div class="font-medium text-green-600">${w.toLocaleString("da-DK")} DKK</div>
                    ${m.actualCost!==m.fixedStake?`<div class="text-xs text-green-600">Profit: ${(w-m.actualCost).toLocaleString("da-DK")} DKK</div>`:""}
                </td>
            </tr>
        `}),d+=`
        <tr class="bg-gray-50 font-semibold border-t-2 border-gray-200">
            <td class="px-4 py-3">Total</td>
            <td class="px-4 py-3 text-right">${n.potentialReturns.team1.toLocaleString("da-DK")} DKK</td>
            <td class="px-4 py-3 text-right">${n.potentialReturns.draw.toLocaleString("da-DK")} DKK</td>
            <td class="px-4 py-3 text-right">${n.potentialReturns.team2.toLocaleString("da-DK")} DKK</td>
            <td class="px-4 py-3 text-right">
                <div>${n.totalStake.toLocaleString("da-DK")} DKK</div>
                <div class="text-sm text-gray-600">${n.totalActualCost.toLocaleString("da-DK")} DKK</div>
            </td>
            <td class="px-4 py-3 text-right">
                <div class="text-green-600">Min: ${Math.min(n.potentialReturns.team1,n.potentialReturns.draw,n.potentialReturns.team2).toLocaleString("da-DK")} DKK</div>
                <div class="text-sm text-green-600">Max: ${Math.max(n.potentialReturns.team1,n.potentialReturns.draw,n.potentialReturns.team2).toLocaleString("da-DK")} DKK</div>
            </td>
        </tr>
    `,r.innerHTML=d;const c=n.isArbitrage?"text-green-600":"text-red-600";f.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <div class="${c} font-semibold text-lg mb-2">
                    ${n.isArbitrage?"✓ Arbitrage mulighed!":"✗ Ingen arbitrage"}
                </div>
                <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Total indsats:</span>
                        <span class="font-medium">${n.totalStake.toLocaleString("da-DK")} DKK</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Faktisk omkostning:</span>
                        <span class="font-medium">${n.totalActualCost.toLocaleString("da-DK")} DKK</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="font-semibold text-gray-800 mb-2">Potentielle gevinster:</div>
                <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">${t}:</span>
                        <span class="font-medium">${n.potentialReturns.team1.toLocaleString("da-DK")} DKK</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Uafgjort:</span>
                        <span class="font-medium">${n.potentialReturns.draw.toLocaleString("da-DK")} DKK</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">${a}:</span>
                        <span class="font-medium">${n.potentialReturns.team2.toLocaleString("da-DK")} DKK</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex justify-between items-center">
                <span class="text-gray-700 font-medium">Garanteret profit:</span>
                <span class="${c} text-lg font-bold">
                    ${n.profit.toLocaleString("da-DK")} DKK (${n.profitPercentage.toFixed(2)}%)
                </span>
            </div>
        </div>
    `}function _(){const n=document.getElementById("bookmakerInputs");if(!n)return;n.innerHTML="";const o=A();if(!o)return;const t=o.betType==="bonus";o.bookmakers.forEach(e=>{const s=N(e.name),r=document.createElement("div");r.className="bookmaker-card";const f=e.odds||{team1:0,draw:0,team2:0};if(r.innerHTML=`
            <div class="bookmaker-header">
                <div>
                    <div class="flex items-center gap-2">
                        <h3 class="bookmaker-title">${e.name}</h3>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="${s}-active" class="sr-only peer" ${e.isActive?"checked":""}>
                            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <span class="bookmaker-info">Min. odds: ${e.minOdds} | Indsats: ${e.fixedStake} DKK</span>
                    ${e.bonusType!=="none"?`<div class="bookmaker-bonus mt-1">
                            <div class="flex items-center gap-2">
                                <span class="inline-flex items-center px-2 py-1 rounded-md text-sm ${e.bonusType==="freebet"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800"}">
                                    ${e.bonusType==="freebet"?"Freebet":"Matching Bonus"}: 
                                    ${e.bonusAmount} DKK
                                    ${e.isBonusLocked?"🔒":"✓"}
                                </span>
                                ${t?`
                                    <label class="flex items-center gap-1">
                                        <input type="checkbox" 
                                               id="${s}-used-in-bet1"
                                               class="form-checkbox h-4 w-4 text-blue-600"
                                               ${e.usedInBet1?"checked":""}>
                                        <span class="text-sm text-gray-600">Brugt i Bet 1</span>
                                    </label>
                                `:""}
                            </div>
                            <span class="text-xs text-gray-600 block">
                                Kræver ${e.qualifyingBetAmount} DKK kvalificerende bet med min. odds ${e.bonusMinOdds}
                            </span>
                            ${t?`
                                <div class="mt-2">
                                    ${e.bonusType==="matchingBonus"?`
                                        <div class="flex items-center gap-2">
                                            <label class="text-sm text-gray-600">Saldo fra Bet 1:</label>
                                            <input type="number" 
                                                   id="${s}-bet1-balance" 
                                                   class="input-field w-32" 
                                                   value="${e.bet1Balance||""}"
                                                   placeholder="DKK"
                                                   ${e.usedInBet1?"":"disabled"}>
                                        </div>
                                    `:e.bonusType==="freebet"?`
                                        <div class="flex items-center gap-2">
                                            <label class="text-sm text-gray-600">Gevinst fra Bet 1:</label>
                                            <input type="number" 
                                                   id="${s}-bet1-profit" 
                                                   class="input-field w-32" 
                                                   value="${e.bet1Profit||""}"
                                                   placeholder="DKK">
                                            <div class="text-xs text-gray-500 ml-2">
                                                ${e.usedInBet1?`(Freebet: ${e.bonusAmount} DKK)`:"(Ikke brugt i Bet 1)"}
                                            </div>
                                        </div>
                                    `:""}
                                </div>
                            `:""}
                        </div>`:""}
                </div>
            </div>
            <div class="odds-grid">
                <div>
                    <label class="odds-label">Hold 1</label>
                    <input type="number" step="0.01" min="${e.minOdds}" 
                           class="input-field" 
                           id="${s}-team1" 
                           value="${f.team1||""}"
                           placeholder="Odds">
                    <div class="text-xs text-red-600 hidden mt-1" id="${s}-team1-error">
                        Min. ${e.minOdds}
                    </div>
                </div>
                <div>
                    <label class="odds-label">Uafgjort</label>
                    <input type="number" step="0.01" min="${e.minOdds}" 
                           class="input-field" 
                           id="${s}-draw" 
                           value="${f.draw||""}"
                           placeholder="Odds">
                    <div class="text-xs text-red-600 hidden mt-1" id="${s}-draw-error">
                        Min. ${e.minOdds}
                    </div>
                </div>
                <div>
                    <label class="odds-label">Hold 2</label>
                    <input type="number" step="0.01" min="${e.minOdds}" 
                           class="input-field" 
                           id="${s}-team2" 
                           value="${f.team2||""}"
                           placeholder="Odds">
                    <div class="text-xs text-red-600 hidden mt-1" id="${s}-team2-error">
                        Min. ${e.minOdds}
                    </div>
                </div>
            </div>
        `,n.appendChild(r),t){const d=document.getElementById(`${s}-used-in-bet1`);if(d&&d.addEventListener("change",()=>{if(e.usedInBet1=d.checked,e.bonusType==="matchingBonus"){const c=document.getElementById(`${s}-bet1-balance`);c&&(c.disabled=!d.checked,d.checked||(c.value="",e.bet1Balance=0))}}),e.bonusType==="matchingBonus"){const c=document.getElementById(`${s}-bet1-balance`);c&&c.addEventListener("change",()=>{const y=parseFloat(c.value)||0;e.bet1Balance=y})}else if(e.bonusType==="freebet"){const c=document.getElementById(`${s}-bet1-profit`);c&&c.addEventListener("change",()=>{const y=parseFloat(c.value)||0;e.bet1Profit=y})}}["team1","draw","team2"].forEach(d=>{const c=document.getElementById(`${s}-${d}`),y=document.getElementById(`${s}-${d}-error}`);c&&y&&(c.addEventListener("input",()=>{const p=parseFloat(c.value)||0;p>0&&p<e.minOdds?(y.classList.remove("hidden"),c.classList.add("border-yellow-500")):(y.classList.add("hidden"),c.classList.remove("border-yellow-500"))}),c.addEventListener("blur",()=>{const p=parseFloat(c.value)||0;e.odds||(e.odds={team1:0,draw:0,team2:0}),e.odds[d]=p}))});const u=document.getElementById(`${s}-active`);if(u){u.addEventListener("change",()=>{const c=u.closest(".bookmaker-card");c&&(u.checked?c.classList.remove("opacity-50"):c.classList.add("opacity-50")),e.isActive=u.checked});const d=u.closest(".bookmaker-card");d&&!e.isActive&&d.classList.add("opacity-50")}})}function de(){const n=A(),o=n.betType==="bonus";return n.bookmakers.map(t=>{const a=N(t.name),e=document.getElementById(`${a}-team1`),s=document.getElementById(`${a}-draw`),r=document.getElementById(`${a}-team2`),f=document.getElementById(`${a}-active`),u=parseFloat(e.value)||0,d=parseFloat(s.value)||0,c=parseFloat(r.value)||0,y=f?f.checked:t.isActive;let p=t.fixedStake,m=t.actualCost;o&&(t.usedInBet1?t.bonusType==="matchingBonus"?(p=t.bet1Balance||0,m=t.qualifyingBetAmount||0):t.bonusType==="freebet"&&(p=t.bonusAmount||0,m=t.bonusAmount||0):(p=0,m=0));const w=u>=t.minOdds?u:0,I=d>=t.minOdds?d:0,S=c>=t.minOdds?c:0,i=(l,v,h)=>{const g=document.getElementById(h);l>0&&l<t.minOdds?(g&&g.classList.remove("hidden"),v.classList.add("border-yellow-500")):(g&&g.classList.add("hidden"),v.classList.remove("border-yellow-500"))};return i(u,e,`${a}-team1-error`),i(d,s,`${a}-draw-error`),i(c,r,`${a}-team2-error`),{name:t.name,fixedStake:p,actualCost:m,minOdds:t.minOdds,preferLoss:t.preferLoss,avoidWin:t.avoidWin,isActive:y,team1:w,draw:I,team2:S,originalOdds:{team1:u,draw:d,team2:c}}}).filter(t=>{var r;const a=!o||t.fixedStake>0,e=!o||((r=n.bookmakers.find(f=>f.name===t.name))==null?void 0:r.usedInBet1);return(t.team1>0||t.draw>0||t.team2>0)&&t.isActive&&a&&e})}function le(){const n=C.length===0?Y:A().bookmakers,o=["Bookmaker","Hold 1","Uafgjort","Hold 2"],t=n.map(f=>[f.name,"","",""]),a="\uFEFF"+[o.join(";"),...t.map(f=>f.join(";"))].join(`\r
`),e=new Blob([a],{type:"text/csv;charset=utf-8"}),s=window.URL.createObjectURL(e),r=document.createElement("a");r.setAttribute("href",s),r.setAttribute("download","odds_skabelon.csv"),document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(s)}async function ce(){console.log("Initialiserer kamp vælger..."),document.readyState!=="complete"&&(console.log("Venter på at siden er helt indlæst..."),await new Promise(o=>{window.addEventListener("load",o)}),console.log("Siden er nu helt indlæst")),await new Promise(o=>setTimeout(o,100));const n=async(o,t=10,a=100)=>{console.log(`Søger efter element med id: ${o}`);for(let e=0;e<t;e++){const s=document.getElementById(o);if(s)return console.log(`Fandt element med id: ${o}`),s;console.log(`Forsøg ${e+1}/${t} - Kunne ikke finde element med id: ${o}`),await new Promise(r=>setTimeout(r,a))}return console.log(`Kunne ikke finde element med id: ${o} efter ${t} forsøg`),null};try{console.log("Starter søgning efter elementer...");const o=await n("matchSelect"),t=await n("fetchOddsButton"),a=await n("leagueSelect"),e=await n("daysInput");if(!o||!t||!a||!e){const c=[o?null:"matchSelect",t?null:"fetchOddsButton",a?null:"leagueSelect",e?null:"daysInput"].filter(Boolean);throw console.error("Manglende elementer:",c),new Error(`Kunne ikke finde nødvendige elementer for kamp vælger. Mangler: ${c.join(", ")}`)}const s=o,r=t,f=a,u=e;Object.entries(P).forEach(([c,y])=>{const p=document.createElement("option");p.value=c,p.textContent=y,f.appendChild(p)});const d=async()=>{s.innerHTML='<option value="">Indlæser kampe...</option>',s.disabled=!0,r.disabled=!0;try{const c=parseInt(u.value)||7,y=f.value?f.value:void 0,p=await q({daysFromNow:c,league:y});s.innerHTML='<option value="">Vælg kamp...</option>';const m=p.reduce((w,I)=>{const i=new Date(I.commence_time).toLocaleDateString("da-DK",{weekday:"long",year:"numeric",month:"long",day:"numeric"});return w[i]||(w[i]=[]),w[i].push(I),w},{});Object.entries(m).forEach(([w,I])=>{const S=document.createElement("optgroup");S.label=w,I.forEach(i=>{const l=document.createElement("option");l.value=i.id;const h=new Date(i.commence_time).toLocaleTimeString("da-DK",{hour:"2-digit",minute:"2-digit"});l.textContent=`${h} - ${i.home_team} vs ${i.away_team}`,S.appendChild(l)}),s.appendChild(S)}),s.disabled=!1}catch(c){console.error("Fejl ved hentning af kampe:",c),s.innerHTML='<option value="">Fejl ved hentning af kampe</option>'}};f.addEventListener("change",d),u.addEventListener("change",d),s.addEventListener("change",()=>{r.disabled=!s.value}),r.addEventListener("click",async()=>{var c;if(s.value){F(!0);try{const p=(await q({daysFromNow:parseInt(u.value)||7,league:f.value?f.value:void 0})).find(w=>w.id===s.value);if(!p)throw new Error("Kunne ikke finde den valgte kamp");console.log("Fandt valgt kamp:",{id:p.id,homeTeam:p.home_team,awayTeam:p.away_team,bookmakers:((c=p.bookmakers)==null?void 0:c.length)||0});const m=A();if(!m)throw new Error("Ingen aktiv kunde fundet");try{ne(p,m.bookmakers).forEach(l=>{const v=N(l.name),h=document.getElementById(`${v}-team1`),g=document.getElementById(`${v}-draw`),E=document.getElementById(`${v}-team2`);h&&g&&E&&(h.value=l.team1.toString(),g.value=l.draw.toString(),E.value=l.team2.toString(),[h,g,E].forEach($=>{$.dispatchEvent(new Event("input",{bubbles:!0}))}))}),m.teamNames||(m.teamNames={team1:"",team2:""}),m.teamNames.team1=p.home_team,m.teamNames.team2=p.away_team;const I=document.getElementById("team1Name"),S=document.getElementById("team2Name");I&&S&&(I.value=p.home_team,S.value=p.away_team);const i=document.createElement("div");i.className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded",i.innerHTML=`
                        <strong class="font-bold">Success!</strong>
                        <span class="block sm:inline"> Odds er blevet hentet og opdateret.</span>
                    `,document.body.appendChild(i),setTimeout(()=>i.remove(),5e3)}catch(w){throw console.error("Fejl ved konvertering af odds:",w),new Error(`Kunne ikke konvertere odds: ${w instanceof Error?w.message:"Ukendt fejl"}`)}}catch(y){console.error("Fejl ved hentning af odds:",y);const p=document.createElement("div");p.className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded",p.innerHTML=`
                    <strong class="font-bold">Fejl!</strong>
                    <span class="block sm:inline"> ${y instanceof Error?y.message:"Der opstod en fejl ved hentning af odds"}</span>
                `,document.body.appendChild(p),setTimeout(()=>p.remove(),5e3)}finally{F(!1)}}}),await d()}catch(o){console.error("Fejl ved hentning af kampe:",o);const t=document.createElement("div");t.className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",t.innerHTML=`
            <strong>Fejl!</strong> Kunne ikke hente kampe. Tjek din internetforbindelse og prøv igen.
        `,document.body.prepend(t)}}document.addEventListener("DOMContentLoaded",async()=>{console.log("DOM er indlæst, starter initialisering...");try{console.log("Forsøger at finde customerSelector element...");const t=document.getElementById("customerSelector");console.log("customerSelector element fundet:",t),console.log("Initialiserer customer selector..."),H(),console.log("Customer selector initialiseret");let a=0;const e=3;for(;a<e;)try{console.log(`Forsøg ${a+1} på at initialisere match selector...`),await ce(),console.log("Match selector initialiseret succesfuldt");break}catch(s){if(a++,console.log(`Fejl ved initialisering af match selector (forsøg ${a}):`,s),a===e)throw s;await new Promise(r=>setTimeout(r,1e3))}}catch(t){console.error("Fejl under initialisering:",t);const a=document.createElement("div");a.className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",a.innerHTML=`
            <strong>Fejl!</strong> Der opstod en fejl under initialisering. 
            <br>
            <small>Detaljer: ${t instanceof Error?t.message:"Ukendt fejl"}</small>
            <br>
            <button onclick="location.reload()" class="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Genindlæs siden
            </button>
        `,document.body.prepend(a)}const n=document.getElementById("calculateButton");n==null||n.addEventListener("click",async()=>{const t=de();if(t.length===0){alert("Venligst udfyld odds for mindst én bookmaker");return}F(!0);try{await new Promise(e=>setTimeout(e,500));const a=ie(t);re(a)}finally{F(!1)}});const o=document.getElementById("downloadTemplate");if(o&&o.addEventListener("click",()=>{le()}),!window.location.href.includes("localhost")){const t=document.createElement("script");t.src="/_vercel/insights/script.js",t.type="module",t.defer=!0,document.head.appendChild(t)}});
