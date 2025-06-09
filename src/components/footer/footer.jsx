import React from 'react'
import styles from './footer.module.scss'
import { TextInput } from '../inputs/text-input'
import QRcode from '../../assets/imgs/Qr-Code.png'
import playStore from '../../assets/imgs/GooglePlay.png'
import appStore from '../../assets/imgs/AppStore.png'
import CodeMartBlack from '../../assets/imgs/logo.PNG'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className={styles.footer_container}>
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <figure className='text-light text-start mb-3'><img  className={`${styles.logo}`} src={CodeMartBlack} alt="" /></figure>
            <h6 className='text-light text-start mb-3'>Subscribe</h6>
            <p className='text-light text-start mb-3'>Get 10% off your first order</p>
            <TextInput placeholder='Enter your Email' type="text" styles={{height: '40px', border: '1px solid white', width: '80%'}}></TextInput>
          </div>
          <div className="col-12 col-md-2 mb-4 mb-md-0">
            <h3 className='text-light text-start mb-3'>Support</h3>
            <p className='text-light text-start mb-2'>111 Bijoy sarani, Dhata,<br />DH 1515, Bangladesh</p>
            <p className='text-light text-start mb-2'>exclusive@gmail.com</p>
            <p className='text-light text-start'>+88888=88015=9999</p>
          </div>
          <div className="col-12 col-md-2 mb-4 mb-md-0">
            <h3 className='text-light text-start mb-3'>Account</h3>
            <ul className='text-light text-start p-0'>
              <li className='mb-3'>My Account</li>
              <li className='mb-3'>Login / Register</li>
              <li className='mb-3'>Cart</li>
              <li className='mb-3'>Wishlist</li>
              <li className='mb-3'>Shop</li>
            </ul>
          </div>
          <div className="col-12 col-md-2 mb-4 mb-md-0">
            <h3 className='text-light text-start mb-3'>Quick Link</h3>
            <ul className='text-light text-start p-0'>
              <li className='mb-3'>Privacy Policy</li>
              <li className='mb-3'>Terms of Use</li>
              <li className='mb-3'>FAQ</li>
              <li className='mb-3'>Contact</li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h3 className={` text-light text-start`}>Download App</h3>
            <p className={` text-light text-start`}>Save $3 with App New User Only</p>
            <div className="row">
              <div className="col-6 px-2">
                <figure className={`${styles.figure_one}`}>
                  <img src={QRcode} width={'100%'} alt="QR Code" className={`${styles.qr_code}`} />
                </figure>
              </div>
              <div className="col-6 px-0 py-0">
                <figure className={`${styles.figure_two}`}>
                  <img src={playStore} alt="Google Play Store" width={'100%'} height={'60px'} className={`${styles.store}`}/>
                  <img src={appStore} alt="Apple App Store" width={'100%'} height={'60px'} className={`${styles.store}`} />
                </figure>
              </div>
              <div className={` ${styles.icon_div} text-start mt-2`}>
                <FaFacebook/>
                <FaInstagram/>
                <FaTwitter/>
                <FaLinkedin/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span>&copy; Copyright CodeAneeq 2022. All right reserved</span>
    </footer>
  )
}

export default Footer
