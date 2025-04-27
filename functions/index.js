const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp();

// List Users Function
exports.listUsers = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated and is admin
  if (!context.auth || context.auth.token.email !== 'admin@enlightenedhub.com') {
    throw new functions.https.HttpsError('permission-denied', 'Must be an admin to list users');
  }

  try {
    const listUsersResult = await admin.auth().listUsers();
    return {
      users: listUsersResult.users.map(user => ({
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        metadata: user.metadata,
        status: user.disabled ? 'disabled' : 'active',
        lastLogin: user.metadata.lastSignInTime
      }))
    };
  } catch (error) {
    console.error('Error listing users:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
