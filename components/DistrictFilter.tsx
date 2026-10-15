'use client';
import { DISTRICTS } from '@/lib/data';

export default function DistrictFilter({ value, onChange }: { value: string; onChange: (d: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Városrész szűrő">
      {['Mind', ...DISTRICTS].map((d) => (
        <button key={d} onClick={() => onChange(d)} aria-pressed={value === d} className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${value === d ? 'border-emerald-800 bg-emerald-700 text-white' : 'border-slate-300 bg-white text-slate-900 hover:border-emerald-700'}`}>{d === 'Mind' ? 'Minden városrész' : d}</button>
      ))}
    </div>
  );
}
