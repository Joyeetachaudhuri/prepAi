import { useState, useEffect, useCallback } from "react"

export function useMediaStream() {
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [isMicOn, setIsMicOn] = useState(true)
    const [isCameraOn, setIsCameraOn] = useState(true)

    useEffect(() => {
        let activeStream: MediaStream | null = null

        async function initStream() {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                })
                activeStream = mediaStream
                setStream(mediaStream)
            } catch (err) {
                console.error("Error accessing media devices:", err)
                setError(err instanceof Error ? err : new Error("Failed to access media"))
            }
        }

        initStream()

        return () => {
            if (activeStream) {
                activeStream.getTracks().forEach(track => track.stop())
            }
        }
    }, [])

    const toggleMic = useCallback(() => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0]
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled
                setIsMicOn(audioTrack.enabled)
            }
        }
    }, [stream])

    const toggleCamera = useCallback(() => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0]
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled
                setIsCameraOn(videoTrack.enabled)
            }
        }
    }, [stream])

    return { stream, error, isMicOn, isCameraOn, toggleMic, toggleCamera }
}
