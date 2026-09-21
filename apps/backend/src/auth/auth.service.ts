import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(email: string, password: string) {
    if (!email || !password) {
      return {
        ok: false,
        code: 'INVALID_CREDENTIALS',
        message: 'Email and password are required.'
      };
    }

    return {
      ok: true,
      message: 'Authentication request accepted by backend.',
      sessionId: `session_${Math.random().toString(36).slice(2)}`,
      user: {
        id: 'usr_001',
        email,
        role: 'ADMIN',
        status: 'ACTIVE'
      }
    };
  }
}
