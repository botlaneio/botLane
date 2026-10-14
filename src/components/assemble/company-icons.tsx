export interface CompanyIconProps {
  size?: number;
  className?: string;
}

export function GoogleAdsLogo({ size = 20, className }: CompanyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {/* Yellow pill */}
      <path
        d="M4.3 14.2L8.9 6.2C9.5 5.2 10.8 4.8 11.8 5.4L13.8 6.6C14.8 7.2 15.2 8.5 14.6 9.5L10 17.5C9.4 18.5 8.1 18.9 7.1 18.3L5.1 17.1C4.1 16.5 3.7 15.2 4.3 14.2Z"
        fill="#FBBC04"
      />
      {/* Blue pill */}
      <path
        d="M14.6 9.5C14 8.5 12.7 8.1 11.7 8.7L9.7 9.9C8.7 10.5 8.3 11.8 8.9 12.8L13.5 20.8C14.1 21.8 15.4 22.2 16.4 21.6L18.4 20.4C19.4 19.8 19.8 18.5 19.2 17.5L14.6 9.5Z"
        fill="#4285F4"
      />
      {/* Green circle */}
      <circle cx="6.5" cy="17.7" r="2.5" fill="#34A853" />
    </svg>
  );
}

export function GoogleAnalyticsLogo({ size = 20, className }: CompanyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {/* Tallest bar (right) */}
      <path
        d="M19.5 19.5H17.8C17.1 19.5 16.5 18.9 16.5 18.2V5.8C16.5 5.1 17.1 4.5 17.8 4.5H19.5C20.2 4.5 20.8 5.1 20.8 5.8V18.2C20.8 18.9 20.2 19.5 19.5 19.5Z"
        fill="#E37400"
      />
      {/* Middle bar */}
      <path
        d="M13.2 19.5H11.5C10.8 19.5 10.2 18.9 10.2 18.2V10.8C10.2 10.1 10.8 9.5 11.5 9.5H13.2C13.9 9.5 14.5 10.1 14.5 10.8V18.2C14.5 18.9 13.9 19.5 13.2 19.5Z"
        fill="#F9AB00"
      />
      {/* Circle dot (left) */}
      <circle cx="6" cy="17" r="2.5" fill="#E37400" />
    </svg>
  );
}

export function MetaAdsLogo({ size = 20, className }: CompanyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 9.75c-1.12-1.78-2.68-2.75-4.5-2.75-3.3 0-5.5 2.55-5.5 5.5 0 2.95 2.2 5.5 5.5 5.5 1.82 0 3.38-.97 4.5-2.75 1.12 1.78 2.68 2.75 4.5 2.75 3.3 0 5.5-2.55 5.5-5.5 0-2.95-2.2-5.5-5.5-5.5-1.82 0-3.38.97-4.5 2.75zm-4.5 6.25c-1.93 0-3.25-1.57-3.25-3.5s1.32-3.5 3.25-3.5c1.45 0 2.62.95 3.25 2.38-.63 1.43-1.8 2.62-3.25 2.62zm9 0c-1.45 0-2.62-1.19-3.25-2.62.63-1.43 1.8-2.38 3.25-2.38 1.93 0 3.25 1.57 3.25 3.5s-1.32 3.5-3.25 3.5z"
        fill="#0081FB"
      />
    </svg>
  );
}

export function HubSpotLogo({ size = 20, className }: CompanyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M17.8 7.6V5.2c.7-.3 1.2-1 1.2-1.8 0-1.1-.9-2-2-2s-2 .9-2 2c0 .8.5 1.5 1.2 1.8v2.4c-.6.2-1.1.6-1.5 1.1L8.5 6.2c.1-.2.1-.5.1-.8 0-1.4-1.1-2.5-2.5-2.5S3.6 4 3.6 5.4c0 1.4 1.1 2.5 2.5 2.5.5 0 1-.1 1.4-.4l6.1 2.5c-.1.4-.1.8-.1 1.2 0 .4 0 .8.1 1.2l-6.1 2.5c-.4-.3-.9-.4-1.4-.4-1.4 0-2.5 1.1-2.5 2.5 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0-.3 0-.6-.1-.8l6.2-2.5c.4.5.9.9 1.5 1.1v2.4c-.7.3-1.2 1-1.2 1.8 0 1.1.9 2 2 2s2-.9 2-2c0-.8-.5-1.5-1.2-1.8v-2.4c1.1-.4 1.9-1.4 1.9-2.7 0-1.3-.8-2.3-1.9-2.7zM17 13.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"
        fill="#FF7A59"
      />
    </svg>
  );
}

export function StripeLogo({ size = 20, className }: CompanyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#635BFF" />
      <path
        d="M10.8 9.5c0-.7.6-1 1.5-1 1.4 0 3.1.5 4.1 1.1V6.2c-1.1-.5-2.6-.8-4.1-.8-3.7 0-6.1 1.9-6.1 5.2 0 5 6.9 4.2 6.9 6.4 0 .8-.7 1.1-1.8 1.1-1.6 0-3.6-.7-4.8-1.4v3.5c1.3.6 3.1.9 4.8.9 3.8 0 6.4-1.9 6.4-5.2 0-5.4-6.9-4.5-6.9-6.4z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function QuickBooksLogo({ size = 20, className }: CompanyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#2CA01C" />
      <path
        d="M9.5 15.5h-1c-1.7 0-3-1.3-3-3s1.3-3 3-3h1v1.6h-1c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4h1v-1.4H11v3.5c0 .3-.2.5-.5.5zm5-7h1c1.7 0 3 1.3 3 3s-1.3 3-3 3h-1v-1.6h1c.8 0 1.4-.6 1.4-1.4s-.6-1.4-1.4-1.4h-1v1.4H13V9c0-.3.2-.5.5-.5z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function GoogleCalendarLogo({ size = 20, className }: CompanyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="4" width="19" height="17" rx="3.5" fill="#ffffff" stroke="#dadce0" strokeWidth="1" />
      <path d="M2.5 7.5a3.5 3.5 0 0 1 3.5-3.5h12a3.5 3.5 0 0 1 3.5 3.5v2h-19v-2z" fill="#4285F4" />
      <path d="M7 2v4M17 2v4" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" />
      <text
        x="12"
        y="18"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="700"
        fill="#1d1d1f"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        31
      </text>
    </svg>
  );
}

export function TypeformLogo({ size = 20, className }: CompanyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#262627" />
      <path
        d="M6 9.5c0-.8.7-1.5 1.5-1.5h9c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-3v5.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V11h-3c-.8 0-1.5-.7-1.5-1.5z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function GmailLogo({ size = 20, className }: CompanyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4.5 19.5h3v-7.5L3 8.25V18c0 .83.67 1.5 1.5 1.5z" fill="#4285F4" />
      <path d="M16.5 19.5h3c.83 0 1.5-.67 1.5-1.5V8.25L16.5 12v7.5z" fill="#34A853" />
      <path
        d="M16.5 4.5l-4.5 3.38L7.5 4.5H4.5c-.83 0-1.5.67-1.5 1.5v2.25l9 6.75 9-6.75V6c0-.83-.67-1.5-1.5-1.5h-3z"
        fill="#EA4335"
      />
      <path d="M7.5 4.5v7.5l4.5-3.38V4.5z" fill="#FBBC04" />
    </svg>
  );
}

export function GoogleDriveLogo({ size = 20, className }: CompanyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8.2 4.5l-5.7 9.8 3.5 6.2 5.7-9.8z" fill="#0066DA" />
      <path d="M15.8 4.5H8.2l5.7 9.8h7.6z" fill="#00AC47" />
      <path d="M19.5 20.5H6l3.5-6.2h13.5z" fill="#FFBA00" />
    </svg>
  );
}

export function PlaidLogo({ size = 20, className }: CompanyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#0A0A0B" />
      <path
        d="M6.5 6.5h3.2v3.2H6.5zM14.3 6.5h3.2v3.2h-3.2zM6.5 14.3h3.2v3.2H6.5zM14.3 14.3h3.2v3.2h-3.2zM10.4 10.4h3.2v3.2h-3.2z"
        fill="#ffffff"
      />
    </svg>
  );
}
