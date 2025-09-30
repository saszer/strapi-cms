# AI2Fin Strapi CMS

This is the Strapi CMS backend for AI2Fin blog and content management.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp env.example .env
```

3. Generate secure secrets and update `.env`:
```bash
node -e "console.log('APP_KEYS=' + Array.from({length:4},()=>require('crypto').randomBytes(32).toString('hex')).join(','))"
node -e "['API_TOKEN_SALT','ADMIN_JWT_SECRET','JWT_SECRET','TRANSFER_TOKEN_SALT','WEBHOOKS_SECRET'].forEach(k=>console.log(k+'='+require('crypto').randomBytes(32).toString('hex')))"
```

4. Start development server:
```bash
npm run develop
```

## Strapi Cloud Deployment

This project is configured for Strapi Cloud with:
- PostgreSQL database connection
- Environment-based configuration
- Cloud-optimized settings

## Content Types

The CMS includes:
- Author (name, bio, avatar)
- BlogPost (title, content, excerpt, featured image)
- Category (name, description)
- Tag (name)

## API Access

- Public API: `/api/blog-posts`, `/api/authors`, `/api/categories`, `/api/tags`
- Admin Panel: `/admin`
- API Documentation: `/documentation`

