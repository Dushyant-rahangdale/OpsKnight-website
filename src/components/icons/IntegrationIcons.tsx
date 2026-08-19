import React from "react";
import { Mail, MessageSquare, Bell } from "lucide-react";

// Official vector logos for all 24+ OpsKnight integrations
export const integrationIcons = {
    email: <Mail className="w-full h-full text-blue-400" />,
    sms: <MessageSquare className="w-full h-full text-blue-400" />,
    push: <Bell className="w-full h-full text-blue-400" />,
    
    // AWS CloudWatch
    cloudwatch: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#232F3E" />
            <path d="M20 7L8 13.5v13L20 33l12-6.5v-13L20 7z" stroke="#FF9900" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M20 14l-6 3.5v6l6 3.5 6-3.5v-6l-6-3.5z" fill="#FF9900" />
            <path d="M20 7v7m0 12v7m12-13.5l-6-3.5m-12 7l-6 3.5" stroke="#FF9900" strokeWidth="1.5" />
        </svg>
    ),

    // Datadog
    datadog: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#632CA6" />
            <path d="M29.5 22.8c-.3-.2-.7-.3-1.1-.3-.6 0-1.1.2-1.5.6-.4.4-.6.9-.6 1.5 0 .6.2 1.1.6 1.5.4.4.9.6 1.5.6.4 0 .8-.1 1.1-.3v2.8c-1.1.4-2.3.6-3.5.6-5.2 0-9.4-4.2-9.4-9.4 0-5.2 4.2-9.4 9.4-9.4 1.2 0 2.4.2 3.5.6v2.8c-.3-.2-.7-.3-1.1-.3-.6 0-1.1.2-1.5.6-.4.4-.6.9-.6 1.5 0 .6.2 1.1.6 1.5.4.4.9.6 1.5.6.4 0 .8-.1 1.1-.3v4.8z" fill="#FFFFFF" />
            <circle cx="14" cy="18" r="2.5" fill="#FFFFFF" />
        </svg>
    ),

    // Prometheus
    prometheus: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#E6522C" />
            <path d="M20 7c-4.4 0-8 3.6-8 8 0 2.2.9 4.2 2.3 5.7-.3.7-.3 1.6-.3 2.3 0 3.3 2.7 6 6 6s6-2.7 6-6c0-.7 0-1.6-.3-2.3 1.4-1.5 2.3-3.5 2.3-5.7 0-4.4-3.6-8-8-8zm-3 8c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm3 12c-1.7 0-3-1.3-3-3 0-.6.2-1.2.5-1.7.8.4 1.6.7 2.5.7s1.7-.3 2.5-.7c.3.5.5 1.1.5 1.7 0 1.7-1.3 3-3 3z" fill="#FFFFFF" />
        </svg>
    ),

    // Grafana
    grafana: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#F46800" />
            <path d="M24.8 12.5c-4.2-2.8-9.8-1.7-12.6 2.5-2.8 4.2-1.7 9.8 2.5 12.6 4.2 2.8 9.8 1.7 12.6-2.5 2.8-4.2 1.7-9.8-2.5-12.6zm-1.8 12.4c-3 2-7.1 1.2-9.1-1.8-2-3-1.2-7.1 1.8-9.1 3-2 7.1-1.2 9.1 1.8 2 3 1.2 7.1-1.8 9.1z" fill="#FFFFFF" />
            <circle cx="20" cy="20" r="3" fill="#FFFFFF" />
        </svg>
    ),

    // Sentry
    sentry: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#362D59" />
            <path d="M26.2 12.2c-.4-.7-1.3-.9-2-.5L14.7 17c-2.3 1.3-3.1 4.3-1.8 6.6 1.3 2.3 4.3 3.1 6.6 1.8l9.5-5.3c.7-.4.9-1.3.5-2-.4-.7-1.3-.9-2-.5l-9.5 5.3c-1.2.7-2.7.3-3.4-.9-.7-1.2-.3-2.7.9-3.4l9.5-5.3c.7-.4.9-1.3.7-2.1z" fill="#FF4646" />
            <path d="M22.5 8c-.8 0-1.5.7-1.5 1.5v4c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-4c0-.8-.7-1.5-1.5-1.5z" fill="#FFFFFF" />
        </svg>
    ),

    // New Relic
    newrelic: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#008C99" />
            <path d="M20 9l-9.5 5.5v11L20 31l9.5-5.5v-11L20 9zm0 3.5l6.5 3.8v7.4L20 27.5l-6.5-3.8v-7.4L20 12.5z" fill="#FFFFFF" />
            <path d="M20 16.5l3.5 2v4L20 24.5l-3.5-2v-4l3.5-2z" fill="#008C99" />
        </svg>
    ),

    // GitHub
    github: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#181717" />
            <path fillRule="evenodd" clipRule="evenodd" d="M20 8C13.37 8 8 13.37 8 20c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0032 20c0-6.63-5.37-12-12-12z" fill="#FFFFFF" />
        </svg>
    ),

    // Azure Monitor
    azure: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#0078D4" />
            <path d="M12 28.5l6.5-17h5l-6.5 17h-5zm7.5-6.5l4-7.5h8.5l-6.5 14h-6z" fill="#FFFFFF" />
        </svg>
    ),

    // Webhooks
    webhook: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#1E293B" />
            <path d="M14 16h6l-3 8h6l-8 10 3-10h-6l2-8z" fill="#38BDF8" />
            <circle cx="28" cy="14" r="3" fill="#38BDF8" />
            <path d="M22 14h3M28 17v3" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),

    // Google Cloud Monitoring
    googlecloud: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#1E293B" />
            <path d="M27.5 19.5c0-.4-.1-.8-.2-1.2H20v3.2h4.3c-.2 1-.8 1.9-1.6 2.5v2.1h2.6c1.5-1.4 2.4-3.6 2.4-6.6z" fill="#4285F4" />
            <path d="M20 27.5c2.1 0 3.9-.7 5.2-1.9l-2.6-2.1c-.7.5-1.6.8-2.6.8-2 0-3.7-1.4-4.3-3.2h-2.7v2.1c1.3 2.7 4 4.3 7 4.3z" fill="#34A853" />
            <path d="M15.7 21.1c-.2-.5-.3-1-.3-1.6s.1-1.1.3-1.6v-2.1h-2.7C12.4 17.1 12 18.5 12 20s.4 2.9 1 4.2l2.7-2.1v-1z" fill="#FBBC05" />
            <path d="M20 15.7c1.1 0 2.2.4 3 1.2l2.3-2.3C23.9 13.3 22.1 12.5 20 12.5c-3 0-5.7 1.6-7 4.3l2.7 2.1c.6-1.8 2.3-3.2 4.3-3.2z" fill="#EA4335" />
        </svg>
    ),

    // Splunk
    splunk: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#000000" />
            <path d="M14 13l7 7-7 7m7-14l7 7-7 7" stroke="#ED0080" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="28" cy="27" r="1.5" fill="#65A637" />
        </svg>
    ),

    // Dynatrace
    dynatrace: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#1496FF" />
            <path d="M12 20a8 8 0 1016 0 8 8 0 00-16 0zm8-5a5 5 0 110 10 5 5 0 010-10z" fill="#FFFFFF" />
            <path d="M20 9v4m0 14v4M9 20h4m14 0h4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),

    // AppDynamics
    appdynamics: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#00BCEB" />
            <path d="M20 9C13.9 9 9 13.9 9 20s4.9 11 11 11c3.8 0 7.2-1.9 9.2-4.9l-3.3-3.7c-1.3 1.9-3.4 3.1-5.9 3.1-3.9 0-7-3.1-7-7s3.1-7 7-7c2.5 0 4.6 1.2 5.9 3.1l3.3-3.7C27.2 10.9 23.8 9 20 9z" fill="#FFFFFF" />
        </svg>
    ),

    // Honeycomb
    honeycomb: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#F5A623" />
            <path d="M20 10l7.5 4.3v8.6L20 27.2l-7.5-4.3v-8.6L20 10z" fill="#FFFFFF" />
            <circle cx="20" cy="18.6" r="3" fill="#F5A623" />
        </svg>
    ),

    // Bitbucket
    bitbucket: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#0052CC" />
            <path d="M10 11h20l-2.5 16.5a1.5 1.5 0 01-1.5 1.3h-12a1.5 1.5 0 01-1.5-1.3L10 11zm5.5 11h9l1.2-6.5h-11.4l1.2 6.5z" fill="#FFFFFF" />
        </svg>
    ),

    // UptimeRobot
    uptimerobot: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#131A26" />
            <circle cx="20" cy="20" r="10" stroke="#3BD671" strokeWidth="3" />
            <path d="M20 14v6l4 3" stroke="#3BD671" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    ),

    // Pingdom
    pingdom: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#FFE500" />
            <circle cx="16" cy="20" r="4" fill="#0F172A" />
            <path d="M20 13a9 9 0 010 14" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            <path d="M23 10a13 13 0 010 20" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        </svg>
    ),

    // Better Stack
    betterstack: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#000000" />
            <path d="M12 14h16v3H12v-3zm0 5h16v3H12v-3zm0 5h16v3H12v-3z" fill="#FFFFFF" />
        </svg>
    ),

    // Uptime Kuma
    uptimekuma: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#5CDD8B" />
            <circle cx="15" cy="17" r="2.5" fill="#0F172A" />
            <circle cx="25" cy="17" r="2.5" fill="#0F172A" />
            <ellipse cx="20" cy="23" rx="4" ry="2.5" fill="#0F172A" />
        </svg>
    ),

    // Slack
    slack: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#4A154B" />
            <path d="M15 20a2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5h2.5v2.5z" fill="#E01E5A" />
            <path d="M16 20a2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5v6.5a2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5V20z" fill="#E01E5A" />
            <path d="M20 15a2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5v2.5H20z" fill="#36C5F0" />
            <path d="M20 16a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5H13.5a2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5H20z" fill="#36C5F0" />
            <path d="M25 20a2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5h-2.5V20z" fill="#2EB67D" />
            <path d="M24 20a2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5V13.5a2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5V20z" fill="#2EB67D" />
            <path d="M20 25a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5v-2.5H20z" fill="#ECB22E" />
            <path d="M20 24a2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5h6.5a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5H20z" fill="#ECB22E" />
        </svg>
    ),

    // Jira Cloud
    jira: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#0052CC" />
            <path d="M20 11h-7a1 1 0 00-1 1v7a9 9 0 009-9z" fill="#FFFFFF" />
            <path d="M28 19h-7a9 9 0 009 9v-8a1 1 0 00-1-1z" fill="#2684FF" />
            <path d="M20 19h-8a1 1 0 00-1 1v.5A8.5 8.5 0 0019.5 29H20a9 9 0 009-9v-1H20z" fill="#0052CC" />
        </svg>
    ),

    // PagerDuty
    pagerduty: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#000000" />
            <path d="M26.5 15.5H20v11h-4V10h10.5c3.5 0 5.5 2.2 5.5 5.5s-2 5.5-5.5 5.5zm-3.5 0c0-1.5-.9-2.3-2.5-2.3H20v4.6h.5c1.6 0 2.5-.8 2.5-2.3z" fill="#06AC38" />
        </svg>
    ),

    // Official Zabbix Vector Logo
    zabbix: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#D40000" />
            <path d="M12 13h16l-12 14h12" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter" />
        </svg>
    ),

    // Official Nagios Vector Logo
    nagios: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#005A9C" />
            <circle cx="20" cy="20" r="10" stroke="#FFFFFF" strokeWidth="2.5" />
            <circle cx="20" cy="20" r="5" fill="#FFFFFF" />
            <circle cx="21.5" cy="18.5" r="1.5" fill="#005A9C" />
            <path d="M10 20h3m14 0h3M20 10v3m0 14v3" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),

    // Official Icinga 2 Vector Logo
    icinga: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#00A2D3" />
            <circle cx="20" cy="14" r="3.5" fill="#FFFFFF" />
            <path d="M17 19h6v12h-6z" fill="#FFFFFF" />
            <path d="M15 19h2v12h-2z" fill="#FFFFFF" />
        </svg>
    ),

    // Official GitLab CI/CD Vector Logo
    gitlab: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#171321" />
            <path d="M29.5 23l-1.8-5.6-3.7-11.4c-.2-.5-.9-.5-1.1 0L19.5 16h-3L13.1 6c-.2-.5-.9-.5-1.1 0L8.3 17.4 6.5 23c-.3.9.1 1.9.8 2.5L20 34l12.7-8.5c.7-.6 1.1-1.6.8-2.5z" fill="#E24329" />
            <path d="M20 34L13.1 6c-.2-.5-.9-.5-1.1 0L8.3 17.4 20 34z" fill="#FC6D26" />
            <path d="M8.3 17.4h23.4L20 34 8.3 17.4z" fill="#FCA326" />
        </svg>
    ),

    // Official Vercel Vector Logo
    vercel: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#000000" />
            <path d="M20 10l10 18H10L20 10z" fill="#FFFFFF" />
        </svg>
    ),

    // Official WhatsApp Vector Logo
    whatsapp: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#25D366" />
            <path fillRule="evenodd" clipRule="evenodd" d="M20 10c-5.5 0-10 4.5-10 10 0 1.9.5 3.7 1.5 5.2L10 30l4.9-1.3c1.5.8 3.3 1.3 5.1 1.3 5.5 0 10-4.5 10-10S25.5 10 20 10zm4.8 13.9c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-2.9-.7-2.3-.9-3.9-3.2-4-3.3-.1-.2-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.8.2-.2.5-.3.7-.3.2 0 .3 0 .5.1.2 0 .4.4.6.8.2.5.7 1.6.7 1.8 0 .1 0 .3-.1.4-.1.1-.2.3-.3.4-.1.1-.2.3-.1.5.3.6 1.1 1.8 2.4 2.4.2.1.4.1.5 0 .2-.1.6-.7.8-.9.2-.3.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.3 0 1-.2 1.3z" fill="#FFFFFF" />
        </svg>
    ),

    // Official Kubernetes Helm Vector Logo
    kubernetes: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#326CE5" />
            <path d="M20 10l8 4.6v9.2L20 28.4l-8-4.6v-9.2L20 10z" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="20" cy="19.2" r="3" fill="#FFFFFF" />
            <path d="M20 10v6m8 3.2h-6M20 28.4v-6m-8-3.2h6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),

    // Official PostgreSQL Vector Logo
    postgres: (
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" rx="8" fill="#336791" />
            <path d="M20 11c-4.4 0-8 3.1-8 7 0 2.2 1.3 4.2 3.3 5.4v4.6l3.7-2.2c.3.1.7.2 1 .2 4.4 0 8-3.1 8-7s-3.6-8-8-8zm2 6.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zm-5 0c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z" fill="#FFFFFF" />
        </svg>
    ),
};

export type IntegrationKey = keyof typeof integrationIcons;
