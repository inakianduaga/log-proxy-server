# Logger configuration

The logger uses a single `id` config parameter to build up the logging configuration (transports, credentials, etc). The configuration is built from a base default config with overrides on top

## Default Settings:

The defaultSettings.ts file provides the baseline config for all `id`'s. If there is no specific configuration for a given id, the default settings will be used for the log request

## Per-id overrides

Specific configuration overrides/additions for each given `id` should go in the `settings.ts` (not commited because it's specific to each user). Use `settings.example.ts` as a guideline.
