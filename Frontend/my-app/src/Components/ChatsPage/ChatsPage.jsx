import { PrettyChatWindow } from 'react-chat-engine-pretty';
import "./ChatsPage.css"

const ChatsPage = (props) => {
    const { username, secret } = props.user;

    return (
        <div className="chatpage" style={{ height: '100vh' }}>
            <PrettyChatWindow
                projectId='0bdd8dff-41e9-4b74-9ad8-4dcf7b3dd460'
                username={username}
                secret={secret}
                style={{ height: '100%' }}
            />
        </div>
    );
};

export default ChatsPage;