import { h } from 'preact';
import GithubLogo from '../../assets/socials-github';
import LinkedinLogo from '../../assets/socials-linkedin';
import MediumLogo from '../../assets/socials-medium';
import RedditLogo from '../../assets/socials-reddit';
import TelegramLogo from '../../assets/socials-telegram';
import TwitterLogo from '../../assets/socials-twitter';
import DiscordLogo from '../../assets/socials-discord';

interface Props {
  Link: React.FC;
}

const socialLinks = [
  { href: 'https://discord.gg/wJ2fQh776B', Logo: DiscordLogo },
  { href: 'https://twitter.com/pendulum_chain', Logo: TwitterLogo },
  { href: 'https://t.me/pendulum_chain', Logo: TelegramLogo },
  {
    href: 'https://github.com/pendulum-chain/pendulum-prototype',
    Logo: GithubLogo,
  },
  { href: 'https://pendulum-chain.medium.com/', Logo: MediumLogo },
  { href: 'https://www.reddit.com/r/Pendulum_Chain/', Logo: RedditLogo },
  {
    href: 'https://www.linkedin.com/company/pendulum-chain/',
    Logo: LinkedinLogo,
  },
];

const SocialAndTermLinks = ({ Link }: Props): JSX.Element => {
  return (
    <div className="pendulum-social-and-terms">
      <div className="social">
        <ul>
          {socialLinks.map(({ href, Logo }, i) => (
            <li key={i}>
              <a href={href} target="_blank" rel="nofollow noreferrer">
                <Logo />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="terms">
        <ul>
          <li>
            <a
              href="https://pendulumchain.org/legal/terms-and-conditions"
              target="_blank"
              rel="noreferrer"
            >
              Terms
            </a>
          </li>
          <li>
            <a
              href="https://pendulumchain.org/legal/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              Privacy
            </a>
          </li>
          <li>
            <a
              href="https://pendulum.gitbook.io/pendulum-docs/get-started/readme"
              target="_blank"
              rel="noreferrer"
            >
              Wiki
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SocialAndTermLinks;
