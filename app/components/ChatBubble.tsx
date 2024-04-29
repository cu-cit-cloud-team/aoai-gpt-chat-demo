import { faRobot, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { memo } from 'react';
import Markdown from 'react-markdown';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';

import { ChatMeta } from '@/app/components/ChatMeta';
import { CopyToClipboard } from '@/app/components/CopyToClipboard';
import { DeleteMessage } from '@/app/components/DeleteMessage';
import { ReloadMessage } from '@/app/components/ReloadMessage';

import { useDefaultsContext } from '@/app/contexts/DefaultsContext';

import { markdownToText } from '@/app/utils/markdownToText';

export const ChatBubble = memo(
  ({ index, isLoading, isUser, message, reload, stop, totalMessages }) => {
    const { editorTheme } = useDefaultsContext();

    const Pre = ({ children }) => {
      return (
        <pre className="code-pre">
          <CopyToClipboard textToCopy={children.props.children} />
          {children}
        </pre>
      );
    };

    return (
      <div className={`chat mb-10 ${isUser ? 'chat-start' : 'chat-end'}`}>
        <div className="chat-image avatar">
          <div
            className={`w-12 pt-2 p-1 rounded ${
              isUser
                ? 'bg-primary text-primary-content'
                : 'bg-secondary text-secondary-content'
            }`}
          >
            <FontAwesomeIcon
              className="chat-avatar-icon"
              size="2x"
              icon={
                isUser
                  ? faUser
                  : isLoading && index === totalMessages
                    ? faSpinner
                    : faRobot
              }
              spinPulse={!isUser && isLoading && index === totalMessages}
              fixedWidth
            />
          </div>
        </div>
        <div
          className={`prose relative chat-bubble${
            isUser ? ' chat-bubble-primary' : ' chat-bubble-secondary bot'
          }`}
        >
          {(isUser || !isLoading || index !== totalMessages) && (
            <>
              <CopyToClipboard
                isUser={isUser}
                textToCopy={markdownToText(message.content)}
              />
              <DeleteMessage isUser={isUser} message={message} />
              {index === totalMessages ? (
                <ReloadMessage
                  isUser={isUser}
                  reload={reload}
                  message={message}
                />
              ) : null}
            </>
          )}
          <Markdown
            components={{
              pre: Pre,
              code(props) {
                const {
                  children,
                  className = 'code-pre',
                  node,
                  ...rest
                } = props;
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    style={editorTheme}
                    language={match[1]}
                    PreTag="div"
                    showLineNumbers={true}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </Markdown>
        </div>
        <div className={`chat-footer${isUser ? '' : ' bot'}`}>
          <ChatMeta
            index={index}
            isLoading={isLoading}
            isUser={isUser}
            message={message}
            stop={stop}
            totalMessages={totalMessages}
          />
        </div>
      </div>
    );
  }
);

ChatBubble.displayName = 'ChatBubble';
ChatBubble.propTypes = {
  index: PropTypes.number,
  isLoading: PropTypes.bool,
  isUser: PropTypes.bool,
  message: PropTypes.object,
  reload: PropTypes.func,
  stop: PropTypes.func,
  totalMessages: PropTypes.number,
};

export default ChatBubble;
