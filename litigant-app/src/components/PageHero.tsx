import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

type Props = {
  breadcrumb: string;
  title: string;
  lead?: string;
};

export default function PageHero({ breadcrumb, title, lead }: Props) {
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
        {lead && <p>{lead}</p>}
      </div>
    </div>
  );
}
