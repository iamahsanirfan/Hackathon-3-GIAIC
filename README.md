# Premium Furniture Marketplace

Hello and welcome! I'm excited to present my Premium Furniture Marketplace project—a full-stack e-commerce platform built during an intense 6-day hackathon. This project is designed for busy professionals who want to shop for premium furniture without the hassle of visiting physical stores. In this document, I'll walk you through my journey from initial concept and planning to the final live deployment on Vercel.

---

## Overview

The Premium Furniture Marketplace is more than just an online store. It’s a carefully curated platform that provides a seamless shopping experience with modern UI elements, robust API integration, and comprehensive testing. Every step of this project was designed with both functionality and aesthetics in mind.

---

## Day-by-Day Breakdown

### **Day 1: Business Definition & Data Schemas**

I kicked off the project by defining the business goals and target audience. I envisioned a marketplace for busy people seeking high-quality furniture delivered directly to their doorsteps. I then designed the core data schemas for the project:

- **Products:** Containing details like product ID, image, name, price, and stock.
- **Customers, Orders, Delivery Zones, Shipments, and Payments:** I mapped out relationships to ensure that every transaction—from customer signup to shipment tracking—was covered.

This groundwork allowed me to clearly visualize the data flow and relationships, ensuring that all subsequent development was based on a solid foundation.

---

### **Day 2: Technical Implementation Plan**

On the second day, I developed a detailed technical plan to bring the project to life. I chose a modern tech stack for the frontend and backend:

- **Frontend:** I used Next.js 14 with the App Router and TypeScript, along with Shadcn UI and Tailwind CSS to create an intuitive and responsive user interface.
- **Backend:** I integrated Sanity CMS to manage the product content and utilized Clerk for secure user authentication. Stripe was chosen for handling payments.

I outlined the core pages and workflows including account management, product showcases, cart interactions, and checkout processes. This plan served as my roadmap for the rest of the project.

---

### **Day 3: API Integration & Data Migration**

With the plan in place, I moved on to API integration and data migration. I developed scripts to fetch product data from an external API and then seamlessly integrate it into Sanity CMS. Key tasks on this day included:

- **Setting up Sanity Schemas:** I created custom schemas (e.g., `product.ts`) that defined fields like name, image, price, description, discount percentage, and more.
- **Migration Scripts:** Using Node.js, I wrote scripts that not only uploaded product images but also created product documents in Sanity. This ensured that all product data was current and ready to be displayed on the frontend.

I also verified the integration by accessing the Sanity Studio, confirming that the data had been successfully imported.

---

### **Day 4: Building Dynamic Frontend Components**

Day 4 was all about creating a dynamic, interactive user interface:

- **Dynamic Components:** I built components like the ProductCard, Shop, and Search components. These components fetch data dynamically from Sanity CMS, ensuring that the product listings are always up-to-date.
- **Dynamic Routing:** I implemented SEO-friendly, dynamic routes for individual product pages. Each product page is generated on-the-fly based on its unique identifier, providing a rich, detailed view.
- **User Interaction:** I added features like the wishlist, animated cart slider, and filtering options. These not only enhance the user experience but also ensure smooth navigation throughout the website.

I made sure that each component was modular, maintainable, and optimized for performance.

---

### **Day 5: Testing & Backend Refinement**

Testing is critical for a smooth user experience, and on Day 5, I conducted comprehensive testing:

- **Functional Testing:** I verified that every page—from the Home page to the Checkout and Order Confirmation pages—worked exactly as expected. This included testing interactive elements like the add-to-cart button and wishlist functionality.
- **Responsive Testing:** I confirmed that the website is fully responsive across mobile, tablet, laptop, and desktop devices.
- **API & Performance Testing:** Using Thunder Client, I tested all API endpoints, and I ran Lighthouse audits to ensure the website met high standards for performance, accessibility, and security.
- **Testing Report:** I compiled a detailed testing report that documented each test case, the expected outcomes, and the actual results, all of which passed successfully.

Every test affirmed that the system was robust and ready for live deployment.

---

### **Day 6: Deployment on Vercel**

Finally, on Day 6, I deployed the project to Vercel:

- **Deployment Process:** I connected the GitHub repository to Vercel, set up the required environment variables (for Sanity, Clerk.), and initiated the deployment.
- **Live Testing:** After deployment, I verified that the live version was working perfectly, with all features functioning as expected.
- **Public Access:** The project is now live and accessible via a public URL on Vercel, allowing users to experience the Premium Furniture Marketplace from anywhere.

You can check out the live version here: [https://your-vercel-app-url.vercel.app](https://your-vercel-app-url.vercel.app)](https://hackathon-3-giaic-omega.vercel.app/) *(Replace with your actual deployed URL)*

---

## Conclusion

This project represents a complete journey from an initial idea to a fully deployed, live application. Throughout the hackathon, I balanced business requirements with technical excellence—creating a platform that not only meets user needs but also serves as a testament to modern web development practices.

Thank you for taking the time to explore the Premium Furniture Marketplace. I hope this walkthrough gives you a clear picture of the planning, development, testing, and deployment processes behind the project.

Happy browsing!
