import { WalletAccount } from '@talismn/connect-wallets';
import { useDeferredValue, useState } from 'preact/compat';
import { SearchInput } from '../../../../../SearchInput';
import { SimpleAccountCard } from '../../../../../AccountCard/SimpleAccountCard';

interface ConnectModalAccountsListProps {
  accounts: WalletAccount[];
}

export const ConnectModalAccountsList = ({ accounts }: ConnectModalAccountsListProps) => {
  const [inputSearchValue, setInputSearchValue] = useState<string>('');
  const deferredInputSearchValue = useDeferredValue(inputSearchValue);

  const filteredAccounts = deferredInputSearchValue.length
    ? accounts.filter((account) => account.address.toLowerCase().includes(deferredInputSearchValue.toLowerCase()))
    : accounts;

  return (
    <section>
      <SearchInput set={setInputSearchValue} />
      <ul className="mt-2">
        {filteredAccounts.map((account: WalletAccount) => (
          <SimpleAccountCard account={account} key={account.address} />
        ))}
      </ul>
    </section>
  );
};
