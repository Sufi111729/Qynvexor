import { createPortal } from "react-dom";

export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button aria-label="Close modal" onClick={onClose} className="text-slate-400 hover:text-white">
            x
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
