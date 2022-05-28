import { Component, h, State } from '@stencil/core';
import { AuthProvider } from '../../providers/auth';

@Component({
  tag: 'auth-button',
  styleUrl: 'auth-button.scss',
})
export class AuthButtonComponent {
  // @State() デコレータを記述することで変数に変更が検知された場合、再度renderメソッドが呼び出される
  @State() loginUser: any = null;
  @State() fetched: boolean = false;

  // componentWillLoad()はStencilのライフサイクル関数になる
  componentWillLoad() {
    this.loggedIn();
  }

  // async login(){
  //   AuthProvider.login();
  // }

  async loggedIn() {
    // ログイン判定の処理を行う ログインしていればユーザー情報が取得でき、ログインしていなければnullが返却される
    this.loginUser = await AuthProvider.loggedin();
    // ログイン状態をtrueで保持する
    this.fetched = true;
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.fetched) {
            if (this.loginUser) {
              return [
                <ion-button class="c-auth-button">
                  <img src={this.loginUser.providerData[0].photoURL}></img>
                </ion-button>,
              ];
            } else {
              return [<ion-button onClick={() => AuthProvider.login()}>ログイン</ion-button>];
            }
          }
        })()}
      </div>
    );
  }
}
