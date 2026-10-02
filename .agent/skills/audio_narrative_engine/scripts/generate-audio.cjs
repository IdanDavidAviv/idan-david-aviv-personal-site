const { EdgeTTS } = require('node-edge-tts');
const fs = require('fs');
const path = require('path');

// Authoritative narrative text. Paragraphs MUST be separated by '\n\n' for Edge TTS to output paragraph breaks in timestamps.
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
  const projectRoot = path.resolve(__dirname, '../../../../');
  const outDir = path.join(projectRoot, 'public/assets/audio');
  const outPath = path.join(outDir, 'about.mp3');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('Generating audio and extracting word-level timestamps via EdgeTTS...');
  console.log(`Voice: en-US-SteffanNeural | Rate: +30% | Output: ${outPath}`);
  await tts.ttsPromise(text, outPath);

  // node-edge-tts creates ${outPath}.json (e.g. about.mp3.json)
  const generatedJsonPath = outPath + '.json';
  const targetJsonPath = path.join(outDir, 'about.json');
  if (fs.existsSync(generatedJsonPath)) {
    fs.copyFileSync(generatedJsonPath, targetJsonPath);
    fs.unlinkSync(generatedJsonPath);
  }

  console.log('Generation complete!');
  console.log('Saved audio:', outPath);
  console.log('Saved timestamps:', targetJsonPath);
}

generate().catch((err) => {
  console.error('Audio generation failed:', err);
  process.exit(1);
});
