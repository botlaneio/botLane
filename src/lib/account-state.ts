"use client";

import { useSyncExternalStore } from "react";

/**
 * Where a visitor stands with their BotLane account, read from the `bl_account` cookie:
 * - "guest": never signed up (no cookie)
 * - "member": has an account but is signed out ("member")
 * - "signed_in": signed in right now ("signed_in")
 *
 * Nothing sets the cookie yet. When real sign-in is added, it writes this cookie on
 * sign-up, sign-in and sign-out, and the header CTA follows automatically.
 */
export type AccountState = "guest" | "member" | "signed_in";

export const ACCOUNT_COOKIE = "bl_account";

function read(): AccountState {
  const match = document.cookie.match(new RegExp(`(?:^|; )${ACCOUNT_COOKIE}=([^;]*)`));
  const value = match?.[1];
  return value === "member" || value === "signed_in" ? value : "guest";
}

// Cookies have no change event; re-read when the tab regains focus.
function subscribe(onChange: () => void) {
  window.addEventListener("focus", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.removeEventListener("focus", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

export function useAccountState(): AccountState {
  return useSyncExternalStore(subscribe, read, () => "guest");
}

/** The header's call to action for each state; null means hide it. */
export function accountCta(state: AccountState) {
  if (state === "signed_in") return null;
  if (state === "member") return { href: "/signin", label: "Sign in" };
  return { href: "/signup", label: "Sign up" };
}
