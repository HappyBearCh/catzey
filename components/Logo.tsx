import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Catzye"
      width={220}
      height={90}
      className="h-9 w-auto"
      priority
    />
  );
}
