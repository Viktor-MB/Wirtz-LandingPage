/* useClinicData — popula os números do hero e do TrustStrip com os dados da
 * API. Começa com o mock (para a primeira pintura nunca ficar vazia) e, se a
 * API estiver configurada, substitui pelos dados reais. `loading` permite um
 * indicador discreto enquanto a requisição acontece. */

import { useState, useEffect } from 'react';
import { fetchClinicData, MOCK_CLINIC_DATA } from '../lib/api.js';

export function useClinicData() {
  const [data, setData] = useState(MOCK_CLINIC_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchClinicData()
      .then((d) => { if (alive) setData(d); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return { data, loading };
}
