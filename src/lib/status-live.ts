import { BRAND } from "@/lib/brand";

export type LiveStatusIncident = {
  id: string;
  title: string;
  status: string;
  service: string | null;
  createdAt: string;
  resolvedAt: string | null;
};

export type LiveStatusService = {
  name: string;
  status: string;
  activeIncidents?: number;
};

export type LiveStatusPage = {
  status: string;
  updatedAt?: string;
  services: LiveStatusService[];
  incidents: LiveStatusIncident[];
};

export async function getLiveStatusPage(): Promise<LiveStatusPage | null> {
  try {
    const res = await fetch(`${BRAND.links.status.replace(/\/$/, "")}/api/status`, {
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<LiveStatusPage>;
    return {
      status: data.status || "unknown",
      updatedAt: data.updatedAt,
      services: Array.isArray(data.services) ? data.services : [],
      incidents: Array.isArray(data.incidents) ? data.incidents : [],
    };
  } catch {
    return null;
  }
}
