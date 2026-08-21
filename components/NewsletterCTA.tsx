import { NewsletterForm } from './NewsletterForm';
import { getTodaysNumber } from '@/lib/numerology';
import { getGroup } from '@/lib/number-groups';

export function NewsletterCTA() {
  // The Universal Day figure, the same one the masthead carries. A weekly
  // digest is a numbered thing whether or not anyone says so.
  const today = getTodaysNumber();
  const group = getGroup(today.number);

  return (
    <div className="my-8 p-6 bg-site-dark text-white">
      <p className="text-2xs font-semibold uppercase tracking-widest text-primary mb-2">
        Newsletter · today is a {today.number}
      </p>
      <h3 className="font-semibold text-xl mb-2">A week, read by its numbers</h3>
      <p className="text-gray-400 text-sm mb-4 max-w-sm">
        Once a week: what was added to the reference, and which shelf it landed on. Today the
        reference reads as {group.shelf.toLowerCase()} — {group.tagline}. No spam, unsubscribe any
        time.
      </p>
      <NewsletterForm />
    </div>
  );
}
