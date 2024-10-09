const nablaHomepageUrl = 'https://vortexfinance.co';

export function NablaFootnote() {
  return (
    <div className="mt-3 text-sm font-bold text-center">
      Powered by{' '}
      <a
        href={nablaHomepageUrl}
        target="_blank"
        rel="noreferrer"
        className="transition hover:text-primary hover:underline"
      >
        Vortex Finance
      </a>
    </div>
  );
}
