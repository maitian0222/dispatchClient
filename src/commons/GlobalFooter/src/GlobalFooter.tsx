import React from 'react';
import { Icon } from 'antd';
import styles from './index.css';

const GlobalFooter = ({ links, copyright }) => {
  if (copyright === 'default') {
    copyright = (
      <div>
        Copyright <Icon type="copyright" /> 2019 中科软科技股份有限公司
      </div>
    );
  }
  if (links === 'default') {
    links = [
      { key: 1, blankTarget: '_blank', href: 'help', title: '帮助' },
      { key: 2, blankTarget: '_blank', href: 'privacy', title: '隐私' },
      { key: 3, blankTarget: '_blank', href: 'terms', title: '条款' },
    ];
  }
  return (
    <footer className={styles.globalFooter}>
      {/* {links && (
        <div className={styles.links}>
          {links.map((link) => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )} */}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  );
};
export default GlobalFooter;
