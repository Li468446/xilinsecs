"use client";

import { useMemo, useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

function createItems(count: number) {
  return Array.from({ length: count }, () => crypto.randomUUID());
}

export default function UuidTool() {
  const [count, setCount] = useState(6);
  const [items, setItems] = useState<string[]>(() => createItems(6));
  const [copied, setCopied] = useState("");

  const joined = useMemo(() => items.join("\n"), [items]);

  async function copyValue(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="glass-card p-6">
        <h3 className="text-2xl font-semibold text-slate-950">批量生成 UUID</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          使用浏览器原生 `crypto.randomUUID()` 生成 v4 UUID，适合开发、测试和脚本场景。
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            type="number"
            min={1}
            max={30}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="h-12 w-24 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300"
          />
          <Button onClick={() => setItems(createItems(count))}>
            <RefreshCw className="mr-2 h-4 w-4" />
            重新生成
          </Button>
          <Button variant="outline" onClick={() => copyValue(joined)}>
            <Copy className="mr-2 h-4 w-4" />
            {copied === joined ? "已复制全部" : "复制全部"}
          </Button>
        </div>
      </section>

      <aside className="glass-card p-6">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item} className="flex flex-col gap-3 rounded-[22px] border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
              <code className="text-sm text-slate-800">{item}</code>
              <Button variant="ghost" onClick={() => copyValue(item)}>
                <Copy className="mr-2 h-4 w-4" />
                {copied === item ? "已复制" : "复制"}
              </Button>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
