# Laravel Backend API untuk BEM KEMAKOM

## Setup Laravel Backend

### 1. Install Laravel
```bash
composer create-project laravel/laravel laravel-backend
cd laravel-backend
```

### 2. Install Dependencies
```bash
composer require laravel/sanctum
composer require spatie/laravel-cors
```

### 3. Setup Database
Edit `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bem_kemakom
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Run Migrations
```bash
php artisan migrate
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### 5. Setup CORS
Publish CORS config:
```bash
php artisan vendor:publish --tag="cors"
```

### 6. Generate API Routes
```bash
php artisan make:controller Api/AlumniController --api
php artisan make:controller Api/AngkatanController --api
php artisan make:controller Api/NewsController --api
php artisan make:controller Api/ModulController --api
php artisan make:controller Api/ContactController --api
php artisan make:controller Api/TimelineController --api
php artisan make:controller Api/AuthController
```

### 7. Create Models
```bash
php artisan make:model Alumni -m
php artisan make:model Angkatan -m
php artisan make:model News -m
php artisan make:model Modul -m
php artisan make:model Contact -m
php artisan make:model Timeline -m
```

### 8. Run Server
```bash
php artisan serve
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - Login
- POST `/api/auth/logout` - Logout
- GET `/api/auth/profile` - Get user profile
- POST `/api/auth/refresh` - Refresh token

### Alumni
- GET `/api/alumni` - Get all alumni
- GET `/api/alumni/{id}` - Get alumni by ID
- POST `/api/alumni` - Create alumni
- PUT `/api/alumni/{id}` - Update alumni
- DELETE `/api/alumni/{id}` - Delete alumni

### Angkatan
- GET `/api/angkatan` - Get all angkatan
- GET `/api/angkatan/{id}` - Get angkatan by ID
- POST `/api/angkatan` - Create angkatan
- PUT `/api/angkatan/{id}` - Update angkatan
- DELETE `/api/angkatan/{id}` - Delete angkatan

### News
- GET `/api/news` - Get all news
- GET `/api/news/{id}` - Get news by ID
- POST `/api/news` - Create news
- PUT `/api/news/{id}` - Update news
- DELETE `/api/news/{id}` - Delete news
- POST `/api/news/{id}/view` - Increment views

### Moduls
- GET `/api/moduls` - Get all moduls
- GET `/api/moduls/{id}` - Get modul by ID
- POST `/api/moduls` - Create modul
- PUT `/api/moduls/{id}` - Update modul
- DELETE `/api/moduls/{id}` - Delete modul
- POST `/api/moduls/{id}/download` - Increment downloads

### Contacts
- GET `/api/contacts` - Get all contacts
- GET `/api/contacts/{id}` - Get contact by ID
- POST `/api/contacts` - Create contact
- PUT `/api/contacts/{id}` - Update contact
- DELETE `/api/contacts/{id}` - Delete contact

### Timeline
- GET `/api/timeline` - Get all timeline
- GET `/api/timeline/{id}` - Get timeline by ID
- POST `/api/timeline` - Create timeline
- PUT `/api/timeline/{id}` - Update timeline
- DELETE `/api/timeline/{id}` - Delete timeline

## Database Schema

Lihat file migration di folder `database/migrations/` untuk struktur database lengkap.

## Seeding Data

Jalankan seeder untuk mengisi data awal:
```bash
php artisan db:seed
```