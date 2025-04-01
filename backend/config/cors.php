<?php

return [
    'paths' => ['api/*', 'oauth/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'], // Ou especifique o domínio do Angular
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Ou true, se usar cookies/token HTTP-Only
];
