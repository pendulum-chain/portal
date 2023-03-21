import { FC } from 'preact/compat';
import DiscordLogo from '../../assets/socials-discord';
import GithubLogo from '../../assets/socials-github';
import LinkedinLogo from '../../assets/socials-linkedin';
import MediumLogo from '../../assets/socials-medium';
import RedditLogo from '../../assets/socials-reddit';
import TelegramLogo from '../../assets/socials-telegram';
import TwitterLogo from '../../assets/socials-twitter';

interface Props {
  Link: React.FC;
}

const SocialAndTermLinks: FC<Props> = () => {
  return (
    <div className="pendulum-social-and-terms">
      <div className="social">
        <ul>
          <li>
            <a href="https://discord.gg/wJ2fQh776B" target="_blank" rel="nofollow noopener noreferrer">
              <DiscordLogo />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/pendulum_chain" target="_blank" rel="nofollow noopener noreferrer">
              <TwitterLogo />
            </a>
          </li>
          <li>
            <a href="https://t.me/pendulum_chain" target="_blank" rel="nofollow noopener noreferrer">
              <TelegramLogo />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/pendulum-chain/pendulum-prototype"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <GithubLogo />
            </a>
          </li>
          <li>
            <a href="https://pendulum-chain.medium.com/" target="_blank" rel="nofollow noopener noreferrer">
              <MediumLogo />
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/r/Pendulum_Chain/" target="_blank" rel="nofollow noopener noreferrer">
              <RedditLogo />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/pendulum-chain/"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <LinkedinLogo />
            </a>
          </li>
        </ul>
      </div>
      <div className="terms">
        <ul>
          <li>
            <a
              href="https://pendulumchain.org/legal/portal-terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms
            </a>
          </li>
          <li>
            <a href="https://pendulumchain.org/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy
            </a>
          </li>
          <li>
            <a
              href="https://pendulum.gitbook.io/pendulum-docs/get-started/readme"
              target="_blank"
              rel="noopener noreferrer"
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
