import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // TODO Torsten
  schema: 'https://pendulum.squids.live/foucoco-squid/v/v21/graphql',
  documents: ['**/*.{ts,tsx}', '!gql/**/*'],
  generates: {
    './gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
