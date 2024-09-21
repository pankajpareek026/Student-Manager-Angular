import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  //login
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('token', 'true')

      if (res.user?.emailVerified == true) {
        this.router.navigate(['/dashboard'])
      } else {
        this.router.navigate(['/verify-email'])
      }

    }, err => {
      alert("User Not Found")
      this.router.navigate(['/login'])
    }
    )
  }

  //register
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((res) => {
      alert("Verify your email")
      this.verifyEmail(res.user)
    }, err => { alert("something Went Wrong") })
  }

  //logout
  logout() {
    this.fireauth.signOut()
    this.router.navigate(['/login'])

  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email'])
    }, err => {
      alert("something went wrong")
    })

  }

  verifyEmail(user: any) {
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/verify-email'])
    }, (err: any) => {
      alert("something went wrong")
    })
  }

  signWithGoogle() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res) => {
      localStorage.setItem('token', JSON.stringify(res.user?.uid))
      this.router.navigate(['/dashboard'])
    }, err => { alert(err.message) })
  }

}


