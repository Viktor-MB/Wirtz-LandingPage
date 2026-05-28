/* useProviders — busca os médicos reais da API.
 * Retorna `providers` = null enquanto carrega/sem config, ou um array mapeado.
 * Quem consome usa fallback ao conteúdo curado quando vier null ou vazio. */

import { useState, useEffect } from 'react';
import { fetchProviders, hasApiConfig } from '../lib/api.js';

export function useProviders() {
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(hasApiConfig);

  useEffect(() => {
    if (!hasApiConfig) return;
    let alive = true;
    fetchProviders()
      .then((p) => { if (alive) setProviders(p); })
      .catch((e) => { console.warn('[providers]', e.message); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return { providers, loading };
}
