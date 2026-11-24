/* kamel3lom — كامل علوم: بيانات المقالات هنا، وكل الصفحات تقرأ منها. عدّل المصفوفة P لإضافة مقالات */
const SITE="كامل علوم",$=s=>document.querySelector(s),Q=new URLSearchParams(location.search);
const C=["علوم","تقنية","ثقافة","ذكاء اصطناعي","خرائط","مقالات رأي"];
const AU={"سارة العتيبي":"باحثة في علوم البيانات والذكاء الاصطناعي","أحمد المنصور":"كاتب ومحرر في شؤون التقنية والثقافة"};
const SOC={Facebook:"#",X:"#",Instagram:"#",TikTok:"#",YouTube:"#"}; // ضع روابطك هنا
const P=[
{id:1,t:"كيف يغير الذكاء الاصطناعي مستقبل البحث العلمي؟",c:"ذكاء اصطناعي",a:"سارة العتيبي",d:"2026-11-10",r:8,x:"من تحليل البيانات الضخمة إلى اقتراح الفرضيات، تتسع أدوات الذكاء الاصطناعي داخل المختبرات يومًا بعد يوم.",b:["لم يعد الباحث يقضي أسابيع في فرز آلاف الأوراق العلمية، فالنماذج الحديثة تلخّص الدراسات وتكشف الأنماط التي قد تفوت العين البشرية.","غير أن الأداة لا تغني عن السؤال الجيد؛ فجودة النتائج تبقى مرتبطة بوضوح المنهج ونزاهة البيانات ومراجعة الخبراء."]},
{id:2,t:"الخرائط الرقمية ودورها في فهم المدن الحديثة",c:"خرائط",a:"أحمد المنصور",d:"2026-10-22",r:6,x:"تحوّلت الخرائط من أدوات للتنقل إلى منصات تقرأ حركة المدينة وتساعد في تخطيطها.",b:["تجمع الخرائط الرقمية بيانات المرور والمرافق والكثافة السكانية في طبقات يمكن للمخطط الحضري مقارنتها بسهولة.","وبفضلها صار بوسع البلديات رصد الأحياء الأقل خدمة واتخاذ قرارات مبنية على الأرقام لا على الانطباعات."]},
{id:3,t:"لماذا تحتاج المجلات العربية إلى تصميمات أكثر احترافية؟",c:"مقالات رأي",a:"أحمد المنصور",d:"2026-09-15",r:5,x:"القارئ يحكم على المحتوى من الصفحة الأولى، والتصميم الجيد جزء من احترام عقله ووقته.",b:["كثير من المواقع العربية تملك محتوى ممتازًا لكنه يضيع بين خطوط متعبة وإعلانات مزدحمة وتنسيق عشوائي.","الاستثمار في الخط والمسافات والتباين ليس ترفًا، بل هو ما يجعل القارئ يكمل المقال حتى آخره."]},
{id:4,t:"القراءة في عصر السرعة: هل ما زال المقال الطويل قادرًا على التأثير؟",c:"ثقافة",a:"سارة العتيبي",d:"2026-08-03",r:9,x:"بين مقاطع الثواني والتنبيهات المتلاحقة، يبحث القراء عن مساحة هادئة للتعمق.",b:["تشير تجارب كثير من المنصات إلى أن المقالات الطويلة تحتفظ بجمهور وفيّ يبحث عن العمق والسياق.","السر في البناء: مقدمة جذابة، عناوين فرعية واضحة، وإيقاع يسمح للقارئ بالتوقف والعودة دون أن يضيع."]},
{id:5,t:"التقنية والثقافة: علاقة تتوسع كل يوم",c:"تقنية",a:"أحمد المنصور",d:"2026-06-18",r:7,x:"من رقمنة المخطوطات إلى الأدب التفاعلي، تعيد التقنية رسم حدود الإبداع الثقافي.",b:["أتاحت الرقمنة وصول الباحثين إلى مخطوطات نادرة من أي مكان في العالم، وحفظتها من التلف.","وفي المقابل يطرح الأمر أسئلة عن الذائقة والملكية الفكرية تستحق نقاشًا واسعًا."]},
{id:6,t:"كيف تبني مدونة معرفية قادرة على جذب القراء؟",c:"علوم",a:"سارة العتيبي",d:"2026-03-07",r:6,x:"خطوات عملية لاختيار المجال وتنظيم المحتوى وبناء علاقة طويلة مع جمهورك.",b:["ابدأ بسؤال واحد: من القارئ الذي أكتب له؟ فوضوح الجمهور يحدد النبرة والموضوعات وإيقاع النشر.","ثم التزم بجدول ثابت، وقدّم قيمة حقيقية في كل مقال، واجمع بريد القرّاء عبر نشرة بريدية صادقة."]}];
const cover=p=>`<div class="cover" style="--h:${p.id*47}"></div>`;
const card=p=>`<article class="card"><a href="article.html?id=${p.id}">${cover(p)}<span class="tag">${p.c}</span><h3>${p.t}</h3><p>${p.x}</p><small>${p.a} · ${p.r} دقائق</small></a></article>`;
const list=(el,a)=>{$(el).innerHTML=a.length?a.map(card).join(""):"<p>لا توجد مقالات مطابقة.</p>"};
const dt=d=>new Date(d).toLocaleDateString("ar",{year:"numeric",month:"long",day:"numeric"});
const L=[["index.html","الرئيسية"],["category.html","التصنيفات"],["archive.html","الأرشيف"],["about.html","من نحن"],["contact.html","تواصل معنا"]];
$("#hd").outerHTML=`<header class="top"><div id="pg"></div><div class="w bar"><a class="logo" href="index.html">${SITE.split(" ")[0]} <b>${SITE.split(" ")[1]}</b></a>
<nav id="nv">${L.map(l=>`<a href="${l[0]}">${l[1]}</a>`).join("")}</nav><form action="search.html"><input name="q" placeholder="ابحث…" aria-label="بحث"></form>
<button class="ib" id="th" aria-label="الوضع الليلي">🌓</button><button class="ib" id="mb" aria-label="القائمة">☰</button></div></header>`;
$("#ft").outerHTML=`<footer><div class="w"><div class="g"><div><h4>${SITE}</h4><p>مجلة عربية تقدّم مقالات معرفية في العلوم والتقنية والثقافة بلغة واضحة وتصميم مريح للقراءة.</p></div>
<div><h4>روابط مهمة</h4>${L.map(l=>`<a href="${l[0]}">${l[1]}</a>`).join("")}</div>
<div><h4>التصنيفات</h4>${C.slice(0,4).map(c=>`<a href="category.html?c=${encodeURIComponent(c)}">${c}</a>`).join("")}</div>
<div><h4>تابعنا</h4>${Object.entries(SOC).map(([k,v])=>`<a href="${v}" rel="noopener">${k}</a>`).join("")}</div></div>
<div class="cp">© 2026 ${SITE}. جميع الحقوق محفوظة. Designed with kamel3lom style.</div></div></footer><button class="btn" id="up" aria-label="للأعلى">↑</button>`;
// الوضع الليلي
const R=document.documentElement;try{R.dataset.theme=localStorage.th||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light")}catch(e){}
$("#th").onclick=()=>{R.dataset.theme=R.dataset.theme=="dark"?"light":"dark";try{localStorage.th=R.dataset.theme}catch(e){}};
$("#mb").onclick=()=>$("#nv").classList.toggle("open");
$("#up").onclick=()=>scrollTo({top:0});
addEventListener("scroll",()=>{const h=R.scrollHeight-innerHeight;$("#pg").style.width=(scrollY/h*100)+"%";$("#up").style.display=scrollY>400?"block":"none"});
document.querySelectorAll("form[data-ok]").forEach(f=>f.onsubmit=e=>{e.preventDefault();f.innerHTML="<p>✅ "+f.dataset.ok+"</p>"}); // يحتاج لاحقًا ربطًا بخدمة بريد
const pg=document.body.dataset.p;
const chips=(on)=>C.map(c=>`<a class="${c==on?"on":""}" href="category.html?c=${encodeURIComponent(c)}">${c}</a>`).join("");
if(pg=="home"){const h=P[0];$("#hero").innerHTML=`<div><span class="tag">مقال العدد · ${h.c}</span><h1><a href="article.html?id=${h.id}">${h.t}</a></h1><p>${h.x}</p><p><small>${h.a} · ${dt(h.d)} · ${h.r} دقائق</small></p><a class="btn" href="article.html?id=${h.id}">اقرأ المقال</a></div>${cover(h)}`;
list("#feat",P.slice(1,4));list("#latest",[...P].sort((a,b)=>b.d.localeCompare(a.d)).slice(0,6));list("#pop",[...P].sort((a,b)=>b.r-a.r).slice(0,3));$("#cats").innerHTML=chips()}
if(pg=="article"){const p=P.find(x=>x.id==Q.get("id"))||P[0];document.title=p.t+" | "+SITE;
const hs=["المشهد العام","ما الذي يعنيه ذلك؟"];
$("#art").innerHTML=`<p class="crumb"><a href="index.html">الرئيسية</a> › <a href="category.html?c=${encodeURIComponent(p.c)}">${p.c}</a> › ${p.t}</p><span class="tag">${p.c}</span><h1>${p.t}</h1>
<p><small>بقلم <a href="author.html?n=${encodeURIComponent(p.a)}">${p.a}</a> · <time datetime="${p.d}">${dt(p.d)}</time> · ${p.r} دقائق قراءة</small></p>${cover(p)}
<p><strong>${p.x}</strong></p><nav class="toc"><b>محتويات المقال</b>${hs.map((h,i)=>`<a href="#s${i}">${h}</a>`).join("")}</nav>
<h2 id="s0">${hs[0]}</h2><p>${p.b[0]}</p><blockquote>${p.x}</blockquote><h2 id="s1">${hs[1]}</h2><p>${p.b[1]}</p>
<p>${["#"+p.c,"#مجلة","#"+SITE.replace(" ","_")].map(t=>`<span class="tag">${t}</span>`).join("")}</p>
<div class="share"><b>شارك:</b><a href="https://x.com/intent/post?url=${encodeURIComponent(location.href)}">X</a><a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}">Facebook</a><a href="https://wa.me/?text=${encodeURIComponent(p.t+" "+location.href)}">WhatsApp</a></div>
<div class="box"><b>عن الكاتب: ${p.a}</b><p>${AU[p.a]}.</p></div>`;
list("#rel",P.filter(x=>x.id!=p.id&&x.c==p.c).concat(P.filter(x=>x.id!=p.id)).slice(0,3));
const s=document.createElement("script");s.type="application/ld+json";s.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:p.t,datePublished:p.d,author:{"@type":"Person",name:p.a},publisher:{"@type":"Organization",name:SITE}});document.head.append(s)}
if(pg=="category"){const c=Q.get("c");$("#chips").innerHTML=chips(c);$("#ct").textContent=c||"كل التصنيفات";list("#list",c?P.filter(p=>p.c==c):P)}
if(pg=="author"){const n=Q.get("n")||Object.keys(AU)[0],a=P.filter(p=>p.a==n);$("#au").innerHTML=`<div class="box"><div class="cover" style="--h:${n.length*30};width:90px;aspect-ratio:1;border-radius:50%"></div><h1>${n}</h1><p>${AU[n]||""}</p><p><b>${a.length}</b> مقالات منشورة · <a href="#">Facebook</a> · <a href="#">X</a></p></div>`;list("#list",a)}
if(pg=="search"){const f=()=>{const t=$("#q").value.trim(),c=$("#fc").value,a=$("#fa").value,y=$("#fy").value;list("#list",P.filter(p=>(!t||(p.t+p.x+p.c).includes(t))&&(!c||p.c==c)&&(!a||p.a==a)&&(!y||p.d.startsWith(y))))};
$("#fc").innerHTML="<option value=''>كل التصنيفات</option>"+C.map(c=>`<option>${c}</option>`).join("");$("#fa").innerHTML="<option value=''>كل الكتّاب</option>"+Object.keys(AU).map(c=>`<option>${c}</option>`).join("");
$("#q").value=Q.get("q")||"";document.querySelectorAll("#q,#fc,#fa,#fy").forEach(e=>e.oninput=f);f()}
if(pg=="archive"){const g={};P.forEach(p=>(g[p.d.slice(0,7)]??=[]).push(p));$("#list").innerHTML=Object.keys(g).sort().reverse().map(k=>`<h2 class="s">${new Date(k+"-01").toLocaleDateString("ar",{year:"numeric",month:"long"})}</h2><div class="grid">${g[k].map(card).join("")}</div>`).join("")}
