"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmbedShellProps = {
  src: string;
  title: string;
  note?: string;
};

export default function EmbedShell({ src, title, note }: EmbedShellProps) {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);

  return (
    <section className="site-shell">
      <div className="rainbow-panel overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-white/80 bg-white/70 px-6 py-4 text-slate-950">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-700">Embedded workspace</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">{title}</h2>
          </div>
          {note ? (
            <div className="hidden max-w-sm items-center gap-2 rounded-full border border-blue-100 bg-white/85 px-4 py-2 text-xs text-slate-600 md:flex">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>{note}</span>
            </div>
          ) : null}
        </div>

        <div className="relative min-h-[70vh] bg-white/60">
          {!loaded && visible ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/55 backdrop-blur-sm">
              <div className="w-[min(360px,92%)] rounded-[28px] border border-white/80 bg-white/92 p-8 text-center shadow-glass">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
                <h3 className="mt-5 text-lg font-semibold text-slate-950">正在载入外部表单</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  该页面仍使用现有表单源。若载入较慢，可稍候片刻或直接打开原始地址。
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white"
                  >
                    在新窗口打开
                  </a>
                  <Button variant="ghost" onClick={() => setVisible(false)}>
                    隐藏遮罩
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
          <iframe
            src={src}
            title={title}
            className="h-[72vh] w-full border-0"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
}
