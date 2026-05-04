const { EdgeTTS } = require('node-edge-tts');
const fs = require('fs');
const path = require('path');

const text = `Hi, I'm Idan. I'm driven by a genuine curiosity about the fundamental nature of things - whether that's a complex AI architecture, the neuroscience of the human brain, the human experience, or just any interesting conversation. I love learning and sharing my knowledge and experiences.

I have a deep love for complexity, and an even bigger love for untangling it. Whether I'm working on a system architecture or helping someone navigate challenges, I love finding the elegant solution to every situation.

I really believe in meeting people exactly where they are. If something you see here sparks a thought, or if you just want to chat about a weird idea, I'd love to connect. I make an effort to ensure every interaction is a good one, so please don't hesitate to reach out.`;

const tts = new EdgeTTS({
  voice: 'en-US-SteffanNeural',
  lang: 'en-US',
  outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
  saveSubtitles: true,
  rate: '+30%'
});

async function generate() {
  const outDir = path.resolve(__dirname, '../public/assets/audio');
  const outPath = path.join(outDir, 'about.mp3');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('Generating audio and extracting word-level timestamps...');
  await tts.ttsPromise(text, outPath);
  console.log('Generation complete!');
  console.log('Saved audio:', outPath);
  console.log('Saved timestamps:', outPath.replace('.mp3', '.json'));
}

generate().catch(console.error);
