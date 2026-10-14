import Link from "next/link";

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="text-[21px] font-semibold tracking-[-0.035em] no-underline" aria-label="BotLane home">
      botlane
    </Link>
  );
}
