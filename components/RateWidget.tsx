const BAM_PER_EUR = 1.95583; // Fixed peg

async function getRates(): Promise<{ usd: number | null }> {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=EUR&to=USD', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { usd: null };
    const data = await res.json();
    return { usd: data.rates?.USD ?? null };
  } catch {
    return { usd: null };
  }
}

export async function RateWidget() {
  const { usd } = await getRates();

  return (
    <div className="hidden lg:flex items-center gap-3 text-gray-500 text-xs">
      <span>
        1 EUR = <strong className="text-gray-300">{BAM_PER_EUR.toFixed(4)} BAM</strong>
      </span>
      {usd && (
        <>
          <span className="text-gray-700">·</span>
          <span>
            = <strong className="text-gray-300">${usd.toFixed(2)} USD</strong>
          </span>
        </>
      )}
    </div>
  );
}
