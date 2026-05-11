import { NextResponse } from 'next/server';
import { adminStorage } from '@/firebase/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    if (!adminStorage) {
      return NextResponse.json(
        { error: 'Firebase Storage not initialized' },
        { status: 500 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const fileName = `profile-photos/${uuidv4()}-${file.name}`;
    const bucket = adminStorage.bucket();
    const fileUpload = bucket.file(fileName);

    // Upload to Firebase Storage
    await fileUpload.save(buffer, {
      contentType: file.type,
      metadata: {
        contentType: file.type
      }
    });

    // Make file publicly accessible
    await fileUpload.makePublic();

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return NextResponse.json({
      url: publicUrl,
      fileName
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
