"use client";

import { startTransition, useState } from "react";
import Image from "next/image";
import { Copy, Download, QrCode, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

function encodeBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary);
}

function decodeBase64(value: string) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleTransform(nextMode = mode) {
    setPending(true);
    setError("");
    setQrDataUrl("");

    try {
      const result = nextMode === "encode" ? encodeBase64(input) : decodeBase64(input.trim());

      startTransition(() => {
        setOutput(result);
      });

      if (result) {
        const QRCode = await import("qrcode");
        const dataUrl = await QRCode.toDataURL(result, { width: 280, margin: 1 });
        setQrDataUrl(dataUrl);
      }
    } catch (currentError) {
      setOutput("");
      setError(nextMode === "encode" ? "编码失败，请检查输入内容。" : "解码失败，请确认 Base64 内容有效。");
    } finally {
      setPending(false);
    }
  }

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  function downloadQr() {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "base64-qrcode.png";
    link.click();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="glass-card p-6">
        <div className="flex flex-wrap gap-3">
          <Button variant={mode === "encode" ? "solid" : "outline"} onClick={() => setMode("encode")}>
            编码
          </Button>
          <Button variant={mode === "decode" ? "solid" : "outline"} onClick={() => setMode("decode")}>
            解码
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="text-sm font-semibold text-slate-900">输入内容</label>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={mode === "encode" ? "输入待编码文本" : "输入待解码的 Base64 字符串"}
            className="min-h-[220px] rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-900 outline-none ring-0 transition focus:border-blue-300"
          />
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => handleTransform()}>
              {pending ? "处理中..." : mode === "encode" ? "开始编码" : "开始解码"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setInput("");
                setOutput("");
                setQrDataUrl("");
                setError("");
              }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              清空
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-semibold text-slate-900">输出结果</label>
            {output ? (
              <Button variant="outline" onClick={copyOutput}>
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "已复制" : "复制结果"}
              </Button>
            ) : null}
          </div>
          <div className="mt-3 min-h-[180px] rounded-[24px] border border-slate-200 bg-slate-950 p-4 text-sm leading-7 text-slate-100">
            {error ? <span className="text-rose-300">{error}</span> : output || "处理结果会显示在这里。"}
          </div>
        </div>
      </section>

      <aside className="glass-card p-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          <QrCode className="h-4 w-4" />
          QR Export
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-slate-950">结果二维码</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          处理完成后会自动生成二维码，适合快速在手机或其他设备上转移结果。
        </p>
        <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-4">
          {qrDataUrl ? (
            <div className="space-y-4">
              <div className="relative mx-auto h-[280px] w-[280px] overflow-hidden rounded-[20px]">
                <Image src={qrDataUrl} alt="生成的二维码" fill className="object-contain" unoptimized />
              </div>
              <Button variant="outline" onClick={downloadQr}>
                <Download className="mr-2 h-4 w-4" />
                下载二维码
              </Button>
            </div>
          ) : (
            <div className="flex h-[280px] items-center justify-center rounded-[20px] border border-dashed border-slate-200 text-sm text-slate-500">
              暂无二维码内容
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
