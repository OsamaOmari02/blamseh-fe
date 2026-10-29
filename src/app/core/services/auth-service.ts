import { Service, computed, signal } from '@angular/core';
import { User } from '@shared/models/user-model';

const MOCK_USER: User = {
  id: 'u1',
  name: 'Demo User',
  email: 'demo@blamseh.com',
};

const MOCK_PASSWORD = '123456';

const STORAGE_KEY = 'blamseh.user';

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function writeStoredUser(user: User | null) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // storage can be blocked (private mode); the session just won't survive a refresh
  }
}

@Service()
export class AuthService {
  private readonly userState = signal<User | null>(readStoredUser());

  readonly user = this.userState.asReadonly();
  readonly isLoggedIn = computed(() => this.userState() !== null);

  login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // simulates the network call
        const valid = email.trim().toLowerCase() === MOCK_USER.email && password === MOCK_PASSWORD;

        if (!valid) {
          reject(new Error('Invalid email or password'));
          return;
        }

        this.userState.set(MOCK_USER);
        writeStoredUser(MOCK_USER);
        resolve(MOCK_USER);
      }, 700);
    });
  }

  logout() {
    this.userState.set(null);
    writeStoredUser(null);
  }
}
