'use client';

import * as React from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import styles from './VoiceRecorder.module.css';

interface VoiceRecorderProps {
  onRecordingComplete?: (transcript: string) => void;
}

export function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [transcript, setTranscript] = React.useState('');

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleToggleRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setIsProcessing(true);
      
      // Mock AI processing delay to simulate speech-to-text
      setTimeout(() => {
        const mockTranscript = "I am looking to sell my 3 BHK apartment in Whitefield because I am moving to the US next month. The Khata is currently in my father's name, so I need to know if that will be an issue for the sale.";
        setTranscript(mockTranscript);
        setIsProcessing(false);
        if (onRecordingComplete) {
          onRecordingComplete(mockTranscript);
        }
      }, 2000);
      
    } else {
      // Start recording
      setTranscript('');
      setDuration(0);
      setIsRecording(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className={styles.container}>
      <button 
        onClick={handleToggleRecord}
        className={`${styles.recordButton} ${isRecording ? styles.recording : ''}`}
        disabled={isProcessing}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isProcessing ? (
          <Loader2 size={32} className="animate-spin" />
        ) : isRecording ? (
          <Square size={32} fill="currentColor" />
        ) : (
          <Mic size={32} />
        )}
      </button>

      <div className={styles.timer}>
        {formatTime(duration)}
      </div>

      <p className={styles.instruction}>
        {isRecording 
          ? 'Recording... Tap to stop.' 
          : 'Tap to record your scenario. E.g., "I need to sell because..."'}
      </p>

      {(transcript || isProcessing) && (
        <div className={styles.transcriptContainer}>
          {isProcessing ? (
            <p className={`${styles.transcriptText} ${styles.placeholder}`}>
              Processing voice note with AI...
            </p>
          ) : (
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--primary-color)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>
                AI TRANSCRIPT
              </p>
              <p className={styles.transcriptText}>{transcript}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
