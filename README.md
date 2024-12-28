# VERACITY
Veracity: Decentralized Healthcare Record Management

Veracity is a blockchain-based healthcare record management system that ensures secure storage, transparency, and control of personal health data. Built using Ethereum, Athos, MongoDB, and Auth0, Veracity empowers users to manage their medical records while ensuring privacy and access control.

Features:

1. Decentralized Storage on Blockchain:
   - Leverages Ethereum blockchain to store health records in a decentralized manner.
   - Ensures data integrity and immutability, eliminating the risks associated with centralized storage.

2. User-Controlled Access:
   - Personal health data is controlled entirely by the user.
   - Users must explicitly grant permission for health centers or other entities to access their data.
   - Transparency through access logs visible to the user and super admin.

3. Roles:
   - Normal User: Can view and manage their own health records.
   - Health Centers: Can request access to user data for healthcare purposes with explicit user consent.
   - Super Admin: Monitors the system to oversee data access and ensure compliance.

4. Secure Authentication:
   - Auth0 is integrated to provide robust and scalable authentication for all users.
   - Ensures secure login and access control with multi-factor authentication (MFA).

5. Health Issue Suggestions:
   - An AI-powered bot analyzes user data to provide potential health issue suggestions.
   - Offers insights based on the stored records to assist in proactive healthcare.

6. Hybrid Storage:
   - Sensitive metadata is stored on the blockchain for security.
   - Detailed records are stored in MongoDB, with encrypted references to blockchain metadata.

Tech Stack:

1. Ethereum Blockchain:
   - Decentralized ledger for storing metadata and access logs.
   - Smart contracts handle permission management and ensure data transparency.

2. Athos:
   - Provides a framework for seamless integration of blockchain with existing systems.
   - Facilitates decentralized storage and smart contract deployment.

3. MongoDB:
   - Stores detailed user records securely in a centralized database.
   - Allows efficient querying and management of large datasets.

4. Auth0:
   - Handles authentication and authorization for all users.
   - Ensures secure access to the application with modern authentication protocols like OAuth2.

Architecture:

1. Data Storage:
   - Blockchain: Stores hashed references to medical records and access logs.
   - MongoDB: Stores detailed medical records with encryption.

2. Access Control:
   - Smart contracts ensure only authorized entities can access the data.
   - Auth0 provides secure authentication and roles-based access management.

3. AI Bot:
   - Processes user health records to suggest potential health concerns.
   - Uses machine learning algorithms trained on anonymized datasets.

Installation:

1. Clone the repository:
   git clone https://github.com/your-username/veracity.git
   cd veracity

2. Install dependencies:
   npm install

3. Set up environment variables:
   - Create a .env file in the root directory.
   - Add the following keys:
     MONGO_URI=your_mongodb_connection_string
     AUTH0_DOMAIN=your_auth0_domain
     AUTH0_CLIENT_ID=your_auth0_client_id
     AUTH0_CLIENT_SECRET=your_auth0_client_secret
     ETHEREUM_NETWORK=your_ethereum_network

4. Run the application:
   npm start

Usage:

1. Normal Users:
   - Register and log in to manage personal health records.
   - Grant or revoke access permissions for health centers.

2. Health Centers:
   - Request access to user health records for medical purposes.
   - View user-approved data only.

3. Super Admin:
   - Monitor access logs to ensure compliance and system transparency.
   - Generate reports on data access patterns.

4. AI Health Bot:
   - Enter symptoms or view suggestions based on stored records.

Future Enhancements:

1. Integration with wearable devices for real-time health monitoring.
2. Advanced AI algorithms for personalized health recommendations.
3. Expansion to support cross-border healthcare data sharing.

Contributing:

We welcome contributions to enhance Veracity! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   git checkout -b feature-name

3. Commit your changes and open a pull request.

License:

This project is licensed under the MIT License. See the LICENSE file for more details.

MADE AT PECHACKS 2.0
