import { CONFIG } from 'src/config-global';

import { CreateComanda } from 'src/sections/create_comanda/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`crear comanda - ${CONFIG.appName}`}</title>

      <CreateComanda />
    </>
  );
}
