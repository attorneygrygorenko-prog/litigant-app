import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

type Props = {
  breadcrumb: string;
  title: string;
  lead?: string;
  subtitle?: string;
};

export default function PageHero({ breadcrumb, title, lead, subtitle }: Props) {
  const tNav = useTranslations('nav');
  return (
    <div className="pghero">
      <div className="wrap">
        <div className="bc">
          <Link href="/">{tNav('home')}</Link>
          <span>/</span>
          <span className="bc-cur">{breadcrumb}</span>
        </div>
        <h1>{title}</h1>
        {subtitle && <p className="pghero-sub">{subtitle}</p>}
        {lead && <p>{lead}</p>}
      </div>
    </div>
  );
}
