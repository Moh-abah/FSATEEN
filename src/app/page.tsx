// Home page for Fusateen

import { Metadata } from 'next';
import { HomeContent } from './home-content';

export const metadata: Metadata = {
  title: 'فساتين - أناقة الفساتين بين يديك',
  description: 'منصة متكاملة لبيع وشراء الفساتين المستعملة والجديدة في المملكة العربية السعودية. اكتشفي تشكيلة رائعة من الفساتين بأسعار مناسبة.',
};

export default function HomePage() {
  return <HomeContent />;
}
