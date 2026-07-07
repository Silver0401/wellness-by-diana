import type { SVGProps } from "react";

export function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M6 20c0-8 4-14 13-15 .6 9-3 14-11 14" />
      <path d="M6 20c2-5 5-8 9-10" />
    </svg>
  );
}

export function TargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 6.5C10.5 5 8.5 4.5 5.5 4.5c-.8 0-1.5.1-2 .2V19c.5-.1 1.2-.2 2-.2 3 0 5 .5 6.5 2 1.5-1.5 3.5-2 6.5-2 .8 0 1.5.1 2 .2V4.7c-.5-.1-1.2-.2-2-.2-3 0-5 .5-6.5 2Z" />
      <path d="M12 6.5v14.3" />
    </svg>
  );
}

export function FlaskIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M9.5 3h5M10.5 3v5.2L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3l-5.7-9.8V3" />
      <path d="M7.5 14.5h9" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.6 3c.35 2.1 1.85 3.72 4.4 3.9v3.02c-1.6.08-3.05-.36-4.4-1.26v6.44c0 4.06-2.86 6.4-6.06 6.4C7.3 21.5 4.5 19.06 4.5 15.7c0-3.42 2.92-5.86 6.34-5.62v3.1c-.4-.1-.8-.14-1.2-.1-1.42.14-2.34 1.16-2.34 2.56 0 1.5 1.14 2.6 2.7 2.6 1.62 0 2.76-1.16 2.76-2.94V3h3.84Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.2c-5.4 0-9.8 4.36-9.8 9.74 0 1.72.46 3.38 1.32 4.86L2.1 21.9l5.24-1.36a9.86 9.86 0 0 0 4.66 1.18c5.4 0 9.8-4.36 9.8-9.74S17.4 2.2 12 2.2Zm0 17.8a8.1 8.1 0 0 1-4.12-1.12l-.3-.18-3.1.8.84-3-.2-.32a7.94 7.94 0 0 1-1.24-4.24c0-4.42 3.64-8.02 8.12-8.02s8.12 3.6 8.12 8.02c0 4.42-3.64 8.06-8.12 8.06Zm4.46-6.02c-.24-.12-1.44-.7-1.66-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.38.1-.5.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.24 1.03.39 1.38.5.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.48-.28Z" />
    </svg>
  );
}

export function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden {...props}>
      <path d="M6 1v12M1 8l5 5 5-5" />
    </svg>
  );
}
