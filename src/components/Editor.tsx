"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin, {
  Region,
} from "wavesurfer.js/dist/plugins/regions.esm.js";
import { Play, Pause, Download, Music } from "lucide-react";
import useStateData from "@/hooks/useStateData";
import { encodeWAV } from "@/utils/encodeWave";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const Editor: React.FC = () => {
  // refs
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const regionsRef = useRef<RegionsPlugin | null>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  // States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [fileLoaded, setFileLoaded] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [ffmpegLoaded, setFFmpegLoaded] = useState<boolean>(false);

  // Note: duration is used for logic but not rendered in this simplified UI
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [duration, setDuration] = useState<number>(0);

  const { data, handleSubmitted } = useStateData();

  // Initialize FFmpeg on component mount
  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpegRef.current) {
        const ffmpeg = new FFmpeg();
        ffmpegRef.current = ffmpeg;

        // Logging ffmpeg: optional
        ffmpeg.on("log", ({ message }) => {
          console.log("[FFmpeg]", message);
        });

        await ffmpeg.load();
        setFFmpegLoaded(true);
      }
    };

    loadFFmpeg();
  }, []);

  // Initialize Wavesurfer
  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#104e64", //#C4B5FD // Soft Purple
        progressColor: "#EC4899", // Darker Purple
        cursorColor: "#EC4899", // Pink
        barWidth: 3,
        barRadius: 3,
        height: 120,
        normalize: true,
      });

      // Add Regions Plugin
      const wsRegions = wavesurferRef.current.registerPlugin(
        RegionsPlugin.create(),
      );
      regionsRef.current = wsRegions;

      wavesurferRef.current.on("decode", (d: number) => {
        setDuration(d);
        // Add a default 30s region
        wsRegions.addRegion({
          start: 0,
          end: Math.min(30, d),
          color: "rgba(0, 255, 255, 0.3)", // Pink with opacity
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

  /*   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }; */

  useEffect(() => {
    try {
      if (data) {
        setFileName(data?.data?.result?.author?.username);
        setFileLoaded(true);

        if (wavesurferRef.current) {
          wavesurferRef.current.load(data.data.result.music.playUrl[0]);
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }, [data]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  // Logic to cut audio and download
  const handleExport = useCallback(
    async (format: "ios" | "android") => {
      if (!wavesurferRef.current || !regionsRef.current || !ffmpegRef.current)
        return;

      // Get the first region (our selection)
      const regions = regionsRef.current.getRegions();
      if (regions.length === 0) {
        alert("Please select a region first!");
        return;
      }

      if (!ffmpegLoaded) {
        alert("Audio converter is still loading, please wait...");
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
      const numChannels = originalBuffer.numberOfChannels;
      const startFrame = Math.floor(start * sampleRate);
      const endFrame = Math.floor(end * sampleRate);
      const frameCount = endFrame - startFrame;

      // Interleave all channels (e.g. L,R,L,R... for stereo)
      const interleaved = new Float32Array(frameCount * numChannels);
      for (let channel = 0; channel < numChannels; channel++) {
        const channelData = originalBuffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
          interleaved[i * numChannels + channel] = channelData[startFrame + i];
        }
      }

      const wavData = encodeWAV(interleaved, sampleRate, numChannels);

      // Convert DataView to a Uint8Array (respecting byteOffset/byteLength) so it's a valid BlobPart
      const wavUint8 = new Uint8Array(
        // DataView.buffer is ArrayBufferLike in lib types, so create a Uint8Array view with proper offset/length
        (wavData as DataView).buffer as ArrayBuffer,
        (wavData as DataView).byteOffset,
        (wavData as DataView).byteLength,
      );

      try {
        const ffmpeg = ffmpegRef.current;

        // Write WAV to FFmpeg's virtual filesystem
        await ffmpeg.writeFile("input.wav", wavUint8);

        if (format == "ios") {
          // iOS ringtones: AAC codec, M4A container, renamed to .m4r
          // Max 40 seconds, fade in/out recommended

          await ffmpeg.exec([
            "-i",
            "input.wav",
            "-c:a",
            "aac", // AAC codec
            "-b:a",
            "128k", // Bitrate
            "-ar",
            "44100", // Sample rate (iOS compatible)
            "-ac",
            "2", // Stereo
            "-f",
            "ipod", // M4A container optimized for iPod/iOS
            "output.m4r",
          ]);
        } else {
          // Android: MP3 format
          await ffmpeg.exec([
            "-i",
            "input.wav",
            "-c:a",
            "libmp3lame", // MP3 codec
            "-b:a",
            "192k", // Bitrate
            "-ar",
            "44100", // Sample rate
            "output.mp3",
          ]);
        }

        // Read the output file
        const outputFilename = format === "ios" ? "output.m4r" : "output.mp3";
        const data = (await ffmpeg.readFile(outputFilename)) as Uint8Array;

        // Clone the data to ensure proper typing
        const blobData = new Uint8Array(data);

        // Create blob and download
        const mimeType = format === "ios" ? "audio/mp4" : "audio/mpeg";
        const blob = new Blob([blobData], { type: mimeType });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `ringtone-${Date.now()}.${format === "ios" ? "m4r" : "mp3"}`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 100);

        // Clean up FFmpeg virtual filesystem
        await ffmpeg.deleteFile("input.wav");
        await ffmpeg.deleteFile(outputFilename);
      } catch (error) {
        console.error("FFmpeg conversion error:", error);
        alert("Failed to convert audio. Please try again.");
      }
    },
    [ffmpegLoaded],
  );

  return (
    <div className="w-full lg:mt-8 bg-cyan-50 flex items-center justify-center sm:p-3 font-sans">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-xl overflow-hidden border-4 border-white">
        {/* Header */}
        <div className="p-8 space-y-8">
          {/* Upload */}
          {/*           {!fileLoaded && (
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
          )} */}

          {/* Editor */}
          <div className={fileLoaded ? "block" : "hidden"}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 bg-cyan-50 px-4 py-2 rounded-full">
                <Music className="w-4 h-4 text-cyan-900" />
                <span className="text-cyan-900 font-medium truncate max-w-[150px]">
                  {fileName}
                </span>
              </div>
              <div className="text-xs font-bold text-cyan-900 uppercase tracking-widest bg-cyan-100 px-3 py-1 rounded-full">
                Max 30s
              </div>
            </div>

            {/* Waveform Container */}
            <div
              ref={waveformRef}
              className="w-full rounded-xl overflow-hidden bg-cyan-50 border-2 border-cyan-100 mb-6"
            />

            {/* Controls */}
            <div className="flex justify-center mb-8">
              <button
                onClick={handlePlayPause}
                className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
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

export default Editor;
