import { faCircleNotch, faFloppyDisk, faTriangleExclamation, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUsers } from 'y-presence';
import { WebsocketProvider } from 'y-websocket';

type BottomContainerProps = {
  isLoading: boolean;
  isError: boolean;
  isSaving: boolean;
  provider?: WebsocketProvider;
  darkMode: boolean | undefined;
};

export default function BottomContainer({
  isLoading,
  isError,
  isSaving,
  provider,
  darkMode,
}: Readonly<BottomContainerProps>) {
  return (
    <div className="bottom-container" style={{ color: darkMode ? '#f8f9fa' : 'var(--colors-text)' }}>
      {provider && <UserCounter provider={provider} />}
      {isLoading && !isError && <FontAwesomeIcon icon={faCircleNotch} spin />}
      {isError && !isSaving && <FontAwesomeIcon icon={faTriangleExclamation} shake />}
      {isSaving && <FontAwesomeIcon icon={faFloppyDisk} beatFade />}
    </div>
  );
}

type UserCounterProps = {
  provider: WebsocketProvider;
};

function UserCounter({ provider }: Readonly<UserCounterProps>) {
  const users = useUsers(provider.awareness);

  return (
    <div>
      <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
      {users.size}
    </div>
  );
}
