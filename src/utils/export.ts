const handleExport = useCallback((format: "ios" | "android") => {
  if (!wavesurferRef.current || !regionsRef.current) return;

  // Get the first region (our selection)
  const regions = regionsRef.current.getRegions();
  if (regions.length === 0) {
    alert("Please select a region first!");
    return;
  }

  const region = regions[0];
  const start = region.start;
  const end = region.end;

  // Get original AudioBuffer
  const originalBuffer = wavesurferRef.current.getDecodedData();

  if (!originalBuffer) {
    alert("Audio data not ready yet.");
    return;
  }

  const sampleRate = originalBuffer.sampleRate;

  // Calculate start/end frames
  const startFrame = Math.floor(start * sampleRate);
  const endFrame = Math.floor(end * sampleRate);

  // Create a new buffer for the snippet
  // Extracting Mono channel (Channel 0) for simplicity
  const channelData = originalBuffer
    .getChannelData(0)
    .slice(startFrame, endFrame);

  // Encode to WAV
  const wavData = encodeWAV(channelData, sampleRate);
  // Convert DataView to a Uint8Array (respecting byteOffset/byteLength) so it's a valid BlobPart
  const wavUint8 = new Uint8Array(
    // DataView.buffer is ArrayBufferLike in lib types, so create a Uint8Array view with proper offset/length
    (wavData as DataView).buffer as ArrayBuffer,
    (wavData as DataView).byteOffset,
    (wavData as DataView).byteLength
  );
  const blob = new Blob([wavUint8], { type: "audio/wav" });

  // Create Download Link
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;

  const extension = format === "ios" ? "m4r" : "mp3";

  a.download = `ringtone-${Date.now()}.${extension}`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}, []);
