// Shared AT Protocol resolvers, mirroring the setup used across the Raycast
// extension's commands. Defined once and reused by every command entry point.
import { isAtprotoDid } from "@atcute/identity";
import { isHandle, type Handle } from "@atcute/lexicons/syntax";
import {
  CompositeDidDocumentResolver,
  PlcDidDocumentResolver,
  AtprotoWebDidDocumentResolver,
  WellKnownHandleResolver,
} from "@atcute/identity-resolver";
import { NodeDnsHandleResolver } from "@atcute/identity-resolver-node";

export const didDocumentResolver = new CompositeDidDocumentResolver({
  methods: {
    plc: new PlcDidDocumentResolver(),
    web: new AtprotoWebDidDocumentResolver(),
  },
});

export const dnsResolver = new NodeDnsHandleResolver();
export const httpResolver = new WellKnownHandleResolver();

/**
 * Resolve a handle or DID query to a DID, trying DNS then HTTP for handles.
 * Returns null when the query is neither a valid DID nor handle, or resolution fails.
 */
export async function resolveToDid(query: string): Promise<string | null> {
  if (isAtprotoDid(query)) {
    return query;
  }
  if (isHandle(query)) {
    try {
      return await dnsResolver.resolve(query as Handle);
    } catch {
      try {
        return await httpResolver.resolve(query as Handle);
      } catch {
        return null;
      }
    }
  }
  return null;
}

/** Strip a single leading "@" from a query, matching the Raycast behavior. */
export function normalizeQuery(raw: string): string {
  const trimmed = raw.trim();
  return trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
}
