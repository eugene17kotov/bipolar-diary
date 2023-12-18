import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['eng', 'ru', 'ua'],
    
    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: 'ua',
});

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}