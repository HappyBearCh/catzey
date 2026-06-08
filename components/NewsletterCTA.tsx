import { NewsletterForm } from './NewsletterForm';

interface Props {
  isBosnian?: boolean;
}

export function NewsletterCTA({ isBosnian = false }: Props) {
  return (
    <div className="my-8 p-6 bg-site-dark text-white">
      <p className="text-2xs font-black uppercase tracking-widest text-primary mb-2">Newsletter</p>
      <h3 className="font-black text-xl mb-2">
        {isBosnian ? 'Ostanite u toku' : 'Stay in the loop'}
      </h3>
      <p className="text-gray-400 text-sm mb-4 max-w-sm">
        {isBosnian
          ? 'Sedmični pregled najvažnijih vijesti iz manga i anime svijeta. Bez spama.'
          : 'Weekly digest of the top manga & anime stories. No spam, unsubscribe any time.'}
      </p>
      <NewsletterForm isBosnian={isBosnian} />
    </div>
  );
}
