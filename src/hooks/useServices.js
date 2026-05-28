/* useServices — busca os serviços reais da API (com preço "a partir de").
 * Retorna `services` = null enquanto carrega/sem config, ou um array mapeado. */

import { useState, useEffect } from 'react';
import { fetchServices, hasApiConfig } from '../lib/api.js';

export function useServices() {
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(hasApiConfig);

  useEffect(() => {
    if (!hasApiConfig) return;
    let alive = true;
    fetchServices()
      .then((s) => { if (alive) setServices(s); })
      .catch((e) => { console.warn('[services]', e.message); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return { services, loading };
}
