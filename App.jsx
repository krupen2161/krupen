import { useState, useEffect, useRef } from "react";

/* ─── PALETTE ───────────────────────────────────────────────── */
const C = {
  bg:       "#F8FAFF",
  navy:     "#0F2557",
  navyMid:  "#1A3A7A",
  navyLight:"#2952A3",
  accent:   "#3B82F6",
  accentSoft:"#DBEAFE",
  white:    "#FFFFFF",
  slate:    "#64748B",
  slateLight:"#CBD5E1",
  text:     "#1E293B",
  textSoft: "#475569",
  border:   "#E2E8F0",
  cardBg:   "#FFFFFF",
};

/* ─── DATA ──────────────────────────────────────────────────── */
const NAV = ["Home","Projects","Experience","Skills","Contact"];

const SKILLS_GROUPS = [
  { cat:"IT Support",       col:C.navy,      items:["Tier 1/2 Help Desk","Incident Management","SLA Tracking","ITIL Framework","ServiceNow","Redmine","RDP / SSH","Customer Service"] },
  { cat:"Identity & Access",col:C.navyLight, items:["Active Directory","Entra ID (Azure AD)","Group Policy (GPO)","RBAC","MFA","LDAP / SSO","User Provisioning"] },
  { cat:"Networking",       col:C.accent,    items:["TCP/IP","DNS & DHCP","VLANs","ACLs","OSPF","MPLS","Subnetting","Routing & Switching","Firewall Config","Port Security"] },
  { cat:"Endpoint & MDM",   col:C.navy,      items:["Microsoft Intune","MDM","Patch Management","Firmware Updates","Windows Deployment"] },
  { cat:"OS & Platforms",   col:C.navyLight, items:["Windows 10/11","Windows Server 2016–2022","Ubuntu","CentOS","VMware ESXi","Hyper-V"] },
  { cat:"Cloud & Tools",    col:C.accent,    items:["Microsoft Azure","AWS Basics","Microsoft 365","Exchange Server 2019","SharePoint","Teams","PowerShell","Bash","Wireshark","Cisco Packet Tracer"] },
];

const PROJECTS = [
  {
    id:1, tag:"Capstone Project", period:"May 2025 – Aug 2025",
    title:"Enterprise IT Infrastructure Integration",
    subtitle:"Conestoga College · Multi-Region: Canada & Singapore",
    role:"Team Lead", color:C.navy, accent:C.accent,
    summary:"Led a team of 6 to design, build, and deliver a full enterprise IT environment for 20+ users across two geographic regions — from initial planning through final handoff with complete documentation.",
    stats:[{val:"20+",label:"Users Supported"},{val:"2",label:"Geo Regions"},{val:"6",label:"Team Members"},{val:"8+",label:"Services Built"}],
    sections:[
      { title:"Identity & Domain", color:C.navy,      items:["Windows Server 2022 DC with AD DS, DNS & DHCP","Group Policy (GPO) enforcement enterprise-wide","Multi-region domain extended to Singapore","LDAP Single Sign-On — one login for all services"] },
      { title:"Network Design",    color:C.navyLight,  items:["VLANs per department (HR, IT, Finance, Ops)","ACLs to control inter-VLAN traffic","Port security — blocks unknown devices","Inter-region routing: Canada ↔ Singapore"] },
      { title:"Services Stack",    color:C.accent,     items:["Microsoft Exchange Server — email & alerts","Nextcloud for LDAP-integrated file sharing","Redmine for IT ticketing across both regions","SQL Server with database mirroring for backup","Internal web portal — single hub for all services"] },
      { title:"Endpoint & Docs",   color:C.navy,       items:["MDM/Intune policies on all endpoints both regions","Network diagrams, IP plans & GPO reference docs","Step-by-step config guides & test results","Full runbooks — any team member can maintain/rebuild"] },
    ],
  },
  {
    id:2, tag:"Lab Project", period:"Jan 2025 – Apr 2025",
    title:"Microsoft Exchange Server 2019 Setup",
    subtitle:"Conestoga College · 15-User Simulation Environment",
    role:"Sole Implementer", color:C.navyLight, accent:C.accent,
    summary:"Installed and configured Exchange Server 2019 on Windows Server for a 15-user simulation, covering the full mail infrastructure lifecycle from AD prep to Outlook access.",
    stats:[{val:"15",label:"Users"},{val:"3",label:"Mailbox Types"},{val:"SSL",label:"Encrypted"},{val:"OWA",label:"Web Access"}],
    sections:[
      { title:"Deployment",    color:C.navyLight, items:["Completed all AD prep steps before Exchange install","Installed Exchange Server 2019 on Windows Server","Configured SSL certificates for encrypted mail flow","Set up mail connectors & routing rules"] },
      { title:"Mailbox Admin", color:C.accent,    items:["Created user, shared mailboxes & distribution groups","Configured Outlook on the Web (OWA) access","Set up desktop Outlook client connectivity","Monitored mail queues, DB health & server logs"] },
    ],
  },
  {
    id:3, tag:"Lab Project", period:"Jan 2025 – Apr 2025",
    title:"Enterprise Network Infrastructure",
    subtitle:"Conestoga College · Cisco LAN/WAN Design",
    role:"Network Designer", color:C.accent, accent:C.navyLight,
    summary:"Planned and built a secure LAN/WAN network using Cisco routers and switches with full department segmentation, documented and validated with Wireshark.",
    stats:[{val:"VLAN",label:"Segmented"},{val:"ACL",label:"Secured"},{val:"SSH",label:"Managed"},{val:"WAN",label:"Tested"}],
    sections:[
      { title:"Network Design", color:C.accent, items:["IP addressing plan with separate subnets per department","VLANs, ACLs & inter-VLAN routing configured","SSH management, DHCP, DNS & NAT setup","Validated with Wireshark & ping/trace testing"] },
    ],
  },
  {
    id:4, tag:"Lab Project", period:"Sep 2024 – Dec 2024",
    title:"Windows Server 2022 Domain Setup",
    subtitle:"Conestoga College · 10-User Domain Environment",
    role:"Team Member (4-person)", color:C.navy, accent:C.navyLight,
    summary:"Collaborated with a team of 4 to build a Windows Server 2022 domain from scratch — identity, file services, printing, and security policy.",
    stats:[{val:"10",label:"Users"},{val:"4",label:"Team"},{val:"GPO",label:"Enforced"},{val:"IIS",label:"Deployed"}],
    sections:[
      { title:"Domain & Services", color:C.navy, items:["AD DS, DNS, DHCP, IIS, File Share & Print Server","OUs, security groups & GPOs configured","Password rules, drive mapping & software deployment via GPO","Windows Firewall locked down unnecessary access"] },
    ],
  },
];

const EXPERIENCE = [{
  title:"Technical Support Engineer", company:"Ishan Technologies",
  location:"Rajkot, Gujarat, India", period:"Feb 2023 – Mar 2024",
  type:"Managed Services Provider · Tier 1 IT Support",
  bullets:[
    "Handled 30+ tickets/week via phone, RDP/SSH & onsite; met SLA targets every month, logged all cases in ServiceNow.",
    "Resolved Windows 10/11 issues — OS errors, drivers, software installs, printer faults — with high user satisfaction.",
    "Managed Active Directory for 100+ users: account creation, password resets, security groups, RBAC & OU maintenance.",
    "Configured routers, modems & firewalls for home & SMB clients; set up DHCP, DNS & NAT within SLA timeframes.",
    "Ran maintenance on 50+ computers & network devices; updated firmware/software and reduced repeat tickets.",
    "Wrote and maintained 20+ knowledge base articles in ServiceNow, reducing repeat ticket volume.",
  ],
}];

/* ─── HOOKS ─────────────────────────────────────────────────── */
function useInView(t=0.1){
  const ref=useRef(null);
  const [v,setV]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});
    if(ref.current)o.observe(ref.current);
    return()=>o.disconnect();
  },[]);
  return[ref,v];
}

/* ─── REVEAL ────────────────────────────────────────────────── */
function Reveal({children,delay=0,style={}}){
  const [ref,v]=useInView();
  return(
    <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(18px)",transition:`opacity .6s ${delay}ms,transform .6s ${delay}ms`,...style}}>
      {children}
    </div>
  );
}

/* ─── CHIP ──────────────────────────────────────────────────── */
function Chip({label,color=C.navy}){
  return(
    <span style={{display:"inline-block",padding:"3px 12px",borderRadius:999,background:`${color}12`,border:`1px solid ${color}30`,fontSize:11,color,fontWeight:600,letterSpacing:.3}}>
      {label}
    </span>
  );
}

/* ─── SECTION HEADER ────────────────────────────────────────── */
function SectionHeader({eyebrow,title,color=C.navy}){
  return(
    <Reveal style={{marginBottom:48}}>
      <p style={{fontSize:11,fontWeight:700,letterSpacing:4,color,textTransform:"uppercase",marginBottom:10}}>{eyebrow}</p>
      <div style={{width:40,height:3,background:color,borderRadius:2,marginBottom:16}}/>
      <h2 style={{fontSize:"clamp(26px,3.5vw,40px)",fontWeight:800,color:C.text,letterSpacing:-.5}}>{title}</h2>
    </Reveal>
  );
}

/* ─── STAT CARD ─────────────────────────────────────────────── */
function StatCard({val,label,color,delay=0}){
  const [ref,v]=useInView();
  return(
    <div ref={ref} style={{
      flex:1,minWidth:100,
      background:C.cardBg,
      border:`1px solid ${C.border}`,
      borderTop:`3px solid ${color}`,
      borderRadius:10,padding:"20px 16px",textAlign:"center",
      boxShadow:"0 2px 12px rgba(15,37,87,0.06)",
      opacity:v?1:0,transform:v?"translateY(0)":"translateY(16px)",
      transition:`opacity .5s ${delay}ms,transform .5s ${delay}ms`,
    }}>
      <div style={{fontSize:32,fontWeight:800,color,lineHeight:1}}>{val}</div>
      <div style={{fontSize:10,color:C.slate,marginTop:6,letterSpacing:1.5,textTransform:"uppercase",fontWeight:600}}>{label}</div>
    </div>
  );
}

/* ─── DETAIL CARD ───────────────────────────────────────────── */
function DetailCard({sec,delay=0}){
  const [ref,v]=useInView();
  return(
    <div ref={ref} style={{
      background:C.cardBg,border:`1px solid ${C.border}`,
      borderTop:`3px solid ${sec.color}`,borderRadius:10,padding:"22px 20px",
      boxShadow:"0 2px 12px rgba(15,37,87,0.06)",
      opacity:v?1:0,transform:v?"translateY(0)":"translateY(18px)",
      transition:`opacity .6s ${delay}ms,transform .6s ${delay}ms`,
    }}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:sec.color,flexShrink:0}}/>
        <span style={{fontSize:11,fontWeight:700,color:sec.color,letterSpacing:2,textTransform:"uppercase"}}>{sec.title}</span>
      </div>
      {sec.items.map((item,i)=>(
        <div key={i} style={{display:"flex",gap:10,marginBottom:9,alignItems:"flex-start"}}>
          <span style={{color:sec.color,fontSize:11,marginTop:2,flexShrink:0}}>→</span>
          <span style={{fontSize:13,color:C.textSoft,lineHeight:1.6}}>{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── SKILL PILL ────────────────────────────────────────────── */
function SkillPill({skill,color,delay=0}){
  const [ref,v]=useInView();
  const [hov,setHov]=useState(false);
  return(
    <span ref={ref} style={{
      display:"inline-block",padding:"6px 14px",borderRadius:6,
      background:hov?`${color}12`:C.cardBg,
      border:`1px solid ${hov?color+60:C.border}`,
      fontSize:12,color:hov?color:C.textSoft,fontWeight:500,
      cursor:"default",
      boxShadow:hov?"0 2px 8px rgba(15,37,87,0.1)":"0 1px 3px rgba(15,37,87,0.04)",
      opacity:v?1:0,transform:v?"scale(1)":"scale(0.94)",
      transition:`opacity .4s ${delay}ms,transform .4s ${delay}ms,background .2s,border .2s,color .2s,box-shadow .2s`,
    }}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
    >{skill}</span>
  );
}

/* ─── PROJECT BLOCK ─────────────────────────────────────────── */
function ProjectBlock({proj}){
  const [open,setOpen]=useState(proj.id===1);
  const [ref,v]=useInView();
  return(
    <div ref={ref} style={{
      background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:14,
      marginBottom:20,overflow:"hidden",
      boxShadow:"0 2px 16px rgba(15,37,87,0.07)",
      opacity:v?1:0,transform:v?"translateY(0)":"translateY(18px)",
      transition:"opacity .6s,transform .6s",
    }}>
      {/* top strip */}
      <div style={{height:4,background:`linear-gradient(90deg,${proj.color},${proj.accent})`}}/>

      <div style={{padding:"24px 28px"}}>
        {/* header row */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:12}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
              <Chip label={proj.tag} color={proj.color}/>
              <span style={{fontSize:11,color:C.slate}}>{proj.period}</span>
            </div>
            <h3 style={{fontSize:"clamp(15px,2.2vw,20px)",fontWeight:800,color:C.text,letterSpacing:-.3,lineHeight:1.2}}>{proj.title}</h3>
            <p style={{fontSize:12,color:C.slate,marginTop:4}}>{proj.subtitle}</p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            <Chip label={proj.role} color={proj.accent}/>
            <button onClick={()=>setOpen(o=>!o)} style={{
              padding:"6px 16px",borderRadius:6,
              background:open?C.navy:"transparent",
              border:`1px solid ${C.navy}`,
              color:open?C.white:C.navy,fontSize:11,fontWeight:700,
              letterSpacing:1,cursor:"pointer",fontFamily:"inherit",
              transition:"all .2s",whiteSpace:"nowrap",
            }}>{open?"Hide ▲":"Details ▼"}</button>
          </div>
        </div>

        {/* summary */}
        <p style={{fontSize:13.5,color:C.textSoft,lineHeight:1.75,marginBottom:20,maxWidth:780,borderLeft:`3px solid ${proj.color}20`,paddingLeft:14}}>
          {proj.summary}
        </p>

        {/* stats */}
        <div style={{display:"flex",gap:12,marginBottom:open?24:0,flexWrap:"wrap"}}>
          {proj.stats.map((st,i)=>(
            <StatCard key={i} val={st.val} label={st.label}
              color={[proj.color,proj.accent,C.navyLight,C.accent][i%4]}
              delay={i*70}/>
          ))}
        </div>

        {/* expandable */}
        {open&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14,marginTop:4}}>
            {proj.sections.map((sec,i)=><DetailCard key={i} sec={sec} delay={i*80}/>)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────── */
export default function Portfolio(){
  const [scrolled,setScrolled]=useState(false);
  const [heroOn,setHeroOn]=useState(false);
  const [active,setActive]=useState("Home");

  useEffect(()=>{
    setTimeout(()=>setHeroOn(true),100);
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const go=(sec)=>{document.getElementById(sec)?.scrollIntoView({behavior:"smooth"});setActive(sec);};

  return(
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:${C.navyLight};border-radius:4px}
        html{scroll-behavior:smooth}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:200,
        padding:"0 6%",height:60,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background:scrolled?"rgba(248,250,255,0.95)":"transparent",
        backdropFilter:scrolled?"blur(16px)":"none",
        borderBottom:scrolled?`1px solid ${C.border}`:"none",
        transition:"all .35s",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {/* subtle tech icon */}
          <div style={{width:32,height:32,borderRadius:8,background:C.navy,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:C.white,fontSize:14,fontWeight:800}}>KC</span>
          </div>
          <span style={{fontSize:13,fontWeight:700,color:C.navy,letterSpacing:.3}}>Krupen Chitroda</span>
        </div>
        <div style={{display:"flex",gap:32}}>
          {NAV.map(n=>(
            <button key={n} onClick={()=>go(n)} style={{
              background:"none",border:"none",cursor:"pointer",
              fontSize:12,fontWeight:600,color:active===n?C.navy:C.slate,
              fontFamily:"inherit",transition:"color .2s",
              borderBottom:active===n?`2px solid ${C.navy}`:"2px solid transparent",
              paddingBottom:2,
            }}
              onMouseEnter={e=>e.currentTarget.style.color=C.navy}
              onMouseLeave={e=>e.currentTarget.style.color=active===n?C.navy:C.slate}
            >{n}</button>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="Home" style={{
        position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",
        background:`linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 60%, ${C.navyLight} 100%)`,
        overflow:"hidden",
      }}>
        {/* subtle circuit-board dots — tech hint */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:.08,
          backgroundImage:`radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize:"32px 32px"}}/> 

        {/* glow blobs */}
        <div style={{position:"absolute",top:"-20%",right:"-10%",width:"55vw",height:"55vw",borderRadius:"50%",background:"rgba(59,130,246,0.18)",filter:"blur(80px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-10%",left:"-5%",width:"40vw",height:"40vw",borderRadius:"50%",background:"rgba(255,255,255,0.06)",filter:"blur(60px)",pointerEvents:"none"}}/>

        <div style={{position:"relative",zIndex:2,width:"100%",padding:"140px 8% 120px",maxWidth:900,margin:"0 auto"}}>
          {/* eyebrow */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:8,
            padding:"6px 16px",borderRadius:999,
            background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",
            marginBottom:28,
            opacity:heroOn?1:0,transition:"opacity .7s .1s",
          }}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#4ADE80"}}/>
            <span style={{fontSize:11,color:"rgba(255,255,255,0.85)",fontWeight:500,letterSpacing:1}}>
              Open to Opportunities
            </span>
          </div>

          <h1 style={{
            fontSize:"clamp(38px,6vw,76px)",fontWeight:800,color:C.white,
            lineHeight:1.08,letterSpacing:-1,marginBottom:20,
            opacity:heroOn?1:0,transform:heroOn?"translateY(0)":"translateY(28px)",
            transition:"opacity .8s .25s,transform .8s .25s",
          }}>
            Krupen<br/>
            <span style={{color:"rgba(255,255,255,0.55)"}}>Chitroda</span>
          </h1>

          <p style={{
            fontSize:15,color:"rgba(255,255,255,0.7)",maxWidth:520,lineHeight:1.75,
            marginBottom:32,fontWeight:400,
            opacity:heroOn?1:0,transition:"opacity .8s .5s",
          }}>
            IT professional with a BSc in Computer Science and a Post Graduation in Network Infrastructure & System Administration. 1 year of Tier 1 Help Desk experience + hands-on enterprise lab work.
          </p>

          {/* role chips */}
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:40,opacity:heroOn?1:0,transition:"opacity .8s .7s"}}>
            {["IT Support Technician","Help Desk Analyst","Desktop Support Specialist"].map((t,i)=>(
              <span key={i} style={{padding:"6px 16px",borderRadius:999,background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.22)",fontSize:12,color:"rgba(255,255,255,0.9)",fontWeight:500}}>
                {t}
              </span>
            ))}
          </div>

          {/* skill tags */}
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:44,opacity:heroOn?1:0,transition:"opacity .8s .85s"}}>
            {["Windows Server 2022","Active Directory","TCP/IP & Routing","MDM / Endpoint Mgmt","LDAP · SSO","ITIL Framework"].map((t,i)=>(
              <span key={i} style={{padding:"4px 12px",borderRadius:4,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",fontSize:11,color:"rgba(255,255,255,0.65)",fontWeight:500,fontFamily:"'SF Mono','Fira Code',monospace",letterSpacing:.3}}>
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div style={{display:"flex",gap:14,flexWrap:"wrap",opacity:heroOn?1:0,transition:"opacity .8s 1s"}}>
            <button onClick={()=>go("Projects")} style={{
              padding:"13px 32px",borderRadius:8,
              background:C.white,border:"none",color:C.navy,
              fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",
              transition:"transform .2s,box-shadow .2s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.2)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
            >View Projects</button>
            <button onClick={()=>go("Contact")} style={{
              padding:"13px 32px",borderRadius:8,
              background:"transparent",border:"1px solid rgba(255,255,255,0.4)",
              color:C.white,fontSize:13,fontWeight:700,
              cursor:"pointer",fontFamily:"inherit",transition:"background .2s",
            }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}
            >Get in Touch</button>
          </div>
        </div>

        {/* scroll hint */}
        <div style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,opacity:heroOn?.5:0,transition:"opacity 1s 1.4s"}}>
          <div style={{width:1,height:36,background:"linear-gradient(180deg,transparent,rgba(255,255,255,0.5))"}}/>
          <span style={{fontSize:9,letterSpacing:4,color:"rgba(255,255,255,0.45)"}}>SCROLL</span>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="Projects" style={{padding:"96px 7% 60px",maxWidth:1100,margin:"0 auto"}}>
        <SectionHeader eyebrow="Academic Projects" title="Projects & Labs" color={C.navy}/>
        {PROJECTS.map(p=><ProjectBlock key={p.id} proj={p}/>)}
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="Experience" style={{padding:"60px 7% 60px",background:C.white,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionHeader eyebrow="Work Experience" title="Professional Experience" color={C.navy}/>

          <Reveal>
            <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",boxShadow:"0 2px 16px rgba(15,37,87,0.07)"}}>
              <div style={{height:4,background:`linear-gradient(90deg,${C.navy},${C.navyLight})`}}/>
              <div style={{padding:"28px 32px"}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:20}}>
                  <div>
                    <p style={{fontSize:11,fontWeight:700,letterSpacing:3,color:C.navyLight,textTransform:"uppercase",marginBottom:6}}>{EXPERIENCE[0].type}</p>
                    <h3 style={{fontSize:"clamp(16px,2.5vw,22px)",fontWeight:800,color:C.text,letterSpacing:-.3}}>{EXPERIENCE[0].title}</h3>
                    <p style={{fontSize:13,color:C.slate,marginTop:4}}>{EXPERIENCE[0].company} · {EXPERIENCE[0].location}</p>
                  </div>
                  <Chip label={EXPERIENCE[0].period} color={C.navy}/>
                </div>
                <div style={{width:"100%",height:1,background:C.border,marginBottom:20}}/>
                {EXPERIENCE[0].bullets.map((b,i)=>(
                  <Reveal key={i} delay={i*55} style={{display:"flex",gap:12,marginBottom:12,alignItems:"flex-start"}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:C.navy,marginTop:6,flexShrink:0}}/>
                    <span style={{fontSize:13.5,color:C.textSoft,lineHeight:1.65}}>{b}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Education */}
          <Reveal delay={100} style={{marginTop:52}}>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:4,color:C.navy,textTransform:"uppercase",marginBottom:10}}>Education & Certifications</p>
            <div style={{width:40,height:3,background:C.navy,borderRadius:2,marginBottom:24}}/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
              {[
                {tag:"Post Graduation",title:"Applied Network Infrastructure & System Administration",org:"Conestoga College, Kitchener, ON",period:"May 2024 – Aug 2025",color:C.navy},
                {tag:"Bachelor's Degree",title:"BSc Computer Science",org:"Darshan University, India",period:"Jul 2019 – May 2023",color:C.navyLight},
                {tag:"Certification",title:"CompTIA A+ Core 1 (220-1101)",org:"LinkedIn Learning · Hardware, Networking, OS, Security",period:"In Progress",color:C.accent},
              ].map((c,i)=>(
                <Reveal key={i} delay={i*90}>
                  <div style={{background:C.cardBg,border:`1px solid ${C.border}`,borderTop:`3px solid ${c.color}`,borderRadius:10,padding:"20px 18px",boxShadow:"0 2px 10px rgba(15,37,87,0.05)"}}>
                    <Chip label={c.tag} color={c.color}/>
                    <p style={{fontSize:13.5,fontWeight:700,color:C.text,margin:"12px 0 4px",lineHeight:1.3}}>{c.title}</p>
                    <p style={{fontSize:11.5,color:C.slate,marginBottom:8,lineHeight:1.5}}>{c.org}</p>
                    <p style={{fontSize:11,color:c.color,fontWeight:600}}>{c.period}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="Skills" style={{padding:"80px 7% 80px",maxWidth:1100,margin:"0 auto"}}>
        <SectionHeader eyebrow="Technical Skills" title="Skills & Technologies" color={C.navy}/>
        {SKILLS_GROUPS.map((grp,gi)=>{
          const [ref,v]=useInView();
          return(
            <div key={gi} ref={ref} style={{marginBottom:32,opacity:v?1:0,transform:v?"none":"translateY(16px)",transition:`opacity .6s ${gi*60}ms,transform .6s ${gi*60}ms`}}>
              <p style={{fontSize:11,fontWeight:700,color:grp.col,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>{grp.cat}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {grp.items.map((sk,si)=><SkillPill key={si} skill={sk} color={grp.col} delay={si*30}/>)}
              </div>
              {gi<SKILLS_GROUPS.length-1&&<div style={{height:1,background:C.border,marginTop:28}}/>}
            </div>
          );
        })}
      </section>

      {/* ── CONTACT ── */}
      <section id="Contact" style={{padding:"80px 7% 100px",background:C.navy,position:"relative",overflow:"hidden"}}>
        {/* subtle dot grid */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:.06,backgroundImage:`radial-gradient(circle,#fff 1px,transparent 1px)`,backgroundSize:"28px 28px"}}/>

        <div style={{maxWidth:600,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
          <Reveal>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:4,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",marginBottom:12}}>Get In Touch</p>
            <div style={{width:40,height:3,background:"rgba(255,255,255,0.3)",borderRadius:2,margin:"0 auto 24px"}}/>
            <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:800,color:C.white,letterSpacing:-.5,marginBottom:16}}>Open to Opportunities</h2>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.6)",lineHeight:1.8,marginBottom:44,fontWeight:400}}>
              Entry-level IT professional based in Kitchener, Ontario.<br/>
              Looking for Desktop Support, Help Desk & Sysadmin roles.
            </p>

            <div style={{display:"flex",flexDirection:"column",gap:12,maxWidth:420,margin:"0 auto 40px"}}>
              {[
                {label:"Email",   val:"krupen2161@gmail.com",            icon:"✉"},
                {label:"Phone",   val:"(548) 398-8034",                  icon:"☎"},
                {label:"LinkedIn",val:"linkedin.com/in/krupen-chitroda", icon:"in"},
              ].map((item,i)=>(
                <Reveal key={i} delay={i*80}>
                  <div style={{
                    display:"flex",alignItems:"center",gap:16,
                    padding:"14px 20px",borderRadius:10,textAlign:"left",
                    background:"rgba(255,255,255,0.08)",
                    border:"1px solid rgba(255,255,255,0.14)",
                    transition:"background .2s",
                  }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.14)"}
                    onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}
                  >
                    <span style={{fontSize:15,color:"rgba(255,255,255,0.5)",minWidth:20,textAlign:"center"}}>{item.icon}</span>
                    <div>
                      <p style={{fontSize:9,color:"rgba(255,255,255,0.4)",letterSpacing:2,textTransform:"uppercase",marginBottom:2}}>{item.label}</p>
                      <p style={{fontSize:13,color:C.white,fontWeight:500}}>{item.val}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={320}>
              <a href="https://linkedin.com/in/krupen-chitroda" target="_blank" rel="noreferrer" style={{
                display:"inline-block",padding:"13px 36px",borderRadius:8,
                background:C.white,color:C.navy,
                fontSize:13,fontWeight:700,textDecoration:"none",
                transition:"transform .2s,box-shadow .2s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.25)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
              >View LinkedIn Profile</a>
            </Reveal>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{padding:"20px 7%",background:C.navy,borderTop:"1px solid rgba(255,255,255,0.08)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <span style={{fontSize:12,color:"rgba(255,255,255,0.35)"}}>© 2025 Krupen Chitroda · IT Portfolio</span>
        <span style={{fontSize:11,color:"rgba(255,255,255,0.2)"}}>Kitchener, ON · Canada</span>
      </footer>
    </div>
  );
}
