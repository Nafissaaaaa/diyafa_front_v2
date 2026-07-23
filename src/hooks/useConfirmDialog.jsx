import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Portal({ children, onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export function useConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(null);
  const resolveRef = useRef(null);

  function confirm({ title = "Confirmation", message, confirmText = "Confirmer", cancelText = "Annuler", danger = false } = {}) {
    setConfig({ title, message, confirmText, cancelText, danger });
    setOpen(true);
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }

  function handleConfirm() {
    setOpen(false);
    resolveRef.current?.(true);
  }

  function handleCancel() {
    setOpen(false);
    resolveRef.current?.(false);
  }

  useEffect(() => {
    if (!open) return;
    function handleEscape(e) {
      if (e.key === "Escape") handleCancel();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const Dialog = () => {
    if (!open || !config) return null;
    return (
      <Portal onClose={handleCancel}>
        <h3 className="font-display text-lg font-semibold text-navy-deep">{config.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{config.message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-neutral-50"
          >
            {config.cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-bold text-white ${
              config.danger ? "bg-red-600 hover:bg-red-700" : "bg-navy-deep hover:opacity-90"
            }`}
          >
            {config.confirmText}
          </button>
        </div>
      </Portal>
    );
  };

  return { confirm, Dialog };
}

export function usePromptDialog() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(null);
  const [value, setValue] = useState("");
  const resolveRef = useRef(null);
  const inputRef = useRef(null);

  function prompt({ title = "Confirmation", message, placeholder = "", defaultValue = "" } = {}) {
    setConfig({ title, message, placeholder });
    setValue(defaultValue || "");
    setOpen(true);
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }

  function handleOk() {
    setOpen(false);
    resolveRef.current?.(value);
  }

  function handleCancel() {
    setOpen(false);
    resolveRef.current?.(undefined);
  }

  useEffect(() => {
    if (!open) return;
    function handleEscape(e) {
      if (e.key === "Escape") handleCancel();
    }
    document.addEventListener("keydown", handleEscape);
    setTimeout(() => inputRef.current?.focus(), 50);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const Dialog = () => {
    if (!open || !config) return null;
    return (
      <Portal onClose={handleCancel}>
        <h3 className="font-display text-lg font-semibold text-navy-deep">{config.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{config.message}</p>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={config.placeholder}
          className="mt-4 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-navy-deep focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleOk();
          }}
        />
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-neutral-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleOk}
            className="rounded-lg bg-navy-deep px-4 py-2 text-sm font-bold text-white hover:opacity-90"
          >
            OK
          </button>
        </div>
      </Portal>
    );
  };

  return { prompt, Dialog };
}
