'use client';

import { useEffect } from 'react';
import type { StatementsConfig } from '@/lib/content';
import { registerQuickscanTools } from '@/lib/webmcp';

/**
 * Registreert de quickscan-tools op `window.webmcp` zodra de component op de
 * client mount. Rendert niets — puur side-effect.
 *
 * Plaatsing buiten de dynamisch geladen `QuickscanApp` zodat de registratie
 * gebeurt zodra de pagina hydrateert (eerder = beter voor Lighthouse-snapshots
 * en agent-discovery). In browsers zonder WebMCP-API is dit een no-op.
 */
export function WebMCPRegistration({
  statements,
}: {
  statements: StatementsConfig;
}) {
  useEffect(() => {
    registerQuickscanTools(statements);
  }, [statements]);
  return null;
}
