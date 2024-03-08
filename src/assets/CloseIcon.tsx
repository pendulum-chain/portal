interface Props {
  className?: string;
}

export const CloseIcon: React.FC<Props> = ({ className = 'dark:fill-white fill-black' }) => (
  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1.51296 0.452847C1.21077 0.169549 0.736145 0.18486 0.452847 0.487044C0.169549 0.789228 0.18486 1.26386 0.487044 1.54715L1.51296 0.452847ZM16.487 16.5472C16.7892 16.8305 17.2639 16.8151 17.5472 16.513C17.8305 16.2108 17.8151 15.7361 17.513 15.4528L16.487 16.5472ZM17.513 1.54715C17.8151 1.26386 17.8305 0.789228 17.5472 0.487044C17.2639 0.18486 16.7892 0.169549 16.487 0.452847L17.513 1.54715ZM0.487044 15.4528C0.18486 15.7361 0.169549 16.2108 0.452847 16.513C0.736145 16.8151 1.21077 16.8305 1.51296 16.5472L0.487044 15.4528ZM0.487044 1.54715L8.48704 9.04715L9.51296 7.95285L1.51296 0.452847L0.487044 1.54715ZM8.48704 9.04715L16.487 16.5472L17.513 15.4528L9.51296 7.95285L8.48704 9.04715ZM9.51296 9.04715L17.513 1.54715L16.487 0.452847L8.48704 7.95285L9.51296 9.04715ZM16.487 0.452847L0.487044 15.4528L1.51296 16.5472L17.513 1.54715L16.487 0.452847Z" />
  </svg>
);