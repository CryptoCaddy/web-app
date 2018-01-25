import * as AuthUtil from './auth.util';

/* tslint:disable:max-line-length */
const exampleData: any = {
  'uid': '7ZgovV647PVrq3G8joZ3tVEYZZD2',
  'displayName': null,
  'photoURL': null,
  'email': 'u3967732@mvrht.net',
  'emailVerified': false,
  'phoneNumber': null,
  'isAnonymous': false,
  'providerData': [
    {
      'uid': 'u3967732@mvrht.net',
      'displayName': null,
      'photoURL': null,
      'email': 'u3967732@mvrht.net',
      'phoneNumber': null,
      'providerId': 'password',
    },
  ],
  'apiKey': 'AIzaSyDLcRPpheDCnFnv6gdhPFnprKtSLywnT20',
  'appName': '[DEFAULT]',
  'authDomain': 'api-project-937776039501.firebaseapp.com',
  'stsTokenManager': {
    'apiKey': 'AIzaSyDLcRPpheDCnFnv6gdhPFnprKtSLywnT20',
    'refreshToken': 'AEoYo8v3ij9E_Ta9U9hwpUMJ3oWSDy9-0Dbnpro25WELSxuGddJDn83Nt08Cx-bY2jCEApB-tJ0gdQfvbbIm2y48M9hoE8PHNmgwFMzu9d8fQ3JkpH-OMBYOVY8e5cOau9yzvbzdZpWLD9IC7DsrPLb8plVCPE_cvjXRoQhrf0jZeRsJrU2XegjWvNCpje4lLPlDtFLrxniHDeE7nVfSHxsi0S7_3pvECSJfHx_cJuBemyOfkvpIlUk',
    'accessToken': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZkNWZmYzQzNTc2ZjA4ZjFmZjBiMjU2YzMyZWQ4MGUzOGU1Y2U3YzcifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXBpLXByb2plY3QtOTM3Nzc2MDM5NTAxIiwiYXVkIjoiYXBpLXByb2plY3QtOTM3Nzc2MDM5NTAxIiwiYXV0aF90aW1lIjoxNTE2ODk2MDM4LCJ1c2VyX2lkIjoiN1pnb3ZWNjQ3UFZycTNHOGpvWjN0VkVZWlpEMiIsInN1YiI6IjdaZ292VjY0N1BWcnEzRzhqb1ozdFZFWVpaRDIiLCJpYXQiOjE1MTY4OTYwMzgsImV4cCI6MTUxNjg5OTYzOCwiZW1haWwiOiJ1Mzk2NzczMkBtdnJodC5uZXQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidTM5Njc3MzJAbXZyaHQubmV0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.wuZ52p84xn8Db63XEIBU19U02vdK4eAHAZqeUy1yPK9ToCoQ6gOGt8GG10XT4hoSG3bVy1_6h7FpafJ063Gm987bsmbsLfri6KrWovdmN82Mcd8PY1HZHQBEZx-cOdjZFGfQ_xu0mswR6LvA-jgfuBroaGlVJ_j-OfU98L_1VJMdnqAqWkJaUtrV2OWqthwdG8UFTfe_pdSOY-mfOAR4qFgZVdzJ-B1jyayNWxWdURUKPPR5o-hr4sW-nQzn0l0fCptfPhXmK6LVSzYckOG-zmbpY0KJx_ZejsltaAcPTqy7NxDpThhSadkruc03FFnJkkB_skqaqqORL6Y7-9NIUw',
    'expirationTime': 1516899637325,
  },
  'redirectEventId': null,
  'lastLoginAt': '1516896038000',
  'createdAt': '1516827147000',
};
/* tslint:enable:max-line-length */

describe('AuthUtil', () => {

  describe('extractUserData', () => {
    it('should extract user data from a given object', () => {
      expect(AuthUtil.extractUserData(exampleData))
        .toEqual({ email: 'u3967732@mvrht.net' });
    });

    it('should handle invalid data', () => {
      expect(AuthUtil.extractUserData(null)).toEqual(null);
      expect(AuthUtil.extractUserData(undefined)).toEqual(null);
      expect(AuthUtil.extractUserData('' as any)).toEqual(null);
      expect(AuthUtil.extractUserData('foo' as any)).toEqual(null);
      expect(AuthUtil.extractUserData({ foo: 'bar' } as any)).toEqual({ email: undefined });
      expect(AuthUtil.extractUserData([ 'foor', 'bar' , 3 ] as any)).toEqual({ email: undefined });
    });
  });

});
