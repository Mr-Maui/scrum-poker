# Public certificate regression fixture

`emsign-ecc-g3.pem` is the public **emSign ECC Root CA - G3** certificate from
certifi 2026.7.22's `cacert.pem`, predating its removal. It is deliberately
untrusted test data; it must never be installed as a trusted root. No private key
is included, and no code from the old certifi package is executed.

Source: [certifi's published 2026.7.22 distribution](https://pypi.org/project/certifi/2026.7.22/).
The downloaded wheel's SHA-256 was verified against PyPI metadata:
`62f22742b58a1a33014a2b6b706588a8d7e2a88ae7bd1a6ebe8c992928483775`.

The regression test appends this public certificate to the patched bundle and
establishes that the guard rejects the resulting trust store.
