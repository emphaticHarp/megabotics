# Headline/Announcement System - Complete Setup

## Overview
Dynamic headline system with ON/OFF toggle that saves to MongoDB and displays on the products page with scrolling animation.

## What's Included

### 1. **Database Model** (`lib/models/Headline.ts`)
- Text field for announcement
- isActive boolean for ON/OFF toggle
- Timestamps for tracking

### 2. **API Endpoints** (`app/api/headlines/route.ts`)

#### GET `/api/headlines`
- Fetch active headline
- Returns only if isActive is true

#### POST `/api/headlines`
- Save or update headline
- Automatically deactivates other headlines
- Sets isActive status

### 3. **Admin Panel** (`app/admin/products/page.tsx`)

#### Features:
- **ON/OFF Toggle Button** - Green when ON, Gray when OFF
- **Edit Button** - Opens form to edit text
- **Save Button** - Saves to database
- **Live Preview** - Shows scrolling text when ON
- **Status Display** - Shows "Headline is OFF" when disabled

#### How to Use:
1. Go to `/admin/products`
2. Click "Edit" button on headline banner
3. Enter announcement text
4. Click "ON" button to activate (turns green)
5. Click "Save" to save to database
6. Headline appears on products page immediately

### 4. **Frontend Component** (`components/headline-banner.tsx`)

#### Features:
- Fetches active headline from database
- Auto-refreshes every 30 seconds
- Only displays if isActive is true
- Scrolling animation (right to left)
- Responsive design

#### Usage:
```tsx
import { HeadlineBanner } from '@/components/headline-banner';

export default function Page() {
  return (
    <>
      <HeadlineBanner />
      {/* Rest of page */}
    </>
  );
}
```

### 5. **Products Page Integration**
- HeadlineBanner component added to products page
- Displays at top of page
- Auto-updates when admin changes headline
- Only shows when headline is active

## How It Works

### Admin Side:
1. Admin goes to `/admin/products`
2. Sees headline banner with ON/OFF toggle
3. Clicks "Edit" to open form
4. Types announcement text
5. Clicks "ON" button (turns green)
6. Clicks "Save" button
7. Headline is saved to MongoDB with isActive=true

### Frontend Side:
1. HeadlineBanner component loads on products page
2. Fetches headline from `/api/headlines`
3. If isActive=true and text exists, displays scrolling banner
4. Auto-refreshes every 30 seconds
5. If isActive=false, component returns null (hidden)

## Database Schema

```javascript
{
  text: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Features

✅ ON/OFF toggle button (shadcn style)
✅ Save to MongoDB
✅ Display on products page
✅ Scrolling animation (right to left)
✅ Auto-refresh every 30 seconds
✅ Only shows when active
✅ Edit form in admin panel
✅ Real-time updates

## File Structure

```
lib/models/
  └── Headline.ts

app/api/headlines/
  └── route.ts

app/admin/products/
  └── page.tsx (with headline management)

components/
  └── headline-banner.tsx

app/products/
  └── page.tsx (with HeadlineBanner component)
```

## Styling

- **ON Button**: Green background (bg-green-500)
- **OFF Button**: Gray background (bg-gray-500)
- **Banner**: Blue-to-cyan gradient
- **Text**: White, bold, scrolling animation
- **Animation**: 20s linear infinite marquee

## API Responses

### GET /api/headlines
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "text": "🎉 Special Offer: 20% off all drones!",
    "isActive": true,
    "createdAt": "2024-01-23T...",
    "updatedAt": "2024-01-23T..."
  }
}
```

### POST /api/headlines
```json
{
  "text": "🎉 Special Offer: 20% off all drones!",
  "isActive": true
}
```

## Usage Examples

### Turning Headline ON:
1. Click "Edit" button
2. Type: "🎉 Special Offer: 20% off all drones!"
3. Click "ON" button (turns green)
4. Click "Save"
5. Headline appears on products page

### Turning Headline OFF:
1. Click "OFF" button (turns gray)
2. Click "Save"
3. Headline disappears from products page

### Editing Headline:
1. Click "Edit" button
2. Modify text
3. Click "Save"
4. Changes appear on products page

## Auto-Refresh

- Frontend checks for new headline every 30 seconds
- No page refresh needed
- Changes appear automatically

## Troubleshooting

### Headline not showing on products page?
- Check if headline is set to ON (green button)
- Verify headline text is not empty
- Check MongoDB connection
- Clear browser cache

### ON/OFF button not working?
- Check browser console for errors
- Verify MongoDB connection
- Try refreshing page

### Scrolling animation not working?
- Check CSS is loaded
- Verify text is long enough to scroll
- Check browser supports CSS animations

## Next Steps (Optional)

1. **Multiple Headlines** - Support multiple active headlines
2. **Scheduling** - Schedule headlines for specific dates/times
3. **Analytics** - Track headline impressions
4. **Rich Text** - Support formatted text (bold, colors, etc.)
5. **Expiration** - Auto-disable headlines after set time
6. **History** - Keep history of all headlines

## Notes

- Only one headline can be active at a time
- Headline text is stored in MongoDB
- Frontend auto-refreshes every 30 seconds
- ON/OFF toggle uses shadcn button styling
- Scrolling animation is CSS-based (no JavaScript)
- Component returns null if headline is inactive (no DOM elements)
