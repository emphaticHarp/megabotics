# How to Add Coupons Section to Admin Products Page

## **What I Created**

I created a reusable component: `components/admin-coupons-section.tsx`

This component includes:
- Create, edit, delete coupons
- Search functionality
- Copy coupon codes
- View usage statistics
- Set validity dates
- Manage discount types (percentage or fixed)

## **How to Integrate into Admin Products Page**

### **Step 1: Import the Component**

At the top of `app/admin/products/page.tsx`, add:

```typescript
import { AdminCouponsSection } from '@/components/admin-coupons-section';
```

### **Step 2: Add Tabs State**

In the component state, add:

```typescript
const [activeTab, setActiveTab] = useState<'products' | 'coupons'>('products');
```

### **Step 3: Add Tab Navigation**

Before the products section, add:

```typescript
{/* Tab Navigation */}
<div className="flex gap-4 border-b border-gray-200 mb-6">
  <button
    onClick={() => setActiveTab('products')}
    className={`px-4 py-2 font-semibold transition-colors ${
      activeTab === 'products'
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    Products
  </button>
  <button
    onClick={() => setActiveTab('coupons')}
    className={`px-4 py-2 font-semibold transition-colors ${
      activeTab === 'coupons'
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    Coupons & Discounts
  </button>
</div>
```

### **Step 4: Conditionally Render Sections**

Wrap the existing products content with:

```typescript
{activeTab === 'products' ? (
  // Existing products section code here
  <>
    {/* All existing products page content */}
  </>
) : (
  // Coupons section
  <AdminCouponsSection />
)}
```

## **Result**

Users will see two tabs in the admin products page:
- **Products** - Existing products management
- **Coupons & Discounts** - New coupon management

## **File Locations**

- Component: `components/admin-coupons-section.tsx`
- Integration: `app/admin/products/page.tsx`

## **No Separate Page**

✅ Coupons are now a section/tab in the products page  
✅ No separate `/admin/coupons` page  
✅ Cleaner admin interface  

Done! 🎉
