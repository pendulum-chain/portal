const nablaHomepageUrl = 'https://nabla.fi';

export function NablaFootnote() {
  return (
    <div className="text-center mt-3 font-bold text-sm">
      Powered by{' '}
      <a href={nablaHomepageUrl} target="_blank" rel="noreferrer">
        Nabla technology
      </a>
    </div>
  );
}
