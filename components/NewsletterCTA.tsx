import { NewsletterForm } from './NewsletterForm';

export function NewsletterCTA() {
  return (
    <div className="my-8 p-6 bg-site-dark text-white">
      <p className="text-2xs font-semibold uppercase tracking-widest text-primary mb-2">Newsletter</p>
      <h3 className="font-semibold text-xl mb-2">Stay in the loop</h3>
      <p className="text-gray-400 text-sm mb-4 max-w-sm">
        Weekly digest of the top manga &amp; anime stories. No spam, unsubscribe any time.
      </p>
      <NewsletterForm />
    </div>
  );
}
