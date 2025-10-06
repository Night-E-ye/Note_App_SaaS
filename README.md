
# 📝 NoteAppSaaS - A Full-Stack Note-Taking Application

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)

A modern, feature-rich web application for managing personal notes, built from the ground up with a secure backend and a clean, responsive frontend



---
## 📸 Preview
<img width="1919" height="877" alt="Screenshot 2025-10-06 230216" src="https://github.com/user-attachments/assets/dc300b71-78ec-4bc5-8664-1c11bbce3a52" />
<img width="1918" height="880" alt="Screenshot 2025-10-06 230157" src="https://github.com/user-attachments/assets/023811df-e0bb-4fe8-81bc-4bbc19013171" />
<img width="1919" height="880" alt="Screenshot 2025-10-06 230129" src="https://github.com/user-attachments/assets/0be7f047-cdb9-40e1-b313-71d4563c2a7c" />
<img width="1919" height="874" alt="Screenshot 2025-10-06 230032" src="https://github.com/user-attachments/assets/659a9b4d-d401-4a75-b833-0609c797730c" />
<img width="1918" height="879" alt="Screenshot 2025-10-06 230335" src="https://github.com/user-attachments/assets/55521f99-050b-407f-802c-0d60afe44b5d" />
<img width="1919" height="878" alt="Screenshot 2025-10-06 230304" src="https://github.com/user-attachments/assets/fe644021-6d9c-46ac-8302-9be22fef97b6" />
<img width="1919" height="874" alt="Screenshot 2025-10-06 230229" src="https://github.com/user-attachments/assets/ec480126-4d02-422d-8770-3be5bbbf7609" />


---

## ✨ Features

This project is a complete Software-as-a-Service (SaaS) implementation with a rich feature set:

* **Secure User Authentication:**
    * User registration with password hashing (`bcrypt.js`).
    * User login with JSON Web Token (JWT) authentication.
    * Complete password reset flow via email (Nodemailer + Ethereal for testing).
* **Premium Subscription Model:**
    * Integrated with **Stripe** for one-time payments to unlock premium access.
    * Backend webhooks to verify payment and update user status.
    * Protected login access for premium users only.
* **Full Note Management (CRUD):**
    * Create, Read, Update, and Delete notes.
    * Notes are securely tied to the logged-in user.
* **Professional Frontend Experience:**
    * **Markdown Support:** Write and preview notes using Markdown for rich formatting.
    * **Note Tagging:** Organize notes with comma-separated tags.
    * **Live Search & Filter:** Instantly search note titles, content, and tags.
    * **Dark Mode:** A persistent light/dark theme toggle for user comfort.
    * **Toast Notifications:** Non-blocking feedback for user actions.
    * Clean, minimalist, and fully responsive design using Bootstrap 5.

---

## 🛠️ Technology Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JSON Web Tokens (JWT), bcrypt.js
* **Payments:** Stripe
* **Email:** Nodemailer
* **Frontend:** HTML5, CSS3, Vanilla JavaScript, Bootstrap 5
* **Development Environment:** Replit

---

## ⚙️ Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Night-E-ye/Note-app-saas.git](https://github.com/Night-E-ye/Note-app-saas.git)
    cd Note-app-saas
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables. You can get these from your MongoDB, Stripe, and email provider accounts.

    ```
    MONGO_URI="your_mongodb_connection_string"
    JWT_SECRET="your_jwt_secret_key"

    STRIPE_SECRET_KEY="your_stripe_secret_key"
    STRIPE_PRICE_ID="your_stripe_price_id"
    STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

    # Optional: For password reset email sending
    EMAIL_USER="your_email_address"
    EMAIL_PASS="your_email_app_password"
    ```

4.  **Run the application:**
    ```sh
    npm start
    ```
    The server will start, typically on `http://localhost:3000`.
