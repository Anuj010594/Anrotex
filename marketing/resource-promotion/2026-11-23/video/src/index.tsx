import React from "react";
import {AbsoluteFill, Composition, Img, Sequence, interpolate, registerRoot, staticFile, useCurrentFrame} from "remotion";
import result from "./demo-results.json";

const C = {navy: "#062333", paper: "#F6F8F6", mint: "#A9EDDC", cyan: "#38BED0", yellow: "#F6D64C", panel: "#0D3B4B"};
const oldVersion = result.starting_version;
const newVersion = result.candidate_version;
const recoveredVersion = result.final_version;

function Scene({step, title, children, note}: {step: string; title: string; children: React.ReactNode; note: string}) {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: "clamp"});
  return <AbsoluteFill style={{background: C.navy, color: C.paper, padding: "100px 80px", fontFamily: '"Avenir Next", Avenir, sans-serif'}}>
    <div style={{display: "flex", alignItems: "center", gap: 20, height: 60}}><Img src={staticFile("anrotex-logo.png")} style={{width: 78, height: 48, objectFit: "contain"}}/><span style={{fontSize: 30, letterSpacing: 4, fontWeight: 700}}>ANROTEX</span><span style={{marginLeft: "auto", color: C.mint, fontSize: 28}}>{step} / 08</span></div>
    <div style={{opacity: enter, transform: `translateY(${(1-enter)*18}px)`}}>
      <h1 style={{fontSize: 80, lineHeight: 1.08, letterSpacing: -3, margin: "55px 0 44px", maxWidth: 910}}>{title}</h1>
      <div style={{minHeight: 420}}>{children}</div>
      <p style={{fontSize: 43, lineHeight: 1.35, margin: "36px 0 0", color: C.mint}}>{note}</p>
    </div>
    <div style={{position: "absolute", left: 80, right: 80, bottom: 102, borderTop: `1px solid ${C.mint}55`, paddingTop: 22, fontSize: 27, color: C.mint}}>Local test · Simulated AWS responses · No sound needed</div>
  </AbsoluteFill>;
}
function Card({label, value, color = C.mint}: {label: string; value: string; color?: string}) {
  return <div style={{background: C.panel, border: `2px solid ${color}`, borderRadius: 26, padding: "30px 34px", flex: 1}}><div style={{fontSize: 30, color: C.paper, marginBottom: 14}}>{label}</div><div style={{fontSize: 60, fontWeight: 700, color, lineHeight: 1.15}}>{value}</div></div>;
}
function Checks({items}: {items: string[]}) {
  const frame = useCurrentFrame();
  return <div style={{display: "grid", gap: 18}}>{items.map((item, i)=><div key={item} style={{opacity: interpolate(frame,[18+i*18,30+i*18],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}), background:C.panel,borderRadius:20,padding:"22px 30px",fontSize:42,display:"flex",gap:22}}><span style={{color:C.mint}}>✓</span>{item}</div>)}</div>;
}
function VersionRoute({version, failed = false}: {version: string; failed?: boolean}) {
  const frame = useCurrentFrame();
  const move = interpolate(frame, [15, 85], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return <div style={{background:C.panel,borderRadius:30,padding:36}}><div style={{fontSize:36,color:C.paper}}>Application requests</div><div style={{height:75,position:"relative",margin:"28px 12px"}}><div style={{height:4,background:C.mint,position:"absolute",top:35,left:0,right:0}}/><div style={{position:"absolute",left:`${move*92}%`,top:20,width:34,height:34,borderRadius:20,background:failed?C.yellow:C.mint}}/></div><div style={{fontSize:65,fontWeight:700,color:failed?C.yellow:C.mint}}>Version {version}</div><div style={{fontSize:34,marginTop:16}}>{failed?"App check: HTTP 500":"The release name points here"}</div></div>;
}
function Walkthrough() {
  return <AbsoluteFill>
    <Sequence name="01 — Deployed does not mean working" from={0} durationInFrames={240}>
      <Scene step="01" title="Deployed does not mean working." note="Watch a failed Lambda release switch back to the previous version.">
        <div style={{display:"flex",gap:24,marginTop:68}}><Card label="Current version" value={oldVersion}/><Card label="New version" value={newVersion} color={C.yellow}/></div>
        <p style={{fontSize:40,marginTop:45}}>Using the release code from our guide.</p>
      </Scene>
    </Sequence>
    <Sequence name="02 — Check before switching" from={240} durationInFrames={270}>
      <Scene step="02" title={`Check version ${newVersion} before switching.`} note={`All three checks pass. Requests still go to version ${oldVersion}.`}><Checks items={["Returns the expected version", "Saves a test record", "Reads the record back"]}/></Scene>
    </Sequence>
    <Sequence name="03 — Send requests to the new version" from={510} durationInFrames={240}>
      <Scene step="03" title={`Switch requests to version ${newVersion}.`} note="Then check the app through its normal entry point. Direct checks alone are not enough."><VersionRoute version={newVersion}/></Scene>
    </Sequence>
    <Sequence name="04 — Detect the deliberate failure" from={750} durationInFrames={270}>
      <Scene step="04" title="The app check fails." note="This test returns a deliberate server error after the switch. The release must fail."><VersionRoute version={newVersion} failed/></Scene>
    </Sequence>
    <Sequence name="05 — Restore the previous version" from={1020} durationInFrames={300}>
      <Scene step="05" title={`Switch back to version ${recoveredVersion}.`} note="The script checks that another release has not changed the destination before switching back."><VersionRoute version={recoveredVersion}/></Scene>
    </Sequence>
    <Sequence name="06 — Check recovery separately" from={1320} durationInFrames={300}>
      <Scene step="06" title="Check the app again." note="These checks run separately after rollback. The original release still shows as failed."><Checks items={["Rejects requests without permission", "Runs the previous version", "Saves and reads data", "Repeat request adds no duplicate"]}/></Scene>
    </Sequence>
    <Sequence name="07 — Explain the boundary" from={1620} durationInFrames={270}>
      <Scene step="07" title="Rollback does not restore your database." note="Check that the previous code still works with the current data. Test that before a real release."><div style={{display:"grid",gap:24}}><Card label="Code destination" value={`Back to version ${recoveredVersion}`}/><Card label="Database changes" value="Not reversed" color={C.yellow}/></div></Scene>
    </Sequence>
    <Sequence name="08 — Read and try the guide" from={1890} durationInFrames={270}>
      <Scene step="08" title="Try the checks on your computer." note="Read the Lambda rollback guide at anrotex.com. The link is in the post."><div style={{background:C.panel,borderRadius:30,padding:40}}><div style={{fontSize:52,fontWeight:700,color:C.mint,lineHeight:1.2}}>Code + instructions<br/>+ 23 local tests</div><p style={{fontSize:39,lineHeight:1.35}}>Start without an AWS account.<br/>Use a separate test environment before connecting to AWS.</p></div></Scene>
    </Sequence>
  </AbsoluteFill>;
}
registerRoot(()=> <Composition id="LambdaRollback" component={Walkthrough} width={1080} height={1350} fps={30} durationInFrames={2160}/>);
