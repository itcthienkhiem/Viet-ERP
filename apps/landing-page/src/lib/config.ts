export const config = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://vierp.dev',
  email: {
    hello: 'hello@vierp.dev',
    support: 'support@vierp.dev',
    sales: 'sales@vierp.dev',
  },
  social: {
    linkedin: 'https://linkedin.com/company/vierp',
    youtube: 'https://youtube.com/@vierp',
  },
  demo: {
    url: 'https://demo.vierp.dev',
    calendly: 'https://calendly.com/vierp/demo',
  },
} as const;
