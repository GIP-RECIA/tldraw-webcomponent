import { useMultiplayer } from '../hooks/useMultiplayer.ts';
import { setUserInfoApiUrl } from '../utils/soffitUtils.ts';
import { initProvider, newDoc } from '../utils/yjsUtils.ts';
import { CustomCursor } from './Cursor.tsx';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tldraw } from '@gip-recia/tldraw-v1';
import { useUsers } from 'y-presence';
import { WebsocketProvider } from 'y-websocket';

type MultiplayerEditorProps = {
  websocketApiUrl: string;
  roomId: string;
  userInfoApiUrl: string;
  darkMode?: boolean;
};

const components = {
  Cursor: CustomCursor,
};

export default function MultiplayerEditor({
  websocketApiUrl,
  roomId,
  userInfoApiUrl,
  darkMode,
}: Readonly<MultiplayerEditorProps>) {
  setUserInfoApiUrl(userInfoApiUrl);

  const doc = newDoc();
  const provider = initProvider(websocketApiUrl, roomId, doc);
  const { ...events } = useMultiplayer(doc, provider, roomId);

  const isOk: boolean = userInfoApiUrl.length > 0 && websocketApiUrl.length > 0 && roomId.length > 0;

  return (
    isOk && (
      <>
        <div className="bottom-container">
          <UserCounter provider={provider} />
        </div>
        <Tldraw
          autofocus
          components={components}
          showPages={false}
          showMultiplayerMenu={false}
          darkMode={darkMode}
          hideNewReleaseLink
          hideSocialLinks
          hideSponsorLink
          {...events}
        />
      </>
    )
  );
}

type UserCounterProps = {
  provider: WebsocketProvider;
};

function UserCounter({ provider }: Readonly<UserCounterProps>) {
  const users = useUsers(provider.awareness);

  return (
    <>
      <FontAwesomeIcon icon={faUsers} /> {users.size}
    </>
  );
}
