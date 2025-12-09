"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactEventHandler,
} from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin, {
  Region,
} from "wavesurfer.js/dist/plugins/regions.esm.js";
import { Upload, Play, Pause, Download, Music } from "lucide-react";
import useStateData from "@/hooks/useStateData";
import { encodeWAV } from "@/utils/encodeWave";

const CuteRingtoneMaker: React.FC = () => {
  // refs
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const regionsRef = useRef<RegionsPlugin | null>(null);

  // States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [fileLoaded, setFileLoaded] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  // Note: duration is used for logic but not rendered in this simplified UI
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [duration, setDuration] = useState<number>(0);

  // Initialize Wavesurfer
  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#C4B5FD", // Soft Purple
        progressColor: "#8B5CF6", // Darker Purple
        cursorColor: "#EC4899", // Pink
        barWidth: 3,
        barRadius: 3,
        height: 120,
        normalize: true,
      });

      // Add Regions Plugin
      const wsRegions = wavesurferRef.current.registerPlugin(
        RegionsPlugin.create()
      );
      regionsRef.current = wsRegions;

      wavesurferRef.current.on("decode", (d: number) => {
        setDuration(d);
        // Add a default 30s region
        wsRegions.addRegion({
          start: 0,
          end: Math.min(30, d),
          color: "rgba(236, 72, 153, 0.3)", // Pink with opacity
          drag: true,
          resize: true,
        });
      });

      wavesurferRef.current.on("play", () => setIsPlaying(true));
      wavesurferRef.current.on("pause", () => setIsPlaying(false));

      // Force 30s limit logic on region update
      // Edit to create longer duration
      wsRegions.on("region-updated", (region: Region) => {
        if (region.end - region.start > 30) {
          region.setOptions({ end: region.start + 30 });
        }
        region.play();
      });

      wsRegions.on("region-out", (region) => {
        console.log("region-out", region);
        region.play();
      });
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileLoaded(true);
      const url = URL.createObjectURL(file);
      console.log(url);

      if (wavesurferRef.current) {
        wavesurferRef.current.load(url);
      }
    }
  };

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  // Logic to cut audio and download
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

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-xl overflow-hidden border-4 border-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-300 to-purple-300 p-8 text-center">
          <div className="inline-flex items-center justify-center bg-white p-3 rounded-full mb-4 shadow-sm">
            <Music className="text-pink-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-sm">
            Toneify
          </h1>
          <p className="text-white/90 mt-2 font-medium">
            Make your phone sound cute! ✨
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* Step 1: Upload */}
          {!fileLoaded && (
            <div className="border-4 border-dashed border-pink-200 rounded-3xl p-10 flex flex-col items-center justify-center bg-pink-50/50 hover:bg-pink-100/50 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="bg-white p-4 rounded-full shadow-md mb-4">
                <Upload className="text-pink-400 w-8 h-8" />
              </div>
              <p className="text-pink-400 font-bold text-lg">
                Drop your bop here
              </p>
              <p className="text-pink-300 text-sm">MP3, WAV, or FLAC</p>
            </div>
          )}

          {/* Step 2: Editor */}
          <div className={fileLoaded ? "block" : "hidden"}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full">
                <Music className="w-4 h-4 text-purple-400" />
                <span className="text-purple-600 font-medium truncate max-w-[150px]">
                  {fileName}
                </span>
              </div>
              <div className="text-xs font-bold text-pink-400 uppercase tracking-widest bg-pink-100 px-3 py-1 rounded-full">
                Max 30s
              </div>
            </div>

            {/* Waveform Container */}
            <div
              ref={waveformRef}
              className="w-full rounded-xl overflow-hidden bg-purple-50 border-2 border-purple-100 mb-6"
            />

            {/* Controls */}
            <div className="flex justify-center mb-8">
              <button
                onClick={handlePlayPause}
                className="bg-pink-400 hover:bg-pink-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                {isPlaying ? (
                  <Pause fill="currentColor" />
                ) : (
                  <Play fill="currentColor" className="ml-1" />
                )}
              </button>
            </div>

            {/* Step 3: Export */}
            <div className="border-t-2 border-gray-100 pt-6">
              <p className="text-center text-gray-400 mb-4 text-sm font-medium">
                Ready to export? Pick your device!
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleExport("ios")}
                  className="flex-1 group relative bg-white border-2 border-blue-200 hover:border-blue-400 rounded-2xl p-4 flex flex-col items-center transition-all hover:-translate-y-1"
                >
                  <div className="bg-blue-100 p-2 rounded-full mb-2 group-hover:bg-blue-200 transition-colors">
                    <Download className="text-blue-500 w-6 h-6" />
                  </div>
                  <span className="text-blue-500 font-bold">iPhone</span>
                  <span className="text-blue-300 text-xs">.m4r</span>
                </button>

                <button
                  onClick={() => handleExport("android")}
                  className="flex-1 group relative bg-white border-2 border-green-200 hover:border-green-400 rounded-2xl p-4 flex flex-col items-center transition-all hover:-translate-y-1"
                >
                  <div className="bg-green-100 p-2 rounded-full mb-2 group-hover:bg-green-200 transition-colors">
                    <Download className="text-green-500 w-6 h-6" />
                  </div>
                  <span className="text-green-500 font-bold">Android</span>
                  <span className="text-green-300 text-xs">.mp3</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuteRingtoneMaker;
