import { PrettyChatWindow } from 'react-chat-engine-pretty';
import "./ChatsPage.css"

const ChatsPage = (props) => {
    const { username, secret } = props.user;

    return (
        <div className="chatpage" style={{ height: '100vh' }}>
            <PrettyChatWindow
                projectId='557d95a8-03ab-4851-b422-02dffc72f7ad'
                username={username}
                secret={secret}
                style={{ height: '100%' }}
            />
        </div>
    );
};

export default ChatsPage;