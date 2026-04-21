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
      <div className="overflow-hidden rounded-[36px] border border-slate-900/10 bg-white shadow-glass">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-950 px-6 py-4 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Embedded workspace</p>
            <h2 className="mt-2 text-lg font-semibold">{title}</h2>
          </div>
          {note ? (
            <div className="hidden max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 md:flex">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              <span>{note}</span>
            </div>
          ) : null}
        </div>

        <div className="relative min-h-[70vh] bg-slate-100">
          {!loaded && visible ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/45 backdrop-blur-sm">
              <div className="w-[min(360px,92%)] rounded-[28px] border border-white/15 bg-white/90 p-8 text-center shadow-glass">
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
