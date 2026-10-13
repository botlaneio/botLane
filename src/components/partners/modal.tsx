"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/** A native <dialog> that opens on mount and closes by going back in history. */
export function Modal({ children, label }: { children: ReactNode; label: string }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  const close = () => router.back();

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault(); // Esc: let the router close it so the URL updates
        close();
      }}
      onClick={(e) => {
        if (e.target === ref.current) close(); // click on the backdrop
      }}
      className="bl-modal m-auto h-dvh max-h-dvh w-full max-w-full overflow-y-auto bg-transparent p-0 text-ink backdrop:bg-[rgba(20,20,30,0.42)] backdrop:backdrop-blur-[6px] md:h-auto md:max-h-[calc(100dvh-48px)] md:max-w-[880px] md:overflow-visible"
    >
      <div className="relative min-h-full md:min-h-0">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-[0_2px_8px_rgba(20,20,40,0.12)] hover:bg-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </dialog>
  );
}
