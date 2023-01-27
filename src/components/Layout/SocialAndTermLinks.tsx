import { FC } from "preact/compat";
import { h } from "preact";
import GithubLogo from "../../assets/socials-github";
import LinkedinLogo from "../../assets/socials-linkedin";
import MediumLogo from "../../assets/socials-medium";
import RedditLogo from "../../assets/socials-reddit";
import TelegramLogo from "../../assets/socials-telegram";
import TwitterLogo from "../../assets/socials-twitter";
import DiscordLogo from "../../assets/socials-discord";

interface Props {
  Link: React.FC;
}

const SocialAndTermLinks: FC<Props> = ({ Link }: Props) => {
  return (
    <div className="pendulum-social-and-terms">
      <div className="social">
        <ul>
          <li>
            <a
              href="https://discord.gg/wJ2fQh776B"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <DiscordLogo />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/pendulum_chain"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <TwitterLogo />
            </a>
          </li>
          <li>
            <a
              href="https://t.me/pendulum_chain"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <TelegramLogo />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/pendulum-chain/pendulum-prototype"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <GithubLogo />
            </a>
          </li>
          <li>
            <a
              href="https://pendulum-chain.medium.com/"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <MediumLogo />
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/Pendulum_Chain/"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <TwitterLogo />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/pendulum-chain/"
              target="_blank"
              rel="nofollow noreferrer"
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
              href="https://pendulumchain.org/legal/terms-and-conditions"
              target="_blank" rel="noreferrer"
            >
              Terms
            </a>
          </li>
          <li>
            <a
              href="https://pendulumchain.org/legal/privacy-policy"
              target="_blank" rel="noreferrer"
            >
              Privacy
            </a>
          </li>
          <li>
            <a
              href="https://pendulum.gitbook.io/pendulum-docs/get-started/readme"
              target="_blank" rel="noreferrer"
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
