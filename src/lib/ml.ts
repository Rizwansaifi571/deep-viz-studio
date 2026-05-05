// Lightweight ML helpers used by the interactive playgrounds.

export const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
export const dSigmoid = (x: number) => {
  const s = sigmoid(x);
  return s * (1 - s);
};
export const relu = (x: number) => Math.max(0, x);
export const dRelu = (x: number) => (x > 0 ? 1 : 0);
export const tanh = (x: number) => Math.tanh(x);
export const dTanh = (x: number) => 1 - Math.tanh(x) ** 2;
export const leakyRelu = (x: number, a = 0.1) => (x > 0 ? x : a * x);
export const dLeakyRelu = (x: number, a = 0.1) => (x > 0 ? 1 : a);

export type ActivationName = "sigmoid" | "relu" | "tanh" | "leaky";

export const ACTIVATIONS: Record<ActivationName, { f: (x: number) => number; d: (x: number) => number; label: string; formula: string }> = {
  sigmoid: { f: sigmoid, d: dSigmoid, label: "Sigmoid", formula: "σ(x) = 1 / (1 + e⁻ˣ)" },
  relu: { f: relu, d: dRelu, label: "ReLU", formula: "f(x) = max(0, x)" },
  tanh: { f: tanh, d: dTanh, label: "Tanh", formula: "tanh(x)" },
  leaky: { f: (x) => leakyRelu(x), d: (x) => dLeakyRelu(x), label: "Leaky ReLU", formula: "f(x) = x if x>0 else 0.1x" },
};

// Generate a 2D linearly-separable dataset
export function makeBlobs(n = 60, seed = 7) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const pts: { x: number; y: number; label: 0 | 1 }[] = [];
  for (let i = 0; i < n; i++) {
    const c = i % 2 === 0 ? 0 : 1;
    const cx = c === 0 ? -1.2 : 1.2;
    const cy = c === 0 ? -0.6 : 0.8;
    pts.push({
      x: cx + (rand() - 0.5) * 1.6,
      y: cy + (rand() - 0.5) * 1.6,
      label: c as 0 | 1,
    });
  }
  return pts;
}

// Train a perceptron, return weights, bias and per-epoch loss
export function trainPerceptron(
  data: { x: number; y: number; label: 0 | 1 }[],
  lr: number,
  epochs: number,
) {
  let w1 = 0.1, w2 = -0.2, b = 0;
  const losses: number[] = [];
  for (let e = 0; e < epochs; e++) {
    let loss = 0;
    for (const p of data) {
      const z = w1 * p.x + w2 * p.y + b;
      const pred = sigmoid(z);
      const err = pred - p.label;
      loss += err * err;
      w1 -= lr * err * p.x;
      w2 -= lr * err * p.y;
      b -= lr * err;
    }
    losses.push(loss / data.length);
  }
  return { w1, w2, b, losses };
}

// f(x) = (x - 2)^2 — simple convex demo
export const gdLoss = (x: number) => (x - 2) ** 2;
export const gdGrad = (x: number) => 2 * (x - 2);

export function gradientDescent(start: number, lr: number, steps: number) {
  const path: { step: number; x: number; loss: number }[] = [];
  let x = start;
  for (let i = 0; i <= steps; i++) {
    path.push({ step: i, x, loss: gdLoss(x) });
    x = x - lr * gdGrad(x);
    if (!isFinite(x) || Math.abs(x) > 1e6) break;
  }
  return path;
}

export function classifyPoint(w1: number, w2: number, b: number, x: number, y: number) {
  return sigmoid(w1 * x + w2 * y + b);
}
