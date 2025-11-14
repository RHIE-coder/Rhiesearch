import fs from "fs";

// 원본 VTT 텍스트 (예시)
const vttText = fs.readFileSync("./target.vtt", "utf-8");
const segments = JSON.parse(fs.readFileSync("./segments.json", "utf-8"));

const lines = vttText.split("\n");

// ✅ VTT에서 (start, end, text) 추출
const subtitles = [];
let current = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const timeMatch = line.match(
    /^(\d{2}):(\d{2}):(\d{2}\.\d{3})\s-->\s(\d{2}):(\d{2}):(\d{2}\.\d{3})$/
  );
  if (timeMatch) {
    const start =
      Number(timeMatch[1]) * 3600000 +
      Number(timeMatch[2]) * 60000 +
      Number(timeMatch[3]) * 1000;
    const end =
      Number(timeMatch[4]) * 3600000 +
      Number(timeMatch[5]) * 60000 +
      Number(timeMatch[6]) * 1000;

    current = { start, end, text: "" };
    subtitles.push(current);
  } else if (current) {
    // 자막 본문 누적
    current.text += (current.text ? " " : "") + line;
  }
}

// ✅ 밀리초(ms) → "HH:MM:SS.mmm" 변환 함수
function msToTimestamp(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const millis = Math.floor(ms % 1000);

  const pad = (n, z = 2) => String(n).padStart(z, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(millis, 3)}`;
}


// ✅ segment 매핑
function collectTextForSegment(seg, subs) {
const texts = subs
  .filter((s) => s.end > seg.start && s.start < seg.end)
  .map((s) => s.text.trim());
return texts.join("\n");
}

// ✅ 결과 만들기
const results = segments.map((seg, i) => {
  const text = collectTextForSegment(seg, subtitles);

  const { termYn, symbolYn, formulaYn } = seg;

  return {
    index: i + 1,
    start: msToTimestamp(seg.start),
    end: msToTimestamp(seg.end),
    score: seg.score,
    reason: seg.reason,
    전문용어: termYn ? "빡셈" : "괜찮음",
    기호: symbolYn? "빡셈" : "괜찮음",
    수식: formulaYn? "빡셈" : "괜찮음",
    text,
  };
});

// ✅ 테스트 출력
console.log(results);