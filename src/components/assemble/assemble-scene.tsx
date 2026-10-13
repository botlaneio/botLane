import type { CSSProperties, ReactNode } from "react";
import {
  APPROVALS,
  CAPTIONS,
  ICON,
  REPORT_BARS,
  RUNS,
  SOURCES,
  SOURCE_STEP,
  SOURCE_TOP,
  SYSTEM_LABELS,
  TOUCHES,
} from "./data";

// Static markup for the scroll-to-assemble board. It renders on the server;
// <AssembleController> finds the pieces by their data-* attributes and animates them.

const mono = "font-mono";

function Icon({ d, size = 20, color = "#1d1d1f" }: { d: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Check({ size = 14, stroke = 2 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 8.2l2.6 2.6L12 5.4" fill="none" stroke="#ffffff" strokeWidth={stroke}
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A positioned, 3D-lifted slot on the board. The inner element is what animates. */
function Slot({ x, y, w, h, z, children }: { x: number; y: number; w: number; h: number; z: number; children: ReactNode }) {
  return (
    <div className="bl-layer" style={{ left: x, top: y, width: w, height: h, transform: `translateZ(${z}px)` }}>
      {children}
    </div>
  );
}

const stack: CSSProperties = { position: "absolute", left: 0, top: 0 };
const hidden: CSSProperties = { ...stack, opacity: 0 };

function SvgCheckNode({ cx, cy, fill, tag }: { cx: number; cy: number; fill: string; tag: Record<string, string> }) {
  return (
    <g className="bl-pop" {...tag}>
      <circle cx={cx} cy={cy} r={10} fill={fill} />
      <path d={`M${cx - 4.5} ${cy + 0.2}l3 3 5.5-5.6`} fill="none" stroke="#ffffff" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function SvgOpenNode({ cx, cy, tag }: { cx: number; cy: number; tag: Record<string, string> }) {
  return (
    <g className="bl-pop" {...tag}>
      <circle cx={cx} cy={cy} r={8} fill="#ffffff" stroke="#c7c8cf" strokeWidth={2} />
    </g>
  );
}

const STEPS = [
  { n: 1, title: "Input", body: "Lane picks up signals from the tools you already use.", left: 0, width: 288, cx: 144 },
  { n: 2, title: "Automation", body: "Lane does the work and drafts it for you.", left: 344, width: 252, cx: 470 },
  { n: 3, title: "Approval", body: "You review and approve before anything goes out.", left: 616, width: 268, cx: 750 },
  { n: 4, title: "Output", body: "Lane delivers and handles the follow-up.", left: 936, width: 320, cx: 1096 },
];

export function AssembleScene() {
  return (
    <div className="bl-sticky">
      {/* which system + caption */}
      <div className="mx-auto w-full max-w-[1200px] flex-none px-4 pt-6 md:px-6 md:pt-8">
        <div className={`bl-sysrow ${mono} flex gap-5 text-xs uppercase tracking-[0.06em]`}>
          {SYSTEM_LABELS.map((label, k) => (
            <span key={label} data-sys={k} style={{ opacity: 0.35 }}>{label}</span>
          ))}
        </div>
        <div className="relative mt-3 h-36 md:h-24">
          {CAPTIONS.map((c, i) => (
            <div key={c.title} data-cap={i} className="absolute inset-x-0 top-0" style={i ? { opacity: 0 } : undefined}>
              <div className="text-[clamp(28px,3.4vw,44px)] font-semibold tracking-[-0.035em]">{c.title}</div>
              <div className="mt-1.5 text-[15px] leading-snug text-muted md:text-[17px]">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* the scene */}
      <div className="bl-fit" data-fit="">
        <div className="bl-scaler" data-scaler="">
          <div className="bl-board" data-board="">
            <div className="bl-floor" data-floor="" aria-hidden="true" />

            {/* glass slabs: the same four steps for every system */}
            {STEPS.map((s) => (
              <div key={s.n} data-fx="head" data-cx={s.cx} data-cy={300} className="bl-slab" style={{ left: s.left, width: s.width }}>
                <div className="flex items-center gap-3">
                  <span className="bl-num">{s.n}</span>
                  <span className="text-xl font-semibold tracking-[-0.02em]">{s.title}</span>
                </div>
                <div className="mt-2 text-[13px] leading-[1.4] text-muted">{s.body}</div>
              </div>
            ))}

            {/* connectors: each system draws its own shape */}
            <svg aria-hidden="true" width={1240} height={600} viewBox="0 0 1240 600" className="bl-abs"
              style={{ left: 0, top: 0, overflow: "visible", transform: "translateZ(14px)" }}>
              <g fill="none" stroke="#cfd0d7" strokeWidth={2} strokeLinecap="round">
                {SOURCES.map((_, i) => {
                  const y = SOURCE_TOP + SOURCE_STEP * i + 36;
                  return <path key={i} data-path={`f${i}`} d={`M264 ${y} C 320 ${y} 318 290 372 290`} />;
                })}
                <path data-path="l0" d="M860 290 L 960 290" />
                <path data-path="ly" d="M572 290 L 640 290" />
                <path data-path="l1" d="M264 290 L 372 290" />
                <path data-path="tb" d="M860 290 C 924 290 920 150 984 150 L 984 404" />
                <path data-path="l2" d="M264 290 L 372 290" />
                <path data-path="e2" d="M860 290 L 984 290" />
                <path data-path="loop" d="M984 290 A 96 96 0 1 1 1176 290 A 96 96 0 1 1 984 290" />
              </g>
              <g fill="none" stroke="#e0312b" strokeWidth={3} strokeLinecap="round">
                <path data-path="c0" d="M572 290 L 640 290" />
                <path data-path="c1" d="M572 290 L 640 290" />
                <path data-path="c2" d="M572 290 L 640 290" />
                <path data-path="s0" d="M860 290 L 960 290" />
                <path data-path="tp" d="M860 290 C 924 290 920 150 984 150 L 984 404" />
                <path data-path="p1" d="M984 290 A 96 96 0 0 1 1176 290" />
              </g>
              <path data-path="p2" d="M1176 290 A 96 96 0 0 1 1080 386 L 1080 440" fill="none"
                stroke="#1a7f37" strokeWidth={3} strokeLinecap="round" />

              {/* line stops (lead follow-up) */}
              {TOUCHES.map((t, i) => <SvgOpenNode key={`o${i}`} cx={984} cy={t.y} tag={{ "data-n1": String(i) }} />)}
              {TOUCHES.map((t, i) => <SvgCheckNode key={`d${i}`} cx={984} cy={t.y} fill="#1a7f37" tag={{ "data-n1d": String(i) }} />)}

              {/* loop stops (invoice follow-up) */}
              <SvgOpenNode cx={1080} cy={194} tag={{ "data-n2": "0" }} />
              <SvgOpenNode cx={1176} cy={290} tag={{ "data-n2": "1" }} />
              <SvgOpenNode cx={1080} cy={386} tag={{ "data-n2": "2" }} />
              <SvgCheckNode cx={1080} cy={194} fill="#1d1d1f" tag={{ "data-n2d": "0" }} />
              <SvgCheckNode cx={1176} cy={290} fill="#e0312b" tag={{ "data-n2d": "1" }} />
              <g data-n2l="" className={mono} fontSize={11} letterSpacing="0.06em" fill="#6e6e73">
                <text x={1080} y={174} textAnchor="middle">DAY 7</text>
                <text x={1194} y={276}>DAY 14</text>
                <text x={1066} y={406} textAnchor="end">DAY 30</text>
              </g>
            </svg>

            {/* ===== Lane (fixed) ===== */}
            <Slot x={372} y={150} w={200} h={280} z={44}>
              <div data-fx="lane" data-cx={472} data-cy={290} className="bl-card bl-fill relative p-[18px]">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-ink shadow-[0_6px_14px_rgba(20,20,40,0.18)]">
                    <span className="flex h-[11px] w-[30px] items-center justify-center overflow-hidden rounded-md bg-white">
                      <span data-eye="" className="bl-eye" />
                    </span>
                  </span>
                  <span className="relative h-6 w-[74px]">
                    <span data-lpw="" className="bl-pill bl-pill-red absolute top-0 right-0">Working</span>
                    <span data-lpr="" className="bl-pill absolute top-0 right-0" style={{ opacity: 0 }}>Ready</span>
                  </span>
                </div>
                {RUNS.map((r, k) => (
                  <div key={r.run} data-ls={k} className="absolute inset-x-[18px] top-20 bottom-[18px]" style={k ? { opacity: 0 } : undefined}>
                    <div className={`${mono} text-xs text-muted`}>{r.run}</div>
                    <div className="mt-1 text-[17px] leading-[1.25] font-semibold tracking-[-0.02em]">{r.title}</div>
                    <div className="mt-[18px] flex flex-col gap-3">
                      {r.steps.map((step) => (
                        <div key={step} className="flex items-center gap-2.5 text-[13px] whitespace-nowrap">
                          <span className="bl-box"><span data-ck={k}><Check size={12} stroke={2.2} /></span></span>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Slot>

            {/* ===== You (fixed) ===== */}
            <Slot x={640} y={140} w={220} h={300} z={52}>
              <div data-fx="you" data-cx={750} data-cy={290} className="bl-card bl-fill relative">
                <div data-ring="" aria-hidden="true" className="pointer-events-none absolute -inset-[3px] rounded-[22px] border-2 border-lane"
                  style={{ boxShadow: "0 0 0 6px rgba(224,49,43,0.10)", opacity: 0 }} />
                <div className="absolute inset-x-[18px] top-[18px] flex items-center gap-3">
                  <span className="flex size-11 flex-none items-center justify-center rounded-full border border-[#e6e6ea] bg-[#f0f0f3]">
                    <Icon d={ICON.person} size={22} />
                  </span>
                  <div>
                    <div className="text-base font-semibold">You</div>
                    <div className="relative h-[18px] w-[140px] text-[13px] font-medium whitespace-nowrap">
                      {APPROVALS.map((_, k) => (
                        <span key={`w${k}`} data-wait={k} className="text-lane-ink" style={k ? hidden : stack}>Awaiting your OK</span>
                      ))}
                      {APPROVALS.map((a, k) => (
                        <span key={`d${k}`} data-done={k} className="text-ok" style={hidden}>{a.done}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {APPROVALS.map((a, k) => (
                  <div key={a.question} data-yl={k} className="absolute inset-x-[18px] top-20 bottom-[18px] flex flex-col gap-2"
                    style={k ? { opacity: 0 } : undefined}>
                    <div className="text-base leading-[1.25] font-semibold tracking-[-0.02em]">{a.question}</div>
                    <div className="flex items-center gap-2.5 rounded-xl border border-[#ececf0] bg-white px-2.5 py-[9px]">
                      <span className="bl-tile" style={{ width: 32, height: 32, borderRadius: 9 }}><Icon d={a.icon} size={18} /></span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold whitespace-nowrap">{a.doc}</div>
                        <div className="text-xs text-muted">{a.meta}</div>
                      </div>
                    </div>
                    <div className="flex-auto" />
                    <button data-approve={k} type="button" className="bl-btn">{a.button}</button>
                    <button type="button" className="bl-btn-2">Review draft</button>
                  </div>
                ))}
              </div>
            </Slot>

            {/* ===== 01 Client reporting: a funnel ===== */}
            {SOURCES.map((s, i) => {
              const top = SOURCE_TOP + SOURCE_STEP * i;
              return (
                <Slot key={s.name} x={24} y={top} w={240} h={72} z={32}>
                  <div data-chip="" data-s0="" data-cx={144} data-cy={top + 36}
                    className="bl-card bl-fill flex items-center gap-3 rounded-[18px] pr-3 pl-3.5">
                    <span className="bl-tile"><Icon d={s.icon} /></span>
                    <div className="min-w-0 flex-auto">
                      <div className="text-[15px] font-semibold whitespace-nowrap">{s.name}</div>
                      <div className="truncate text-xs text-muted">{s.meta}</div>
                    </div>
                    <span className={"hot" in s ? "bl-pill bl-pill-red" : "bl-pill"}>{s.pill}</span>
                  </div>
                </Slot>
              );
            })}

            <Slot x={960} y={130} w={272} h={300} z={40}>
              <div data-report="" data-s0="" data-cx={1096} data-cy={280} className="bl-card bl-fill flex flex-col gap-3.5 p-[18px]">
                <div className="relative h-8">
                  <span data-owait="" className="absolute top-0 left-0 flex h-8 items-center gap-2.5 text-sm font-semibold whitespace-nowrap text-faint">
                    <span className="size-[30px] rounded-full border-[1.5px] border-dashed border-[#c7c8cf]" />
                    Waiting for your OK
                  </span>
                  <span data-odone="" className="absolute top-0 left-0 flex h-8 items-center gap-2.5 text-sm font-semibold whitespace-nowrap text-ok" style={{ opacity: 0 }}>
                    <span className="flex size-[30px] items-center justify-center rounded-full bg-ok shadow-[0_4px_10px_rgba(26,127,55,0.3)]"><Check /></span>
                    Delivered · Fri 09:00
                  </span>
                </div>
                <div className="flex items-center gap-3 border-t border-[#efeff2] pt-3">
                  <span className="bl-tile"><Icon d={ICON.doc} /></span>
                  <div>
                    <div className="text-[15px] font-semibold">Weekly client report</div>
                    <div className="text-xs text-muted">Acme Co · Week 41</div>
                  </div>
                </div>
                <div className="flex flex-auto items-end gap-2.5 border-b border-[#efeff2] px-1">
                  {REPORT_BARS.map(([h, c], i) => (
                    <div key={i} data-bar="" className="flex-1 rounded-t" style={{ height: `${h}%`, background: c, transformOrigin: "50% 100%" }} />
                  ))}
                </div>
              </div>
            </Slot>

            {/* ===== 02 Lead follow-up: a line ===== */}
            <Slot x={24} y={236} w={240} h={108} z={32}>
              <div data-lead="" className="bl-card bl-fill flex flex-col gap-2.5 rounded-[18px] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 flex-none items-center justify-center rounded-full bg-[#fdeceb] text-sm font-semibold text-lane-ink">SC</span>
                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold whitespace-nowrap">Sarah Chen</div>
                    <div className="text-[13px] whitespace-nowrap text-muted">Website form · 2 min ago</div>
                  </div>
                </div>
                <div className={`${mono} self-start rounded-full bg-[#fdeceb] px-2.5 py-1 text-[11px] tracking-[0.06em] text-lane-ink uppercase`}>New lead</div>
              </div>
            </Slot>
            {TOUCHES.map((t, i) => (
              <div key={t.when} data-n1l={i} className="bl-abs whitespace-nowrap" style={{ left: 1004, top: t.y - 12, transform: "translateZ(16px)" }}>
                <div className={`${mono} text-[11px] tracking-[0.06em] text-muted`}>{t.when}</div>
                <div className="text-sm font-semibold">{t.what}</div>
              </div>
            ))}
            <Slot x={960} y={404} w={256} h={76} z={40}>
              <div data-meet="" className="bl-card bl-fill flex items-center gap-3 rounded-[18px] px-4">
                <span className="bl-tile bl-tile-ok"><Icon d={ICON.calendar} color="#1a7f37" /></span>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold whitespace-nowrap">Meeting booked</div>
                  <div className="text-[13px] whitespace-nowrap text-muted">Thu 2:00 pm · on your calendar</div>
                </div>
              </div>
            </Slot>

            {/* ===== 03 Invoice follow-up: a loop ===== */}
            <Slot x={24} y={226} w={240} h={128} z={32}>
              <div data-inv="" className="bl-card bl-fill flex flex-col gap-2.5 rounded-[18px] p-4">
                <div className="flex items-center gap-3">
                  <span className="bl-tile"><Icon d={ICON.ledger} /></span>
                  <div className="min-w-0">
                    <div className={`${mono} text-[13px] text-muted`}>INV-2041</div>
                    <div className="text-[15px] font-semibold whitespace-nowrap">Acme Co · $4,200</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-muted">Due Sep 29</span>
                  <span className="font-medium text-lane-ink">14 days overdue</span>
                </div>
              </div>
            </Slot>
            <div data-cnt="a" className="bl-abs w-[150px] text-center" style={{ left: 1005, top: 264, transform: "translateZ(16px)" }}>
              <div className={`${mono} text-[26px] font-medium tracking-[-0.02em] text-lane-ink`}>14 days</div>
              <div className="text-xs text-muted">overdue</div>
            </div>
            <div data-cnt="b" className="bl-abs w-[150px] text-center" style={{ left: 1005, top: 264, transform: "translateZ(16px)", opacity: 0 }}>
              <div className="text-[26px] font-semibold tracking-[-0.02em] text-ok">Paid</div>
              <div className={`${mono} text-xs text-muted`}>$4,200</div>
            </div>
            <Slot x={968} y={440} w={224} h={64} z={40}>
              <div data-bankc="" className="bl-card bl-fill flex items-center gap-3 rounded-[18px] px-3.5">
                <span className="bl-tile bl-tile-ok" style={{ width: 34, height: 34 }}><Icon d={ICON.bank} color="#1a7f37" /></span>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold whitespace-nowrap text-ok">+$4,200 received</div>
                  <div className="text-xs whitespace-nowrap text-muted">Bank feed · today</div>
                </div>
              </div>
            </Slot>

            {/* travellers: what moves through each shape */}
            <div aria-hidden="true" className="pointer-events-none bl-abs" style={{ left: 0, top: 0, width: 1240, height: 600, transform: "translateZ(60px)" }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} data-dot="" className="bl-traveller size-2.5 rounded-[3px]"
                  style={{ left: -5, top: -5, background: i === 3 ? "#e0312b" : "#1d1d1f" }} />
              ))}
              <div data-av="" className="bl-traveller flex size-7 items-center justify-center rounded-full bg-lane text-[11px] font-semibold text-white shadow-[0_4px_10px_rgba(224,49,43,0.35)]"
                style={{ left: -14, top: -14 }}>SC</div>
              <div data-coin="" className="bl-traveller flex size-7 items-center justify-center rounded-full border-2 border-ink bg-white text-sm font-semibold text-ink shadow-[0_4px_10px_rgba(20,20,40,0.18)]"
                style={{ left: -14, top: -14 }}>$</div>
            </div>
          </div>
        </div>

        <Finale />
      </div>

      {/* scrubber */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-none items-center gap-4 px-4 pb-4 md:px-6 md:pb-6">
        <label htmlFor="bl-assemble" className={`${mono} text-[11px] tracking-[0.1em] whitespace-nowrap text-muted uppercase`}>Pieces → Done</label>
        <input id="bl-assemble" data-scrub="" type="range" min={0} max={1000} defaultValue={0}
          className="m-0 h-11 min-w-0 flex-auto cursor-pointer accent-lane" />
      </div>
    </div>
  );
}

/** The last frame: the three shapes side by side. */
function Finale() {
  const card = "bl-trio-card flex-1 rounded-[20px] border border-[#e6e6e8] bg-white p-6 shadow-[0_18px_40px_rgba(20,20,40,0.10)]";
  return (
    <div data-trioscale="" className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[1240px]" style={{ transform: "translate(-50%, -50%)" }}>
      <div className="bl-trio-row absolute top-[110px] right-[62px] left-[62px] flex gap-8">
        <div data-tc="" className={card} style={{ opacity: 0 }}>
          <svg width="100%" height={88} viewBox="0 0 260 88" fill="none" strokeLinecap="round" aria-hidden="true">
            <g stroke="#cfd0d7" strokeWidth={2}>
              <path d="M14 12 C 70 12 70 44 112 44" /><path d="M14 32 C 70 32 70 44 112 44" />
              <path d="M14 56 C 70 56 70 44 112 44" /><path d="M14 76 C 70 76 70 44 112 44" />
            </g>
            <g fill="#1d1d1f">
              <rect x={8} y={8} width={8} height={8} rx={2} /><rect x={8} y={28} width={8} height={8} rx={2} />
              <rect x={8} y={52} width={8} height={8} rx={2} /><rect x={8} y={72} width={8} height={8} rx={2} />
            </g>
            <rect x={112} y={32} width={36} height={24} rx={7} fill="#1d1d1f" /><circle cx={134} cy={44} r={4} fill="#ff453a" />
            <path d="M148 44 H 180" stroke="#e0312b" strokeWidth={3} /><circle cx={180} cy={44} r={7} fill="#fff" stroke="#e0312b" strokeWidth={2} />
            <path d="M187 44 H 204" stroke="#cfd0d7" strokeWidth={2} />
            <rect x={204} y={18} width={44} height={52} rx={7} fill="#fff" stroke="#1d1d1f" strokeWidth={2} />
            <g fill="#1d1d1f">
              <rect x={213} y={48} width={6} height={12} rx={1} /><rect x={223} y={40} width={6} height={20} rx={1} />
              <rect x={233} y={30} width={6} height={30} rx={1} fill="#e0312b" />
            </g>
          </svg>
          <FinaleText num="01 · FUNNEL" title="Client reporting" body="Many sources in. One report out." />
        </div>
        <div data-tc="" className={card} style={{ opacity: 0 }}>
          <svg width="100%" height={88} viewBox="0 0 260 88" fill="none" strokeLinecap="round" aria-hidden="true">
            <circle cx={16} cy={44} r={9} fill="#e0312b" />
            <path d="M25 44 H 56" stroke="#cfd0d7" strokeWidth={2} />
            <rect x={56} y={32} width={36} height={24} rx={7} fill="#1d1d1f" /><circle cx={78} cy={44} r={4} fill="#ff453a" />
            <path d="M92 44 H 116" stroke="#e0312b" strokeWidth={3} /><circle cx={116} cy={44} r={7} fill="#fff" stroke="#e0312b" strokeWidth={2} />
            <path d="M123 44 H 224" stroke="#cfd0d7" strokeWidth={2} />
            <g fill="#1a7f37"><circle cx={146} cy={44} r={5} /><circle cx={172} cy={44} r={5} /><circle cx={198} cy={44} r={5} /></g>
            <rect x={224} y={28} width={30} height={32} rx={6} fill="#fff" stroke="#1a7f37" strokeWidth={2} />
            <path d="M224 37 H 254" stroke="#1a7f37" strokeWidth={2} />
          </svg>
          <FinaleText num="02 · LINE" title="Lead follow-up" body="One lead, a run of touches, a booked meeting." />
        </div>
        <div data-tc="" className={card} style={{ opacity: 0 }}>
          <svg width="100%" height={88} viewBox="0 0 260 88" fill="none" strokeLinecap="round" aria-hidden="true">
            <rect x={6} y={32} width={24} height={24} rx={5} fill="#fff" stroke="#1d1d1f" strokeWidth={2} />
            <path d="M30 44 H 52" stroke="#cfd0d7" strokeWidth={2} />
            <rect x={52} y={32} width={36} height={24} rx={7} fill="#1d1d1f" /><circle cx={74} cy={44} r={4} fill="#ff453a" />
            <path d="M88 44 H 110" stroke="#e0312b" strokeWidth={3} /><circle cx={110} cy={44} r={7} fill="#fff" stroke="#e0312b" strokeWidth={2} />
            <path d="M117 44 H 150" stroke="#cfd0d7" strokeWidth={2} />
            <circle cx={186} cy={44} r={36} stroke="#cfd0d7" strokeWidth={2} />
            <path d="M150 44 A 36 36 0 0 1 222 44" stroke="#e0312b" strokeWidth={3} />
            <circle cx={186} cy={8} r={5} fill="#1d1d1f" /><circle cx={222} cy={44} r={5} fill="#e0312b" />
            <text x={186} y={50} textAnchor="middle" fontSize={18} fontWeight={600} fill="#1a7f37">$</text>
          </svg>
          <FinaleText num="03 · LOOP" title="Invoice follow-up" body="Reminders loop until it’s paid." />
        </div>
      </div>
      <div data-tc="" className={`bl-trio-foot ${mono} absolute inset-x-0 top-[432px] text-center text-xs tracking-[0.1em] text-muted uppercase`} style={{ opacity: 0 }}>
        <span className="mr-2 inline-block size-[7px] rounded-full bg-ink align-[1px]" />Lane does the work
        <span className="mr-2 ml-6 inline-block size-[7px] rounded-full bg-lane align-[1px]" />You give the OK
      </div>
    </div>
  );
}

function FinaleText({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <>
      <div className="mt-[18px] font-mono text-xs tracking-[0.06em] text-lane">{num}</div>
      <div className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{title}</div>
      <div className="mt-1.5 text-[15px] leading-[1.4] text-muted">{body}</div>
    </>
  );
}
