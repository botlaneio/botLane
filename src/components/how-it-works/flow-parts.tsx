import type { ComponentType } from "react";
import { Check, FileText, Lock, Mail, MessageSquare, Receipt } from "lucide-react";
import {
  GmailLogo,
  GoogleAdsLogo,
  HubSpotLogo,
  MetaAdsLogo,
  QuickBooksLogo,
  StripeLogo,
} from "@/components/assemble/company-icons";
import { pathsFor, type FlowLayout } from "./layout";

/**
 * The pieces of the How it works story. Each draft card is one element from start to finish:
 * it appears beside Lane, moves onto the approval desk, is approved, and is sent. Its status
 * line has three stacked states that the timeline cross-fades.
 */

type Logo = ComponentType<{ size?: number; className?: string }>;

export const TOOLS: { name: string; logo: Logo; badge: string }[] = [
  { name: "Google Ads", logo: GoogleAdsLogo, badge: "4" },
  { name: "HubSpot", logo: HubSpotLogo, badge: "12" },
  { name: "Gmail", logo: GmailLogo, badge: "38" },
  { name: "Stripe", logo: StripeLogo, badge: "3" },
  { name: "Meta Ads", logo: MetaAdsLogo, badge: "2" },
  { name: "QuickBooks", logo: QuickBooksLogo, badge: "7" },
];

export const DRAFTS = [
  { icon: FileText, title: "Weekly client report", sub: "Acme Co · sources linked", dest: "Client inbox" },
  { icon: MessageSquare, title: "Reply to a new lead", sub: "Orbit Retail · in your tone", dest: "Lead's inbox" },
  { icon: Receipt, title: "Payment reminder", sub: "Invoice #1042 · 12 days late", dest: "Billing contact" },
];

export function FlowPaths({ layout }: { layout: FlowLayout }) {
  const { toolWires, laneWires, sendWires } = pathsFor(layout);
  return (
    <svg
      className="absolute top-0 left-0 overflow-visible"
      width={layout.W}
      height={layout.H}
      viewBox={`0 0 ${layout.W} ${layout.H}`}
      style={{ zIndex: 1 }}
      aria-hidden
    >
      <g data-tool-wires>
        {toolWires.map((d, i) => (
          <path key={i} data-tool-wire d={d} fill="none" stroke="#d4d4da" strokeWidth="1.5" strokeLinecap="round" />
        ))}
      </g>
      <g data-lane-wires>
        {laneWires.map((d, i) => (
          <path key={i} data-lane-wire d={d} fill="none" stroke="#e0312b" strokeWidth="2" strokeLinecap="round" />
        ))}
      </g>
      {sendWires.map((d, i) => (
        <path key={i} data-send-wire d={d} fill="none" stroke="#059669" strokeWidth="1.6" strokeDasharray="4 5" />
      ))}
    </svg>
  );
}

export function Tools({ layout }: { layout: FlowLayout }) {
  const s = layout.tile;
  return (
    <>
      {TOOLS.map(({ name, logo: Logo, badge }, i) => {
        const p = layout.scatter[i];
        return (
          <div
            key={name}
            data-tool
            className="absolute top-0 left-0"
            style={{ transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotate}deg)`, zIndex: 3 }}
          >
            <div
              className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[16px] border border-line bg-white shadow-[0_10px_24px_-12px_rgba(20,20,40,0.25)]"
              style={{ width: s, height: s }}
            >
              <Logo size={Math.round(s * 0.45)} />
              <span
                data-tool-badge
                className="absolute -top-[7px] -right-[7px] flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-lane px-1.5 font-mono text-[10px] font-semibold text-white opacity-0"
              >
                {badge}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export function Core({ layout }: { layout: FlowLayout }) {
  const { core, coreSize: s, scope } = layout;
  return (
    <div data-core-group className="absolute top-0 left-0 opacity-0" style={{ zIndex: 3 }}>
      <div
        data-core
        className="absolute flex items-center justify-center rounded-full bg-ink shadow-[0_16px_40px_rgba(20,20,40,0.22)]"
        style={{ left: core.x - s / 2, top: core.y - s / 2, width: s, height: s }}
      >
        <span className="size-[14px] rounded-full bg-lane" />
        <span className="absolute -bottom-[2px] translate-y-full pt-1.5 text-[12px] font-semibold text-ink">Lane</span>
      </div>
      <div
        data-scope
        className="absolute flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[11.5px] whitespace-nowrap text-ink-2 shadow-sm"
        style={{ left: scope.x, top: scope.y }}
      >
        <Lock size={12} className="text-lane" />
        Reads only what each system needs
      </div>
    </div>
  );
}

export function Desk({ layout }: { layout: FlowLayout }) {
  const { desk } = layout;
  return (
    <div
      data-desk
      className="absolute rounded-[22px] border border-line bg-[#fbfbfa] opacity-0 shadow-[0_24px_60px_-28px_rgba(20,20,40,0.28)]"
      style={{ left: desk.x - desk.w / 2, top: desk.y - desk.h / 2, width: desk.w, height: desk.h, zIndex: 2 }}
    >
      <div className="flex h-[40px] items-center justify-between border-b border-line px-4">
        <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
          <span className="size-2 rounded-full bg-lane" />
          Approval desk
        </span>
        <span data-desk-count className="font-mono text-[11px] text-muted">
          3 waiting
        </span>
      </div>
    </div>
  );
}

export function Cards({ layout }: { layout: FlowLayout }) {
  const { card } = layout;
  // Phones get taller cards: title on top, then the status and the Approve button on their own row.
  const roomy = layout.key === "mobile";
  return (
    <>
      {DRAFTS.map(({ icon: Icon, title, sub }, i) => {
        const p = layout.drafts[i];
        const status = (
          <div className={`relative ${roomy ? "h-[18px] flex-1 text-[13px]" : "mt-1 h-[15px] text-[11px]"}`}>
            <span data-s-draft className="absolute inset-0 flex items-center gap-1.5 whitespace-nowrap text-faint">
              <span className="size-1.5 rounded-full bg-[#c7c7cc]" />
              Drafting…
            </span>
            <span data-s-ready className="absolute inset-0 flex items-center gap-1.5 whitespace-nowrap font-medium text-amber-600 opacity-0">
              <span className="size-1.5 rounded-full bg-amber-500" />
              Waiting for your review
            </span>
            <span data-s-sent className="absolute inset-0 flex items-center gap-1.5 whitespace-nowrap font-medium text-emerald-600 opacity-0">
              <Check size={roomy ? 13 : 11} strokeWidth={3} />
              Sent · approved by you
            </span>
          </div>
        );
        const approve = (
          <span
            data-approve
            className={`relative flex shrink-0 items-center justify-center rounded-[8px] bg-[#2c2c30] font-semibold text-white opacity-0 ${
              roomy ? "h-[34px] w-[96px] text-[13px]" : "h-[30px] w-[78px] text-[11.5px]"
            }`}
          >
            <span data-approve-idle>Approve</span>
            <span data-approve-done className="absolute inset-0 flex items-center justify-center opacity-0">
              <Check size={roomy ? 17 : 15} strokeWidth={3} />
            </span>
          </span>
        );
        return (
          <div key={title} data-card className="absolute top-0 left-0" style={{ transform: `translate(${p.x}px, ${p.y}px)`, zIndex: 4 }}>
            <div
              data-card-box
              className={`absolute top-0 left-0 flex rounded-[16px] border border-line bg-white opacity-0 shadow-[0_10px_28px_-16px_rgba(20,20,40,0.3)] ${
                roomy ? "flex-col justify-center gap-3 px-4" : "items-center gap-3 px-3.5"
              }`}
              style={{ left: -card.w / 2, top: -card.h / 2, width: card.w, height: card.h }}
            >
              {roomy ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[11px] bg-lane/10 text-lane">
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[16px] font-semibold text-ink">{title}</div>
                      <div className="truncate text-[13px] text-muted">{sub}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t border-line/70 pt-2.5">
                    {status}
                    {approve}
                  </div>
                </>
              ) : (
                <>
                  <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[10px] bg-lane/10 text-lane">
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold text-ink">{title}</div>
                    <div className="truncate text-[11px] text-muted">{sub}</div>
                    {status}
                  </div>
                  {approve}
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export function Destinations({ layout }: { layout: FlowLayout }) {
  const { dest } = layout;
  const compact = layout.key === "mobile";
  return (
    <>
      {DRAFTS.map(({ dest: label }, i) => {
        const p = layout.dests[i];
        return (
          <div
            key={label}
            data-dest
            className="absolute flex items-center gap-2 rounded-[12px] border border-line bg-white px-2.5 opacity-0 shadow-sm"
            style={{ left: p.x - dest.w / 2, top: p.y - dest.h / 2, width: dest.w, height: dest.h, zIndex: 3 }}
          >
            <span data-dest-icon className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-surface text-ink-2">
              <Mail size={13} />
            </span>
            <div className="min-w-0">
              <div className={`truncate font-medium text-ink ${compact ? "text-[10.5px]" : "text-[12px]"}`}>{label}</div>
              <div data-dest-done className="text-[10.5px] font-medium text-emerald-600 opacity-0">
                Delivered
              </div>
            </div>
          </div>
        );
      })}
      {layout.sendFrom.map((p, i) => (
        <span
          key={i}
          data-send-dot
          className="absolute top-0 left-0 size-[10px] rounded-full bg-emerald-600 opacity-0 shadow-[0_0_0_4px_rgba(5,150,105,0.15)]"
          style={{ transform: `translate(${p.x - 5}px, ${p.y - 5}px)`, zIndex: 5 }}
        />
      ))}
    </>
  );
}
