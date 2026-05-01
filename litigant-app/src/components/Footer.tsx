import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import TrackedLink from './TrackedLink';

export default function Footer() {
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tHome = useTranslations('home');

  return (
    <footer>
      <div className="wrap">
        <div className="foot-g">
          <div className="foot-brand">
            <Link href="/" className="logo">
              <div className="logo-sq">
                <Image src="/images/logo.png" alt="Litigant Law Office" width={76} height={76} />
              </div>
              <div className="logo-text">
                <span className="logo-name">LITIGANT</span>
                <span className="logo-sub">{tNav('lawOffice')}</span>
              </div>
            </Link>
            <p className="foot-desc">{tFooter('desc')}</p>
            <p className="foot-etym">{tFooter('etymology')}</p>
            <p className="foot-reg">{tFooter('reg')}</p>
          </div>

          <div className="foot-col">
            <h3>{tFooter('practicesTitle')}</h3>
            <ul>
              <li><Link href="/ekspertyza">{tHome('prac1Title')}</Link></li>
              <li><Link href="/ekspertyza">{tFooter('stateDisputes')}</Link></li>
              <li><Link href="/ekspertyza">{tFooter('arbitration')}</Link></li>
              <li><Link href="/ekspertyza">GR · Lobbying</Link></li>
            </ul>
          </div>

          <div className="foot-col">
            <h3>{tFooter('bureauTitle')}</h3>
            <ul>
              <li><Link href="/pro-nas">{tFooter('founder')}</Link></li>
              <li><Link href="/analityka">{tNav('blog')}</Link></li>
              <li><Link href="/checklist">{tFooter('checklist')}</Link></li>
              <li><Link href="/kontakty">{tNav('submitCase')}</Link></li>
            </ul>
          </div>

          <div className="foot-col">
            <h3>{tFooter('contactsTitle')}</h3>
            <ul>
              <li><TrackedLink href="tel:+380445010207" event="phone_click" params={{ location: 'kyiv' }}>+38 (044) 501-02-07</TrackedLink></li>
              <li><TrackedLink href="tel:+380932232995" event="phone_click" params={{ location: 'odesa' }}>+38 (093) 223-29-95</TrackedLink></li>
              <li><a href="mailto:advocatcompany@gmail.com">advocatcompany@gmail.com</a></li>
              <li style={{ color: 'rgba(255,255,255,.2)', fontSize: '11px', marginTop: '4px' }}>
                {tFooter('cities')}
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-bot">
          <div>{tFooter('copyright')}</div>
          <div><a href="#">{tFooter('privacy')}</a></div>
        </div>
      </div>
    </footer>
  );
}
