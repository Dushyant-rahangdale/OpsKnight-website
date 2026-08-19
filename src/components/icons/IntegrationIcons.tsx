import React from "react";
import Image from "next/image";
import { Mail, MessageSquare, Bell, Webhook } from "lucide-react";

// Real, Official Brand Logos loaded directly from authentic SVG assets in /public/integrations/
export const integrationIcons = {
    email: <Mail className="w-full h-full text-blue-400 p-1.5" />,
    sms: <MessageSquare className="w-full h-full text-blue-400 p-1.5" />,
    push: <Bell className="w-full h-full text-blue-400 p-1.5" />,
    webhook: <Webhook className="w-full h-full text-sky-400 p-1.5" />,

    // APM & Observability
    datadog: (
        <Image src="/integrations/datadog.svg" alt="Datadog" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    prometheus: (
        <Image src="/integrations/prometheus.svg" alt="Prometheus" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    grafana: (
        <Image src="/integrations/grafana.svg" alt="Grafana" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    sentry: (
        <Image src="/integrations/sentry.svg" alt="Sentry" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    newrelic: (
        <Image src="/integrations/newrelic.svg" alt="New Relic" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    dynatrace: (
        <Image src="/integrations/dynatrace.svg" alt="Dynatrace" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    appdynamics: (
        <Image src="/integrations/appdynamics.svg" alt="AppDynamics" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    honeycomb: (
        <Image src="/integrations/honeycomb.svg" alt="Honeycomb" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    splunk: (
        <Image src="/integrations/splunk.svg" alt="Splunk" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),

    // Cloud Infrastructure
    cloudwatch: (
        <Image src="/integrations/cloudwatch.svg" alt="AWS CloudWatch" width={40} height={40} className="w-full h-full object-contain p-0.5" />
    ),
    azure: (
        <Image src="/integrations/azure.svg" alt="Microsoft Azure" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    googlecloud: (
        <Image src="/integrations/googlecloud.svg" alt="Google Cloud" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),

    // Metrics & Daemons
    zabbix: (
        <Image src="/integrations/zabbix.svg" alt="Zabbix" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    nagios: (
        <Image src="/integrations/nagios.svg" alt="Nagios" width={40} height={40} className="w-full h-full object-contain p-0.5" />
    ),
    icinga: (
        <Image src="/integrations/icinga.svg" alt="Icinga 2" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),

    // CI/CD & Deployments
    github: (
        <Image src="/integrations/github.svg" alt="GitHub" width={40} height={40} className="w-full h-full object-contain p-1 invert dark:invert-0" />
    ),
    gitlab: (
        <Image src="/integrations/gitlab.svg" alt="GitLab" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    bitbucket: (
        <Image src="/integrations/bitbucket.svg" alt="Bitbucket" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    vercel: (
        <Image src="/integrations/vercel.svg" alt="Vercel" width={40} height={40} className="w-full h-full object-contain p-1.5" />
    ),

    // Uptime & Synthetics
    uptimerobot: (
        <Image src="/integrations/uptimerobot.svg" alt="UptimeRobot" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    pingdom: (
        <Image src="/integrations/pingdom.svg" alt="Pingdom" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    betterstack: (
        <Image src="/integrations/betterstack.svg" alt="Better Stack" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    uptimekuma: (
        <Image src="/integrations/uptimekuma.svg" alt="Uptime Kuma" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),

    // ChatOps & Alerts
    slack: (
        <Image src="/integrations/slack.svg" alt="Slack" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    jira: (
        <Image src="/integrations/jira.svg" alt="Jira Cloud" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    whatsapp: (
        <Image src="/integrations/whatsapp.svg" alt="WhatsApp" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    pagerduty: (
        <Image src="/integrations/pagerduty.svg" alt="PagerDuty" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),

    // Core & Database
    kubernetes: (
        <Image src="/integrations/kubernetes.svg" alt="Kubernetes" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
    postgres: (
        <Image src="/integrations/postgres.svg" alt="PostgreSQL" width={40} height={40} className="w-full h-full object-contain p-1" />
    ),
};

export type IntegrationKey = keyof typeof integrationIcons;
