import { authenticateGoogle, isAuth } from '../helpers/firebase';

export class AuthController {
  // TODO 型宣言を的確に行う
  // クラス変数を持つことでユーザー情報へのアクセスを最適化している
  public loginUser: any = null;
  constructor() {}

  async login() {
    authenticateGoogle();
  }

  async loggedin() {
    if (this.loginUser) {
      // すでにログインしていればログインユーザーを返却する
      return this.loginUser;
    } else {
      // ログインユーザーでなければログイン中か判定しログインユーザーがnullを返却する
      this.loginUser = await isAuth();
      return this.loginUser;
    }
  }
}

export const AuthProvider = new AuthController();
