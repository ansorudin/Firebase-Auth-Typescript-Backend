import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL : 'https://pribados-19d8d.firebaseio.com'
});
admin.firestore().settings({ ignoreUndefinedProperties: true });

export default class FirebaseService {
  private firebase() {
    const firebase = admin;
    return firebase;
  }

  async register(data : any): Promise<void | any> {
    try {
      const {
          email,
          phoneNumber,
          password,
          firstName,
          lastName,
          photoUrl
      } = data
      const user = await this.firebase().auth().createUser({
          email,
          phoneNumber,
          password,
          displayName : `${firstName} ${lastName}`,
          photoURL : photoUrl
      })
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getUserByUid(uid: string): Promise<void | any> {
      try {
          const user = await this.firebase().auth().getUser(uid)
          return user
      } catch (err) {
        console.log(err);
        throw err;
      }
  }
  async verificationEmail(email : string): Promise<void | any> {
      try {
        const result = await this.firebase().auth().generatePasswordResetLink(email)
        return result
      } catch (err) {
        console.log(err);
        throw err;
      }
  }
  async sessionCookie(tokenId : string): Promise<void | any> {
    try {
      // const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
      const expiresIn = 5 * 60 * 1000
      const idToken = tokenId.toString()
      const sessionCookie = await this.firebase().auth().createSessionCookie(idToken, {expiresIn})
      return {
        sessionCookie,
        options : {maxAge : expiresIn, httpOnly: true}
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
}
  async verifyToken(sessionCookie: any): Promise<void | any> {
    try {
      console.log(typeof sessionCookie)
        const isTokenValid = await this.firebase().auth().verifySessionCookie(sessionCookie)
        return isTokenValid
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async setRole(uid: string, role : string): Promise<void | any> {
    try {
        const result = await this.firebase().auth().setCustomUserClaims(uid, {role : role})
        return result
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

}


