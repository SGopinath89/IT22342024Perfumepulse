import { PrettyChatWindow } from 'react-chat-engine-pretty';
import "./ChatsPage.css"

const ChatsPage = (props) => {
    const { username, secret } = props.user;

    return (
        <div className="chatpage" style={{ height: '100vh' }}>
            <PrettyChatWindow
                projectId='e67cc59c-d454-4383-b775-68109d86064a'
                username={username}
                secret={secret}
                style={{ height: '100%' }}
            />
        </div>
    );
};

export default ChatsPage;
