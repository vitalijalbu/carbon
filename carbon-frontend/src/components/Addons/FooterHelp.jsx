import React from 'react';

export interface FooterHelpProps {
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export function FooterHelp({children}: FooterHelpProps) {

  return (
    <div className="footer-help">
      <div className="footer-help__content">
        <div className="footer-help__icon">
          <Icon.HelpCircle/>
        </div>
        <div className="footer-help__text">{children}</div>
      </div>
    </div>
  );
}
