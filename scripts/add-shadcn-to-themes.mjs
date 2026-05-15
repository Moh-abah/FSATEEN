import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themesPath = path.resolve(__dirname, '../src/config/themes.ts');

let content = fs.readFileSync(themesPath, 'utf8');

// دالة لاستخراج قيمة خاصية من نص كائن (داخل الأقواس)
function extractValue(objText, key) {
 const regex = new RegExp(`${key}:\\s*['"]([^'"]+)['"]`, 'i');
 const match = objText.match(regex);
 return match ? match[1] : null;
}

// دالة توليد shadcn من نص الكائن الداخلي
function generateShadcn(objText) {
 const background = extractValue(objText, 'background');
 const text = extractValue(objText, 'text');
 const textInverse = extractValue(objText, 'textInverse');
 const primary = extractValue(objText, 'primary');
 const primaryLight = extractValue(objText, 'primaryLight');
 const surfaceMuted = extractValue(objText, 'surfaceMuted');
 const textSecondary = extractValue(objText, 'textSecondary');
 const border = extractValue(objText, 'border');
 const inputBorder = extractValue(objText, 'inputBorder') || border;
 const error = extractValue(objText, 'error');
 const cardBackground = extractValue(objText, 'cardBackground') || extractValue(objText, 'surface');

 const shadcn = {
  background: background,
  foreground: text,
  card: cardBackground,
  cardForeground: text,
  popover: cardBackground,
  popoverForeground: text,
  primary: primary,
  primaryForeground: textInverse,
  secondary: primaryLight,
  secondaryForeground: textInverse,
  muted: surfaceMuted,
  mutedForeground: textSecondary,
  accent: primaryLight,
  accentForeground: textInverse,
  destructive: error,
  destructiveForeground: textInverse,
  border: border,
  input: inputBorder,
  ring: primary,
  radius: '0.625rem',
 };

 let shadcnStr = JSON.stringify(shadcn, null, 2);
 shadcnStr = shadcnStr.replace(/"([^"]+)":/g, '$1:');
 return shadcnStr;
}

// الدالة الرئيسية: إضافة shadcn إلى كائن light/dark (بدون وضعه داخل gradients)
function addShadcnToLightOrDarkBlock(blockText) {
 if (blockText.includes('shadcn:')) return blockText; // موجود مسبقاً

 // نبحث عن مكان إدراج shadcn: بعد كائن gradients مباشرة (قبل chatBubbleSent)
 const gradientsIndex = blockText.indexOf('gradients:');
 if (gradientsIndex === -1) return blockText; // لا يوجد gradients؟

 // نجد نهاية كائن gradients (نحسب الأقواس)
 let braceCount = 0;
 let endGradientsIndex = -1;
 for (let i = gradientsIndex; i < blockText.length; i++) {
  if (blockText[i] === '{') braceCount++;
  else if (blockText[i] === '}') {
   braceCount--;
   if (braceCount === 0) {
    endGradientsIndex = i;
    break;
   }
  }
 }
 if (endGradientsIndex === -1) return blockText;

 // بعد انتهاء gradients، قد توجد فاصلة ثم سطر جديد. نضيف shadcn بعد الفاصلة أو قبل السطر التالي.
 const afterGradients = blockText.slice(endGradientsIndex + 1);
 const nextLineBreak = afterGradients.search(/\n/);
 let insertPos = endGradientsIndex + 1;
 if (nextLineBreak !== -1) insertPos += nextLineBreak;

 // توليد shadcn من النص الداخلي للـ block (لأنه يحتوي على كل الخصائص)
 const shadcnObj = generateShadcn(blockText);
 const shadcnStr = `\n    shadcn: ${shadcnObj},`;

 return blockText.slice(0, insertPos) + shadcnStr + blockText.slice(insertPos);
}

// تقسيم الملف إلى أجزاء light و dark باستخدام توازن الأقواس
const lines = content.split('\n');
let result = [];
let i = 0;

while (i < lines.length) {
 const line = lines[i];
 result.push(line);

 // إذا وجدنا سطراً يبدأ بـ "light: {" أو "dark: {"
 if (line.match(/\b(light|dark):\s*\{/)) {
  let braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
  let blockLines = [line];
  let j = i + 1;
  while (j < lines.length && braceCount > 0) {
   blockLines.push(lines[j]);
   braceCount += (lines[j].match(/{/g) || []).length - (lines[j].match(/}/g) || []).length;
   j++;
  }
  const fullBlock = blockLines.join('\n');
  // استخراج المحتوى الداخلي (بدون السطر الأول "light: {" وآخر قوس)
  const firstBrace = fullBlock.indexOf('{');
  const lastBrace = fullBlock.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
   const inner = fullBlock.substring(firstBrace + 1, lastBrace);
   const newInner = addShadcnToLightOrDarkBlock(inner);
   const newBlock = fullBlock.substring(0, firstBrace + 1) + '\n' + newInner + '\n' + fullBlock.substring(lastBrace);
   // استبدال النتيجة
   result.pop(); // إزالة السطر الذي أضفناه مسبقاً
   result.push(newBlock);
   i = j - 1;
  }
 }
 i++;
}

const newContent = result.join('\n');
fs.writeFileSync(themesPath, newContent, 'utf8');
console.log('✅ تم إضافة shadcn إلى جميع الثيمات في المكان الصحيح (خارج gradients)');