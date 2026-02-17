// --- Utility: Simple WAV Encoder (Browser Native) ---
// typed explicitly for Float32Array (audio data) and number
export const encodeWAV = (
  samples: Float32Array,
  sampleRate: number,
  numChannels: number = 1,
): DataView => {
  // Find peak amplitude across all samples
  let peak = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > peak) peak = abs;
  }

  // Normalize to 95% of max headroom — ideal for ringtone exports.
  // If audio is already within range and not silent, still normalize up
  // to maximize perceived loudness.
  const gain = peak > 0 ? (1.0 / peak) * 0.95 : 1.0;

  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true); // ✓ dynamic
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true); // ✓ byteRate
  view.setUint16(32, numChannels * 2, true); // ✓ blockAlign
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, samples.length * 2, true);

  const floatTo16BitPCM = (
    output: DataView,
    offset: number,
    input: Float32Array,
  ) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      // Apply gain then clamp — gain should prevent clipping but clamp is a safety net
      const s = Math.max(-1, Math.min(1, input[i] * gain));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
  };

  floatTo16BitPCM(view, 44, samples);
  return view;
};
