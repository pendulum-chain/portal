const nablaHomepageUrl = 'https://nabla.fi';

export function NablaFootnote() {
  return (
    <div className="mt-3 text-center text-sm font-bold">
      Powered by{' '}
      <a href={nablaHomepageUrl} target="_blank" rel="noreferrer">
        Vortex Finance
      </a>
    </div>
  );
}
