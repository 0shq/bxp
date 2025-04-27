import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getLLMService, getCached, setCached, checkRateLimit } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skill, description, files, wallet, webLink } = body;

    // Validate input
    if (!description || !wallet) {
      return NextResponse.json(
        { error: 'Missing required fields (description, wallet)' },
        { status: 400 }
      );
    }

    // Rate limiting (per wallet)
    if (!checkRateLimit(wallet)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const llm = getLLMService();
    // Use cache key based on description+files+webLink
    const cacheKey = JSON.stringify({ description, files, webLink });
    let aiResult = getCached('proof', cacheKey);
    if (!aiResult) {
      // Run AI validation (single call)
      aiResult = await llm.analyzeSubmission(description, files, webLink);
      setCached('proof', aiResult, cacheKey);
    }

    // Normalize confidence to 0-100
    if (aiResult && typeof aiResult.confidence === 'number') {
      if (aiResult.confidence <= 1) {
        aiResult.confidence = Math.round(aiResult.confidence * 100);
      } else {
        aiResult.confidence = Math.round(aiResult.confidence);
      }
    }

    // TODO: Upload files to IPFS/Shadow Drive
    const fileUrls: string[] = [];

    // TODO: Mint NFT with metadata
    const nftMetadata = {
      ...aiResult,
      description,
      fileUrls,
      webLink,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({ data: aiResult });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'AI validation failed' }, { status: 500 });
  }
} 