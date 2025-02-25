import { defineConfig, mergeConfig } from 'vitest/config';
import { config } from 'dotenv';

import viteConfig from './vite.config';

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/vitest-setup.ts',
        reporters: ['json', 'verbose', 'vitest-sonar-reporter'],
        outputFile: {
          json: 'sonar-report.json',
          'vitest-sonar-reporter': 'sonar-report.xml',
        },
        env: {
          ...config({ path: '.env.test' }).parsed,
        },
        coverage: {
          provider: 'v8',
          reporter: ['lcov', 'html'],
          exclude: [
            '**/*.d.ts',
            '**/*.json',
            '**/*.xml',
            '**/*.yaml',
            '**/*.md',
            '**/*.html',
            '**/*.css',
            '**/*.properties',
            '*.config.*js',
            'node_modules/',
            'browser-tests/',
            'build/',
            'codegen.ts',
            'src/index.tsx',
            'src/domain/api/generatedTypes',
            'public/mockServiceWorker.js',
            'src/setupTests.ts',
            '**/__tests__/**',
            '**/__snapshots__/**',
            '**/*.test.ts',
            '**/*.spec.ts',
            // API files are for GraphQL client requests.
            // It does not make sense to mock everything they do on unit tests,
            // so they can be excluded.
            'src/domain/eventGroups/api/eventGroupsApi.ts',
            'src/domain/messages/api/messagesApi.ts',
            'src/domain/ticketSystemPassword/api/ticketSystemPasswordsApi.ts',
            'src/domain/occurrences/api/OccurrenceApi.ts',
            'src/domain/eventsAndEventGroups/api/eventsAndEventGroupsApi.ts',
            'src/domain/occurrences/api/OccurrenceApi.ts',
            'src/domain/children/api/ChildApi.ts',
            'src/domain/venues/api/VenueApi.ts',
            'src/domain/events/api/EventApi.ts',
            'src/domain/profile/api.ts',
            'src/domain/dashboard/api.ts',
            // Query and mutation files are source files to generate TypeScript types
            // and GraphQL client request hooks. Nothing to test there, since we should
            // test the code that are generated from them.
            '**/*Query.ts',
            '**/*Query.tsx',
            '**/*Queries.ts',
            '**/*Mutation.ts',
            '**/*Mutation.tsx',
            '**/*Mutations.ts',
            '**/mutations/**',
            '**/queries/**',
          ],
        },
      },
    })
  )
);
