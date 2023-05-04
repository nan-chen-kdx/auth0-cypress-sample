import { defineConfig } from 'cypress'
import { Session } from '@auth0/nextjs-auth0';
import { generateSessionCookie, GenerateSessionCookieConfig } from '@auth0/nextjs-auth0/testing';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        // deconstruct the individual properties
        getSessionCookie(params: { session: Session; config: GenerateSessionCookieConfig }) {
          console.log('good to go', params)
          const { session, config } = params;
          return generateSessionCookie(session, config);
        }
      })
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
