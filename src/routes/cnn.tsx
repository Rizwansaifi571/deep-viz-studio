import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ModuleLayout } from "@/components/premium/ModuleLayout";
import { GlassCard } from "@/components/premium/GlassCard";
import { EduSection } from "@/components/premium/EduSection";
import { CodePreview } from "@/components/premium/CodePreview";
import { GradientButton } from "@/components/premium/GradientButton";
import { ParameterSlider } from "@/components/premium/ParameterSlider";
import { Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cnn")({
  head: () => ({
    meta: [
      { title: "CNN + OpenCV Lab — Deep Learning Toolbox" },
      { name: "description", content: "Apply convolution kernels to any image and visualize the resulting feature map in real time." },
    ],
  }),
  component: CNNPage,
});

const KERNELS: Record<string, number[][]> = {
  Identity: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
  "Edge (Sobel-X)": [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
  "Edge (Sobel-Y)": [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
  Sharpen: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
  "Box blur": [[1, 1, 1], [1, 1, 1], [1, 1, 1]].map((r) => r.map((v) => v / 9)),
  Emboss: [[-2, -1, 0], [-1, 1, 1], [0, 1, 2]],
  "Outline": [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]],
};

const DEFAULT_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
      <defs>
        <radialGradient id="g" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#fff"/>
          <stop offset="100%" stop-color="#0c0c14"/>
        </radialGradient>
      </defs>
      <rect width="240" height="240" fill="#0c0c14"/>
      <circle cx="120" cy="100" r="65" fill="url(#g)"/>
      <rect x="40" y="170" width="160" height="14" rx="4" fill="#fff"/>
      <rect x="60" y="195" width="120" height="10" rx="3" fill="#999"/>
    </svg>`,
  );

function CNNPage() {
  const [src, setSrc] = useState<string>(DEFAULT_IMG);
  const [kernelName, setKernelName] = useState<string>("Edge (Sobel-X)");
  const [editable, setEditable] = useState<number[][]>(KERNELS["Edge (Sobel-X)"]);
  const [intensity, setIntensity] = useState(1);
  const inCanvas = useRef<HTMLCanvasElement>(null);
  const outCanvas = useRef<HTMLCanvasElement>(null);

  // Render input
  useEffect(() => {
    const c = inCanvas.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const size = 220;
      c.width = size; c.height = size;
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      runConvolution();
    };
    img.src = src;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const kernel = useMemo(() => editable.map((r) => r.map((v) => v * intensity)), [editable, intensity]);

  useEffect(() => { runConvolution(); /* eslint-disable-next-line */ }, [editable, intensity]);

  function runConvolution() {
    const inC = inCanvas.current, outC = outCanvas.current;
    if (!inC || !outC) return;
    const ctx = inC.getContext("2d")!;
    const w = inC.width, h = inC.height;
    if (w === 0) return;
    const src = ctx.getImageData(0, 0, w, h);
    outC.width = w; outC.height = h;
    const octx = outC.getContext("2d")!;
    const out = octx.createImageData(w, h);
    const k = kernel;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        let r = 0, g = 0, b = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * w + (x + kx)) * 4;
            const kv = k[ky + 1][kx + 1];
            r += src.data[idx] * kv;
            g += src.data[idx + 1] * kv;
            b += src.data[idx + 2] * kv;
          }
        }
        const oi = (y * w + x) * 4;
        out.data[oi] = Math.max(0, Math.min(255, r));
        out.data[oi + 1] = Math.max(0, Math.min(255, g));
        out.data[oi + 2] = Math.max(0, Math.min(255, b));
        out.data[oi + 3] = 255;
      }
    }
    octx.putImageData(out, 0, 0);
  }

  function pickKernel(name: string) {
    setKernelName(name);
    setEditable(KERNELS[name].map((r) => [...r]));
  }

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result as string);
    reader.readAsDataURL(f);
  }

  return (
    <ModuleLayout
      title="CNN + OpenCV Lab"
      subtitle="Convolutions are how computers see edges, textures and shapes."
      tutorial={
        <EduSection
          simple="A convolution slides a tiny grid (the kernel) over an image and computes a weighted sum at every pixel. Different kernels detect different features."
          math={<p>(I * K)(x, y) = ΣΣ I(x+i, y+j) · K(i, j). The kernel's pattern decides what the layer learns.</p>}
          realWorld={["Self-driving car cameras", "Medical imaging segmentation", "Face & object detection"]}
          mistakes={["Confusing kernel size with stride", "Forgetting padding → image shrinks", "Using only one filter to detect everything"]}
          challenge="Write your own 3×3 kernel that lights up vertical lines but ignores horizontal ones."
          takeaways={["Kernels = learned feature detectors", "Stacking convolutions builds richer features", "OpenCV gives you instant prototyping"]}
        />
      }
      visualization={
        <>
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-sm">Before / After</h3>
                <p className="text-xs text-muted-foreground">Live convolution result.</p>
              </div>
              <label className="cursor-pointer inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full glass hover:bg-white/10">
                <Upload className="size-3.5" /> Upload image
                <input type="file" className="hidden" accept="image/*" onChange={onUpload} />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Input</div>
                <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40 grid place-items-center aspect-square">
                  <canvas ref={inCanvas} className="w-full h-full" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Feature map · {kernelName}</div>
                <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40 grid place-items-center aspect-square shadow-glow-sm">
                  <canvas ref={outCanvas} className="w-full h-full" />
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-sm">Kernel editor</h3>
                <p className="text-xs text-muted-foreground">Click any cell and type a value.</p>
              </div>
              <ImageIcon className="size-4 text-primary" />
            </div>
            <div className="grid grid-cols-3 gap-2 max-w-xs">
              {editable.map((row, ry) =>
                row.map((v, rx) => (
                  <input
                    key={`${ry}-${rx}`}
                    type="number"
                    step="0.1"
                    value={v}
                    onChange={(e) => {
                      const nv = parseFloat(e.target.value || "0");
                      const next = editable.map((r) => [...r]);
                      next[ry][rx] = isFinite(nv) ? nv : 0;
                      setEditable(next);
                    }}
                    className="text-center font-mono text-sm rounded-lg bg-black/40 border border-white/10 px-2 py-2.5 focus:outline-none focus:border-primary/50"
                  />
                )),
              )}
            </div>
          </GlassCard>
        </>
      }
      controls={
        <GlassCard hover={false} className="space-y-4">
          <div>
            <h3 className="font-display font-semibold text-sm">Kernel presets</h3>
            <p className="text-xs text-muted-foreground">Pick a filter to load it.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(KERNELS).map((n) => (
              <button
                key={n}
                onClick={() => pickKernel(n)}
                className={cn(
                  "rounded-lg border px-2.5 py-2 text-[11px] font-medium transition text-left",
                  kernelName === n
                    ? "border-primary/50 bg-primary/15 text-foreground"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground",
                )}
              >
                {n}
              </button>
            ))}
          </div>
          <ParameterSlider label="Intensity" value={intensity} onChange={setIntensity} min={0.1} max={3} step={0.05} />
          <GradientButton variant="ghost" onClick={() => pickKernel(kernelName)}>Reset kernel</GradientButton>
        </GlassCard>
      }
      bottom={
        <CodePreview
          code={`import cv2, numpy as np

kernel = np.array(${JSON.stringify(editable)})
out = cv2.filter2D(img, -1, kernel * ${intensity})
cv2.imwrite("feature_map.png", out)`}
          log={[`kernel=${kernelName}`, `intensity=${intensity.toFixed(2)}`, `convolution: 3x3`, `pixels processed: 220×220`]}
        />
      }
    />
  );
}
