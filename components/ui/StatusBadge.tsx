import { OStatus } from '@/lib/store';

export const STATUS_LABEL: Record<OStatus, string> = { new: 'Függőben', cooking: 'Készül', ready: 'Kész / úton', done: 'Teljesítve' };
const TONE: Record<OStatus, string> = {
  new: 'bg-amber-100 text-amber-900 ring-amber-300',
  cooking: 'bg-sky-100 text-sky-900 ring-sky-300',
  ready: 'bg-emerald-100 text-emerald-900 ring-emerald-300',
  done: 'bg-emerald-600 text-white ring-emerald-700',
};
const STEPS: OStatus[] = ['new', 'cooking', 'ready', 'done'];

export function StatusBadge({ status }: { status: OStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ring-1 ring-inset ${TONE[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />{STATUS_LABEL[status]}
    </span>
  );
}

export function OrderPipeline({ status }: { status: OStatus }) {
  const idx = STEPS.indexOf(status);
  return (
    <ol className="flex items-start" aria-label={`Állapot: ${STATUS_LABEL[status]}`}>
      {STEPS.map((s, i) => {
        const filled = i < idx || status === 'done';
        return (
          <li key={s} className="flex flex-1 flex-col items-center gap-1 text-center">
            <div className="flex w-full items-center">
              <span className={`h-1 flex-1 ${i === 0 ? 'bg-transparent' : i <= idx ? 'bg-emerald-600' : 'bg-stone-300'}`} />
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${filled ? 'bg-emerald-600 text-white' : i === idx ? 'animate-pulse bg-amber-600 text-white ring-4 ring-amber-200' : 'bg-stone-200 text-stone-700'}`}>{filled ? '✓' : i + 1}</span>
              <span className={`h-1 flex-1 ${i === 3 ? 'bg-transparent' : i < idx ? 'bg-emerald-600' : 'bg-stone-300'}`} />
            </div>
            <span className={`text-[11px] font-bold ${i <= idx ? 'text-slate-950' : 'text-slate-600'}`}>{STATUS_LABEL[s]}</span>
          </li>
        );
      })}
    </ol>
  );
}
