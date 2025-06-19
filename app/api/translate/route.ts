// /app/api/translate/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text } = await req.json();

  try {
    const hfRes = await fetch('https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-hi', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: text
      })
    });

    const data = await hfRes.json();
    const translatedText = data[0]?.translation_text;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Hugging Face translation error:", error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
