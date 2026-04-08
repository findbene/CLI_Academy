import { promises as fs } from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { getAssetBySlug, getAssetVariant } from "@/lib/assets";
import { applySupabaseHeaders, createSupabaseServerClient } from "@/lib/supabase/server";

const ASSET_ROOT = path.resolve(process.cwd(), "..", "..", "content", "assets");

function buildErrorResponse(
  body: Record<string, unknown>,
  status: number,
  responseHeaders?: Headers,
) {
  const response = NextResponse.json(body, { status });
  return responseHeaders ? applySupabaseHeaders(response, responseHeaders) : response;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<unknown> },
) {
  const resolvedParams = (await params) as { slug?: string };
  const slug = resolvedParams.slug;

  if (!slug) {
    return buildErrorResponse({ message: "Asset slug is missing.", ok: false }, 400);
  }

  const asset = getAssetBySlug(slug);

  if (!asset) {
    return buildErrorResponse({ message: "Asset not found.", ok: false }, 404);
  }

  const variant = getAssetVariant(asset, request.nextUrl.searchParams.get("format"));
  if (!variant) {
    return buildErrorResponse({ message: "Requested asset format is not available.", ok: false }, 404);
  }

  let responseHeaders: Headers | undefined;

  if (asset.tier === "pro") {
    const supabaseContext = await createSupabaseServerClient();
    if (!supabaseContext) {
      return buildErrorResponse(
        { message: "Supabase is not configured yet, so Pro downloads are unavailable.", ok: false },
        503,
      );
    }

    responseHeaders = supabaseContext.responseHeaders;

    const {
      data: { user },
    } = await supabaseContext.supabase.auth.getUser();

    if (!user) {
      return buildErrorResponse(
        { message: "Sign in to download Pro assets.", ok: false },
        401,
        responseHeaders,
      );
    }

    const { data: profile } = await supabaseContext.supabase
      .from("profiles")
      .select("tier")
      .eq("id", user.id)
      .maybeSingle();

    const isPro = profile?.tier === "pro" || (user.email && process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL);

    if (!isPro) {
      return buildErrorResponse(
        { message: "Upgrade to Pro to access this asset.", ok: false },
        403,
        responseHeaders,
      );
    }
  }

  const absolutePath = path.resolve(ASSET_ROOT, variant.storagePath);
  const relativePath = path.relative(ASSET_ROOT, absolutePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return buildErrorResponse({ message: "Asset path is invalid.", ok: false }, 400, responseHeaders);
  }

  try {
    const file = await fs.readFile(absolutePath);
    const response = new NextResponse(file, {
      headers: {
        "Cache-Control": asset.tier === "pro" ? "private, no-store" : "public, max-age=3600",
        "Content-Disposition": `attachment; filename="${variant.fileName}"`,
        "Content-Type": variant.mimeType,
      },
      status: 200,
    });

    return responseHeaders ? applySupabaseHeaders(response, responseHeaders) : response;
  } catch (err) {
    console.error(`[assets] Failed to read asset file for slug "${slug}":`, err);

    return buildErrorResponse(
      { message: "The asset file could not be read.", ok: false },
      500,
      responseHeaders,
    );
  }
}
