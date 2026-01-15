// Integration SVG icons - simple, recognizable logos
export const integrationIcons = {
    cloudwatch: (
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
            <path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 3.5l11 5.5-11 5.5-11-5.5 11-5.5z" fill="#FF9900" />
            <path d="M20 20v12l11-5.5v-12L20 20z" fill="#FF9900" opacity="0.7" />
            <path d="M20 20v12L9 26.5v-12L20 20z" fill="#FF9900" opacity="0.5" />
        </svg>
    ),
    datadog: (
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
            <circle cx="20" cy="20" r="16" fill="#632CA6" />
            <path d="M28 16c-2 0-3 1-4 2l-2-1c0-2-1-3-3-3s-3 1-3 3l-2 1c-1-1-2-2-4-2-2 0-4 2-4 4s2 4 4 4c2 0 3-1 4-2l2 1c0 2 1 3 3 3s3-1 3-3l2-1c1 1 2 2 4 2 2 0 4-2 4-4s-2-4-4-4z" fill="white" />
        </svg>
    ),
    prometheus: (
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
            <circle cx="20" cy="20" r="16" fill="#E6522C" />
            <path d="M20 8a12 12 0 100 24 12 12 0 000-24zm0 4a2 2 0 110 4 2 2 0 010-4zm-6 4a2 2 0 110 4 2 2 0 010-4zm12 0a2 2 0 110 4 2 2 0 010-4zm-6 6a2 2 0 110 4 2 2 0 010-4z" fill="white" />
        </svg>
    ),
    grafana: (
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
            <circle cx="20" cy="20" r="16" fill="#F46800" />
            <circle cx="20" cy="20" r="8" fill="white" />
            <circle cx="20" cy="20" r="4" fill="#F46800" />
        </svg>
    ),
    sentry: (
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
            <circle cx="20" cy="20" r="16" fill="#362D59" />
            <path d="M20 10c-5.5 0-10 4.5-10 10h4c0-3.3 2.7-6 6-6s6 2.7 6 6h4c0-5.5-4.5-10-10-10z" fill="#FB4226" />
        </svg>
    ),
    newrelic: (
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
            <rect x="4" y="4" width="32" height="32" rx="4" fill="#00AC69" />
            <path d="M20 12l-8 4.5v9L20 30l8-4.5v-9L20 12z" fill="white" />
        </svg>
    ),
    github: (
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
            <circle cx="20" cy="20" r="16" fill="#24292E" />
            <path d="M20 8a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0020 8z" fill="white" />
        </svg>
    ),
    azure: (
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
            <rect x="4" y="4" width="32" height="32" rx="4" fill="#0078D4" />
            <path d="M13 28l7-20h4l-11 20h-4zm9-8l5 8h8l-8-12-5 4z" fill="white" />
        </svg>
    ),
    pagerduty: (
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
            <rect x="4" y="4" width="32" height="32" rx="4" fill="#06AC38" />
            <path d="M14 12h8c3 0 6 2 6 6s-3 6-6 6h-4v6h-4V12zm4 8h4c1 0 2-1 2-2s-1-2-2-2h-4v4z" fill="white" />
        </svg>
    ),
    opsgenie: (
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
            <rect x="4" y="4" width="32" height="32" rx="4" fill="#2684FF" />
            <circle cx="20" cy="16" r="6" fill="white" />
            <path d="M12 26c0-4 4-6 8-6s8 2 8 6" fill="white" />
        </svg>
    ),
    webhook: (
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
            <rect x="4" y="4" width="32" height="32" rx="4" fill="#4A5568" />
            <path d="M14 20h4l-2 6h4l-6 8 2-8h-4l2-6zm8 0h4l2-6h-4l6-8-2 8h4l-2 6h-4" fill="#10B981" />
        </svg>
    ),
};

export type IntegrationKey = keyof typeof integrationIcons;
