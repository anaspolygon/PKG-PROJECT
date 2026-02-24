import { NextRequest, NextResponse } from 'next/server';
import { locales } from '@/i18n/request';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const { searchParams } = new URL(request.url);
  const namespacesParam = searchParams.get('namespaces');

  if (!locales.includes(locale as typeof locales[number])) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
  }

  try {
    // Dynamically import the messages
    const allMessages = (await import(`../../../../../messages/${locale}.json`)).default;
    
    let messages = allMessages;
    
    // Filter by namespaces if specified
    if (namespacesParam) {
      const namespaces = namespacesParam.split(',').map(ns => ns.trim());
      const filteredMessages: Record<string, unknown> = {};
      
      for (const namespace of namespaces) {
        if (allMessages[namespace]) {
          filteredMessages[namespace] = allMessages[namespace];
        }
      }
      
      messages = filteredMessages;
    }
    
    // Set cache headers for better performance
    return NextResponse.json(messages, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 });
  }
}
