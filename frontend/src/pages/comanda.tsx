import { CONFIG } from 'src/config-global';

import { ComandaView } from 'src/sections/comanda/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Comandes - ${CONFIG.appName}`}</title>

      <ComandaView />
    </>
  );
}
