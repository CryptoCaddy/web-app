import firebaseMock from 'firebase-mock';

const authMock = new firebaseMock.MockFirebase();
export default firebaseMock.MockFirebaseSdk(null, () => authMock, null);
