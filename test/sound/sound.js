// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const duration = 0.1;
const frequency = 1000; // Frequency in Hertz (adjust to change the pitch)
const volume = 0.5; // Volume (0.0 to 1.0)

// Create an oscillator node
const oscillator = audioContext.createOscillator();
oscillator.type = "sine"; // Sine wave for a simple beep
oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
oscillator.connect(audioContext.destination);

// Start the oscillator
oscillator.start();
oscillator.stop(audioContext.currentTime + duration);

// Set the volume
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
gainNode.gain.exponentialRampToValueAtTime(
  0.01,
  audioContext.currentTime + duration
);
gainNode.connect(audioContext.destination);

// Play the beep
const soundPlay = setTimeout(() => {
  oscillator.connect(gainNode);
}, 3000);

module.exports = soundPlay;
