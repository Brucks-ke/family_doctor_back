import { message } from 'antd';

type MessageType = 'success' | 'error' | 'info' | 'warning';

const GlobalMessage = {
  success: (content: string) => {
    message.success(content);
  },
  error: (content: string) => {
    message.error(content);
  },
  info: (content: string) => {
    message.info(content);
  },
  warning: (content: string) => {
    message.warning(content);
  },
  show: (content: string, type: MessageType = 'info') => {
    message[type](content);
  },
};

export default GlobalMessage;
