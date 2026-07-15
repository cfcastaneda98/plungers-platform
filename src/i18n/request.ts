import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

// "Without routing" mode: the locale comes from a cookie rather than a URL
// prefix (no /es/... paths, no restructuring src/app into a [locale] folder).
// Trade-off: Spanish pages aren't separately indexable by search engines this
// way. That's a reasonable call for now — worth revisiting once there's SEO
// budget/priority, at which point next-intl also supports prefixed routing
// (/es/experiences) without changing how translations themselves are written.
export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value === 'es-mx' ? 'es-mx' : 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
