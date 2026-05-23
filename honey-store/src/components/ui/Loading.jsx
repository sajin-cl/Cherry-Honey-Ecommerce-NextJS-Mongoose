import Image from 'next/image';

export default function Loading({ message = "Loading product details..." }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-1">
      <Image
        src="/loading.png"
        height={200}
        width={200}
        alt="loading"
        priority
        unoptimized
      />
      <span className="text-amber-300 font-mono">
        {message}
      </span>
    </div>
  );
}