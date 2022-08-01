import React from "react";
import styles from './index.module.css'

const Footer =() =>{
  return(
    <footer className={styles.footer}>
          <a
            href="https://phongcntt.ufm.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Coppyright by:{' '} © 2022 Phòng Công nghệ thông tin
          </a>
        </footer>
  )
}

export default Footer;