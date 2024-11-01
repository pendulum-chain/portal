interface Props {
  className?: string;
  light?: boolean;
}

export const PendulumLogo = ({ className, light, ...rest }: Props) =>
  light ? (
    <svg width="18" height="25" viewBox="0 0 18 25" xmlns="http://www.w3.org/2000/svg" className={className} {...rest}>
      <path
        d="M8.80392 0.00131588C4.11964 -0.0830614 0.110976 3.90142 0.00287672 8.77656C-0.0781974 12.086 1.5613 15.0017 4.04757 16.633C4.16468 16.708 4.32683 16.6611 4.38989 16.5299L6.33567 12.4892C6.62393 11.8985 6.57889 11.186 6.22757 10.6329C5.93029 10.1547 5.75914 9.58283 5.76815 8.97344C5.78616 7.39839 6.98426 6.09523 8.48863 6.01086C10.2272 5.9171 11.6595 7.42652 11.5244 9.24532C11.4163 10.7079 10.2813 11.8798 8.885 12.0016C8.87599 12.0016 8.86698 12.0016 8.85797 12.0016C8.21839 12.0485 7.65087 12.4329 7.3626 13.0329L5.41683 17.0643C5.35377 17.1955 5.41683 17.3549 5.54294 17.4018C6.52484 17.7956 7.58781 18.0018 8.70483 18.0018C13.4342 17.9737 17.2987 13.9329 17.2987 9.01094C17.3077 4.08893 13.5152 0.0856932 8.80392 0.00131588Z"
        fill="#FFFFFF"
      />
      <path
        d="M2.88557 24.002C4.4776 24.002 5.7682 22.6588 5.7682 21.0019C5.7682 19.345 4.4776 18.0018 2.88557 18.0018C1.29353 18.0018 0.00292969 19.345 0.00292969 21.0019C0.00292969 22.6588 1.29353 24.002 2.88557 24.002Z"
        fill="#FFFFFF"
      />
    </svg>
  ) : (
    <svg
      width="18"
      height="25"
      viewBox="0 0 18 25"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="#32253E"
    >
      <path d="M8.80392 0.00131588C4.11964 -0.0830614 0.110976 3.90142 0.00287672 8.77656C-0.0781974 12.086 1.5613 15.0017 4.04757 16.633C4.16468 16.708 4.32683 16.6611 4.38989 16.5299L6.33567 12.4892C6.62393 11.8985 6.57889 11.186 6.22757 10.6329C5.93029 10.1547 5.75914 9.58283 5.76815 8.97344C5.78616 7.39839 6.98426 6.09523 8.48863 6.01086C10.2272 5.9171 11.6595 7.42652 11.5244 9.24532C11.4163 10.7079 10.2813 11.8798 8.885 12.0016C8.87599 12.0016 8.86698 12.0016 8.85797 12.0016C8.21839 12.0485 7.65087 12.4329 7.3626 13.0329L5.41683 17.0643C5.35377 17.1955 5.41683 17.3549 5.54294 17.4018C6.52484 17.7956 7.58781 18.0018 8.70483 18.0018C13.4342 17.9737 17.2987 13.9329 17.2987 9.01094C17.3077 4.08893 13.5152 0.0856932 8.80392 0.00131588Z" />
      <path d="M2.88557 24.002C4.4776 24.002 5.7682 22.6588 5.7682 21.0019C5.7682 19.345 4.4776 18.0018 2.88557 18.0018C1.29353 18.0018 0.00292969 19.345 0.00292969 21.0019C0.00292969 22.6588 1.29353 24.002 2.88557 24.002Z" />
    </svg>
  );
