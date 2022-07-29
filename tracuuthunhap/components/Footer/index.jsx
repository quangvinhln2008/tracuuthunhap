import React from "react";
import styles from './index.module.css'

const Footer =() =>{
  return(
    <footer className={styles.footer}>
          <a
            href="https://phongkhtc.ufm.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by:{' '} © 2022 Phòng Kế hoạch - Tài chính
          </a>
        </footer>
  )
}

export default Footer;