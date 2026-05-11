import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory and file exist
async function ensureUsersFile() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify({}, null, 2));
  }
}

async function getUsers() {
  await ensureUsersFile();
  const data = await fs.readFile(USERS_FILE, 'utf8');
  return JSON.parse(data || '{}');
}

async function saveUsers(users) {
  await ensureUsersFile();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name, phone, college, gender, photoUrl } = body;

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const users = await getUsers();
    if (users[email]) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set default avatar based on gender if no photo uploaded
    const defaultAvatars = {
      male: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male&gender=male',
      female: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female&gender=female',
      default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
    };

    const finalPhotoUrl = photoUrl || defaultAvatars[gender] || defaultAvatars.default;

    // Create user
    const user = {
      email,
      password: hashedPassword,
      name,
      phone: phone || '',
      college: college || '',
      gender: gender || 'default',
      photoUrl: finalPhotoUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save user
    users[email] = user;
    await saveUsers(users);

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Signup successful',
      user: userWithoutPassword,
      token
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
