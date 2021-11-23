import cn from 'classnames';
import PageLogo from '../page-logo/page-logo';

type Props = {
  container?: boolean;
};

function Footer({ container }: Props): JSX.Element {
  return (
    <footer className={cn('footer', { container: container })}>
      <PageLogo />
    </footer>
  );
}

export default Footer;
