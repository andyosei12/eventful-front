import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

type ShareEventProps = {
  id?: string;
  title: string;
};

const ShareEvent = ({ id, title }: ShareEventProps) => {
  return (
    <div className="flex gap-2">
      <FacebookShareButton url={`https://efiada.netlify.app/events/${id}`}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <TwitterShareButton
        url={`https://efiada.netlify.app/events/${id}`}
        title={title}
      >
        <XIcon size={32} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton
        url={`https://efiada.netlify.app/events/${id}`}
        title={title}
        separator=":: "
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareEvent;
